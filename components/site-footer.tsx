'use client'

import { Camera, Play, Music2, AtSign } from 'lucide-react'
import { ALBUM } from '@/lib/album'

const SOCIALS = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Play, label: 'YouTube', href: '#' },
  { icon: Music2, label: 'Spotify', href: '#' },
  { icon: AtSign, label: 'X', href: '#' },
]

const NAV = [
  { id: 'music', label: 'Music' },
  { id: 'story', label: 'Story' },
  { id: 'merch', label: 'Merch' },
  { id: 'visuals', label: 'Visuals' },
  { id: 'movement', label: 'Movement' },
]

export function SiteFooter() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-heading text-2xl font-bold">
              YungSavage<span className="text-primary">QTN</span>
            </p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {ALBUM.realName} · {ALBUM.hometown}. Royal Kasi Stories.{' '}
              <span className="italic text-gold">
                &ldquo;{ALBUM.tagline}&rdquo;
              </span>
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-12">
            <nav aria-label="Footer">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                Explore
              </p>
              <ul className="flex flex-col gap-2">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => go(n.id)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                Release
              </p>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>{ALBUM.title}</li>
                <li>{ALBUM.releaseDate}</li>
                <li>{ALBUM.label}</li>
                <li>Credit: {ALBUM.credit}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {ALBUM.label}. All rights reserved.
          </p>
          <p>Mixed & mastered by QTN Studios · Payments secured by Yoco</p>
        </div>
      </div>
    </footer>
  )
}
