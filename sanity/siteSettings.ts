import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { ACCENT_OPTIONS, FONT_OPTIONS } from '../lib/fontOptions'

/**
 * Réglages qui valent pour tout le site : nom, polices, couleur, référencement.
 *
 * Les champs de référencement gardent leurs noms d'origine (metaTitle…) pour
 * ne pas perdre de contenu existant.
 */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'identite', title: 'Identité', default: true },
    { name: 'typo', title: 'Polices et couleur' },
    { name: 'seo', title: 'Google et partage' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom de la compagnie',
      description:
        'Utilisé dans l’onglet du navigateur, sur Google et dans les aperçus de partage. ' +
        'Ex. « Compagnie Horrmê ».',
      type: 'string',
      group: 'identite',
      initialValue: 'Compagnie Horrmê',
    }),

    defineField({
      name: 'fontDisplay',
      title: 'Police des titres',
      description:
        'Grand titre de l’accueil, titres de pages, noms des créations. ' +
        'Le changement s’applique à tout le site après « Publier ». ' +
        'Astuce : essayez d’abord dans l’onglet Aperçu, sans publier.',
      type: 'string',
      group: 'typo',
      options: { list: FONT_OPTIONS.map(o => ({ title: o.title, value: o.value })) },
      initialValue: 'ribes',
    }),
    defineField({
      name: 'fontText',
      title: 'Police du texte',
      description: 'Paragraphes, menu, légendes. Peut être la même que celle des titres.',
      type: 'string',
      group: 'typo',
      options: {
        list: FONT_OPTIONS.filter(o => o.value !== 'instrument-serif').map(o => ({
          title: o.title,
          value: o.value,
        })),
      },
      initialValue: 'ribes',
    }),
    defineField({
      name: 'customFont',
      title: 'Ma propre police',
      description:
        'Facultatif. Si vous avez acheté ou téléchargé une police, envoyez ici son fichier ' +
        '(.woff2 de préférence, sinon .woff, .otf ou .ttf), puis choisissez ' +
        '« Ma propre police » dans les menus ci-dessus. Vérifiez que la licence ' +
        'autorise un usage sur un site web.',
      type: 'file',
      group: 'typo',
      options: { accept: '.woff2,.woff,.otf,.ttf' },
    }),
    defineField({
      name: 'customFontBold',
      title: 'Ma propre police : version plus épaisse',
      description:
        'Facultatif. Utilisée pour le menu et les petites capitales. Sans elle, le ' +
        'navigateur épaissit la police lui-même.',
      type: 'file',
      group: 'typo',
      options: { accept: '.woff2,.woff,.otf,.ttf' },
      hidden: ({ document }) => !document?.customFont,
    }),
    defineField({
      name: 'accentColor',
      title: 'Couleur d’accent',
      description: 'La couleur des liens, du mot mis en avant sur l’accueil et des éléments actifs.',
      type: 'string',
      group: 'typo',
      options: {
        list: [
          ...ACCENT_OPTIONS.map(o => ({ title: o.title, value: o.value })),
          { title: 'Autre couleur (code ci-dessous)', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: '#1C4CF4',
    }),
    defineField({
      name: 'accentCustom',
      title: 'Code de la couleur',
      description:
        'Au format #RRVVBB, ex. #1C4CF4. Choisissez une couleur assez foncée : ' +
        'elle doit rester lisible sur fond blanc.',
      type: 'string',
      group: 'typo',
      hidden: ({ document }) => document?.accentColor !== 'custom',
      validation: Rule =>
        Rule.regex(/^#[0-9a-fA-F]{6}$/, { name: 'couleur' }).error('Format attendu : # suivi de 6 caractères.'),
    }),

    defineField({
      name: 'metaTitle',
      title: 'Titre affiché par Google (page d’accueil)',
      description:
        'Environ 60 caractères. Ex. « Compagnie Horrmê, danse contemporaine à Paris ». ' +
        'Les autres pages composent leur titre seules : « Présentation | Compagnie Horrmê ».',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.max(70).warning('Au-delà de 70 caractères, Google coupe le titre.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description affichée par Google',
      description: 'Une ou deux phrases, 160 caractères au plus.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: Rule => Rule.max(170).warning('Au-delà de 160 caractères, Google coupe la description.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image de partage',
      description:
        'L’image qui apparaît quand on colle le lien du site dans WhatsApp, Instagram ou un e-mail. ' +
        'Format paysage, 1200 × 630 px. Chaque création utilise sa propre photo de couverture.',
      type: 'image',
      options: { hotspot: true },
      group: 'seo',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Titre de partage (facultatif)',
      description: 'Si vide, le titre Google est repris.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Description de partage (facultatif)',
      description: 'Si vide, la description Google est reprise.',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Réglages du site', subtitle: 'Nom, polices, couleur, Google' }),
  },
})
