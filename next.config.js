const isDeploying = process.env.DEPLOY === "deploy";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isDeploying ? "/usdc-bridge" : "",
  basePath: isDeploying ? "/usdc-bridge" : "",
  images: {
    unoptimized: isDeploying ? true : false
  },
  output: 'export'
}

module.exports = nextConfig
