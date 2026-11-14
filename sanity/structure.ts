import {
  CogIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HelpCircleIcon,
  HomeIcon,
  MenuIcon,
  ProjectsIcon,
  StarIcon,
  UsersIcon,
  BlockElementIcon,
} from '@sanity/icons'
import type { ComponentType } from 'react'
import type { StructureResolver } from 'sanity/structure'
import { Guide } from './Guide'
import { SANITY_SINGLETON_IDS as IDS } from './singletonIds'

type S = Parameters<StructureResolver>[0]

const single = (S: S, type: string, title: string, id: string, icon: ComponentType) =>
  S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(id).title(title))

/**
 * Menu du Studio, dans l'ordre où l'on s'en sert : les créations d'abord
 * (ce qu'on modifie le plus souvent), puis les pages, puis les réglages.
 */
export const structure: StructureResolver = S =>
  S.list()
    .title('Site de la compagnie')
    .items([
      S.listItem()
        .title('Créations')
        .id('creations')
        .icon(ProjectsIcon)
        .child(
          S.documentTypeList('project')
            .title('Créations')
            .defaultOrdering([{ field: 'year', direction: 'desc' }]),
        ),
      single(S, 'projectsPage', 'Créations à la une', IDS.projectsPage, StarIcon),

      S.divider(),

      single(S, 'homePage', 'Accueil', IDS.homePage, HomeIcon),
      single(S, 'presentationPage', 'Présentation', IDS.presentationPage, UsersIcon),
      single(S, 'contactPage', 'Contact', IDS.contactPage, EnvelopeIcon),
      single(S, 'legalPage', 'Mentions légales', IDS.legalPage, DocumentTextIcon),

      S.divider(),

      single(S, 'siteSettings', 'Réglages : polices, couleur, Google', IDS.siteSettings, CogIcon),
      single(S, 'navigation', 'Menu', IDS.navigation, MenuIcon),
      single(S, 'footerContent', 'Pied de page', IDS.footerContent, BlockElementIcon),

      S.divider(),

      S.listItem()
        .title('Mode d’emploi')
        .id('guide')
        .icon(HelpCircleIcon)
        .child(S.component(Guide).id('guide-view').title('Mode d’emploi')),
    ])
