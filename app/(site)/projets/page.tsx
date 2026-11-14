import type { Metadata } from 'next'
import ProjetsGallery from '@/components/ProjetsGallery'
import { getOrderedProjects } from '@/lib/getProjects'
import { getSiteSettings } from '@/lib/getCms'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const [{ page }, s] = await Promise.all([getOrderedProjects(), getSiteSettings()])
  const description =
    page.seoDescription || `Spectacles, performances et résidences de la ${s.siteName}.`
  return {
    title: 'Créations',
    description,
    alternates: { canonical: '/projets' },
    openGraph: { title: `Créations | ${s.siteName}`, description },
  }
}

export default async function ProjetsPage() {
  const { featured, others, page } = await getOrderedProjects()
  return (
    <>
      <h1 className="sr-only">Créations</h1>
      <ProjetsGallery featured={featured} others={others} othersTitle={page.othersTitle} openLabel={page.openLabel} />
    </>
  )
}
