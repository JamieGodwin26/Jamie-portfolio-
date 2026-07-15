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
        <h1 className="sr-only">Creative Product &amp; Venture Lead</h1>

        {/*
          Display title — aria-hidden because sr-only h1 carries the semantic weight.
          "Creative" = Light 300, "PRODUCT &" + "VENTURE LEAD" = ExtraBold 800 uppercase.
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
            Product &amp;
          </HeroWord>
          <HeroWord
            className="text-display-hero font-sans font-extrabold uppercase leading-[1.05] tracking-tight text-ink"
          >
            Venture Lead
          </HeroWord>
        </HeroReveal>

        <FadeIn direction="up" delay={0.4} className="mt-8 text-center">
          <p className="mx-auto max-w-[42ch] font-mono text-sm leading-relaxed tracking-wide text-ink-muted">
            Design has always been how I solve problems — the scope has just changed over time.
          </p>
        </FadeIn>

      </Container>
    </section>
  )
}
