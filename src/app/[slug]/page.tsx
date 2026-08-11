import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects, featuredProjects } from '@/lib/projects'
import { caseStudyContent } from '@/lib/case-studies'
import { buildMetadata } from '@/lib/metadata'
import { FullCaseStudy } from '@/components/case-study/FullCaseStudy'
import { ArchivedCaseStudy } from '@/components/case-study/ArchivedCaseStudy'

/* ─── Static params: all linked project slugs ─── */

export function generateStaticParams() {
  return projects.filter((p) => p.linked).map((p) => ({ slug: p.slug }))
}

/* ─── Per-page metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  const content = caseStudyContent[slug]

  if (!project) return buildMetadata()

  return buildMetadata({
    title: project.title,
    description: content?.summary ?? `${project.title}: ${project.categories.join(', ')} · Jamie Godwin`,
  })
}

/* ─── Page ─── */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug && p.linked)
  const content = caseStudyContent[slug]

  if (!project || !content) notFound()

  if (project.depth === 'archived') {
    return <ArchivedCaseStudy project={project} content={content} />
  }

  const currentIndex = featuredProjects.findIndex((p) => p.slug === project.slug)
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length]

  return <FullCaseStudy project={project} content={content} nextProject={nextProject} />
}
