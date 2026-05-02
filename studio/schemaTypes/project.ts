import { defineField, defineType } from 'sanity'

/**
 * CRÉATIONS / SPECTACLES
 *
 * Une fiche = un spectacle/création/projet avec:
 * - Infos générales (titre, année, lieu)
 * - Photo de couverture (visible en liste)
 * - Description (texte long)
 * - Galerie complète de photos
 * - Vidéo optionnelle
 */
export const projectType = defineType({
  name: 'project',
  title: '🎭 Spectacle / Création',
  type: 'document',
  description:
    '🎭 Une fiche = une création complète (spectacle, résidence, événement, etc.). ' +
    'Remplissez les infos, puis les photos et vidéo. Après **Publier**, la fiche s\'affiche sur le site.',
  fields: [
    defineField({
      name: 'title',
      title: '✍️ Titre',
      description: 'Nom du spectacle. Ex: "Tout ce qui tremble", "Rann", "Khorrmos"',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '🔗 URL (auto-généré)',
      description: 'Auto-créé depuis le titre. On peut le modifier (lettres minuscules et tirets).',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '🏷️ Sous-titre',
      description: 'Optionnel. Courte description. Ex: "une création de Thomas Brena"',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: '📁 Type de création',
      description: 'Catégorie pour classer. Choisissez dans la liste.',
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
      title: '📅 Année',
      description: 'Année de la création. Ex: 2025',
      type: 'number',
      validation: Rule => Rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: 'location',
      title: '📍 Lieu',
      description: 'Où ça se passe/s\'est passé. Ex: "Paris, Théâtre Douze" ou "Montrouge"',
      type: 'string',
    }),
    defineField({
      name: 'photographer',
      title: '📷 Photographes',
      description: 'Noms des photographes. Ajouter chacun séparément ou "Ysé", "Arthur", etc.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: '📝 Description',
      description:
        'Texte long présentant la création. Peut être plusieurs paragraphes! ' +
        'Parlez de: contexte, sensibilité, ce que c\'est, pourquoi c\'est important.',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'coverImage',
      title: '🖼️ Image de couverture',
      description:
        'IMPORTANTE! Affichée en liste et aperçus. Choisir une image FORTE et lisible en petit. ' +
        'Format: 1200x800px min, JPG/PNG. Doit être claire et attrayante!',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: '📸 Galerie complète de photos',
      description:
        '⭐ Les photos détaillées de la création.\n\n' +
        '💡 Comment ajouter:\n' +
        '1. Cliquez « Ajouter »\n' +
        '2. Sélectionnez une photo\n' +
        '3. Vous pouvez ajouter: crédit photo, description\n' +
        '4. **GLISSEZ** (⋮⋮) pour changer l\'ordre\n' +
        '5. Cliquez « Publier »\n\n' +
        '📸 Format: 1200x800px min, JPG/PNG, bonne qualité.',
      type: 'array',
      of: [{ type: 'galleryItem' }],
    }),
    defineField({
      name: 'video',
      title: '🎬 Vidéo (optionnel)',
      description: 'Vidéo du spectacle/création. Format: MP4. Moins de 100MB recommandé.',
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
