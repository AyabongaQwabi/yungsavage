import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/**
 * robots.txt directives.
 *
 * AI crawler policy: as an independent artist promoting himself, YungSavage
 * QTN benefits from visibility in AI answer engines (ChatGPT, Claude,
 * Perplexity, Google AI Overviews, etc.), so training/browsing crawlers from
 * those providers are explicitly allowed rather than blocked. See
 * AEO_GEO.md for the reasoning.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/success'],
      },
      // Search engine crawlers (explicit allow for clarity)
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },

      // AI answer-engine / assistant crawlers — allowed for visibility.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
