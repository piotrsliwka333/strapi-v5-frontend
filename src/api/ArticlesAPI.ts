import { Article } from '@/models/Article';
import { HttpClient } from './HttpClient';
import { CollectionType } from '@/models/CollectionType';

export class ArticlesAPI {
  static getUrl() {
    return `/articles`;
  }

  static getParamsObject(
    locale: string,
    start: number,
    limit: number,
    filters?: Record<string, string | Record<string, string>>
  ) {
    if (filters)
      return {
        filters,
        sort: { createdAt: 'desc' },
        locale,
        populate: {
          cover: { populate: '*' },
          category: { populate: '*' },
          author: {
            populate: '*',
          },
          blocks: {
            on: {
              'article-shared.media': {
                populate: '*',
              },
              'article-shared.rich-text': {
                populate: '*',
              },
              'article-shared.cta-command-line': {
                populate: '*',
              },
            },
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };

    return {
      sort: { createdAt: 'desc' },
      locale,
      populate: {
        cover: { populate: '*' },
        category: { populate: '*' },
        author: {
          populate: '*',
        },
        blocks: {
          on: {
            'article-shared.media': {
              populate: '*',
            },
            'article-shared.rich-text': {
              populate: '*',
            },
          },
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    };
  }

  static findMany(
    locale: string,
    start: number,
    limit: number,
    filters?: Record<string, string | Record<string, string>>
  ): Promise<CollectionType<Article>> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale, start, limit, filters)).then(
      (response) => HttpClient.mapResponse<CollectionType<Article>>(response)
    );
  }
}
