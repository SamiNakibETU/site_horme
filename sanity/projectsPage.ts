import { StarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Page « Créations ».
 *
 * Avant, le bandeau du haut affichait automatiquement toute création qui avait
 * des photos : impossible d'en retirer une ou d'en mettre une autre en avant
 * sans toucher au code. C'est désormais une liste choisie à la main.
 */
export const projectsPageType = defineType({
  name: 'projectsPage',
  title: 'Page Créations',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'featured',
      title: 'Créations à la une',
      description:
        'Les créations du bandeau en haut de la page Créations, et leurs photos. ' +
        'Cliquez « Ajouter un élément » puis choisissez une création existante. ' +
        'Glissez avec la poignée pour changer l’ordre. ' +
        'Toutes les autres créations restent sur le site, dans la liste « Autres projets ».',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      validation: Rule => [
        Rule.unique().error('Cette création est déjà dans la liste.'),
        Rule.max(5).warning('Au-delà de 5 titres, le bandeau devient difficile à lire sur téléphone.'),
        Rule.min(1).warning('Sans création à la une, le site les affiche toutes.'),
      ],
    }),
    defineField({
      name: 'othersTitle',
      title: 'Titre de la liste des autres créations',
      type: 'string',
      initialValue: 'Autres projets',
    }),
    defineField({
      name: 'openLabel',
      title: 'Lien vers la fiche d’une création',
      type: 'string',
      initialValue: 'Voir la création',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description pour Google',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { a: 'featured.0.title', b: 'featured.1.title', c: 'featured.2.title' },
    prepare: ({ a, b, c }) => ({
      title: 'Page Créations',
      subtitle: [a, b, c].filter(Boolean).join(', ') || 'Aucune création à la une',
    }),
  },
})
