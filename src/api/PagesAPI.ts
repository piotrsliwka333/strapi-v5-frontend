import { CollectionType } from '@/models/CollectionType';
import { Page } from '@/models/Page';
import { HttpClient } from './HttpClient';
import { ErrorAPI } from '@/models/ErrorAPI';

export class PagesAPI {
  static getUrl() {
    return `/pages`;
  }

  static getParamsObject(
    locale: string,
    filters?: Record<string, string | Record<string, string>>
  ) {
    return {
      filters: filters ? filters : {},
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
            'sections.blog-hero': {
              populate: {
                fields: ['title', 'description'],
                articleLeft: {
                  populate: {
                    cover: {
                      populate: '*',
                    },
                    author: {
                      populate: '*',
                    },
                    category: {
                      populate: '*',
                    },
                  },
                },
                articleRightTop: {
                  populate: {
                    cover: {
                      populate: '*',
                    },
                    author: {
                      populate: '*',
                    },
                  },
                },
                articleRightBottom: {
                  populate: {
                    cover: {
                      populate: '*',
                    },
                    author: {
                      populate: '*',
                    },
                  },
                },
              },
            },
            'sections.latest-articles': {
              populate: '*',
            },
            'sections.services-hero': {
              populate: {
                fields: ['title', 'description'],
                background: {
                  populate: '*',
                },
                buttonOne: {
                  populate: '*',
                },
                buttonTwo: {
                  populate: '*',
                },
              },
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

  static findMany(
    locale: string,
    filters?: Record<string, string | Record<string, string>>
  ): Promise<CollectionType<Page> | ErrorAPI> {
    return HttpClient.get(this.getUrl(), this.getParamsObject(locale, filters)).then((response) =>
      HttpClient.mapResponse<CollectionType<Page> | ErrorAPI>(response)
    );
  }
}
