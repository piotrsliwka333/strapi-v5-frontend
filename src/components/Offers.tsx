import { Offer as OfferType } from '@/models/Offer';
import { Offer } from './Offer';

interface OffersProps {
  data: {
    title: string;
    videoUrl: string;
    offers: OfferType[];
  };
}

export default function Offers({ data }: OffersProps) {
  console.log(data);
  return (
    <section className=" py-12 lg:py-20">
      <div className="bg-secondary pt-24 pb-36 sm:pb-56 lg:pb-96 relative">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-5xl font-bold">{data.title}</h2>
        </div>
        <div className="container mx-auto grid mt-16 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.offers.map((offer: OfferType) => (
            <Offer
              key={offer.id}
              title={offer.title}
              description={offer.description}
              icon={offer.icon}
            />
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
