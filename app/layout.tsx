import type { Metadata, Viewport } from 'next'
import { fontVariableClasses } from '@/lib/fonts'
import { SITE_URL } from '@/lib/seo'

/**
 * Layout racine, volontairement minimal : il s'applique aussi à /studio.
 * Le chrome du site et sa feuille de style vivent dans app/(site)/layout.tsx.
 *
 * Les classes de police ne font que déclarer des variables CSS (--ff-*) ; le
 * Studio n'en télécharge aucune.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontVariableClasses}>
      <body>{children}</body>
    </html>
  )
}
