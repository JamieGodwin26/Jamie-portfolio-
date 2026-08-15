'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, type UIEvent, type WheelEvent } from 'react'
import type { Project } from '@/types'
import { PlaceholderIcon } from '@/components/ui/PlaceholderIcon'

interface ProjectFilmstripProps {
  projects: Project[]
  className?: string
}

/*
  Horizontal scroll reel instead of a stacked list — breaks out of the page's
  centered container so cards bleed to the viewport edges, and reads as a
  curated exhibition rather than a data table. Vertical wheel input is
  redirected into horizontal motion so a plain mouse works, not just trackpads.
*/
export function ProjectFilmstrip({ projects, className }: ProjectFilmstripProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [progress, setProgress] = useState(0)

  const handleWheel = (event: WheelEvent<HTMLUListElement>) => {
    const track = trackRef.current
    if (!track) return
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      track.scrollLeft += event.deltaY
    }
  }

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    const track = event.currentTarget
    const max = track.scrollWidth - track.clientWidth
    setProgress(max > 0 ? track.scrollLeft / max : 0)
  }

  return (
    <div className={`relative left-1/2 w-screen -translate-x-1/2 ${className ?? ''}`}>
      <ul
        ref={trackRef}
        onWheel={handleWheel}
        onScroll={handleScroll}
        className="scrollbar-none flex snap-x snap-proximity gap-4 overflow-x-auto pb-6 pl-10 pr-6 scroll-pl-10 scroll-pr-6 md:gap-6 md:pl-20 md:pr-12 md:scroll-pl-20 md:scroll-pr-12 lg:pl-32 lg:pr-[4.5rem] lg:scroll-pl-32 lg:scroll-pr-[4.5rem]"
        aria-label="Projects"
      >
        {projects.map((project, index) => (
          <li key={project.id} className="flex-shrink-0 snap-start">
            <Link
              href={`/${project.slug}`}
              className="group flex w-[78vw] flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-[360px] md:w-[420px]"
            >
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-border transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                style={{ backgroundColor: `var(--color-wash-${project.wash})` }}
              >
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.thumbnailAlt}
                    fill
                    sizes="(min-width: 768px) 420px, 78vw"
                    className="object-cover"
                  />
                ) : project.screens?.[0] ? (
                  <Image
                    src={project.screens[0].src}
                    alt={project.screens[0].alt}
                    fill
                    sizes="(min-width: 768px) 420px, 78vw"
                    className="object-cover"
                  />
                ) : (
                  <PlaceholderIcon size={36} />
                )}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-meta text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-sans text-2xl font-medium leading-none tracking-tight text-ink transition-colors duration-300 ease-out group-hover:text-accent-text sm:text-3xl">
                    {project.title}
                  </span>
                  <span className="text-meta text-ink-muted">
                    {project.categories[0]} &middot; {project.year}
                    {project.confidential && (
                      <>
                        {' '}
                        &middot; <span className="text-ink-faint">Confidential</span>
                      </>
                    )}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 flex-shrink-0 text-ink-faint transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent-text"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Scroll progress — thin line filling as the reel moves ── */}
      <div className="ml-10 mr-6 h-px bg-border md:ml-20 md:mr-12 lg:ml-32 lg:mr-[4.5rem]">
        <div
          className="h-full bg-ink transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(progress * 100, 4)}%` }}
        />
      </div>
    </div>
  )
}
