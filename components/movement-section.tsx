'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { ALBUM } from '@/lib/album'
import { useStore } from './store-provider'
import { TRACKS } from '@/lib/album'

const SUPPORTERS = [
  {
    name: 'Lonwabo',
    place: 'Queenstown',
    text: 'QTN puts the kasi on the map. INVASION runs in every taxi back home.',
  },
  {
    name: 'Asanda',
    place: 'East London',
    text: 'Real music, real story. You can feel the faith and the grind in every track.',
  },
  {
    name: 'DJ Mthi',
    place: 'Mthatha',
    text: 'eKasi and Far are on permanent rotation. The movement is real.',
  },
]

const MARQUEE = [
  'ROYAL KASI STORIES',
  'INVASION OUT NOW',
  'QUEENSTOWN',
  'QTN RECORDS',
  'THEY CALL IT CHAOS — I CALL IT SURVIVAL',
]

export function MovementSection() {
  const { playTrack } = useStore()
  const playFirst = () => {
    const first = TRACKS.find((t) => t.audio)
    if (first) playTrack(first)
  }

  return (
    <section id="movement" className="relative py-20 sm:py-28">
      {/* Marquee band */}
      <div className="mb-16 border-y border-border bg-primary/10 py-4">
        <div className="no-scrollbar flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
            {[...MARQUEE, ...MARQUEE].map((text, i) => (
              <span
                key={i}
                className="font-heading text-lg font-bold uppercase tracking-wider text-foreground/80"
              >
                {text}
                <span className="ml-8 text-primary">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            The Movement
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Built by the <span className="text-gold">community</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SUPPORTERS.map((s) => (
            <figure
              key={s.name}
              className="rounded-2xl border border-border bg-card/60 p-6"
            >
              <blockquote className="text-pretty leading-relaxed text-foreground">
                &ldquo;{s.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {s.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {s.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {s.place}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* CTA band */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-border">
          <Image
            src="/images/artist-wall.jpg"
            alt="YungSavage QTN portrait against a textured teal wall"
            fill
            className="object-cover object-top opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="relative flex flex-col items-start gap-5 p-8 sm:p-12">
            <h3 className="max-w-xl font-heading text-3xl font-bold leading-tight text-balance sm:text-4xl">
              Join the invasion. Stream {ALBUM.title} and ride with the movement.
            </h3>
            <button
              onClick={playFirst}
              className="glow-red inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <Play className="size-5 fill-current" />
              Play the Album
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
