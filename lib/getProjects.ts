import type { Project } from '@/data/projects'
import { projects as staticProjects } from '@/data/projects'
import { sanityConfigured } from '@/lib/sanity.client'
import { sanityFetch } from '@/lib/sanity.fetch'
import { sanityImageUrl } from '@/lib/sanityImage'

const projectsQuery = `*[_type == "project"] | order(year desc) {
  "slug": slug.current,
  title,
  subtitle,
  type,
  year,
  location,
  photographer,
  description,
  "coverImage": coalesce(coverImage.asset->url, ""),
  "galleryRows": gallery[]{
    "url": coalesce(photo.asset->url, asset->url),
    "alt": coalesce(alt, ""),
    "credit": coalesce(credit, "")
  },
  "video": video.asset->url
}`

type SanityGalleryRow = { url?: string; alt?: string; credit?: string }

type SanityProjectRow = {
  slug: string
  title: string
  subtitle?: string
  type?: string
  year: number
  location?: string
  photographer?: string[]
  description?: string
  coverImage: string
  galleryRows?: SanityGalleryRow[]
  video?: string | null
}

const projectTypes: Project['type'][] = ['Festival', 'Performance', 'Événement', 'Résidence']

function normalizeType(t: string | undefined): Project['type'] {
  if (t && (projectTypes as string[]).includes(t)) return t as Project['type']
  return 'Performance'
}

function normalizeSanityProject(row: SanityProjectRow): Project | null {
  if (!row.slug || !row.title) return null
  const rows = (row.galleryRows || [])
    .map(r => ({
      // 2000px de large suffit à tout affichage sur ce site (le carrousel le
      // plus grand vise 1920) ; les photos envoyées par la compagnie
      // dépassent souvent largement cette taille. Contraindre ici évite à
      // Next de retélécharger la pleine résolution avant de la redimensionner.
      url: sanityImageUrl((r.url || '').trim(), 2000),
      alt: (r.alt || '').trim() || undefined,
      credit: (r.credit || '').trim() || undefined,
    }))
    .filter(r => r.url.length > 0)

  const images = rows.map(r => r.url)

  // Aucun repli sur une image d'une autre création. Le code retombait ici sur
  // une photo de Khormo(s) codée en dur : une création sans visuel se serait
  // affichée avec l'image d'un autre spectacle, créditée à son photographe.
  // Une fausse attribution est pire qu'une absence — on assume le vide, et
  // l'interface regroupe ces créations à part.
  const coverImage = sanityImageUrl(row.coverImage, 2000) || images[0] || ''

  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    type: normalizeType(row.type),
    year: row.year,
    location: row.location,
    // Liste vide plutôt que « À compléter » : afficher « Photos : À compléter »
    // sur le site public expose une note de travail interne aux visiteurs.
    photographer: row.photographer?.filter(p => p?.trim() && !/^à compléter$/i.test(p.trim())) ?? [],
    description: row.description,
    coverImage,
    images,
    galleryItems: rows.length ? rows : undefined,
    video: row.video || undefined,
  }
}

export async function getAllProjects(): Promise<Project[]> {
  if (!sanityConfigured) {
    return staticProjects
  }
  try {
    const rows = await sanityFetch<SanityProjectRow[]>(projectsQuery)
    if (!rows?.length) return staticProjects
    const mapped = rows.map(normalizeSanityProject).filter(Boolean) as Project[]
    return mapped.length ? mapped : staticProjects
  } catch {
    return staticProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects()
  return all.find(p => p.slug === slug)
}
