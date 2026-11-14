import { localImage } from '@/lib/image'
import type {
  ContactPageCms,
  LegalPageCms,
  ProjectsPageCms,
  FooterCms,
  HomePageCms,
  NavigationCms,
  PresentationPageCms,
  SiteSettingsCms,
} from '@/lib/cms.types'

export const defaultSiteSettings: SiteSettingsCms = {
  siteName: 'Compagnie Horrmê',
  metaTitle: 'Compagnie Horrmê, danse contemporaine',
  metaDescription:
    'Compagnie de danse contemporaine fondée par Louise Melli et Joséphine Hassid-Langlois, à Paris.',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  fontDisplay: "'Ribes', Georgia, serif",
  fontText: "'Ribes', Georgia, serif",
  customFontUrl: '',
  customFontBoldUrl: '',
  accent: '#1C4CF4',
}

export const defaultNavigation: NavigationCms = {
  creationButtonLabel: 'Créations',
  presentationLabel: 'Présentation',
  contactLabel: 'Contact',
  homeLabel: 'Accueil',
}

export const defaultProjectsPage: ProjectsPageCms = {
  featuredSlugs: [],
  othersTitle: 'Autres projets',
  openLabel: 'Voir la création',
  seoDescription: '',
}

export const defaultLegalPage: LegalPageCms = {
  publisher: '',
  director: '',
  contactEmail: '',
  body: [],
}

export const defaultFooter: FooterCms = {
  brandLine: 'Cie',
  brandAccent: 'Horrmê',
  tagline: 'Compagnie de danse contemporaine, Paris.',
  navColumnTitle: 'Navigation',
  navLinks: [
    { href: '/', label: 'Index' },
    { href: '/projets', label: 'Créations' },
    { href: '/presentation', label: 'Présentation' },
    { href: '/contact', label: 'Contact' },
  ],
  followColumnTitle: 'Suivre',
  instagramLabel: 'Instagram',
  instagramUrl: 'https://www.instagram.com/cie.horrme/',
  email: 'compagniehorrme@gmail.com',
  asideTagline: 'Le corps comme langage premier.',
  copyright: '',
}

export const defaultHomePage: HomePageCms = {
  heroVideoUrl: '/assets/videos/hero.mp4',
  heroPoster: localImage('/assets/images/hero-poster.jpg', 1920, 1080),
  heroTitle: 'Compagnie Horrmê',
  heroLine1: 'Louise Melli et Joséphine Hassid-Langlois',
  heroLine2: 'écriture chorégraphique, Paris.',
  slides: [
    { image: localImage('/assets/images/khormos/arthur-01.jpg', 1600, 1067, 'Khormo(s) — les danseuses en mouvement sur scène', '50% 20%'), objectFit: 'cover' },
    { image: localImage('/assets/images/scene-ecriture/01.png', 1600, 1067, 'Scène à l’écriture — répétition en atelier', '50% 50%'), objectFit: 'contain' },
    { image: localImage('/assets/images/jardiniers/01.jpg', 1600, 1067, 'Les Jardiniers — performance en extérieur à Montrouge', '50% 50%'), objectFit: 'cover' },
    { image: localImage('/assets/images/khormos/arthur-02.jpg', 1600, 1067, 'Khormo(s) — portée collective sous les projecteurs', '50% 50%'), objectFit: 'cover' },
    { image: localImage('/assets/images/scene-ecriture/03.png', 1600, 1067, 'Scène à l’écriture — travail au sol', '50% 50%'), objectFit: 'contain' },
    { image: localImage('/assets/images/khormos/yse-02.jpg', 1600, 1067, 'Khormo(s) — le groupe en formation rapprochée', '50% 0%'), objectFit: 'cover' },
  ],
  manifestoLine1: 'Le corps comme',
  manifestoAccent: 'langage premier.',
  manifestoCtaLabel: 'Voir les créations →',
  introKicker: 'La compagnie',
  introParagraph1:
    "Louise Melli et Joséphine Hassid-Langlois portent une compagnie ancrée dans l'écriture chorégraphique contemporaine. La danse comme langage premier, leur pratique traverse les territoires du corps en mouvement, explore les frontières entre écriture et improvisation, mémoire et instant présent.",
  introParagraph2: 'Chaque projet est une recherche sensible, un dialogue entre espace et temps.',
  introCtaLabel: 'Découvrir la compagnie →',
  imagesSectionKicker: 'La compagnie en images',
  imagesSectionBody: 'Portraits et regards : retrouvez la compagnie sur la page Présentation.',
  imagesSectionCtaLabel: 'Présentation →',
  agendaTitle: 'Prochaines dates',
  creationsKicker: 'Créations',
  creationsFooterCtaLabel: 'Toutes les créations →',
}

export const defaultPresentationIntroFallback = {
  p1:
    "Louise Melli et Joséphine Hassid-Langlois portent une compagnie ancrée dans l'écriture chorégraphique contemporaine. La danse comme langage premier, leur pratique traverse les territoires du corps en mouvement, explore les frontières entre écriture et improvisation, mémoire et instant présent.",
  p2:
    'Chaque projet est une recherche sensible, un dialogue entre espace et temps. La compagnie poursuit une voix singulière où le geste chorégraphique devient récit du corps.',
}

export const defaultPresentationPage: PresentationPageCms = {
  kicker: 'La compagnie',
  title: 'Compagnie Horrmê',
  intro: [],
  dancersSectionTitle: 'Les danseuses',
  dancers: [
    {
      portrait: localImage('/assets/images/presentation/emma.jpg', 1200, 1600),
      name: 'Louise Melli',
      role: 'Danseuse · Chorégraphe',
      bio1:
        "Formée en danse contemporaine au Conservatoire National Supérieur de Paris, Louise développe une pratique ancrée dans l'écriture du mouvement. Son parcours l'amène à explorer la relation entre le corps et l'espace scénique, entre composition et improvisation.",
      bio2:
        'Elle a collaboré avec plusieurs compagnies et chorégraphes, nourrissant une approche singulière où le geste devient matière première de la narration.',
      formationTitle: 'Formation',
      formationText: 'Conservatoire National Supérieur\nDanse contemporaine, Paris',
    },
    {
      portrait: localImage('/assets/images/presentation/josephine.jpg', 1200, 1600),
      name: 'Joséphine Hassid-Langlois',
      role: 'Danseuse · Chorégraphe',
      bio1:
        "Issue d'une formation pluridisciplinaire mêlant danse classique et contemporaine, Joséphine Hassid-Langlois porte une attention particulière à la musicalité du corps. Son travail interroge les frontières entre danse et performance, entre écriture et lâcher-prise.",
      bio2:
        "Elle co-fonde la Compagnie Horrmê avec Louise Melli, portée par la conviction que la danse est un langage capable de dire l'indicible, un espace de vérité partagée.",
      formationTitle: 'Formation',
      formationText: 'Formation pluridisciplinaire\nDanse classique & contemporaine',
    },
  ],
  partnersTitle: 'Soutiens et partenaires',
  partners: [],
  projectsCtaLabel: 'Voir les créations',
}

export const defaultContactPage: ContactPageCms = {
  kicker: 'Contact',
  title: 'Nous écrire',
  emailLabel: 'E-mail',
  email: 'compagniehorrme@gmail.com',
  contacts: [],
  locationLabel: 'Basées à',
  locationText: 'Paris, France',
  pressKitUrl: '',
  pressKitLabel: 'Télécharger le dossier de diffusion',
  backLinkLabel: 'Retour à l’accueil',
}
