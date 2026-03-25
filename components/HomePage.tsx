'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/data/projects'
import type { HomePageCms } from '@/lib/cms.types'

gsap.registerPlugin(ScrollTrigger)

export type CinematicSlide = {
  src: string
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
                alt=""
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
                    alt=""
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

    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    )
  }, [delay])

  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>
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
      {projects.map((p, i) => (
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
        {hoverImg && (
          <Image src={hoverImg} alt="" fill style={{ objectFit: 'cover' }} />
        )}
      </div>
    </div>
  )
}

function slidesFromCms(home: HomePageCms): CinematicSlide[] {
  return home.slides.map(s => ({
    src: s.url,
    objectFit: s.objectFit,
    objectPosition: s.objectPosition,
  }))
}

export default function HomePage({ projects, home }: { projects: Project[]; home: HomePageCms }) {
  const slideshowSlides = slidesFromCms(home)
  const heroTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(heroTextRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      )
    }
  }, [])

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
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={home.heroVideoUrl}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }} />

        <div ref={heroTextRef} style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5vw, 3rem)',
          left: 'var(--gutter)',
          right: 'var(--gutter)',
          opacity: 0,
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
          <div>
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 4vw, 3rem)',
              lineHeight: 1.1,
              color: 'var(--black)',
              maxWidth: '24rem',
            }}>
              {home.manifestoLine1}
              <br />
              <span style={{ color: 'var(--blue)' }}>{home.manifestoAccent}</span>
            </p>
          </div>
          <Link
            href="/projets"
            style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--blue)',
              textDecoration: 'none',
              paddingBottom: '0.2rem',
            }}
          >
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

        <div style={{ maxWidth: '52rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.3)',
            marginBottom: '2.5rem',
          }}>
            {home.introKicker}
          </p>

          <AnimatedText delay={0}>
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
              lineHeight: 1.75,
              color: 'var(--black)',
              marginBottom: '1.5rem',
            }}>
              {home.introParagraph1}
            </p>
          </AnimatedText>

          <AnimatedText delay={0.15}>
            <p style={{
              fontFamily: 'Ribes, serif',
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
              lineHeight: 1.8,
              color: 'rgba(10,10,10,0.5)',
              marginBottom: '3rem',
            }}>
              {home.introParagraph2}
            </p>
          </AnimatedText>

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
            }}
          >
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
          maxWidth: '42rem',
          margin: '0 auto',
          textAlign: 'left',
        }}>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.3)',
            marginBottom: '1.5rem',
          }}>
            {home.imagesSectionKicker}
          </p>
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.65,
            color: 'rgba(10,10,10,0.55)',
            marginBottom: '2rem',
          }}>
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
          <p style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.3)',
            marginBottom: '3rem',
          }}>
            {home.creationsKicker}
          </p>

          <ProjectList projects={projects} />

          <div style={{ marginTop: '2.5rem', paddingTop: '1rem' }}>
            <Link
              href="/projets"
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
              {home.creationsFooterCtaLabel}
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
