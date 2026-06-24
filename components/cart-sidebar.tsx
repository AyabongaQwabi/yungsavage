'use client'

import { useState } from 'react'
import { X, Minus, Plus, Trash2, ShieldCheck, Loader2 } from 'lucide-react'
import { useStore } from './store-provider'
import { formatZAR } from '@/lib/album'
import { cn } from '@/lib/utils'

export function CartSidebar() {
  const {
    items,
    cartOpen,
    setCartOpen,
    removeItem,
    updateQty,
    total,
    count,
    clearCart,
  } = useStore()
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const checkout = async () => {
    setLoading(true)
    setNotice(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (res.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl
        return
      }
      if (data.error === 'not_configured') {
        setNotice(
          'Yoco checkout is not connected yet. Ask the site owner to add a YOCO_SECRET_KEY to accept live payments.',
        )
      } else {
        setNotice(data.message || 'Could not start checkout. Please try again.')
      }
    } catch {
      setNotice('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className={cn(
          'fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm transition-opacity duration-300',
          cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden
      />

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300',
          cartOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-heading text-xl font-bold">Your Cart</h2>
            <p className="text-sm text-muted-foreground">
              {count} {count === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-heading text-lg font-semibold">
                Your cart is empty
              </p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Add singles, the full INVASION album, merch or live tickets to
                get started.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.kind} · {formatZAR(item.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                        className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                        className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-heading font-semibold text-foreground">
                      {formatZAR(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            {notice && (
              <p className="mb-3 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-gold">
                {notice}
              </p>
            )}
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatZAR(total)}</span>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-lg font-bold">Total</span>
              <span className="font-heading text-2xl font-bold text-gold">
                {formatZAR(total)}
              </span>
            </div>
            <button
              onClick={checkout}
              disabled={loading}
              className="glow-red flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Starting checkout…
                </>
              ) : (
                <>Checkout with Yoco</>
              )}
            </button>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-gold" />
              Secure payments in ZAR · powered by Yoco
            </div>
            <button
              onClick={clearCart}
              className="mt-2 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
