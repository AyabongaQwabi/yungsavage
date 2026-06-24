'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { VIDEOS } from '@/lib/album'

export function VisualsSection() {
  return (
    <section id="visuals" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Latest Visuals
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Music videos & <span className="text-gold">visualizers</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VIDEOS.map((video) => (
            <a
              key={video.id}
              href="https://www.youtube.com/results?search_query=YungSavage+QTN+INVASION"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={video.image || '/placeholder.svg'}
                alt={`${video.title} — ${video.type}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <Play className="size-6 fill-current" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xs uppercase tracking-wider text-gold">
                  {video.type}
                </p>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {video.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
