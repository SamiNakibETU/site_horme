import { getAllProjects } from '@/lib/getProjects'
import { getHomePage } from '@/lib/getCms'
import HomePage from '@/components/HomePage'

export const revalidate = 3600

export default async function Page() {
  const [projects, home] = await Promise.all([getAllProjects(), getHomePage()])
  return <HomePage projects={projects} home={home} />
}
