import { Box, Card, Heading, Stack, Text } from '@sanity/ui'

/**
 * Mode d'emploi affiché dans le Studio. La compagnie l'a sous la main au
 * moment où elle en a besoin, sans chercher un document à part.
 */
const sections: { title: string; items: string[] }[] = [
  {
    title: 'La règle',
    items: [
      'Rien n’apparaît sur le site avant d’avoir cliqué sur « Publier », en bas à droite. Avant, c’est un brouillon : personne ne le voit.',
      'Le site se met à jour environ une minute après la publication.',
      'Chaque document garde son historique : menu ⋯ en haut à droite, puis « Historique », pour revenir à une version précédente.',
    ],
  },
  {
    title: 'Voir avant de publier',
    items: [
      'Ouvrez « Aperçu » dans la barre du haut. Le site s’affiche à droite avec vos brouillons.',
      'Cliquez sur un texte du site : le champ correspondant s’ouvre à gauche.',
    ],
  },
  {
    title: 'Choisir les créations du bandeau',
    items: [
      'Ouvrez « Créations à la une ».',
      'Pour retirer une création du bandeau : survolez sa ligne, menu ⋯, « Retirer ». Elle reste sur le site, dans « Autres projets ».',
      'Pour en ajouter une : « Ajouter un élément », puis tapez son nom.',
      'Glissez les lignes pour changer l’ordre, puis « Publier ».',
    ],
  },
  {
    title: 'Ajouter une création',
    items: [
      '« Créations », puis le bouton + en haut.',
      'Onglet Informations : titre, puis « Générer » pour l’adresse, type et année.',
      'Onglet Photos : glissez plusieurs photos d’un coup dans « Galerie ».',
      'Onglet Dates : une ligne par représentation. Les dates à venir apparaissent sur l’accueil.',
      'Pour qu’elle figure dans le bandeau, ajoutez-la ensuite dans « Créations à la une ».',
    ],
  },
  {
    title: 'Changer la police ou la couleur',
    items: [
      '« Réglages », onglet « Polices et couleur ».',
      'Choisissez une police pour les titres et une pour le texte. Testez dans « Aperçu » avant de publier.',
      'Pour une police achetée ailleurs : envoyez son fichier (.woff2 de préférence) dans « Ma propre police », puis choisissez « Ma propre police » dans les menus.',
    ],
  },
  {
    title: 'Photos',
    items: [
      'Envoyez les photos en bonne qualité : le site les redimensionne et les allège lui-même.',
      'Pour choisir ce qui reste visible quand une photo est rognée : cliquez sur la photo, puis sur le crayon, et placez le cercle sur le sujet.',
      'Remplissez la description de chaque photo : elle sert aux personnes aveugles et à Google.',
    ],
  },
  {
    title: 'Vidéos',
    items: [
      'Le plus simple : mettez la vidéo sur YouTube ou Vimeo et collez son lien dans la fiche de la création.',
      'Pour la vidéo de l’accueil : MP4 en H.264, moins de 5 Mo. Une vidéo d’iPhone (HEVC) reste invisible sur Chrome et Android.',
    ],
  },
]

export function Guide() {
  return (
    <Box padding={4} style={{ maxWidth: 720 }}>
      <Stack space={5}>
        <Heading size={2}>Mode d’emploi</Heading>
        {sections.map(s => (
          <Card key={s.title} padding={4} radius={2} border>
            <Stack space={4}>
              <Heading size={1} as="h3">
                {s.title}
              </Heading>
              {s.items.map((it, i) => (
                <Text key={i} size={2} style={{ lineHeight: 1.5 }}>
                  {it}
                </Text>
              ))}
            </Stack>
          </Card>
        ))}
        <Text size={1} muted>
          Une question, un problème : écrivez à Sami.
        </Text>
      </Stack>
    </Box>
  )
}
