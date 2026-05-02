import { defineField, defineType } from 'sanity'

/**
 * PAGE PRÉSENTATION - Où les visiteurs découvrent Joséphine & Louise
 *
 * Structure visuelle (de haut en bas):
 * 1. Surtitre + Titre principal
 * 2. Texte d'introduction (texte riche: possibilité gras, italique, listes)
 * 3. Section "Les danseuses" avec les PORTRAITS (photos seules des danseuses vont ICI, pas en accueil!)
 * 4. Lien vers les créations
 */
export const presentationPageType = defineType({
  name: 'presentationPage',
  title: '👥 Page Présentation',
  type: 'document',
  description:
    '👋 Bienvenue! Cette page présente Joséphine, Louise et les danseuses. ' +
    'C\'est ICI qu\'on met les photos SEULES de personnes (pas en accueil!). ' +
    'La page a 4 sections logiques.',
  fields: [
    defineField({
      name: 'kicker',
      title: '🏷️ Petit titre (surtitre)',
      description: 'Texte gris clair au-dessus. Ex: "La compagnie"',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'title',
      title: '✍️ Titre principal',
      description: 'Le grand titre de la page. Ex: "Cie. Horme"',
      type: 'string',
      initialValue: '',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: '📝 Texte d\'introduction (texte riche)',
      description:
        'Paragraphe introductif avec possibilité de formater: gras, italique, listes, liens. ' +
        'Présentation générale de la compagnie.',
      type: 'blockContent',
    }),
    defineField({
      name: 'dancersSectionTitle',
      title: '🏷️ Titre de la section portraits',
      description: 'Ex: "Les danseuses", "Portraits", "L\'équipe"',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'dancers',
      title: '👥 Portraits des danseuses',
      description:
        '⭐ C\'EST ICI QUE VONT LES PHOTOS SEULES! ' +
        '\n\n💡 Pour ajouter une danseuse:\n' +
        '1. Cliquez « Ajouter »\n' +
        '2. Mettez une photo portrait (carrée, pas coupée)\n' +
        '3. Remplissez: nom, rôle, biographie, formation\n' +
        '4. **GLISSEZ** (⋮⋮) pour changer l\'ordre\n' +
        '5. Cliquez « Publier »\n\n' +
        '📸 Format photo: 800x800px min, JPG/PNG, bien cadrée sur le visage.',
      type: 'array',
      of: [{ type: 'presentationDancer' }],
    }),
    defineField({
      name: 'projectsCtaLabel',
      title: '🔗 Texte du lien vers les créations',
      description: 'Bouton pour aller aux spectacles. Ex: "Voir les projets →"',
      type: 'string',
      initialValue: '',
    }),
  ],
})
