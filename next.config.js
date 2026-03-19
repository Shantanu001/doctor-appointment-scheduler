/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/doctor-appointment-scheduler',
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongodb-memory-server", "mongodb-memory-server-core"],
  },
};

module.exports = nextConfig;
