import CreationPlaceholder from '@/components/CreationPlaceholder'

export const metadata = {
  title: 'Théâtre Douze | Cie. Horme',
  description: 'Tout ce qui tremble — Théâtre Douze.',
}

export default function TheatreDouzePage() {
  return (
    <CreationPlaceholder title="Théâtre Douze" kicker="Tout ce qui tremble · 2025">
      <p style={{ marginBottom: '1rem' }}>
        Événement au Théâtre Douze — année 2025.
      </p>
      <p>
        Les détails et visuels seront ajoutés avec le prochain envoi de la compagnie.
      </p>
    </CreationPlaceholder>
  )
}
