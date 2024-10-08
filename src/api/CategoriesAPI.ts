import { CollectionType } from '@/models/CollectionType';
import { Page, PageFindManyResponseError } from '@/models/Page';
import { HttpClient } from './HttpClient';
import { Category } from '@/models/Category';
import { ErrorAPI } from '@/models/ErrorAPI';

export class CategoriesAPI {
  static getUrl() {
    return `/categories`;
  }

  static getParamsObject(locale: string, filters?: Record<string, string>) {
    if (filters)
      return {
        filters,
        locale,
        populate: '*',
      };
    return {
      locale,
      populate: '*',
    };
  }

  static findMany(
    locale: string,
    filters?: Record<string, string>
  ): Promise<CollectionType<Category> | ErrorAPI> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale, filters)).then((response) =>
      HttpClient.mapResponse<CollectionType<Category> | ErrorAPI>(response)
    );
  }
}
