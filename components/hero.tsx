'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play, ShoppingCart, ChevronDown } from 'lucide-react'
import { ALBUM, formatZAR } from '@/lib/album'
import { useStore } from './store-provider'

export function Hero() {
  const { addItem } = useStore()
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 -z-10 scale-110"
        style={{ transform: `translateY(${offset * 0.35}px) scale(1.12)` }}
      >
        <Image
          src={ALBUM.cover || '/placeholder.svg'}
          alt="YungSavage QTN lying on a rain-soaked city street for the INVASION album cover"
          fill
          priority
          className="object-cover object-center opacity-55"
        />
      </div>
      {/* Cinematic gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-transparent to-background/60" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            New Album · Out {ALBUM.releaseDate}
          </div>

          <h1 className="font-heading text-6xl font-bold leading-[0.9] tracking-tight text-balance sm:text-8xl lg:text-[9rem]">
            <span className="block text-foreground">INVA</span>
            <span className="block text-stroke-gold">SION</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Royal Kasi Stories from Queenstown. The new body of work from{' '}
            <span className="font-semibold text-foreground">
              {ALBUM.artist}
            </span>{' '}
            ({ALBUM.realName}).{' '}
            <span className="italic text-gold">&ldquo;{ALBUM.tagline}&rdquo;</span>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => go('music')}
              className="glow-red inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <Play className="size-5 fill-current" />
              Stream INVASION
            </button>
            <button
              onClick={() =>
                addItem({
                  id: 'album-digital',
                  name: `${ALBUM.title} — Full Digital Album`,
                  price: ALBUM.price,
                  kind: 'album',
                })
              }
              className="inline-flex items-center gap-2 rounded-full border border-gold bg-transparent px-7 py-3.5 text-base font-semibold text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              <ShoppingCart className="size-5" />
              Buy Now · {formatZAR(ALBUM.price)}
            </button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { k: '13', v: 'Tracks' },
              { k: 'Queenstown', v: 'Eastern Cape, SA' },
              { k: '2026', v: 'QTN Records' },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-heading text-2xl font-bold text-foreground">
                  {s.k}
                </dt>
                <dd className="text-sm uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <button
        onClick={() => go('music')}
        aria-label="Scroll to music"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown className="size-7 animate-bounce" />
      </button>
    </section>
  )
}
