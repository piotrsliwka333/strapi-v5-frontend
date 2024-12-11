import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/private/', '/_next/'],
      },
    ],
    sitemap: 'https://test1020.xyz/sitemap2.xml',
  };
}
