export interface NewsletterPayload {
  data: {
    email: string,
    unsubscribeToken: string,
    confirmationToken: string,
    isConfirmed: boolean,
  }
}

export interface NewsletterFindOneResponse {
  id: number;
  email: string;
  unsubscribeToken: string;
  confirmationToken: string;
  isConfirmed: boolean;
  created_by: null;
  updated_by: null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterCreateResponse {
  id: number;
  email: string;
  unsubscribeToken: string;
  confirmationToken: string;
  isConfirmed: boolean;
  created_by: null;
  updated_by: null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterCreateResponseError {
  data: null,
  error: {
    status: number,
    name: string,
    message: string,
    // eslint-disable-next-line
    details: { errors: any[] }
  }
};