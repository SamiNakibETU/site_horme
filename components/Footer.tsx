import Link from 'next/link'
import type { FooterCms } from '@/lib/cms.types'

export default function Footer({ data }: { data: FooterCms }) {
  return (
    <footer data-nav-theme="light" style={{
      position: 'relative',
      overflow: 'hidden',
      background: `
        radial-gradient(ellipse 60% 60% at 10% 100%, rgba(28,76,244,0.10) 0%, transparent 55%),
        radial-gradient(ellipse 40% 50% at 85% 90%, rgba(28,76,244,0.07) 0%, transparent 50%),
        var(--white)
      `,
    }}>

      <div style={{ padding: '3.5rem var(--gutter) 2rem', maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <p style={{
          fontFamily: 'Ribes, Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--black)',
          lineHeight: 1,
          marginBottom: '0.6rem',
          letterSpacing: '-0.01em',
        }}>
          {data.brandLine}{' '}
          <span style={{ color: 'var(--blue)' }}>{data.brandAccent}</span>
        </p>
        <p style={{
          fontFamily: 'Ribes, serif',
          fontWeight: 300,
          fontSize: '0.78rem',
          color: 'rgba(10,10,10,0.4)',
          lineHeight: 1.6,
          marginBottom: '3rem',
        }}>
          {data.tagline}
        </p>

        <div className="footer-cols" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '3rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}>
          <div className="footer-nav-wrap" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{
                fontFamily: 'Ribes, serif',
                fontWeight: 400,
                fontSize: '0.55rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.25)',
                marginBottom: '0.75rem',
              }}>
                {data.navColumnTitle}
              </p>
              {data.navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'block',
                    fontFamily: 'Ribes, serif',
                    fontWeight: 300,
                    fontSize: '0.82rem',
                    color: 'rgba(10,10,10,0.5)',
                    textDecoration: 'none',
                    padding: '0.15rem 0',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div>
              <p style={{
                fontFamily: 'Ribes, serif',
                fontWeight: 400,
                fontSize: '0.55rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.25)',
                marginBottom: '0.75rem',
              }}>
                {data.followColumnTitle}
              </p>
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  fontFamily: 'Ribes, serif',
                  fontWeight: 300,
                  fontSize: '0.82rem',
                  color: 'var(--blue)',
                  textDecoration: 'none',
                  padding: '0.15rem 0',
                }}
              >
                {data.instagramLabel}
              </a>
              <a
                href={`mailto:${data.email}`}
                style={{
                  display: 'block',
                  fontFamily: 'Ribes, serif',
                  fontWeight: 400,
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--blue)',
                  textDecoration: 'none',
                  marginTop: '1rem',
                }}
              >
                {data.email}
              </a>
            </div>
          </div>

          <p className="footer-tagline" style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 300,
            fontSize: '0.85rem',
            color: 'rgba(10,10,10,0.35)',
            lineHeight: 1.7,
            maxWidth: '16rem',
          }}>
            {data.asideTagline}
          </p>
        </div>

        <div style={{ paddingTop: '1.5rem' }}>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            color: 'rgba(10,10,10,0.2)',
            letterSpacing: '0.06em',
          }}>
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
