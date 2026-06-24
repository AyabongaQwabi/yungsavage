'use client'

import Image from 'next/image'
import { ShoppingCart, Crown } from 'lucide-react'
import { MERCH, formatZAR } from '@/lib/album'
import { useStore } from './store-provider'
import { cn } from '@/lib/utils'

export function MerchSection() {
  const { addItem } = useStore()

  return (
    <section id="merch" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Merch & Support
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Rep the <span className="text-gold">movement</span>
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Album, bundles and live show tickets — every purchase fuels the
            invasion. Secure Yoco checkout in ZAR.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MERCH.map((product) => (
            <article
              key={product.id}
              className={cn(
                'group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1',
                product.premium
                  ? 'border-gold/50 hover:glow-gold'
                  : 'border-border hover:border-primary/60 hover:glow-red',
              )}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {product.badge && (
                  <span
                    className={cn(
                      'absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
                      product.premium
                        ? 'bg-gold text-gold-foreground'
                        : 'bg-primary text-primary-foreground',
                    )}
                  >
                    {product.premium && <Crown className="size-3" />}
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-heading text-lg font-semibold leading-tight text-balance">
                  {product.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={cn(
                      'font-heading text-xl font-bold',
                      product.premium ? 'text-gold' : 'text-foreground',
                    )}
                  >
                    {formatZAR(product.price)}
                  </span>
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        kind:
                          product.id === 'ticket-live'
                            ? 'ticket'
                            : product.id === 'album-digital'
                              ? 'album'
                              : 'merch',
                      })
                    }
                    aria-label={`Add ${product.name} to cart`}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:scale-105',
                      product.premium
                        ? 'bg-gold text-gold-foreground'
                        : 'bg-primary text-primary-foreground',
                    )}
                  >
                    <ShoppingCart className="size-4" />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
