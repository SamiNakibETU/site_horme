/**
 * Convertit une vidéo au format web, et en extrait une image de chargement.
 *
 *   node scripts/encode-video.mjs <source> [nom-de-sortie]
 *   node scripts/encode-video.mjs ~/Desktop/nouveau-hero.mov hero
 *
 * Pourquoi ce script existe : les vidéos issues d'iPhone, Final Cut ou iMovie
 * sont encodées en HEVC (H.265). Ce format s'affiche parfaitement sur Mac et
 * Safari, mais Chrome, Firefox et Android ne savent pas le décoder — la vidéo
 * y reste un rectangle vide. Le piège est qu'on ne s'en rend jamais compte en
 * testant depuis un Mac.
 *
 * Ce script réencode en H.264, retire la piste audio (les vidéos de fond sont
 * muettes) et place l'index de lecture en tête de fichier (`faststart`) pour
 * que la lecture démarre avant la fin du téléchargement.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import ffmpeg from '@ffmpeg-installer/ffmpeg'

const [source, nameArg] = process.argv.slice(2)

if (!source) {
  console.error('Usage : node scripts/encode-video.mjs <source> [nom-de-sortie]')
  process.exit(1)
}
if (!existsSync(source)) {
  console.error(`Fichier introuvable : ${source}`)
  process.exit(1)
}

const name = nameArg || basename(source, extname(source))
const video = join('public/assets/videos', `${name}.mp4`)
const poster = join('public/assets/images', `${name}-poster.jpg`)

const run = args => execFileSync(ffmpeg.path, args, { stdio: 'inherit' })

console.log(`\nEncodage H.264 → ${video}`)
run([
  '-y', '-loglevel', 'error', '-i', source,
  '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
  '-pix_fmt', 'yuv420p',
  '-crf', '26', '-preset', 'slow',
  '-maxrate', '2500k', '-bufsize', '5000k',
  '-movflags', '+faststart',
  '-an',
  video,
])

console.log(`Image de chargement → ${poster}`)
run([
  '-y', '-loglevel', 'error', '-ss', '00:00:01', '-i', source,
  '-frames:v', '1', '-q:v', '4', '-vf', 'scale=1920:-2',
  poster,
])

console.log('\nTerminé. Vérifiez le résultat avec `npm run dev`.\n')
