import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      data-nav-theme="light"
      style={{
        background: 'var(--white)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'Ribes, serif',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(10,10,10,0.3)',
          marginBottom: '1.5rem',
        }}>
          404
        </p>
        <h1 style={{
          fontFamily: 'Ribes, Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: 'var(--black)',
          marginBottom: '2rem',
        }}>
          Page introuvable
        </h1>
        <Link
          href="/"
          style={{
            fontFamily: 'Ribes, serif',
            fontWeight: 400,
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            textDecoration: 'none',
          }}
        >
          Retour à l&apos;index →
        </Link>
      </div>
    </main>
  )
}
