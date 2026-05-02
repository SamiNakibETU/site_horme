import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: ‘contactPage’,
  title: ‘✉️ Page Contact’,
  type: ‘document’,
  description: ‘La page où les visiteurs peuvent vous contacter. Email et lieu de la compagnie.’,
  fields: [
    defineField({
      name: ‘kicker’,
      title: ‘🏷️ Surtitre’,
      type: ‘string’,
      initialValue: ‘’,
    }),
    defineField({
      name: ‘title’,
      title: ‘✍️ Titre principal’,
      type: ‘string’,
      initialValue: ‘’,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: ‘emailLabel’,
      title: ‘🏷️ Libellé email’,
      description: ‘Ex: "Email", "Nous écrire", etc.’,
      type: ‘string’,
      initialValue: ‘’,
    }),
    defineField({
      name: ‘email’,
      title: ‘📧 Adresse email’,
      description: ‘Où les visiteurs pourront vous contacter’,
      type: ‘string’,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: ‘locationLabel’,
      title: ‘🏷️ Libellé lieu’,
      description: ‘Ex: "Basées à", "Localisation", "Où nous trouver"’,
      type: ‘string’,
      initialValue: ‘’,
    }),
    defineField({
      name: ‘locationText’,
      title: ‘📍 Texte lieu’,
      description: ‘Adresse, ville, région, pays. Peut être multi-lignes.’,
      type: ‘text’,
      rows: 3,
    }),
    defineField({
      name: ‘backLinkLabel’,
      title: ‘🔗 Lien de retour’,
      description: ‘Texte du lien pour revenir à l\’accueil’,
      type: ‘string’,
      initialValue: ‘’,
    }),
  ],
})
