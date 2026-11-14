import imageUrlBuilder from '@sanity/image-url'

/**
 * Images Sanity : recadrage, point d'intérêt et aperçu flou.
 *
 * Avant, le site lisait `image.asset->url`, l'URL du fichier brut. Le
 * recadrage et le « hotspot » réglés dans le Studio étaient donc ignorés :
 * le guide demandait de placer le point sur le visage, et rien n'en tenait
 * compte. Ici on projette l'objet image entier, puis on en tire :
 * - une URL qui applique le recadrage (paramètre `rect`) ;
 * - un `object-position` CSS calculé depuis le hotspot ;
 * - les dimensions réelles, pour réserver la place et éviter les sauts ;
 * - le LQIP, une miniature floue de quelques centaines d'octets affichée
 *   pendant le chargement.
 */

/** Fragment GROQ à placer après un champ image : `photo${IMAGE}`. */
export const IMAGE = `{
  "ref": asset._ref,
  "url": asset->url,
  crop,
  hotspot,
  "lqip": asset->metadata.lqip,
  "w": asset->metadata.dimensions.width,
  "h": asset->metadata.dimensions.height
}`

type Rect = { top: number; bottom: number; left: number; right: number }
type Point = { x: number; y: number }

export type RawImage = {
  ref?: string
  url?: string
  crop?: Rect | null
  hotspot?: Point | null
  lqip?: string | null
  w?: number | null
  h?: number | null
} | null | undefined

/** Image prête à l'affichage. */
export type CmsImage = {
  url: string
  width: number
  height: number
  /** Valeur CSS `object-position` tirée du hotspot. */
  position: string
  lqip?: string
  alt?: string
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

export function toCmsImage(raw: RawImage, maxWidth = 2000, alt?: string): CmsImage | null {
  if (!raw?.url) return null
  const crop = raw.crop ?? { top: 0, bottom: 0, left: 0, right: 0 }
  const keepW = 1 - crop.left - crop.right
  const keepH = 1 - crop.top - crop.bottom
  const width = Math.round((raw.w || 1600) * (keepW > 0 ? keepW : 1))
  const height = Math.round((raw.h || 1067) * (keepH > 0 ? keepH : 1))

  let url = raw.url
  if (builder && raw.ref) {
    url = builder
      .image({ asset: { _ref: raw.ref }, crop: raw.crop ?? undefined, hotspot: raw.hotspot ?? undefined })
      .width(Math.min(maxWidth, width))
      .fit('max')
      .auto('format')
      .url()
  }

  // Le hotspot est exprimé par rapport à l'image entière ; on le ramène au
  // repère de l'image recadrée, celui que voit le navigateur.
  let position = '50% 50%'
  if (raw.hotspot) {
    const x = keepW > 0 ? clamp01((raw.hotspot.x - crop.left) / keepW) : 0.5
    const y = keepH > 0 ? clamp01((raw.hotspot.y - crop.top) / keepH) : 0.5
    position = `${Math.round(x * 100)}% ${Math.round(y * 100)}%`
  }

  return { url, width, height, position, lqip: raw.lqip || undefined, alt: alt?.trim() || undefined }
}

/** Image locale de secours (contenu par défaut, avant saisie dans le CMS). */
export function localImage(url: string, width = 1600, height = 1067, alt?: string, position = '50% 50%'): CmsImage {
  return { url, width, height, position, alt }
}
