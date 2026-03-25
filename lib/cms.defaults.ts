import type {
  ContactPageCms,
  FooterCms,
  HomePageCms,
  NavigationCms,
  PresentationPageCms,
  SiteSettingsCms,
} from '@/lib/cms.types'

export const defaultSiteSettings: SiteSettingsCms = {
  metaTitle: 'Cie. Horme | Compagnie de danse contemporaine',
  metaDescription: 'Louise Melli et Joséphine Hassid-Langlois, écriture chorégraphique, Paris',
  ogTitle: 'Cie. Horme',
  ogDescription: 'Compagnie de danse contemporaine, Louise Melli et Joséphine Hassid-Langlois, Paris',
  ogImage: '',
}

export const defaultNavigation: NavigationCms = {
  creationButtonLabel: 'Création',
  trembleGroupTitle: 'Tout ce qui tremble',
  trembleLinks: [
    { href: '/projets/jardiniers-montrouge', label: 'Les Jardiniers · Montrouge' },
    { href: '/creation/tout-ce-qui-tremble/regard-du-cygne', label: 'Regard du Cygne' },
    { href: '/creation/tout-ce-qui-tremble/theatre-douze', label: 'Théâtre Douze' },
  ],
  directLinks: [
    { href: '/creation/rann', label: 'Rann' },
    { href: '/projets/khormos', label: 'Khorrmo(s)' },
    { href: '/creation/bastille-design-center', label: 'Bastille Design Center' },
  ],
}

export const defaultFooter: FooterCms = {
  brandLine: 'Cie.',
  brandAccent: 'Horme',
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
  instagramUrl: 'https://instagram.com',
  email: 'contact@ciehorme.com',
  asideTagline: 'Le corps comme langage premier.',
  copyright: '© 2026 Cie. Horme. Tous droits réservés.',
}

export const defaultHomePage: HomePageCms = {
  heroVideoUrl: '/assets/videos/hero.mp4',
  heroTitle: 'Cie. Horme',
  heroLine1: 'Louise Melli et Joséphine Hassid-Langlois',
  heroLine2: 'écriture chorégraphique, Paris.',
  slides: [
    { url: '/assets/images/khormos/arthur-01.jpg', objectFit: 'cover', objectPosition: 'center 20%' },
    { url: '/assets/images/scene-ecriture/01.png', objectFit: 'contain', objectPosition: 'center' },
    { url: '/assets/images/jardiniers/01.jpg', objectFit: 'cover', objectPosition: 'center' },
    { url: '/assets/images/khormos/arthur-02.jpg', objectFit: 'cover', objectPosition: 'center' },
    { url: '/assets/images/scene-ecriture/03.png', objectFit: 'contain', objectPosition: 'center' },
    { url: '/assets/images/khormos/yse-02.jpg', objectFit: 'cover', objectPosition: 'center top' },
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
  title: 'Cie. Horme',
  intro: [],
  dancersSectionTitle: 'Les danseuses',
  dancers: [
    {
      portraitUrl: '/assets/images/presentation/emma.jpg',
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
      portraitUrl: '/assets/images/presentation/josephine.jpg',
      name: 'Joséphine Hassid-Langlois',
      role: 'Danseuse · Chorégraphe',
      bio1:
        "Issue d'une formation pluridisciplinaire mêlant danse classique et contemporaine, Joséphine Hassid-Langlois porte une attention particulière à la musicalité du corps. Son travail interroge les frontières entre danse et performance, entre écriture et lâcher-prise.",
      bio2:
        "Elle co-fonde la Cie. Horme avec Louise Melli, portée par la conviction que la danse est un langage capable de dire l'indicible, un espace de vérité partagée.",
      formationTitle: 'Formation',
      formationText: 'Formation pluridisciplinaire\nDanse classique & contemporaine',
    },
  ],
  projectsCtaLabel: 'Voir les projets →',
}

export const defaultContactPage: ContactPageCms = {
  kicker: 'Contact',
  title: 'Nous écrire',
  emailLabel: 'Email',
  email: 'contact@ciehorme.com',
  locationLabel: 'Basées à',
  locationText: 'Paris, France',
  backLinkLabel: '← Retour à l’index',
}
