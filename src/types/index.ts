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
  /** Colour wash token (e.g. 'blue') behind this project's screenshots — see DESIGN_SYSTEM.md */
  wash: 'slate' | 'blue' | 'green' | 'clay' | 'plum'
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
