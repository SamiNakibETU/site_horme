import { defineField, defineType } from 'sanity'

export const homeSlideType = defineType({
  name: 'homeSlide',
  title: 'Diapositive accueil',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'objectFit',
      title: 'Recadrage',
      type: 'string',
      options: {
        list: [
          { title: 'Couvrir (remplir)', value: 'cover' },
          { title: 'Contenir (bandes)', value: 'contain' },
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
    defineField({
      name: 'objectPosition',
      title: 'Position (CSS, ex. center 20%)',
      type: 'string',
      initialValue: 'center',
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare({ media }) {
      return { title: 'Image accueil', media }
    },
  },
})
