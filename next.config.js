/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongodb-memory-server", "mongodb-memory-server-core"],
  },
};

module.exports = nextConfig;
