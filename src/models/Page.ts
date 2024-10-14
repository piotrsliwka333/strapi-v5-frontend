import { SEO } from './common/SEO';

export interface Page {
  slug: string;
  // eslint-disable-next-line
  blocks: any[];
  seo: SEO;
}
