/**
 * Contraint la largeur demandée à l'origine (le CDN Sanity), avant que
 * l'optimiseur d'images de Next ne la retravaille pour chaque écran.
 *
 * Sans ça, une photo envoyée à pleine résolution (un DSLR sort souvent du
 * 4000px+) est retéléchargée intégralement par le serveur à chaque premier
 * affichage, avant même d'être redimensionnée. Le CDN Sanity accepte des
 * paramètres de largeur directement sur l'URL du fichier — ça déplace le
 * redimensionnement initial sur un CDN taillé pour ça, plutôt que sur
 * l'origine.
 */
export function sanityImageUrl(url: string | undefined, width: number): string {
  if (!url || !url.includes('cdn.sanity.io')) return url || ''
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${width}&auto=format`
}
