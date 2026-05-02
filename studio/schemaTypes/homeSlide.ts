import { defineField, defineType } from 'sanity'

export const homeSlideType = defineType({
  name: 'homeSlide',
  title: '📸 Photo du Carrousel (Accueil)',
  type: 'object',
  description:
    '⭐ GROUPE SEULEMENT! Pas de photos de personnes seules ici! ' +
    'Les solos vont en page PRÉSENTATION.',
  fields: [
    defineField({
      name: 'image',
      title: '📸 Image DE GROUPE',
      description:
        '✅ RÈGLES STRICTES:\n\n' +
        '⭐ PHOTOS DE GROUPE UNIQUEMENT - PAS DE SOLOS!\n' +
        '  Les photos seules vont en page PRÉSENTATION\n\n' +
        '📐 Format: 1920x1280px minimum\n' +
        '  Aspect ratio: 16:9 (paysage préféré)\n' +
        '  Type: JPG ou PNG\n\n' +
        '⚠️ NE DOIT PAS être coupée!\n' +
        '  Utilise l\'outil "hotspot" si besoin de cadrer\n\n' +
        '💡 Conseil: Mets des photos qui montrent l\'énergie du groupe!',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'objectFit',
      title: '🖼️ Comment afficher la photo',
      description:
        '- "Remplir": la photo remplit tout l\'écran (peut couper les bords)\n' +
        '- "Voir entière": on voit la photo complète (peut avoir des bandes blanches)\n\n' +
        'Conseil: "Remplir" pour plus d\'impact, mais évite les crops!',
      type: 'string',
      options: {
        list: [
          { title: 'Remplir tout le cadre (peut couper)', value: 'cover' },
          { title: 'Voir la photo entière (bandes blanches)', value: 'contain' },
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
    defineField({
      name: 'objectPosition',
      title: '📍 Cadrage (optionnel)',
      description:
        'Défaut: "center" (centre). Si la photo est coupée, utilise ce champ:\n' +
        '- "center top" = montre le haut\n' +
        '- "center bottom" = montre le bas\n' +
        '- "center 20%" = monte un peu le sujet',
      type: 'string',
      initialValue: 'center',
    }),
  ],
  preview: {
    select: { media: 'image', objectFit: 'objectFit' },
    prepare({ media, objectFit }) {
      return {
        title: '📸 Photo de groupe',
        subtitle: `Affichage: ${objectFit === 'contain' ? 'voir entière' : 'remplir'}`,
        media,
      }
    },
  },
})
