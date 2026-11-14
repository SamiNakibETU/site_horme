import { CalendarIcon, ProjectsIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Une création : spectacle, performance, résidence, événement.
 *
 * Les dates de représentation sont rattachées à la création (champ
 * `performances`) : « Tout ce qui tremble » au Théâtre Douze puis au Regard du
 * Cygne est UNE création jouée deux fois, pas deux créations.
 */
export const projectType = defineType({
  name: 'project',
  title: 'Création',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    { name: 'infos', title: 'Informations', default: true },
    { name: 'texte', title: 'Texte' },
    { name: 'images', title: 'Photos et vidéo' },
    { name: 'dates', title: 'Dates' },
    { name: 'equipe', title: 'Équipe et liens' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      description: 'Ex. « Tout ce qui tremble », « Khorrmo(s) ».',
      type: 'string',
      group: 'infos',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse de la page',
      description:
        'Se remplit avec « Générer ». Minuscules et tirets. À ne plus changer une fois la ' +
        'page partagée : l’ancien lien ne marcherait plus.',
      type: 'slug',
      group: 'infos',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      description: 'Facultatif. Ex. « pièce pour cinq interprètes ».',
      type: 'string',
      group: 'infos',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      group: 'infos',
      options: {
        list: ['Spectacle', 'Performance', 'Création en cours', 'Résidence', 'Festival', 'Événement', 'Atelier'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
      group: 'infos',
      validation: Rule => Rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: 'location',
      title: 'Lieu principal',
      description: 'Facultatif si les dates sont renseignées. Ex. « Théâtre Douze, Paris ».',
      type: 'string',
      group: 'infos',
    }),

    defineField({
      name: 'description',
      title: 'Résumé',
      description:
        'Deux ou trois phrases. Affiché en tête de la fiche, et repris par Google et dans ' +
        'les aperçus de partage.',
      type: 'text',
      rows: 4,
      group: 'texte',
      validation: Rule => Rule.max(400).warning('Gardez le résumé court ; le texte complet va en dessous.'),
    }),
    defineField({
      name: 'body',
      title: 'Texte complet',
      description: 'Note d’intention, propos, contexte. Gras, italique, intertitres et liens possibles.',
      type: 'blockContent',
      group: 'texte',
    }),

    defineField({
      name: 'coverImage',
      title: 'Photo de couverture',
      description:
        'Utilisée sur l’accueil, dans les aperçus de partage et en tête de liste. ' +
        'Si vide, la première photo de la galerie est utilisée.',
      type: 'image',
      options: { hotspot: true },
      group: 'images',
    }),
    defineField({
      name: 'photographer',
      title: 'Photographes',
      description: 'Un nom par ligne. Affiché sous les photos.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'images',
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie',
      description:
        'Glissez plusieurs photos d’un coup sur ce champ pour les ajouter ensemble. ' +
        'L’ordre ici est l’ordre sur le site.',
      type: 'array',
      of: [{ type: 'galleryItem' }],
      options: { layout: 'grid' },
      group: 'images',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Vidéo YouTube ou Vimeo',
      description:
        'Collez le lien de la vidéo (teaser, captation). C’est la solution conseillée : ' +
        'la vidéo se charge vite et ne pèse rien pour le site.',
      type: 'url',
      group: 'images',
      validation: Rule =>
        Rule.uri({ scheme: ['https'] }).custom(v =>
          !v || /youtube\.com|youtu\.be|vimeo\.com/.test(v) ? true : 'Lien YouTube ou Vimeo attendu.',
        ),
    }),
    defineField({
      name: 'video',
      title: 'Fichier vidéo (si pas de lien)',
      description: 'MP4 en H.264, moins de 50 Mo. Préférez un lien YouTube ou Vimeo.',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'images',
    }),

    defineField({
      name: 'performances',
      title: 'Dates de représentation',
      description:
        'Une ligne par date. Les dates à venir apparaissent aussi sur l’accueil. ' +
        'Une date passée reste sur la fiche, dans l’historique.',
      type: 'array',
      group: 'dates',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'performance',
          icon: CalendarIcon,
          fields: [
            defineField({ name: 'date', title: 'Date', type: 'date', validation: Rule => Rule.required() }),
            defineField({ name: 'time', title: 'Heure', description: 'Facultatif. Ex. « 20h30 ».', type: 'string' }),
            defineField({ name: 'venue', title: 'Lieu', description: 'Ex. « Théâtre Douze ».', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'city', title: 'Ville', type: 'string' }),
            defineField({ name: 'note', title: 'Précision', description: 'Facultatif. Ex. « sortie de résidence », « complet ».', type: 'string' }),
            defineField({ name: 'ticketUrl', title: 'Lien de réservation', type: 'url' }),
          ],
          preview: {
            select: { date: 'date', venue: 'venue', city: 'city' },
            prepare: ({ date, venue, city }) => ({
              title: [venue, city].filter(Boolean).join(', ') || 'Lieu à préciser',
              subtitle: date
                ? new Date(`${date}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Date à préciser',
            }),
          },
        }),
      ],
    }),

    defineField({
      name: 'credits',
      title: 'Distribution et équipe',
      description: 'Ex. « Chorégraphie » : « Louise Melli, Joséphine Hassid-Langlois ».',
      type: 'array',
      group: 'equipe',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'credit',
          fields: [
            defineField({ name: 'role', title: 'Rôle', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'names', title: 'Noms', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: { select: { title: 'role', subtitle: 'names' } },
        }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Liens',
      description: 'Articles de presse, page du lieu, entretien…',
      type: 'array',
      group: 'equipe',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectLink',
          fields: [
            defineField({ name: 'label', title: 'Texte du lien', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'url', title: 'Adresse', type: 'url', validation: Rule => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'dossier',
      title: 'Dossier de la création (PDF)',
      description: 'Facultatif. Proposé en téléchargement sur la fiche.',
      type: 'file',
      options: { accept: 'application/pdf' },
      group: 'equipe',
    }),
  ],
  orderings: [
    { title: 'Année, récentes d’abord', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Titre', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', year: 'year', type: 'type', media: 'coverImage', g: 'gallery.0.photo' },
    prepare: ({ title, year, type, media, g }) => ({
      title: title || 'Sans titre',
      subtitle: [type, year].filter(Boolean).join(', '),
      media: media || g,
    }),
  },
})
