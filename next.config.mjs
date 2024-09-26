/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'steadfast-wisdom-8b7aca22e3.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'steadfast-wisdom-8b7aca22e3.media.strapiapp.com',
      },
    ],
  },
};

export default nextConfig;
