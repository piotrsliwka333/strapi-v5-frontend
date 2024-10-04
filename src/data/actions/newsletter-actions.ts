'use server';
import { z } from 'zod';
import { subscribeToNewsletterService } from '../services/newsletter-service';

const schema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export async function subscribeNewsletterAction(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Subscribe.',
    };
  }

  const responseData = await subscribeToNewsletterService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'newsletter.messages.error',
    };
  }

  if ('error' in responseData && responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'newsletter.messages.error',
    };
  }

  return {
    ...prevState,
    strapiErrors: null,
    zodErrors: null,
    message: 'newsletter.messages.success',
  };
}
