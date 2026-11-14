// @ts-nocheck : script Node hors build, importe le .ts directement.
// Contrôle du cadrage : node --experimental-strip-types scripts/check-image.ts
import assert from 'node:assert/strict'
import { toCmsImage } from '../lib/image.ts'

const base = { url: 'https://cdn.sanity.io/images/p/d/a-100x100.jpg', w: 4000, h: 2000 }

// Sans hotspot : centre, dimensions d'origine.
let i = toCmsImage(base)!
assert.equal(i.position, '50% 50%')
assert.deepEqual([i.width, i.height], [4000, 2000])

// Hotspot ramené dans le repère de l'image recadrée (moitié gauche gardée).
i = toCmsImage({ ...base, crop: { top: 0, bottom: 0, left: 0, right: 0.5 }, hotspot: { x: 0.25, y: 0.3 } })!
assert.equal(i.position, '50% 30%')
assert.deepEqual([i.width, i.height], [2000, 2000])

// Hotspot hors du recadrage : borné au bord.
i = toCmsImage({ ...base, crop: { top: 0, bottom: 0, left: 0.5, right: 0 }, hotspot: { x: 0.1, y: 0.5 } })!
assert.equal(i.position, '0% 50%')

assert.equal(toCmsImage(null), null)
console.log('cadrage ok')
