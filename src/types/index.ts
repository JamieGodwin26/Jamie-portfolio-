export interface ProjectScreen {
  src: string
  /** Natural pixel dimensions, required by next/image to avoid layout shift */
  width: number
  height: number
  alt: string
}

export interface Project {
  id: string
  slug: string
  title: string
  categories: string[]
  year: number
  thumbnail: string
  thumbnailAlt: string
  linked: boolean
  featured: boolean
  order: number
  /** 'full' = complete case study, 'archived' = lighter "earlier work" format */
  depth: 'full' | 'archived'
  /** Colour wash token (e.g. 'sage') behind this project's screenshots. See DESIGN_SYSTEM.md */
  wash: 'cream' | 'sage' | 'khaki' | 'mustard' | 'terracotta'
  /** NDA/confidential work: shows a "Confidential" label and withholds the screens grid instead of implying assets are coming */
  confidential?: boolean
  /** Real screen images, when available. screens[0] doubles as the list/filmstrip preview. Projects without this fall back to the abstract wash + icon placeholder. */
  screens?: ProjectScreen[]
  /** Flat, undressed screens shown side by side right at the top of the case study, before "The problem" — used sparingly, when a project's own source material led with raw screens rather than a hero device shot. */
  leadScreens?: ProjectScreen[]
  /** A device-mockup hero group, exactly 3 real screens: [big, small, small], one large image on top with two smaller ones below. Replaces the single hero crop when set. */
  heroMockups?: [ProjectScreen, ProjectScreen, ProjectScreen]
}

export interface ProcessStep {
  number: string
  label: string
  description: string
}

export interface NavLink {
  label: string
  href: string
  external?: boolean
}
