import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Photo de galerie',
  type: 'object',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      description:
        '1200 px de large minimum. Glissez le point du « hotspot » sur le ' +
        'sujet pour qu’il reste visible quel que soit le cadrage.',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required().error('Une photo est nécessaire.'),
    }),
    defineField({
      name: 'alt',
      title: 'Description de la photo',
      description:
        'Ce que l’on voit, en une courte phrase. Ex. « Joséphine en plein saut ».',
      type: 'string',
      validation: Rule =>
        Rule.required().warning(
          'Sans description, la photo est invisible pour les personnes ' +
            'malvoyantes et pour Google.',
        ),
    }),
    defineField({
      name: 'credit',
      title: 'Crédit photo',
      description: 'Qui a pris la photo. Ex. « Ysé Michels ».',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'photo', alt: 'alt', credit: 'credit' },
    prepare({ media, alt, credit }) {
      return {
        title: alt || 'Photo sans description',
        subtitle: credit ? `© ${credit}` : 'Crédit photo manquant',
        media,
      }
    },
  },
})
