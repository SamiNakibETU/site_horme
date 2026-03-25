import { defineField, defineType } from 'sanity'

export const presentationDancerType = defineType({
  name: 'presentationDancer',
  title: 'Danseuse / portrait',
  type: 'object',
  fields: [
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'name', title: 'Nom', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'role', title: 'Rôle (sous-titre)', type: 'string' }),
    defineField({ name: 'bio1', title: 'Biographie — bloc 1', type: 'text', rows: 6 }),
    defineField({ name: 'bio2', title: 'Biographie — bloc 2', type: 'text', rows: 6 }),
    defineField({
      name: 'formationTitle',
      title: 'Formation — libellé',
      type: 'string',
      initialValue: 'Formation',
    }),
    defineField({ name: 'formationText', title: 'Formation — texte', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'name', media: 'portrait' },
    prepare({ title, media }) {
      return { title: title || 'Portrait', media }
    },
  },
})
