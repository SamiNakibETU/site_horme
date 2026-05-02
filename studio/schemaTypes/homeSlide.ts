import { defineField, defineType } from 'sanity'

export const homeSlideType = defineType({
  name: 'homeSlide',
  title: '📸 Photo du Carrousel (Accueil)',
  type: 'object',
  description: 'Une photo de groupe qui défile dans le carrousel de la page d\'accueil.',
  fields: [
    defineField({
      name: 'image',
      title: '📸 Image',
      description:
        '✅ FORMAT PAYSAGE (16:9) RECOMMANDÉ\n' +
        'Min 1920px de large. JPG ou PNG. PAS coupée aux bords!' ,
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'objectFit',
      title: '🖼️ Comment afficher la photo',
      description:
        '- "Remplir": la photo remplit tout l\'écran (peut couper les bords)\n' +
        '- "Voir entière": on voit la photo complète (peut avoir des bandes blanches)',
      type: 'string',
      options: {
        list: [
          { title: 'Remplir tout le cadre (peut couper les bords)', value: 'cover' },
          { title: 'Voir la photo entière (bandes blanches possibles)', value: 'contain' },
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
    defineField({
      name: 'objectPosition',
      title: '📍 Cadrage (optionnel)',
      description:
        'Si vous choisissez "Remplir", vous pouvez choisir où centrer.\n' +
        'Défaut: "center" (centre). Autres exemples:\n' +
        '- "center top" = montre le haut\n' +
        '- "center 20%" = monte un peu le sujet',
      type: 'string',
      initialValue: 'center',
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare({ media }) {
      return { title: 'Photo du carrousel', subtitle: 'Glisser pour changer l\'ordre', media }
    },
  },
})
