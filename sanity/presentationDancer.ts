import { defineField, defineType } from 'sanity'

export const presentationDancerType = defineType({
  name: 'presentationDancer',
  title: 'Danseuse',
  type: 'object',
  description: 'Portrait et biographie d’une danseuse de la compagnie.',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      description: 'Ex. « Joséphine Hassid-Langlois ».',
      type: 'string',
      validation: Rule => Rule.required().error('Le nom est nécessaire.'),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      description: 'Ex. « Co-fondatrice, chorégraphe ».',
      type: 'string',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      description:
        'Photo carrée, 800 × 800 px minimum. Placez le point du « hotspot » ' +
        'sur le visage pour qu’il reste centré à tous les formats.',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required().error('Un portrait est nécessaire.'),
    }),
    defineField({
      name: 'bio1',
      title: 'Biographie',
      description: 'Parcours, formation, influences.',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'bio2',
      title: 'Biographie — suite',
      description: 'Facultatif. À utiliser si le texte ci-dessus devient trop long.',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'formationTitle',
      title: 'Titre du bloc formation',
      description: 'Ex. « Formation ». Laissez vide pour masquer ce bloc.',
      type: 'string',
    }),
    defineField({
      name: 'formationText',
      title: 'Formation',
      description: 'Écoles, disciplines, pratiques.',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait' },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Danseuse sans nom',
        subtitle: subtitle || 'Rôle non renseigné',
        media,
      }
    },
  },
})
