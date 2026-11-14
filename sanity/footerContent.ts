import { BlockElementIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const footerContentType = defineType({
  name: 'footerContent',
  title: 'Pied de page',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({ name: 'brandLine', title: 'Nom, début', description: 'Ex. « Cie ».', type: 'string' }),
    defineField({ name: 'brandAccent', title: 'Nom, fin en couleur', description: 'Ex. « Horrmê ».', type: 'string' }),
    defineField({ name: 'tagline', title: 'Ligne sous le nom', type: 'string' }),
    defineField({ name: 'navColumnTitle', title: 'Titre de la colonne des liens', type: 'string', initialValue: 'Navigation' }),
    defineField({
      name: 'navLinks',
      title: 'Liens',
      description: 'Adresse interne (« /contact ») ou complète (« https://… »).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({ name: 'label', title: 'Texte', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'href', title: 'Adresse', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
    defineField({ name: 'followColumnTitle', title: 'Titre de la colonne réseaux', type: 'string', initialValue: 'Suivre' }),
    defineField({ name: 'instagramLabel', title: 'Texte du lien Instagram', type: 'string', initialValue: 'Instagram' }),
    defineField({ name: 'instagramUrl', title: 'Adresse Instagram', type: 'url' }),
    defineField({ name: 'email', title: 'E-mail affiché', type: 'string' }),
    defineField({ name: 'asideTagline', title: 'Phrase à droite', type: 'text', rows: 3 }),
    defineField({
      name: 'copyright',
      title: 'Ligne du bas',
      description: 'Si vide : « © année, nom de la compagnie ». L’année se met à jour seule.',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Pied de page' }) },
})
