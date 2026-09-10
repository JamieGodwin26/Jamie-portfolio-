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

/*
  The lighter "More work" tier. Same content model as a full case study, but
  a single narrow column and only the sections that carry weight on their
  own — problem, goal, approach, key decisions, brand notes, outcome. No
  research artefacts, journey maps, wireframes or a next-project chain: this
  format is deliberately secondary to the full deep-dives.
*/
export function ArchivedCaseStudy({ project, content }: ArchivedCaseStudyProps) {
  const washVar = `var(--color-wash-${project.wash})`

  return (
    <main>
      <article aria-labelledby="case-study-title">
        <Container className="section-padding">
          <div className="mx-auto flex max-w-[65ch] flex-col gap-12">

            {/* ── Header ── */}
            <FadeIn direction="up">
              <Link
                href="/projects"
                className="mb-6 inline-block text-label text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
              >
                ← Back
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-meta inline-block whitespace-nowrap rounded-[var(--radius-pill)] bg-accent/15 px-2.5 py-1 text-accent-text">
                  Snapshot
                </span>
                {project.confidential && (
                  <span className="text-meta inline-block whitespace-nowrap rounded-[var(--radius-pill)] border border-border-strong px-2.5 py-1 text-ink-muted">
                    Confidential
                  </span>
                )}
              </div>

              <h1
                id="case-study-title"
                className="mt-4 font-sans text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink"
              >
                {project.title}
              </h1>

              <p className="mt-3 font-sans text-lg font-light leading-relaxed text-ink-secondary">
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

              {content.myRole && (
                <div className="mt-5">
                  <p className="text-meta uppercase text-ink-faint">Role</p>
                  <p className="mt-1 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                    {content.myRole}
                  </p>
                </div>
              )}

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

            {/* ── Screens: unannotated, on the project's colour wash ── */}
            <TiltReveal
              className="grid grid-cols-2 gap-3 rounded-[var(--radius-panel)] p-4 sm:grid-cols-4"
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

            {content.process?.intro && (
              <FadeIn direction="up">
                <h2 className="text-label mb-3 text-ink">Approach</h2>
                <p className="font-sans text-base font-light leading-relaxed text-ink-secondary">
                  {content.process.intro}
                </p>
              </FadeIn>
            )}

            {content.problem && (
              <FadeIn direction="up">
                <h2 className="text-label mb-3 text-ink">The problem</h2>
                <p className="whitespace-pre-line font-sans text-base font-light leading-relaxed text-ink-secondary">
                  {content.problem}
                </p>
              </FadeIn>
            )}

            {content.goal && (
              <FadeIn direction="up">
                <h2 className="text-label mb-3 text-ink">The goal</h2>
                <p className="font-sans text-base font-light leading-relaxed text-ink-secondary">
                  {content.goal}
                </p>
              </FadeIn>
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
                        <div className="min-w-0 flex-1">
                          <p className="font-sans text-base font-medium leading-normal text-ink">
                            {decision.title}
                          </p>
                          <p className="mt-2 font-sans text-base font-light leading-relaxed text-ink-secondary">
                            {decision.description}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}

            {content.styleGuide && content.styleGuide.length > 0 && (
              <div>
                <FadeIn direction="up">
                  <h2 className="text-label mb-6 text-ink">Style guide</h2>
                </FadeIn>
                <FadeIn direction="up" delay={0.05}>
                  <div className="flex flex-col gap-4">
                    {content.styleGuide.map((item) => (
                      <div key={item.label} className="rounded-[var(--radius-card)] border border-border p-4">
                        <p className="text-meta uppercase text-ink-muted">{item.label}</p>
                        <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                {content.colourPalette && content.colourPalette.length > 0 && (
                  <FadeIn direction="up" delay={0.1}>
                    <div className="mt-8 border-t border-border pt-6">
                      <p className="text-meta mb-5 uppercase text-ink-muted">Colour palette</p>
                      <div className="flex flex-wrap gap-6">
                        {content.colourPalette.map((swatch) => (
                          <div key={swatch.hex} className="flex flex-col items-start gap-2">
                            <div
                              className="h-16 w-16 flex-shrink-0 border border-border"
                              style={{
                                backgroundColor: swatch.hex,
                                borderRadius:
                                  content.colourSwatchShape === 'petal' ? '100% 12px 12px 12px' : '9999px',
                              }}
                            />
                            <div>
                              <p className="text-meta text-ink-muted">{swatch.name}</p>
                              <p className="text-meta text-ink-faint">{swatch.hex.toUpperCase()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}

                {content.typography && content.typography.length > 0 && (
                  <FadeIn direction="up" delay={0.15}>
                    <div className="mt-8 border-t border-border pt-6">
                      <p className="text-meta mb-5 uppercase text-ink-muted">Typography</p>
                      <div className="flex flex-col gap-8">
                        {content.typography.map((sample) => (
                          <div key={sample.name}>
                            <p className="text-2xl font-medium text-ink" style={{ fontFamily: sample.cssFamily }}>
                              {sample.name}
                            </p>
                            <p className="mt-2 text-sm text-ink-secondary" style={{ fontFamily: sample.cssFamily }}>
                              ABCDEFGHIJKLMNOPQRSTUVWX
                              <br />
                              abcdefghijklmnopqrstuvwxyz
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>
            )}

            {content.result && (
              <FadeIn direction="up">
                <div className="rounded-[var(--radius-panel)] border border-accent/30 bg-accent/10 p-5">
                  <p className="text-label mb-2 text-accent-text">Where it landed</p>
                  <p className="font-sans text-base font-light leading-relaxed text-ink">
                    {content.result}
                  </p>
                </div>
              </FadeIn>
            )}

            {content.outcome && content.outcome.length > 0 && (
              <div>
                <FadeIn direction="up">
                  <h2 className="text-label mb-6 text-ink">What I learned</h2>
                </FadeIn>
                <ul className="flex flex-col gap-4">
                  {content.outcome.map((line, index) => (
                    <FadeIn direction="up" delay={index * 0.05} key={line}>
                      <li className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <p className="font-sans text-base font-light leading-relaxed text-ink-secondary">
                          {line}
                        </p>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            )}

            {content.nextSteps && content.nextSteps.length > 0 && (
              <div>
                <FadeIn direction="up">
                  <h2 className="text-label mb-6 text-ink">What&rsquo;s next</h2>
                </FadeIn>
                <ul className="flex flex-col gap-4">
                  {content.nextSteps.map((line, index) => (
                    <FadeIn direction="up" delay={index * 0.05} key={line}>
                      <li className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full border border-accent" />
                        <p className="font-sans text-base font-light leading-relaxed text-ink-secondary">
                          {line}
                        </p>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            )}

            {content.moreDetailNote && (
              <FadeIn direction="up">
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
            )}

          </div>
        </Container>
      </article>
    </main>
  )
}
