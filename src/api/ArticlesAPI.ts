import { Article } from '@/models/Article';
import { HttpClient } from './HttpClient';
import { CollectionType } from '@/models/CollectionType';
import { ErrorAPI } from '@/models/ErrorAPI';

export class ArticlesAPI {
  static getUrl() {
    return `/articles`;
  }

  static getParamsObject(
    locale: string,
    page: number,
    limit: number,
    filters?: Record<string, string | Record<string, string>>
  ) {
    return {
      filters: filters ? filters : {},
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
            // componented until strapi fix their bug
            // 'sections.discover-articles': {
            //   fields: ['title'],
            //   articles: {
            //     populate: '*',
            //   },
            // },
          },
        },
        seo: {
          populate: {
            fields: [
              'metaTitle',
              'metaDescription',
              'keywords',
              'metaRobots',
              'structuredData',
              'metaViewport',
              'canonicalURL',
            ],
            metaImage: { populate: '*' },
            metaSocial: {
              populate: {
                fields: ['socialNetwork', 'title', 'description'],
                image: {
                  populate: '*',
                },
              },
            },
          },
        },
      },
      pagination: {
        page,
        pageSize: limit,
      },
    };
  }

  static findMany(
    locale: string,
    page: number,
    limit: number,
    filters?: Record<string, string | Record<string, string>>
  ): Promise<CollectionType<Article> | ErrorAPI> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale, page, limit, filters)).then(
      (response) => HttpClient.mapResponse<CollectionType<Article> | ErrorAPI>(response)
    );
  }
}
