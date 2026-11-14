import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Mentions légales. Obligatoires pour tout site édité en France (loi pour la
 * confiance dans l'économie numérique, article 6) : identité de l'éditeur,
 * directeur de la publication, hébergeur.
 */
export const legalPageType = defineType({
  name: 'legalPage',
  title: 'Mentions légales',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'publisher',
      title: 'Éditeur du site',
      description:
        'Nom de l’association, adresse du siège, numéro RNA ou SIRET. ' +
        'Ex. « Association Compagnie Horrmê, 12 rue …, 75011 Paris. RNA W751… ».',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'director',
      title: 'Directrice ou directeur de la publication',
      description: 'En général la personne qui préside l’association.',
      type: 'string',
    }),
    defineField({ name: 'contactEmail', title: 'E-mail de contact', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Texte complémentaire',
      description: 'Crédits photo généraux, conditions d’utilisation des images, etc.',
      type: 'blockContent',
    }),
  ],
  preview: { prepare: () => ({ title: 'Mentions légales' }) },
})
