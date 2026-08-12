# AEO / GEO (AI Answer Engine Optimization)

What was done to make this site easy for AI crawlers, assistants, and
answer engines (ChatGPT, Claude, Perplexity, Gemini/AI Overviews, Copilot)
to access, understand, and cite correctly.

## 1. AI crawler access (`app/robots.ts`)

AI crawlers are explicitly **allowed**, not blocked. As an independent
artist, visibility inside AI answers/citations is free promotion, not a
threat — there's no subscription content or paywalled IP to protect here.

Allowed user agents include:
- `GPTBot`, `ChatGPT-User`, `OAI-SearchBot` (OpenAI/ChatGPT)
- `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `anthropic-ai` (Anthropic/Claude)
- `PerplexityBot`, `Perplexity-User` (Perplexity)
- `Google-Extended` (Gemini/AI Overviews training, separate from `Googlebot`)
- `Applebot-Extended`, `Bytespider`, `CCBot`, `Meta-ExternalAgent`

`/api/*` and `/success` (a per-order transactional page with no stable
content) are disallowed for all agents — nothing useful for an answer
engine to cite there, and no reason to spend crawl budget on it.

## 2. `llms.txt` (`public/llms.txt`)

A concise, machine-readable summary of who the artist is, the current
release, and key facts (hometown, real name, label, release date, pricing
currency) so assistants that support the emerging `llms.txt` convention can
ground answers without having to parse the full HTML.

## 3. Structured data as a citation source

JSON-LD (`Person`, `MusicGroup`, `MusicAlbum`, `MusicRecording`, `FAQPage`,
`BreadcrumbList`, `WebSite`) is rendered server-side on every page (home and
each `/tracks/[slug]` page), not injected client-side, so it's present in
the initial HTML response that crawlers (including non-JS-executing AI
crawlers) receive.

Note: Google restricted `FAQPage` rich results to government/health sites
in Aug 2023, so this markup no longer earns a Google SERP rich result. It's
kept here specifically as a GEO asset — FAQ schema is well understood by
LLM-based answer engines as a signal of structured Q&A content, and
Perplexity in particular has been shown to favor FAQ-schema pages for
citation. If Google rich-result eligibility mattered here, this would be
removed; for AI-citation purposes it stays.

## 4. Answer-first, extractable content

- The homepage FAQ section answers the exact questions a fan or an AI
  assistant is likely to ask ("Who is YungSavage QTN?", "What is INVASION?",
  "How can I stream or buy the music?", "Is payment secure?") in short,
  self-contained paragraphs — good for direct quotation/citation.
- Each track now has its own page (`/tracks/[slug]`) with a short,
  factual, standalone description (artist, feature, album, release date,
  label, price) — this gives answer engines a citable, single-purpose URL
  per song instead of forcing them to extract one fact from a long
  single-page site.
- Key facts (real name, hometown, label, release date, pricing) are
  consistent across visible copy, JSON-LD, and `llms.txt` — reduces the risk
  of an AI engine surfacing a hallucinated or conflicting fact.

## 5. Traditional SEO groundwork AI engines also rely on

Most answer engines (ChatGPT browsing, Perplexity, Google AI Overviews)
lean on the underlying search index, so standard technical SEO directly
feeds GEO: `app/sitemap.ts`, canonical tags, OG/Twitter metadata, and
security headers (HSTS, X-Content-Type-Options, etc.) were all added/fixed
as part of this pass — see the commit and PR description for the full list.

## Deliberately skipped

- No separate `/about` or long-form editorial "bio" page was created —
  the existing homepage bio + FAQ + new track pages already give AI engines
  enough grounded, first-party text. Adding a thin bio page purely for
  GEO would risk the thin-content / scaled-content-abuse guardrails called
  out in the `seo-programmatic` skill.
- IndexNow was not wired up (no existing infra/API key for it); flagged as
  a fast follow if faster Bing/Yandex indexing turns out to matter.
