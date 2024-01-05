/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "apptnote.eastus.cloudapp.azure.com",
      },
    ],
  },
}

module.exports = nextConfig
