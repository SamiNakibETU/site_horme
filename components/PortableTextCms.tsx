import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const bodyStyle = {
  fontFamily: 'Ribes, serif',
  fontWeight: 300,
  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
  lineHeight: 1.8,
  color: 'var(--black)',
} as const

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank === false ? undefined : '_blank'}
        rel="noopener noreferrer"
        style={{ color: 'var(--blue)', textDecoration: 'none' }}
      >
        {children}
      </a>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p style={{ ...bodyStyle, marginBottom: '1.5rem' }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: 'Ribes, Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          color: 'var(--black)',
          marginBottom: '1rem',
          marginTop: '2rem',
        }}
      >
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          ...bodyStyle,
          borderLeft: '2px solid var(--blue)',
          paddingLeft: '1.25rem',
          margin: '1.5rem 0',
          color: 'rgba(10,10,10,0.55)',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ ...bodyStyle, marginBottom: '1.5rem', paddingLeft: '1.25rem' }}>{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: '0.35rem' }}>{children}</li>,
  },
}

export function PortableTextCms({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null
  return <PortableText value={value} components={components} />
}
