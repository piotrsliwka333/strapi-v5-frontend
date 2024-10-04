import { NewsletterAPI } from '@/api/NewsletterAPI';
import { confirmUserNewsletterSubscriptionService } from '@/data/services/newsletter-service';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export default async function SubscribeRoute({
  searchParams,
  params,
}: {
  params: { locale: string };
  searchParams: { newsletterUserId: string | null; confirmationToken: string | null };
}) {
  const { newsletterUserId, confirmationToken } = searchParams;
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  if (!newsletterUserId)
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
    const data = await NewsletterAPI.findOne(newsletterUserId);
    if ('isConfirmed' in data && data.isConfirmed)
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
      'isConfirmed' in data &&
      data.id === +newsletterUserId &&
      data.confirmationToken === confirmationToken
    ) {
      await confirmUserNewsletterSubscriptionService(data.id.toString(), {
        email: data.email,
        unsubscribeToken: data.unsubscribeToken,
        confirmationToken: data.confirmationToken,
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
  } catch (error: any) {
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('subscribe.errors.generalError')}
      </h1>
    );
  }
}
