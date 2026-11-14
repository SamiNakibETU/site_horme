import type { PortableTextBlock } from '@portabletext/types'
import type { CmsImage } from '@/lib/image'

export type NavLink = { label: string; href: string }

export type NavigationCms = {
  creationButtonLabel: string
  presentationLabel: string
  contactLabel: string
  homeLabel: string
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
  siteName: string
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  /** Valeurs CSS prêtes à l'emploi. */
  fontDisplay: string
  fontText: string
  customFontUrl: string
  customFontBoldUrl: string
  accent: string
}

export type HomeSlideCms = {
  image: CmsImage
  objectFit: 'cover' | 'contain'
}

export type HomePageCms = {
  heroVideoUrl: string
  heroPoster: CmsImage | null
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
  agendaTitle: string
  creationsKicker: string
  creationsFooterCtaLabel: string
}

export type PresentationDancerCms = {
  portrait: CmsImage | null
  name: string
  role: string
  bio1: string
  bio2: string
  formationTitle: string
  formationText: string
}

export type PartnerCms = { name: string; role?: string; url?: string; logo: CmsImage | null }

export type PresentationPageCms = {
  kicker: string
  title: string
  intro: PortableTextBlock[]
  dancersSectionTitle: string
  dancers: PresentationDancerCms[]
  partnersTitle: string
  partners: PartnerCms[]
  projectsCtaLabel: string
}

export type ContactPersonCms = { role: string; name?: string; email?: string; phone?: string }

export type ContactPageCms = {
  kicker: string
  title: string
  emailLabel: string
  email: string
  contacts: ContactPersonCms[]
  locationLabel: string
  locationText: string
  pressKitUrl: string
  pressKitLabel: string
  backLinkLabel: string
}

export type ProjectsPageCms = {
  featuredSlugs: string[]
  othersTitle: string
  openLabel: string
  seoDescription: string
}

export type LegalPageCms = {
  publisher: string
  director: string
  contactEmail: string
  body: PortableTextBlock[]
}

export type Performance = {
  date: string
  time?: string
  venue: string
  city?: string
  note?: string
  ticketUrl?: string
}

export type Project = {
  slug: string
  title: string
  subtitle?: string
  type: string
  year: number
  location?: string
  photographer: string[]
  description?: string
  body: PortableTextBlock[]
  cover: CmsImage | null
  /** Galerie, dans l'ordre du CMS, avec descriptions et crédits. */
  images: (CmsImage & { credit?: string })[]
  videoUrl?: string
  videoFile?: string
  performances: Performance[]
  credits: { role: string; names: string }[]
  links: { label: string; url: string }[]
  dossierUrl?: string
  updatedAt?: string
}

/** Une date à venir, avec la création à laquelle elle appartient. */
export type AgendaEntry = Performance & { projectSlug: string; projectTitle: string }
