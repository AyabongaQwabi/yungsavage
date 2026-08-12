import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { TRACKS, ALBUM } from '@/lib/album'

export default function sitemap(): MetadataRoute.Sitemap {
  const releaseDate = new Date(ALBUM.releaseDate)

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: releaseDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  const trackRoutes: MetadataRoute.Sitemap = TRACKS.map((track) => ({
    url: `${SITE_URL}/tracks/${track.id}`,
    lastModified: releaseDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // /success is intentionally excluded — it's a transactional, per-order page
  // with no stable content and is noindexed.

  return [...staticRoutes, ...trackRoutes]
}
