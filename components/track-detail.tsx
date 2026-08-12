'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { ALBUM, formatZAR, type Track } from '@/lib/album'
import { useStore } from './store-provider'
import { cn } from '@/lib/utils'

export function TrackDetail({ track }: { track: Track }) {
  const { playTrack, currentTrack, isPlaying, addItem, items } = useStore()
  const [added, setAdded] = useState(false)
  const isCurrent = currentTrack?.id === track.id
  const playingThis = isCurrent && isPlaying
  const inCart = items.some((i) => i.id === `single-${track.id}`)

  const handleAdd = () => {
    addItem({
      id: `single-${track.id}`,
      name: `${track.title} (Single)`,
      price: track.price,
      kind: 'single',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <section className="mx-auto max-w-4xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/#music" className="hover:text-foreground">
              INVASION
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground">
            {track.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 sm:grid-cols-[220px_1fr]">
        <div className="overflow-hidden rounded-2xl border border-border bg-card glow-red">
          <div className="relative aspect-square">
            <Image
              src={ALBUM.cover || '/placeholder.svg'}
              alt={`${track.title} — track artwork from the INVASION album by YungSavage QTN`}
              fill
              className="object-cover"
              sizes="220px"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Track {String(track.number).padStart(2, '0')} · INVASION
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {track.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            By YungSavage QTN (Siyamkela Kemka){' '}
            {track.feature && <>· feat. {track.feature}</>}
          </p>
          {track.tag && (
            <span className="mt-3 inline-block rounded bg-gold/15 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
              {track.tag}
            </span>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => track.audio && playTrack(track)}
              disabled={!track.audio}
              aria-label={
                track.audio ? `Play preview of ${track.title}` : 'Preview coming soon'
              }
              className={cn(
                'flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              {playingThis ? (
                <Pause className="size-5 fill-current" />
              ) : (
                <Play className="size-5 fill-current" />
              )}
              {track.audio ? (playingThis ? 'Pause preview' : 'Play preview') : 'Preview coming soon'}
            </button>

            <button
              onClick={handleAdd}
              aria-label={`Buy ${track.title} for ${formatZAR(track.price)}`}
              className={cn(
                'flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-colors',
                inCart || added
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-border text-foreground hover:border-primary hover:text-primary',
              )}
            >
              {inCart || added ? (
                <Check className="size-5" />
              ) : (
                <ShoppingCart className="size-5" />
              )}
              {inCart || added ? 'Added' : `Buy single — ${formatZAR(track.price)}`}
            </button>
          </div>

          <p className="mt-6 max-w-prose text-pretty leading-relaxed text-muted-foreground">
            &ldquo;{track.title}&rdquo; is track {track.number} on{' '}
            <Link href="/#music" className="text-foreground underline underline-offset-4 hover:text-primary">
              INVASION
            </Link>
            , the {ALBUM.releaseDate} album from Queenstown hip-hop artist YungSavage
            QTN. {track.feature ? `Featuring ${track.feature}, this track continues` : 'This track continues'}{' '}
            the record&apos;s Royal Kasi Stories thread — cinematic, kasi-rooted
            storytelling recorded under {ALBUM.label}. Stream the preview above or
            buy the high-quality digital single for {formatZAR(track.price)}, or get
            the full 13-track album for {formatZAR(ALBUM.price)}.
          </p>
        </div>
      </div>
    </section>
  )
}
