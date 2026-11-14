'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Photo from '@/components/Photo'
import AgendaList from '@/components/AgendaList'
import type { AgendaEntry, HomePageCms, HomeSlideCms, Project } from '@/lib/cms.types'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ─── Héro ────────────────────────────────────────────────────────────────────

function Hero({ home }: { home: HomePageCms }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)

  // La vidéo est muette et lente : elle joue aussi en mouvement réduit, mais
  // le bouton Pause reste toujours disponible (WCAG 2.2.2).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Hors écran, la vidéo s'arrête : elle ne consomme ni batterie ni
    // processeur pendant qu'on lit le reste de la page.
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause()
      else if (!v.dataset.userPaused) v.play().catch(() => {})
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      delete v.dataset.userPaused
      v.play().catch(() => {})
      setPaused(false)
    } else {
      v.dataset.userPaused = '1'
      v.pause()
      setPaused(true)
    }
  }

  return (
    <section data-nav-theme="dark" className="hero">
      {home.heroPoster && <Photo image={home.heroPoster} alt="" fill priority sizes="100vw" />}

      {home.heroVideoUrl && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src={home.heroVideoUrl}
          aria-hidden="true"
          tabIndex={-1}
          data-ready={ready}
          onPlaying={() => setReady(true)}
          className="hero-video"
        />
      )}

      <span aria-hidden="true" data-ready={ready || paused} className="hero-loading-hint" />
      <div className="hero__shade" />

      <div className="hero__text">
        {/* Chaque mot monte depuis un masque, l'un après l'autre. Le texte
            complet reste lisible par les lecteurs d'écran via aria-label. */}
        <h1 className="hero__title" aria-label={home.heroTitle}>
          {home.heroTitle.split(/\s+/).map((w, i) => (
            <span key={i} className="hero__word" aria-hidden="true" style={{ ['--i' as string]: i }}>
              <span>{w}</span>
            </span>
          ))}
        </h1>
        {(home.heroLine1 || home.heroLine2) && (
          <p className="hero__lines">
            {home.heroLine1}
            {home.heroLine2 && (
              <>
                <br />
                {home.heroLine2}
              </>
            )}
          </p>
        )}
      </div>

      {home.heroVideoUrl && (
        <button type="button" className="hero__toggle" onClick={toggle} aria-pressed={paused}>
          {paused ? 'Lecture' : 'Pause'}
          <span className="sr-only"> de la vidéo</span>
        </button>
      )}
    </section>
  )
}

// ─── Photos qui défilent ─────────────────────────────────────────────────────

