import Link from 'next/link'
import './globals.css'

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="ed-caption" style={{ marginTop: 0 }}>Erreur 404</p>
      <h1 className="ed-display" style={{ fontSize: 'var(--step-3)' }}>Page introuvable</h1>
      <p className="ed-body">Cette page a peut-être changé d’adresse.</p>
      <div className="notfound__links">
        <Link href="/" className="ed-link">Accueil</Link>
        <Link href="/projets" className="text-link">Créations</Link>
      </div>
    </main>
  )
}
