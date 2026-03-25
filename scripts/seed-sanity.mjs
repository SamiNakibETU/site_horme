/**
 * Importe les 3 créations depuis le dossier Asset/ (à côté de horme-v3).
 *
 * Correspondance dossiers → spectacles :
 *   - arthur + ysé     → Khorrmo(s)     (slug khormos)
 *   - montrouge        → Les Jardiniers (slug jardiniers-montrouge)
 *   - thomas           → Scène à l’écriture (slug scene-ecriture) — .mp4 → Vidéo, reste → galerie
 *
 * .env.local : NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 * Optionnel : ASSET_ROOT=c:\chemin\vers\Asset (sinon : ../Asset depuis horme-v3)
 *
 * npm run seed:sanity
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createReadStream } from 'node:fs'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

function loadEnvFile(filePath) {
  const out = {}
  if (!fs.existsSync(filePath)) return out
  let text = fs.readFileSync(filePath, 'utf8')
  text = text.replace(/^\uFEFF/, '')
  for (const line of text.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    const key = t.slice(0, i).trim().replace(/^\uFEFF/, '')
    let val = t.slice(i + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

const envLocal = loadEnvFile(path.join(ROOT, '.env.local'))
const envStudio = loadEnvFile(path.join(ROOT, 'studio', '.env'))
const env = { ...envStudio, ...envLocal }

const projectId =
  env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID
const dataset =
  env.NEXT_PUBLIC_SANITY_DATASET || env.SANITY_STUDIO_DATASET || 'production'
const token = (
  (envLocal.SANITY_API_WRITE_TOKEN || '').trim() ||
  (process.env.SANITY_API_WRITE_TOKEN || '').trim() ||
  (envStudio.SANITY_API_WRITE_TOKEN || '').trim()
)

const ASSET_ROOT = (env.ASSET_ROOT || process.env.ASSET_ROOT || path.join(ROOT, '..', 'Asset')).trim()

if (!projectId) {
  console.error('Manque NEXT_PUBLIC_SANITY_PROJECT_ID dans .env.local')
  process.exit(1)
}
if (!token) {
  console.error(
    'Manque SANITY_API_WRITE_TOKEN dans .env.local\n' +
      'Crée un token PROJET (pas seulement organisation) : voir message 403 ci-dessous si besoin.'
  )
  process.exit(1)
}

if (token.length < 20) {
  console.error('SANITY_API_WRITE_TOKEN semble trop court — vérifie .env.local')
  process.exit(1)
}
console.log(
  `Token chargé : ${token.slice(0, 7)}… (longueur ${token.length}) — source : ${
    (envLocal.SANITY_API_WRITE_TOKEN || '').trim() ? '.env.local' : process.env.SANITY_API_WRITE_TOKEN ? 'process.env' : 'studio/.env'
  }`
)
console.log(`Dossier médias : ${ASSET_ROOT}`)

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i
const VIDEO_EXT = /\.(mp4|mov|webm)$/i

/** Définition des 3 créations + sous-dossiers Asset/ (ordre des dossiers = ordre des blocs dans la galerie). */
const CREATIONS = [
  {
    slug: 'khormos',
    title: 'Khorrmo(s)',
    type: 'Festival',
    year: 2024,
    photographer: ['Ysé', 'Arthur'],
    description: 'À compléter par la compagnie.',
    sources: [
      { folder: 'arthur', defaultCredit: 'Arthur' },
      { folder: 'ysé', defaultCredit: 'Ysé' },
    ],
    video: false,
  },
  {
    slug: 'jardiniers-montrouge',
    title: 'Les Jardiniers',
    subtitle: 'Montrouge',
    type: 'Événement',
    year: 2024,
    location: 'Montrouge',
    photographer: ['À compléter'],
    description: 'À compléter par la compagnie.',
    sources: [{ folder: 'montrouge', defaultCredit: '' }],
    video: false,
  },
  {
    slug: 'scene-ecriture',
    title: "Scène à l'écriture",
    subtitle: 'de Thomas Brena',
    type: 'Performance',
    year: 2024,
    photographer: ['Thomas Brena'],
    description:
      "L'écriture au plateau. Le corps comme matière première, la scène comme espace de révélation.",
    sources: [{ folder: 'thomas', defaultCredit: 'Thomas Brena' }],
    video: true,
  },
]

function listSortedFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`  (!) Dossier absent : ${dir}`)
    return []
  }
  return fs
    .readdirSync(dir)
    .filter(name => {
      const abs = path.join(dir, name)
      return fs.statSync(abs).isFile()
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
}

/**
 * @returns {{ gallery: { abs: string, credit?: string }[], videoAbs: string | null }}
 */
function collectFromCreation(creation, { logVideo } = { logVideo: true }) {
  const gallery = []
  let videoAbs = null

  for (const src of creation.sources) {
    const dir = path.join(ASSET_ROOT, src.folder)
    const files = listSortedFiles(dir)
    for (const name of files) {
      const abs = path.join(dir, name)
      if (VIDEO_EXT.test(name)) {
        if (creation.video && !videoAbs) {
          videoAbs = abs
          if (logVideo) console.log(`  vidéo → ${path.relative(ASSET_ROOT, abs)}`)
        } else if (!creation.video) {
          console.warn(`  (!) Vidéo ignorée (pas prévue pour cette création) : ${name}`)
        }
        continue
      }
      if (IMAGE_EXT.test(name)) {
        gallery.push({
          abs,
          credit: src.defaultCredit?.trim() || undefined,
        })
      }
    }
  }

  return { gallery, videoAbs }
}

function galleryItemKey(slug, abs) {
  const rel = path.relative(ASSET_ROOT, abs).replace(/\\/g, '/')
  const raw = `${slug}-${rel}`
  return raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120)
}

