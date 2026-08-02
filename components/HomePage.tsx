'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { documentedProjects, undocumentedProjects, type Project } from '@/data/projects'
import type { HomePageCms } from '@/lib/cms.types'

gsap.registerPlugin(ScrollTrigger)

export type CinematicSlide = {
  src: string
  /** Description saisie dans le CMS. Vide = photo purement décorative. */
  alt?: string
  objectFit?: 'cover' | 'contain'
  objectPosition?: string
}

function CinematicScroll({ slides }: { slides: CinematicSlide[] }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const onScroll = () => {
      const rect = outer.getBoundingClientRect()
      const scrollable = outer.scrollHeight - window.innerHeight
      if (scrollable <= 0) return

      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / scrollable))
      setProgress(p)
      setActiveIdx(Math.min(slides.length - 1, Math.floor(p * slides.length)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [slides.length])

  const trackWidthVw = slides.length * 55

  return (
    <>
      <div className="cine-mobile-wrap" data-nav-theme="light" style={{
        padding: '1rem 0',
        overflow: 'hidden',
      }}>
        <div className="cine-mobile-track" style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: 'var(--gutter)',
          paddingRight: 'var(--gutter)',
        }}>
          {slides.map((slide, i) => (
            <div key={i} style={{
              flexShrink: 0,
              width: '70vw',
              minHeight: 'min(56vw, 72vh)',
              maxHeight: '78vh',
              position: 'relative',
              overflow: 'hidden',
              scrollSnapAlign: 'center',
              background: slide.objectFit === 'contain' ? '#f4f4f4' : undefined,
            }}>
              <Image
                src={slide.src}
                alt={slide.alt ?? ''}
                fill
                className={slide.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                style={{
                  objectPosition: slide.objectPosition || 'center',
                }}
                priority={i < 2}
              />
            </div>
          ))}
        </div>
        <div className="swipe-hint" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          paddingTop: '0.75rem',
        }}>
          <span style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.5rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.25)',
          }}>Glisser</span>
          <span style={{
            fontSize: '0.6rem',
            color: 'rgba(10,10,10,0.25)',
            animation: 'swipeArrow 1.5s ease-in-out infinite',
          }}>→</span>
        </div>
      </div>

      <div
        className="cine-desktop-wrap"
        ref={outerRef}
        data-nav-theme="light"
        style={{ height: `${slides.length * 60}vh` }}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}>
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: `${trackWidthVw}vw`,
              alignItems: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.5rem)',
              paddingLeft: 'var(--gutter)',
              paddingRight: '10vw',
              transform: `translateX(${-progress * (trackWidthVw - 100)}vw)`,
              willChange: 'transform',
            }}
          >
            {slides.map((slide, i) => {
              const isActive = activeIdx === i
              const fit = slide.objectFit ?? 'cover'
              return (
                <div key={i} className="cine-item" style={{
                  flexShrink: 0,
                  width: 'clamp(280px, 45vw, 520px)',
                  height: '65vh',
                  position: 'relative',
                  overflow: 'hidden',
                  background: fit === 'contain' ? '#f4f4f4' : undefined,
                }}>
                  <Image
                    src={slide.src}
                    alt={slide.alt ?? ''}
                    fill
                    className={fit === 'contain' ? 'object-contain' : 'object-cover'}
                    style={{
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      objectPosition: slide.objectPosition || 'center',
                    }}
                    priority={i < 2}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `
                      linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 25%),
                      linear-gradient(135deg, rgba(28,76,244,0.04) 0%, transparent 50%)
                    `,
                    opacity: isActive ? 1 : 0.3,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: 'none',
                  }} />
                </div>
              )
            })}
          </div>

          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: 'clamp(40px, 6vw, 100px)',
            background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
            zIndex: 3,
            opacity: progress > 0.02 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }} />

          <div style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0,
            width: 'clamp(40px, 6vw, 100px)',
            background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
            zIndex: 3,
            opacity: progress < 0.98 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }} />

          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          <div style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 3vw, 2rem)',
            right: 'var(--gutter)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 400,
              fontSize: '0.55rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.3)',
            }}>
              {String(activeIdx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'rgba(10,10,10,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                width: `${((activeIdx + 1) / slides.length) * 100}%`,
                background: 'var(--blue)',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function AnimatedText({ children, delay = 0 }: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        },
      )
    })
    return () => ctx.revert()
  }, [delay])

  // Pas d'`opacity: 0` inline : sans JavaScript — ou si GSAP échoue — le texte
  // resterait invisible. L'état masqué est posé par le CSS sous `.js-ready`,
  // classe que ScrollAnimations n'ajoute que s'il va réellement animer.
  return <div ref={ref} data-animate-text>{children}</div>
}

