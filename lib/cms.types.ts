import type { PortableTextBlock } from '@portabletext/types'

export type NavLink = { label: string; href: string }

export type NavigationCms = {
  creationButtonLabel: string
  trembleGroupTitle: string
  trembleLinks: NavLink[]
  directLinks: NavLink[]
}

export type FooterCms = {
  brandLine: string
  brandAccent: string
  tagline: string
  navColumnTitle: string
  navLinks: NavLink[]
  followColumnTitle: string
  instagramLabel: string
  instagramUrl: string
  email: string
  asideTagline: string
  copyright: string
}

export type SiteSettingsCms = {
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}

export type HomeSlideCms = {
  url: string
  objectFit: 'cover' | 'contain'
  objectPosition: string
}

export type HomePageCms = {
  heroVideoUrl: string
  heroTitle: string
  heroLine1: string
  heroLine2: string
  slides: HomeSlideCms[]
  manifestoLine1: string
  manifestoAccent: string
  manifestoCtaLabel: string
  introKicker: string
  introParagraph1: string
  introParagraph2: string
  introCtaLabel: string
  imagesSectionKicker: string
  imagesSectionBody: string
  imagesSectionCtaLabel: string
  creationsKicker: string
  creationsFooterCtaLabel: string
}

export type PresentationDancerCms = {
  portraitUrl: string
  name: string
  role: string
  bio1: string
  bio2: string
  formationTitle: string
  formationText: string
}

export type PresentationPageCms = {
  kicker: string
  title: string
  intro: PortableTextBlock[]
  dancersSectionTitle: string
  dancers: PresentationDancerCms[]
  projectsCtaLabel: string
}

export type ContactPageCms = {
  kicker: string
  title: string
  emailLabel: string
  email: string
  locationLabel: string
  locationText: string
  backLinkLabel: string
}
