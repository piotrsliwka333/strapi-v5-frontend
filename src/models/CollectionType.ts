export interface Meta {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
}

export interface CollectionType<T> {
  data: T[];
  meta: Meta;
}
