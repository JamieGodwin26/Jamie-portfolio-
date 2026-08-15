import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'orbit',
    slug: 'orbit',
    title: 'Orbit',
    categories: ['Branding', 'UX/UI Design'],
    year: 2025,
    thumbnail: '/images/projects/orbit.png',
    thumbnailAlt: 'Orbit, brand identity and product design screens',
    linked: true,
    featured: true,
    order: 3,
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
    categories: ['Branding', 'UX/UI Design'],
    year: 2023,
    thumbnail: '/images/projects/ehub.png',
    thumbnailAlt: 'EHUB, brand identity and product design',
    linked: true,
    featured: true,
    order: 4,
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
    categories: ['Product Design', 'Design Systems'],
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
    categories: ['Branding', 'Web Design & Dev'],
    year: 2023,
    thumbnail: '/images/projects/xenith.png',
    thumbnailAlt: 'Xenith, brand and web design',
    linked: true,
    featured: true,
    order: 5,
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
    order: 6,
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
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)

/* Full site index: all projects, not just the homepage's featured subset (identical today, may diverge later) */
export const allFullCaseStudies = [...projects]
  .sort((a, b) => a.order - b.order)
  .filter((p) => p.depth === 'full')
