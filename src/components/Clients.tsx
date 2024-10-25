'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { HttpClient } from '@/api/HttpClient';
import { Image as ImageType } from '@/models/common/Image';
import { Autoplay } from 'swiper/modules';

interface Client {
  id: string;
  name: string;
  url: string;
  icon: ImageType;
}

interface ClientsProps {
  data: {
    clients: Client[];
  };
}

export default function Clients({ data }: ClientsProps) {
  return (
    <div className="py-12 lg:py-20">
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          976: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
          1544: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay]}
        className="!py-4 border border-y-secondary"
      >
        {data.clients.map((client: Client) => {
          return (
            <SwiperSlide key={client.id}>
              {/* because of reaching limit on vercel for image optimizations has to swich to normal images */}
              {/* <Image
                priority
                height={50}
                width={150}
                alt={client.icon.alternativeText || 'not provided'}
                src={HttpClient.getStrapiMedia(client.icon.url)}
              /> */}
              <img
                alt={client.icon.alternativeText || 'not provided'}
                src={HttpClient.getStrapiMedia(client.icon.url)}
                className="w-[150px]"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
