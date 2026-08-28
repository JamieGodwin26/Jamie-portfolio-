import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { RotatingBadge } from '@/components/ui/RotatingBadge'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface" aria-label="Site footer">
      <Container className="section-padding">

        {/* ── Display words ── */}
        <FadeIn direction="up" duration={0.7}>
          <div className="flex items-start justify-between gap-6">
            <div aria-hidden="true" className="select-none">
              <p className="text-display-footer font-sans font-normal leading-[1.1] tracking-tight text-ink">
                Thanks
              </p>
              <p className="text-display-footer font-sans font-normal leading-[1.1] tracking-tight text-ink">
                for visiting.
              </p>
            </div>
            <div className="hidden flex-shrink-0 pt-2 sm:block">
              <RotatingBadge text="Product Designer" />
            </div>
          </div>
        </FadeIn>

        {/* ── CTA ── */}
        <FadeIn direction="up" delay={0.1} duration={0.6}>
          <p className="text-section-heading mt-6 font-sans font-light leading-normal text-ink-secondary">
            <Link
              href="/contact"
              className="rounded-sm underline-offset-4 transition-opacity duration-150 hover:opacity-70 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Let&rsquo;s create together.
            </Link>
          </p>
        </FadeIn>

        {/* ── Meta ── */}
        <FadeIn direction="up" delay={0.2} duration={0.6}>
          <div className="mt-16 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-caption font-light leading-normal text-ink-muted">
              Designed &amp; Developed by Jamie Godwin
            </p>
            <p className="font-sans text-caption font-light leading-normal text-ink-muted">
              &copy; {currentYear} &middot; All Rights Reserved
            </p>
          </div>
        </FadeIn>

      </Container>
    </footer>
  )
}
