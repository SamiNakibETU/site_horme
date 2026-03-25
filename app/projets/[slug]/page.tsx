import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/getProjects'

export const revalidate = 3600

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(p => ({ slug: p.slug }))
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
        height: '100vh',
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
          <Link
            href="/projets"
            style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.3)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '3rem',
              marginTop: '3.5rem',
              transition: 'color 0.2s',
            }}
          >
            ← Créations
          </Link>

          <h1 style={{
            fontFamily: 'Ribes, Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            lineHeight: 1.15,
            color: 'var(--black)',
            marginBottom: '0.75rem',
          }}>
            {project.title}
          </h1>

          {project.subtitle && (
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(10,10,10,0.4)',
              marginBottom: '1.5rem',
            }}>
              {project.subtitle}
            </p>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.3)',
              marginBottom: '0.25rem',
            }}>
              {project.type} · {project.year}
            </p>
            {project.location && (
              <p style={{
                fontFamily: 'Ribes, serif',
                fontWeight: 400,
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.3)',
                marginBottom: '0.25rem',
              }}>
                {project.location}
              </p>
            )}
            {project.photographer.length > 0 && (
              <p style={{
                fontFamily: 'Ribes, serif',
                fontWeight: 400,
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.3)',
              }}>
                Photos : {project.photographer.join(', ')}
              </p>
            )}
          </div>

          {project.description && (
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 300,
              fontSize: '0.85rem',
              lineHeight: 1.8,
              color: 'rgba(10,10,10,0.55)',
            }}>
              {project.description}
            </p>
          )}
        </div>

        <p style={{
          fontFamily: 'Ribes, serif',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(10,10,10,0.2)',
        }}>
          {project.images.length} images
        </p>
      </aside>

      <main className="project-images" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
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
