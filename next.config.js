/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org']
  },
  distDir: 'build',
}

module.exports = nextConfig
