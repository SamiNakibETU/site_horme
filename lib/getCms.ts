import type { PortableTextBlock } from '@portabletext/types'
import {
  defaultContactPage,
  defaultFooter,
  defaultHomePage,
  defaultNavigation,
  defaultPresentationPage,
  defaultSiteSettings,
} from '@/lib/cms.defaults'
import type {
  ContactPageCms,
  FooterCms,
  HomePageCms,
  NavigationCms,
  PresentationPageCms,
  SiteSettingsCms,
} from '@/lib/cms.types'
import { sanityConfigured } from '@/lib/sanity.client'
import { sanityFetch } from '@/lib/sanity.fetch'
import { SANITY_SINGLETON_IDS } from '@/lib/sanity.ids'

const qSettings = `*[_id == $id][0]{
  metaTitle,
  metaDescription,
  ogTitle,
  ogDescription,
  "ogImage": coalesce(ogImage.asset->url, "")
}`

const qNav = `*[_id == $id][0]{
  creationButtonLabel,
  trembleGroupTitle,
  trembleLinks[]{ label, href },
  directLinks[]{ label, href }
}`

const qFooter = `*[_id == $id][0]{
  brandLine,
  brandAccent,
  tagline,
  navColumnTitle,
  navLinks[]{ label, href },
  followColumnTitle,
  instagramLabel,
  instagramUrl,
  email,
  asideTagline,
  copyright
}`

const qHome = `*[_id == $id][0]{
  "heroVideoUrl": coalesce(heroVideo.asset->url, ""),
  heroTitle,
  heroLine1,
  heroLine2,
  slides[]{
    "url": image.asset->url,
    objectFit,
    objectPosition
  },
  manifestoLine1,
  manifestoAccent,
  manifestoCtaLabel,
  introKicker,
  introParagraph1,
  introParagraph2,
  introCtaLabel,
  imagesSectionKicker,
  imagesSectionBody,
  imagesSectionCtaLabel,
  creationsKicker,
  creationsFooterCtaLabel
}`

const qPresentation = `*[_id == $id][0]{
  kicker,
  title,
  intro,
  dancersSectionTitle,
  dancers[]{
    "portraitUrl": portrait.asset->url,
    name,
    role,
    bio1,
    bio2,
    formationTitle,
    formationText
  },
  projectsCtaLabel
}`

const qContact = `*[_id == $id][0]{
  kicker,
  title,
  emailLabel,
  email,
  locationLabel,
  locationText,
  backLinkLabel
}`

function mergeHome(row: Record<string, unknown> | null): HomePageCms {
  const d = defaultHomePage
  if (!row) return d
  const rawSlides = (row.slides as HomePageCms['slides'] | undefined)?.filter(s => s?.url) ?? []
  const slides = rawSlides.map(s => ({
    url: s.url,
    objectFit: s.objectFit === 'contain' ? 'contain' as const : 'cover' as const,
    objectPosition: s.objectPosition || 'center',
  }))
  return {
    heroVideoUrl: (row.heroVideoUrl as string) || d.heroVideoUrl,
    heroTitle: (row.heroTitle as string) || d.heroTitle,
    heroLine1: (row.heroLine1 as string) || d.heroLine1,
    heroLine2: (row.heroLine2 as string) || d.heroLine2,
    slides: slides.length ? slides : d.slides,
    manifestoLine1: (row.manifestoLine1 as string) || d.manifestoLine1,
    manifestoAccent: (row.manifestoAccent as string) || d.manifestoAccent,
    manifestoCtaLabel: (row.manifestoCtaLabel as string) || d.manifestoCtaLabel,
    introKicker: (row.introKicker as string) || d.introKicker,
    introParagraph1: (row.introParagraph1 as string) || d.introParagraph1,
    introParagraph2: (row.introParagraph2 as string) || d.introParagraph2,
    introCtaLabel: (row.introCtaLabel as string) || d.introCtaLabel,
    imagesSectionKicker: (row.imagesSectionKicker as string) || d.imagesSectionKicker,
    imagesSectionBody: (row.imagesSectionBody as string) || d.imagesSectionBody,
    imagesSectionCtaLabel: (row.imagesSectionCtaLabel as string) || d.imagesSectionCtaLabel,
    creationsKicker: (row.creationsKicker as string) || d.creationsKicker,
    creationsFooterCtaLabel: (row.creationsFooterCtaLabel as string) || d.creationsFooterCtaLabel,
  }
}

function mergePresentation(row: Record<string, unknown> | null): PresentationPageCms {
  const d = defaultPresentationPage
  if (!row) return d
  const dancers = (row.dancers as PresentationPageCms['dancers'] | undefined)?.filter(x => x?.portraitUrl) ?? []
  const intro = (row.intro as PortableTextBlock[] | undefined) ?? []
  return {
    kicker: (row.kicker as string) || d.kicker,
    title: (row.title as string) || d.title,
    intro: Array.isArray(intro) ? intro : [],
    dancersSectionTitle: (row.dancersSectionTitle as string) || d.dancersSectionTitle,
    dancers: dancers.length ? dancers : d.dancers,
    projectsCtaLabel: (row.projectsCtaLabel as string) || d.projectsCtaLabel,
  }
}

