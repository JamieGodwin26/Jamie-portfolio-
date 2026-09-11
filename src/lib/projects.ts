import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'gbt',
    slug: 'gbt',
    title: 'Girls & Boys Town',
    categories: ['Product Design', 'UX/UI Design', 'Client Liaison'],
    year: 2026,
    thumbnail: '/images/projects/gbt/gbt-mockup-donor-record.jpg',
    thumbnailAlt: 'Girls & Boys Town donor management system, a single donor record shown on a laptop',
    linked: true,
    featured: true,
    order: 3,
    depth: 'full',
    wash: 'terracotta',
    screens: [
      {
        src: '/images/projects/gbt/gbt-mockup-donor-record.jpg',
        width: 1920,
        height: 1440,
        alt: 'A single donor record on a laptop: overview tab with lifestyle stage, profile completeness, ownership and meta, and a download-tax-certificate action',
      },
    ],
    midMockups: [
      {
        src: '/images/projects/gbt/gbt-mockup-prospects-list.jpg',
        width: 1920,
        height: 1440,
        alt: 'Girls & Boys Town prospects list, showing every prospect in one place with status pills for active, archived and closed records',
      },
      {
        src: '/images/projects/gbt/gbt-mockup-approval-queue.jpg',
        width: 1920,
        height: 1440,
        alt: 'An approver\'s queue of edit requests, filtered to "awaiting my approval", each row showing the consultant, date and how many field changes are pending',
      },
      {
        src: '/images/projects/gbt/gbt-mockup-dashboard.jpg',
        width: 1920,
        height: 1440,
        alt: "A branch manager's dashboard, led by a needs-attention queue: approvals waiting, reminders due, and prospects that need a follow-up",
      },
    ],
  },
  {
    id: 'orbit',
    slug: 'orbit',
    title: 'Orbit',
    categories: ['Product Design', 'Branding', 'UX/UI Design'],
    year: 2025,
    thumbnail: '/images/projects/orbit.png',
    thumbnailAlt: 'Orbit, brand identity and product design screens',
    linked: true,
    featured: true,
    order: 4,
    depth: 'full',
    wash: 'sage',
    screens: [
      {
        src: '/images/projects/orbit/orbit-dashboard-laptop.png',
        width: 1160,
        height: 653,
        alt: 'Orbit dashboard shown on a laptop',
      },
    ],
    heroMockups: [
      {
        src: '/images/projects/orbit/orbit-dashboard-laptop.png',
        width: 1160,
        height: 653,
        alt: 'Orbit dashboard shown on a laptop',
      },
      {
        src: '/images/projects/orbit/orbit-profile-phone-podium.png',
        width: 560,
        height: 344,
        alt: 'Orbit profile list on a phone',
      },
      {
        src: '/images/projects/orbit/orbit-dashboard-phone.png',
        width: 563,
        height: 375,
        alt: 'Orbit dashboard shown on a phone',
      },
    ],
  },
  {
    id: 'eventhub',
    slug: 'eventhub',
    title: 'EHUB',
    categories: ['Product Design', 'Branding', 'UX/UI Design'],
    year: 2023,
    thumbnail: '/images/projects/ehub.png',
    thumbnailAlt: 'EHUB, brand identity and product design',
    linked: true,
    featured: true,
    order: 5,
    depth: 'full',
    wash: 'khaki',
    screens: [
      {
        src: '/images/projects/eventhub/eventhub-mobile-entry-list.png',
        width: 1160,
        height: 653,
        alt: 'EHUB entry list on mobile',
      },
    ],
    heroMockups: [
      {
        src: '/images/projects/eventhub/eventhub-dashboard-laptop.png',
        width: 560,
        height: 375,
        alt: 'EHUB competitions dashboard shown on a laptop',
      },
      {
        src: '/images/projects/eventhub/eventhub-mobile-entry-list.png',
        width: 1160,
        height: 653,
        alt: 'EHUB entry list on mobile',
      },
      {
        src: '/images/projects/eventhub/eventhub-organiser-dashboard.png',
        width: 560,
        height: 299,
        alt: 'EHUB organiser dashboard',
      },
    ],
  },
  {
    id: 'ey-catalyst',
    slug: 'ey-catalyst',
    title: 'EY Catalyst',
    categories: ['UI/UX Design'],
    year: 2025,
    thumbnail: '/images/projects/ey-catalyst.png',
    thumbnailAlt: 'EY Catalyst, product design and design systems',
    linked: true,
    featured: true,
    order: 2,
    depth: 'full',
    wash: 'mustard',
    confidential: true,
  },
  {
    id: 'xenith',
    slug: 'xenith',
    title: 'Xenith',
    categories: ['Branding', 'Web Development'],
    year: 2023,
    thumbnail: '/images/projects/xenith.png',
    thumbnailAlt: 'Xenith, brand and web design',
    linked: true,
    featured: true,
    order: 6,
    depth: 'full',
    wash: 'terracotta',
    screens: [
      {
        src: '/images/projects/xenith/xenith-homepage-laptop.png',
        width: 1448,
        height: 965,
        alt: 'Xenith homepage shown on a laptop',
      },
      {
        src: '/images/projects/xenith/xenith-services-laptop.png',
        width: 1760,
        height: 1173,
        alt: 'Xenith services page shown on a laptop',
      },
    ],
  },
  {
    id: 'pt-flash',
    slug: 'pt-flash',
    title: 'PT Flash',
    categories: ['UX/UI Design'],
    year: 2021,
    thumbnail: '/images/projects/pt-flash.png',
    thumbnailAlt: 'PT Flash, UX and UI design screens',
    linked: true,
    featured: true,
    order: 7,
    depth: 'full',
    wash: 'cream',
    leadScreens: [
      {
        src: '/images/projects/pt-flash/pt-flash-dashboard-mobile.png',
        width: 634,
        height: 1452,
        alt: 'PT Flash calendar dashboard, mobile view',
      },
      {
        src: '/images/projects/pt-flash/pt-flash-payment-details.png',
        width: 634,
        height: 1452,
        alt: 'PT Flash payment details screen, showing activity overview and cost breakdown',
      },
      {
        src: '/images/projects/pt-flash/pt-flash-card-payment.png',
        width: 634,
        height: 1452,
        alt: 'PT Flash card payment screen',
      },
    ],
    screens: [
      {
        src: '/images/projects/pt-flash/pt-flash-dashboard-laptop.png',
        width: 1106,
        height: 700,
        alt: 'PT Flash parent calendar dashboard shown on a laptop',
      },
      {
        src: '/images/projects/pt-flash/pt-flash-activity-detail-iphone.png',
        width: 1106,
        height: 722,
        alt: 'PT Flash activity detail screen shown on an iPhone',
      },
    ],
  },
  {
    id: 'fnb',
    slug: 'fnb',
    title: 'FNB',
    categories: ['UI/UX Design', 'Enterprise Banking'],
    year: 2026,
    thumbnail: '/images/projects/fnb/fnb-for-my-business-desktop.png',
    thumbnailAlt: 'FNB, enterprise banking UI/UX design work',
    linked: true,
    featured: true,
    order: 1,
    depth: 'full',
    wash: 'mustard',
    confidential: true,
    screens: [
      {
        src: '/images/projects/fnb/fnb-for-my-business-laptop.png',
        width: 2208,
        height: 2760,
        alt: 'FNB "For my business" page shown on a laptop',
      },
      {
        src: '/images/projects/fnb/fnb-for-my-business-desktop.png',
        width: 2205,
        height: 2172,
        alt: 'FNB "For my business" page close-up',
      },
    ],
  },
  {
    id: 'neslo',
    slug: 'neslo',
    title: 'Neslo',
    categories: ['Brand Strategy', 'Brand Identity', 'Web Design & Dev'],
    year: 2026,
    linked: true,
    featured: false,
    order: 8,
    depth: 'archived',
    wash: 'cream',
    /* No exported imagery yet — placeholder imagery until the team's mockups land. */
  },
  {
    id: 'cellmed',
    slug: 'cellmed',
    title: 'CellMed',
    categories: ['UX Research', 'UX/UI Design', 'Design Systems'],
    year: 2025,
    linked: true,
    featured: true,
    order: 8,
    depth: 'full',
    wash: 'sage',
    /* No exported imagery yet — mockups coming; ProjectFilmstrip falls back to a placeholder icon until thumbnail is set. */
  },
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)

/* The deep-dive case studies — homepage filmstrip and the top of the /projects index. */
export const fullCaseStudies = [...projects]
  .sort((a, b) => a.order - b.order)
  .filter((p) => p.depth === 'full')

/* The lighter "More work" tier — shown below the full case studies on /projects, not on the homepage. */
export const archivedProjects = [...projects]
  .sort((a, b) => a.order - b.order)
  .filter((p) => p.depth === 'archived')
