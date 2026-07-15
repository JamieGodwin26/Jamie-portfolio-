import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jamiegodwin.co.za'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects
    .filter((p) => p.linked)
    .map((p) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...projectRoutes,
  ]
}
