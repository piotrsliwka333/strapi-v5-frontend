import { MetadataRoute } from 'next';
import { ArticlesAPI } from '@/api/ArticlesAPI';
import { locales } from '@/i18n/routing';
import { Article } from '@/models/Article';
import { CollectionType } from '@/models/CollectionType';
import { ErrorAPI } from '@/models/ErrorAPI';

// sitemap propably not works as generateMetada where I have access to locale (basicaly params)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const articleResponses: (CollectionType<Article> | ErrorAPI)[] = await Promise.all(
    locales.map((locale: string) => ArticlesAPI.findMany(locale, 0, 50000))
  );

  const resultArray: MetadataRoute.Sitemap = [
    {
      url: 'https://www.test1020.xyz',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          // en: 'https://www.test1020.xyz',
          // pl: 'https://www.test1020.xyz/pl',
        },
      },
    },
    {
      url: 'https://www.test1020.xyz/training',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // alternates: {
      //   languages: {
      //     en: 'https://www.test1020.xyz/training',
      //     pl: 'https://www.test1020.xyz/pl/trening',
      //   },
      // },
    },
    {
      url: 'https://www.test1020.xyz/about-us',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // alternates: {
      //   languages: {
      //     en: 'https://www.test1020.xyz/about-us',
      //     pl: 'https://www.test1020.xyz/pl/o-nas',
      //   },
      // },
    },
    {
      url: 'https://www.test1020.xyz/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // alternates: {
      //   languages: {
      //     en: 'https://www.test1020.xyz/blog',
      //     pl: 'https://www.test1020.xyz/pl/blog',
      //   },
      // },
    },

    // pl
    {
      url: 'https://www.test1020.xyz/pl',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          // en: 'https://www.test1020.xyz',
          // pl: 'https://www.test1020.xyz/pl',
        },
      },
    },
    {
      url: 'https://www.test1020.xyz/pl/trening',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // alternates: {
      //   languages: {
      //     en: 'https://www.test1020.xyz/training',
      //     pl: 'https://www.test1020.xyz/pl/trening',
      //   },
      // },
    },
    {
      url: 'https://www.test1020.xyz/pl/o-nas',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // alternates: {
      //   languages: {
      //     en: 'https://www.test1020.xyz/about-us',
      //     pl: 'https://www.test1020.xyz/pl/o-nas',
      //   },
      // },
    },
    {
      url: 'https://www.test1020.xyz/pl/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // alternates: {
      //   languages: {
      //     en: 'https://www.test1020.xyz/blog',
      //     pl: 'https://www.test1020.xyz/pl/blog',
      //   },
      // },
    },
  ];

  articleResponses.forEach((articlesPerLanguage: CollectionType<Article> | ErrorAPI) => {
    if ('error' in articlesPerLanguage) return;

    articlesPerLanguage.data.forEach((artilceInLaguage: Article) => {
      resultArray.push({
        url:
          artilceInLaguage.locale === 'en'
            ? `https://www.test1020.xyz/blog/articles/${artilceInLaguage.slug}`
            : `https://www.test1020.xyz/pl/blog/artykuly/${artilceInLaguage.slug}`,
        lastModified: artilceInLaguage.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return resultArray;
}
