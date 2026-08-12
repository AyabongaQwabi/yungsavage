import type { Metadata } from 'next'

// Order success pages are per-transaction and have no stable, indexable
// content — keep them out of search results.
export const metadata: Metadata = {
  title: 'Order Confirmed',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
