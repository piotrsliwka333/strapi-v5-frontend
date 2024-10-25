import { HttpClient } from '@/api/HttpClient';
import { Offer as OfferType } from '@/models/Offer';

type OfferProps = Omit<OfferType, 'id'>;

export function Offer({ title, description, icon }: OfferProps) {
  return (
    <div className="p-4 text-white">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center bg-primary rounded justify-center p-2 text-white">
          {/* <Image
            priority
            src={HttpClient.getStrapiMedia(icon.url)}
            alt="none provided"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full max-w-[50px]"
          /> */}
          <img
            src={HttpClient.getStrapiMedia(icon.url)}
            alt={icon.alternativeText || 'none provided'}
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
