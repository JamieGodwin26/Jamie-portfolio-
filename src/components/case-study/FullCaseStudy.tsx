import Image from '@/components/ui/PlaceholderImage'
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
  const washVar = `var(--color-wash-${project.wash})`
  /* First two real screens double as full-width supporting visuals woven
     between sections (hero after the goal, second after user research).
     Any further screens live inline with whatever they illustrate
     (a key decision, a closing beat) rather than in a catch-all grid. */
  const heroScreen = project.screens?.[0]
  const midScreen = project.screens?.[1]

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
                  Case study
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
                  <p className="text-meta text-ink-faint">Role</p>
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

              {project.leadScreens && project.leadScreens.length > 0 && (
                <FadeIn direction="up">
                  <div className="grid max-w-[660px] grid-cols-3 gap-2 sm:gap-4">
                    {project.leadScreens.map((screen) => (
                      <div
                        key={screen.src}
                        className="overflow-hidden rounded-[var(--radius-card)]"
                      >
                        <Image
                          src={screen.src}
                          alt={screen.alt}
                          width={screen.width}
                          height={screen.height}
                          className="h-auto w-full"
                          sizes="(min-width: 640px) 220px, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}

              {content.problem && (
                <FadeIn direction="up">
                  <h2 className="text-label mb-3 text-ink">The problem</h2>
                  <p className="max-w-[65ch] font-sans text-lg font-light leading-relaxed text-ink-secondary">
                    {content.problem}
                  </p>
                  {content.problemVideo && (
                    <div
                      className="relative mt-5 w-full overflow-hidden rounded-[var(--radius-card)] bg-surface-raised sm:max-w-[320px]"
                      style={{ aspectRatio: `${content.problemVideo.width} / ${content.problemVideo.height}` }}
                    >
                      <video
                        src={content.problemVideo.src}
                        aria-label={content.problemVideo.alt}
                        className="h-full w-full object-contain"
                        autoPlay
                        muted
                        loop
                        controls
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  )}
                </FadeIn>
              )}

              {content.goal && (
                <FadeIn direction="up">
                  <h2 className="text-label mb-3 text-ink">The goal</h2>
                  <p className="max-w-[65ch] font-sans text-lg font-light leading-relaxed text-ink-secondary">
                    {content.goal}
                  </p>
                </FadeIn>
              )}

              {project.heroMockups ? (
                <FadeIn direction="up">
                  <div className="flex max-w-[560px] flex-col gap-4">
                    <div className="relative aspect-[3/2] w-full rounded-[var(--radius-panel)] border border-border">
                      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-panel)]">
                        <Image
                          src={project.heroMockups[0].src}
                          alt={project.heroMockups[0].alt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 560px, 100vw"
                          priority
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[project.heroMockups[1], project.heroMockups[2]].map((image) => (
                        <div
                          key={image.src}
                          className="relative aspect-[4/3] rounded-[var(--radius-panel)] border border-border"
                        >
                          <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-panel)]">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="(min-width: 768px) 270px, 50vw"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ) : (
                heroScreen && (
                  <FadeIn direction="up">
                    <div className="relative aspect-[3/2] w-full max-w-[560px] rounded-[var(--radius-panel)] border border-border">
                      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-panel)]">
                        <Image
                          src={heroScreen.src}
                          alt={heroScreen.alt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 560px, 100vw"
                          priority
                        />
                      </div>
                    </div>
                  </FadeIn>
                )
              )}

              {content.userResearch && (
                <div className="flex flex-col gap-4">
                  <FadeIn direction="up">
                    <h2 className="text-label mb-2 text-ink">User research</h2>
                    {content.userResearch.intro && (
                      <p className="max-w-[65ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                        {content.userResearch.intro}
                      </p>
                    )}
                  </FadeIn>

                  {content.userResearch.keyFindings && content.userResearch.keyFindings.length > 0 && (
                    <FadeIn direction="up" delay={0.05}>
                      <ul className="flex flex-col gap-3">
                        {content.userResearch.keyFindings.map((finding) => (
                          <li key={finding} className="flex gap-3">
                            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <p className="max-w-[60ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                              {finding}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </FadeIn>
                  )}
                </div>
              )}

              {content.process?.quotes && content.process.quotes.length > 0 && (
                <div>
                  <FadeIn direction="up">
                    <h2 className="text-label mb-4 text-ink">User insights</h2>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.05}>
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

                  {content.process.insightImages && content.process.insightImages.length > 0 && (
                    <FadeIn direction="up" delay={0.1}>
                      <div
                        className={`mt-5 grid gap-4 ${
                          content.process.insightImages.length === 1
                            ? 'max-w-[560px] grid-cols-1'
                            : 'max-w-[660px] grid-cols-2'
                        }`}
                      >
                        {content.process.insightImages.map((image) => (
                          <div
                            key={image.src}
                            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]"
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="(min-width: 768px) 340px, 50vw"
                            />
                          </div>
                        ))}
                      </div>
                    </FadeIn>
                  )}
                </div>
              )}

              {content.process?.personas && content.process.personas.length > 0 && (
                <div>
                  <FadeIn direction="up">
                    <h2 className="text-label mb-4 text-ink">Persona</h2>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.05}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {content.process.personas.map((persona) => (
                        <div
                          key={persona.name}
                          className="rounded-[var(--radius-card)] border border-border p-4"
                        >
                          <p className="font-sans text-sm font-medium text-ink">
                            {persona.name} <span className="font-normal text-ink-muted">&middot; {persona.role}</span>
                          </p>
                          <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                            {persona.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              )}

              {/* ── Journey map: the full step/experience/opportunity table when
                   we have it, otherwise the lighter pill-chip stage summary. ── */}
              {content.journeyMap ? (
                <div className="flex flex-col gap-6">
                  <FadeIn direction="up">
                    <h2 className="text-label mb-2 text-ink">Journey map</h2>
                    {content.journeyMap.intro && (
                      <p className="max-w-[65ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                        {content.journeyMap.intro}
                      </p>
                    )}
                  </FadeIn>
                  {content.journeyMap.flows.map((flow, flowIndex) => (
                    <FadeIn direction="up" delay={0.05 + flowIndex * 0.05} key={flow.label}>
                      <div className="flex max-w-[660px] flex-col gap-3">
                        {content.journeyMap!.flows.length > 1 && (
                          <p className="text-meta text-ink-muted">{flow.label}</p>
                        )}
                        <div className="flex flex-col gap-3">
                          {flow.rows.map((row) => (
                            <div key={row.step} className="rounded-[var(--radius-card)] border border-border p-4">
                              <p className="font-sans text-sm font-medium text-ink">{row.step}</p>
                              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                                <div>
                                  <p className="text-meta text-ink-faint">Experience</p>
                                  <p className="mt-1 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                                    {row.experience}
                                  </p>
                                </div>
                                {row.emotion && (
                                  <div>
                                    <p className="text-meta text-ink-faint">Emotion</p>
                                    <p className="mt-1 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                                      {row.emotion}
                                    </p>
                                  </div>
                                )}
                                <div>
                                  <p className="text-meta text-ink-faint">Opportunity</p>
                                  <p className="mt-1 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                                    {row.opportunity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                  {content.process?.flowImages && content.process.flowImages.length > 0 && (
                    <FadeIn direction="up" delay={0.1}>
                      <div className="flex flex-col gap-3">
                        <p className="text-meta text-ink-muted">User flow diagrams</p>
                        {content.process.flowImagesNote && (
                          <p className="max-w-[60ch] font-sans text-sm font-light leading-relaxed text-ink-secondary">
                            {content.process.flowImagesNote}
                          </p>
                        )}
                        <div className="flex max-w-[660px] flex-col gap-4">
                          {content.process.flowImages.map((image) => (
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
                                sizes="(min-width: 768px) 660px, 100vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              ) : (
                content.process?.journeys && content.process.journeys.length > 0 && (
                  <div>
                    <FadeIn direction="up">
                      <h2 className="text-label mb-4 text-ink">Journey map</h2>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.05}>
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
                    {content.process?.flowImages && content.process.flowImages.length > 0 && (
                      <FadeIn direction="up" delay={0.1}>
                        <div className="mt-4 flex flex-col gap-3">
                          <p className="text-meta text-ink-muted">User flow diagrams</p>
                          {content.process.flowImagesNote && (
                            <p className="max-w-[60ch] font-sans text-sm font-light leading-relaxed text-ink-secondary">
                              {content.process.flowImagesNote}
                            </p>
                          )}
                          <div className="flex max-w-[660px] flex-col gap-4">
                            {content.process.flowImages.map((image) => (
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
                                  sizes="(min-width: 768px) 660px, 100vw"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </FadeIn>
                    )}
                  </div>
                )
              )}

              {midScreen && (
                <FadeIn direction="up">
                  <div className="relative aspect-[3/2] w-full max-w-[560px] rounded-[var(--radius-panel)] border border-border">
                    <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-panel)]">
                      <Image
                        src={midScreen.src}
                        alt={midScreen.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 560px, 100vw"
                      />
                    </div>
                  </div>
                </FadeIn>
              )}

              {content.wireframes && (
                <div className="flex flex-col gap-4">
                  <FadeIn direction="up">
                    <h2 className="text-label mb-2 text-ink">Wireframes</h2>
                    {content.wireframes.intro && (
                      <p className="max-w-[65ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                        {content.wireframes.intro}
                      </p>
                    )}
                  </FadeIn>

                  {content.wireframes.bullets && content.wireframes.bullets.length > 0 && (
                    <FadeIn direction="up" delay={0.05}>
                      <ul className="flex flex-col gap-2">
                        {content.wireframes.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <p className="max-w-[60ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                              {bullet}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </FadeIn>
                  )}

                  {content.wireframes.images && content.wireframes.images.length > 0 && (
                    <FadeIn direction="up" delay={0.1}>
                      {content.wireframes.images.length === 1 ? (
                        <div className="max-w-[660px] overflow-hidden rounded-[var(--radius-card)]">
                          <Image
                            src={content.wireframes.images[0].src}
                            alt={content.wireframes.images[0].alt}
                            width={content.wireframes.images[0].width}
                            height={content.wireframes.images[0].height}
                            className="h-auto w-full"
                            sizes="(min-width: 768px) 660px, 100vw"
                          />
                        </div>
                      ) : (
                        <div className="grid max-w-[660px] grid-cols-1 gap-4 sm:grid-cols-2">
                          {content.wireframes.images.map((image) => (
                            <div
                              key={image.src}
                              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]"
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 340px, 50vw"
                              />
                            </div>
                          ))}
                        </div>
                      )}
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
                          <div className="min-w-0 flex-1">
                            <p className="font-sans text-base font-medium leading-normal text-ink">
                              {decision.title}
                            </p>
                            <p className="mt-2 max-w-[60ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                              {decision.description}
                            </p>
                            {decision.images && decision.images.length > 0 && (
                              <div
                                className={`mt-4 grid grid-cols-1 gap-4 ${
                                  decision.images.length === 1
                                    ? 'max-w-[560px]'
                                    : 'max-w-[660px] sm:grid-cols-2'
                                }`}
                              >
                                {decision.images.map((image) => (
                                  <div
                                    key={image.src}
                                    className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface-raised"
                                    style={{ aspectRatio: `${image.width} / ${image.height}` }}
                                  >
                                    <Image
                                      src={image.src}
                                      alt={image.alt}
                                      fill
                                      className="object-contain"
                                      sizes="(min-width: 768px) 340px, 50vw"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            {decision.video && (
                              <div
                                className="relative mt-4 max-w-[320px] overflow-hidden rounded-[var(--radius-card)] bg-surface-raised"
                                style={{ aspectRatio: `${decision.video.width} / ${decision.video.height}` }}
                              >
                                <video
                                  src={decision.video.src}
                                  aria-label={decision.video.alt}
                                  className="h-full w-full object-contain"
                                  controls
                                  playsInline
                                  preload="metadata"
                                />
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
                          <p className="text-meta text-ink-muted">{item.label}</p>
                          <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-ink-secondary">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </FadeIn>

                  {content.brandMarkImages && content.brandMarkImages.length > 0 && (
                    <FadeIn direction="up" delay={0.08}>
                      <div className="mt-8 flex max-w-[660px] flex-col gap-3 border-t border-border pt-6">
                        {content.brandMarkImages.map((image) => (
                          <div
                            key={image.src}
                            className="rounded-[var(--radius-card)] border border-border"
                          >
                            <div className="overflow-hidden rounded-[var(--radius-card)]">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                className="h-auto w-full"
                                sizes="(min-width: 768px) 660px, 100vw"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </FadeIn>
                  )}

                  {content.colourPalette && content.colourPalette.length > 0 && (
                    <FadeIn direction="up" delay={0.1}>
                      <div className="mt-8 max-w-[660px] border-t border-border pt-6">
                        <p className="text-meta mb-5 text-ink-muted">Colour palette</p>
                        <div className="flex flex-wrap justify-between gap-6">
                          {content.colourPalette.map((swatch) => (
                            <div key={swatch.hex} className="flex flex-col items-start gap-2">
                              <div
                                className="h-20 w-20 flex-shrink-0 border border-border"
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
                        <p className="text-meta mb-5 text-ink-muted">Typography</p>
                        <div className={`grid gap-8 ${content.typography.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                          {content.typography.map((sample) => (
                            <div key={sample.name}>
                              <p
                                className="text-3xl font-medium text-ink"
                                style={{ fontFamily: sample.cssFamily }}
                              >
                                {sample.name}
                              </p>
                              <p
                                className="mt-2 text-sm text-ink-secondary"
                                style={{ fontFamily: sample.cssFamily }}
                              >
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

                  {content.moodImage && (
                    <FadeIn direction="up" delay={0.2}>
                      <div className="mt-8 max-w-[660px] border-t border-border pt-6">
                        <p className="text-meta mb-5 text-ink-muted">Mood</p>
                        <div className="rounded-[var(--radius-panel)] border border-border">
                          <div className="overflow-hidden rounded-[var(--radius-panel)]">
                            <Image
                              src={content.moodImage.src}
                              alt={content.moodImage.alt}
                              width={content.moodImage.width}
                              height={content.moodImage.height}
                              className="h-auto w-full"
                              sizes="(min-width: 768px) 660px, 100vw"
                            />
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              )}

              {/* ── Screens: only rendered when a project has no real screens
                   at all (the hero/mid visuals cover the rest, and anything
                   further is woven inline with a key decision or shown as a
                   closing beat further down). Confidential projects with no
                   screens get a withheld-visuals panel instead, so it reads
                   as a deliberate choice, not a missing asset. Everyone else
                   with no real assets yet gets the abstract wash+icon
                   placeholder. ── */}
              {!(project.screens && project.screens.length > 0) && (
                project.confidential ? (
                  <div>
                    <FadeIn direction="up">
                      <h2 className="text-label mb-6 text-ink">Screens</h2>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.05}>
                      <div
                        className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-panel)] p-16 text-center"
                        style={{ backgroundColor: washVar }}
                      >
                        <LockIcon />
                        <p className="max-w-[36ch] text-meta text-ink-muted">
                          Screens are confidential and can&rsquo;t be shown here.
                        </p>
                      </div>
                    </FadeIn>
                  </div>
                ) : (
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
                )
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
                          <p className="max-w-[60ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                            {line}
                          </p>
                        </li>
                      </FadeIn>
                    ))}
                  </ul>
                </div>
              )}

              {content.closingScreens && content.closingScreens.length > 0 && (
                <FadeIn direction="up">
                  {content.closingScreens.length === 3 ? (
                    <div className="flex max-w-[560px] flex-col gap-4">
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
                                sizes="(min-width: 768px) 270px, 50vw"
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
                            sizes="(min-width: 768px) 560px, 100vw"
                          />
                        </div>
                      </div>
                    </div>
                  ) : content.closingScreens.length === 1 ? (
                    <div className="max-w-[560px] overflow-hidden rounded-[var(--radius-card)]">
                      <Image
                        src={content.closingScreens[0].src}
                        alt={content.closingScreens[0].alt}
                        width={content.closingScreens[0].width}
                        height={content.closingScreens[0].height}
                        className="h-auto w-full"
                        sizes="(min-width: 768px) 560px, 100vw"
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
                            sizes="(min-width: 768px) 340px, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </FadeIn>
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
                    More detail available on request:{' '}
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

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="3.5" y="8" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.5 8V5.5a3.5 3.5 0 0 1 7 0V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}
