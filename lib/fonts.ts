import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  EB_Garamond,
  Fraunces,
  Hanken_Grotesk,
  Instrument_Serif,
  Inter_Tight,
  Newsreader,
  Space_Grotesk,
} from 'next/font/google'

/**
 * Polices proposées à la compagnie dans le CMS (Réglages du site > Typographie).
 *
 * next/font télécharge ces fichiers au moment du build et les sert depuis le
 * domaine du site : aucun visiteur n'appelle Google Fonts, donc aucune adresse
 * IP transmise à un tiers. `preload: false` : seules les @font-face sont
 * déclarées. Le navigateur ne télécharge que la police réellement utilisée à
 * l'écran, les autres ne coûtent rien.
 */
const hanken = Hanken_Grotesk({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-hanken' })
const interTight = Inter_Tight({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-inter-tight' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-bricolage' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-space-grotesk' })
const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-fraunces' })
const newsreader = Newsreader({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-newsreader' })
const ebGaramond = EB_Garamond({ subsets: ['latin'], display: 'swap', preload: false, variable: '--ff-eb-garamond' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  weight: ['300', '400', '500'],
  variable: '--ff-cormorant',
})
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--ff-instrument-serif',
})

export type FontKey =
  | 'ribes'
  | 'hanken'
  | 'inter-tight'
  | 'bricolage'
  | 'space-grotesk'
  | 'fraunces'
  | 'newsreader'
  | 'eb-garamond'
  | 'cormorant'
  | 'instrument-serif'

type FontEntry = { title: string; stack: string; kind: 'sans' | 'serif' }

/** Valeur CSS de chaque police, repli compris. */
export const FONTS: Record<FontKey, FontEntry> = {
  ribes: { title: 'Ribes (police actuelle)', stack: "'Ribes', Georgia, serif", kind: 'sans' },
  hanken: { title: 'Hanken Grotesk', stack: 'var(--ff-hanken), system-ui, sans-serif', kind: 'sans' },
  'inter-tight': { title: 'Inter Tight', stack: 'var(--ff-inter-tight), system-ui, sans-serif', kind: 'sans' },
  bricolage: { title: 'Bricolage Grotesque', stack: 'var(--ff-bricolage), system-ui, sans-serif', kind: 'sans' },
  'space-grotesk': { title: 'Space Grotesk', stack: 'var(--ff-space-grotesk), system-ui, sans-serif', kind: 'sans' },
  fraunces: { title: 'Fraunces', stack: 'var(--ff-fraunces), Georgia, serif', kind: 'serif' },
  newsreader: { title: 'Newsreader', stack: 'var(--ff-newsreader), Georgia, serif', kind: 'serif' },
  'eb-garamond': { title: 'EB Garamond', stack: 'var(--ff-eb-garamond), Georgia, serif', kind: 'serif' },
  cormorant: { title: 'Cormorant Garamond', stack: 'var(--ff-cormorant), Georgia, serif', kind: 'serif' },
  'instrument-serif': {
    title: 'Instrument Serif (titres seulement)',
    stack: 'var(--ff-instrument-serif), Georgia, serif',
    kind: 'serif',
  },
}

export function isFontKey(v: unknown): v is FontKey {
  return typeof v === 'string' && v in FONTS
}

/**
 * Pile CSS d'une police choisie dans le CMS. `custom` renvoie à la police
 * téléversée, déclarée en @font-face sous le nom `HorrmeCustom` ; si aucun
 * fichier n'est fourni, le navigateur passe simplement à Ribes.
 */
export function fontStack(choice: unknown, hasCustom: boolean): string {
  if (choice === 'custom') return hasCustom ? `'HorrmeCustom', ${FONTS.ribes.stack}` : FONTS.ribes.stack
  return isFontKey(choice) ? FONTS[choice].stack : FONTS.ribes.stack
}

/** Classes à poser sur <html> : elles déclarent les variables --ff-*. */
export const fontVariableClasses = [
  hanken,
  interTight,
  bricolage,
  spaceGrotesk,
  fraunces,
  newsreader,
  ebGaramond,
  cormorant,
  instrumentSerif,
]
  .map(f => f.variable)
  .join(' ')
