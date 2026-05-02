import { defineField, defineType } from 'sanity'

/**
 * DANSEUSE / PORTRAIT
 *
 * Un portrait avec:
 * - Photo carrée du visage
 * - Nom
 * - Rôle/titre
 * - Biographies (2 blocs flexibles)
 * - Formation/parcours
 */
export const presentationDancerType = defineType({
  name: 'presentationDancer',
  title: '👤 Danseuse / Portrait',
  type: 'object',
  description:
    'Un portrait de danseuse avec photo, bio et infos. ' +
    'Utilisez pour Louise, Joséphine, et autres membres de la compagnie.',
  fields: [
    defineField({
      name: 'portrait',
      title: '📸 Photo portrait',
      description:
        'Photo CARRÉE du visage. Format: 800x800px min, JPG/PNG. ' +
        'Bien cadrée sur le visage, pas coupée. Cette photo s\'affiche seule en page Présentation.',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: '✍️ Nom complet',
      description: 'Ex: "Joséphine Hassid-Langlois" ou "Louise Melli"',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: '🏷️ Rôle / Titre',
      description:
        'Fonction ou titre. Ex: "Co-fondatrice, chorégraphe", "Danseuse interprète", "Artiste'
        ' associée"',
      type: 'string'
    }),
    defineField({
      name: 'bio1',
      title: '📝 Biographie — Bloc 1',
      description:
        'Premier bloc de bio. Parlez du parcours, style, influences, expériences. ' +
        'Peut être plusieurs lignes!',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'bio2',
      title: '📝 Biographie — Bloc 2',
      description:
        'Deuxième bloc (optionnel). Suite de la bio ou infos complémentaires.',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'formationTitle',
      title: '🏷️ Titre de la section formation',
      description: 'Ex: "Formation", "Cursus", "Parcours"',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'formationText',
      title: '📝 Texte formation',
      description: 'École, cursus, influences, pratiques. Tout ce qui raconte son apprentissage.',
      type: 'text',
      rows: 4
    }),
  ],
  preview: {
    select: { title: 'name', media: 'portrait' },
    prepare({ title, media }) {
      return { title: title || 'Portrait', media }
    },
  },
})
