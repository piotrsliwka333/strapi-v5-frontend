import { Article } from "@/models/Article";
import { HttpClient } from "./HttpClient";
import { CollectionType } from "@/models/CollectionType";

export class ArticlesAPI {

  static getUrl() {
    return `/articles`
  }

  static getParamsObject(locale: string, start: number, limit: number, filter?: Record<string, string>) {
    
    if (filter) return {
      filter,
      sort: { createdAt: 'desc' },
      locale,
      populate: {
        cover: { fields: ['url'] },
        category: { populate: '*' },
        author: {
          populate: '*',
        },
        blocks: {
          on: {
            'shared.media': {
              populate: '*',
            },
          },
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    }
    
    return {
      sort: { createdAt: 'desc' },
      locale,
      populate: {
        cover: { fields: ['url'] },
        category: { populate: '*' },
        author: {
          populate: '*',
        },
        blocks: {
          on: {
            'shared.media': {
              populate: '*',
            },
          },
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    }
  }

  static findMany(locale: string, start: number, limit: number, filter?: Record<string, string>): Promise<CollectionType<Article>> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale, start, limit, filter)).then(response => HttpClient.mapResponse<CollectionType<Article>>(response))
  }
}