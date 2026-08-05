import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/getProjects'

export const revalidate = 3600

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}

  const title = `${project.title} | Cie. Horme`
  const description = project.description?.trim() || undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // C'est ce qui détermine l'aperçu affiché quand ce lien est partagé
      // sur Instagram, WhatsApp ou dans un e-mail : sans elle, la carte de
      // partage retombait sur l'image générique du site entier.
      ...(project.coverImage ? { images: [{ url: project.coverImage }] } : {}),
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <div
      data-nav-theme="light"
      className="project-detail"
      style={{
        display: 'flex',
        height: '100dvh',
        // La page démarre sous la barre de navigation. Sans ça, la colonne de
        // photos défile derrière elle : le texte du menu, en thème clair pour
        // la colonne blanche de gauche, devient illisible sur les images à
        // droite. Le thème ne se choisit que verticalement, il ne peut pas
        // être juste des deux côtés d'une mise en page scindée à la verticale.
        paddingTop: 'var(--nav-height)',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse 50% 40% at 20% 60%, rgba(28,76,244,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 40% 35% at 75% 40%, rgba(28,76,244,0.05) 0%, transparent 50%),
          var(--white)
        `,
      }}
    >

      <aside className="project-sidebar" style={{
        flexShrink: 0,
        width: 'clamp(220px, 28vw, 380px)',
        padding: 'var(--gutter)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto',
      }}>
        <div>
          <Link href="/projets" className="ed-link" style={{ marginBottom: '2.5rem' }}>
            ← Créations
          </Link>

          <h1 className="ed-display" style={{ fontSize: 'var(--step-2)', marginBottom: '0.5rem' }}>
            {project.title}
          </h1>

          {project.subtitle && (
            <p style={{
              fontFamily: 'Ribes, Georgia, serif',
              fontWeight: 300,
              fontSize: '0.95rem',
              color: 'var(--ink-soft)',
              marginBottom: '1.75rem',
            }}>
              {project.subtitle}
            </p>
          )}

          {/* Fiche technique, posée sous un filet. Les gris sont remontés à
              --ink-soft : l'ancien rgba(10,10,10,0.3) passait sous le seuil de
              contraste 3:1 et devenait illisible en plein jour. */}
          <dl style={{
            borderTop: '1px solid var(--rule)',
            paddingTop: '1rem',
            marginBottom: '2rem',
            display: 'grid',
            gap: '0.35rem',
          }}>
            <div className="ed-caption" style={{ marginTop: 0 }}>
              {project.type} · {project.year}
            </div>
            {project.location && (
              <div className="ed-caption" style={{ marginTop: 0 }}>{project.location}</div>
            )}
            {project.photographer.length > 0 && (
              <div className="ed-caption" style={{ marginTop: 0 }}>
                Photos · {project.photographer.join(', ')}
              </div>
            )}
          </dl>

          {project.description && (
            <p className="ed-body" style={{ fontSize: '0.9rem' }}>
              {project.description}
            </p>
          )}
        </div>

        <p className="ed-caption" style={{ marginTop: '2rem' }}>
          {project.images.length > 0
            ? `${project.images.length} image${project.images.length > 1 ? 's' : ''}`
            : 'Sans visuel'}
        </p>
      </aside>

      <main className="project-images" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Une création peut ne pas encore avoir de photographies. On le dit,
            plutôt que de laisser une colonne vide qui ressemble à une panne. */}
        {project.images.length === 0 && !project.video && (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--gutter)',
            }}
          >
            <p className="ed-caption" style={{ marginTop: 0, textAlign: 'center' }}>
              Les photographies de cette création<br />seront publiées prochainement
            </p>
          </div>
        )}

        {project.video && (
          <div style={{ width: '100%', aspectRatio: '16/9' }}>
            <video
              src={project.video}
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {project.images.map((img, i) => {
          const meta = project.galleryItems?.[i]
          const alt = meta?.alt?.trim() || `${project.title} — image ${i + 1}`
          return (
            <div key={`${img}-${i}`} style={{ width: '100%', position: 'relative' }}>
              <Image
                src={img}
                alt={alt}
                width={1200}
                height={900}
                style={{ width: '100%', height: 'auto', display: 'block', margin: 0, padding: 0 }}
              />
              {meta?.credit && (
                <p style={{
                  fontFamily: 'Ribes, serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.35)',
                  padding: '0.5rem var(--gutter) 1.25rem',
                  margin: 0,
                }}>
                  Photo · {meta.credit}
                </p>
              )}
            </div>
          )
        })}
      </main>
    </div>
  )
}
