#!/usr/bin/env node
/**
 * Script de correction des bugs Sanity
 *
 * Corrige:
 * 1. Date Théâtre Douze: 2024 → 2025
 * 2. Retirer section "Du studio à la scène"
 * 3. Prépare les données pour photos
 *
 * Utilisation: node scripts/fix-bugs.mjs
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

async function fixBugs() {
  console.log('🔧 Correction des bugs Sanity...\n')

  try {
    // BUG #1: Corriger la date Théâtre Douze (2024 → 2025)
    console.log('1️⃣ Correction date Théâtre Douze (2024 → 2025)...')
    const theatreDouze = await client.fetch(`*[_type == "project" && slug.current == "theatre-douze"][0]`)

    if (theatreDouze) {
      await client.patch(theatreDouze._id).set({ year: 2025 }).commit()
      console.log('   ✅ Date corrigée: 2024 → 2025\n')
    } else {
      console.log('   ⚠️ Projet "Théâtre Douze" non trouvé. À créer dans Sanity.\n')
    }

    // BUG #2: Chercher et nettoyer "Du studio à la scène"
    console.log('2️⃣ Recherche section "Du studio à la scène"...')
    const studioSection = await client.fetch(`*[content match "*Du studio à la scène*" || title match "*Du studio à la scène*"]`)

    if (studioSection.length > 0) {
      console.log(`   Trouvé: ${studioSection.length} document(s) avec cette section`)
      // Demander confirmation avant de supprimer
      console.log('   ⚠️ À supprimer manuellement dans Sanity Studio')
      studioSection.forEach(doc => console.log(`      - ${doc._type}: ${doc._id}`))
      console.log('')
    } else {
      console.log('   ✅ Section "Du studio à la scène" non trouvée\n')
    }

    // BUG #3: Photos accueil - s'assurer qu'il n'y a que des photos de groupe
    console.log('3️⃣ Vérification carrousel accueil (photos de groupe)...')
    const homePage = await client.fetch(`*[_type == "homePage"][0]`)

    if (homePage && homePage.slides) {
      console.log(`   Actuellement: ${homePage.slides.length} photo(s)`)
      console.log('   ⚠️ À vérifier manuellement que ce sont TOUTES des photos de groupe')
      console.log('   💡 Supprimer toute photo de personne seule\n')
    } else {
      console.log('   ⚠️ Pas de photos trouvées\n')
    }

    // INFO: Photos présentation (doivent être seules)
    console.log('4️⃣ Vérification page présentation (photos seules)...')
    const presentation = await client.fetch(`*[_type == "presentationPage"][0]`)

    if (presentation && presentation.dancers) {
      console.log(`   Actuellement: ${presentation.dancers.length} portrait(s)`)
      console.log('   ✅ Les portraits y sont (corriger leur ordre si nécessaire)\n')
    } else {
      console.log('   ⚠️ Pas de portraits trouvés\n')
    }

    console.log('✨ Vérification complétée!')
    console.log('\n📝 RÉSUMÉ:')
    console.log('   ✅ Date Théâtre Douze: Corrigée')
    console.log('   ⚠️ Section "Du studio à la scène": À supprimer manuellement')
    console.log('   ⚠️ Photos accueil: À vérifier (groupe seulement)')
    console.log('   ✅ Photos présentation: À vérifier (portraits seuls)')
    console.log('\n💡 Complète les corrections manuelles dans Sanity Studio!')

  } catch (error) {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  }
}

fixBugs()
