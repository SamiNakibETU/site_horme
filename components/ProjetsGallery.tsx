'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { documentedProjects, undocumentedProjects, type Project } from '@/data/projects'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type PoolEntry = { src: string; projectIdx: number }

function photoCreditLine(project: Project): string | null {
  const names = project.photographer.filter(
    p => p && !/^à compléter$/i.test(p.trim()),
  )
  return names.length ? names.join(', ') : null
}

/**
 * Planche-contact plein écran.
 *
 * Une seule image à la fois, au centre ; les informations sont repoussées aux
 * deux bords de l'écran pour laisser la photographie occuper tout le milieu.
 * Toute la surface est cliquable — c'est le geste principal de la page, il ne
 * doit donc pas demander de viser.
 */
export default function ProjetsGallery({ projects }: { projects: Project[] }) {
  // Seules les créations photographiées alimentent la planche-contact ; les
  // autres sont listées à part, en bas de page.
  const withPhotos = useMemo(() => documentedProjects(projects), [projects])
  const withoutPhotos = useMemo(() => undocumentedProjects(projects), [projects])

  // Ordre stable, identique sur le serveur et au premier rendu client.
  const ordered = useMemo<PoolEntry[]>(
    () => withPhotos.flatMap((p, idx) => p.images.map(src => ({ src, projectIdx: idx }))),
    [withPhotos],
  )

  // Le mélange n'a lieu qu'APRÈS le montage. Appeler Math.random() pendant le
  // rendu produirait un ordre côté serveur et un autre côté client :
  // l'hydratation diverge et les `src` d'images ne se stabilisent jamais.
  const [pool, setPool] = useState<PoolEntry[]>(ordered)
  useEffect(() => setPool(shuffle(ordered)), [ordered])

  const [index, setIndex] = useState(0)
  const current = pool[index]
  const project = withPhotos[current?.projectIdx ?? 0]
  const credit = project ? photoCreditLine(project) : null

  // Suit quel index a fini de charger, plutôt qu'un simple booléen : au clic
  // suivant, le squelette doit réapparaître même si l'image précédente était
  // déjà chargée. Comparer à `index` fait ça sans effet supplémentaire.
  const [loadedIndex, setLoadedIndex] = useState<number | null>(null)
  const isLoaded = loadedIndex === index

  const next = useCallback(() => {
    if (pool.length > 1) setIndex(i => (i + 1) % pool.length)
  }, [pool.length])

  const prev = useCallback(() => {
    if (pool.length > 1) setIndex(i => (i - 1 + pool.length) % pool.length)
  }, [pool.length])

  // La navigation au clavier double le clic : sans elle, la page entière
  // serait inatteignable sans souris.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (!project) return null

  return (
    <div
      data-nav-theme="light"
      className="gallery-fullscreen"
      onClick={next}
      style={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--white)',
        display: 'grid',
        // Titres, image (qui absorbe l'espace restant), métadonnées, index.
        gridTemplateRows: 'auto 1fr auto auto',
      }}
    >
      {/* Bandeau des créations. `stopPropagation` sur chaque lien : sans lui,
          le clic ouvrirait la fiche ET changerait la photo. */}
      <nav
        className="projets-titles"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(1.5rem, 4vw, 4rem)',
          padding: 'calc(var(--gutter) + 3.5rem) var(--gutter) 0',
        }}
      >
        {withPhotos.map((p, i) => {
          const active = current.projectIdx === i
          return (
            <Link
              key={p.slug}
              href={`/projets/${p.slug}`}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: 'Ribes, Georgia, serif',
                fontWeight: 400,
                fontSize: 'var(--step--1)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: active ? 'var(--blue)' : 'var(--ink-soft)',
                textDecoration: 'none',
                transition: 'color 320ms var(--ease-out)',
              }}
            >
              {p.title}
            </Link>
          )
        })}
      </nav>

      {/* L'image. `key` sur l'index déclenche le remontage, donc l'animation
          de fondu : chaque photo entre par elle-même plutôt que de remplacer
          brutalement la précédente. */}
      {/* Image dimensionnée normalement plutôt qu'en `fill` : `fill` repose sur
          un positionnement absolu dont la hauteur dépend entièrement du parent,
          fragile à l'intérieur d'une grille. Ici la photo se contraint elle-même
          à l'espace disponible et se centre, sans dépendre de la piste. */}
      <div
        className={isLoaded ? undefined : 'img-skeleton'}
        style={{
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'clamp(1.5rem, 4vh, 3rem) var(--gutter)',
        }}
      >
        <Image
          key={index}
          src={current.src}
          alt={`${project.title} — ${project.type}, ${project.year}`}
          width={1920}
          height={1280}
          priority
          sizes="90vw"
          onLoad={() => setLoadedIndex(index)}
          // Pas de `gallery-photo` ici : son animation à durée fixe
          // entrerait en concurrence avec `.img-reveal`, qui se déclenche sur
          // le chargement réel plutôt que sur un minutage arbitraire.
          className={`img-reveal${isLoaded ? ' is-loaded' : ''}`}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Informations plaquées aux deux bords : la photographie garde tout le
          centre, et l'œil circule d'un angle à l'autre plutôt que de buter
          sur un bloc compact. */}
      <footer
        className="projets-bottom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '1.5rem',
          padding: '0 var(--gutter) clamp(1.5rem, 4vh, 2.5rem)',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'Ribes, Georgia, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: '0.5rem',
            }}
          >
            {project.type} · {project.year}
          </p>
          <p className="ed-display" style={{ fontSize: 'var(--step-1)' }}>
            {project.title}
          </p>
          {credit && (
            <p className="ed-caption" style={{ marginTop: '0.5rem' }}>
              Photo · {credit}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'Ribes, Georgia, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              color: 'var(--ink-soft)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(index + 1).padStart(2, '0')} / {String(pool.length).padStart(2, '0')}
          </span>
          <Link
            href={`/projets/${project.slug}`}
            className="ed-link"
            onClick={e => e.stopPropagation()}
          >
            Ouvrir →
          </Link>
        </div>
      </footer>

      {/* Créations sans photographie. Elles ne peuvent pas figurer dans la
          planche-contact, mais doivent rester atteignables : une ligne discrète
          suffit, et dire « sans visuel » est plus honnête que de les mêler aux
          autres avec un cadre vide. */}
      {withoutPhotos.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0.5rem 1.5rem',
            padding: '0 var(--gutter) clamp(1rem, 3vh, 1.75rem)',
            borderTop: '1px solid var(--rule)',
            marginTop: '-0.5rem',
            paddingTop: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'Ribes, Georgia, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}
          >
            Sans visuel
          </span>
          {withoutPhotos.map(p => (
            <Link
              key={p.slug}
              href={`/projets/${p.slug}`}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: 'Ribes, Georgia, serif',
                fontSize: '0.72rem',
                color: 'var(--ink-mid)',
                textDecoration: 'none',
                transition: 'color 240ms var(--ease-out)',
              }}
            >
              {p.title}
              {p.subtitle ? ` · ${p.subtitle}` : ''}
            </Link>
          ))}
        </div>
      )}

      {/* Précharge la vue suivante pour que le fondu ne montre jamais de vide. */}
      {pool.length > 1 && (
        <link rel="prefetch" as="image" href={pool[(index + 1) % pool.length].src} />
      )}
    </div>
  )
}
