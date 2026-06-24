import { NextResponse } from 'next/server'
import { list } from '@vercel/blob'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')

  if (!orderId) {
    return NextResponse.json({ error: 'Missing orderId' }, { status: 400 })
  }

  try {
    const { blobs } = await list({
      prefix: `orders/${orderId}.json`,
      limit: 1,
    })

    if (blobs.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const orderUrl = blobs[0].url
    const response = await fetch(orderUrl)
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch order data' }, { status: 500 })
    }

    const orderData = await response.json()
    return NextResponse.json({ order: orderData })

  } catch (error) {
    console.error('Failed to get order:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}
