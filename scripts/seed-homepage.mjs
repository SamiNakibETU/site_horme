#!/usr/bin/env node
/**
 * SEED DONNÉES ACCUEIL - SANS LES BUGS
 *
 * Crée la page d'accueil CORRECTE dans Sanity:
 * - Photos de GROUPE seulement (PAS de solos!)
 * - Vidéo placeholder
 * - Textes clairs et complets
 * - Structure parfaite
 *
 * Utilisation:
 * node scripts/seed-homepage.mjs
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('❌ Erreur: NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_TOKEN requis!')
  console.error('Ajoute-les à .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
})

const homepageData = {
  _type: 'homePage',
  _id: 'singleton-homePage',
  heroTitle: 'Cie. Horme',
  heroLine1: 'Louise Melli et Joséphine Hassid-Langlois',
  heroLine2: 'écriture chorégraphique, Paris',
  manifestoLine1: 'Le corps comme',
  manifestoAccent: 'langage premier.',
  manifestoCtaLabel: 'Voir les créations →',
  introKicker: 'La compagnie',
  introParagraph1:
    'Louise Melli et Joséphine Hassid-Langlois portent une compagnie ancrée dans l\'écriture chorégraphique contemporaine. La danse comme langage premier, leur pratique traverse les territoires du corps en mouvement, explore les frontières entre écriture et improvisation, mémoire et instant présent.',
  introParagraph2: 'Chaque projet est une recherche sensible, un dialogue entre espace et temps.',
  introCtaLabel: 'Découvrir la compagnie →',
  imagesSectionKicker: 'La compagnie en images',
  imagesSectionBody: 'Portraits et regards : retrouvez la compagnie sur la page Présentation.',
  imagesSectionCtaLabel: 'Présentation →',
  creationsKicker: 'Créations',
  creationsFooterCtaLabel: 'Toutes les créations →',
  // Slides = PHOTOS DE GROUPE SEULEMENT (pas de solo!)
  slides: [
    {
      _type: 'homeSlide',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-group-1', // À remplacer par vraie image
        },
      },
      objectFit: 'cover',
      objectPosition: 'center',
    },
    {
      _type: 'homeSlide',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-group-2', // À remplacer par vraie image
        },
      },
      objectFit: 'cover',
      objectPosition: 'center',
    },
  ],
}

async function seedHomepage() {
  console.log('🌱 Création de la page d\'accueil dans Sanity...\n')

  try {
    // Créer ou mettre à jour la page d'accueil
    const result = await client
      .patch('singleton-homePage')
      .set(homepageData)
      .upsert()
      .commit()

    console.log('✅ Page d\'accueil créée/mise à jour!')
    console.log(`   ID: ${result._id}`)
    console.log(`   Titre: ${result.heroTitle}`)
    console.log(`   Slides (photos groupe): ${result.slides?.length || 0}`)

    console.log('\n📝 IMPORTANT:')
    console.log('   ⭐ Les slides DOIVENT être des photos DE GROUPE SEULEMENT!')
    console.log('   ❌ PAS de photos de personnes seules ici!')
    console.log('   ➡️ Les photos seules vont en page PRÉSENTATION')

    console.log('\n✨ Accueil créée correctement!')
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  }
}

seedHomepage()
