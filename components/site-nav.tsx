'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useStore } from './store-provider'
import { cn } from '@/lib/utils'

const LINKS = [
  { id: 'music', label: 'Music' },
  { id: 'story', label: 'Story' },
  { id: 'merch', label: 'Merch' },
  { id: 'visuals', label: 'Visuals' },
  { id: 'movement', label: 'Movement' },
]

export function SiteNav() {
  const { count, setCartOpen } = useStore()
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', ...LINKS.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight"
        >
          <span className="text-foreground">YungSavage</span>
          <span className="text-primary">QTN</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className={cn(
                'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active === link.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
              {active === link.id && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go('music')}
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 sm:block"
          >
            Stream Now
          </button>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative rounded-full border border-border bg-card p-2.5 text-foreground transition-colors hover:border-primary"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full border border-border bg-card p-2.5 text-foreground md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={cn(
                  'rounded-md px-3 py-3 text-left text-base font-medium',
                  active === link.id
                    ? 'bg-card text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
