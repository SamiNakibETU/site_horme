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
    .title('Contenu')
    .items([
      singletonListItem(S, 'siteSettings', 'Paramètres & SEO', SANITY_SINGLETON_IDS.siteSettings),
      singletonListItem(S, 'navigation', 'Menu', SANITY_SINGLETON_IDS.navigation),
      singletonListItem(S, 'footerContent', 'Pied de page', SANITY_SINGLETON_IDS.footerContent),
      S.divider(),
      singletonListItem(S, 'homePage', 'Accueil', SANITY_SINGLETON_IDS.homePage),
      singletonListItem(S, 'presentationPage', 'Présentation', SANITY_SINGLETON_IDS.presentationPage),
      singletonListItem(S, 'contactPage', 'Contact', SANITY_SINGLETON_IDS.contactPage),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item => !['siteSettings', 'navigation', 'footerContent', 'homePage', 'presentationPage', 'contactPage'].includes(item.getId() || ''),
      ),
    ])
