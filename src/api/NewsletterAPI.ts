import { Article } from "@/models/Article";
import { HttpClient } from "./HttpClient";
import { CollectionType } from "@/models/CollectionType";
import { NewsletterCreateResponse, NewsletterCreateResponseError, NewsletterFindOneResponse, NewsletterPayload } from "@/models/Newsletter";

export class NewsletterAPI {

  static getUrl(id?: string) {
    return id ? `/newsletter-users${id}` : `/newsletter-users`
  }

  static getPayload(payload: NewsletterPayload) {
    return payload;
  }

  static findOne(id: string): Promise<NewsletterFindOneResponse | NewsletterCreateResponseError> {
    return HttpClient.get(this.getUrl(id)).then(response => HttpClient.mapResponse<NewsletterFindOneResponse | NewsletterCreateResponseError>(response))
  }

  static create(payload: NewsletterPayload): Promise<NewsletterCreateResponse | NewsletterCreateResponseError> {
    return HttpClient.post(this.getUrl(), this.getPayload(payload)).then(response => HttpClient.mapResponse<NewsletterCreateResponse | NewsletterCreateResponseError>(response))
  }

  static update(id: string, payload: NewsletterPayload): Promise<NewsletterCreateResponse | NewsletterCreateResponseError> {
    return HttpClient.put(this.getUrl(id), this.getPayload(payload)).then(response => HttpClient.mapResponse<NewsletterCreateResponse | NewsletterCreateResponseError>(response))
  }

  static delete(id: string): Promise<NewsletterCreateResponse | NewsletterCreateResponseError> {
    return HttpClient.delete(this.getUrl(id)).then(response => HttpClient.mapResponse<NewsletterCreateResponse | NewsletterCreateResponseError>(response))
  }
}