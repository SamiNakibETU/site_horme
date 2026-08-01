'use client'

import dynamic from 'next/dynamic'

/**
 * Frontière client du Studio.
 *
 * `ssr: false` n'est autorisé que depuis un composant client — d'où ce fichier
 * intermédiaire entre page.tsx (serveur, qui porte les metadata) et Studio.tsx
 * (le Studio lui-même).
 */
const Studio = dynamic(() => import('./Studio'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        font: '14px/1.4 system-ui, sans-serif',
        color: '#6b7280',
      }}
    >
      Chargement du CMS…
    </div>
  ),
})

export default function StudioLoader() {
  return <Studio />
}
