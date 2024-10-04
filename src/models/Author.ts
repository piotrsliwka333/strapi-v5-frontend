interface Avatar {
  id: number,
  documentId: string,
  name: string,
  alternativeText: null,
  caption: null,
  width: number,
  height: number,
  formats: null,
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: null,
  provider: string,
  provider_metadata: null,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  locale: null
}

export interface Author {
  avatar: Avatar;
  createdAt: string;
  documentId: string;
  email: string;
  id: 2;
  locale: null;
  localizations: any[];
  name: string;
  publishedAt: string;
  updatedAt: string;
}