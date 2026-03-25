'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/data/projects'

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
    p => p && !/^à compléter$/i.test(p.trim())
  )
  if (!names.length) return null
  return names.join(', ')
}

export default function ProjetsGallery({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const pool = useMemo<PoolEntry[]>(() => {
    const entries: PoolEntry[] = []
    projects.forEach((p, idx) => {
      p.images.forEach(src => entries.push({ src, projectIdx: idx }))
    })
    return shuffle(entries)
  }, [projects])

  const [imageIndex, setImageIndex] = useState(0)
  const current = pool[imageIndex]
  const activeProjectIdx = current?.projectIdx ?? 0
  const project = projects[activeProjectIdx]

  const [isHovering, setIsHovering] = useState(false)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)

  const handleImageClick = () => {
    setPrevIndex(imageIndex)
    setImageIndex(prev => (prev + 1) % pool.length)
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const credit = project ? photoCreditLine(project) : null

  return (
    <div
      data-nav-theme="light"
      style={{
        minHeight: '100dvh',
        background: `
          radial-gradient(ellipse 55% 30% at 15% 45%, rgba(28,76,244,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 45% 35% at 80% 55%, rgba(28,76,244,0.06) 0%, transparent 55%),
          var(--white)
        `,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '5rem',
      }}
    >

      <div className="projets-titles" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '2rem var(--gutter) 0',
        paddingBottom: '1rem',
        flexShrink: 0,
      }}>
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projets/${p.slug}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontFamily: 'Ribes, serif',
              fontWeight: activeProjectIdx === i ? 400 : 300,
              fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
              color: activeProjectIdx === i
                ? 'var(--blue)'
                : hovered === i
                  ? 'var(--black)'
                  : 'rgba(10,10,10,0.3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s ease, font-weight 0.3s ease',
              textDecoration: 'none',
              textAlign: 'center',
              flex: 1,
              padding: '0 1rem',
            }}
          >
            {p.title}
          </Link>
        ))}
      </div>

      <div style={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem var(--gutter) 0',
        minHeight: 0,
      }}>
        <div
          onClick={handleImageClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            position: 'relative',
            width: 'min(85vw, 560px)',
            maxHeight: 'min(48vh, 420px)',
            minHeight: 'min(36vh, 320px)',
            aspectRatio: '4/3',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'transform 0.35s ease',
            transform: isHovering ? 'scale(1.015)' : 'scale(1)',
            background: '#f4f4f4',
          }}
        >
          {prevIndex !== null && prevIndex !== imageIndex && (
            <div
              key={`prev-${prevIndex}`}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                transition: 'opacity 0.35s ease-out',
              }}
            >
              <Image
                src={pool[prevIndex].src}
                alt=""
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          )}
          <div
            key={`cur-${imageIndex}`}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1,
              transition: 'opacity 0.35s ease-out',
            }}
          >
            <Image
              src={pool[imageIndex].src}
              alt=""
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>
        </div>

        <div
          className="projets-bottom"
          style={{
            width: 'min(85vw, 560px)',
            marginTop: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.5rem',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.3)',
              marginBottom: '0.4rem',
            }}>
              {project.type} · {project.year}
            </p>
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 300,
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              color: 'var(--black)',
            }}>
              {project.title}
            </p>
            {credit && (
              <p style={{
                fontFamily: 'Ribes, serif',
                fontWeight: 400,
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.35)',
                marginTop: '0.5rem',
              }}>
                Photo · {credit}
              </p>
            )}
          </div>

          <Link
            href={`/projets/${project.slug}`}
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
            Ouvrir →
          </Link>
        </div>

        {pool.length > 1 && (
          <link
            rel="prefetch"
            href={pool[(imageIndex + 1) % pool.length].src}
            as="image"
          />
        )}
      </div>

      {hovered !== null && hovered !== activeProjectIdx && (
        <div style={{
          position: 'fixed',
          left: mouse.x + 18,
          top: mouse.y - 90,
          width: 130,
          height: 170,
          pointerEvents: 'none',
          zIndex: 50,
          opacity: 0.9,
          transition: 'opacity 0.2s',
        }}>
          <Image
            src={projects[hovered].coverImage}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  )
}
