/**
 * Central SEO constants. The canonical site URL is read from the
 * NEXT_PUBLIC_SITE_URL environment variable (see .env.example) with a
 * localhost fallback for local development — never hardcode the production
 * domain elsewhere in the codebase.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/$/, '')

export const SITE_NAME = 'YungSavage QTN'

export const SITE_TITLE = 'YungSavage QTN — INVASION | Official Site'

export const SITE_DESCRIPTION =
  'INVASION — the new album from South African hip-hop artist YungSavage QTN (Siyamkela Kemka) from Queenstown, Eastern Cape. Stream previews, buy singles, or get the full 13-track digital album. Royal Kasi Stories. They call it chaos, I call it survival.'

/** Resolve a site-relative path to an absolute URL using SITE_URL. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString()
}
