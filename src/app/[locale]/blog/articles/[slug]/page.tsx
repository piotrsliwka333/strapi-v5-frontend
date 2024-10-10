import { ArticlesAPI } from '@/api/ArticlesAPI';
import ArticleHero from '@/components/ArticleHero';
import { redirect } from '@/i18n/routing';
import componentResolver from '@/utils/component-resolver';

export default async function ArticleRoute({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = params;
  console.log(slug);

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
  const { author, cover, publishedAt, title, description, blocks } = articleResponse.data[0];
  return (
    <>
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
