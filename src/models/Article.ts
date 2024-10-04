import { Author } from "./Author";
import { Category } from "./Category";

export interface Article {
  author: Author;
  category: Category;
  cover: {
    documentId: string;
    id: 8;
    url: string;
  };
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