import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  title: string
  kicker?: string
  children?: ReactNode
}

export default function CreationPlaceholder({ title, kicker, children }: Props) {
  return (
    <main
      data-nav-theme="light"
      style={{
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '4rem',
        paddingLeft: 'var(--gutter)',
        paddingRight: 'var(--gutter)',
        maxWidth: '42rem',
        margin: '0 auto',
        background: `
          radial-gradient(ellipse 55% 30% at 20% 20%, rgba(28,76,244,0.07) 0%, transparent 55%),
          var(--white)
        `,
      }}
    >
      {kicker && (
        <p style={{
          fontFamily: 'Ribes, serif',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(10,10,10,0.3)',
          marginBottom: '1.5rem',
        }}>
          {kicker}
        </p>
      )}
      <h1 style={{
        fontFamily: 'Ribes, Georgia, serif',
        fontWeight: 300,
        fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
        lineHeight: 1.1,
        color: 'var(--black)',
        marginBottom: '1.5rem',
      }}>
        {title}
      </h1>
      <div style={{
        fontFamily: 'Ribes, serif',
        fontWeight: 300,
        fontSize: '1rem',
        lineHeight: 1.75,
        color: 'rgba(10,10,10,0.55)',
      }}>
        {children ?? (
          <p>
            Cette page sera complétée avec les textes et visuels fournis par la compagnie.
          </p>
        )}
      </div>
      <div style={{ marginTop: '2.5rem' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            textDecoration: 'none',
            marginRight: '1.5rem',
          }}
        >
          ← Accueil
        </Link>
        <Link
          href="/projets"
          style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            textDecoration: 'none',
          }}
        >
          Créations →
        </Link>
      </div>
    </main>
  )
}
