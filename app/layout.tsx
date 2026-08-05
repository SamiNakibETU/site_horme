import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

/**
 * Layout racine — volontairement minimal.
 *
 * Il s'applique à TOUTES les routes, y compris /studio (le CMS Sanity).
 * Le « chrome » du site (Navbar, Footer, transitions) ET la feuille de style
 * globale vivent donc dans app/(site)/layout.tsx : le Studio doit s'afficher
 * sur une page vierge, sans le reset Tailwind ni les polices du site, qui
 * casseraient son interface.
 */
export const metadata: Metadata = {
  title: 'Cie. Horme',
  // Sert de base aux URLs relatives (images Open Graph, canonical) émises
  // par les pages. Sans elle, Next.js les laisse relatives : invalides une
  // fois partagées hors du site (Instagram, WhatsApp, e-mail).
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
