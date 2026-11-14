import { EnvelopeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'kicker', title: 'Surtitre', type: 'string' }),
    defineField({ name: 'title', title: 'Titre de la page', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'emailLabel', title: 'Libellé de l’adresse principale', type: 'string' }),
    defineField({
      name: 'email',
      title: 'Adresse principale',
      type: 'string',
      validation: Rule => Rule.required().email().error('Adresse e-mail invalide.'),
    }),
    defineField({
      name: 'contacts',
      title: 'Autres contacts',
      description: 'Facultatif. Ex. « Diffusion », « Administration », « Presse ».',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactPerson',
          fields: [
            defineField({ name: 'role', title: 'Rôle', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'name', title: 'Nom', type: 'string' }),
            defineField({ name: 'email', title: 'E-mail', type: 'string', validation: Rule => Rule.email() }),
            defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
          ],
          preview: { select: { title: 'role', subtitle: 'name' } },
        }),
      ],
    }),
    defineField({ name: 'locationLabel', title: 'Libellé du lieu', type: 'string' }),
    defineField({ name: 'locationText', title: 'Lieu', type: 'text', rows: 3 }),
    defineField({
      name: 'pressKit',
      title: 'Dossier de diffusion ou de presse (PDF)',
      description: 'Facultatif. Proposé en téléchargement sur la page Contact.',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'pressKitLabel',
      title: 'Texte du lien de téléchargement',
      type: 'string',
      initialValue: 'Télécharger le dossier de diffusion',
      hidden: ({ document }) => !document?.pressKit,
    }),
    defineField({ name: 'backLinkLabel', title: 'Lien de retour', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Contact' }) },
})
