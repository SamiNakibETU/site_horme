import { UsersIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const presentationPageType = defineType({
  name: 'presentationPage',
  title: 'Présentation',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'texte', title: 'Texte', default: true },
    { name: 'equipe', title: 'Équipe' },
    { name: 'soutiens', title: 'Soutiens' },
  ],
  fields: [
    defineField({ name: 'kicker', title: 'Surtitre', description: 'Ex. « La compagnie ».', type: 'string', group: 'texte' }),
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      group: 'texte',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Texte de présentation',
      description: 'Gras, italique, intertitres, citations et liens possibles.',
      type: 'blockContent',
      group: 'texte',
    }),
    defineField({ name: 'dancersSectionTitle', title: 'Titre de la section équipe', type: 'string', group: 'equipe' }),
    defineField({
      name: 'dancers',
      title: 'Membres',
      description: 'Une fiche par personne. Glissez pour changer l’ordre.',
      type: 'array',
      of: [{ type: 'presentationDancer' }],
      group: 'equipe',
    }),
    defineField({
      name: 'partnersTitle',
      title: 'Titre de la section soutiens',
      description: 'La section n’apparaît que si la liste ci-dessous contient au moins un soutien.',
      type: 'string',
      initialValue: 'Soutiens et partenaires',
      group: 'soutiens',
    }),
    defineField({
      name: 'partners',
      title: 'Soutiens et partenaires',
      description: 'Lieux de résidence, coproducteurs, financeurs.',
      type: 'array',
      group: 'soutiens',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partner',
          fields: [
            defineField({ name: 'name', title: 'Nom', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'role', title: 'Nature du soutien', description: 'Ex. « Accueil en résidence ».', type: 'string' }),
            defineField({ name: 'url', title: 'Site', type: 'url' }),
            defineField({
              name: 'logo',
              title: 'Logo (facultatif)',
              description: 'PNG ou SVG sur fond transparent. Affiché en gris, en couleur au survol.',
              type: 'image',
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'logo' } },
        }),
      ],
    }),
    defineField({ name: 'projectsCtaLabel', title: 'Lien vers les créations', type: 'string', group: 'texte' }),
  ],
  preview: { prepare: () => ({ title: 'Présentation' }) },
})
