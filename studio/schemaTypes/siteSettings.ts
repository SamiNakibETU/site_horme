import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: '🔍 Paramètres SEO & Réseaux',
  type: 'document',
  description: 'C\'est ici qu\'on configure comment le site s\'affiche sur Google et les réseaux sociaux (Facebook, Instagram, etc.). Ne changez ça que si vous savez ce que vous faites!',
  fields: [
    defineField({
      name: 'metaTitle',
      title: '✍️ Titre (onglet navigateur)',
      description: 'Le texte qui s\'affiche en haut de l\'onglet du navigateur. Ex: "Cie. Horrmê | Compagnie de danse"',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: '📝 Description (Google)',
      description: 'Un court résumé (max 160 caractères) de ce que le site est. Cela s\'affiche dans les résultats Google.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogTitle',
      title: '✍️ Titre Open Graph (réseaux)',
      description: 'Titre quand on partage sur Facebook/Instagram. Peut être différent du titre Google.',
      type: 'string',
    }),
    defineField({
      name: 'ogDescription',
      title: '📝 Description Open Graph (réseaux)',
      description: 'Description quand on partage sur les réseaux. Peut être différente de Google.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: '🖼️ Image Open Graph',
      description: 'Image affichée quand on partage sur réseaux. Recommandé: 1200x630px, JPG/PNG.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
