import { defineField, defineType } from 'sanity'

export const presentationDancerType = defineType({
  name: 'presentationDancer',
  title: '👤 Danseuse / Portrait SEUL',
  type: 'object',
  description:
    '👤 C\'EST ICI les photos DE PERSONNES SEULES! ' +
    'PAS en accueil! Portrait + biographie d\'une danseuse.',
  fields: [
    defineField({
      name: 'portrait',
      title: '📸 Photo portrait SEULE (carrée)',
      description:
        '✅ PHOTOS DE PERSONNES SEULES UNIQUEMENT!\n' +
        '  (Les groupes vont en accueil carrousel)\n\n' +
        '📐 Format: 800x800px MINIMUM\n' +
        '  Aspect: CARRÉ (1:1)\n' +
        '  Type: JPG ou PNG\n\n' +
        '✨ Bien cadrée sur le visage\n' +
        '  NE DOIT PAS être coupée!\n' +
        '  Utilise "hotspot" si besoin de cadrer',
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
        'Fonction. Ex: "Co-fondatrice, chorégraphe", ' +
        '"Danseuse interprète", "Artiste associée"',
      type: 'string'
    }),
    defineField({
      name: 'bio1',
      title: '📝 Biographie — Bloc 1',
      description:
        'Parcours, style, influences, expériences. ' +
        'Peut être plusieurs lignes! Raconte son histoire!',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'bio2',
      title: '📝 Biographie — Bloc 2',
      description:
        'Suite optionnelle. Infos complémentaires ou témoignages.',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'formationTitle',
      title: '🏷️ Titre section formation',
      description: 'Ex: "Formation", "Cursus", "Parcours pédagogique"',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'formationText',
      title: '📝 Texte formation/cursus',
      description: 'École, danse classique/contemporaine, influences, pratiques...',
      type: 'text',
      rows: 4
    }),
  ],
  preview: {
    select: { title: 'name', media: 'portrait' },
    prepare({ title, media }) {
      return {
        title: title ? `👤 ${title}` : '👤 Portrait',
        subtitle: '(Photo seule)',
        media,
      }
    },
  },
})
