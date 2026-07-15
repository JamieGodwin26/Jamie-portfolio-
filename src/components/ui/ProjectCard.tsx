'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { PlaceholderIcon } from '@/components/ui/PlaceholderIcon'

interface ProjectCardProps {
  project: Project
  priority?: boolean
  sizes?: string
}

/*
  Collage thumbnail — one large tile + two stacked, matching the multi-shot
  work-card pattern in DESIGN_SYSTEM.md. Placeholder tiles until real project
  screenshots exist in public/images/projects. Tiles wash to the project's own
  accent color on hover (via --wash, set by the parent) instead of staying flat.
*/
function CollageThumbnail({ alt, wash }: { alt: string; wash?: Project['wash'] }) {
  const tileClass =
    'flex items-center justify-center text-ink-faint transition-colors duration-300 ' +
    (wash ? 'bg-surface-raised group-hover:bg-[var(--wash)]' : 'bg-surface-raised')

  return (
    <div
      role="img"
      aria-label={alt}
      style={wash ? ({ '--wash': `var(--wash-${wash})` } as CSSProperties) : undefined}
      className="grid grid-cols-[1.4fr_1fr] gap-0.5 overflow-hidden rounded-[var(--radius-card)] border border-border bg-border p-0.5"
    >
      <div className={`aspect-[4/3.4] ${tileClass}`}>
        <PlaceholderIcon />
      </div>
      <div className="grid grid-rows-2 gap-0.5">
        <div className={tileClass}>
          <PlaceholderIcon />
        </div>
        <div className={tileClass}>
          <PlaceholderIcon />
        </div>
      </div>
    </div>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, categories, year, thumbnailAlt, slug, linked, depth, wash } = project

  const depthTag = depth === 'full' ? 'Case study' : 'Earlier work'

  const CardMeta = (
    <div className="mt-3 flex flex-col gap-2">
      <p className="flex items-center gap-1.5 font-sans text-base font-medium leading-normal text-ink">
        {title}
        {linked && (
          <span
            aria-hidden="true"
            className="-translate-x-1 text-accent-text opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
          >
            &rarr;
          </span>
        )}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className={
            depth === 'full'
              ? 'text-meta whitespace-nowrap rounded-[var(--radius-pill)] bg-accent/15 px-2.5 py-1 text-accent-text'
              : 'text-meta whitespace-nowrap rounded-[var(--radius-pill)] border border-border-strong px-2.5 py-1 text-ink-muted'
          }
        >
          {depthTag}
        </span>
        <span className="text-meta text-ink-muted">
          {categories[0]} · {year}
        </span>
      </div>
    </div>
  )

  if (!linked) {
    return (
      <article className="flex flex-col opacity-60" aria-label={`${title} — project coming soon`}>
        <CollageThumbnail alt={thumbnailAlt} />
        {CardMeta}
      </article>
    )
  }

  return (
    <motion.article
      className="group flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/${slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        aria-label={`View ${title} case study`}
      >
        <CollageThumbnail alt={thumbnailAlt} wash={wash} />
      </Link>
      {CardMeta}
    </motion.article>
  )
}
