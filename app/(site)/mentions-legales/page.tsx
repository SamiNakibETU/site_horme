import type { Metadata } from 'next'
import { PortableTextCms } from '@/components/PortableTextCms'
import { getContactPage, getLegalPage, getSiteSettings } from '@/lib/getCms'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mentions légales',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
}

/**
 * Mentions légales (LCEN, art. 6). L'hébergeur est fixe ; l'éditeur et la
 * direction de la publication se saisissent dans le CMS.
 */
export default async function LegalPage() {
  const [l, s, c] = await Promise.all([getLegalPage(), getSiteSettings(), getContactPage()])
  const email = l.contactEmail || c.email
  const missing = <span className="legal-missing">à compléter dans le CMS (Mentions légales)</span>

  return (
    <main data-nav-theme="light" className="page">
      <div className="page__inner page__inner--narrow">
        <h1 className="ed-display page__title">Mentions légales</h1>

        <dl className="legal">
          <div>
            <dt className="ed-caption">Éditeur</dt>
            <dd style={{ whiteSpace: 'pre-line' }}>{l.publisher || <>{s.siteName}, {missing}</>}</dd>
          </div>
          <div>
            <dt className="ed-caption">Direction de la publication</dt>
            <dd>{l.director || missing}</dd>
          </div>
          <div>
            <dt className="ed-caption">Contact</dt>
            <dd>
              <a href={`mailto:${email}`}>{email}</a>
            </dd>
          </div>
          <div>
            <dt className="ed-caption">Hébergement</dt>
            <dd>
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              <br />
              Contenus et images : Sanity AS, Oslo, Norvège.
            </dd>
          </div>
          <div>
            <dt className="ed-caption">Données personnelles</dt>
            <dd>
              Ce site ne dépose aucun cookie de mesure d’audience ni de publicité et ne collecte aucune donnée
              personnelle. Les vidéos YouTube ou Vimeo ne se chargent que si vous les lancez.
            </dd>
          </div>
        </dl>

        {l.body.length > 0 && (
          <div style={{ marginTop: 'var(--sp-6)' }}>
            <PortableTextCms value={l.body} size="small" />
          </div>
        )}
      </div>
    </main>
  )
}
