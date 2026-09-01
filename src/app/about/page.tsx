import Image from '@/components/ui/PlaceholderImage'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { buildMetadata, CV_URL } from '@/lib/metadata'
import { aboutIntro, aboutSections } from '@/lib/about'

export const metadata = buildMetadata({
  title: 'About',
  description:
    'I am Jamie, a product designer working at the intersection of product thinking, venture design, and brand clarity, based in Johannesburg.',
})

export default function AboutPage() {
  return (
    <main>
      <section aria-labelledby="about-page-heading" className="section-padding">
        <Container>

          {/* ── Header ── */}
          <FadeIn direction="up" className="mb-10 flex items-baseline justify-between gap-4 md:mb-14">
            <h1 id="about-page-heading" className="text-section-heading font-display font-normal leading-tight text-ink">
              Jamie Godwin
            </h1>
            <span className="text-label text-ink-muted">About me</span>
          </FadeIn>

          {/* ── Photo + accordion ── */}
          <div className="grid gap-10 md:grid-cols-[140px_1fr] md:gap-16 lg:gap-24">
            <FadeIn direction="up" delay={0.05}>
              {/* Photo lives on /about only, not the homepage. See VISUAL_DIRECTION.md. */}
              <div className="relative aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-raised md:max-w-none">
                <Image
                  src="/images/jamie-portrait.png"
                  alt="Portrait of Jamie Godwin"
                  fill
                  sizes="(min-width: 768px) 140px, 220px"
                  className="object-cover grayscale"
                  priority
                />
              </div>
            </FadeIn>

            <div className="flex flex-col gap-12">
              <FadeIn direction="up" delay={0.1}>
                <p className="max-w-[52ch] font-sans text-xl font-light leading-relaxed text-ink">
                  {aboutIntro}
                </p>
              </FadeIn>

              {aboutSections.map((section, sectionIndex) => (
                <div key={section.label} className="flex flex-col gap-4">
                  <FadeIn direction="up" delay={0.12 + sectionIndex * 0.03}>
                    <h2 className="text-label text-ink-muted">{section.label}</h2>
                  </FadeIn>
                  <StaggerGroup className="flex flex-col gap-4">
                    {section.paragraphs.map((paragraph, index) => (
                      <StaggerItem key={index}>
                        <p className="max-w-[65ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                          {paragraph}
                        </p>
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </div>
              ))}

              <FadeIn direction="up" delay={0.3}>
                <Link
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] border border-border-strong px-3 py-1.5 text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  aria-label="Download CV, opens in new tab"
                >
                  Resume &rarr;
                </Link>
              </FadeIn>
            </div>
          </div>

        </Container>
      </section>
    </main>
  )
}
