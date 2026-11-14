import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Page d'accueil. Les onglets suivent l'ordre des sections à l'écran.
 * Les noms de champs sont ceux d'origine : les renommer viderait le contenu.
 */
export const homePageType = defineType({
  name: 'homePage',
  title: 'Accueil',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: '1. Vidéo et titre', default: true },
    { name: 'carousel', title: '2. Photos qui défilent' },
    { name: 'manifesto', title: '3. Phrase' },
    { name: 'intro', title: '4. La compagnie' },
    { name: 'imagesBloc', title: '5. Encart' },
    { name: 'creations', title: '6. Créations et dates' },
  ],
  fields: [
    defineField({
      name: 'heroVideo',
      title: 'Vidéo plein écran',
      description:
        'Muette, en boucle. Format MP4 en H.264, moins de 5 Mo. Une vidéo sortie directement ' +
        'd’un iPhone ou de Final Cut est souvent en HEVC : elle s’affiche sur Mac et iPhone ' +
        'mais reste invisible sur Chrome, Firefox et Android. Dans le doute, exportez en ' +
        '« H.264 » ou envoyez-la à Sami pour conversion.',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'hero',
    }),
    defineField({
      name: 'heroPoster',
      title: 'Image d’attente',
      description:
        'S’affiche immédiatement, le temps que la vidéo arrive. Prenez une image proche de ' +
        'la première seconde de la vidéo. Sans elle, l’accueil s’ouvre sur un écran noir.',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      validation: Rule => Rule.required().warning('Sans image d’attente, l’accueil s’ouvre sur un écran noir.'),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Grand titre',
      description: 'Ex. « Compagnie Horrmê ».',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'heroLine1', title: 'Ligne sous le titre', type: 'string', group: 'hero' }),
    defineField({ name: 'heroLine2', title: 'Deuxième ligne (facultative)', type: 'string', group: 'hero' }),

    defineField({
      name: 'slides',
      title: 'Photos qui défilent',
      description:
        'Photos de groupe de préférence ; les portraits vont sur la page Présentation. ' +
        'Glissez plusieurs photos d’un coup sur ce champ. L’ordre ici est l’ordre à l’écran.',
      type: 'array',
      of: [{ type: 'homeSlide' }],
      group: 'carousel',
      validation: Rule => Rule.min(1).warning('Ajoutez au moins une photo.'),
    }),

    defineField({
      name: 'manifestoLine1',
      title: 'Phrase, début',
      description: 'Ex. « Le corps comme ».',
      type: 'string',
      group: 'manifesto',
    }),
    defineField({
      name: 'manifestoAccent',
      title: 'Phrase, fin en couleur',
      description: 'Ex. « langage premier. »',
      type: 'string',
      group: 'manifesto',
    }),
    defineField({ name: 'manifestoCtaLabel', title: 'Lien vers les créations', type: 'string', group: 'manifesto' }),

    defineField({ name: 'introKicker', title: 'Titre de la section', type: 'string', group: 'intro' }),
    defineField({
      name: 'introParagraph1',
      title: 'Texte principal',
      type: 'text',
      rows: 6,
      group: 'intro',
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Texte secondaire',
      description: 'Plus court, affiché en gris.',
      type: 'text',
      rows: 3,
      group: 'intro',
    }),
    defineField({ name: 'introCtaLabel', title: 'Lien vers la présentation', type: 'string', group: 'intro' }),

    defineField({
      name: 'imagesSectionKicker',
      title: 'Titre de l’encart',
      description: 'Laissez les trois champs vides pour masquer l’encart.',
      type: 'string',
      group: 'imagesBloc',
    }),
    defineField({ name: 'imagesSectionBody', title: 'Texte de l’encart', type: 'text', rows: 3, group: 'imagesBloc' }),
    defineField({ name: 'imagesSectionCtaLabel', title: 'Lien de l’encart', type: 'string', group: 'imagesBloc' }),

    defineField({
      name: 'agendaTitle',
      title: 'Titre des prochaines dates',
      description:
        'La section n’apparaît que s’il existe des dates à venir, saisies dans les fiches des créations.',
      type: 'string',
      initialValue: 'Prochaines dates',
      group: 'creations',
    }),
    defineField({
      name: 'creationsKicker',
      title: 'Titre de la liste des créations',
      description: 'L’ordre suit celui des « Créations à la une » (Page Créations).',
      type: 'string',
      group: 'creations',
    }),
    defineField({ name: 'creationsFooterCtaLabel', title: 'Lien sous la liste', type: 'string', group: 'creations' }),
  ],
  preview: { prepare: () => ({ title: 'Accueil' }) },
})
