import { Image } from './Image';

export enum MetaSocialNetwork {
  Facebook = 'Facebook',
  Twitter = 'Twitter',
}

export interface MetaSocial {
  socialNetwork: MetaSocialNetwork;
  title: string;
  description: string;
  image: Image | null;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage: Image | null;
  metaSocial: MetaSocial[];
  keywords: string | null;
  metaRobots: string | null;
  structuredData: JSON;
  metaViewport: string;
  canocialURL: string;
}
