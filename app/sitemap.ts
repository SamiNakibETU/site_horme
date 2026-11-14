import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/getProjects'
import { SITE_URL } from '@/lib/seo'

/** /sitemap.xml : toutes les pages publiques, avec la date de dernière modification des fiches. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects()
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/projets`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/presentation`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    ...projects.map(p => ({
      url: `${SITE_URL}/projets/${p.slug}`,
      ...(p.updatedAt ? { lastModified: new Date(p.updatedAt) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