/**
 * En-tête de section numéroté, suivi d'un filet — la convention des revues
 * d'art. La numérotation donne au lecteur un repère de progression que le
 * défilement seul ne fournit pas.
 */
function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="ed-label">
      <span className="ed-label__num">{num}</span>
      <span>{children}</span>
      <span className="ed-label__rule" aria-hidden="true" />
    </div>
  )
}

function ProjectList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [hoverImg, setHoverImg] = useState('')
  const [imgTop, setImgTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleEnter = useCallback((slug: string, e: React.MouseEvent) => {
    setHovered(slug)
    const project = projects.find(p => p.slug === slug)
    if (project && project.images.length > 0) {
      const rand = project.images[Math.floor(Math.random() * project.images.length)]
      setHoverImg(rand)
    }
    if (containerRef.current) {
      const cr = containerRef.current.getBoundingClientRect()
      const rr = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setImgTop(rr.top - cr.top + rr.height / 2 - 90)
    }
  }, [projects])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {documentedProjects(projects).map((p, i) => (
        <Link
          key={p.slug}
          href={`/projets/${p.slug}`}
          onMouseEnter={(e) => handleEnter(p.slug, e)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1.5rem',
            padding: '1.8rem 0',
            textDecoration: 'none',
            transition: 'opacity 0.3s ease, filter 0.3s ease',
            opacity: hovered && hovered !== p.slug ? 0.2 : 1,
            filter: hovered && hovered !== p.slug ? 'blur(1.5px)' : 'none',
          }}
        >
          <span style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.25)',
            width: '1.5rem',
            flexShrink: 0,
          }}>
            0{i + 1}
          </span>

          <span className="hide-mobile" style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(28,76,244,0.6)',
            width: '5rem',
            flexShrink: 0,
          }}>
            {p.type}
          </span>

          <span style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 300,
            fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            color: hovered === p.slug ? 'var(--blue)' : 'var(--black)',
            transition: 'color 0.2s ease',
            flex: 1,
          }}>
            {p.title}
            {p.subtitle && (
              <span className="hide-mobile" style={{ fontSize: '0.85rem', color: 'rgba(10,10,10,0.3)', marginLeft: '0.75rem', fontWeight: 300 }}>
                {p.subtitle}
              </span>
            )}
          </span>

          <span style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 300,
            fontSize: '0.75rem',
            color: hovered === p.slug ? 'var(--blue)' : 'rgba(10,10,10,0.2)',
            transition: 'color 0.2s ease',
          }}>
            →
          </span>
        </Link>
      ))}

      <div className="hide-mobile" style={{
        position: 'absolute',
        right: '-2rem',
        top: imgTop,
        width: 200,
        height: 150,
        overflow: 'hidden',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease, top 0.35s ease',
        pointerEvents: 'none',
        zIndex: 10,
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      }}>
        {/* `key` sur la source : chaque survol remonte l'élément, donc rejoue
            le fondu. Sans lui, passer d'un projet à l'autre remplacerait la
            photo d'un coup sec. */}
        {hoverImg && (
          <Image
            key={hoverImg}
            src={hoverImg}
            alt=""
            fill
            className="gallery-photo"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Créations sans photographie. Elles gardent leur place dans l'index
          mais dans un registre plus discret : pas d'aperçu au survol, pas de
          numérotation — rien ne promet une image qui n'existe pas encore. */}
      {undocumentedProjects(projects).length > 0 && (
        <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid var(--rule)' }}>
          <p className="ed-caption" style={{ marginTop: 0, marginBottom: '1.25rem' }}>
            Également au répertoire
          </p>
          {undocumentedProjects(projects).map(p => (
            <Link
              key={p.slug}
              href={`/projets/${p.slug}`}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                padding: '0.6rem 0',
                textDecoration: 'none',
                color: 'var(--ink-mid)',
                fontFamily: 'Ribes, Georgia, serif',
                fontWeight: 300,
                fontSize: '1rem',
                transition: 'color 240ms var(--ease-out)',
              }}
            >
              <span style={{ flex: 1 }}>
                {p.title}
                {p.subtitle && (
                  <span className="hide-mobile" style={{ color: 'var(--ink-soft)', marginLeft: '0.6rem', fontSize: '0.8rem' }}>
                    {p.subtitle}
                  </span>
                )}
              </span>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                {p.year}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function slidesFromCms(home: HomePageCms): CinematicSlide[] {
  return home.slides.map(s => ({
    src: s.url,
    alt: s.alt,
    objectFit: s.objectFit,
    objectPosition: s.objectPosition,
  }))
}

export default function HomePage({ projects, home }: { projects: Project[]; home: HomePageCms }) {
  const slideshowSlides = slidesFromCms(home)

  return (
    <main style={{
      background: `
        radial-gradient(ellipse 70% 30% at 15% 40%, rgba(28,76,244,0.13) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 85% 50%, rgba(28,76,244,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 60% 25% at 45% 65%, rgba(28,76,244,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 40% 35% at 25% 82%, rgba(10,10,10,0.03) 0%, transparent 50%),
        var(--white)
      `,
    }}>

      <section
        data-nav-theme="dark"
        style={{ position: 'relative', height: '100dvh', overflow: 'hidden', background: '#000' }}
      >
        {/* `preload="metadata"` et non "auto" : la vidéo pèse plusieurs Mo et,
            en "auto", le navigateur la télécharge intégralement avant tout le
            reste — polices et images comprises. Le poster s'affiche
            instantanément pendant qu'elle se charge, au lieu d'un aplat vide. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={home.heroPosterUrl || undefined}
          src={home.heroVideoUrl}
          aria-hidden="true"
          tabIndex={-1}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }} />

        <div className="hero-reveal" style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5vw, 3rem)',
          left: 'var(--gutter)',
          right: 'var(--gutter)',
        }}>
          <h1 style={{
            fontFamily: 'Ribes, Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 9vw, 8.5rem)',
            lineHeight: 0.92,
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            {home.heroTitle}
          </h1>

          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 300,
            fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: '26rem',
          }}>
            {home.heroLine1}
            {home.heroLine2 ? (
              <>
                <br />
                {home.heroLine2}
              </>
            ) : null}
          </p>
        </div>
      </section>

      <CinematicScroll slides={slideshowSlides} />

      <section
        data-nav-theme="light"
        style={{ position: 'relative' }}
      >
        <div style={{
          padding: 'clamp(1.2rem, 2.5vw, 2rem) var(--gutter) clamp(1.5rem, 3vw, 2.5rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          {/* Exergue : la phrase-manifeste de la compagnie, traitée comme un
              chapô de revue. C'est le seul endroit du site où le bleu porte du
              sens plutôt qu'une simple fonction de lien. */}
          <blockquote className="ed-display" style={{ maxWidth: '20ch', margin: 0 }}>
            {home.manifestoLine1}
            <br />
            <span style={{ color: 'var(--blue)' }}>{home.manifestoAccent}</span>
          </blockquote>
          <Link href="/projets" className="ed-link">
            {home.manifestoCtaLabel}
          </Link>
        </div>
      </section>

      <section
        data-nav-theme="light"
        style={{
          padding: 'clamp(3rem, 7vw, 6rem) var(--gutter)',
          position: 'relative',
        }}
      >

        <div style={{ maxWidth: '58rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <SectionLabel num="01">{home.introKicker}</SectionLabel>

          <AnimatedText delay={0}>
            <p className="ed-lead" style={{ marginBottom: '1.75rem' }}>
              {home.introParagraph1}
            </p>
          </AnimatedText>

          <AnimatedText delay={0.15}>
            <p className="ed-body" style={{ marginBottom: '3rem' }}>
              {home.introParagraph2}
            </p>
          </AnimatedText>

          <Link href="/presentation" className="ed-link">
            {home.introCtaLabel}
          </Link>
        </div>
      </section>

      <section
        data-nav-theme="light"
        style={{
          padding: 'clamp(3rem, 8vw, 7rem) var(--gutter)',
          position: 'relative',
        }}
      >
        <div style={{
          maxWidth: '58rem',
          margin: '0 auto',
          textAlign: 'left',
        }}>
          <SectionLabel num="02">{home.imagesSectionKicker}</SectionLabel>
          <p className="ed-body" style={{ marginBottom: '2.5rem' }}>
            {home.imagesSectionBody}
          </p>
          <Link
            href="/presentation"
            style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--blue)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            {home.imagesSectionCtaLabel}
          </Link>
        </div>
      </section>

      <section
        data-nav-theme="light"
        style={{
          padding: 'clamp(4rem, 10vw, 8rem) var(--gutter)',
        }}
      >
        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
          <SectionLabel num="03">{home.creationsKicker}</SectionLabel>

          <ProjectList projects={projects} />

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--rule)' }}>
            <Link href="/projets" className="ed-link">
              {home.creationsFooterCtaLabel}
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
