/**
 * Liste des polices proposées dans le CMS. Module sans dépendance : il est lu
 * à la fois par le Studio (menu déroulant) et par le site (lib/fonts.ts).
 */
export const FONT_OPTIONS = [
  { value: 'ribes', title: 'Ribes (police actuelle)' },
  { value: 'hanken', title: 'Hanken Grotesk' },
  { value: 'inter-tight', title: 'Inter Tight' },
  { value: 'bricolage', title: 'Bricolage Grotesque' },
  { value: 'space-grotesk', title: 'Space Grotesk' },
  { value: 'fraunces', title: 'Fraunces (avec empattements)' },
  { value: 'newsreader', title: 'Newsreader (avec empattements)' },
  { value: 'eb-garamond', title: 'EB Garamond (avec empattements)' },
  { value: 'cormorant', title: 'Cormorant Garamond (avec empattements)' },
  { value: 'instrument-serif', title: 'Instrument Serif (titres seulement)' },
  { value: 'custom', title: 'Ma propre police (fichier à téléverser plus bas)' },
] as const

export type FontOption = (typeof FONT_OPTIONS)[number]['value']

/** Couleurs d'accent proposées. Le bleu actuel reste la valeur par défaut. */
export const ACCENT_OPTIONS = [
  { value: '#1C4CF4', title: 'Bleu Horrmê (actuel)' },
  { value: '#0A0A0A', title: 'Noir' },
  { value: '#C2410C', title: 'Terre cuite' },
  { value: '#B91C4B', title: 'Framboise' },
  { value: '#166534', title: 'Vert sapin' },
  { value: '#6D28D9', title: 'Violet' },
] as const
