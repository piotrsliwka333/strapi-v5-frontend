import { CollectionType } from '@/models/CollectionType';
import { Page, PageFindManyResponseError } from '@/models/Page';
import { HttpClient } from './HttpClient';

export class PagesAPI {
  static getUrl() {
    return `/pages`;
  }

  static getParamsObject(locale: string, filters: Record<string, string>) {
    return {
      filters,
      locale,
      populate: {
        blocks: {
          on: {
            'sections.about-us': {
              populate: {
                fields: ['title', 'description'],
                image: {
                  populate: '*',
                },
                button: {
                  populate: '*',
                },
              },
            },
            'sections.advanced-hero': {
              populate: {
                slides: {
                  populate: {
                    fields: ['title', 'description'],
                    link: {
                      populate: '*',
                    },
                  },
                },
                background: {
                  populate: {
                    populate: '*',
                  },
                },
                elements: {
                  populate: {
                    fields: ['title', 'url'],
                    icon: {
                      populate: '*',
                    },
                  },
                },
              },
            },
            'sections.clients': {
              populate: {
                clients: {
                  populate: {
                    fields: ['name', 'url'],
                    icon: {
                      populate: '*',
                    },
                  },
                },
              },
            },
            'sections.hero': {
              populate: {
                fields: ['title', 'description'],
                imageLeft: {
                  populate: '*',
                },
                imageRight: {
                  populate: '*',
                },
                button: {
                  populate: '*',
                },
              },
            },
            'sections.offers': {
              populate: {
                fields: ['title', 'videoUrl'],
                offers: {
                  populate: {
                    fields: ['title', 'description'],
                    icon: {
                      populate: '*',
                    },
                  },
                },
              },
              // populate: {
              //   fields: ['title', 'videoUrl'],
              //   offers: {
              //     populate: '*',
              //   },
              //   // that's weird because that population crash the whole app
              //   // but it seems to properly reflect the data inside elements - offer
              //   // maybe right now populate: "*" is enough to populate everything in some component alone
              //   // offers: {
              //   //   populate: {
              //   //     fields: ['title', 'description'],
              //   //     icon: { populate: '*' },
              //   //   },
              //   // },
              // },
            },
          },
        },
      },
    };
  }

  static findMany(
    locale: string,
    filters: Record<string, string>
  ): Promise<CollectionType<Page> | PageFindManyResponseError> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale, filters)).then((response) =>
      HttpClient.mapResponse<CollectionType<Page> | PageFindManyResponseError>(response)
    );
  }
}
