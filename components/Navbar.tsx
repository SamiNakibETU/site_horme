'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavigationCms } from '@/lib/cms.types'

function isCreationPath(pathname: string) {
  return pathname.startsWith('/creation') || pathname.startsWith('/projets')
}

export default function Navbar({ navigation }: { navigation: NavigationCms }) {
  const pathname = usePathname()
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      if (!navRef.current) return
      const navBottom = navRef.current.getBoundingClientRect().bottom
      const midY = navBottom - 10

      const sections = document.querySelectorAll('[data-nav-theme]')
      let currentTheme: 'light' | 'dark' = 'light'

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= midY && rect.bottom >= midY) {
          currentTheme = (section.getAttribute('data-nav-theme') as 'light' | 'dark') || 'light'
        }
      })
      setNavTheme(currentTheme)

      // La barre est fixe et sans fond : au-delà du héro, le contenu de la page
      // défile dessous et les textes se superposent aux liens. On fait donc
      // apparaître un voile dès qu'on quitte le haut de page — et seulement là,
      // pour que le héro reste plein cadre.
      setScrolled(window.scrollY > 24)
    }

    window.addEventListener('scroll', updateTheme, { passive: true })
    const timers = [50, 200, 500, 1000].map(ms => setTimeout(updateTheme, ms))
    return () => {
      window.removeEventListener('scroll', updateTheme)
      timers.forEach(clearTimeout)
    }
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isDark = navTheme === 'dark' && !menuOpen
  const textColor = isDark ? '#FFFFFF' : '#0A0A0A'
  const textColorDim = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(10,10,10,0.4)'
  const burgerColor = isDark ? '#FFFFFF' : '#0A0A0A'

  const creationActive = isCreationPath(pathname)

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem var(--gutter)',
          // Les liens lisent ces deux variables. Le thème change donc en CSS,
          // sans qu'aucun style inline ne vienne figer une couleur périmée.
          ['--nav-ink' as string]: textColor,
          ['--nav-ink-dim' as string]: textColorDim,
          // Voile translucide accordé au thème de la section survolée. Absent en
          // haut de page pour laisser la vidéo du héro occuper tout le cadre.
          background: scrolled
            ? isDark
              ? 'rgba(10,10,10,0.55)'
              : 'rgba(255,255,255,0.72)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          borderBottom: `1px solid ${
            scrolled
              ? isDark
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(10,10,10,0.06)'
              : 'transparent'
          }`,
          // Propriétés listées explicitement plutôt que `all` : `all` anime
          // aussi la couleur du texte et le filtre, ce qui saccade au défilement.
          transition:
            'background 400ms var(--ease-out), backdrop-filter 400ms var(--ease-out), border-color 400ms var(--ease-out)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            zIndex: 51,
          }}
        >
          <Image
            src="/logo.png"
            alt="Cie. Horme"
            width={44}
            height={44}
            className={isDark ? 'logo-white' : 'logo-dark'}
            style={{
              objectFit: 'contain',
              transition: 'filter 0.3s ease',
            }}
            priority
          />
        </Link>

        {/* Plus de menu déroulant : « Création » mène directement à la page des
            créations, où les projets sont présentés en pleine page. Un menu qui
            s'ouvre pour révéler trois liens ajoute une étape sans rien apporter
            que la page de destination ne montre déjà mieux. */}
        <ul className="nav-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          listStyle: 'none',
        }}>
          {[
            { href: '/projets', label: navigation.creationButtonLabel, active: creationActive },
            { href: '/presentation', label: 'Présentation', active: pathname === '/presentation' },
            { href: '/contact', label: 'Contact', active: pathname === '/contact' },
          ].map(({ href, label, active }) => (
            <li key={href}>
              <Link
                href={href}
                className="nav-link"
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '24px',
            height: '18px',
            position: 'relative',
            zIndex: 51,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span style={{
            display: 'block',
            width: '100%',
            height: '1.5px',
            background: burgerColor,
            transition: 'all 0.3s ease',
            position: 'absolute',
            top: menuOpen ? '8px' : '0',
            transform: menuOpen ? 'rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block',
            width: '100%',
            height: '1.5px',
            background: burgerColor,
            transition: 'all 0.3s ease',
            position: 'absolute',
            top: '8px',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block',
            width: '100%',
            height: '1.5px',
            background: burgerColor,
            transition: 'all 0.3s ease',
            position: 'absolute',
            bottom: menuOpen ? '8px' : '0',
            transform: menuOpen ? 'rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      <div
        className="nav-mobile-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 49,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
          overflowY: 'auto',
          padding: '5rem 1.5rem 2rem',
        }}
      >
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              fontFamily: 'Ribes, Georgia, serif',
              fontWeight: 300,
              fontSize: '1.5rem',
              color: pathname === '/' ? 'var(--blue)' : 'var(--black)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
            }}
          >
            Index
          </Link>

          {/* Même logique qu'en desktop : un lien, pas un accordéon. */}
          <Link
            href="/projets"
            onClick={() => setMenuOpen(false)}
            aria-current={creationActive ? 'page' : undefined}
            style={{
              display: 'block',
              fontFamily: 'Ribes, Georgia, serif',
              fontWeight: 300,
              fontSize: '1.5rem',
              color: creationActive ? 'var(--blue)' : 'var(--black)',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              marginBottom: '1.5rem',
            }}
          >
            {navigation.creationButtonLabel}
          </Link>

          {[
            { href: '/presentation', label: 'Présentation' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Ribes, Georgia, serif',
                fontWeight: 300,
                fontSize: '1.5rem',
                color: pathname === href ? 'var(--blue)' : 'var(--black)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                marginBottom: '1.5rem',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
