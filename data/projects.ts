/** Une image de galerie (ordre = ordre dans le tableau ; crédit / alt depuis Sanity). */
export type ProjectGalleryItem = {
  url: string
  alt?: string
  credit?: string
}

export interface Project {
  slug: string
  title: string
  subtitle?: string
  type: 'Festival' | 'Performance' | 'Événement' | 'Résidence'
  year: number
  location?: string
  photographer: string[]
  description?: string
  coverImage: string
  /** URLs pour listes / filmstrip (dérivé de la galerie). */
  images: string[]
  /** Détail page : ordre, légendes, crédits par image. */
  galleryItems?: ProjectGalleryItem[]
  video?: string
}

export const projects: Project[] = [
  {
    slug: 'khormos',
    title: 'Khorrmo(s)',
    type: 'Festival',
    year: 2024,
    photographer: ['Ysé', 'Arthur'],
    description: 'À compléter par la compagnie.',
    coverImage: '/assets/images/khormos/yse-01.jpg',
    images: [
      '/assets/images/khormos/yse-01.jpg',
      '/assets/images/khormos/yse-02.jpg',
      '/assets/images/khormos/yse-03.jpg',
      '/assets/images/khormos/yse-04.jpg',
      '/assets/images/khormos/yse-05.jpg',
      '/assets/images/khormos/yse-06.jpg',
      '/assets/images/khormos/arthur-01.jpg',
      '/assets/images/khormos/arthur-02.jpg',
      '/assets/images/khormos/arthur-03.jpg',
      '/assets/images/khormos/arthur-04.jpg',
      '/assets/images/khormos/arthur-05.jpg',
    ],
  },
  {
    slug: 'scene-ecriture',
    title: 'Scène à l\'écriture',
    subtitle: 'de Thomas Brena',
    type: 'Performance',
    year: 2024,
    photographer: ['Thomas Brena'],
    description: 'L\'écriture au plateau. Le corps comme matière première, la scène comme espace de révélation.',
    coverImage: '/assets/images/scene-ecriture/01.png',
    images: [
      '/assets/images/scene-ecriture/01.png',
      '/assets/images/scene-ecriture/02.png',
      '/assets/images/scene-ecriture/03.png',
      '/assets/images/scene-ecriture/04.png',
      '/assets/images/scene-ecriture/05.png',
      '/assets/images/scene-ecriture/06.png',
      '/assets/images/scene-ecriture/07.png',
      '/assets/images/scene-ecriture/08.png',
      '/assets/images/scene-ecriture/09.png',
      '/assets/images/scene-ecriture/10.png',
      '/assets/images/scene-ecriture/11.png',
    ],
    video: '/assets/videos/hero.mp4',
  },
  {
    slug: 'jardiniers-montrouge',
    title: 'Les Jardiniers',
    subtitle: 'Montrouge',
    type: 'Événement',
    year: 2024,
    location: 'Montrouge',
    photographer: ['À compléter'],
    description: 'À compléter par la compagnie.',
    coverImage: '/assets/images/jardiniers/01.jpg',
    images: [
      '/assets/images/jardiniers/01.jpg',
      '/assets/images/jardiniers/02.jpg',
      '/assets/images/jardiniers/03.jpg',
      '/assets/images/jardiniers/04.jpg',
      '/assets/images/jardiniers/05.jpg',
      '/assets/images/jardiniers/06.jpg',
      '/assets/images/jardiniers/07.jpg',
      '/assets/images/jardiniers/08.jpg',
      '/assets/images/jardiniers/09.jpg',
      '/assets/images/jardiniers/10.jpg',
    ],
  },
]
