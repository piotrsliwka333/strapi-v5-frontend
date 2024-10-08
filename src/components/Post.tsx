import Image from 'next/image';
import componentResolver from '@/utils/component-resolver';
import { HttpClient } from '@/api/HttpClient';
import { formatDate } from '@/utils/helpers';
import { Article } from '@/models/Article';

interface OwnProps {
  article: Article;
}

export default function Post(props: OwnProps) {
  const { article } = props;
  const { title, description, publishedAt, cover, author } = article;
  const imageUrl = HttpClient.getStrapiMedia(cover.url);

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {imageUrl && (
        <Image
          src={imageUrl}
          priority
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        {author && (
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
            <div className="flex items-center md:space-x-2">
              <Image
                src={HttpClient.getStrapiMedia(author.avatar.url)}
                priority
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
              <p className="text-md dark:text-violet-400">
                {author && author.name} • {formatDate(publishedAt)}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="dark:text-gray-100">
        <p>{description}</p>
        {/* eslint-disable-next-line */}
        {article.blocks.map((section: any, index: number) => componentResolver(section, index))}
      </div>
    </article>
  );
}
