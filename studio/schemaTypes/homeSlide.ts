import { defineField, defineType } from 'sanity'

export const homeSlideType = defineType({
  name: ‘homeSlide’,
  title: ‘📸 Photo du carrousel’,
  type: ‘object’,
  description: ‘Une photo qui défile dans le carrousel de la page d\’accueil.’,
  fields: [
    defineField({
      name: ‘image’,
      title: ‘📸 Image’,
      description:
        ‘JPG ou PNG. Format: paysage recommandé (16:9). Min 1920px de large. Conseil: éviter les photos coupées au bord du cadre — cadrer avec marges.’,
      type: ‘image’,
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: ‘objectFit’,
      title: ‘🖼️ Comment afficher la photo’,
      type: ‘string’,
      options: {
        list: [
          { title: ‘Remplir tout le cadre (peut couper les bords)’, value: ‘cover’ },
          { title: ‘Voir la photo entière (bandes blanches possibles)’, value: ‘contain’ },
        ],
        layout: ‘radio’,
      },
      initialValue: ‘cover’,
    }),
    defineField({
      name: ‘objectPosition’,
      title: ‘📍 Cadrage (optionnel)’,
      description:
        ‘Défaut: centre. Exemples: « center top » pour le haut, « center 20% » pour baisser le centre.’,
      type: ‘string’,
      initialValue: ‘center’,
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare({ media }) {
      return { title: 'Photo accueil', subtitle: 'Glisser dans la liste pour l’ordre', media }
    },
  },
})
