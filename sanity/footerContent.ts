import { defineArrayMember, defineField, defineType } from 'sanity'

export const footerContentType = defineType({
  name: 'footerContent',
  title: 'Pied de page',
  type: 'document',
  fields: [
    defineField({
      name: 'brandLine',
      title: 'Marque (ligne 1, ex. Cie.)',
      type: 'string',
    }),
    defineField({
      name: 'brandAccent',
      title: 'Mot en bleu dans la marque',
      type: 'string',
      initialValue: 'Horme',
    }),
    defineField({
      name: 'tagline',
      title: 'Sous-marque',
      type: 'string',
    }),
    defineField({
      name: 'navColumnTitle',
      title: 'Colonne navigation — titre',
      type: 'string',
      initialValue: 'Navigation',
    }),
    defineField({
      name: 'navLinks',
      title: 'Liens navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({ name: 'label', title: 'Libellé', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'href', title: 'URL', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'followColumnTitle',
      title: 'Colonne suivre — titre',
      type: 'string',
      initialValue: 'Suivre',
    }),
    defineField({
      name: 'instagramLabel',
      title: 'Libellé Instagram',
      type: 'string',
      initialValue: 'Instagram',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'URL Instagram',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email (affiché)',
      type: 'string',
    }),
    defineField({
      name: 'asideTagline',
      title: 'Citation à droite',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
    }),
  ],
})
