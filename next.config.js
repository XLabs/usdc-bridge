
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: !!process.env.DEPLOY,
  },
  output: !!process.env.DEPLOY ? 'export' : 'standalone',
}

module.exports = nextConfig
