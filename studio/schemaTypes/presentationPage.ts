import { defineField, defineType } from 'sanity'

export const presentationPageType = defineType({
  name: 'presentationPage',
  title: '👥 Page Présentation',
  type: 'document',
  description:
    'La page où les visiteurs découvrent Joséphine & Louise et voient leurs portraits. Cette page contient aussi les photos de groupe (pas d\'autres photos seules ailleurs).',
  fields: [
    defineField({
      name: 'kicker',
      title: '🏷️ Petit titre (surtitre)',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'title',
      title: '✍️ Titre principal',
      type: 'string',
      initialValue: '',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: '📝 Texte d\'introduction',
      description: 'Texte riche avec possibilité de gras, italique, listes, etc.',
      type: 'blockContent',
    }),
    defineField({
      name: 'dancersSectionTitle',
      title: '🏷️ Titre de la section portraits',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'dancers',
      title: '👥 Portraits (Louise, Joséphine, autres)',
      description: 'Glissez pour changer l\'ordre d\'affichage. Chaque portrait = une photo + nom + biographie.',
      type: 'array',
      of: [{ type: 'presentationDancer' }],
    }),
    defineField({
      name: 'projectsCtaLabel',
      title: '🔗 Texte du lien vers les créations',
      type: 'string',
      initialValue: '',
    }),
  ],
})
