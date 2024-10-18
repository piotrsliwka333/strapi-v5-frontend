import { NewsletterAPI } from '@/api/NewsletterAPI';
import { unsubscribeNewsletterService } from '@/data/services/newsletter-service';
import { getTranslations } from 'next-intl/server';

export default async function UnsubscribeRoute({
  searchParams,
}: {
  params: { locale: string };
  searchParams: { newsletterUserDocumentId: string | null; unsubscribeToken: string | null };
}) {
  const { newsletterUserDocumentId, unsubscribeToken } = searchParams;
  const t = await getTranslations();

  if (!newsletterUserDocumentId)
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
    const data = await NewsletterAPI.findOne(newsletterUserDocumentId);
    if ('error' in data && data && data.error && data.error.status === 404)
      return (
        <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
          {t('unsubscribe.errors.notInNewsletter')}
        </h1>
      );

    if (
      data &&
      data.data &&
      data.data.documentId === newsletterUserDocumentId &&
      data.data.unsubscribeToken === unsubscribeToken
    ) {
      const unsubscribeNewsletterResponse = await unsubscribeNewsletterService(
        data.data.documentId
      );
      if (unsubscribeNewsletterResponse && 'error' in unsubscribeNewsletterResponse)
        return (
          <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
            {unsubscribeNewsletterResponse.error.message}
          </h1>
        );
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
    // eslint-disable-next-line
  } catch (error: any) {
    return (
      <h1 className="container mx-auto bg-background font-bold my-16 border border-red-500 text-center p-16  rounded-xl text-red-500 text-3xl">
        {t('unsubscribe.errors.generalError')}
      </h1>
    );
  }
}
