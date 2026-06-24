import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

type IncomingItem = {
  id: string
  name: string
  price: number
  qty: number
}

/**
 * Creates a Yoco hosted checkout.
 * Docs: https://developer.yoco.com/online/api-reference/checkout
 * Requires the YOCO_SECRET_KEY environment variable.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as { items?: IncomingItem[] }
  const items = body.items ?? []

  if (items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const totalRand = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const amountInCents = Math.round(totalRand * 100)

  const secretKey = process.env.YOCO_SECRET_KEY

  // Without a configured key we cannot create a real Yoco checkout.
  if (!secretKey) {
    return NextResponse.json(
      {
        error: 'not_configured',
        message:
          'Yoco is not connected yet. Add your YOCO_SECRET_KEY to enable live checkout.',
      },
      { status: 503 },
    )
  }

  const origin = request.headers.get('origin') ?? 'http://localhost:3000'

  try {
    const itemIds = items.map((i) => i.id).join(', ')
    const orderId = crypto.randomUUID()

    // Save pending order to Vercel Blob
    const orderData = {
      orderId,
      status: 'pending_payment',
      timestamp: new Date().toISOString(),
      items: items.map(i => i.id),
      totalAmount: totalRand,
    }

    await put(`orders/${orderId}.json`, JSON.stringify(orderData, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false
    })

    const res = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: 'ZAR',
        successUrl: `${origin}/success?orderId=${orderId}`,
        cancelUrl: `${origin}/?checkout=cancelled`,
        failureUrl: `${origin}/?checkout=failed`,
        metadata: {
          orderId,
          source: 'delusion-invasion',
          items: items
            .map((i) => `${i.name} x${i.qty}`)
            .join(', ')
            .slice(0, 255),
        },
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      return NextResponse.json(
        { error: 'yoco_error', message: detail },
        { status: 502 },
      )
    }

    const data = (await res.json()) as { redirectUrl?: string }
    return NextResponse.json({ redirectUrl: data.redirectUrl })
  } catch (err) {
    return NextResponse.json(
      { error: 'request_failed', message: String(err) },
      { status: 500 },
    )
  }
}
