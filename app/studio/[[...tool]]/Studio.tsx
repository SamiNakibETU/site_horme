'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

/**
 * Le Studio est une application 100 % client : il utilise createContext, le
 * localStorage et l'historique du navigateur. On l'isole donc dans un
 * composant `use client` pour que Next n'essaie pas de le pré-rendre côté
 * serveur — sans quoi le build échoue sur « createContext is not a function ».
 */
export default function Studio() {
  return <NextStudio config={config} />
}
