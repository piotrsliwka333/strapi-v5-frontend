import {
  NewsletterCreateResponse,
  NewsletterFindOneResponse,
  NewsletterPayload,
} from '@/models/Newsletter';
import { HttpClient } from './HttpClient';
import { SingleType } from '@/models/SingleType';
import { ErrorAPI } from '@/models/ErrorAPI';

export class NewsletterAPI {
  static getUrl(id?: string) {
    return id ? `/newsletter-users/${id}` : `/newsletter-users`;
  }

  static getPayload(payload: NewsletterPayload) {
    return payload;
  }

  static findOne(id: string): Promise<SingleType<NewsletterFindOneResponse> | ErrorAPI> {
    return HttpClient.get(this.getUrl(id)).then((response) =>
      HttpClient.mapResponse<SingleType<NewsletterFindOneResponse> | ErrorAPI>(response)
    );
  }

  static create(payload: NewsletterPayload): Promise<NewsletterCreateResponse | ErrorAPI> {
    return HttpClient.post(
      this.getUrl(),
      this.getPayload(payload),
      HttpClient.getServerOnlyCredentials()
    ).then((response) => HttpClient.mapResponse<NewsletterCreateResponse | ErrorAPI>(response));
  }

  static update(
    id: string,
    payload: NewsletterPayload
  ): Promise<NewsletterCreateResponse | ErrorAPI> {
    return HttpClient.put(
      this.getUrl(id),
      this.getPayload(payload),
      HttpClient.getServerOnlyCredentials()
    ).then((response) => HttpClient.mapResponse<NewsletterCreateResponse | ErrorAPI>(response));
  }

  static delete(id: string): Promise<void | ErrorAPI> {
    return HttpClient.delete(this.getUrl(id), HttpClient.getServerOnlyCredentials()).then(
      (response) => HttpClient.mapResponse<void | ErrorAPI>(response)
    );
  }
}
