import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AgendaList from '@/components/AgendaList'
import Photo from '@/components/Photo'
import { PortableTextCms } from '@/components/PortableTextCms'
import VideoEmbed from '@/components/VideoEmbed'
import { getSiteSettings } from '@/lib/getCms'
import { getAllProjects, getOrderedProjects, getProjectBySlug } from '@/lib/getProjects'
import { SITE_URL, jsonLd, portableTextToPlain, truncate } from '@/lib/seo'

export const revalidate = 3600

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [project, s] = await Promise.all([getProjectBySlug(params.slug), getSiteSettings()])
  if (!project) return {}
  const description = truncate(project.description || portableTextToPlain(project.body) || `${project.title}, ${project.type.toLowerCase()} de la ${s.siteName}, ${project.year}.`)
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${s.siteName}`,
      description,
      type: 'article',
      ...(project.cover ? { images: [{ url: project.cover.url, width: project.cover.width, height: project.cover.height }] } : {}),
    },
  }
}

function todayInParis() {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date())
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, { featured, others }, s] = await Promise.all([
    getProjectBySlug(params.slug),
    getOrderedProjects(),
    getSiteSettings(),
  ])
  if (!project) notFound()

  // Création suivante, dans l'ordre du site : à la une, puis les autres.
  const order = [...featured, ...others]
  const pos = order.findIndex(p => p.slug === project.slug)
  const next = order.length > 1 ? order[(pos + 1) % order.length] : null

  const today = todayInParis()
  const hasMedia = project.images.length > 0 || project.videoUrl || project.videoFile

  // Données structurées : l'œuvre, et une représentation (Event) par date.
  // Google peut alors afficher les dates directement dans ses résultats.
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url: `${SITE_URL}/projets/${project.slug}`,
    dateCreated: String(project.year),
    genre: project.type,
    creator: { '@type': 'DanceGroup', name: s.siteName, url: SITE_URL },
    ...(project.description ? { abstract: project.description } : {}),
    ...(project.cover ? { image: project.cover.url } : {}),
    ...(project.performances.length
      ? {
          subjectOf: project.performances.map(p => ({
            '@type': 'DanceEvent',
            name: project.title,
            startDate: p.date,
            eventStatus: 'https://schema.org/EventScheduled',
            location: { '@type': 'Place', name: p.venue, address: p.city || 'France' },
            performer: { '@type': 'DanceGroup', name: s.siteName },
            ...(p.ticketUrl ? { offers: { '@type': 'Offer', url: p.ticketUrl } } : {}),
          })),
        }
      : {}),
  }

  return (
    <div data-nav-theme="light" className="project-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />

      <aside className="project-sidebar">
        <div>
          <Link href="/projets" className="ed-link project-back">
            Toutes les créations
          </Link>

          <h1 className="ed-display project-title">{project.title}</h1>
          {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}

          <dl className="project-facts">
            <div>
              <dt>Type</dt>
              <dd>{project.type}</dd>
            </div>
            <div>
              <dt>Année</dt>
              <dd>{project.year}</dd>
            </div>
            {project.location && (
              <div>
                <dt>Lieu</dt>
                <dd>{project.location}</dd>
              </div>
            )}
            {project.photographer.length > 0 && (
              <div>
                <dt>Photos</dt>
                <dd>{project.photographer.join(', ')}</dd>
              </div>
            )}
          </dl>

          {project.description && <p className="ed-body project-summary">{project.description}</p>}

          {project.body.length > 0 && (
            <div className="project-body">
              <PortableTextCms value={project.body} size="small" />
            </div>
          )}

          {project.performances.length > 0 && (
            <section className="project-block" aria-labelledby="p-dates">
              <h2 id="p-dates" className="ed-caption">Dates</h2>
              <AgendaList entries={project.performances} today={today} />
            </section>
          )}

          {project.credits.length > 0 && (
            <section className="project-block" aria-labelledby="p-credits">
              <h2 id="p-credits" className="ed-caption">Distribution</h2>
              <dl className="project-credits">
                {project.credits.map((c, i) => (
                  <div key={i}>
                    <dt>{c.role}</dt>
                    <dd>{c.names}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {(project.links.length > 0 || project.dossierUrl) && (
            <section className="project-block" aria-labelledby="p-liens">
              <h2 id="p-liens" className="ed-caption">À lire</h2>
              <ul className="project-links">
                {project.dossierUrl && (
                  <li>
                    <a href={`${project.dossierUrl}?dl=`} className="ed-link">
                      Télécharger le dossier (PDF)
                    </a>
                  </li>
                )}
                {project.links.map((l, i) => (
                  <li key={i}>
                    <a href={l.url} className="ed-link" target="_blank" rel="noopener noreferrer">
                      {l.label}
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {next && (
          <Link href={`/projets/${next.slug}`} className="project-next">
            <span className="ed-caption" style={{ marginTop: 0 }}>Création suivante</span>
            <span className="project-next__title">{next.title}</span>
          </Link>
        )}
      </aside>

      <main className="project-images">
        {!hasMedia && (
          <div className="project-empty">
            <p className="ed-caption" style={{ marginTop: 0, textAlign: 'center' }}>
              Les photographies de cette création
              <br />
              seront publiées prochainement
            </p>
          </div>
        )}

        {project.videoUrl && <VideoEmbed url={project.videoUrl} poster={project.cover} title={project.title} />}
        {!project.videoUrl && project.videoFile && (
          <video src={project.videoFile} controls playsInline preload="metadata" className="project-video" />
        )}

        {project.images.map((img, i) => (
          <figure key={`${img.url}-${i}`} className="project-figure">
            <Photo
              image={img}
              alt={img.alt || `${project.title}, photo ${i + 1}`}
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 72vw"
            />
            {img.credit && <figcaption>Photo : {img.credit}</figcaption>}
          </figure>
        ))}
      </main>
    </div>
  )
}
