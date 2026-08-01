import { defineCliConfig } from 'sanity/cli'

/**
 * Config de la CLI Sanity, à la racine du projet.
 *
 * Permet `npx sanity deploy` (studio hébergé sur sanity.io) et
 * `npx sanity dataset export` (sauvegarde du contenu) sans paquet séparé :
 * la CLI lit le sanity.config.ts voisin.
 */
export default defineCliConfig({
  api: {
    projectId:
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      process.env.SANITY_STUDIO_PROJECT_ID ||
      '',
    dataset:
      process.env.NEXT_PUBLIC_SANITY_DATASET ||
      process.env.SANITY_STUDIO_DATASET ||
      'production',
  },
})
