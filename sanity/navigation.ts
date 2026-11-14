import { MenuIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Menu',
  type: 'document',
  icon: MenuIcon,
  description:
    'Les mots du menu en haut à droite du site. Les pages vers lesquelles ils mènent ne changent pas.',
  fields: [
    defineField({
      name: 'creationButtonLabel',
      title: 'Entrée vers les créations',
      type: 'string',
      initialValue: 'Créations',
      validation: Rule => Rule.required().error('Le menu a besoin d’un libellé.'),
    }),
    defineField({
      name: 'presentationLabel',
      title: 'Entrée vers la présentation',
      type: 'string',
      initialValue: 'Présentation',
    }),
    defineField({
      name: 'contactLabel',
      title: 'Entrée vers le contact',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'homeLabel',
      title: 'Entrée vers l’accueil (menu du téléphone)',
      description: 'Sur ordinateur, le logo mène déjà à l’accueil.',
      type: 'string',
      initialValue: 'Accueil',
    }),
  ],
  preview: {
    select: { a: 'creationButtonLabel', b: 'presentationLabel', c: 'contactLabel' },
    prepare: ({ a, b, c }) => ({
      title: 'Menu',
      subtitle: [a || 'Créations', b || 'Présentation', c || 'Contact'].join(', '),
    }),
  },
})
