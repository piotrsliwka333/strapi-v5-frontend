import { Article as ArticleType } from '@/models/Article';
import { Article, ArticleKindType, ArticleOrientation } from './Article';

interface DiscoverArticles {
  data: {
    title: string;
    articles: ArticleType[];
  };
}

export default function DiscoverArticles({ data }: DiscoverArticles) {
  const { title, articles } = data;

  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center font-bold text-5xl text-textPrimary mb-8">{title}</h1>
      <ul
        style={{
          gridTemplateRows: 'auto',
          gridTemplateColumns: `repeat(auto-fit, minmax(250px, 300px))`,
        }}
        className="gap-8 w-full grid justify-center"
      >
        {articles.map((article: ArticleType) => (
          <li key={article.id} className="w-full">
            <Article
              article={article}
              type={ArticleKindType.PRIMARY}
              orientation={ArticleOrientation.VERTICAL}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
