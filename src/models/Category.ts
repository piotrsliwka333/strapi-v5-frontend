import { Article } from './Article';

export interface Category {
  createdAt: string;
  documentId: string;
  slug: string;
  id: 2;
  locale: null;
  // eslint-disable-next-line
  localizations: any[];
  articles: Article[];
  name: string;
  publishedAt: string;
  updatedAt: string;
}
