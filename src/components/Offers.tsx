import { HttpClient } from '@/api/HttpClient';
import { Image as ImageType } from '@/models/common/Image';
import Image from 'next/image';

interface OffersProps {
  data: {
    title: string;
    offers: OfferType[];
    videoUrl: string;
  };
}

interface OfferType {
  id: string;
  title: string;
  description: string;
  icon: ImageType;
}

export default function Offers({ data }: OffersProps) {
  return (
    <section className=" py-12 lg:py-20">
      <div className="bg-secondary pt-24 pb-36 sm:pb-56 lg:pb-96 relative">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-5xl font-bold">{data.title}</h2>
        </div>
        <div className="container mx-auto grid mt-16 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.offers.map((offer: OfferType, index: number) => (
            <Offer key={index} {...offer} />
          ))}
        </div>
        <div className="container w-full xl:max-w-[1082px] xl:px-4 mx-auto absolute top-full left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div className="pb-[56.25%] relative w-full overflow-hidden shadow-lg shadow-black-500/50">
            <iframe
              className="w-full h-full absolute top-0 left-0"
              src={data.videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="bg-background pb-36 sm:pb-56 lg:pb-96"></div>
    </section>
  );
}

function Offer({ title, description, icon }: OfferType) {
  return (
    <div className="p-4 text-white">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center bg-primary rounded justify-center p-2 text-white">
          <Image
            priority
            src={HttpClient.getStrapiMedia(icon.url)}
            alt="none provided"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full max-w-[50px]"
          />
        </div>
        <div className="border-b-2 border-dashed border-primary w-[100px] mr-16 sm:mr-24" />
      </div>

      <h3 className="mb-3 text-2xl font-bold">{title}</h3>
      <p className="text-md font-light">{description}</p>
    </div>
  );
}
