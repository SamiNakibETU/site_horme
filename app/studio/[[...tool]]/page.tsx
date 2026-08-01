import StudioLoader from './StudioLoader'

/**
 * Le CMS, accessible sur /studio.
 *
 * `[[...tool]]` est une route « catch-all optionnelle » : elle capte /studio
 * comme /studio/structure/singleton-homePage, car le Studio gère lui-même sa
 * navigation interne côté client.
 */
export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <StudioLoader />
}
