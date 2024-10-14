import { ArticlesAPI } from '@/api/ArticlesAPI';
import { HttpClient } from '@/api/HttpClient';
import ArticleHero from '@/components/ArticleHero';
import { redirect } from '@/i18n/routing';
import { Article } from '@/models/Article';
import { MetaSocial, MetaSocialNetwork } from '@/models/common/SEO';
import componentResolver from '@/utils/component-resolver';
import { Metadata } from 'next';
import { Article as ArticleJSONLD, WithContext } from 'schema-dts';

export default async function ArticleRoute({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = params;

  const articleResponse = await ArticlesAPI.findMany(locale, 0, 1, { slug });
  if (articleResponse && 'error' in articleResponse)
    return (
      <div>
        <h1>
          {
            'Missing or invalid credentials. Have you created an access token using the Strapi admin panel?'
          }
        </h1>
        <p>Error Type: {articleResponse.error.name}</p>
        <p>Error Status: {articleResponse.error.status}</p>
      </div>
    );
  if (articleResponse.data.length === 0) return redirect('/blog');
  const { author, cover, publishedAt, title, description, blocks, seo } = articleResponse.data[0];

  const jsonLd: WithContext<ArticleJSONLD> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: seo.metaTitle,
    datePublished: publishedAt,
    dateModified: publishedAt,
  };

  if (seo.metaImage) jsonLd.image = HttpClient.getStrapiMedia(seo.metaImage.url);
  if (author) jsonLd.author = [{ '@type': 'Person', name: author.name }];
  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleHero
        author={author}
        cover={cover}
        publishedAt={publishedAt}
        title={title}
        description={description}
      />
      {/* eslint-disable-next-line */}
      {blocks.map((section: any, index: number) => componentResolver(section, index))}
      {/*Testing purpose because strapi has a bug and ca not be isuued in article page as a block
      because error appear during populate on backend articles relations
      */}
      {/* <DiscoverArticles
        data={{
          title: 'Test',
          articles: [
            ...articleResponse.data,
            ...articleResponse.data,
            ...articleResponse.data,
            ...articleResponse.data,
            ...articleResponse.data,
          ],
        }}
      /> */}
    </>
  );
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const articleResponse = await ArticlesAPI.findMany(locale, 0, 1000);

  if (articleResponse && 'error' in articleResponse) return [];
  return articleResponse.data.map((element: Article) => ({ slug: element.slug }));
}

const FALLBACK_SEO: Metadata = {
  title: 'Rohi Global Consulting - Article',
  description: 'Article created by Rohi Global Consulting',
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const articleResponse = await ArticlesAPI.findMany(locale, 0, 1, { slug });

  if (articleResponse && 'error' in articleResponse) return FALLBACK_SEO;

  if (articleResponse.data.length === 0) return FALLBACK_SEO;
  const { seo, author, publishedAt } = articleResponse.data[0];
  const facebookSeo: MetaSocial | undefined = seo.metaSocial.find(
    (element: MetaSocial) => element.socialNetwork === MetaSocialNetwork.Facebook
  );
  const xSeo: MetaSocial | undefined = seo.metaSocial.find(
    (element: MetaSocial) => element.socialNetwork === MetaSocialNetwork.Facebook
  );
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    authors: author ? [{ name: author.name }] : [],
    openGraph: facebookSeo
      ? {
          title: facebookSeo.title,
          description: facebookSeo.description,
          url: HttpClient.getStrapiURL(`/blog/articles/${slug}`),
          type: 'article',
          publishedTime: publishedAt,
          images: [
            {
              url: HttpClient.getStrapiMedia(facebookSeo.image.url),
            },
          ],
          locale: locale,
        }
      : {},
    twitter: xSeo
      ? {
          card: 'summary_large_image',
          title: xSeo.title,
          description: xSeo.description,
          images: [HttpClient.getStrapiMedia(xSeo.image.url)],
        }
      : {},
  };
}
