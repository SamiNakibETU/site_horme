/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  /**
   * Les créations vivaient sous deux arborescences concurrentes : /creation/*
   * (pages figées) et /projets/[slug] (contenu réel). Théâtre Douze existait
   * même aux deux endroits, sous deux URLs.
   *
   * Tout est réuni sous /projets. Ces redirections permanentes préservent les
   * liens déjà partagés et transmettent l'autorité SEO vers la bonne page —
   * sans elles, les anciennes adresses renverraient une 404 et les partages
   * existants seraient perdus.
   */
  async redirects() {
    return [
      { source: '/creation', destination: '/projets', permanent: true },
      { source: '/creation/rann', destination: '/projets/rann', permanent: true },
      {
        source: '/creation/bastille-design-center',
        destination: '/projets/bastille-design-center',
        permanent: true,
      },
      {
        source: '/creation/tout-ce-qui-tremble/regard-du-cygne',
        destination: '/projets/regard-du-cygne',
        permanent: true,
      },
      {
        source: '/creation/tout-ce-qui-tremble/theatre-douze',
        destination: '/projets/theatre-douze',
        permanent: true,
      },
      { source: '/creation/:path*', destination: '/projets', permanent: true },
    ]
  },
}

export default nextConfig
