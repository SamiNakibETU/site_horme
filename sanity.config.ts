import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity'
import { structure } from './sanity/structure'

/**
 * Configuration unique du Studio Sanity.
 *
 * Elle sert à la fois au Studio embarqué dans le site (route /studio) et à la
 * CLI (`npx sanity deploy`) : les schémas ne sont définis qu'une seule fois,
 * dans sanity/. C'est ce qui évite que deux versions divergent.
 */

/**
 * Pages uniques du site. Elles existent en un seul exemplaire, sous un ID fixe
 * (`singleton-homePage`, etc.) auquel le code du site fait directement appel.
 *
 * Les supprimer ou les dupliquer casserait le site sans moyen de les recréer
 * depuis le Studio — on retire donc ces actions de l'interface.
 */
const SINGLETON_TYPES = new Set([
  'homePage',
  'presentationPage',
  'contactPage',
  'navigation',
  'footerContent',
  'siteSettings',
])

const DISABLED_SINGLETON_ACTIONS = new Set(['delete', 'duplicate', 'unpublish'])

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  ''

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production'

export default defineConfig({
  name: 'cie-horme',
  title: 'Cie. Horme',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // NB : sanity-plugin-media a été retiré. Sa distribution ESM est
    // incompatible avec le bundler de Next 14 (exports nommés de
    // react-hook-form non résolus). Le sélecteur d'assets natif de Sanity
    // permet déjà de repiocher une image déjà téléversée.
    presentationTool({
      previewUrl: {
        // `initial` non renseigné => Sanity utilise location.origin, c'est-à-dire
        // le domaine du Studio lui-même. Comme le Studio est embarqué dans le
        // site, l'aperçu vise automatiquement le bon site : localhost:3000 en
        // développement, site-horme.vercel.app en production. Rien à configurer.
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    // Protège les pages uniques : plus de bouton « Supprimer » ni « Dupliquer ».
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(action => !DISABLED_SINGLETON_ACTIONS.has(action.action ?? ''))
        : prev,

    // Les retire aussi du menu « Créer » : on ne doit jamais pouvoir fabriquer
    // une deuxième page d'accueil, qui resterait invisible sur le site.
    newDocumentOptions: prev =>
      prev.filter(template => !SINGLETON_TYPES.has(template.templateId)),
  },
})
