import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { TiltReveal } from '@/components/motion/TiltReveal'
import { PlaceholderIcon } from '@/components/ui/PlaceholderIcon'
import type { Project } from '@/types'
import type { CaseStudyContent } from '@/lib/case-studies'

interface ArchivedCaseStudyProps {
  project: Project
  content: CaseStudyContent
}

export function ArchivedCaseStudy({ project, content }: ArchivedCaseStudyProps) {
  const washVar = `var(--color-wash-${project.wash})`

  return (
    <main>
      <article aria-labelledby="case-study-title">
        <Container className="section-padding">
          <div className="mx-auto max-w-[65ch]">

            <FadeIn direction="up">
              <Link
                href="/projects"
                className="mb-6 inline-block text-label text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
              >
                ← Back
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                {project.categories.map((cat) => (
                  <span key={cat} className="text-meta text-ink-muted">
                    {cat}
                  </span>
                ))}
                <span className="text-meta whitespace-nowrap rounded-[var(--radius-pill)] border border-border-strong px-2.5 py-1 text-ink-muted">
                  Earlier work
                </span>
              </div>

              <h1
                id="case-study-title"
                className="mt-4 font-sans text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink"
              >
                {project.title}
              </h1>

              <p className="mt-3 font-sans text-base font-light leading-relaxed text-ink-secondary">
                {content.summary}
              </p>
              <p className="text-meta mt-2 text-ink-muted">{project.year}</p>
            </FadeIn>

          </div>

          {/* ── Screens: unannotated, on the project's colour wash, tilts
               upright as it scrolls into view ── */}
          <TiltReveal
            className="mx-auto mt-12 grid max-w-[65ch] grid-cols-2 gap-3 rounded-[var(--radius-panel)] p-4 sm:grid-cols-4"
            style={{ backgroundColor: washVar }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex aspect-[3/4] items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface-raised text-ink-faint"
              >
                <PlaceholderIcon size={18} />
              </div>
            ))}
          </TiltReveal>

          {/* ── Request-detail note ── */}
          <FadeIn direction="up" delay={0.1} className="mx-auto mt-10 max-w-[65ch]">
            <p className="text-meta text-ink-muted">
              Full write-up available on request:{' '}
              <Link
                href="/contact"
                className="text-accent-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
              >
                get in touch
              </Link>
              .
            </p>
          </FadeIn>

        </Container>
      </article>
    </main>
  )
}
