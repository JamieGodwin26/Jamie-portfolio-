import Image from 'next/image'
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
  The lighter "More work" tier. Same sticky-sidebar / scrolling-content
  shell as a full case study, so the two tiers read as one site rather than
  two different templates — just fewer sections in the scrolling column
  (problem, goal, approach, key decisions, brand notes, outcome). No
  research artefacts, journey maps, wireframes or a next-project chain:
  the content stays deliberately secondary to the full deep-dives, even
  though the layout no longer is.
*/
export function ArchivedCaseStudy({ project, content }: ArchivedCaseStudyProps) {
  const washVar = `var(--color-wash-${project.wash})`

  return (
    <main>
      <article aria-labelledby="case-study-title">
        <Container className="section-padding">
          <div className="grid gap-12 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16 lg:gap-24">

            {/* ── Sticky sidebar ── */}
            <FadeIn direction="up" className="md:sticky md:top-[92px] md:self-start">
              <Link
                href="/projects"
                className="mb-8 block w-fit text-label text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm"
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

            {/* ── Scrolling content ── */}
            <div className="flex max-w-[660px] flex-col gap-16">

              {/* ── Lead visual: a real reel takes priority over the abstract
                   screens placeholder — for a project whose strongest verified
                   asset so far is motion rather than stills. ── */}
              {content.reelVideo ? (
                <FadeIn direction="up">
                  <div
                    className="relative w-full overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface-raised"
                    style={{ aspectRatio: `${content.reelVideo.width} / ${content.reelVideo.height}` }}
                  >
                    <video
                      src={content.reelVideo.src}
                      aria-label={content.reelVideo.alt}
                      className="h-full w-full object-contain"
                      autoPlay
                      muted
                      loop
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </FadeIn>
              ) : (
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
              )}

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
                            {decision.images && decision.images.length > 0 && (
                              <div
                                className={`mt-4 grid grid-cols-1 gap-4 ${
                                  decision.images.length > 1 ? 'sm:grid-cols-2' : ''
                                }`}
                              >
                                {decision.images.map((image) => (
                                  <div
                                    key={image.src}
                                    className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-raised"
                                    style={{ aspectRatio: `${image.width} / ${image.height}` }}
                                  >
                                    <Image
                                      src={image.src}
                                      alt={image.alt}
                                      fill
                                      className="object-contain"
                                      sizes={
                                        decision.images!.length > 1
                                          ? '(min-width: 768px) 320px, 50vw'
                                          : '(min-width: 768px) 660px, 100vw'
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
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
                    <div className="flex max-w-[660px] flex-col gap-4">
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
                      <div className="mt-8 max-w-[660px] border-t border-border pt-6">
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
                      <div className="mt-8 max-w-[660px] border-t border-border pt-6">
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

              {content.closingScreens && content.closingScreens.length > 0 && (
                <FadeIn direction="up">
                  {content.closingScreens.length === 3 ? (
                    <div className="flex max-w-[660px] flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        {content.closingScreens.slice(0, 2).map((screen) => (
                          <div
                            key={screen.src}
                            className="relative aspect-[4/3] rounded-[var(--radius-panel)] border border-border"
                          >
                            <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-panel)]">
                              <Image
                                src={screen.src}
                                alt={screen.alt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 320px, 50vw"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="relative aspect-[3/2] w-full rounded-[var(--radius-panel)] border border-border">
                        <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-panel)]">
                          <Image
                            src={content.closingScreens[2].src}
                            alt={content.closingScreens[2].alt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 660px, 100vw"
                          />
                        </div>
                      </div>
                    </div>
                  ) : content.closingScreens.length === 1 ? (
                    <div className="max-w-[660px] overflow-hidden rounded-[var(--radius-card)]">
                      <Image
                        src={content.closingScreens[0].src}
                        alt={content.closingScreens[0].alt}
                        width={content.closingScreens[0].width}
                        height={content.closingScreens[0].height}
                        className="h-auto w-full"
                        sizes="(min-width: 768px) 660px, 100vw"
                      />
                    </div>
                  ) : (
                    <div className="grid max-w-[660px] grid-cols-2 gap-4">
                      {content.closingScreens.map((screen) => (
                        <div
                          key={screen.src}
                          className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]"
                        >
                          <Image
                            src={screen.src}
                            alt={screen.alt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 320px, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </FadeIn>
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
          </div>
        </Container>
      </article>
    </main>
  )
}
