/**
 * Crée dans Sanity les créations qui n'existaient que sous forme de pages
 * figées (/creation/*), désormais supprimées.
 *
 *   node scripts/seed-creations.mjs
 *
 * `createIfNotExists` : le script ne touche jamais un document existant. On
 * peut donc le relancer sans risque, et toute modification faite depuis le
 * Studio est préservée.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2].trim()
}

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('SANITY_API_WRITE_TOKEN manquant dans .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const creations = [
  {
    slug: 'theatre-douze',
    title: 'Théâtre Douze',
    subtitle: 'Tout ce qui tremble',
    type: 'Événement',
    year: 2025,
    location: 'Théâtre Douze, Paris',
  },
  {
    slug: 'regard-du-cygne',
    title: 'Regard du Cygne',
    subtitle: 'Tout ce qui tremble',
    type: 'Performance',
    year: 2025,
    location: 'Studio Le Regard du Cygne, Paris',
  },
  { slug: 'rann', title: 'Rann', type: 'Performance', year: 2025 },
  {
    slug: 'bastille-design-center',
    title: 'Bastille Design Center',
    type: 'Événement',
    year: 2025,
    location: 'Bastille Design Center, Paris',
  },
]

const tx = creations.reduce(
  (t, c) =>
    t.createIfNotExists({
      _id: `project-${c.slug}`,
      _type: 'project',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      ...(c.subtitle ? { subtitle: c.subtitle } : {}),
      type: c.type,
      year: c.year,
      ...(c.location ? { location: c.location } : {}),
      description: '',
      photographer: [],
      gallery: [],
    }),
  client.transaction(),
)

const res = await tx.commit()
console.log(`${res.results.length} créations traitées :`)
for (const r of res.results) console.log(`  ${r.id}`)
console.log('\nÀ compléter depuis le Studio : description, photos, année exacte.')
