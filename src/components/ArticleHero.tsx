import { Author as AuthorType } from '@/models/Author';
import { Image as ImageType } from '@/models/common/Image';
import { Author } from './Author';
import { ArticleKindType } from './Article';
import Image from 'next/image';
import { HttpClient } from '@/api/HttpClient';

interface ArticleHeroProps {
  title: string;
  description: string;
  publishedAt: string;
  author: AuthorType | null;
  cover: ImageType;
}

export default function ArticleHero(props: ArticleHeroProps) {
  const { title, description, author, publishedAt, cover } = props;
  return (
    <section className="container mx-auto py-16">
      <div className="mb-4">
        <h1 className="text-center font-bold text-5xl text-secondary mb-4">{title}</h1>
        {description && <p className="text-center mx-auto text-lg lg:max-w-[70%]">{description}</p>}
      </div>
      {author && (
        <div className="w-full flex justify-center mb-12">
          <Author author={author} type={ArticleKindType.PRIMARY} publishedAt={publishedAt} />
        </div>
      )}
      <Image
        priority
        src={HttpClient.getStrapiMedia(cover.url)}
        alt={cover.alternativeText || ''}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto max-h-[450px] mx-auto"
      />
    </section>
  );
}
