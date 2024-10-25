import { HttpClient } from '@/api/HttpClient';
import { Link } from '@/i18n/routing';
import { Image as ImageType } from '@/models/common/Image';
import { Link as LinkType } from '@/models/common/Link';

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    imageLeft: ImageType;
    imageRight: ImageType;
    button: LinkType;
  };
}

export default function Hero({ data }: HeroProps) {
  const imgLeftUrl = HttpClient.getStrapiMedia(data.imageLeft.url);
  const imgRightUrl = HttpClient.getStrapiMedia(data.imageRight.url);

  return (
    <section className="w-full py-12 pt-20 lg:py-20">
      <div className="container mx-auto xl:flex xl:justify-between h-full">
        <div className="hidden xl:flex xl:items-end basis-[240px]">
          {/* because of reaching limit on vercel for image optimizations has to swich to normal images */}
          {/* <Image
            src={imgLeftUrl}
            alt={data.imageLeft.alternativeText || 'none provided'}
            height={0}
            width={0}
            sizes="100vw"
            className="w-[240px] h-[240px]"
          /> */}
          <img
            src={imgLeftUrl}
            alt={data.imageLeft.alternativeText || 'none provided'}
            className="w-[240px] h-[240px]"
          />
        </div>

        <div className="mb-24 xl:mb-0 xl:block xl:py-20 xl:basis-2/4">
          <h1 className="text-secondary mb-8 text-4xl font-bold text-center sm:text-5xl xl:font-extrabold xl:sm:text-6xl dark:text-white">
            {data.title}
          </h1>
          <p className="text-textPrimary text-lg text-center sm:text-xl dark:text-gray-400 ">
            {data.description}
          </p>
          {data.button && (
            <div className="flex justify-center mt-8">
              {/* eslint-disable-next-line */}
              <Link href={data.button.url as any} className="btn-primary flex items-center">
                <span className="flex items-center mr-3">{data.button.text}</span>
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
          )}
        </div>

        <div className="hidden xl:block basis-[240px]">
          {/* <Image
            src={imgRightUrl || ''}
            priority
            alt={data.imageRight.alternativeText || 'none provided'}
            height={0}
            width={0}
            sizes="100vw"
            className="w-[195px] h-[195px]"
          /> */}
          <img
            src={imgRightUrl}
            alt={data.imageRight.alternativeText || 'none provided'}
            className="w-[240px] h-[240px]"
          />
        </div>

        <div className="relative h-[320px] w-[320px] mx-auto xl:hidden">
          {/* <Image
            src={imgLeftUrl || ''}
            priority
            alt={data.imageLeft.alternativeText || 'none provided'}
            className="absolute top-0 left-0"
            width={195}
            height={195}
          /> */}
          <img
            src={imgLeftUrl}
            alt={data.imageLeft.alternativeText || 'none provided'}
            className="w-[195px] h-[195px] absolute top-0 left-0"
          />
          {/* <Image
            src={imgRightUrl || ''}
            priority
            alt={data.imageRight.alternativeText || 'none provided'}
            className="absolute bottom-0 right-0"
            width={195}
            height={195}
          /> */}
          <img
            src={imgRightUrl}
            alt={data.imageRight.alternativeText || 'none provided'}
            className="w-[195px] h-[195px] absolute bottom-0 right-0"
          />
        </div>
      </div>
    </section>
  );
}
