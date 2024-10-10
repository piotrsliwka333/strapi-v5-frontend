import { HttpClient } from '@/api/HttpClient';
import { Link } from '@/i18n/routing';
import { Article as ArticleType } from '@/models/Article';
import Image from 'next/image';
import { Author } from './Author';

export enum ArticleKindType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export enum ArticleOrientation {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
}

interface ArticleProps {
  type: ArticleKindType;
  orientation: ArticleOrientation;
  article: ArticleType;
  className?: string;
}

export const Article = (props: ArticleProps) => {
  const { article, type, orientation, className } = props;
  console.log(article);
  const { title, description, author, publishedAt, cover, slug } = article;
  return (
    <article
      className={`${className ? className : ''} rounded-xl ${
        type === ArticleKindType.PRIMARY ? 'border border-secondary' : 'bg-secondary'
      }`}
    >
      <Link
        className={`h-full ${
          orientation === ArticleOrientation.VERTICAL ? 'block' : 'block md:flex md:justify-between'
        } p-4 pb-6 `}
        // eslint-disable-next-line
        href={`/blog/articles/${slug}` as any}
      >
        <Image
          src={HttpClient.getStrapiMedia(cover.url)}
          priority
          alt={cover.alternativeText || 'not provided'}
          width={0}
          height={0}
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAEsCAYAAAB+Je/UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAViSURBVHgB7dZBAQAgDAChaYj1b6o17gEpOLv7BgCArDsAAKQJGwBAnLABAMQJGwBAnLABAMQJGwBAnLABAMQJGwBAnLABAMQJGwBAnLABAMQJGwBAnLAxAECbsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAECcsAEAxAkbAEDcB7nfA5nqZUCcAAAAAElFTkSuQmCC"
          // rozmzuje poniewaz jesli nie okreslone a nie ma propsa fill to pewnie jest 1 albo zero i wtedy bierze on
          // najmniejszej jakości zdjecie ktore jest slabej jakosci
          sizes="620px"
          className={`block rounded-xl ${
            orientation === ArticleOrientation.VERTICAL
              ? 'mb-4 w-full max-h-[300px]'
              : 'mb-4 w-full max-h-[300px] md:mb-0 md:w-[49%] md:max-h-[230px]'
          }`}
        />
        <div
          className={`${
            orientation === ArticleOrientation.VERTICAL ? 'w-full' : 'w-full md:w-[50%] md:pl-4'
          }`}
        >
          <h1
            className={`text-2xl mb-4 font-bold ${
              type === ArticleKindType.PRIMARY ? 'text-textPrimary' : 'text-white'
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-base mb-4 ${
              type === ArticleKindType.PRIMARY ? 'text-textPrimary' : 'text-white'
            }`}
          >
            {description}
          </p>
          {author && <Author author={author} publishedAt={publishedAt} type={type} />}
        </div>
      </Link>
    </article>
  );
};
