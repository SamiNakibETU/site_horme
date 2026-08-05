import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/getProjects'
import ProjetsGallery from '@/components/ProjetsGallery'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Créations | Cie. Horme',
  description:
    'Spectacles, résidences et performances de la Cie. Horme : Louise Melli ' +
    'et Joséphine Hassid-Langlois, écriture chorégraphique, Paris.',
}

export default async function ProjetsPage() {
  const projects = await getAllProjects()
  return <ProjetsGallery projects={projects} />
}
