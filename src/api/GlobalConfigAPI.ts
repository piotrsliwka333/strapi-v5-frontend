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
        favicon: true,
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
      },
    };
  }

  static find(locale: string): Promise<SingleType<GlobalConfig> | ErrorAPI> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale)).then((response) =>
      HttpClient.mapResponse<SingleType<GlobalConfig> | ErrorAPI>(response)
    );
  }
}
