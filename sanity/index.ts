import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContent'
import { contactPageType } from './contactPage'
import { footerContentType } from './footerContent'
import { galleryItemType } from './galleryItem'
import { homePageType } from './homePage'
import { homeSlideType } from './homeSlide'
import { legalPageType } from './legalPage'
import { navigationType } from './navigation'
import { presentationDancerType } from './presentationDancer'
import { presentationPageType } from './presentationPage'
import { projectsPageType } from './projectsPage'
import { projectType } from './project'
import { siteSettingsType } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContentType,
  homeSlideType,
  presentationDancerType,
  galleryItemType,
  siteSettingsType,
  navigationType,
  footerContentType,
  homePageType,
  projectsPageType,
  presentationPageType,
  contactPageType,
  legalPageType,
  projectType,
]

/** Types qui n'existent qu'en un exemplaire. */
export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'navigation',
  'footerContent',
  'homePage',
  'projectsPage',
  'presentationPage',
  'contactPage',
  'legalPage',
])
