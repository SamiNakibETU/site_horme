import { defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: '🔗 Menu de navigation',
  type: 'document',
  description:
    'Le menu en haut à droite du site. Il compte trois entrées : Création, ' +
    'Présentation et Contact. Seul le libellé de la première est modifiable ' +
    'ici — les deux autres portent le nom de leur page.',
  fields: [
    defineField({
      name: 'creationButtonLabel',
      title: 'Libellé de l’entrée « Création »',
      description:
        'Le mot affiché dans le menu pour accéder aux créations. ' +
        'Il mène à la page qui les présente toutes.',
      type: 'string',
      initialValue: 'Création',
      validation: Rule => Rule.required().error('Le menu a besoin d’un libellé.'),
    }),
    // Les champs « Groupe 1 », « Sous-menus » et « Autres liens » ont été
    // retirés : ils alimentaient un menu déroulant qui n'existe plus. Les
    // conserver aurait été pire que de les supprimer — quelqu'un les aurait
    // remplis, n'aurait vu aucun effet sur le site, et en aurait conclu que
    // le CMS était cassé. Les créations se gèrent désormais dans « Créations ».
  ],
  preview: {
    select: { title: 'creationButtonLabel' },
    prepare({ title }) {
      return { title: 'Menu de navigation', subtitle: title || 'Création' }
    },
  },
})
