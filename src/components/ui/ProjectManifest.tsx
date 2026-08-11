'use client'

import Link from 'next/link'
import type { Project } from '@/types'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'

interface ProjectManifestProps {
  projects: Project[]
  className?: string
}

/*
  Pure-typographic index, exclusive to the dedicated /projects page — no
  imagery, no hover-preview pane, no cursor-following anything. Each row is
  index / title / dotted leader / category · year, styled like a contents
  page or shipping manifest rather than a web-portfolio interaction pattern.
  Reserved for this page specifically; the homepage keeps the filmstrip.
*/
export function ProjectManifest({ projects, className }: ProjectManifestProps) {
  return (
    <StaggerGroup as="ul" aria-label="Projects" className={`flex flex-col ${className ?? ''}`}>
      {projects.map((project, index) => (
        <StaggerItem key={project.id} as="li" className="border-t border-border last:border-b">
          <Link
            href={`/${project.slug}`}
            className="group flex items-end gap-3 py-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink md:py-6"
          >
            <span className="text-meta flex-shrink-0 text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
            <span className="whitespace-nowrap font-sans text-xl font-medium leading-none text-ink transition-colors duration-200 ease-out group-hover:text-accent-text sm:text-2xl">
              {project.title}
            </span>
            <span
              aria-hidden="true"
              className="mb-2 h-0 flex-1 border-b border-dotted border-border-strong transition-colors duration-200 ease-out group-hover:border-accent/50"
            />
            <span className="text-meta hidden flex-shrink-0 whitespace-nowrap text-ink-muted sm:inline">
              {project.categories[0]} &middot; {project.year}
              {project.confidential && (
                <>
                  {' '}
                  &middot; <span className="text-ink-faint">Confidential</span>
                </>
              )}
            </span>
            <span
              aria-hidden="true"
              className="flex-shrink-0 text-ink-faint opacity-0 transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-accent-text group-hover:opacity-100"
            >
              &rarr;
            </span>
          </Link>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
