const isDeploying = process.env.DEPLOY === "deploy";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isDeploying ? "/usdc-bridge" : "",
  basePath: isDeploying ? "/usdc-bridge" : "",
  images: {
    unoptimized: isDeploying ? true : false,
  },
  output: isDeploying ? 'export' : 'standalone',
}

module.exports = nextConfig
