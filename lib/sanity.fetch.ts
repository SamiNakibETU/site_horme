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
