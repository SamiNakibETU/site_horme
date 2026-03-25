import { defineField, defineType } from 'sanity'

/**
 * Un bloc galerie : l’équipe peut réordonner (poignées ⋮⋮), remplacer l’image,
 * ajouter légende / crédit pour l’accessibilité et les mentions photo.
 */
export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'photo',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Description courte',
      description: 'Pour les lecteurs d’écran et le référencement (optionnel mais recommandé).',
      type: 'string',
    }),
    defineField({
      name: 'credit',
      title: 'Crédit photographe',
      description: 'Ex. Ysé, Arthur, Thomas Brena…',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'photo', title: 'credit', subtitle: 'alt' },
    prepare({ media, title, subtitle }) {
      return {
        title: title || 'Image',
        subtitle: subtitle || ' ',
        media,
      }
    },
  },
})
