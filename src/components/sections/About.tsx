import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { Container } from '@/components/ui/Container'

const BIO_PARAGRAPHS = [
  "I'm Jamie Godwin — a product venture lead based in Johannesburg, working at the intersection of product thinking, venture design, and brand clarity, currently shaping product and venture initiatives at Neslo.",
]

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16 lg:gap-24">

          {/* ── Heading column ── */}
          <FadeIn direction="up" className="md:pt-1">
            <h2
              id="about-heading"
              className="text-label text-ink"
            >
              Who am I
            </h2>
          </FadeIn>

          {/* ── Body copy column ── */}
          <div className="flex flex-col gap-6">
            <StaggerGroup className="flex flex-col gap-5">
              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <StaggerItem key={index}>
                  <p className="font-sans text-base font-light leading-relaxed text-ink-secondary">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <FadeIn direction="up" delay={0.15}>
              <Link
                href="/about"
                className="mt-2 inline-block font-sans text-base font-normal leading-normal text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm transition-opacity duration-150"
              >
                More About Me
              </Link>
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  )
}
