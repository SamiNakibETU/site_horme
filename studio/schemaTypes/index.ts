import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContent'
import { contactPageType } from './contactPage'
import { footerContentType } from './footerContent'
import { galleryItemType } from './galleryItem'
import { homePageType } from './homePage'
import { homeSlideType } from './homeSlide'
import { navigationType } from './navigation'
import { presentationDancerType } from './presentationDancer'
import { presentationPageType } from './presentationPage'
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
  presentationPageType,
  contactPageType,
  projectType,
]
