'use client'
import { useState } from 'react'
import Photo from '@/components/Photo'
import type { CmsImage } from '@/lib/image'

/** Adresse d'intégration sans cookie, ou null si le lien n'est pas reconnu. */
export function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1&dnt=1`
  return null
}

/**
 * Vidéo YouTube ou Vimeo chargée au clic seulement. Tant que le visiteur ne
 * la lance pas, aucune requête ne part vers ces services : pas de cookie,
 * pas de bandeau de consentement à prévoir, et une page plus légère.
 */
export default function VideoEmbed({ url, poster, title }: { url: string; poster: CmsImage | null; title: string }) {
  const [playing, setPlaying] = useState(false)
  const src = embedUrl(url)
  if (!src) return null

  return (
    <div className="video-embed">
      {playing ? (
        <iframe
          src={src}
          title={`Vidéo : ${title}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" className="video-embed__poster" onClick={() => setPlaying(true)}>
          {poster && <Photo image={poster} fill sizes="(max-width: 768px) 100vw, 70vw" alt="" />}
          <span className="video-embed__label">Lire la vidéo</span>
        </button>
      )}
    </div>
  )
}
