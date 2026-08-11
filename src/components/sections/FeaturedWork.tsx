import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { Container } from '@/components/ui/Container'
import { ProjectFilmstrip } from '@/components/ui/ProjectFilmstrip'
import { featuredProjects } from '@/lib/projects'

export function FeaturedWork() {
  return (
    <section
      id="projects"
      aria-labelledby="work-heading"
      className="section-padding"
    >
      <Container>

        {/* ── Header ── */}
        <div className="mb-10 flex items-center justify-between gap-4 md:mb-14">
          <div className="flex items-center gap-2.5">
            <FadeIn direction="none" className="h-1.5 w-1.5 flex-shrink-0 bg-accent" />
            <FadeIn direction="up">
              <h2 id="work-heading" className="text-label text-ink">
                Selected work
              </h2>
            </FadeIn>
          </div>
          <FadeIn direction="up" delay={0.05}>
            <Link
              href="/projects"
              className="text-label rounded-[var(--radius-pill)] border border-border-strong px-3 py-1.5 text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              See all &rarr;
            </Link>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.08} className="mb-10 md:mb-14">
          <p className="max-w-[52ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
            Six projects, each one a design problem that grew into a product or business decision.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <ProjectFilmstrip projects={featuredProjects} />
        </FadeIn>

      </Container>
    </section>
  )
}
