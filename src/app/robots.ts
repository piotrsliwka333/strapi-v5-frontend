import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: '/private/',
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        disallow: ['/'],
      },
    ],
    sitemap: [
      'https://www.test1020.xyz/sitemap.xml',
      'https://www.test1020.xyz/blog/articles/sitemap.xml',
    ],
  };
}