export async function getSiteSettings(): Promise<SiteSettingsCms> {
  if (!sanityConfigured) return defaultSiteSettings
  try {
    const row = await sanityFetch<Record<string, unknown> | null>(qSettings, {
      id: SANITY_SINGLETON_IDS.siteSettings,
    })
    if (!row?.metaTitle) return defaultSiteSettings
    return {
      metaTitle: (row.metaTitle as string) || defaultSiteSettings.metaTitle,
      metaDescription: (row.metaDescription as string) || defaultSiteSettings.metaDescription,
      ogTitle: (row.ogTitle as string) || (row.metaTitle as string) || defaultSiteSettings.ogTitle,
      ogDescription:
        (row.ogDescription as string) || (row.metaDescription as string) || defaultSiteSettings.ogDescription,
      ogImage: (row.ogImage as string) || defaultSiteSettings.ogImage,
    }
  } catch {
    return defaultSiteSettings
  }
}

export async function getNavigation(): Promise<NavigationCms> {
  if (!sanityConfigured) return defaultNavigation
  try {
    const row = await sanityFetch<Record<string, unknown> | null>(qNav, {
      id: SANITY_SINGLETON_IDS.navigation,
    })
    if (!row) return defaultNavigation
    const tremble = ((row.trembleLinks as NavigationCms['trembleLinks']) || []).filter(l => l?.href && l?.label)
    const direct = ((row.directLinks as NavigationCms['directLinks']) || []).filter(l => l?.href && l?.label)
    if (!tremble.length && !direct.length) return defaultNavigation
    return {
      creationButtonLabel: (row.creationButtonLabel as string) || defaultNavigation.creationButtonLabel,
      trembleGroupTitle: (row.trembleGroupTitle as string) || defaultNavigation.trembleGroupTitle,
      trembleLinks: tremble.length ? tremble : defaultNavigation.trembleLinks,
      directLinks: direct.length ? direct : defaultNavigation.directLinks,
    }
  } catch {
    return defaultNavigation
  }
}

export async function getFooterContent(): Promise<FooterCms> {
  if (!sanityConfigured) return defaultFooter
  try {
    const row = await sanityFetch<Record<string, unknown> | null>(qFooter, {
      id: SANITY_SINGLETON_IDS.footerContent,
    })
    if (!row) return defaultFooter
    return {
      brandLine: (row.brandLine as string) || defaultFooter.brandLine,
      brandAccent: (row.brandAccent as string) || defaultFooter.brandAccent,
      tagline: (row.tagline as string) || defaultFooter.tagline,
      navColumnTitle: (row.navColumnTitle as string) || defaultFooter.navColumnTitle,
      navLinks: (() => {
        const n = ((row.navLinks as FooterCms['navLinks']) || []).filter(l => l?.href && l?.label)
        return n.length ? n : defaultFooter.navLinks
      })(),
      followColumnTitle: (row.followColumnTitle as string) || defaultFooter.followColumnTitle,
      instagramLabel: (row.instagramLabel as string) || defaultFooter.instagramLabel,
      instagramUrl: (row.instagramUrl as string) || defaultFooter.instagramUrl,
      email: (row.email as string) || defaultFooter.email,
      asideTagline: (row.asideTagline as string) || defaultFooter.asideTagline,
      copyright: (row.copyright as string) || defaultFooter.copyright,
    }
  } catch {
    return defaultFooter
  }
}

export async function getHomePage(): Promise<HomePageCms> {
  if (!sanityConfigured) return defaultHomePage
  try {
    const row = await sanityFetch<Record<string, unknown> | null>(qHome, {
      id: SANITY_SINGLETON_IDS.homePage,
    })
    return mergeHome(row)
  } catch {
    return defaultHomePage
  }
}

export async function getPresentationPage(): Promise<PresentationPageCms> {
  if (!sanityConfigured) return defaultPresentationPage
  try {
    const row = await sanityFetch<Record<string, unknown> | null>(qPresentation, {
      id: SANITY_SINGLETON_IDS.presentationPage,
    })
    return mergePresentation(row)
  } catch {
    return defaultPresentationPage
  }
}

export async function getContactPage(): Promise<ContactPageCms> {
  if (!sanityConfigured) return defaultContactPage
  try {
    const row = await sanityFetch<Record<string, unknown> | null>(qContact, {
      id: SANITY_SINGLETON_IDS.contactPage,
    })
    if (!row?.title) return defaultContactPage
    const d = defaultContactPage
    return {
      kicker: (row.kicker as string) || d.kicker,
      title: (row.title as string) || d.title,
      emailLabel: (row.emailLabel as string) || d.emailLabel,
      email: (row.email as string) || d.email,
      locationLabel: (row.locationLabel as string) || d.locationLabel,
      locationText: (row.locationText as string) || d.locationText,
      backLinkLabel: (row.backLinkLabel as string) || d.backLinkLabel,
    }
  } catch {
    return defaultContactPage
  }
}
