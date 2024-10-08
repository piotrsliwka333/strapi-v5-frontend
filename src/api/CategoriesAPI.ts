import { Category } from '@/models/Category';
import { CollectionType } from '@/models/CollectionType';
import { ErrorAPI } from '@/models/ErrorAPI';
import { HttpClient } from './HttpClient';

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
