import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { buildMetadata } from '@/lib/metadata'
import { allFullCaseStudies, allArchivedCaseStudies } from '@/lib/projects'

export const metadata = buildMetadata({
  title: 'Projects',
  description: 'The full index of case studies — product, brand, and systems work.',
})

export default function ProjectsPage() {
  return (
    <main>
      <section aria-labelledby="projects-heading" className="section-padding">
        <Container>

          {/* ── Header ── */}
          <FadeIn direction="up" className="mb-10 flex items-center gap-2.5 md:mb-14">
            <span className="h-1.5 w-1.5 flex-shrink-0 bg-accent" />
            <h1 id="projects-heading" className="text-label text-ink">
              Projects
            </h1>
          </FadeIn>

          {/* ── Full case studies ── */}
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" aria-label="Case studies">
            {allFullCaseStudies.map((project, index) => (
              <li key={project.id}>
                <FadeIn direction="up" delay={index * 0.05}>
                  <ProjectCard project={project} />
                </FadeIn>
              </li>
            ))}
          </ul>

          {/* ── Earlier work divider ── */}
          {allArchivedCaseStudies.length > 0 && (
            <>
              <FadeIn direction="up" className="my-10 flex items-center gap-3 md:my-12">
                <span className="text-label text-ink-muted">Earlier work</span>
                <span className="h-px flex-1 bg-border" />
              </FadeIn>

              <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" aria-label="Earlier work">
                {allArchivedCaseStudies.map((project, index) => (
                  <li key={project.id}>
                    <FadeIn direction="up" delay={index * 0.05}>
                      <ProjectCard project={project} />
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </>
          )}

        </Container>
      </section>
    </main>
  )
}
