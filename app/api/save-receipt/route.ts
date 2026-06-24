import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { MERCH, ALBUM, TRACKS } from '@/lib/album'

export async function POST(request: Request) {
  try {
    const { email, orderId, itemIds } = (await request.json()) as { email: string; orderId: string; itemIds: string[] }
    
    if (!email || !orderId || !itemIds || !Array.isArray(itemIds)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const TARGET_ITEMS = ['bundle-deluxe', 'merch-tee', 'ticket-live']
    const hasTargetItem = itemIds.some(id => TARGET_ITEMS.includes(id))

    if (!hasTargetItem) {
      return NextResponse.json({ success: true, message: 'No target items to save' })
    }

    // Fetch the full details of the items bought
    const purchasedMerch = MERCH.filter(m => itemIds.includes(m.id))
    const purchasedTracks = TRACKS.filter(t => itemIds.includes(t.id) || itemIds.includes(`single-${t.id}`))
    const purchasedAlbum = itemIds.includes('album-digital') ? [ALBUM] : []

    const receiptData = {
      orderId,
      email,
      timestamp: new Date().toISOString(),
      items: itemIds,
      details: {
        merch: purchasedMerch,
        tracks: purchasedTracks,
        album: purchasedAlbum
      }
    }

    const blobName = `orders/${orderId}.json`

    // Attempt to save to Vercel Blob, overwriting the pending order with full details
    // It will throw if BLOB_READ_WRITE_TOKEN is not set.
    const blob = await put(blobName, JSON.stringify(receiptData, null, 2), {
      access: 'public', // Set to public or private depending on requirements
      contentType: 'application/json',
      addRandomSuffix: false
    })

    return NextResponse.json({ success: true, blobUrl: blob.url })
  } catch (error) {
    console.error('Failed to save receipt to Vercel Blob:', error)
    return NextResponse.json({ error: 'Failed to save receipt' }, { status: 500 })
  }
}
