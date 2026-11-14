import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { defineLocations, presentationTool } from 'sanity/presentation'
import { schemaTypes, SINGLETON_TYPES } from './sanity'
import { structure } from './sanity/structure'

/**
 * Configuration unique du Studio Sanity, partagée par le Studio embarqué
 * (route /studio) et la CLI (`npx sanity deploy`).
 */

/** Les pages uniques ne se suppriment ni ne se dupliquent : le site les lit par leur ID. */
const DISABLED_SINGLETON_ACTIONS = new Set(['delete', 'duplicate', 'unpublish'])

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'

/** Où chaque document apparaît sur le site, pour l'onglet « Aperçu ». */
const page = (title: string, href: string) => defineLocations({ message: undefined, locations: [{ title, href }] })
const everywhere = defineLocations({
  message: 'Ce réglage s’applique à toutes les pages du site.',
  locations: [{ title: 'Accueil', href: '/' }],
})

export default defineConfig({
  name: 'cie-horrme',
  title: 'Compagnie Horrmê',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure, title: 'Contenu' }),
    presentationTool({
      title: 'Aperçu',
      previewUrl: {
        // Studio embarqué : l'aperçu vise le domaine du Studio lui-même,
        // en local comme en production. Rien à configurer.
        previewMode: { enable: '/api/draft-mode/enable', disable: '/api/draft-mode/disable' },
      },
      resolve: {
        locations: {
          homePage: page('Accueil', '/'),
          projectsPage: page('Créations', '/projets'),
          presentationPage: page('Présentation', '/presentation'),
          contactPage: page('Contact', '/contact'),
          legalPage: page('Mentions légales', '/mentions-legales'),
          siteSettings: everywhere,
          navigation: everywhere,
          footerContent: everywhere,
          project: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: doc =>
              doc?.slug
                ? {
                    locations: [
                      { title: doc.title || 'Création', href: `/projets/${doc.slug}` },
                      { title: 'Page Créations', href: '/projets' },
                      { title: 'Accueil', href: '/' },
                    ],
                  }
                : { message: 'Générez l’adresse de la page (onglet Informations) pour la prévisualiser.' },
          }),
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    // Les pages uniques n'apparaissent pas dans le menu « Créer ».
    templates: prev => prev.filter(t => !SINGLETON_TYPES.has(t.schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(a => !DISABLED_SINGLETON_ACTIONS.has(a.action ?? ''))
        : prev,
    newDocumentOptions: prev => prev.filter(t => !SINGLETON_TYPES.has(t.templateId)),
  },
})
