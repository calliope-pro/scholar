/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    formats: ['image/webp', 'image/avif']
  },
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig