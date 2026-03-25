import { defineArrayMember, defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Menu principal',
  type: 'document',
  fields: [
    defineField({
      name: 'creationButtonLabel',
      title: 'Libellé bouton Création',
      type: 'string',
      initialValue: 'Création',
    }),
    defineField({
      name: 'trembleGroupTitle',
      title: 'Création — groupe 1 (surtitre)',
      type: 'string',
      initialValue: 'Tout ce qui tremble',
    }),
    defineField({
      name: 'trembleLinks',
      title: 'Création — liens groupe 1',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trembleMenuLink',
          fields: [
            defineField({ name: 'label', title: 'Libellé', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'href', title: 'URL (chemin)', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'directLinks',
      title: 'Création — liens groupe 2 (sans surtitre)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'directMenuLink',
          fields: [
            defineField({ name: 'label', title: 'Libellé', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'href', title: 'URL (chemin)', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
  ],
})
