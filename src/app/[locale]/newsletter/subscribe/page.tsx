import { NewsletterAPI } from '@/api/NewsletterAPI';
import { confirmUserNewsletterSubscriptionService } from '@/data/services/newsletter-service';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export default async function SubscribeRoute({
  searchParams,
  params,
}: {
  params: { locale: string };
  searchParams: { newsletterUserDocumentId: string | null; confirmationToken: string | null };
}) {
  const { newsletterUserDocumentId, confirmationToken } = searchParams;
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  if (!newsletterUserDocumentId)
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('subscribe.errors.userIdEmpty')}
      </h1>
    );
  if (!confirmationToken)
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('subscribe.errors.confirmationTokenEmpty')}
      </h1>
    );

  try {
    const data = await NewsletterAPI.findOne(newsletterUserDocumentId);
    if (data && data.data && data.data.isConfirmed)
      return (
        <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
          {t('subscribe.errors.emailAlreadyConfirmed')}
        </h1>
      );
    if (data && 'error' in data && data.error && data.error.status === 404)
      return (
        <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
          {t('subscribe.errors.userNotFound')}
        </h1>
      );

    if (
      data &&
      data.data &&
      data.data.documentId === newsletterUserDocumentId &&
      data.data.confirmationToken === confirmationToken
    ) {
      await confirmUserNewsletterSubscriptionService(data.data.documentId, {
        email: data.data.email,
        unsubscribeToken: data.data.unsubscribeToken,
        confirmationToken: data.data.confirmationToken,
        isConfirmed: true,
      });

      return (
        <h1 className="container mx-auto bg-background font-bold my-16 border border-green-600 text-center p-16  rounded-xl text-green-600 text-3xl">
          {t('subscribe.success')}
        </h1>
      );
    }
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('subscribe.errors.confirmationTokenIncorrect')}
      </h1>
    );
    // eslint-disable-next-line
  } catch (error) {
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('subscribe.errors.generalError')}
      </h1>
    );
  }
}
