'use client'
import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

/**
 * `next/image` avec squelette animé et fondu à l'arrivée.
 *
 * La page qui l'utilise (une fiche de création) est un composant serveur :
 * le suivi du chargement demande un état React, donc une frontière client
 * dédiée plutôt que de convertir toute la page.
 */
export default function RevealImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={loaded ? undefined : 'img-skeleton'}>
      <Image
        {...props}
        onLoad={e => {
          setLoaded(true)
          onLoad?.(e)
        }}
        className={[className, 'img-reveal', loaded && 'is-loaded'].filter(Boolean).join(' ')}
      />
    </div>
  )
}
