import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import PageTransition from '@/components/PageTransition'
import { SanityVisualEditing } from '@/components/SanityVisualEditing'
import { getFooterContent, getNavigation, getSiteSettings } from '@/lib/getCms'
import { jsonLd, organizationJsonLd } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    // Les pages fournissent leur titre seul (« Présentation ») ; le gabarit
    // ajoute le nom de la compagnie. L'accueil utilise le titre complet.
    title: { default: s.metaTitle, template: `%s | ${s.siteName}` },
    description: s.metaDescription,
    applicationName: s.siteName,
    alternates: { canonical: '/' },
    openGraph: {
      title: s.ogTitle || s.metaTitle,
      description: s.ogDescription || s.metaDescription,
      type: 'website',
      locale: 'fr_FR',
      siteName: s.siteName,
      ...(s.ogImage ? { images: [{ url: s.ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: 'summary_large_image' },
  }
}

/** Garde-fou : seules des URL du CDN Sanity entrent dans la feuille de style. */
const safeFontUrl = (u: string) => (/^https:\/\/cdn\.sanity\.io\/[\w\-./]+$/.test(u) ? u : '')

function themeCss(s: Awaited<ReturnType<typeof getSiteSettings>>): string {
  const url = safeFontUrl(s.customFontUrl)
  return [
    url ? `@font-face{font-family:'HorrmeCustom';src:url('${url}');font-weight:100 900;font-display:swap}` : '',
    // Les valeurs viennent d'une liste fermée (polices) ou sont validées par
    // expression régulière (couleur) : rien de libre n'atteint le CSS.
    `:root{--font-display:${s.fontDisplay};--font-text:${s.fontText};--blue:${s.accent}}`,
  ].join('')
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, navigation, footer, draft] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getFooterContent(),
    draftMode(),
  ])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeCss(settings) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd(settings, footer)) }}
      />
      {/* Premier élément focusable : atteindre le contenu sans traverser le menu. */}
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      {/* Une seule lumière de fond pour tout le site, fixe : elle remplace les
          taches bleues posées section par section. */}
      <div className="atmo" aria-hidden="true">
        <span />
        <span />
      </div>
      <ScrollAnimations />
      <Navbar navigation={navigation} siteName={settings.siteName} />
      <PageTransition>
        <div id="contenu">{children}</div>
      </PageTransition>
      <Footer data={footer} siteName={settings.siteName} />
      {draft.isEnabled ? <SanityVisualEditing /> : null}
    </>
  )
}
