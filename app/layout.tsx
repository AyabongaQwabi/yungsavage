import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/seo'
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'v0.app',
  keywords: [
    'YungSavage QTN',
    'Siyamkela Kemka',
    'INVASION',
    'South African hip-hop',
    'Queenstown hip-hop artist',
    'kasi rap',
    'Royal Kasi Stories',
    'Eastern Cape hip-hop',
    'QTN Records',
    'DrippaValleyEnt',
    'South African rap album 2026',
  ],
  authors: [{ name: 'YungSavage QTN' }],
  creator: 'YungSavage QTN',
  publisher: 'QTN Records',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      'INVASION — the new album from South African hip-hop artist YungSavage QTN. Stream, buy singles or the full album now.',
    url: '/',
    siteName: 'YungSavage QTN Official Store',
    images: [
      {
        url: '/images/invasion-cover-front.jpg',
        width: 1200,
        height: 1200,
        alt: 'INVASION album cover by YungSavage QTN',
      },
    ],
    locale: 'en_ZA',
    type: 'music.album',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: 'Stream and download the new album INVASION by YungSavage QTN. Royal Kasi Stories.',
    images: ['/images/invasion-cover-front.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  category: 'music',
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
