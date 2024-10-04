export interface CollectionType<T> {
  data: T[]
  meta: {
    pagination: {
      start: number,
      limit: number,
      total: number,
    }
  }
}