import { defineField, defineType } from ‘sanity’

export const galleryItemType = defineType({
  name: ‘galleryItem’,
  title: ‘📸 Image de galerie’,
  type: ‘object’,
  description: ‘Une photo de la galerie d\’un spectacle. Vous pouvez ajouter un crédit photographe et description.’,
  fields: [
    defineField({
      name: ‘photo’,
      title: ‘📸 Image’,
      description: ‘JPG/PNG. Min 1200x800px. Doit être en bonne qualité!’,
      type: ‘image’,
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: ‘alt’,
      title: ‘📝 Description courte’,
      description: ‘Pour les lecteurs d\’écran et le SEO (ce qui se passe sur la photo). Optionnel mais recommandé.’,
      type: ‘string’,
    }),
    defineField({
      name: ‘credit’,
      title: ‘📷 Crédit photographe’,
      description: ‘Nom du/des photographe(s). Ex: « Ysé Michels », « Arthur Dhahri & Ysé »’,
      type: ‘string’,
    }),
  ],
  preview: {
    select: { media: ‘photo’, title: ‘credit’, subtitle: ‘alt’ },
    prepare({ media, title, subtitle }) {
      return {
        title: title || ‘Image’,
        subtitle: subtitle || ‘ ‘,
        media,
      }
    },
  },
})
