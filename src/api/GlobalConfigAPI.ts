import { GlobalConfig } from '@/models/GlobalConfig';
import { HttpClient } from './HttpClient';
import { SingleType } from '@/models/SingleType';
import { ErrorAPI } from '@/models/ErrorAPI';

export class GlobalConfigAPI {
  static getUrl() {
    return `/global`;
  }

  static getParamsObject(locale: string) {
    return {
      locale,
      populate: {
        favicon: { populate: '*' },
        header: {
          populate: {
            button: true,
            logo: {
              populate: {
                image: true,
              },
            },
            mainLinks: {
              populate: {
                nestedLinks: true,
              },
            },
          },
        },
        footer: {
          populate: {
            brandLogos: true,
            newsletter: {
              populate: '*',
            },
            mainLinks: {
              populate: '*',
            },
            contact: {
              populate: '*',
            },
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
    };
  }

  static find(locale: string): Promise<SingleType<GlobalConfig> | ErrorAPI> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale)).then((response) =>
      HttpClient.mapResponse<SingleType<GlobalConfig> | ErrorAPI>(response)
    );
  }
}
