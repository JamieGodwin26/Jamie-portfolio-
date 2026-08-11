import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { ProjectManifest } from '@/components/ui/ProjectManifest'
import { buildMetadata } from '@/lib/metadata'
import { allFullCaseStudies } from '@/lib/projects'

export const metadata = buildMetadata({
  title: 'Projects',
  description: 'The full index of case studies: product, brand, and systems work.',
})

export default function ProjectsPage() {
  return (
    <main>
      <section aria-labelledby="projects-heading" className="section-padding">
        <Container>

          {/* ── Header ── */}
          <div className="mb-10 flex flex-col gap-3 md:mb-16">
            <FadeIn direction="up" className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 flex-shrink-0 bg-accent" />
              <h1 id="projects-heading" className="text-label text-ink">
                Projects
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.05}>
              <p className="max-w-[52ch] font-sans text-base font-light leading-relaxed text-ink-secondary">
                The full index: every project, in order, no split between &ldquo;current&rdquo; and &ldquo;earlier&rdquo; work.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.1}>
            <ProjectManifest projects={allFullCaseStudies} />
          </FadeIn>

        </Container>
      </section>
    </main>
  )
}
