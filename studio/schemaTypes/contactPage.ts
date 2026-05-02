import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: '✉️ Page Contact',
  type: 'document',
  description:
    '✉️ La page où les visiteurs peuvent vous contacter. ' +
    'Mettez l\'email et l\'adresse de la compagnie ici.',
  fields: [
    defineField({
      name: 'kicker',
      title: '🏷️ Petit titre',
      description: 'Surtitre gris. Ex: "Contact", "Nous écrire"',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'title',
      title: '✍️ Titre principal',
      description: 'Le grand titre de la page. Ex: "Nous écrire", "En contact"',
      type: 'string',
      initialValue: '',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'emailLabel',
      title: '🏷️ Libellé email',
      description: 'Ex: "Email", "Nous écrire", "Contact"',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'email',
      title: '📧 Adresse email',
      description: 'L\'email où les visiteurs vont vous contacter. Ex: compagniehorrme@gmail.com',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locationLabel',
      title: '🏷️ Libellé lieu',
      description: 'Ex: "Basées à", "Localisation", "Où nous trouver"',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'locationText',
      title: '📍 Adresse / Lieu',
      description: 'Adresse complète, ville, région, pays. Peut être plusieurs lignes.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backLinkLabel',
      title: '🔗 Lien de retour',
      description: 'Texte du bouton pour revenir. Ex: "← Retour à l\'accueil"',
      type: 'string',
      initialValue: '',
    }),
  ],
})
