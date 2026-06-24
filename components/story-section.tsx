'use client'

import Image from 'next/image'
import { Quote, Play } from 'lucide-react'

const QUOTES = [
  {
    q: 'I come from Queenstown. Everything I rap about is real — the struggle, the faith, the people who held me down when there was nothing.',
    label: 'On his roots',
  },
  {
    q: 'They call it chaos. I call it survival. INVASION is me taking what is mine, calmly but without apology.',
    label: 'On the album',
  },
  {
    q: 'God first. Then the work. I stay quiet, I stay focused, and I let the music do the shouting.',
    label: 'On faith & focus',
  },
]

export function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Images collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/artist-street.jpg"
                alt="YungSavage QTN standing on a township street at golden hour in Queenstown"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/artist-blue.jpg"
                alt="YungSavage QTN crouching against a blue wall in a denim sherpa jacket"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Royal Kasi Stories
            </p>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              The man behind the{' '}
              <span className="text-gold">invasion</span>
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Born Siyamkela Kemka in Queenstown, Eastern Cape, YungSavage QTN
              turned township reality into a sound. Grounded in Xhosa culture
              and faith, his music carries the calm confidence of someone who
              has seen it all and kept moving. INVASION is the story of that
              grind — quiet on the outside, relentless underneath.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {QUOTES.map((item) => (
                <figure
                  key={item.label}
                  className="rounded-xl border border-border bg-card/60 p-5"
                >
                  <Quote className="mb-2 size-5 text-primary" />
                  <blockquote className="text-pretty leading-relaxed text-foreground">
                    {item.q}
                  </blockquote>
                  <figcaption className="mt-2 text-xs uppercase tracking-wider text-gold">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Interview video */}
            <a
              href="https://www.youtube.com/results?search_query=YungSavage+QTN+Royal+Kasi+Stories"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-center gap-4 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/60"
            >
              <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src="/images/artist-wall.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/40">
                  <Play className="size-5 fill-current text-primary-foreground" />
                </span>
              </span>
              <span>
                <span className="block font-heading font-semibold text-foreground">
                  Watch: Royal Kasi Stories Interview
                </span>
                <span className="block text-sm text-muted-foreground">
                  Faith, the journey & the making of INVASION
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
