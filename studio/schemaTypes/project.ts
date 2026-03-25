import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Création',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Festival', value: 'Festival' },
          { title: 'Performance', value: 'Performance' },
          { title: 'Événement', value: 'Événement' },
          { title: 'Résidence', value: 'Résidence' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
      validation: Rule => Rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'photographer',
      title: 'Photographe(s)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      description: 'Affichée en liste et aperçus. Choisir une image forte, lisible en petit format.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie (page spectacle)',
      description:
        'Glisser-déposer les lignes pour changer l’ordre sur le site. Chaque ligne = une image + crédit / légende optionnels.',
      type: 'array',
      of: [{ type: 'galleryItem' }],
    }),
    defineField({
      name: 'video',
      title: 'Vidéo',
      type: 'file',
      options: { accept: 'video/*' },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Sans titre', subtitle: subtitle ? String(subtitle) : '', media }
    },
  },
})
