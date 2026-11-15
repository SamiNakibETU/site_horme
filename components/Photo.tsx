import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { CmsImage } from '@/lib/image'

type Props = {
  image: CmsImage
  /** Largeur affichée, au format de l'attribut `sizes`. Ex. « (max-width: 768px) 100vw, 50vw ». */
  sizes: string
  alt?: string
  /** Remplit son parent (qui doit être positionné). Sinon, garde ses proportions. */
  fill?: boolean
  fit?: 'cover' | 'contain'
  priority?: boolean
  className?: string
  style?: CSSProperties
  /** Sans aperçu flou : pour une visionneuse où l'image précédente reste affichée. */
  noBlur?: boolean
  onLoad?: () => void
}

/**
 * Photo du CMS.
 *
 * - `placeholder="blur"` avec le LQIP de Sanity : pendant le chargement, on
 *   voit déjà la photo floue, à sa place exacte. Plus de squelette gris ni
 *   de saut de mise en page.
 * - `object-position` vient du hotspot réglé dans le Studio : le sujet reste
 *   dans le cadre quel que soit l'écran.
 * - Le `srcset` est servi par le CDN de Sanity (voir lib/imageLoader.ts).
 */
export default function Photo({ image, sizes, alt, fill, fit = 'cover', priority, className, style, noBlur, onLoad }: Props) {
  const altText = alt ?? image.alt ?? ''
  const common = {
    src: image.url,
    sizes,
    priority,
    className,
    onLoad,
    ...(image.lqip && !noBlur ? { placeholder: 'blur' as const, blurDataURL: image.lqip } : {}),
  }
  if (fill) {
    return (
      <Image
        {...common}
        alt={altText}
        fill
        style={{ objectFit: fit, objectPosition: image.position, ...style }}
      />
    )
  }
  return (
    <Image
      {...common}
      alt={altText}
      width={image.width}
      height={image.height}
      style={{ width: '100%', height: 'auto', objectPosition: image.position, ...style }}
    />
  )
}
