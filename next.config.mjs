/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
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
        hostname: 'my-project-name-images-strapi-v5.s3.eu-north-1.amazonaws.com',
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

export default withNextIntl(nextConfig);
