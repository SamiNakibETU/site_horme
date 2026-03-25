import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site (SEO)',
  type: 'document',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titre (onglet navigateur)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description (référencement)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogTitle',
      title: 'Titre Open Graph (réseaux)',
      type: 'string',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Description Open Graph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
