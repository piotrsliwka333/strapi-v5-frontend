import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.test1020.xyz',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://www.test1020.xyz',
          pl: 'https://www.test1020.xyz/pl',
        },
      },
    },
    {
      url: 'https://www.test1020.xyz/training',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://www.test1020.xyz/training',
          pl: 'https://www.test1020.xyz/pl/trening',
        },
      },
    },
    {
      url: 'https://www.test1020.xyz/about-us',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://www.test1020.xyz/about-us',
          pl: 'https://www.test1020.xyz/pl/o-nas',
        },
      },
    },
    {
      url: 'https://www.test1020.xyz/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://www.test1020.xyz/blog',
          pl: 'https://www.test1020.xyz/pl/blog',
        },
      },
    },
  ];
}
