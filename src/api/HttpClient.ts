import { ErrorAPI } from '@/models/ErrorAPI';
import qs from 'qs';

export class HttpClient {
  static getStrapiURL(path: string = ''): string {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
  }

  static getStrapiMedia(url: string): string {
    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
      return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${this.getStrapiURL()}${url}`;
  }

  static getServerOnlyCredentials(): object {
    return { Authorization: `Bearer ${process.env.STRAPI_SERVER_ONLY_API_TOKEN}` };
  }

  static async get(path: string, urlParamsObject: object = {}, options: object = {}) {
    try {
      // Merge default and user options
      const mergedOptions = {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
          ...options,
        },
      };

      // Build request URL
      const queryString = qs.stringify(urlParamsObject);
      const requestUrl = `${this.getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ''}`
      )}`;
      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error as any);
    }
  }

  static async post(
    path: string,
    body: Record<'data', Record<string, string | number | boolean>>,
    options: object = {}
  ) {
    const requestUrl: string = this.getStrapiURL(`/api${path}`);
    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options,
        },
        body: JSON.stringify(body),
        cache: 'no-cache',
      });

      return response.json();
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error as any);
    }
  }

  static async put(
    path: string,
    body: Record<'data', Record<string, string | number | boolean>>,
    options: object = {}
  ) {
    const requestUrl: string = this.getStrapiURL(`/api${path}`);
    try {
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options,
        },
        body: JSON.stringify(body),
        cache: 'no-cache',
      });

      return response.json();
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error as any);
    }
  }

  static async delete(path: string, options: object = {}): Promise<void | ErrorAPI> {
    const requestUrl: string = this.getStrapiURL(`/api${path}`);
    try {
      const response = await fetch(requestUrl, {
        method: 'DELETE',
        headers: {
          ...options,
        },
      });
      if (response.status === 204) return; // here when don't want to use json() metohd to resolve the body
      // as status 204 indicates there is no body content. If we do it we will receive the error.
      return response.json();
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error as any);
    }
  }

  static mapResponse<T>(response: T): T {
    return response;
  }
}
