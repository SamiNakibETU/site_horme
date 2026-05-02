import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: '📸 Photo de Galerie',
  type: 'object',
  description:
    'Une photo détaillée d\'une création. S\'affiche dans la galerie complète du spectacle.',
  fields: [
    defineField({
      name: 'photo',
      title: '📸 Image',
      description:
        'Photo haute qualité du spectacle. Min 1200x800px. JPG/PNG. ' +
        'Doit être claire, nette et intéressante.',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: '📝 Description (pour accessibilité)',
      description:
        'Courte description: ce qui se passe sur la photo. ' +
        'Ex: "Joséphine en plein mouvement". Optionnel mais recommandé.',
      type: 'string',
    }),
    defineField({
      name: 'credit',
      title: '📷 Crédit photographe',
      description:
        'Nom du/des photographe(s). Ex: "Ysé Michels", "Arthur Dhahri", "Ysé & Arthur"',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'photo', title: 'credit', subtitle: 'alt' },
    prepare({ media, title, subtitle }) {
      return {
        title: title || 'Photo',
        subtitle: subtitle || '(sans description)',
        media,
      }
    },
  },
})
