import Link from 'next/link'
import type { FooterCms } from '@/lib/cms.types'

export default function Footer({ data, siteName }: { data: FooterCms; siteName: string }) {
  const year = new Date().getFullYear()
  const copyright = data.copyright || `© ${year} ${siteName}`
  const external = (href: string) => /^https?:\/\//.test(href)

  return (
    <footer data-nav-theme="light" className="site-footer">
      <div className="grid site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">
            {data.brandLine} <span className="accent">{data.brandAccent}</span>
          </p>
          {data.tagline && <p className="site-footer__tagline">{data.tagline}</p>}
        </div>

        <nav className="site-footer__col" aria-label="Pied de page">
          <p className="ed-caption">{data.navColumnTitle}</p>
          <ul>
            {data.navLinks.map(({ href, label }) => (
              <li key={href}>
                {external(href) ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <p className="ed-caption">{data.followColumnTitle}</p>
          <ul>
            <li>
              <a href={data.instagramUrl} target="_blank" rel="noopener noreferrer">
                {data.instagramLabel}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </li>
          </ul>
        </div>

        {data.asideTagline && <p className="site-footer__aside">{data.asideTagline}</p>}

        <div className="site-footer__legal">
          <span>{copyright}</span>
          <Link href="/mentions-legales">Mentions légales</Link>
        </div>
      </div>
    </footer>
  )
}
