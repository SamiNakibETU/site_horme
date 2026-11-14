import type { Metadata } from 'next'
import Link from 'next/link'
import { getContactPage, getSiteSettings } from '@/lib/getCms'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const [c, s] = await Promise.all([getContactPage(), getSiteSettings()])
  const description = `Écrire à la ${s.siteName} : ${c.email}. ${c.locationText.split('\n')[0]}.`
  return {
    title: 'Contact',
    description,
    alternates: { canonical: '/contact' },
    openGraph: { title: `Contact | ${s.siteName}`, description },
  }
}

export default async function ContactPage() {
  const c = await getContactPage()

  return (
    <main data-nav-theme="light" className="page page--tinted">
      <div className="page__inner page__inner--narrow">
        <p className="ed-caption page__kicker">{c.kicker}</p>
        <h1 className="ed-display page__title" style={{ fontSize: 'var(--step-3)' }}>
          {c.title}
        </h1>

        {/* Chaque information sous un filet : une fiche, pas une page vide. */}
        <div className="contact-block">
          <p className="ed-caption">{c.emailLabel}</p>
          <a href={`mailto:${c.email}`} className="ed-mail">
            {c.email}
          </a>
        </div>

        {c.contacts.length > 0 && (
          <div className="contact-block">
            <dl className="contact-people">
              {c.contacts.map((p, i) => (
                <div key={i}>
                  <dt className="ed-caption">{p.role}</dt>
                  <dd>
                    {p.name && <span className="contact-people__name">{p.name}</span>}
                    {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
                    {p.phone && <a href={`tel:${p.phone.replace(/[^\d+]/g, '')}`}>{p.phone}</a>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="contact-block">
          <p className="ed-caption">{c.locationLabel}</p>
          <p className="ed-body" style={{ whiteSpace: 'pre-line' }}>
            {c.locationText}
          </p>
        </div>

        {c.pressKitUrl && (
          <div className="contact-block">
            <a href={`${c.pressKitUrl}?dl=`} className="ed-link">
              {c.pressKitLabel} (PDF)
            </a>
          </div>
        )}

        <div className="page__foot">
          <Link href="/" className="ed-link">
            {c.backLinkLabel}
          </Link>
        </div>
      </div>
    </main>
  )
}
