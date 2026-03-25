'use client'

import dynamic from 'next/dynamic'

const VisualEditing = dynamic(
  () => import('next-sanity/visual-editing/client-component').then(m => m.default),
  { ssr: false },
)

export function SanityVisualEditing() {
  return <VisualEditing />
}
