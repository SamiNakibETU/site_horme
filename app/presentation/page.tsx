import Image from 'next/image'
import Link from 'next/link'
import { PortableTextCms } from '@/components/PortableTextCms'
import { defaultPresentationIntroFallback } from '@/lib/cms.defaults'
import { getPresentationPage } from '@/lib/getCms'

export const revalidate = 3600

export async function generateMetadata() {
  const p = await getPresentationPage()
  return {
    title: `${p.title} | Présentation | Cie. Horme`,
  }
}

export default async function PresentationPage() {
  const p = await getPresentationPage()

  return (
    <main
      data-nav-theme="light"
      style={{
        minHeight: '100vh',
        paddingTop: '7rem',
        background: `
          radial-gradient(ellipse 60% 30% at 20% 50%, rgba(28,76,244,0.09) 0%, transparent 65%),
          radial-gradient(ellipse 45% 40% at 80% 30%, rgba(28,76,244,0.06) 0%, transparent 55%),
          var(--white)
        `,
      }}
    >
      <div style={{ padding: '0 var(--gutter)', maxWidth: '72rem', margin: '0 auto' }}>

        <p style={{
          fontFamily: 'Ribes, serif',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(10,10,10,0.3)',
          marginBottom: '2rem',
        }}>
          {p.kicker}
        </p>

        <h1 style={{
          fontFamily: 'Ribes, Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(2.5rem, 5vw, 5rem)',
          lineHeight: 1,
          color: 'var(--black)',
          marginBottom: '4rem',
        }}>
          {p.title}
        </h1>

        <div style={{
          maxWidth: '40rem',
          marginBottom: '6rem',
        }}>
          {p.intro?.length ? (
            <PortableTextCms value={p.intro} />
          ) : (
            <>
              <p style={{
                fontFamily: 'Ribes, serif',
                fontWeight: 300,
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                lineHeight: 1.8,
                color: 'var(--black)',
                marginBottom: '1.5rem',
              }}>
                {defaultPresentationIntroFallback.p1}
              </p>
              <p style={{
                fontFamily: 'Ribes, serif',
                fontWeight: 300,
                fontSize: '0.9rem',
                lineHeight: 1.8,
                color: 'rgba(10,10,10,0.5)',
              }}>
                {defaultPresentationIntroFallback.p2}
              </p>
            </>
          )}
        </div>

        <div style={{
          paddingTop: '4rem',
          marginBottom: '6rem',
        }}>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.3)',
            marginBottom: '3rem',
          }}>
            {p.dancersSectionTitle}
          </p>

          <div className="parcours-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {p.dancers.map((d, i) => (
              <div key={`${d.name}-${i}`}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  background: '#f4f4f4',
                }}>
                  <Image
                    src={d.portraitUrl}
                    alt={d.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'contain', objectPosition: 'top center' }}
                  />
                </div>
                <h3 style={{
                  fontFamily: 'Ribes, Georgia, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                  color: 'var(--black)',
                  marginBottom: '0.5rem',
                }}>
                  {d.name}
                </h3>
                <p style={{
                  fontFamily: 'Ribes, serif',
                  fontWeight: 400,
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--blue)',
                  marginBottom: '1.5rem',
                }}>
                  {d.role}
                </p>
                {d.bio1 ? (
                  <p style={{
                    fontFamily: 'Ribes, serif',
                    fontWeight: 300,
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                    color: 'rgba(10,10,10,0.6)',
                    marginBottom: '1rem',
                  }}>
                    {d.bio1}
                  </p>
                ) : null}
                {d.bio2 ? (
                  <p style={{
                    fontFamily: 'Ribes, serif',
                    fontWeight: 300,
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                    color: 'rgba(10,10,10,0.6)',
                    marginBottom: '1rem',
                  }}>
                    {d.bio2}
                  </p>
                ) : null}
                <div style={{ marginTop: '1.2rem' }}>
                  <p style={{
                    fontFamily: 'Ribes, serif',
                    fontWeight: 400,
                    fontSize: '0.55rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.25)',
                    marginBottom: '0.5rem',
                  }}>
                    {d.formationTitle}
                  </p>
                  <p style={{
                    fontFamily: 'Ribes, serif',
                    fontWeight: 300,
                    fontSize: '0.82rem',
                    lineHeight: 1.7,
                    color: 'rgba(10,10,10,0.45)',
                    whiteSpace: 'pre-line',
                  }}>
                    {d.formationText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          paddingTop: '3rem',
          paddingBottom: '5rem',
        }}>
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
            {p.projectsCtaLabel}
          </Link>
        </div>

      </div>
    </main>
  )
}
