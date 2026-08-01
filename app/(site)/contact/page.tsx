import Link from 'next/link'
import { getContactPage } from '@/lib/getCms'

export const revalidate = 3600

export async function generateMetadata() {
  const c = await getContactPage()
  return {
    title: `${c.title} | Contact | Cie. Horme`,
  }
}

export default async function ContactPage() {
  const c = await getContactPage()

  return (
    <main
      data-nav-theme="light"
      style={{
        minHeight: '100vh',
        paddingTop: '7rem',
        background: `
          radial-gradient(ellipse 50% 35% at 25% 55%, rgba(28,76,244,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 75% 40%, rgba(28,76,244,0.05) 0%, transparent 55%),
          var(--white)
        `,
      }}
    >
      <div style={{ padding: '0 var(--gutter)', maxWidth: '40rem', margin: '0 auto' }}>

        <p style={{
          fontFamily: 'Ribes, serif',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(10,10,10,0.3)',
          marginBottom: '2rem',
        }}>
          {c.kicker}
        </p>

        <h1 style={{
          fontFamily: 'Ribes, Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(2.5rem, 5vw, 5rem)',
          lineHeight: 1,
          color: 'var(--black)',
          marginBottom: '4rem',
        }}>
          {c.title}
        </h1>

        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.3)',
            marginBottom: '0.75rem',
          }}>
            {c.emailLabel}
          </p>
          <a
            href={`mailto:${c.email}`}
            style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--black)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            {c.email}
          </a>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.3)',
            marginBottom: '0.75rem',
          }}>
            {c.locationLabel}
          </p>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 300,
            fontSize: '0.9rem',
            color: 'rgba(10,10,10,0.5)',
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
          }}>
            {c.locationText}
          </p>
        </div>

        <div style={{
          paddingTop: '3rem',
          paddingBottom: '5rem',
        }}>
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
            }}
          >
            {c.backLinkLabel}
          </Link>
        </div>

      </div>
    </main>
  )
}
