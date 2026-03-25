import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const SANITY_TAG = 'sanity'

/**
 * Webhook Sanity (POST + signature) ou test manuel GET ?secret=…
 * Variables : SANITY_REVALIDATE_SECRET (même secret que dans le webhook Sanity)
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim()
  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET manquant' }, { status: 500 })
  }

  const { isValidSignature, body } = await parseBody(req, secret, true)

  if (isValidSignature !== true) {
    return NextResponse.json({ message: 'Signature webhook invalide ou manquante' }, { status: 401 })
  }

  if (!body) {
    return NextResponse.json({ message: 'Corps vide' }, { status: 400 })
  }

  revalidateTag(SANITY_TAG)
  revalidatePath('/', 'layout')
  revalidatePath('/projets')
  revalidatePath('/presentation')
  revalidatePath('/contact')

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    tags: [SANITY_TAG],
  })
}

export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim()
  const q = req.nextUrl.searchParams.get('secret')
  if (!secret || q !== secret) {
    return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
  }
  revalidateTag(SANITY_TAG)
  revalidatePath('/', 'layout')
  revalidatePath('/projets')
  revalidatePath('/presentation')
  revalidatePath('/contact')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
