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
  // Remplace `w=` s'il existe déjà plutôt que d'empiler un second paramètre :
  // la fonction est appelée une première fois à la lecture des données (pour
  // fixer une taille d'affichage large), puis parfois une seconde fois côté
  // composant pour dériver une vignette plus petite à partir de cette même
  // URL. Idempotente, elle reste sûre à rappeler à n'importe quel étage.
  const [base, query = ''] = url.split('?')
  const params = new URLSearchParams(query)
  params.set('w', String(width))
  params.set('auto', 'format')
  return `${base}?${params.toString()}`
}
