'use client'

import Image from 'next/image'
import { Play, ShoppingCart, Disc3 } from 'lucide-react'
import { ALBUM, TRACKS, formatZAR } from '@/lib/album'
import { useStore } from './store-provider'
import { TrackRow } from './track-row'

export function MusicSection() {
  const { addItem, playTrack } = useStore()

  const playFirst = () => {
    const first = TRACKS.find((t) => t.audio)
    if (first) playTrack(first)
  }

  return (
    <section id="music" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              <Disc3 className="size-4" /> The Album
            </p>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Listen to <span className="text-gold">INVASION</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
          {/* Album feature card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border bg-card glow-red">
              <div className="relative aspect-square">
                <Image
                  src={ALBUM.cover || '/placeholder.svg'}
                  alt="INVASION album cover by YungSavage QTN"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
                <button
                  onClick={playFirst}
                  aria-label="Play album"
                  className="group absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 transition-opacity hover:opacity-100"
                >
                  <span className="glow-red flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                    <Play className="size-7 fill-current" />
                  </span>
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-2xl font-bold">
                  {ALBUM.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {ALBUM.artist} · {ALBUM.releaseDate}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-heading text-2xl font-bold text-gold">
                    {formatZAR(ALBUM.price)}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Full digital album
                  </span>
                </div>
                <button
                  onClick={() =>
                    addItem({
                      id: 'album-digital',
                      name: `${ALBUM.title} — Full Digital Album`,
                      price: ALBUM.price,
                      kind: 'album',
                    })
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <ShoppingCart className="size-5" />
                  Buy Full Album
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Or buy any single below from {formatZAR(25)}
                </p>
              </div>
            </div>
          </div>

          {/* Tracklist */}
          <div className="flex flex-col gap-2.5">
            {TRACKS.map((track) => (
              <TrackRow key={track.id} track={track} />
            ))}
            <p className="mt-3 text-sm text-muted-foreground">
              Tap a track to preview. Singles add to cart individually — secure
              checkout powered by Yoco.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
