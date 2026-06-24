import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'YungSavage QTN — INVASION | Official Site',
  description:
    'INVASION — the new album from South African hip-hop artist YungSavage QTN (Siyamkela Kemka) from Queenstown. Stream, buy singles or the full album. Royal Kasi Stories. They call it chaos, I call it survival.',
  generator: 'v0.app',
  keywords: [
    'YungSavage QTN',
    'Siyamkela Kemka',
    'INVASION',
    'South African hip-hop',
    'Queenstown',
    'kasi rap',
    'Royal Kasi Stories',
    'Eastern Cape hip-hop',
    'QTN Records',
    'DrippaValleyEnt',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'YungSavage QTN — INVASION | Official Site',
    description:
      'INVASION — the new album from South African hip-hop artist YungSavage QTN. Stream, buy singles or the full album now.',
    images: ['/images/invasion-cover-front.jpg'],
    type: 'music.album',
    siteName: 'YungSavage QTN Official Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YungSavage QTN — INVASION | Official Site',
    description: 'Stream and download the new album INVASION by YungSavage QTN. Royal Kasi Stories.',
    images: ['/images/invasion-cover-front.jpg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
