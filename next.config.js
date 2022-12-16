/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/gerente',
        destination: '/gerente/resultados',
        permanent: true,
      },
      {
        source: '/administrador',
        destination: '/administrador/data-lake',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
