'use client'

/**
 * Loader global de next/image (déclaré dans next.config.mjs).
 *
 * Les photos viennent du CDN de Sanity, qui sait redimensionner et convertir
 * en AVIF/WebP à la volée. On lui délègue donc tout le travail : next/image
 * génère un `srcset` dont chaque URL demande la bonne largeur à Sanity, sans
 * détour par l'optimiseur de Next (qui ajoutait un aller-retour serveur et
 * consommait le quota d'optimisation de Vercel).
 *
 * Les fichiers locaux (logo, images de secours) sont servis tels quels.
 */
export default function sanityLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.includes('cdn.sanity.io')) {
    // Paramètre ignoré par le serveur statique, mais requis par next/image
    // pour distinguer les entrées du srcset.
    return `${src}${src.includes('?') ? '&' : '?'}w=${width}`
  }
  const [base, query = ''] = src.split('?')
  const params = new URLSearchParams(query)
  params.set('w', String(width))
  params.set('q', String(quality || 78))
  params.set('auto', 'format')
  params.set('fit', 'max')
  return `${base}?${params.toString()}`
}
