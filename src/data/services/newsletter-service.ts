import { NewsletterAPI } from '@/api/NewsletterAPI';
import { NewsletterCreateResponse, NewsletterCreateResponseError, NewsletterPayload } from '@/models/Newsletter';
import { v4 as uuidv4 } from 'uuid';

interface SubscribeToNewsletterProps {
  email: string;
}

export async function subscribeToNewsletterService(userData: SubscribeToNewsletterProps): Promise<NewsletterCreateResponse | NewsletterCreateResponseError> {

  const payload: NewsletterPayload = {
    data: {
      email: userData.email,
      unsubscribeToken: uuidv4(),
      confirmationToken: uuidv4(),
      isConfirmed: false,
    },
  }

  try {
    return NewsletterAPI.create(payload)
  } catch (error) {
    throw new Error(error as any);
  }
}

interface ConfirmUserNewsletterSubscriptionProps {
  email: string;
  unsubscribeToken: string;
  confirmationToken: string;
  isConfirmed: boolean;
}

export async function confirmUserNewsletterSubscriptionService(
  id: string,
  userData: ConfirmUserNewsletterSubscriptionProps
) {

  try {
    return NewsletterAPI.update(id, {data: userData })
  } catch (error) {
    throw new Error(error as any);
  }
}

export async function unsubscribeNewsletterService(id: string) {
  try {
    return NewsletterAPI.delete(id)
  } catch (error) {
    throw new Error(error as any);
  }
}
