import { defineField, defineType } from 'sanity'

export const presentationDancerType = defineType({
  name: 'presentationDancer',
  title: '👤 Danseuse / Portrait',
  type: 'object',
  description: 'Un portrait avec photo, nom, biographie. Utilisez pour Louise, Joséphine, et autres danseuses.',
  fields: [
    defineField({
      name: 'portrait',
      title: '📸 Photo portrait',
      description: 'Photo carrée ou légèrement rectangulaire. JPG/PNG, min 800x800px. Conseil: bien cadrée sur le visage.',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: '✍️ Nom',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: '🏷️ Rôle ou titre (sous-titre)',
      description: 'Ex: « Chorégraphe, danseur », « Co-fondatrice »',
      type: 'string'
    }),
    defineField({
      name: 'bio1',
      title: '📝 Biographie — première partie',
      description: 'Texte libre. Peut inclure parcours, style, etc.',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'bio2',
      title: '📝 Biographie — deuxième partie',
      description: 'Suite optionnelle. Peut rester vide.',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'formationTitle',
      title: '🏷️ Titre de la section formation',
      description: 'Titre du bloc formation (ex: "Formation", "Parcours", etc.)',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'formationText',
      title: '📝 Texte formation',
      description: 'Cursus, écoles, influences, etc.',
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
