/**
 * En-têtes de sécurité, appliqués à tout le site.
 *
 * `frame-ancestors 'self'` : seul le site lui-même peut s'afficher dans un
 * cadre. C'est ce dont a besoin l'onglet « Aperçu » du Studio (même domaine),
 * et ce qui empêche un site tiers d'encadrer celui-ci pour piéger un clic.
 * Pas de politique `script-src` stricte : le Studio Sanity en a besoin de
 * larges, et une CSP mal réglée le casserait sans bruit.
 */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Les photos sont redimensionnées par le CDN de Sanity, pas par Next :
    // voir lib/imageLoader.ts.
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 240, 320, 480],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Polices et fichiers statiques : immuables, mis en cache un an.
      {
        source: '/fonts/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  /**
   * Anciennes adresses /creation/* conservées en redirection permanente : les
   * liens déjà partagés continuent de marcher et Google transfère leur
   * référencement. Les deux étapes de « Tout ce qui tremble » (Théâtre Douze,
   * Regard du Cygne) mènent à la fiche de la création elle-même.
   */
  async redirects() {
    return [
      { source: '/creation', destination: '/projets', permanent: true },
      { source: '/creation/rann', destination: '/projets/rann', permanent: true },
      { source: '/creation/bastille-design-center', destination: '/projets/bastille-design-center', permanent: true },
      { source: '/creation/tout-ce-qui-tremble', destination: '/projets/tout-ce-qui-tremble', permanent: true },
      { source: '/creation/tout-ce-qui-tremble/regard-du-cygne', destination: '/projets/tout-ce-qui-tremble', permanent: true },
      { source: '/creation/tout-ce-qui-tremble/theatre-douze', destination: '/projets/tout-ce-qui-tremble', permanent: true },
      { source: '/creation/:path*', destination: '/projets', permanent: true },
    ]
  },
}

export default nextConfig
