import { Article as ArticleType } from '@/models/Article';
import { Article, ArticleKindType, ArticleOrientation } from './Article';

interface BlogHeroProps {
  data: {
    id: string;
    title: string;
    description: string | null;
    articleLeft: ArticleType;
    articleRightTop: ArticleType;
    articleRightBottom: ArticleType;
  };
}

export default function BlogHero({ data }: BlogHeroProps) {
  const { title, description, articleLeft, articleRightTop, articleRightBottom } = data;
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center font-bold text-5xl text-secondary mb-4">{title}</h1>
      {description && (
        <p className="text-center mx-auto text-lg mb-16 lg:max-w-[70%]">{description}</p>
      )}
      <div className="grid lg:auto-rows-max gap-8 lg:grid-cols-4">
        <Article
          className="lg:col-span-2 lg:row-span-4"
          type={ArticleKindType.SECONDARY}
          orientation={ArticleOrientation.VERTICAL}
          article={articleLeft}
        />
        <Article
          className="lg:col-span-2 lg:row-span-2"
          type={ArticleKindType.SECONDARY}
          orientation={ArticleOrientation.HORIZONTAL}
          article={articleRightTop}
        />
        <Article
          className="lg:col-span-2 lg:row-span-2"
          type={ArticleKindType.SECONDARY}
          orientation={ArticleOrientation.HORIZONTAL}
          article={articleRightBottom}
        />
        {/* <Article
          type={ArticleKindType.PRIMARY}
          orientation={ArticleOrientation.HORIZONTAL}
          article={articleRightTop}
        />
        <Article
          type={ArticleKindType.SECONDARY}
          orientation={ArticleOrientation.HORIZONTAL}
          article={articleRightBottom}
        />
        <Article
          type={ArticleKindType.SECONDARY}
          orientation={ArticleOrientation.HORIZONTAL}
          article={articleRightBottom}
        /> */}
      </div>
    </section>
  );
}
