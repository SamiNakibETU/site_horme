import type { Project } from '@/data/projects'
import { projects as staticProjects } from '@/data/projects'
import { sanityConfigured } from '@/lib/sanity.client'
import { sanityFetch } from '@/lib/sanity.fetch'

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
      url: (r.url || '').trim(),
      alt: (r.alt || '').trim() || undefined,
      credit: (r.credit || '').trim() || undefined,
    }))
    .filter(r => r.url.length > 0)

  const images = rows.map(r => r.url)
  const coverImage =
    row.coverImage ||
    images[0] ||
    '/assets/images/khormos/yse-02.jpg'
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    type: normalizeType(row.type),
    year: row.year,
    location: row.location,
    photographer: row.photographer?.length ? row.photographer : ['À compléter'],
    description: row.description,
    coverImage,
    images: images.length ? images : [coverImage],
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
