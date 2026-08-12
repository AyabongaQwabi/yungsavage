import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StoreProvider } from '@/components/store-provider'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { MiniPlayer } from '@/components/mini-player'
import { TrackDetail } from '@/components/track-detail'
import { ALBUM, TRACKS } from '@/lib/album'
import { SITE_URL, absoluteUrl } from '@/lib/seo'

export function generateStaticParams() {
  return TRACKS.map((track) => ({ slug: track.id }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const track = TRACKS.find((t) => t.id === slug)
  if (!track) return {}

  const title = `${track.title} — Lyrics, Stream & Buy the Single`
  const description = `Listen to a preview of "${track.title}"${track.feature ? ` feat. ${track.feature}` : ''}, track ${track.number} from INVASION by YungSavage QTN. Buy the digital single or the full album.`
  const url = `/tracks/${track.id}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [ALBUM.cover],
      type: 'music.song',
      siteName: 'YungSavage QTN Official Store',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ALBUM.cover],
    },
  }
}

export default async function TrackPage({ params }: Props) {
  const { slug } = await params
  const track = TRACKS.find((t) => t.id === slug)
  if (!track) notFound()

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicRecording',
        '@id': `${absoluteUrl(`/tracks/${track.id}`)}#track`,
        name: track.title,
        position: track.number,
        url: absoluteUrl(`/tracks/${track.id}`),
        image: absoluteUrl(ALBUM.cover),
        byArtist: {
          '@type': 'MusicGroup',
          '@id': `${SITE_URL}/#artist`,
          name: ALBUM.artist,
        },
        inAlbum: {
          '@type': 'MusicAlbum',
          '@id': `${SITE_URL}/#album`,
          name: ALBUM.title,
        },
        ...(track.audio && { audio: { '@type': 'AudioObject', contentUrl: absoluteUrl(track.audio) } }),
        offers: {
          '@type': 'Offer',
          price: String(track.price),
          priceCurrency: 'ZAR',
          url: absoluteUrl(`/tracks/${track.id}`),
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: ALBUM.title, item: absoluteUrl('/#music') },
          {
            '@type': 'ListItem',
            position: 3,
            name: track.title,
            item: absoluteUrl(`/tracks/${track.id}`),
          },
        ],
      },
    ],
  }

  return (
    <StoreProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SiteNav />
      <main>
        <TrackDetail track={track} />
      </main>
      <SiteFooter />
      <CartSidebar />
      <MiniPlayer />
    </StoreProvider>
  )
}
