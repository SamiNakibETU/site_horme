import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/getProjects'
import { SITE_URL } from '@/lib/seo'

/**
 * Généré à /sitemap.xml. Sans ce fichier, Google doit découvrir chaque page
 * en suivant des liens — plus lent, et incertain pour des pages profondes
 * comme les fiches de créations récentes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/presentation`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projets`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${SITE_URL}/projets/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
