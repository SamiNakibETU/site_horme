import { getAllProjects } from '@/lib/getProjects'
import ProjetsGallery from '@/components/ProjetsGallery'

export const revalidate = 3600

export default async function ProjetsPage() {
  const projects = await getAllProjects()
  return <ProjetsGallery projects={projects} />
}
