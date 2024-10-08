export interface Page {
  slug: string;
  // eslint-disable-next-line
  blocks: any[];
}

export interface PageFindManyResponseError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    // eslint-disable-next-line
    details: { errors: any[] };
  };
}
