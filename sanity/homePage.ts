import { defineField, defineType } from 'sanity'

/**
 * PAGE D'ACCUEIL - Première page que les visiteurs voient
 *
 * Structure visuelle (de haut en bas):
 * 1. HÉRO: Vidéo de fond + Grand titre "Cie. Horme"
 * 2. CARROUSEL: Photos qui défilent horizontalement (photos de GROUPE uniquement - PAS de solos!)
 * 3. MANIFESTO: Bandeau bleu "Le corps comme [BLEU]langage premier[/BLEU]"
 * 4. PRÉSENTATION: Texte principal sur la compagnie
 * 5. PHOTOS SECTION: Encart qui renvoie à la page Présentation
 * 6. CRÉATIONS: Liste des spectacles
 */
export const homePageType = defineType({
  name: 'homePage',
  title: '🏠 Page d\'Accueil',
  type: 'document',
  description:
    '👋 Bienvenue! Vous modifiez la première page que les visiteurs voient. ' +
    'Cette page a 6 sections visibles. Les changements s\'affichent après clic sur **Publier** (en haut à droite).',
  groups: [
    { name: 'hero', title: '1️⃣ HÉRO - Vidéo & Grand Titre', default: true },
    { name: 'carousel', title: '2️⃣ CARROUSEL - Photos de groupe qui défilent' },
    { name: 'manifesto', title: '3️⃣ MANIFESTO - Bandeau bleu inspirant' },
    { name: 'intro', title: '4️⃣ PRÉSENTATION - Texte sur la compagnie' },
    { name: 'imagesBloc', title: '5️⃣ ENCART PHOTOS - Renvoie à la page Présentation' },
    { name: 'creations', title: '6️⃣ CRÉATIONS - Titres avant la liste des spectacles' },
  ],
  fields: [
    // ============= SECTION 1: HERO =============
    defineField({
      name: 'heroVideo',
      title: '🎬 Vidéo de fond',
      description:
        'La vidéo plein écran derrière le titre. La vidéo est muette : ' +
        'le son ne sera pas joué.\n\n' +
        '⚠️ Format obligatoire : MP4 en H.264. Une vidéo venant directement ' +
        'd’un iPhone, de Final Cut ou d’iMovie est en général en HEVC (H.265) — ' +
        'ce format s’affiche correctement sur Mac et iPhone, mais reste ' +
        '**invisible sur Chrome, Firefox et Android**, soit la majorité des ' +
        'visiteurs. Vous ne verriez donc pas le problème depuis votre ordinateur.\n\n' +
        'Dans le doute, envoyez la vidéo à Sami pour conversion, ou exportez ' +
        'en « H.264 / MP4 » depuis votre logiciel de montage.\n\n' +
        'Poids conseillé : moins de 5 Mo.',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'hero',
    }),
    defineField({
      name: 'heroPoster',
      title: '🖼️ Image affichée pendant le chargement de la vidéo',
      description:
        'Une vidéo met quelques secondes à arriver. Cette image s’affiche ' +
        'immédiatement à sa place, puis s’efface dès que la vidéo démarre. ' +
        'Sans elle, les visiteurs voient un rectangle vide en arrivant sur le site.\n\n' +
        'Choisissez de préférence une image proche de la première seconde de la vidéo.',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      validation: Rule =>
        Rule.required().warning(
          'Sans image de chargement, la page d’accueil s’ouvre sur un écran vide.',
        ),
    }),
    defineField({
      name: 'heroTitle',
      title: '✍️ Grand titre principal',
      description:
        'Le texte énorme au bas de l\'écran. Ex: "Cie. Horme"',
      type: 'string',
      initialValue: '',
      validation: Rule => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroLine1',
      title: '📝 Sous-titre — ligne 1',
      description:
        'Petite ligne sous le titre. Ex: "Louise Melli et Joséphine Hassid-Langlois"',
      type: 'string',
      initialValue: '',
      group: 'hero',
    }),
    defineField({
      name: 'heroLine2',
      title: '📝 Sous-titre — ligne 2',
      description:
        'Deuxième ligne optionnelle. Ex: "écriture chorégraphique, Paris."',
      type: 'string',
      initialValue: '',
      group: 'hero',
    }),

    // ============= SECTION 2: CAROUSEL =============
    defineField({
      name: 'slides',
      title: '📸 Photos du carrousel',
      description:
        '⚠️ **PHOTOS DE GROUPE UNIQUEMENT!** ' +
        'PAS de photos de personnes seules ici (elles vont en Présentation). ' +
        '\n\n💡 Comment ajouter:\n' +
        '1. Cliquez « Ajouter »\n' +
        '2. Sélectionnez une photo de groupe\n' +
        '3. **GLISSEZ** (icône ⋮⋮ à gauche) pour changer l\'ordre\n' +
        '4. Cliquez « Publier »\n\n' +
        '📌 Conseils: format paysage 16:9, min 1920px, JPG/PNG, pas coupées aux bords.',
      type: 'array',
      of: [{ type: 'homeSlide' }],
      group: 'carousel',
      validation: Rule => Rule.min(1).warning('Ajoutez au moins 1 photo de groupe!'),
    }),

    // ============= SECTION 3: MANIFESTO =============
    defineField({
      name: 'manifestoLine1',
      title: '✍️ Texte avant le mot bleu',
      description:
        'Première partie de la phrase inspirante. Ex: "Le corps comme"',
      type: 'string',
      initialValue: '',
      group: 'manifesto',
    }),
    defineField({
      name: 'manifestoAccent',
      title: '💙 Mot/phrase EN BLEU',
      description:
        'Ce mot s\'affiche en BLEU et EN GROS sur le site. Ex: "langage premier."',
      type: 'string',
      initialValue: '',
      group: 'manifesto',
    }),
    defineField({
      name: 'manifestoCtaLabel',
      title: '🔗 Texte du lien',
      description:
        'Le bouton qui renvoie à la page des créations. Ex: "Voir les créations →"',
      type: 'string',
      initialValue: '',
      group: 'manifesto',
    }),

    // ============= SECTION 4: INTRO/PRÉSENTATION =============
    defineField({
      name: 'introKicker',
      title: '🏷️ Petit titre (surtitre)',
      description:
        'Texte gris clair au-dessus du texte principal. Ex: "La compagnie"',
      type: 'string',
      initialValue: '',
      group: 'intro',
    }),
    defineField({
      name: 'introParagraph1',
      title: '📝 Texte principal (paragraphe 1)',
      description:
        'Le TEXTE IMPORTANT qui présente la compagnie. Peut être long (plusieurs phrases). ' +
        'C\'est le cœur de la présentation en accueil. Visible pour tous les visiteurs!',
      type: 'text',
      rows: 6,
      initialValue: '',
      group: 'intro',
    }),
    defineField({
      name: 'introParagraph2',
      title: '📝 Texte secondaire (paragraphe 2)',
      description:
        'Un texte PLUS COURT et plus léger. S\'affiche en gris clair. ' +
        'Ex: une phrase poétique ou une info complémentaire.',
      type: 'text',
      rows: 4,
      initialValue: '',
      group: 'intro',
    }),
    defineField({
      name: 'introCtaLabel',
      title: '🔗 Texte du lien',
      description:
        'Bouton vers la page Présentation pour découvrir les danseuses. Ex: "Découvrir la compagnie →"',
      type: 'string',
      initialValue: '',
      group: 'intro',
    }),

    // ============= SECTION 5: PHOTOS ENCART =============
    defineField({
      name: 'imagesSectionKicker',
      title: '🏷️ Titre de la section',
      description:
        'Titre du petit encart photos. Ex: "La compagnie en images"',
      type: 'string',
      initialValue: '',
      group: 'imagesBloc',
    }),
    defineField({
      name: 'imagesSectionBody',
      title: '📝 Description',
      description:
        'Court texte décrivant ce qu\'on verra en cliquant sur cet encart. ' +
        'Ex: "Retrouvez les portraits et la vie de la compagnie."',
      type: 'text',
      rows: 3,
      initialValue: '',
      group: 'imagesBloc',
    }),
    defineField({
      name: 'imagesSectionCtaLabel',
      title: '🔗 Texte du lien',
      description:
        'Bouton pour aller à la page Présentation. Ex: "Présentation →"',
      type: 'string',
      initialValue: '',
      group: 'imagesBloc',
    }),

    // ============= SECTION 6: CRÉATIONS =============
    defineField({
      name: 'creationsKicker',
      title: '🏷️ Titre de la section',
      description:
        'Titre avant la liste des spectacles/créations. Ex: "Créations"',
      type: 'string',
      initialValue: '',
      group: 'creations',
    }),
    defineField({
      name: 'creationsFooterCtaLabel',
      title: '🔗 Lien du bas',
      description:
        'Bouton pour voir toutes les créations. Ex: "Toutes les créations →"',
      type: 'string',
      initialValue: '',
      group: 'creations',
    }),
  ],
})
