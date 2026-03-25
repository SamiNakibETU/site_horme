import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Page Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Surtitre',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Nous écrire',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Libellé email',
      type: 'string',
      initialValue: 'Email',
    }),
    defineField({
      name: 'email',
      title: 'Adresse email',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locationLabel',
      title: 'Libellé lieu',
      type: 'string',
      initialValue: 'Basées à',
    }),
    defineField({
      name: 'locationText',
      title: 'Texte lieu',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backLinkLabel',
      title: 'Lien retour',
      type: 'string',
      initialValue: '← Retour à l’index',
    }),
  ],
})
