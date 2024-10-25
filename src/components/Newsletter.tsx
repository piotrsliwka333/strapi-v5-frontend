'use client';
import { HttpClient } from '@/api/HttpClient';
import { subscribeNewsletterAction } from '@/data/actions/newsletter-actions';
import { Newsletter as NewsletterType } from '@/models/Footer';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { SubmitButton } from './forms/SubmitButton';
import { ZodErrors } from './forms/ZodErrors';

interface NewsletterProps {
  newsletter: NewsletterType;
}

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export const Newsletter: React.FC<NewsletterProps> = (props: NewsletterProps) => {
  const { newsletter } = props;
  const t = useTranslations();
  const [formState, formAction] = useFormState(subscribeNewsletterAction, INITIAL_STATE);
  // when absolute it looks like the margin is not added to full width of your element
  return (
    <div className="container mx-auto absolute left-1/2 w-full top-0 translate-y-[-50%] translate-x-[-50%]">
      <div className="xl:px-16">
        <div className="bg-background border border-secondary lg:flex justify-between items-center px-4 py-8 lg:pl-[190px] rounded-xl text-textPrimary relative">
          <div className="hidden lg:block absolute left-[-20px] top-1/2 translate-y-[-50%] rounded-xl overflow-hidden">
            {/* because of reaching limit on vercel for image optimizations has to swich to normal images */}
            {/* <Image
              priority
              src={HttpClient.getStrapiMedia(newsletter.image.url)}
              alt="none provided"
              width={150}
              height={150}
              sizes="100vw"
            /> */}
            <img
              src={HttpClient.getStrapiMedia(newsletter.image.url)}
              alt={newsletter.image.alternativeText || 'none provided'}
              className="w-[150px] h-[150px]"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2 lg:mb-0">{newsletter.title}</h1>
          {formState.message === 'newsletter.messages.success' ? (
            <h1 className="text-green-600 font-bold text-2xl flex items-center justify-center">
              {t(formState.message)}
              {/* <Image
                priority
                src={'/circle-check-regular-1.svg'}
                alt="none provided"
                width={40}
                height={40}
                sizes="100vw"
              /> */}
              <img
                src="/circle-check-regular-1.svg"
                alt="none provided"
                className="w-[40px] h-[40px]"
              />
            </h1>
          ) : (
            <form action={formAction} className="md:flex items-start w-full max-w-[500px]">
              <div className="w-full max-w-[400px] mb-2 md:mb-0 md:mr-2">
                <input
                  id="email"
                  name="email"
                  className="p-2 border border-secondary rounded w-full block"
                  placeholder={newsletter.inputPlaceholder}
                />
                <ZodErrors error={formState.zodErrors?.email} />
                {formState.strapiErrors && formState.strapiErrors.message && (
                  <div className="text-pink-500 text-md italic py-2">
                    {t(formState.strapiErrors.message)}
                  </div>
                )}
              </div>

              <SubmitButton text={newsletter.buttonText} loadingText={newsletter.buttonText} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
