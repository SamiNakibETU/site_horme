'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Sans cette classe, le CSS laisse tout visible. On ne la pose donc que si
    // l'on va réellement animer : si le script échoue avant, ou si la personne
    // demande moins de mouvement, le contenu reste lisible.
    if (prefersReducedMotion) return

    const root = document.documentElement
    root.classList.add('js-ready')

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach(el => {
        // fromTo plutôt que to : le CSS pose déjà l'état initial pour éviter le
        // flash, mais déclarer les deux bornes explicitement évite de dépendre
        // de la façon dont GSAP interprète la transform calculée.
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: (Number(el.dataset.delay) || 0) * 0.1,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })
    })

    return () => {
      ctx.revert()
      root.classList.remove('js-ready')
    }
  }, [])

  return null
}