function CinematicScroll({ slides }: { slides: HomeSlideCms[] }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const trackWidthVw = slides.length * 55

  // La piste est déplacée directement, sans passer par l'état React : une
  // seule écriture de `transform` par image affichée. Avant, chaque
  // événement de défilement re-rendait tout le composant.
  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return
    let frame = 0
    let last = -1

    const update = () => {
      frame = 0
      const scrollable = outer.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const p = Math.max(0, Math.min(1, -outer.getBoundingClientRect().top / scrollable))
      track.style.transform = `translate3d(${-p * (trackWidthVw - 100)}vw,0,0)`
      outer.style.setProperty('--edge-l', p > 0.02 ? '1' : '0')
      outer.style.setProperty('--edge-r', p < 0.98 ? '1' : '0')
      const idx = Math.min(slides.length - 1, Math.floor(p * slides.length))
      if (idx !== last) {
        last = idx
        setActiveIdx(idx)
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [slides.length, trackWidthVw])

  useEffect(() => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${(activeIdx + 1) / slides.length})`
  }, [activeIdx, slides.length])

  if (!slides.length) return null

  return (
    <>
      {/* Téléphone : défilement horizontal natif, au doigt. */}
      <div className="cine-mobile-wrap" data-nav-theme="light">
        <div className="cine-mobile-track" tabIndex={0} aria-label="Photos de la compagnie">
          {slides.map((s, i) => (
            <div key={i} className="cine-mobile-item" data-fit={s.objectFit}>
              <Photo image={s.image} fill fit={s.objectFit} sizes="72vw" priority={i < 2} />
            </div>
          ))}
        </div>
        <p className="swipe-hint" aria-hidden="true">
          Glisser
        </p>
      </div>

      {/* Ordinateur : le défilement vertical fait avancer la bande. */}
      <div
        className="cine-desktop-wrap"
        ref={outerRef}
        data-nav-theme="light"
        style={{ height: `${slides.length * 60}vh` }}
      >
        <div className="cine-sticky">
          <div ref={trackRef} className="cine-track" style={{ width: `${trackWidthVw}vw` }}>
            {slides.map((s, i) => (
              <div key={i} className="cine-item" data-fit={s.objectFit} data-active={activeIdx === i}>
                <Photo image={s.image} fill fit={s.objectFit} sizes="(max-width: 1200px) 45vw, 520px" priority={i < 2} />
              </div>
            ))}
          </div>
          <div className="cine-edge cine-edge--l" aria-hidden="true" />
          <div className="cine-edge cine-edge--r" aria-hidden="true" />
          <div className="cine-counter" aria-hidden="true">
            <span>
              {String(activeIdx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="cine-counter__bar">
              <div ref={barRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Texte révélé au défilement ──────────────────────────────────────────────

function AnimatedText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } },
      )
    })
    return () => ctx.revert()
  }, [delay])
  // L'état masqué est posé en CSS sous `.js-ready` : sans JavaScript, le
  // texte reste visible.
  return (
    <div ref={ref} data-animate-text>
      {children}
    </div>
  )
}

/** Titre de section suivi d'un filet. */
function SectionLabel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 className="ed-label" id={id}>
      <span>{children}</span>
    </h2>
  )
}

// ─── Liste des créations ─────────────────────────────────────────────────────

function ProjectList({ featured, others, othersTitle }: { featured: Project[]; others: Project[]; othersTitle: string }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [thumbTop, setThumbTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const onEnter = useCallback((slug: string, e: React.MouseEvent | React.FocusEvent) => {
    setHovered(slug)
    const c = containerRef.current
    if (!c) return
    const cr = c.getBoundingClientRect()
    const rr = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setThumbTop(rr.top - cr.top + rr.height / 2)
  }, [])

  const hoveredProject = featured.find(p => p.slug === hovered)

  return (
    <div ref={containerRef} className="plist" data-hovering={Boolean(hovered)} onMouseLeave={() => setHovered(null)}>
      <ol className="plist__main">
        {featured.map(p => (
          <li key={p.slug}>
            <Link
              href={`/projets/${p.slug}`}
              className="plist__row"
              data-active={hovered === p.slug}
              onMouseEnter={e => onEnter(p.slug, e)}
              onFocus={e => onEnter(p.slug, e)}
              onBlur={() => setHovered(null)}
            >
              <span className="plist__type hide-mobile">{p.type}</span>
              <span className="plist__title">
                {p.title}
                {p.subtitle && <span className="plist__sub hide-mobile">{p.subtitle}</span>}
              </span>
              <span className="plist__year">{p.year}</span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Vignette au survol : toutes sont montées d'avance (masquées), pour
          qu'elles soient déjà téléchargées au moment du survol. */}
      <div className="plist__thumb hide-mobile" style={{ transform: `translateY(${thumbTop}px) translateY(-50%)` }} aria-hidden="true">
        {featured.map(
          p =>
            p.cover && (
              <div key={p.slug} className="plist__thumb-img" data-visible={hoveredProject?.slug === p.slug}>
                <Photo image={p.cover} fill sizes="240px" alt="" />
              </div>
            ),
        )}
      </div>

      {others.length > 0 && (
        <div className="plist__others">
          <p className="ed-caption">{othersTitle}</p>
          <ul>
            {others.map(p => (
              <li key={p.slug}>
                <Link href={`/projets/${p.slug}`}>
                  <span>
                    {p.title}
                    {p.subtitle && <span className="plist__sub hide-mobile">{p.subtitle}</span>}
                  </span>
                  <span className="plist__year">{p.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage({
  home,
  featured,
  others,
  othersTitle,
  upcoming,
}: {
  home: HomePageCms
  featured: Project[]
  others: Project[]
  othersTitle: string
  upcoming: AgendaEntry[]
}) {
  const showEncart = Boolean(home.imagesSectionKicker || home.imagesSectionBody)

  return (
    <main className="home">
      <Hero home={home} />

      <CinematicScroll slides={home.slides} />

      <section data-nav-theme="light" className="home-manifesto">
        {/* La phrase-manifeste, traitée comme un chapô de revue. */}
        <blockquote className="ed-display">
          {home.manifestoLine1}
          <br />
          <span className="accent">{home.manifestoAccent}</span>
        </blockquote>
        <Link href="/projets" className="ed-link">
          {home.manifestoCtaLabel}
        </Link>
      </section>

      <section data-nav-theme="light" className="home-section" aria-labelledby="s-compagnie">
        <div className="home-section__inner">
          <SectionLabel id="s-compagnie">{home.introKicker}</SectionLabel>
          <AnimatedText>
            <p className="ed-lead">{home.introParagraph1}</p>
          </AnimatedText>
          {home.introParagraph2 && (
            <AnimatedText delay={0.12}>
              <p className="ed-body" style={{ marginTop: '1.75rem' }}>
                {home.introParagraph2}
              </p>
            </AnimatedText>
          )}
          <Link href="/presentation" className="ed-link" style={{ marginTop: '2.75rem' }}>
            {home.introCtaLabel}
          </Link>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section data-nav-theme="light" className="home-section" aria-labelledby="s-dates">
          <div className="home-section__inner">
            <SectionLabel id="s-dates">{home.agendaTitle}</SectionLabel>
            <AgendaList entries={upcoming} showProject />
          </div>
        </section>
      )}

      {showEncart && (
        <section data-nav-theme="light" className="home-section" aria-labelledby="s-encart">
          <div className="home-section__inner">
            <SectionLabel id="s-encart">{home.imagesSectionKicker}</SectionLabel>
            {home.imagesSectionBody && <p className="ed-body">{home.imagesSectionBody}</p>}
            {home.imagesSectionCtaLabel && (
              <Link href="/presentation" className="ed-link" style={{ marginTop: '2.5rem' }}>
                {home.imagesSectionCtaLabel}
              </Link>
            )}
          </div>
        </section>
      )}

      <section data-nav-theme="light" className="home-section home-section--last" aria-labelledby="s-creations">
        <div className="home-section__inner home-section__inner--wide">
          <SectionLabel id="s-creations">{home.creationsKicker}</SectionLabel>
          <ProjectList featured={featured} others={others} othersTitle={othersTitle} />
          <div className="home-section__foot">
            <Link href="/projets" className="ed-link">
              {home.creationsFooterCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
