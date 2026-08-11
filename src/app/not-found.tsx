import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: '404 · Page not found',
}

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center section-padding">
      <Container>
        <p className="font-sans text-sm font-light leading-normal text-ink-muted">404</p>
        <h1 className="text-section-heading mt-2 font-display font-normal leading-tight text-ink">
          Page not found
        </h1>
        <p className="mt-4 max-w-[45ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block font-sans text-base font-normal leading-normal text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
        >
          ← Back to home
        </Link>
      </Container>
    </main>
  )
}
