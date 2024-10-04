import { NewsletterAPI } from '@/api/NewsletterAPI';
import { unsubscribeNewsletterService } from '@/data/services/newsletter-service';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export default async function UnsubscribeRoute({
  searchParams,
  params,
}: {
  params: { locale: string };
  searchParams: { newsletterUserId: string | null; unsubscribeToken: string | null };
}) {
  const { newsletterUserId, unsubscribeToken } = searchParams;
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  if (!newsletterUserId)
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('unsubscribe.errors.userIdEmpty')}
      </h1>
    );
  if (!unsubscribeToken)
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('unsubscribe.errors.unsubscribeTokenEmpty')}
      </h1>
    );

  try {
    const data = await NewsletterAPI.findOne(newsletterUserId);
    if ('error' in data && data && data.error && data.error.status === 404)
      return (
        <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
          {t('unsubscribe.errors.notInNewsletter')}
        </h1>
      );

    if (
      'isConfirmed' in data &&
      data.id === +newsletterUserId &&
      data.unsubscribeToken === unsubscribeToken
    ) {
      await unsubscribeNewsletterService(data.id.toString());
      return (
        <h1 className="container mx-auto bg-background font-bold my-16 border border-green-600 text-center p-16  rounded-xl text-green-600 text-3xl">
          {t('unsubscribe.success')}
        </h1>
      );
    }
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('unsubscribe.errors.unsubscribeTokenIncorrect')}
      </h1>
    );
  } catch (error: any) {
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('unsubscribe.errors.generalError')}
      </h1>
    );
  }
}
