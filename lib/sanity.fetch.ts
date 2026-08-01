import { createClient, type SanityClient } from '@sanity/client'
import { draftMode } from 'next/headers'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

function publicClient(): SanityClient {
  return createClient({
    projectId: projectId || 'placeholder',
    dataset,
    apiVersion,
    useCdn: true,
  })
}

/**
 * Chemins dont le contenu ne doit JAMAIS être encodé par stega.
 *
 * stega glisse l'identifiant du champ dans le texte, sous forme de caractères
 * Unicode invisibles. C'est ce qui rend l'aperçu cliquable — mais un caractère
 * invisible dans une URL, un slug ou un code couleur casse la valeur. On
 * n'encode donc que le texte réellement affiché.
 */
const STEGA_EXCLUDED = new Set([
  'slug',
  'current',
  'url',
  'href',
  'link',
  'email',
  'phone',
  'icon',
  'color',
  'accent',
  'alt',
])

function previewClient(): SanityClient | null {
  const token = process.env.SANITY_API_READ_TOKEN?.trim()
  if (!token || !projectId) return null
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: 'previewDrafts',
    stega: {
      enabled: true,
      // Chemin du Studio embarqué : c'est là que pointent les overlays
      // « modifier ce champ » affichés par-dessus l'aperçu.
      studioUrl: '/studio',
      filter: props => {
        const leaf = props.sourcePath[props.sourcePath.length - 1]
        if (typeof leaf === 'string' && STEGA_EXCLUDED.has(leaf)) return false
        return props.filterDefault(props)
      },
    },
  })
}

/**
 * Fetch GROQ avec cache taggé (revalidation webhook) ou sans cache en mode brouillon / preview.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ['sanity'],
): Promise<T> {
  const dm = await draftMode()
  const usePreview = dm.isEnabled && Boolean(previewClient())
  const client = usePreview ? previewClient()! : publicClient()

  if (usePreview) {
    return client.fetch<T>(query, params, { cache: 'no-store' })
  }

  return client.fetch<T>(query, params, {
    next: { tags: tags.length ? tags : ['sanity'] },
  })
}
