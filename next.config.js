const isDeploying = process.env.DEPLOY === "deploy";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    unoptimized: isDeploying ? true : false,
  },
  output: isDeploying ? 'export' : 'standalone',
}

module.exports = nextConfig
