import { cache } from 'react'
import type { PortableTextBlock } from '@portabletext/types'
import {
  defaultContactPage,
  defaultFooter,
  defaultHomePage,
  defaultLegalPage,
  defaultNavigation,
  defaultPresentationPage,
  defaultProjectsPage,
  defaultSiteSettings,
} from '@/lib/cms.defaults'
import type {
  ContactPageCms,
  FooterCms,
  HomePageCms,
  LegalPageCms,
  NavigationCms,
  PresentationPageCms,
  ProjectsPageCms,
  SiteSettingsCms,
} from '@/lib/cms.types'
import { fontStack } from '@/lib/fonts'
import { IMAGE, toCmsImage, type RawImage } from '@/lib/image'
import { sanityConfigured } from '@/lib/sanity.client'
import { sanityFetch } from '@/lib/sanity.fetch'
import { SANITY_SINGLETON_IDS as IDS } from '@/lib/sanity.ids'

type Row = Record<string, unknown> | null

/** Texte saisi, ou valeur par défaut si le champ est vide. */
const str = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

async function fetchRow(query: string, id: string): Promise<Row> {
  if (!sanityConfigured) return null
  try {
    return await sanityFetch<Row>(query, { id })
  } catch {
    // Le site ne doit jamais tomber parce que Sanity ne répond pas : les
    // valeurs par défaut prennent le relais.
    return null
  }
}

// ─── Réglages ────────────────────────────────────────────────────────────────

const qSettings = `*[_id == $id][0]{
  siteName, metaTitle, metaDescription, ogTitle, ogDescription,
  "ogImage": ogImage${IMAGE},
  fontDisplay, fontText, accentColor, accentCustom,
  "customFontUrl": customFont.asset->url,
  "customFontBoldUrl": customFontBold.asset->url
}`

/**
 * `cache` : le layout, les métadonnées et chaque page lisent ces réglages ; une
 * seule requête par rendu suffit.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettingsCms> => {
  const row = await fetchRow(qSettings, IDS.siteSettings)
  const d = defaultSiteSettings
  if (!row) return d
  const customFontUrl = str(row.customFontUrl, '')
  const accentRaw = row.accentColor === 'custom' ? row.accentCustom : row.accentColor
  const accent = typeof accentRaw === 'string' && /^#[0-9a-fA-F]{6}$/.test(accentRaw) ? accentRaw : d.accent
  const og = toCmsImage(row.ogImage as RawImage, 1200)
  return {
    siteName: str(row.siteName, d.siteName),
    metaTitle: str(row.metaTitle, d.metaTitle),
    metaDescription: str(row.metaDescription, d.metaDescription),
    ogTitle: str(row.ogTitle, ''),
    ogDescription: str(row.ogDescription, ''),
    ogImage: og?.url ?? '',
    fontDisplay: fontStack(row.fontDisplay, Boolean(customFontUrl)),
    fontText: fontStack(row.fontText, Boolean(customFontUrl)),
    customFontUrl,
    customFontBoldUrl: str(row.customFontBoldUrl, ''),
    accent,
  }
})

const qNav = `*[_id == $id][0]{ creationButtonLabel, presentationLabel, contactLabel, homeLabel }`

export async function getNavigation(): Promise<NavigationCms> {
  const row = await fetchRow(qNav, IDS.navigation)
  const d = defaultNavigation
  if (!row) return d
  return {
    // L'ancien libellé par défaut était « Création » au singulier : on le
    // garde s'il a été saisi, il reste modifiable.
    creationButtonLabel: str(row.creationButtonLabel, d.creationButtonLabel),
    presentationLabel: str(row.presentationLabel, d.presentationLabel),
    contactLabel: str(row.contactLabel, d.contactLabel),
    homeLabel: str(row.homeLabel, d.homeLabel),
  }
}

const qFooter = `*[_id == $id][0]{
  brandLine, brandAccent, tagline, navColumnTitle, navLinks[]{ label, href },
  followColumnTitle, instagramLabel, instagramUrl, email, asideTagline, copyright
}`

export async function getFooterContent(): Promise<FooterCms> {
  const row = await fetchRow(qFooter, IDS.footerContent)
  const d = defaultFooter
  if (!row) return d
  const links = arr<{ label?: string; href?: string }>(row.navLinks).filter(l => l?.href && l?.label) as FooterCms['navLinks']
  return {
    brandLine: str(row.brandLine, d.brandLine),
    brandAccent: str(row.brandAccent, d.brandAccent),
    tagline: str(row.tagline, d.tagline),
    navColumnTitle: str(row.navColumnTitle, d.navColumnTitle),
    navLinks: links.length ? links : d.navLinks,
    followColumnTitle: str(row.followColumnTitle, d.followColumnTitle),
    instagramLabel: str(row.instagramLabel, d.instagramLabel),
    instagramUrl: str(row.instagramUrl, d.instagramUrl),
    email: str(row.email, d.email),
    asideTagline: str(row.asideTagline, d.asideTagline),
    copyright: str(row.copyright, ''),
  }
}

// ─── Pages ───────────────────────────────────────────────────────────────────

const qHome = `*[_id == $id][0]{
  "heroVideoUrl": heroVideo.asset->url,
  "heroPoster": heroPoster${IMAGE},
  heroTitle, heroLine1, heroLine2,
  slides[]{ "image": image${IMAGE}, alt, objectFit, objectPosition },
  manifestoLine1, manifestoAccent, manifestoCtaLabel,
  introKicker, introParagraph1, introParagraph2, introCtaLabel,
  imagesSectionKicker, imagesSectionBody, imagesSectionCtaLabel,
  agendaTitle, creationsKicker, creationsFooterCtaLabel
}`

type RawSlide = { image?: RawImage; alt?: string; objectFit?: string; objectPosition?: string }

/** Ancien champ texte de cadrage (« center top »), repris si aucun hotspot n'est posé. */
function legacyPosition(v: string | undefined): string | undefined {
  if (!v) return undefined
  return v.replace(/\bcenter\b/g, '50%').replace(/\btop\b/g, '0%').replace(/\bbottom\b/g, '100%')
}

