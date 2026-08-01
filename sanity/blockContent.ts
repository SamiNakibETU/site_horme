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
        { title: 'Titre', value: 'h2' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [{ title: 'Puce', value: 'bullet' }],
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
              { name: 'href', type: 'url', title: 'URL' },
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
