/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "apptnote.eastus.cloudapp.azure.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
}

module.exports = nextConfig
