'use client'

import Image from 'next/image'
import { Play, Pause, Plus } from 'lucide-react'
import { useStore } from './store-provider'
import { ALBUM, formatZAR } from '@/lib/album'
import { cn } from '@/lib/utils'

function fmt(t: number) {
  if (!t || Number.isNaN(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    progress,
    duration,
    seek,
    addItem,
  } = useStore()

  if (!currentTrack) return null
  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl">
      {/* progress */}
      <div className="relative h-1 w-full bg-secondary">
        <div
          className="absolute inset-y-0 left-0 bg-primary"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-md">
          <Image
            src={ALBUM.cover || '/placeholder.svg'}
            alt=""
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="size-5 fill-current" />
          ) : (
            <Play className="size-5 fill-current" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-sm font-semibold text-foreground">
            {currentTrack.title}
            {currentTrack.feature && (
              <span className="font-normal text-muted-foreground">
                {' '}
                · feat. {currentTrack.feature}
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {fmt(progress)} / {fmt(duration)} · {ALBUM.artist}
          </p>
        </div>

        <button
          onClick={() =>
            addItem({
              id: `single-${currentTrack.id}`,
              name: `${currentTrack.title} (Single)`,
              price: currentTrack.price,
              kind: 'single',
            })
          }
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-full border border-gold px-3.5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-gold-foreground',
          )}
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">
            {formatZAR(currentTrack.price)}
          </span>
        </button>
      </div>
    </div>
  )
}
