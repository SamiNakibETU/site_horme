import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/**
 * Généré à /robots.txt. `/studio` est exclu : c'est le CMS, il n'a rien à
 * faire dans les résultats de recherche, et l'indexer exposerait la
 * structure interne du back-office sans aucun bénéfice.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/studio' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
