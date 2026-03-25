import { defineField, defineType } from 'sanity'

export const presentationPageType = defineType({
  name: 'presentationPage',
  title: 'Page Présentation',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Surtitre',
      type: 'string',
      initialValue: 'La compagnie',
    }),
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Cie. Horme',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction (texte riche)',
      type: 'blockContent',
    }),
    defineField({
      name: 'dancersSectionTitle',
      title: 'Surtitre section portraits',
      type: 'string',
      initialValue: 'Les danseuses',
    }),
    defineField({
      name: 'dancers',
      title: 'Portraits',
      type: 'array',
      of: [{ type: 'presentationDancer' }],
    }),
    defineField({
      name: 'projectsCtaLabel',
      title: 'Lien vers les projets',
      type: 'string',
      initialValue: 'Voir les projets →',
    }),
  ],
})
