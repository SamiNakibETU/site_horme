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
      <div style={{ padding: '0 var(--gutter)', maxWidth: '52rem', margin: '0 auto' }}>

        <p className="ed-caption" style={{ marginTop: 0, marginBottom: '1.5rem' }}>
          {c.kicker}
        </p>

        <h1 className="ed-display" style={{ fontSize: 'var(--step-3)', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          {c.title}
        </h1>

        {/* Chaque information est posée sous un filet plutôt que séparée par du
            vide : la ligne donne une structure de fiche, et permet de resserrer
            les blocs sans qu'ils se confondent. */}
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.25rem', marginBottom: '2.5rem' }}>
          <p className="ed-caption" style={{ marginTop: 0, marginBottom: '0.75rem' }}>
            {c.emailLabel}
          </p>
          <a href={`mailto:${c.email}`} className="ed-mail">
            {c.email}
          </a>
        </div>

        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.25rem', marginBottom: '3.5rem' }}>
          <p className="ed-caption" style={{ marginTop: 0, marginBottom: '0.75rem' }}>
            {c.locationLabel}
          </p>
          <p className="ed-body" style={{ whiteSpace: 'pre-line' }}>
            {c.locationText}
          </p>
        </div>

        <div style={{ paddingBottom: '5rem' }}>
          <Link href="/" className="ed-link">
            {c.backLinkLabel}
          </Link>
        </div>

      </div>
    </main>
  )
}
