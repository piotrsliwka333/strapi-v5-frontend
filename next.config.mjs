/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_API_URL: 'http://localhost:1337',
    NEXT_PUBLIC_PAGE_LIMIT: '6',
  },
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
        hostname: 'generous-leader-d581ba65b8.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'generous-leader-d581ba65b8.media.strapiapp.com',
      },
    ],
  },
};

export default nextConfig;
