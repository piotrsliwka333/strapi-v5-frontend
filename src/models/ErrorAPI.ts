export interface ErrorAPI {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    // eslint-disable-next-line
    details: { errors: any[] };
  };
}
