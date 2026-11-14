import type { PortableTextBlock } from '@portabletext/types'

/**
 * Domaine canonique du site, utilisé pour les URLs absolues (sitemap, Open
 * Graph, balises canonical). `NEXT_PUBLIC_SITE_URL` permet de le déplacer
 * sur un futur nom de domaine sans toucher au code.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://site-horme.vercel.app'

/** Aplati un bloc Portable Text en texte brut, pour une meta description. */
export function portableTextToPlain(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks?.length) return ''
  return blocks
    .map(block => {
      if (!('children' in block) || !Array.isArray(block.children)) return ''
      return block.children
        .map(child => (typeof child === 'object' && child && 'text' in child ? String(child.text ?? '') : ''))
        .join('')
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Tronque proprement sur un espace, pour ne jamais couper un mot en deux. */
export function truncate(text: string, max = 155): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max).replace(/\s+\S*$/, '')
  return `${cut}…`
}

/** Sérialise un objet JSON-LD sans permettre de sortir de la balise <script>. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\u003c')
}

type OrgInput = { siteName: string; metaDescription: string; ogImage: string }
type FooterInput = { instagramUrl: string; email: string }

/**
 * Données structurées de la compagnie (schema.org/DanceGroup). Google s'en
 * sert pour le panneau d'information et pour relier le site au compte
 * Instagram.
 */
export function organizationJsonLd(s: OrgInput, f: FooterInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DanceGroup',
    name: s.siteName,
    url: SITE_URL,
    description: s.metaDescription,
    ...(s.ogImage ? { image: s.ogImage } : {}),
    ...(f.email ? { email: f.email } : {}),
    sameAs: [f.instagramUrl].filter(u => /^https?:\/\//.test(u)),
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
  }
}
