'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ALBUM, formatZAR } from '@/lib/album'

type FaqItem = {
  question: string
  answer: React.ReactNode
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Who is YungSavage QTN?',
    answer: (
      <>
        <strong>YungSavage QTN</strong> (born <em>Siyamkela Kemka</em>) is a South African hip-hop artist from <strong>Queenstown, Eastern Cape</strong> (often referred to as QTN). Deeply grounded in Xhosa culture, faith, and authentic township life, his music represents a new wave of <strong>Kasi Rap</strong> under the <strong>QTN Records</strong> label.
      </>
    ),
  },
  {
    question: `What is the new album "${ALBUM.title}"?`,
    answer: (
      <>
        <strong>{ALBUM.title}</strong> is the latest full-length digital album from {ALBUM.artist}, released on <strong>{ALBUM.releaseDate}</strong>. The project contains <strong>13 tracks</strong>, delivering a blend of hard-hitting beats, Xhosa pride, and cinematic storytelling. It includes notable tracks such as <em>&ldquo;They_Know&rdquo;</em>, <em>&ldquo;Spirit Up&rdquo;</em> (feat. Siyanda the Vocalist), and <em>&ldquo;Far&rdquo;</em> (feat. EasyD Rsa).
      </>
    ),
  },
  {
    question: 'How can I stream or download the music?',
    answer: (
      <>
        You can play preview clips of any track directly on this website. High-quality digital audio downloads (in 320kbps MP3 format) are available via secure checkout powered by <strong>Yoco</strong>. You can purchase the full digital album for <strong>{formatZAR(ALBUM.price)}</strong>, or purchase individual singles starting from <strong>{formatZAR(25)}</strong> to <strong>{formatZAR(35)}</strong> each.
      </>
    ),
  },
  {
    question: 'What is included in the Royal Kasi Deluxe Bundle?',
    answer: (
      <>
        The <strong>Royal Kasi Deluxe Bundle</strong> (priced at <strong>{formatZAR(450)}</strong>) is the ultimate package for supporters. It includes:
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Immediate download of the full 13-track digital album.</li>
          <li>A limited-edition physical <strong>INVASION Tee</strong> (unisex, heavyweight black cotton with gold & red print).</li>
          <li>A signed digital art card.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Is my payment secure?',
    answer: (
      <>
        Yes, all transactions are processed securely through <strong>Yoco</strong>, a leading South African payment gateway. We accept card payments, instant EFTs, and Apple Pay. Once your payment succeeds, you will be redirected to a success page to immediately download your digital music and claim any physical items.
      </>
    ),
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-20 sm:py-28 border-t border-zinc-900 bg-black">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 size-96 rounded-full bg-red-900/10 blur-[120px]" />
      <div className="absolute bottom-10 right-1/4 -z-10 size-96 rounded-full bg-gold/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <HelpCircle className="size-4" /> FAQ & Facts
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Find quick details about {ALBUM.artist}, the {ALBUM.title} album release, merchandise, and secure download options.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-card/40 transition-all duration-300',
                  isOpen ? 'border-primary/50 glow-red' : 'border-border hover:border-zinc-800'
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-5 text-left font-heading font-semibold text-lg text-foreground hover:text-white transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'size-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4',
                      isOpen && 'rotate-180 text-primary'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 text-muted-foreground leading-relaxed border-t border-zinc-900/50 mt-1">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
