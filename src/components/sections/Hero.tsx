'use client'

import { HeroReveal, HeroWord } from '@/components/motion/HeroReveal'
import { FadeIn } from '@/components/motion/FadeIn'
import { Container } from '@/components/ui/Container'

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[calc(100svh-60px)] flex-col justify-center section-padding"
    >
      <Container>

        {/* Screen-reader heading */}
        <h1 className="sr-only">Creative Product Designer: Strategy, UX/UI Design &amp; Venture Development</h1>

        {/*
          Display title: aria-hidden because sr-only h1 carries the semantic weight.
          "Creative" = Light 300, "PRODUCT" + "DESIGNER" = ExtraBold 800 uppercase.
        */}
        <HeroReveal aria-hidden="true" className="text-center">
          <HeroWord
            className="text-display-hero font-sans font-light leading-[1.05] tracking-tight text-ink"
          >
            Creative
          </HeroWord>
          <HeroWord
            className="text-display-hero font-sans font-extrabold uppercase leading-[1.05] tracking-tight text-ink"
          >
            Product
          </HeroWord>
          <HeroWord
            className="text-display-hero font-sans font-extrabold uppercase leading-[1.05] tracking-tight text-ink"
          >
            Designer
          </HeroWord>
        </HeroReveal>

        <FadeIn direction="up" delay={0.3} className="mt-5 text-center">
          <p className="mx-auto max-w-[36ch] font-sans text-lg font-light leading-snug text-ink-secondary">
            Strategy, UX/UI Design &amp; Venture Development
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.4} className="mt-4 text-center">
          <p className="mx-auto max-w-[42ch] font-mono text-sm leading-relaxed tracking-wide text-ink-muted">
            Design has always been how I solve problems. The scope has just changed over time.
          </p>
        </FadeIn>

      </Container>
    </section>
  )
}
