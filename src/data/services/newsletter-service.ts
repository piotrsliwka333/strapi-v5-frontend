import { NewsletterAPI } from '@/api/NewsletterAPI';
import { ErrorAPI } from '@/models/ErrorAPI';
import { NewsletterCreateResponse, NewsletterPayload } from '@/models/Newsletter';
import { v4 as uuidv4 } from 'uuid';

interface SubscribeToNewsletterProps {
  email: string;
}

export async function subscribeToNewsletterService(
  userData: SubscribeToNewsletterProps
): Promise<NewsletterCreateResponse | ErrorAPI> {
  const payload: NewsletterPayload = {
    data: {
      email: userData.email,
      unsubscribeToken: uuidv4(),
      confirmationToken: uuidv4(),
      isConfirmed: false,
    },
  };

  try {
    return NewsletterAPI.create(payload);
  } catch (error) {
    // eslint-disable-next-line
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
): Promise<NewsletterCreateResponse | ErrorAPI> {
  try {
    return NewsletterAPI.update(id, { data: userData });
  } catch (error) {
    // eslint-disable-next-line
    throw new Error(error as any);
  }
}

export async function unsubscribeNewsletterService(id: string): Promise<void | ErrorAPI> {
  try {
    return NewsletterAPI.delete(id);
  } catch (error) {
    // eslint-disable-next-line
    throw new Error(error as any);
  }
}
