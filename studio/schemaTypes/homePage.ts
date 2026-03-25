import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Page d’accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'heroVideo',
      title: 'Vidéo plein écran (hero)',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Titre hero',
      type: 'string',
      initialValue: 'Cie. Horme',
    }),
    defineField({
      name: 'heroLine1',
      title: 'Sous-titre hero — ligne 1',
      type: 'string',
    }),
    defineField({
      name: 'heroLine2',
      title: 'Sous-titre hero — ligne 2',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Carrousel / défilement images',
      type: 'array',
      of: [{ type: 'homeSlide' }],
    }),
    defineField({
      name: 'manifestoLine1',
      title: 'Bloc manifesto — ligne 1',
      type: 'string',
    }),
    defineField({
      name: 'manifestoAccent',
      title: 'Bloc manifesto — accent (couleur bleue)',
      type: 'string',
    }),
    defineField({
      name: 'manifestoCtaLabel',
      title: 'Lien « Voir les créations »',
      type: 'string',
      initialValue: 'Voir les créations →',
    }),
    defineField({
      name: 'introKicker',
      title: 'Section intro — surtitre',
      type: 'string',
      initialValue: 'La compagnie',
    }),
    defineField({
      name: 'introParagraph1',
      title: 'Section intro — paragraphe principal',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Section intro — paragraphe secondaire',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introCtaLabel',
      title: 'Section intro — lien',
      type: 'string',
      initialValue: 'Découvrir la compagnie →',
    }),
    defineField({
      name: 'imagesSectionKicker',
      title: 'Bloc images — surtitre',
      type: 'string',
    }),
    defineField({
      name: 'imagesSectionBody',
      title: 'Bloc images — texte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'imagesSectionCtaLabel',
      title: 'Bloc images — lien',
      type: 'string',
    }),
    defineField({
      name: 'creationsKicker',
      title: 'Liste créations — surtitre',
      type: 'string',
      initialValue: 'Créations',
    }),
    defineField({
      name: 'creationsFooterCtaLabel',
      title: 'Liste créations — lien bas de section',
      type: 'string',
      initialValue: 'Toutes les créations →',
    }),
  ],
})
