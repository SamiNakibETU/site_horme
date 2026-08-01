import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import PageTransition from '@/components/PageTransition'
import { SanityVisualEditing } from '@/components/SanityVisualEditing'
import { getFooterContent, getNavigation, getSiteSettings } from '@/lib/getCms'

/**
 * Layout du site public. Porte la navigation, le pied de page et les
 * animations. N'englobe PAS /studio, qui est hors de ce route group.
 */
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    openGraph: {
      title: s.ogTitle || s.metaTitle,
      description: s.ogDescription || s.metaDescription,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Cie. Horme',
      ...(s.ogImage ? { images: [{ url: s.ogImage }] } : {}),
    },
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [navigation, footer, draft] = await Promise.all([
    getNavigation(),
    getFooterContent(),
    draftMode(),
  ])

  return (
    <>
      {/* Premier élément focusable de la page : permet d'atteindre le contenu
          sans traverser toute la navigation à chaque changement de page. */}
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <ScrollAnimations />
      <Navbar navigation={navigation} />
      <PageTransition>
        <div id="contenu">{children}</div>
      </PageTransition>
      <Footer data={footer} />
      {draft.isEnabled ? <SanityVisualEditing /> : null}
    </>
  )
}
