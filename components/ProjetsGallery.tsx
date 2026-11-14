'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Photo from '@/components/Photo'
import type { Project } from '@/lib/cms.types'

type Slide = { project: Project; photoIdx: number }

/**
 * Planche-contact plein écran.
 *
 * Le bandeau du haut liste les créations « à la une », choisies par la
 * compagnie dans le CMS. Leurs photos se suivent dans cet ordre ; cliquer un
 * titre saute à sa première photo. Les autres créations sont listées en bas.
 */
export default function ProjetsGallery({
  featured,
  others,
  othersTitle,
  openLabel,
}: {
  featured: Project[]
  others: Project[]
  othersTitle: string
  openLabel: string
}) {
  const slides = useMemo<Slide[]>(
    () => featured.flatMap(project => project.images.map((_, photoIdx) => ({ project, photoIdx }))),
    [featured],
  )
  const firstIndexOf = useMemo(() => {
    const m = new Map<string, number>()
    slides.forEach((s, i) => !m.has(s.project.slug) && m.set(s.project.slug, i))
    return m
  }, [slides])

  const [index, setIndex] = useState(0)
  const count = slides.length
  const current = slides[index]
  const project = current?.project
  const photo = project?.images[current.photoIdx]

  const go = useCallback((delta: number) => {
    if (count > 1) setIndex(i => (i + delta + count) % count)
  }, [count])

  // Clavier : flèches gauche et droite, sauf quand le focus est dans un champ.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select, [contenteditable]')) return
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  // Balayage au doigt. Un clic de souris reste géré par onClick.
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  // Le tiers gauche de l'image recule, le reste avance : le geste de
  // feuilleter un livre. Le curseur l'indique.
  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    go(e.clientX - r.left < r.width / 3 ? -1 : 1)
  }

  const credit = photo?.credit || project?.photographer.join(', ')
  const neighbours = count > 1 ? [slides[(index + 1) % count], slides[(index - 1 + count) % count]] : []

  return (
    <div data-nav-theme="light" className="gallery-fullscreen">
      <nav className="projets-titles" aria-label="Créations à la une">
        {featured.map(p => {
          const start = firstIndexOf.get(p.slug)
          const active = project?.slug === p.slug
          // Une création à la une sans photo mène directement à sa fiche.
          return start === undefined ? (
            <Link key={p.slug} href={`/projets/${p.slug}`} className="projets-titles__item">
              {p.title}
            </Link>
          ) : (
            <button
              key={p.slug}
              type="button"
              className="projets-titles__item"
              aria-current={active ? 'true' : undefined}
              onClick={() => setIndex(start)}
            >
              {p.title}
            </button>
          )
        })}
      </nav>

      {photo ? (
        <div
          className="gallery-stage"
          onClick={onStageClick}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseMove={e => {
            const r = e.currentTarget.getBoundingClientRect()
            e.currentTarget.dataset.side = e.clientX - r.left < r.width / 3 ? 'prev' : 'next'
          }}
        >
          <div key={index} className="gallery-photo">
            <Photo
              image={photo}
              fill
              fit="contain"
              priority
              sizes="(max-width: 768px) 100vw, 86vw"
              alt={photo.alt || `${project.title}, photo ${current.photoIdx + 1}`}
            />
          </div>
          {/* Préchargement des voisines : le changement de photo ne montre
              jamais de vide. */}
          <div className="sr-only" aria-hidden="true">
            {neighbours.map(n => {
              const img = n.project.images[n.photoIdx]
              return <Photo key={`${n.project.slug}-${n.photoIdx}`} image={img} fill sizes="(max-width: 768px) 100vw, 86vw" />
            })}
          </div>
        </div>
      ) : (
        <div className="gallery-stage gallery-stage--empty">
          <p className="ed-caption">Les photographies seront publiées prochainement.</p>
        </div>
      )}

      {project && (
        <footer className="projets-bottom">
          <div aria-live="polite">
            <p className="ed-caption" style={{ marginTop: 0, marginBottom: '0.5rem' }}>
              {project.type}, {project.year}
            </p>
            <p className="ed-display" style={{ fontSize: 'var(--step-1)' }}>
              {project.title}
            </p>
            {credit && <p className="ed-caption">Photo : {credit}</p>}
          </div>

          <div className="projets-bottom__controls">
            {count > 1 && (
              <div className="gallery-arrows">
                <button type="button" onClick={() => go(-1)} aria-label="Photo précédente">
                  Préc.
                </button>
                <span className="gallery-count" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <button type="button" onClick={() => go(1)} aria-label="Photo suivante">
                  Suiv.
                </button>
              </div>
            )}
            <Link href={`/projets/${project.slug}`} className="ed-link">
              {openLabel}
            </Link>
          </div>
        </footer>
      )}

      {others.length > 0 && (
        <div className="projets-others">
          <span className="ed-caption" style={{ marginTop: 0 }}>
            {othersTitle}
          </span>
          {others.map(p => (
            <Link key={p.slug} href={`/projets/${p.slug}`}>
              {p.title}
              {p.subtitle && <span className="hide-mobile">, {p.subtitle}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
