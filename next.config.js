const isDeploying = process.env.DEPLOY === "deploy";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/usdc-bridge',
        permanent: true
      }
    ]
  },
  reactStrictMode: true,
  basePath: "",
  images: {
    unoptimized: isDeploying ? true : false,
  },
  output: isDeploying ? 'export' : 'standalone',
}

module.exports = nextConfig
