import HomePage from '@/components/HomePage'
import { getHomePage } from '@/lib/getCms'
import { getOrderedProjects, getUpcoming } from '@/lib/getProjects'

export const revalidate = 3600

export default async function Page() {
  const [home, { featured, others, page }, upcoming] = await Promise.all([
    getHomePage(),
    getOrderedProjects(),
    getUpcoming(),
  ])
  return (
    <HomePage home={home} featured={featured} others={others} othersTitle={page.othersTitle} upcoming={upcoming} />
  )
}
