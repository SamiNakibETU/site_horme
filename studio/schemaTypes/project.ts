import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: ‘project’,
  title: ‘🎭 Spectacle / Création’,
  type: ‘document’,
  description:
    ‘📍 Une fiche = une création (spectacle, résidence, événement, etc.). Remplissez les infos, ajoutez photos & vidéo. Après **Publier**, la fiche s\’affiche sur le site. Besoin d\’aide? Cliquez sur ❓ à côté des champs.’,
  fields: [
    defineField({
      name: ‘title’,
      title: ‘✍️ Titre’,
      description: ‘Nom du spectacle/création’,
      type: ‘string’,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: ‘slug’,
      title: ‘URL (auto)’,
      description: ‘Auto-généré depuis le titre. On peut le modifier (lettres minuscules et tirets seulement).’,
      type: ‘slug’,
      options: { source: ‘title’, maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: ‘subtitle’,
      title: ‘🏷️ Sous-titre’,
      description: ‘Optionnel. Un petit texte de description rapide.’,
      type: ‘string’,
    }),
    defineField({
      name: ‘type’,
      title: ‘📁 Type de création’,
      description: ‘Catégorie (Festival, Performance, Événement, Résidence, etc.)’,
      type: ‘string’,
      options: {
        list: [
          { title: ‘Festival’, value: ‘Festival’ },
          { title: ‘Performance’, value: ‘Performance’ },
          { title: ‘Événement’, value: ‘Événement’ },
          { title: ‘Résidence’, value: ‘Résidence’ },
        ],
        layout: ‘dropdown’,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: ‘year’,
      title: ‘📅 Année’,
      description: ‘Ex: 2025’,
      type: ‘number’,
      validation: Rule => Rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: ‘location’,
      title: ‘📍 Lieu’,
      description: ‘Ville et salle/festival. Ex: « Paris, Théâtre Douze »’,
      type: ‘string’,
    }),
    defineField({
      name: ‘photographer’,
      title: ‘📷 Photographes’,
      description: ‘Noms séparés par des virgules. Ex: Ysé, Arthur, Thomas Brena’,
      type: ‘array’,
      of: [{ type: ‘string’ }],
    }),
    defineField({
      name: ‘description’,
      title: ‘📝 Description’,
      description: ‘Présentation du spectacle, contexte, sensibilité, etc. Peut être long!’,
      type: ‘text’,
      rows: 5,
    }),
    defineField({
      name: ‘coverImage’,
      title: ‘🖼️ Image de couverture’,
      description: ‘Affichée en liste et aperçus. Choisir une image forte, lisible en petit format. Format: JPG/PNG, min 1200x800px.’,
      type: ‘image’,
      options: { hotspot: true },
    }),
    defineField({
      name: ‘gallery’,
      title: ‘📸 Galerie photos (page du spectacle)’,
      description: ‘⭐ **GLISSEZ** (icône ⋮⋮) pour changer l\’ordre des photos. Chaque ligne = une photo + crédit optionnel.’,
      type: ‘array’,
      of: [{ type: ‘galleryItem’ }],
    }),
    defineField({
      name: ‘video’,
      title: ‘🎬 Vidéo (optionnel)’,
      description: ‘Vidéo MP4 du spectacle. Moins de 100MB recommandé.’,
      type: ‘file’,
      options: { accept: ‘video/*’ },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Sans titre', subtitle: subtitle ? String(subtitle) : '', media }
    },
  },
})
