import type { Metadata } from 'next'
import Link from 'next/link'
import Photo from '@/components/Photo'
import { PortableTextCms } from '@/components/PortableTextCms'
import { defaultPresentationIntroFallback } from '@/lib/cms.defaults'
import { getPresentationPage, getSiteSettings } from '@/lib/getCms'
import { portableTextToPlain, truncate } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const [p, s] = await Promise.all([getPresentationPage(), getSiteSettings()])
  const description = truncate(portableTextToPlain(p.intro)) || s.metaDescription
  return {
    title: 'Présentation',
    description,
    alternates: { canonical: '/presentation' },
    openGraph: { title: `Présentation | ${s.siteName}`, description },
  }
}

export default async function PresentationPage() {
  const p = await getPresentationPage()

  return (
    <main data-nav-theme="light" className="page page--tinted">
      <div className="page__inner">
        <p className="ed-caption page__kicker">{p.kicker}</p>
        <h1 className="ed-display page__title">{p.title}</h1>

        <div className="presentation-intro">
          {p.intro.length ? (
            <PortableTextCms value={p.intro} />
          ) : (
            <>
              <p className="ed-lead">{defaultPresentationIntroFallback.p1}</p>
              <p className="ed-body" style={{ marginTop: '1.5rem' }}>
                {defaultPresentationIntroFallback.p2}
              </p>
            </>
          )}
        </div>

        {p.dancers.length > 0 && (
          <section aria-labelledby="equipe" className="presentation-team">
            <h2 id="equipe" className="ed-label">
              <span>{p.dancersSectionTitle}</span>
            </h2>

            <div className="parcours-grid" data-count={p.dancers.length}>
              {p.dancers.map((d, i) => (
                <article key={`${d.name}-${i}`} className="member" data-animate="fade-up" data-delay={i}>
                  {d.portrait && (
                    <div className="member__portrait">
                      <Photo image={d.portrait} fill sizes="(max-width: 768px) 100vw, 45vw" alt={`Portrait de ${d.name}`} />
                    </div>
                  )}
                  <h3 className="member__name">{d.name}</h3>
                  {d.role && <p className="member__role">{d.role}</p>}
                  {d.bio1 && <p className="ed-body member__bio">{d.bio1}</p>}
                  {d.bio2 && <p className="ed-body member__bio">{d.bio2}</p>}
                  {d.formationText && (
                    <div className="member__formation">
                      {d.formationTitle && <p className="ed-caption" style={{ marginTop: 0 }}>{d.formationTitle}</p>}
                      <p>{d.formationText}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {p.partners.length > 0 && (
          <section aria-labelledby="soutiens" className="presentation-partners">
            <h2 id="soutiens" className="ed-label">
              <span>{p.partnersTitle}</span>
            </h2>
            <ul className="partners">
              {p.partners.map((pt, i) => {
                const inner = (
                  <>
                    {pt.logo ? (
                      <span className="partners__logo">
                        <Photo image={pt.logo} fill fit="contain" sizes="160px" alt={pt.name} />
                      </span>
                    ) : (
                      <span className="partners__name">{pt.name}</span>
                    )}
                    {pt.role && <span className="partners__role">{pt.role}</span>}
                  </>
                )
                return (
                  <li key={`${pt.name}-${i}`}>
                    {pt.url ? (
                      <a href={pt.url} target="_blank" rel="noopener noreferrer">
                        {inner}
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    ) : (
                      <div>{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <div className="page__foot">
          <Link href="/projets" className="ed-link">
            {p.projectsCtaLabel}
          </Link>
        </div>
      </div>
    </main>
  )
}
