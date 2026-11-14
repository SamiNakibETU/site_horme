import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

/**
 * Texte riche saisi dans le CMS. Le style vit dans globals.css (`.rich`), ce
 * qui permet de suivre la police et la couleur choisies par la compagnie.
 */
const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href || ''
      const external = /^https?:\/\//.test(href)
      const blank = external && value?.blank !== false
      return (
        <a href={href} {...(blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
          {blank && <span className="sr-only"> (nouvel onglet)</span>}
        </a>
      )
    },
  },
}

export function PortableTextCms({ value, size = 'normal' }: { value: PortableTextBlock[]; size?: 'normal' | 'small' }) {
  if (!value?.length) return null
  return (
    <div className="rich" data-size={size}>
      <PortableText value={value} components={components} />
    </div>
  )
}
