'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Fondu court entre deux pages. Pas au premier chargement (l'accueil a sa
 * propre ouverture), et rien si le mouvement réduit est demandé.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.scrollTo(0, 0)
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.animate(
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    )
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
