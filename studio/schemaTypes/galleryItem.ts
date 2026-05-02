import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: '📸 Photo de Galerie',
  type: 'object',
  description:
    'Une photo détaillée d\'une création. NE DOIT PAS être coupée! ' +
    'Utilise "hotspot" si besoin d\'ajuster.',
  fields: [
    defineField({
      name: 'photo',
      title: '📸 Image (NE DOIT PAS être coupée!)',
      description:
        '✅ RÈGLES STRICTES:\n\n' +
        '📐 Taille: 1200x800px minimum\n' +
        '  Type: JPG ou PNG\n' +
        '  Qualité: HAUTE (c\'est ce que les visiteurs verront!)\n\n' +
        '⚠️ NE DOIT PAS être coupée aux bords!\n' +
        '  Si oui, utilise l\'outil "hotspot" pour cadrer\n\n' +
        '💡 Conseil: Mets des photos spectaculaires du spectacle!',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: '📝 Description (pour accessibilité)',
      description:
        'Courte description: ce qu\'on voit sur la photo.\n' +
        'Ex: "Joséphine en plein mouvement" ou "Le groupe danse en cercle"\n' +
        'Optionnel mais TRÈS recommandé!',
      type: 'string',
    }),
    defineField({
      name: 'credit',
      title: '📷 Crédit photographe',
      description:
        'Qui a pris la photo? Très important!\n' +
        'Ex: "Ysé Michels", "Arthur Dhahri", "Ysé & Arthur"',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'photo', title: 'credit', subtitle: 'alt' },
    prepare({ media, title, subtitle }) {
      return {
        title: title ? `📷 ${title}` : '📸 Photo',
        subtitle: subtitle || '(pas de description)',
        media,
      }
    },
  },
})