async function uploadImageAbs(absPath, cache) {
  if (cache.has(absPath)) return cache.get(absPath)
  const stream = createReadStream(absPath)
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(absPath),
  })
  cache.set(absPath, asset._id)
  return asset._id
}

async function uploadFileAbs(absPath, cache) {
  if (cache.has(absPath)) return cache.get(absPath)
  const stream = createReadStream(absPath)
  const lower = absPath.toLowerCase()
  const contentType = lower.endsWith('.mp4')
    ? 'video/mp4'
    : lower.endsWith('.webm')
      ? 'video/webm'
      : lower.endsWith('.mov')
        ? 'video/quicktime'
        : 'application/octet-stream'
  const asset = await client.assets.upload('file', stream, {
    filename: path.basename(absPath),
    contentType,
  })
  cache.set(absPath, asset._id)
  return asset._id
}

function imageField(assetId) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
  }
}

async function main() {
  if (!fs.existsSync(ASSET_ROOT)) {
    console.error(`Dossier Asset introuvable : ${ASSET_ROOT}`)
    console.error('Indique ASSET_ROOT dans .env.local ou place le dossier « Asset » à côté de horme-v3.')
    process.exit(1)
  }

  const imageCache = new Map()
  const fileCache = new Map()

  console.log(`\nProjet ${projectId} · dataset ${dataset}`)
  console.log('Étape 1/2 : upload des fichiers…\n')

  const prepared = CREATIONS.map(c => ({
    creation: c,
    ...collectFromCreation(c, { logVideo: true }),
  }))

  for (const { creation: c, gallery, videoAbs } of prepared) {
    console.log(`— ${c.title}`)
    if (!gallery.length) {
      console.warn(`  (!) Aucune image pour ${c.slug}`)
    }
    for (const { abs } of gallery) {
      process.stdout.write(`  ↑ ${path.relative(ASSET_ROOT, abs)}\n`)
      await uploadImageAbs(abs, imageCache)
    }
    if (videoAbs) {
      await uploadFileAbs(videoAbs, fileCache)
    }
  }

  console.log('\nÉtape 2/2 : écriture des documents Sanity…\n')

  for (const { creation: c, gallery, videoAbs } of prepared) {
    if (!gallery.length) {
      console.warn(`  (!) Skip document ${c.slug} : pas d’images`)
      continue
    }

    const galleryBlocks = []
    for (const { abs, credit } of gallery) {
      const ref = await uploadImageAbs(abs, imageCache)
      galleryBlocks.push({
        _type: 'galleryItem',
        _key: galleryItemKey(c.slug, abs),
        photo: imageField(ref),
        alt: '',
        ...(credit ? { credit } : {}),
      })
    }

    const coverRef = await uploadImageAbs(gallery[0].abs, imageCache)

    let videoField
    if (videoAbs) {
      const vref = await uploadFileAbs(videoAbs, fileCache)
      videoField = {
        _type: 'file',
        asset: { _type: 'reference', _ref: vref },
      }
    }

    const doc = {
      _id: `project-${c.slug}`,
      _type: 'project',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      subtitle: c.subtitle,
      type: c.type,
      year: c.year,
      location: c.location,
      photographer: c.photographer,
      description: c.description,
      coverImage: imageField(coverRef),
      gallery: galleryBlocks,
      ...(videoField ? { video: videoField } : {}),
    }

    await client.createOrReplace(doc)
    console.log(`  OK · ${c.slug} — ${gallery.length} image(s)${videoAbs ? ' + vidéo' : ''}`)
  }

  console.log(
    '\nTerminé. Dans le Studio : chaque « Création » a une galerie en liste — glisser les lignes pour l’ordre sur le site.'
  )
}

main().catch((err) => {
  const code = err.statusCode ?? err.response?.statusCode
  if (code === 403) {
    console.error(`
--- 403 : permission "create" refusée ---

Le token utilisé n’est pas autorisé à créer des fichiers/images dans CE projet (Content Lake).

À faire :
  1) Ouvre https://www.sanity.io/manage
  2) Sélectionne le **projet** Cie. Horme, pas seulement l’organisation.
  3) Project settings → **API** → **Tokens** → token **Editor** (projet).

Vérifie SANITY_API_WRITE_TOKEN dans **horme-v3/.env.local**.
`)
  }
  console.error(err)
  process.exit(1)
})
