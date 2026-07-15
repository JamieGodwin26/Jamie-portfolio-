import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'orbit',
    slug: 'orbit',
    title: 'Orbit',
    categories: ['Branding', 'Product Strategy', 'UX/UI Design'],
    year: 2025,
    thumbnail: '/images/projects/orbit.png',
    thumbnailAlt: 'Orbit — brand identity and product design screens',
    linked: true,
    featured: true,
    order: 1,
    depth: 'full',
    wash: 'blue',
  },
  {
    id: 'eventhub',
    slug: 'eventhub',
    title: 'EHUB',
    categories: ['Brand Identity', 'Product Strategy', 'UX/UI Design'],
    year: 2023,
    thumbnail: '/images/projects/ehub.png',
    thumbnailAlt: 'EHUB — brand identity and product design',
    linked: true,
    featured: true,
    order: 2,
    depth: 'full',
    wash: 'green',
  },
  {
    id: 'ey-catalyst',
    slug: 'ey-catalyst',
    title: 'EY Catalyst',
    categories: ['Product Design', 'Design Systems'],
    year: 2025,
    thumbnail: '/images/projects/ey-catalyst.png',
    thumbnailAlt: 'EY Catalyst — product design and design systems',
    linked: true,
    featured: true,
    order: 3,
    depth: 'full',
    wash: 'clay',
  },
  {
    id: 'xenith',
    slug: 'xenith',
    title: 'Xenith',
    categories: ['Branding', 'Web Design & Dev'],
    year: 2023,
    thumbnail: '/images/projects/xenith.png',
    thumbnailAlt: 'Xenith — brand and web design',
    linked: true,
    featured: true,
    order: 4,
    depth: 'full',
    wash: 'plum',
  },
  {
    id: 'pt-flash',
    slug: 'pt-flash',
    title: 'PT Flash',
    categories: ['UX/UI Design'],
    year: 2021,
    thumbnail: '/images/projects/pt-flash.png',
    thumbnailAlt: 'PT Flash — UX and UI design screens',
    linked: true,
    featured: true,
    order: 5,
    depth: 'full',
    wash: 'slate',
  },
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)

export const fullCaseStudies = featuredProjects.filter((p) => p.depth === 'full')
export const archivedCaseStudies = featuredProjects.filter((p) => p.depth === 'archived')

/* Full site index — all projects, not just the homepage's featured subset (identical today, may diverge later) */
const allSorted = [...projects].sort((a, b) => a.order - b.order)
export const allFullCaseStudies = allSorted.filter((p) => p.depth === 'full')
export const allArchivedCaseStudies = allSorted.filter((p) => p.depth === 'archived')
