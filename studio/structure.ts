import type { StructureResolver } from 'sanity/structure'
import { SANITY_SINGLETON_IDS } from './singletonIds'

const singletonListItem = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  id: string,
) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(typeName).documentId(id))

export const structure: StructureResolver = S =>
  S.list()
    .title(‘📍 Contenu du site Horrmê’)
    .items([
      // ===== PAGES PRINCIPALES =====
      S.listItem()
        .title(‘📄 PAGES PRINCIPALES’)
        .id(‘pages-groupe’)
        .child(
          S.list()
            .title(‘Pages du site’)
            .items([
              singletonListItem(
                S,
                ‘homePage’,
                ‘🏠 Accueil’,
                SANITY_SINGLETON_IDS.homePage,
              ),
              singletonListItem(
                S,
                ‘presentationPage’,
                ‘👥 Présentation’,
                SANITY_SINGLETON_IDS.presentationPage,
              ),
              singletonListItem(
                S,
                ‘contactPage’,
                ‘✉️ Contact’,
                SANITY_SINGLETON_IDS.contactPage,
              ),
            ]),
        ),

      S.divider(),

      // ===== CRÉATIONS =====
      S.listItem()
        .title(‘🎭 CRÉATIONS (Spectacles & Projets)’)
        .id(‘creations’)
        .child(S.documentTypeList(‘project’).title(‘🎭 Créations’)),

      S.divider(),

      // ===== CONFIGURATION =====
      S.listItem()
        .title(‘⚙️ CONFIGURATION DU SITE’)
        .id(‘config-groupe’)
        .child(
          S.list()
            .title(‘Configuration’)
            .items([
              singletonListItem(
                S,
                ‘navigation’,
                ‘🔗 Menu de navigation (haut du site)’,
                SANITY_SINGLETON_IDS.navigation,
              ),
              singletonListItem(
                S,
                ‘footerContent’,
                ‘👣 Pied de page’,
                SANITY_SINGLETON_IDS.footerContent,
              ),
              singletonListItem(
                S,
                ‘siteSettings’,
                ‘🔍 Référencement & SEO’,
                SANITY_SINGLETON_IDS.siteSettings,
              ),
            ]),
        ),
    ])
