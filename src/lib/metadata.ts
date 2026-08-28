import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jamiegodwin.co.za'

/*
  Shared across Nav and the About page. Self-hosted from /public rather than
  linked out to Google Drive, so it can't go stale behind a share-link change.
  Replace public/jamie-godwin-cv.pdf directly whenever the CV updates.
*/
export const CV_URL = '/jamie-godwin-cv.pdf'

/** Recipient for the contact form's API route (src/app/api/contact/route.ts) */
export const CONTACT_EMAIL = 'jamie@neslotech.co.za'

export const siteMetadata = {
  name: 'Jamie Godwin',
  title: 'Jamie Godwin · Product Designer',
  description:
    'Product Designer based in Johannesburg, South Africa, working at the intersection of product strategy, UX/UI design, and venture development. Design has always been how I solve problems. The scope has just changed over time.',
  url: BASE_URL,
  ogImage: `${BASE_URL}/og.png`,
  twitter: '@jamiegodwin',
}

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: siteMetadata.title,
      template: `%s · Jamie Godwin`,
    },
    description: siteMetadata.description,
    keywords: [
      'product designer',
      'UI/UX designer',
      'product venture lead',
      'venture design',
      'product strategy',
      'South Africa',
      'digital design',
    ],
    authors: [{ name: 'Jamie Godwin', url: BASE_URL }],
    creator: 'Jamie Godwin',
    openGraph: {
      type: 'website',
      locale: 'en_ZA',
      url: BASE_URL,
      siteName: siteMetadata.name,
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [{ url: siteMetadata.ogImage, width: 1200, height: 630, alt: siteMetadata.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [siteMetadata.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    ...overrides,
  }
}
