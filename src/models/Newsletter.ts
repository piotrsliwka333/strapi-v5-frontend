export interface NewsletterPayload {
  data: {
    email: string;
    unsubscribeToken: string;
    confirmationToken: string;
    isConfirmed: boolean;
  };
}

export interface NewsletterFindOneResponse {
  documentId: string;
  id: number;
  email: string;
  unsubscribeToken: string;
  confirmationToken: string;
  isConfirmed: boolean;
  created_by: null;
  updated_by: null;
  created_at: string;
  updated_at: string;
  locale: null;
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
