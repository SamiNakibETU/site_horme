import { defineField, defineType } from 'sanity'

export const homeSlideType = defineType({
  name: 'homeSlide',
  title: 'Photo du carrousel',
  type: 'object',
  description:
    'Photos de groupe qui défilent sur la page d’accueil. Les portraits ' +
    'individuels vont sur la page Présentation.',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      description:
        'Format paysage, 1920 px de large minimum. Glissez le point du ' +
        '« hotspot » sur le sujet pour qu’il reste visible à tous les écrans.',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required().error('Une photo est nécessaire.'),
    }),
    defineField({
      name: 'alt',
      title: 'Description de la photo',
      description:
        'Ce que l’on voit, en une courte phrase. Lu par les lecteurs d’écran ' +
        'et affiché si la photo ne charge pas. Ex. « Les cinq danseuses en cercle ».',
      type: 'string',
      validation: Rule =>
        Rule.required().warning(
          'Sans description, la photo est invisible pour les personnes ' +
            'malvoyantes et pour Google.',
        ),
    }),
    defineField({
      name: 'objectFit',
      title: 'Affichage',
      description:
        'Remplir donne plus d’impact mais peut rogner les bords. Entière ' +
        'garantit qu’on voit toute la photo.',
      type: 'string',
      options: {
        list: [
          { title: 'Remplir le cadre (peut rogner les bords)', value: 'cover' },
          { title: 'Photo entière (bandes sur les côtés)', value: 'contain' },
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
    defineField({
      name: 'objectPosition',
      title: 'Cadrage',
      description:
        'À ajuster seulement si la photo est mal rognée. ' +
        '« center top » montre le haut, « center bottom » le bas.',
      type: 'string',
      initialValue: 'center',
    }),
  ],
  preview: {
    select: { media: 'image', alt: 'alt', objectFit: 'objectFit' },
    prepare({ media, alt, objectFit }) {
      return {
        title: alt || 'Photo sans description',
        subtitle: objectFit === 'contain' ? 'Photo entière' : 'Remplit le cadre',
        media,
      }
    },
  },
})
