/**
 * Crée ou met à jour les documents singleton (pages fixes) avec textes d’exemple.
 * Les images restent à ajouter dans le Studio (ou Médiathèque).
 *
 * npm run seed:singletons
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
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

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || env.SANITY_STUDIO_DATASET || 'production'
const token =
  (envLocal.SANITY_API_WRITE_TOKEN || '').trim() ||
  (process.env.SANITY_API_WRITE_TOKEN || '').trim() ||
  (envStudio.SANITY_API_WRITE_TOKEN || '').trim()

if (!projectId || !token) {
  console.error('Besoin de NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_WRITE_TOKEN dans .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const key = i => `k${i}`

const navTremble = [
  { label: 'Les Jardiniers · Montrouge', href: '/projets/jardiniers-montrouge' },
  { label: 'Regard du Cygne', href: '/creation/tout-ce-qui-tremble/regard-du-cygne' },
  { label: 'Théâtre Douze', href: '/creation/tout-ce-qui-tremble/theatre-douze' },
]
const navDirect = [
  { label: 'Rann', href: '/creation/rann' },
  { label: 'Khorrmo(s)', href: '/projets/khormos' },
  { label: 'Bastille Design Center', href: '/creation/bastille-design-center' },
]

const footerNav = [
  { label: 'Index', href: '/' },
  { label: 'Créations', href: '/projets' },
  { label: 'Présentation', href: '/presentation' },
  { label: 'Contact', href: '/contact' },
]

async function main() {
  const docs = [
    {
      _id: 'singleton-siteSettings',
      _type: 'siteSettings',
      metaTitle: 'Cie. Horme | Compagnie de danse contemporaine',
      metaDescription:
        'Louise Melli et Joséphine Hassid-Langlois, écriture chorégraphique, Paris',
      ogTitle: 'Cie. Horme',
      ogDescription:
        'Compagnie de danse contemporaine, Louise Melli et Joséphine Hassid-Langlois, Paris',
    },
    {
      _id: 'singleton-navigation',
      _type: 'navigation',
      creationButtonLabel: 'Création',
      trembleGroupTitle: 'Tout ce qui tremble',
      trembleLinks: navTremble.map((l, i) => ({
        _type: 'trembleMenuLink',
        _key: key(i),
        ...l,
      })),
      directLinks: navDirect.map((l, i) => ({
        _type: 'directMenuLink',
        _key: key(i),
        ...l,
      })),
    },
    {
      _id: 'singleton-footerContent',
      _type: 'footerContent',
      brandLine: 'Cie.',
      brandAccent: 'Horme',
      tagline: 'Compagnie de danse contemporaine, Paris.',
      navColumnTitle: 'Navigation',
      navLinks: footerNav.map((l, i) => ({
        _type: 'footerLink',
        _key: key(i),
        ...l,
      })),
      followColumnTitle: 'Suivre',
      instagramLabel: 'Instagram',
      instagramUrl: 'https://instagram.com',
      email: 'contact@ciehorme.com',
      asideTagline: 'Le corps comme langage premier.',
      copyright: '© 2026 Cie. Horme. Tous droits réservés.',
    },
    {
      _id: 'singleton-homePage',
      _type: 'homePage',
      heroTitle: 'Cie. Horme',
      heroLine1: 'Louise Melli et Joséphine Hassid-Langlois',
      heroLine2: 'écriture chorégraphique, Paris.',
      slides: [],
      manifestoLine1: 'Le corps comme',
      manifestoAccent: 'langage premier.',
      manifestoCtaLabel: 'Voir les créations →',
      introKicker: 'La compagnie',
      introParagraph1:
        "Louise Melli et Joséphine Hassid-Langlois portent une compagnie ancrée dans l'écriture chorégraphique contemporaine. La danse comme langage premier, leur pratique traverse les territoires du corps en mouvement, explore les frontières entre écriture et improvisation, mémoire et instant présent.",
      introParagraph2:
        'Chaque projet est une recherche sensible, un dialogue entre espace et temps.',
      introCtaLabel: 'Découvrir la compagnie →',
      imagesSectionKicker: 'La compagnie en images',
      imagesSectionBody:
        'Portraits et regards : retrouvez la compagnie sur la page Présentation.',
      imagesSectionCtaLabel: 'Présentation →',
      creationsKicker: 'Créations',
      creationsFooterCtaLabel: 'Toutes les créations →',
    },
    {
      _id: 'singleton-presentationPage',
      _type: 'presentationPage',
      kicker: 'La compagnie',
      title: 'Cie. Horme',
      intro: [],
      dancersSectionTitle: 'Les danseuses',
      dancers: [],
      projectsCtaLabel: 'Voir les projets →',
    },
    {
      _id: 'singleton-contactPage',
      _type: 'contactPage',
      kicker: 'Contact',
      title: 'Nous écrire',
      emailLabel: 'Email',
      email: 'contact@ciehorme.com',
      locationLabel: 'Basées à',
      locationText: 'Paris, France',
      backLinkLabel: '← Retour à l’index',
    },
  ]

  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log('OK', doc._id)
  }

  console.log(
    '\nTerminé. Dans le Studio : ouvrez « Accueil » → onglet « 2 · Photos qui défilent » pour ajouter des images, puis Publier.'
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
