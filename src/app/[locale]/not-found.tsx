import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function NotFound() {
  const t = useTranslations();
  return (
    <section
      // className={`w-full py-36 bg-top min-h-[100vh] bg-no-repeat bg-[url('/404_page_background.png')]`}
      className={`w-full py-16`}
    >
      <h1 className="text-3xl font-bold text-center xl:text-4xl mb-8 xl:mb-8">
        {t('notFound.title')}
      </h1>
      <Image
        priority
        src={'/404_page_background.png'}
        alt="none provided"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto mb-16 xl:w-[80%] mx-auto"
      />
      <div className="flex justify-center mt-8">
        <Link href="/" className="btn-primary flex items-center">
          <span className="flex items-center mr-3">{t('shared.buttons.backToHomePage')}</span>
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6H13M13 6L8.41176 2M13 6L8.41176 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