export async function getHomePage(): Promise<HomePageCms> {
  const row = await fetchRow(qHome, IDS.homePage)
  const d = defaultHomePage
  if (!row) return d
  const slides = arr<RawSlide>(row.slides)
    .map(s => {
      const image = toCmsImage(s.image, 1920, s.alt)
      if (!image) return null
      if (!s.image?.hotspot) image.position = legacyPosition(s.objectPosition) ?? image.position
      return { image, objectFit: s.objectFit === 'contain' ? ('contain' as const) : ('cover' as const) }
    })
    .filter(Boolean) as HomePageCms['slides']

  // L'encart 5 se masque si ses trois champs sont vides dans le CMS ; il ne
  // reprend les valeurs par défaut que si le document n'a jamais été rempli.
  const encartTouched = ['imagesSectionKicker', 'imagesSectionBody', 'imagesSectionCtaLabel'].some(k => k in row && row[k] != null)

  return {
    heroVideoUrl: str(row.heroVideoUrl, d.heroVideoUrl),
    heroPoster: toCmsImage(row.heroPoster as RawImage, 1920) ?? d.heroPoster,
    heroTitle: str(row.heroTitle, d.heroTitle),
    heroLine1: str(row.heroLine1, d.heroLine1),
    heroLine2: str(row.heroLine2, ''),
    slides: slides.length ? slides : d.slides,
    manifestoLine1: str(row.manifestoLine1, d.manifestoLine1),
    manifestoAccent: str(row.manifestoAccent, d.manifestoAccent),
    manifestoCtaLabel: str(row.manifestoCtaLabel, d.manifestoCtaLabel),
    introKicker: str(row.introKicker, d.introKicker),
    introParagraph1: str(row.introParagraph1, d.introParagraph1),
    introParagraph2: str(row.introParagraph2, ''),
    introCtaLabel: str(row.introCtaLabel, d.introCtaLabel),
    imagesSectionKicker: encartTouched ? str(row.imagesSectionKicker, '') : d.imagesSectionKicker,
    imagesSectionBody: encartTouched ? str(row.imagesSectionBody, '') : d.imagesSectionBody,
    imagesSectionCtaLabel: encartTouched ? str(row.imagesSectionCtaLabel, '') : d.imagesSectionCtaLabel,
    agendaTitle: str(row.agendaTitle, d.agendaTitle),
    creationsKicker: str(row.creationsKicker, d.creationsKicker),
    creationsFooterCtaLabel: str(row.creationsFooterCtaLabel, d.creationsFooterCtaLabel),
  }
}

