'use client';
import { HttpClient } from '@/api/HttpClient';
import { Link } from '@/i18n/routing';
import { Image as ImageType } from '@/models/common/Image';
import { Link as LinkType } from '@/models/common/Link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './AdvancedHero.css';

interface Slide {
  id: string;
  title: string;
  description: string;
  link: LinkType;
}

interface Element {
  id: string;
  title: string;
  url: string;
  icon: ImageType;
}

interface AdancedHeroProps {
  data: {
    id: string;
    title: string;
    background: ImageType;
    slides: Slide[];
    elements: Element[];
  };
}

export default function AdvancedHero({ data }: AdancedHeroProps) {
  const backgroundImage = HttpClient.getStrapiMedia(data.background.url);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <section
      className={`overflow-hidden sm:overflow-visible w-full pb-16 pt-28 md:pt-40 xl:py-32 bg-top md:bg-center backdrop-blur-md bg-no-repeat`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto lg:flex lg:justify-between h-full">
        <div className="w-full flex justify-center items-center lg:w-[300px] mb-36 md:mb-48 xl:mb-0">
          <div className="w-full flex justify-center lg:w-[300px] lg:h-fit">
            <div className="circle xl:w-[300px]">
              <div className="circle__mask"></div>
              <div className="circle__content">
                <h2 className="text-4xl text-white font-medium text-center xl:text-4xl">
                  {data.title}
                </h2>
                <Link
                  className="flex items-center border border-white rounded justify-center transition-colors hover:transition-colors hover:border-primary h-[50px] w-[50px]  text-white absolute left-1/2 top-[-70px] translate-x-[-50%]"
                  // eslint-disable-next-line
                  href={data.elements[0].url as any}
                >
                  {/* because of reaching limit on vercel for image optimizations has to swich to normal images */}
                  {/* <Image
                    priority
                    src={HttpClient.getStrapiMedia(data.elements[0].icon.url)}
                    alt="none provided"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full max-w-[25px]"
                  /> */}
                  <img
                    src={HttpClient.getStrapiMedia(data.elements[0].icon.url)}
                    alt={data.elements[0].icon.alternativeText || 'not provided'}
                    className="w-full max-w-[25px]"
                  />
                  <p className="hidden md:block absolute transition-colors hover:transition-colors w-fit text-xs md:text-base text-center bottom-[calc(100%+15px)] left-1/2 translate-x-[-50%]">
                    {data.elements[0].title}
                  </p>
                </Link>

                <Link
                  className="flex items-center border border-white rounded justify-center transition-colors hover:transition-colors hover:border-primary h-[50px] w-[50px] text-white absolute right-[-5px] top-[-5px]"
                  // eslint-disable-next-line
                  href={data.elements[1].url as any}
                >
                  {/* <Image
                    priority
                    src={HttpClient.getStrapiMedia(data.elements[1].icon.url)}
                    alt="none provided"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full max-w-[25px]"
                  /> */}
                  <img
                    src={HttpClient.getStrapiMedia(data.elements[1].icon.url)}
                    alt={data.elements[1].icon.alternativeText || 'not provided'}
                    className="w-full max-w-[25px]"
                  />
                  <p className="hidden md:block absolute transition-colors hover:transition-colors w-fit text-xs md:text-base text-center left-[calc(100%+10px)] bottom-[calc(100%+10px)]">
                    {data.elements[1].title}
                  </p>
                </Link>

                <Link
                  className="flex items-center border border-white rounded justify-center transition-colors hover:transition-colors hover:border-primary h-[50px] w-[50px] text-white absolute right-[-5px] bottom-[5px]"
                  // eslint-disable-next-line
                  href={data.elements[2].url as any}
                >
                  {/* <Image
                    priority
                    src={HttpClient.getStrapiMedia(data.elements[2].icon.url) || ''}
                    alt="none provided"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full max-w-[25px]"
                  /> */}
                  <img
                    src={HttpClient.getStrapiMedia(data.elements[2].icon.url)}
                    alt={data.elements[2].icon.alternativeText || 'not provided'}
                    className="w-full max-w-[25px]"
                  />
                  <p className="hidden md:block absolute transition-colors hover:transition-colors w-fit text-xs md:text-base text-center left-[calc(100%+10px)] top-[calc(100%+10px)]">
                    {data.elements[2].title}
                  </p>
                </Link>

                <Link
                  className="flex items-center border border-white rounded justify-center transition-colors hover:transition-colors hover:border-primary h-[50px] w-[50px] text-white absolute left-1/2 bottom-[-70px] translate-x-[-50%]"
                  // eslint-disable-next-line
                  href={data.elements[3].url as any}
                >
                  {/* <Image
                    priority
                    src={HttpClient.getStrapiMedia(data.elements[3].icon.url)}
                    alt="none provided"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full max-w-[25px]"
                  /> */}
                  <img
                    src={HttpClient.getStrapiMedia(data.elements[3].icon.url)}
                    alt={data.elements[3].icon.alternativeText || 'not provided'}
                    className="w-full max-w-[25px]"
                  />
                  <p className="hidden md:block  absolute transition-colors hover:transition-colors w-fit text-xs md:text-base text-center top-[calc(100%+15px)] left-1/2 translate-x-[-50%]">
                    {data.elements[3].title}
                  </p>
                </Link>

                <Link
                  className="flex items-center border border-white rounded justify-center transition-colors hover:transition-colors hover:border-primary h-[50px] w-[50px] text-white absolute left-[-5px] bottom-[5px]"
                  // eslint-disable-next-line
                  href={data.elements[4].url as any}
                >
                  {/* <Image
                    priority
                    src={HttpClient.getStrapiMedia(data.elements[4].icon.url)}
                    alt="none provided"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full max-w-[25px]"
                  /> */}
                  <img
                    src={HttpClient.getStrapiMedia(data.elements[4].icon.url)}
                    alt={data.elements[2].icon.alternativeText || 'not provided'}
                    className="w-full max-w-[25px]"
                  />
                  <p className="hidden md:block  absolute transition-colors hover:transition-colors w-fit text-xs md:text-base text-center right-[calc(100%+10px)] top-[calc(100%+10px)]">
                    {data.elements[4].title}
                  </p>
                </Link>

                <Link
                  className="flex items-center border border-white rounded justify-center transition-colors hover:transition-colors hover:border-primary h-[50px] w-[50px] text-white absolute left-[-5px] top-[-5px]"
                  // eslint-disable-next-line
                  href={data.elements[5].url as any}
                >
                  {/* <Image
                    priority
                    src={HttpClient.getStrapiMedia(data.elements[5].icon.url)}
                    alt="none provided"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full max-w-[25px]"
                  /> */}
                  <img
                    src={HttpClient.getStrapiMedia(data.elements[5].icon.url)}
                    alt={data.elements[5].icon.alternativeText || 'not provided'}
                    className="w-full max-w-[25px]"
                  />
                  <p className="hidden md:block absolute transition-colors hover:transition-colors w-fit text-xs md:text-base text-center right-[calc(100%+10px)] bottom-[calc(100%+10px)]">
                    {data.elements[5].title}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[400px] mx-auto lg:mr-0 lg:ml-0 xl:max-w-[500px] relative">
          <Swiper
            pagination={pagination}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: true,
            }}
            slidesPerView={1}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {data.slides.map((slide: Slide) => {
              return (
                <SwiperSlide key={slide.id}>
                  <h1 className="text-2xl xl:text-3xl text-white font-bold text-left xl:text-5xl mb-12">
                    {slide.title}
                  </h1>
                  <p className="text-base xl:text-lg font-light text-white mb-12">
                    {slide.description}
                  </p>
                  <div className="flex justify-start">
                    <Link
                      // eslint-disable-next-line
                      href={slide.link.url as any}
                      className="btn-primary bg-primary flex items-center"
                    >
                      <span className="flex items-center mr-3">{slide.link.text}</span>
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
