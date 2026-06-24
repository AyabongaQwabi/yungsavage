'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { StoreProvider } from '@/components/store-provider'
import { CartSidebar } from '@/components/cart-sidebar'
import { MiniPlayer } from '@/components/mini-player'
import { MERCH, ALBUM, TRACKS } from '@/lib/album'
import { CheckCircle2, Download, Receipt, MessageCircle } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [order, setOrder] = useState<{ items: string[], totalAmount: number } | null>(null)
  const [loadingOrder, setLoadingOrder] = useState(true)
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setLoadingOrder(false)
      return
    }
    
    fetch(`/api/get-order?orderId=${orderId}`)
      .then(res => {
        if (!res.ok) throw new Error('Order not found')
        return res.json()
      })
      .then(data => {
        setOrder(data.order)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoadingOrder(false)
      })
  }, [orderId])

  if (loadingOrder) {
    return (
      <div className="min-h-[60vh] my-8 flex items-center justify-center">
        <p className="text-zinc-400">Verifying order...</p>
      </div>
    )
  }

  if (error || !order || !orderId) {
    return (
      <div style={{ minHeight: '60vh', marginTop: '2rem' }} className="my-8 flex items-center justify-center flex-col text-center">
        <p className="text-red-500 font-bold text-xl mb-2">Invalid or Missing Order</p>
        <p className="text-zinc-400">We could not verify your purchase.</p>
      </div>
    )
  }

  const itemIds = order.items || []

  const purchasedMerch = MERCH.filter(m => itemIds.includes(m.id))
  const purchasedTracks = TRACKS.filter(t => itemIds.includes(t.id) || itemIds.includes(`single-${t.id}`))
  const hasDigitalAlbum = itemIds.includes('album-digital') || itemIds.includes('bundle-deluxe')

  // Target items that trigger saving
  const TARGET_ITEMS = ['bundle-deluxe', 'merch-tee', 'ticket-live']
  const needsEmail = itemIds.some(id => TARGET_ITEMS.includes(id))

  const handleSaveReceipt = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/save-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderId, itemIds }),
      })
      if (!res.ok) throw new Error('Failed to save receipt')
      setSaved(true)
    } catch (err) {
      setError('Something went wrong saving your receipt.')
    } finally {
      setSaving(false)
    }
  }

  const whatsappMessage = encodeURIComponent(`Hi, I have a question about my order #${orderId}.`)

  return (
    <div style={{ marginTop: '6rem', marginBottom: '4rem' }} className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-12">
        <CheckCircle2 className="w-16 h-16 text-red-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
          Payment Successful
        </h1>
        <p className="text-zinc-400 text-lg">
          Thank you for supporting the movement.
        </p>
      </div>

      <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-6 md:p-10 mb-12 shadow-2xl shadow-red-900/10">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3">
            <Receipt className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Your Receipt</h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">Order: {orderId.split('-')[0]}</span>
        </div>

        <div className="space-y-6 mb-8">
          {purchasedMerch.map(m => (
            <div key={m.id} className="flex justify-between items-start">
              <div>
                <p className="text-white font-medium">{m.name}</p>
                <p className="text-sm text-zinc-500">Physical / Ticket</p>
              </div>
              <p className="text-red-500 font-medium">R{m.price}</p>
            </div>
          ))}
          {hasDigitalAlbum && (
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-medium">INVASION — Full Digital Album</p>
                <p className="text-sm text-zinc-500">Digital Download</p>
              </div>
              <p className="text-red-500 font-medium">
                {itemIds.includes('bundle-deluxe') ? 'Included' : `R${ALBUM.price}`}
              </p>
            </div>
          )}
          {purchasedTracks.map(t => (
            <div key={t.id} className="flex justify-between items-start">
              <div>
                <p className="text-white font-medium">{t.title}</p>
                <p className="text-sm text-zinc-500">Digital Track</p>
              </div>
              <p className="text-red-500 font-medium">R{t.price}</p>
            </div>
          ))}
        </div>

        {needsEmail && !saved && (
          <div className="mt-8 p-6 bg-black border border-zinc-800 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-2">Claim Your Purchase</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Enter your email to receive your official receipt and ticket details for the selected premium items.
            </p>
            <form onSubmit={handleSaveReceipt} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                disabled={saving}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {saving ? 'Saving...' : 'Claim Now'}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>
        )}

        {saved && (
          <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
            <p className="text-green-400 font-medium">Receipt saved successfully! We've recorded your purchase.</p>
          </div>
        )}

        {needsEmail && (
          <div className="mt-6 flex justify-center">
            <a
              href={`https://wa.me/27715543536?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat about your items via WhatsApp
            </a>
          </div>
        )}
      </div>

      {(hasDigitalAlbum || purchasedTracks.length > 0) && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-10">
          <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-6">
            <Download className="w-6 h-6 text-zinc-400" />
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Downloads</h2>
          </div>
          
          <div className="grid gap-4">
            {hasDigitalAlbum && (
              <a
                href="/audio/invasion-full-album.zip"
                download
                className="flex items-center justify-between p-4 rounded-xl bg-black border border-zinc-800 hover:border-red-500/50 transition-colors group"
              >
                <div>
                  <p className="text-white font-medium group-hover:text-red-400 transition-colors">INVASION Full Album.zip</p>
                  <p className="text-xs text-zinc-500">142 MB • High Quality MP3s + Booklet</p>
                </div>
                <Download className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
              </a>
            )}
            {purchasedTracks.map(t => {
              const audioFile = t.audio || `/audio/${t.id}.mp3`
              return (
                <a
                  key={t.id}
                  href={audioFile}
                  download
                  className="flex items-center justify-between p-4 rounded-xl bg-black border border-zinc-800 hover:border-red-500/50 transition-colors group"
                >
                  <div>
                    <p className="text-white font-medium group-hover:text-red-400 transition-colors">{t.title}.mp3</p>
                    <p className="text-xs text-zinc-500">High Quality Audio</p>
                  </div>
                  <Download className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SuccessPage() {
  return (
    <StoreProvider>
      <SiteNav />
      <main className="min-h-screen bg-black pt-20">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <p className="text-zinc-400">Loading receipt...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <SiteFooter />
      <CartSidebar />
      <MiniPlayer />
    </StoreProvider>
  )
}
