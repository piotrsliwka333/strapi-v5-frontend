import { ArticlesAPI } from '@/api/ArticlesAPI';
import { Article } from '@/models/Article';
import { MetadataRoute } from 'next';

export default async function sitemap({}: {
  params: { locale: string };
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  // const { locale } = params;
  const articleResponse = await ArticlesAPI.findMany('en', 0, 50000);
  const articleResponseAlternatesLanguagePL = await ArticlesAPI.findMany('pl', 0, 1000);

  if (
    (articleResponse && 'error' in articleResponse) ||
    (articleResponseAlternatesLanguagePL && 'error' in articleResponseAlternatesLanguagePL)
  )
    return [];
  return articleResponse.data.map((element: Article) => {
    const foundAlternateInPL: Article | undefined = articleResponseAlternatesLanguagePL.data.find(
      (elementPL: Article) => elementPL.slug === element.slug
    );
    const payload = {
      url: `https://www.test1020.xyz/blog/articles/${element.slug}`,
      lastModified: element.updatedAt,
      alternates: {
        languages: {
          en: `https://www.test1020.xyz/blog/articles/${element.slug}`,
          pl: foundAlternateInPL
            ? `https://www.test1020.xyz/blog/artykuły/${foundAlternateInPL.slug}`
            : ``,
        },
      },
    };

    // @ts-expect-error - instead of returing two objects I would like to remove unused language.
    if (!payload.alternates.languages.pl) delete payload.alternates.languages.pl;

    return payload;

    // solution 2

    // return {
    //   url:
    //     locale === 'en'
    //       ? `https://www.test1020.xyz/blog/articles/${element.slug}`
    //       : `https://www.test1020.xyz/blog/artykuły/${element.slug}`,
    //   lastModified: element.updatedAt,
    // };

    // solution 3
  });
}
