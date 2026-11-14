import { cache } from 'react'
import type { PortableTextBlock } from '@portabletext/types'
import { projects as staticProjects } from '@/data/projects'
import type { AgendaEntry, Performance, Project } from '@/lib/cms.types'
import { getProjectsPage } from '@/lib/getCms'
import { IMAGE, localImage, toCmsImage, type RawImage } from '@/lib/image'
import { sanityConfigured } from '@/lib/sanity.client'
import { sanityFetch } from '@/lib/sanity.fetch'

const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(year desc, title asc) {
  "slug": slug.current,
  title, subtitle, type, year, location, photographer, description, body,
  "updatedAt": _updatedAt,
  "cover": coverImage${IMAGE},
  "gallery": gallery[]{ "image": coalesce(photo, @)${IMAGE}, alt, credit },
  videoUrl,
  "videoFile": video.asset->url,
  performances[]{ date, time, venue, city, note, ticketUrl },
  credits[]{ role, names },
  links[]{ label, url },
  "dossierUrl": dossier.asset->url
}`

type Row = {
  slug: string
  title: string
  subtitle?: string | null
  type?: string | null
  year: number
  location?: string | null
  photographer?: string[] | null
  description?: string | null
  body?: PortableTextBlock[] | null
  updatedAt?: string
  cover?: RawImage
  gallery?: { image?: RawImage; alt?: string | null; credit?: string | null }[] | null
  videoUrl?: string | null
  videoFile?: string | null
  performances?: Performance[] | null
  credits?: { role: string; names: string }[] | null
  links?: { label: string; url: string }[] | null
  dossierUrl?: string | null
}

/** Mention de travail à ne jamais montrer au public. */
const isPlaceholder = (s?: string | null) => !s?.trim() || /^à compléter/i.test(s.trim())

function normalize(row: Row): Project | null {
  if (!row.slug || !row.title) return null
  const images = (row.gallery ?? [])
    .map(g => {
      const img = toCmsImage(g.image, 2000, g.alt ?? undefined)
      if (!img) return null
      return { ...img, credit: g.credit?.trim() || undefined }
    })
    .filter(Boolean) as Project['images']

  // Aucun repli sur la photo d'une autre création : une fausse attribution
  // est pire qu'une absence.
  const cover = toCmsImage(row.cover, 2000, row.title) ?? images[0] ?? null

  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || undefined,
    type: row.type || 'Création',
    year: row.year,
    location: row.location || undefined,
    photographer: (row.photographer ?? []).filter(p => !isPlaceholder(p)),
    description: isPlaceholder(row.description) ? undefined : row.description!,
    body: Array.isArray(row.body) ? row.body : [],
    cover,
    images,
    videoUrl: row.videoUrl || undefined,
    videoFile: row.videoFile || undefined,
    performances: (row.performances ?? [])
      .filter(p => p?.date && p?.venue)
      .sort((a, b) => a.date.localeCompare(b.date)),
    credits: (row.credits ?? []).filter(c => c?.role && c?.names),
    links: (row.links ?? []).filter(l => l?.label && l?.url),
    dossierUrl: row.dossierUrl || undefined,
    updatedAt: row.updatedAt,
  }
}

/** Repli hors ligne : uniquement quand Sanity n'est pas configuré (développement). */
function fromStatic(): Project[] {
  return staticProjects.map(p => {
    const images = p.images.map(u => localImage(u, 1600, 1067, p.title))
    return {
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      type: p.type,
      year: p.year,
      location: p.location,
      photographer: p.photographer.filter(x => !isPlaceholder(x)),
      description: isPlaceholder(p.description) ? undefined : p.description,
      body: [],
      cover: images[0] ?? null,
      images,
      performances: [],
      credits: [],
      links: [],
    }
  })
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  if (!sanityConfigured) return fromStatic()
  try {
    const rows = await sanityFetch<Row[]>(projectsQuery)
    const mapped = (rows ?? []).map(normalize).filter(Boolean) as Project[]
    return mapped.length ? mapped : fromStatic()
  } catch {
    return fromStatic()
  }
})

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects()
  return all.find(p => p.slug === slug)
}

/**
 * Créations à la une (dans l'ordre choisi dans le CMS) et autres créations.
 *
 * Sans sélection, on retombe sur l'ancien comportement : les créations
 * photographiées passent devant. Le site n'est jamais vide.
 */
export const getOrderedProjects = cache(async () => {
  const [all, page] = await Promise.all([getAllProjects(), getProjectsPage()])
  const bySlug = new Map(all.map(p => [p.slug, p]))
  let featured = page.featuredSlugs.map(s => bySlug.get(s)).filter(Boolean) as Project[]
  if (!featured.length) featured = all.filter(p => p.images.length > 0)
  const featuredSet = new Set(featured.map(p => p.slug))
  const others = all.filter(p => !featuredSet.has(p.slug))
  return { featured, others, page }
})

/** Date du jour à Paris, au format AAAA-MM-JJ, pour comparer aux dates saisies. */
function todayInParis(): string {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date())
}

export async function getUpcoming(limit = 6): Promise<AgendaEntry[]> {
  const all = await getAllProjects()
  const today = todayInParis()
  return all
    .flatMap(p => p.performances.map(perf => ({ ...perf, projectSlug: p.slug, projectTitle: p.title })))
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
}
