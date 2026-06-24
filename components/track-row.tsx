'use client'

import { Play, Pause, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { type Track, formatZAR } from '@/lib/album'
import { useStore } from './store-provider'
import { cn } from '@/lib/utils'

export function TrackRow({ track }: { track: Track }) {
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
    <div
      className={cn(
        'group flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:glow-red sm:gap-4 sm:p-4',
        isCurrent && 'border-primary/60 bg-card',
      )}
    >
      {/* Play / number */}
      <button
        onClick={() => track.audio && playTrack(track)}
        disabled={!track.audio}
        aria-label={track.audio ? `Play ${track.title}` : 'Preview coming soon'}
        className={cn(
          'relative flex size-11 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-bold transition-colors',
          track.audio
            ? 'bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground'
            : 'cursor-not-allowed bg-secondary/50 text-muted-foreground',
          isCurrent && 'bg-primary text-primary-foreground',
        )}
      >
        {track.audio ? (
          playingThis ? (
            <Pause className="size-5 fill-current" />
          ) : (
            <Play className="size-5 fill-current" />
          )
        ) : (
          <span>{String(track.number).padStart(2, '0')}</span>
        )}
      </button>

      {/* Title */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {String(track.number).padStart(2, '0')}
          </span>
          <h3 className="truncate font-heading text-base font-semibold text-foreground">
            {track.title}
          </h3>
          {track.tag && (
            <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
              {track.tag}
            </span>
          )}
        </div>
        {track.feature ? (
          <p className="truncate text-sm text-muted-foreground">
            feat. {track.feature}
          </p>
        ) : (
          <p className="truncate text-sm text-muted-foreground">
            {playingThis ? 'Now playing' : 'YungSavage QTN'}
          </p>
        )}
      </div>

      {/* Equalizer when playing */}
      {playingThis && (
        <div className="hidden items-end gap-0.5 sm:flex" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 origin-bottom rounded-full bg-primary"
              style={{
                height: 16,
                animation: `equalize 0.7s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Price + add */}
      <div className="flex items-center gap-2">
        <span className="hidden text-sm font-semibold text-muted-foreground sm:inline">
          {formatZAR(track.price)}
        </span>
        <button
          onClick={handleAdd}
          aria-label={`Add ${track.title} single to cart`}
          className={cn(
            'flex size-9 items-center justify-center rounded-lg border transition-colors',
            inCart || added
              ? 'border-gold bg-gold/15 text-gold'
              : 'border-border text-muted-foreground hover:border-primary hover:text-primary',
          )}
        >
          {inCart || added ? (
            <Check className="size-4" />
          ) : (
            <Plus className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}
