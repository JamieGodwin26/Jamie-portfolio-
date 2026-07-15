import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { TiltReveal } from '@/components/motion/TiltReveal'
import { PlaceholderIcon } from '@/components/ui/PlaceholderIcon'
import type { Project } from '@/types'
import type { CaseStudyContent } from '@/lib/case-studies'

interface FullCaseStudyProps {
  project: Project
  content: CaseStudyContent
  nextProject: Project
}

export function FullCaseStudy({ project, content, nextProject }: FullCaseStudyProps) {
  const washVar = `var(--wash-${project.wash})`

  return (
    <main>
      <article aria-labelledby="case-study-title">
        <Container className="section-padding">
          <div className="grid gap-12 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16 lg:gap-24">

            {/* ── Sticky sidebar ── */}
            <FadeIn direction="up" className="md:sticky md:top-[92px] md:self-start">
              <Link
                href="/#projects"
                className="mb-8 block w-fit text-label text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
              >
                ← Back
              </Link>

              <span className="text-meta inline-block whitespace-nowrap rounded-[var(--radius-pill)] bg-accent/15 px-2.5 py-1 text-accent-text">
                Case study
              </span>

              <h1
                id="case-study-title"
                className="mt-4 font-sans text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink"
              >
                {project.title}
              </h1>

              <p className="mt-3 font-sans text-base font-light leading-relaxed text-ink-secondary">
                {content.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                {project.categories.map((cat) => (
                  <span key={cat} className="text-meta text-ink-muted">
                    {cat}
                  </span>
                ))}
              </div>
              <p className="text-meta mt-1 text-ink-muted">{project.year}</p>

              {content.liveUrl && (
                <a
                  href={content.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label mt-5 inline-block w-fit text-accent-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
                >
                  Live site &rarr;
                </a>
              )}
            </FadeIn>

            {/* ── Scrolling content ── */}
            <div className="flex flex-col gap-16">

              {content.problem && (
                <FadeIn direction="up">
                  <h2 className="text-label mb-3 text-ink">The problem</h2>
                  <p className="max-w-[65ch] font-sans text-lg font-light leading-relaxed text-ink-secondary">
                    {content.problem}
                  </p>
                </FadeIn>
              )}

              {content.process && (
                <div className="flex flex-col gap-6">
                  <FadeIn direction="up">
                    <h2 className="text-label mb-2 text-ink">Process</h2>
                    {content.process.intro && (
                      <p className="max-w-[65ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                        {content.process.intro}
                      </p>
                    )}
                  </FadeIn>

                  {content.process.personas && content.process.personas.length > 0 && (
                    <FadeIn direction="up" delay={0.05}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {content.process.personas.map((persona) => (
                          <div
                            key={persona.name}
                            className="rounded-[var(--radius-card)] border border-border p-4"
                          >
                            <p className="font-sans text-sm font-medium text-ink">
                              {persona.name} <span className="font-normal text-ink-muted">— {persona.role}</span>
                            </p>
                            <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                              {persona.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </FadeIn>
                  )}

                  {content.process.quotes && content.process.quotes.length > 0 && (
                    <FadeIn direction="up" delay={0.1}>
                      <div className="flex flex-col gap-3">
                        {content.process.quotes.map((quote) => (
                          <blockquote
                            key={quote}
                            className="border-l-2 border-accent/40 pl-4 font-sans text-base font-light italic leading-relaxed text-ink-secondary"
                          >
                            &ldquo;{quote}&rdquo;
                          </blockquote>
                        ))}
                      </div>
                    </FadeIn>
                  )}

                  {content.process.journeys && content.process.journeys.length > 0 && (
                    <FadeIn direction="up" delay={0.15}>
                      <div className="flex flex-col gap-4">
                        {content.process.journeys.map((journey) => (
                          <div key={journey.label}>
                            <p className="text-meta mb-2 text-ink-muted">{journey.label}</p>
                            <div className="flex flex-wrap items-center gap-2">
                              {journey.stages.map((stage, index) => (
                                <span key={stage} className="flex items-center gap-2">
                                  <span className="text-meta whitespace-nowrap rounded-[var(--radius-pill)] border border-border-strong px-2.5 py-1 text-ink">
                                    {stage}
                                  </span>
                                  {index < journey.stages.length - 1 && (
                                    <span aria-hidden="true" className="text-ink-faint">
                                      &rarr;
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </FadeIn>
                  )}
                </div>
              )}

              {content.keyDecisions && content.keyDecisions.length > 0 && (
                <div>
                  <FadeIn direction="up">
                    <h2 className="text-label mb-6 text-ink">Key decisions</h2>
                  </FadeIn>
                  <div className="flex flex-col gap-8">
                    {content.keyDecisions.map((decision, index) => (
                      <FadeIn direction="up" delay={index * 0.05} key={decision.title}>
                        <div className="flex gap-5">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-meta text-accent-text">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-sans text-base font-medium leading-normal text-ink">
                              {decision.title}
                            </p>
                            <p className="mt-2 max-w-[60ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                              {decision.description}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Screens — sit on the project's assigned colour wash, tilts
                   upright as it scrolls into view instead of a plain fade ── */}
              <div>
                <FadeIn direction="up">
                  <h2 className="text-label mb-6 text-ink">Screens</h2>
                </FadeIn>
                <TiltReveal
                  className="grid grid-cols-2 gap-3 rounded-[var(--radius-panel)] p-4 sm:grid-cols-3"
                  style={{ backgroundColor: washVar }}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex aspect-[3/4] items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface-raised text-ink-faint"
                    >
                      <PlaceholderIcon size={20} />
                    </div>
                  ))}
                </TiltReveal>
              </div>

              {content.outcome && content.outcome.length > 0 && (
                <div>
                  <FadeIn direction="up">
                    <h2 className="text-label mb-6 text-ink">Outcome</h2>
                  </FadeIn>
                  <ul className="flex flex-col gap-4">
                    {content.outcome.map((line, index) => (
                      <FadeIn direction="up" delay={index * 0.05} key={line}>
                        <li className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          <p className="max-w-[60ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                            {line}
                          </p>
                        </li>
                      </FadeIn>
                    ))}
                  </ul>
                </div>
              )}

              {!content.hasContent && (
                <FadeIn direction="up">
                  <p className="text-meta text-ink-muted">
                    Full write-up coming soon.
                  </p>
                </FadeIn>
              )}

              {content.moreDetailNote && (
                <FadeIn direction="up">
                  <p className="text-meta text-ink-muted">
                    More detail available on request —{' '}
                    <a
                      href="mailto:jamie@neslotech.co.za"
                      className="text-accent-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
                    >
                      get in touch
                    </a>
                    .
                  </p>
                </FadeIn>
              )}

            </div>
          </div>
        </Container>

        {/* ── Next project ── */}
        <div className="border-t border-border">
          <Container className="section-padding">
            <FadeIn direction="up" className="flex items-center justify-between gap-4">
              <span className="text-label text-ink-muted">Next</span>
              <Link
                href={`/${nextProject.slug}`}
                className="group flex items-center gap-2 font-sans text-xl font-medium leading-normal text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
              >
                {nextProject.title}
                <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </FadeIn>
          </Container>
        </div>
      </article>
    </main>
  )
}