const qProjectsPage = `*[_id == $id][0]{
  "featuredSlugs": featured[]->slug.current,
  othersTitle, openLabel, seoDescription
}`

export const getProjectsPage = cache(async (): Promise<ProjectsPageCms> => {
  const row = await fetchRow(qProjectsPage, IDS.projectsPage)
  const d = defaultProjectsPage
  if (!row) return d
  return {
    featuredSlugs: arr<string>(row.featuredSlugs).filter(Boolean),
    othersTitle: str(row.othersTitle, d.othersTitle),
    openLabel: str(row.openLabel, d.openLabel),
    seoDescription: str(row.seoDescription, ''),
  }
})

const qPresentation = `*[_id == $id][0]{
  kicker, title, intro, dancersSectionTitle, projectsCtaLabel, partnersTitle,
  dancers[]{ "portrait": portrait${IMAGE}, name, role, bio1, bio2, formationTitle, formationText },
  partners[]{ name, role, url, "logo": logo${IMAGE} }
}`

type RawDancer = { portrait?: RawImage; name?: string; role?: string; bio1?: string; bio2?: string; formationTitle?: string; formationText?: string }
type RawPartner = { name?: string; role?: string; url?: string; logo?: RawImage }

export async function getPresentationPage(): Promise<PresentationPageCms> {
  const row = await fetchRow(qPresentation, IDS.presentationPage)
  const d = defaultPresentationPage
  if (!row) return d
  const dancers = arr<RawDancer>(row.dancers)
    .filter(x => x?.name)
    .map(x => ({
      portrait: toCmsImage(x.portrait, 1400, x.name),
      name: x.name || '',
      role: x.role || '',
      bio1: x.bio1 || '',
      bio2: x.bio2 || '',
      formationTitle: x.formationTitle || '',
      formationText: x.formationText || '',
    }))
  return {
    kicker: str(row.kicker, d.kicker),
    title: str(row.title, d.title),
    intro: arr<PortableTextBlock>(row.intro),
    dancersSectionTitle: str(row.dancersSectionTitle, d.dancersSectionTitle),
    dancers: dancers.length ? dancers : d.dancers,
    partnersTitle: str(row.partnersTitle, d.partnersTitle),
    partners: arr<RawPartner>(row.partners)
      .filter(p => p?.name)
      .map(p => ({ name: p.name!, role: p.role, url: p.url, logo: toCmsImage(p.logo, 400, p.name) })),
    projectsCtaLabel: str(row.projectsCtaLabel, d.projectsCtaLabel),
  }
}

const qContact = `*[_id == $id][0]{
  kicker, title, emailLabel, email, contacts[]{ role, name, email, phone },
  locationLabel, locationText, "pressKitUrl": pressKit.asset->url, pressKitLabel, backLinkLabel
}`

export async function getContactPage(): Promise<ContactPageCms> {
  const row = await fetchRow(qContact, IDS.contactPage)
  const d = defaultContactPage
  if (!row) return d
  return {
    kicker: str(row.kicker, d.kicker),
    title: str(row.title, d.title),
    emailLabel: str(row.emailLabel, d.emailLabel),
    email: str(row.email, d.email),
    contacts: arr<ContactPageCms['contacts'][number]>(row.contacts).filter(c => c?.role),
    locationLabel: str(row.locationLabel, d.locationLabel),
    locationText: str(row.locationText, d.locationText),
    pressKitUrl: str(row.pressKitUrl, ''),
    pressKitLabel: str(row.pressKitLabel, d.pressKitLabel),
    backLinkLabel: str(row.backLinkLabel, d.backLinkLabel),
  }
}

const qLegal = `*[_id == $id][0]{ publisher, director, contactEmail, body }`

export async function getLegalPage(): Promise<LegalPageCms> {
  const row = await fetchRow(qLegal, IDS.legalPage)
  const d = defaultLegalPage
  if (!row) return d
  return {
    publisher: str(row.publisher, ''),
    director: str(row.director, ''),
    contactEmail: str(row.contactEmail, ''),
    body: arr<PortableTextBlock>(row.body),
  }
}
