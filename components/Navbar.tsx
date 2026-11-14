'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavigationCms } from '@/lib/cms.types'

const isCreationPath = (p: string) => p.startsWith('/creation') || p.startsWith('/projets')

export default function Navbar({ navigation, siteName }: { navigation: NavigationCms; siteName: string }) {
  const pathname = usePathname()
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark')
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const links = [
    { href: '/projets', label: navigation.creationButtonLabel, active: isCreationPath(pathname) },
    { href: '/presentation', label: navigation.presentationLabel, active: pathname === '/presentation' },
    { href: '/contact', label: navigation.contactLabel, active: pathname === '/contact' },
  ]

  // Thème du menu (texte blanc sur la vidéo, noir ailleurs) et masquage au
  // défilement. Un seul écouteur, limité à une mesure par image affichée :
  // l'ancienne version relançait la mesure à chaque événement de défilement,
  // plus quatre minuteries de rattrapage.
  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY

    const measure = () => {
      frame = 0
      const nav = navRef.current
      if (!nav) return
      const probe = nav.getBoundingClientRect().bottom - 10
      let theme: 'light' | 'dark' = 'light'
      document.querySelectorAll<HTMLElement>('[data-nav-theme]').forEach(section => {
        const r = section.getBoundingClientRect()
        if (r.top <= probe && r.bottom >= probe) theme = (section.dataset.navTheme as 'light' | 'dark') || 'light'
      })
      setNavTheme(theme)

      // La barre n'a pas de fond : quand du texte défile dessous, elle gêne la
      // lecture. Elle s'efface donc en descendant et revient dès qu'on remonte,
      // le geste naturel de quelqu'un qui cherche le menu.
      const y = window.scrollY
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.6)
        lastY = y
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [pathname])

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false)
    if (restoreFocus) burgerRef.current?.focus()
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setHidden(false)
  }, [pathname])

  // Menu ouvert : la page dessous ne défile plus, Échap ferme, le focus entre
  // dans le menu.
  useEffect(() => {
    if (!menuOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu(true)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, closeMenu])

  const isDark = navTheme === 'dark' && !menuOpen

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Navigation principale"
        className="site-nav"
        data-hidden={hidden && !menuOpen}
        style={{
          ['--nav-ink' as string]: isDark ? '#FFFFFF' : '#0A0A0A',
          ['--nav-ink-dim' as string]: isDark ? 'rgba(255,255,255,0.62)' : 'rgba(10,10,10,0.52)',
        }}
      >
        <Link href="/" className="site-nav__logo" aria-label={`${siteName}, accueil`}>
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className={isDark ? 'logo-white' : 'logo-dark'}
            priority
          />
        </Link>

        <ul className="nav-desktop">
          {links.map(({ href, label, active }) => (
            <li key={href}>
              <Link href={href} className="nav-link" aria-current={active ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          ref={burgerRef}
          type="button"
          className="nav-burger"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          data-open={menuOpen}
          style={{ ['--burger' as string]: isDark ? '#FFFFFF' : '#0A0A0A' }}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        id="menu-mobile"
        className="nav-mobile-overlay"
        data-open={menuOpen}
        // `inert` retire le menu fermé de la tabulation et des lecteurs d'écran.
        {...(!menuOpen ? { inert: '' as unknown as boolean } : {})}
      >
        <ul>
          {[{ href: '/', label: navigation.homeLabel, active: pathname === '/' }, ...links].map(
            ({ href, label, active }, i) => (
              <li key={href} style={{ ['--i' as string]: i }}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={href}
                  onClick={() => closeMenu()}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  )
}
