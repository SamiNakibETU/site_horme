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
  const counterRef = useRef<HTMLSpanElement>(null)

  // Défilement vertical -> glissement horizontal, sans aucun état React :
  // tout s'écrit directement dans le DOM, une fois par image affichée.
  // - La distance est mesurée en pixels réels (largeur de la bande moins
  //   l'écran). L'ancien calcul en vw supposait des photos de 55vw alors
  //   qu'elles plafonnent à 560 px : la bande filait trop loin et finissait
  //   sur un vide.
  // - Un amorti (on parcourt 14 % de l'écart restant à chaque image) lisse
  //   les crans de la molette, qui sautent de 100 px d'un coup.
  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return
    const items = Array.from(track.children) as HTMLElement[]
    const ease = prefersReducedMotion() ? 1 : 0.14
    let distance = 0
    let target = 0
    let current = 0
    let frame = 0
    let active = -1

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth)
    }
    const readTarget = () => {
      const scrollable = outer.offsetHeight - window.innerHeight
      target = scrollable > 0 ? Math.max(0, Math.min(1, -outer.getBoundingClientRect().top / scrollable)) : 0
    }
    const render = () => {
      current += (target - current) * ease
      if (Math.abs(target - current) < 0.0005) current = target
      track.style.transform = `translate3d(${(-current * distance).toFixed(2)}px,0,0)`
      const idx = Math.min(slides.length - 1, Math.round(current * (slides.length - 1)))
      if (idx !== active) {
        if (active >= 0) items[active]?.removeAttribute('data-active')
        items[idx]?.setAttribute('data-active', 'true')
        active = idx
        if (counterRef.current) counterRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`
      }
      frame = current === target ? 0 : requestAnimationFrame(render)
    }
    const kick = () => {
      readTarget()
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onResize = () => {
      measure()
      kick()
    }

    measure()
    readTarget()
    current = target
    render()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', onResize)
    // Les photos changent la largeur de la bande en se chargeant.
    const ro = new ResizeObserver(onResize)
    ro.observe(track)
    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [slides.length])

  if (!slides.length) return null

  return (
    <>
      {/* Téléphone : défilement horizontal natif, au doigt. */}
      <div className="cine-mobile-wrap" data-nav-theme="light">
        <div className="cine-mobile-track" tabIndex={0} aria-label="Photos de la compagnie">
          {slides.map((s, i) => (
            <div key={i} className="cine-mobile-item" data-fit={s.objectFit}>
              <Photo image={s.image} fill fit={s.objectFit} sizes="80vw" priority={i < 2} />
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
        style={{ height: `${Math.max(2, slides.length) * 55}vh` }}
      >
        <div className="cine-sticky">
          <div ref={trackRef} className="cine-track">
            {slides.map((s, i) => (
              <div key={i} className="cine-item" data-fit={s.objectFit}>
                <Photo image={s.image} fill fit={s.objectFit} sizes="(max-width: 1200px) 45vw, 560px" priority={i < 2} />
              </div>
            ))}
          </div>
          <span ref={counterRef} className="cine-counter" aria-hidden="true">
            01 / {String(slides.length).padStart(2, '0')}
          </span>
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
