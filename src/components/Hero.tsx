import { HttpClient } from '@/api/HttpClient';
import { Link } from '@/i18n/routing';
import { Image as ImageType } from '@/models/common/Image';
import { Link as LinkType } from '@/models/common/Link';
import Image from 'next/image';

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
          <Image
            src={imgLeftUrl || ''}
            alt={data.imageLeft.alternativeText || 'none provided'}
            height={0}
            width={0}
            sizes="100vw"
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
          <Image
            src={imgRightUrl || ''}
            priority
            alt={data.imageRight.alternativeText || 'none provided'}
            height={0}
            width={0}
            sizes="100vw"
            className="w-[240px] h-[240px]"
          />
        </div>

        <div className="relative h-[328px] w-[328px] mx-auto xl:hidden">
          <Image
            src={imgLeftUrl || ''}
            priority
            alt={data.imageLeft.alternativeText || 'none provided'}
            className="absolute top-0 left-0"
            width={195}
            height={195}
          />
          <Image
            src={imgRightUrl || ''}
            priority
            alt={data.imageRight.alternativeText || 'none provided'}
            className="absolute bottom-0 right-0"
            width={195}
            height={195}
          />
        </div>
      </div>
    </section>
  );

  // return (
  //   <section className="dark:bg-black dark:text-gray-100">
  //     <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
  //       <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
  //         <HighlightedText
  //           text={data.title}
  //           tag="h1"
  //           className="text-5xl font-bold leading-none sm:text-6xl mb-8"
  //           color="dark:text-violet-400"
  //         />

  //         <HighlightedText
  //           text={data.description}
  //           tag="p"
  //           className="tmt-6 mb-8 text-lg sm:mb-12"
  //           color="dark:text-violet-400"
  //         />
  //         <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
  //           {data.buttons.map((button: Button, index: number) => (
  //             <Link
  //               key={index}
  //               href={button.url}
  //               target={button.newTab ? '_blank' : '_self'}
  //               className={renderButtonStyle(button.type)}
  //             >
  //               {button.text}
  //             </Link>
  //           ))}
  //         </div>
  //       </div>
  //       <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
  //         <Image
  //           src={imgUrl || ''}
  //           alt={data.picture.data.attributes.alternativeText || 'none provided'}
  //           className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
  //           width={600}
  //           height={600}
  //         />
  //       </div>
  //     </div>
  //   </section>
  // );
}
