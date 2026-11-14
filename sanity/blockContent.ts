import { defineType } from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Texte riche',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Intertitre', value: 'h2' },
        { title: 'Petit intertitre', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'Adresse',
                validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Nouvel onglet',
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
  ],
})
