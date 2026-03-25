'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavigationCms } from '@/lib/cms.types'

function isCreationPath(pathname: string) {
  return pathname.startsWith('/creation') || pathname.startsWith('/projets')
}

const linkStyle = (
  active: boolean,
  textColor: string,
  textColorDim: string,
) => ({
  fontFamily: 'Ribes, Georgia, serif',
  fontWeight: 400,
  fontSize: '0.68rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: active ? textColor : textColorDim,
  transition: 'color 0.3s ease',
  textDecoration: 'none',
})

export default function Navbar({ navigation }: { navigation: NavigationCms }) {
  const creationLinks = {
    tremble: navigation.trembleLinks,
    direct: navigation.directLinks,
  }
  const pathname = usePathname()
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [creationOpen, setCreationOpen] = useState(false)
  const [mobileCreationOpen, setMobileCreationOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    setCreationOpen(false)
    setMobileCreationOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!creationOpen) return
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCreationOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [creationOpen])

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
          transition: 'all 0.4s ease',
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

        <ul className="nav-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          listStyle: 'none',
        }}>
          <li style={{ position: 'relative' }}>
            <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
              type="button"
              aria-expanded={creationOpen}
              aria-haspopup="true"
              onClick={() => setCreationOpen(o => !o)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setCreationOpen(false)
              }}
              style={{
                ...linkStyle(creationActive, textColor, textColorDim),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {navigation.creationButtonLabel}
            </button>
            {creationOpen && (
              <div
                className="nav-creation-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.75rem',
                  minWidth: 'min(92vw, 320px)',
                  padding: '1.25rem 1.35rem',
                  background: 'rgba(255,255,255,0.98)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(10,10,10,0.06)',
                }}
              >
                <p style={{
                  fontFamily: 'Ribes, serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.35)',
                  marginBottom: '0.65rem',
                }}>
                  {navigation.trembleGroupTitle}
                </p>
                <ul style={{ listStyle: 'none', marginBottom: '1.1rem' }}>
                  {creationLinks.tremble.map(({ href, label }) => (
                    <li key={href} style={{ marginBottom: '0.45rem' }}>
                      <Link
                        href={href}
                        onClick={() => setCreationOpen(false)}
                        style={{
                          fontFamily: 'Ribes, serif',
                          fontWeight: 300,
                          fontSize: '0.82rem',
                          color: pathname === href ? 'var(--blue)' : 'var(--black)',
                          textDecoration: 'none',
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul style={{ listStyle: 'none', borderTop: '1px solid rgba(10,10,10,0.06)', paddingTop: '0.85rem' }}>
                  {creationLinks.direct.map(({ href, label }) => (
                    <li key={href} style={{ marginBottom: '0.45rem' }}>
                      <Link
                        href={href}
                        onClick={() => setCreationOpen(false)}
                        style={{
                          fontFamily: 'Ribes, serif',
                          fontWeight: 300,
                          fontSize: '0.82rem',
                          color: pathname === href ? 'var(--blue)' : 'var(--black)',
                          textDecoration: 'none',
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </li>
          {[
            { href: '/presentation', label: 'Présentation' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={linkStyle(pathname === href, textColor, textColorDim)}
                onMouseEnter={(e) => { e.currentTarget.style.color = textColor }}
                onMouseLeave={(e) => { e.currentTarget.style.color = pathname === href ? textColor : textColorDim }}
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

          <button
            type="button"
            aria-expanded={mobileCreationOpen}
            onClick={() => setMobileCreationOpen(v => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              background: 'none',
              border: 'none',
              fontFamily: 'Ribes, Georgia, serif',
              fontWeight: 300,
              fontSize: '1.5rem',
              color: creationActive ? 'var(--blue)' : 'var(--black)',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              marginBottom: mobileCreationOpen ? '0.75rem' : '1.5rem',
              padding: 0,
            }}
          >
            {navigation.creationButtonLabel}
            <span style={{ fontSize: '0.9rem', opacity: 0.45 }}>{mobileCreationOpen ? '−' : '+'}</span>
          </button>

          {mobileCreationOpen && (
            <div style={{ paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
              <p style={{
                fontFamily: 'Ribes, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.35)',
                marginBottom: '0.65rem',
              }}>
                {navigation.trembleGroupTitle}
              </p>
              {creationLinks.tremble.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'Ribes, serif',
                    fontWeight: 300,
                    fontSize: '1.05rem',
                    color: pathname === href ? 'var(--blue)' : 'rgba(10,10,10,0.75)',
                    textDecoration: 'none',
                    marginBottom: '0.65rem',
                  }}
                >
                  {label}
                </Link>
              ))}
              <div style={{ height: '1px', background: 'rgba(10,10,10,0.08)', margin: '0.85rem 0' }} />
              {creationLinks.direct.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'Ribes, serif',
                    fontWeight: 300,
                    fontSize: '1.05rem',
                    color: pathname === href ? 'var(--blue)' : 'rgba(10,10,10,0.75)',
                    textDecoration: 'none',
                    marginBottom: '0.65rem',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

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
