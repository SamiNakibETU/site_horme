import { defineArrayMember, defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: '🔗 Menu Principal',
  type: 'document',
  description: 'Menu du haut à droite avec le bouton "Création" et ses sous-menus. Modifiez les libellés et liens ici.',
  fields: [
    defineField({
      name: 'creationButtonLabel',
      title: 'Libellé du bouton Création',
      description: 'Le texte du bouton principal en haut à droite',
      type: 'string',
      initialValue: 'Création',
    }),
    defineField({
      name: 'trembleGroupTitle',
      title: 'Création — Groupe 1 : Surtitre (Tout ce qui tremble)',
      description: 'Titre du groupe 1 (avec sous-menus). Ex: "Tout ce qui tremble"',
      type: 'string',
      initialValue: 'Tout ce qui tremble',
    }),
    defineField({
      name: 'trembleLinks',
      title: 'Création — Groupe 1 : Sous-menus (Jardiniers, Regard, Théâtre)',
      description: 'Les 3 sous-projets de "Tout ce qui tremble". Ex: Jardiniers Montrouge, Regard du Cygne, Théâtre Douze',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trembleMenuLink',
          fields: [
            defineField({ name: 'label', title: 'Libellé', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'href', title: 'URL (chemin)', type: 'string', validation: Rule => Rule.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'directLinks',
      title: 'Création — Autres liens (sans surtitre)',
      description: 'Rann, Khorrmos, Bastille Design Center, etc. S\'affichent sans groupe.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'directMenuLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'href',
              title: 'URL (chemin)',
              description: 'Ex: "/creation/rann", "/creation/khorrmos", "/creation/bastille-design-center"',
              type: 'string',
              validation: Rule => Rule.required()
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
  ],
})
