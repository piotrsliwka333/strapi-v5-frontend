import { Author } from './Author';
import { Category } from './Category';
import { Image } from './common/Image';

export interface Article {
  author: Author | null;
  category: Category | null;
  cover: Image;
  // eslint-disable-next-line
  blocks: any[];
  createdAt: string;
  description: string;
  documentId: string;
  id: number;
  locale: string;
  publishedAt: string;
  slug: string;
  title: string;
  updatedAt: string;
}
