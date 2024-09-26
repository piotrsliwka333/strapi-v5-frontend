import { getStrapiMedia } from '@/utils/api-helpers';
import Image from 'next/image';

interface OwnProps {
  data: {
    file: any;
  };
}

export default function Media(props: OwnProps) {
  const { data } = props;
  const imgUrl = getStrapiMedia(data.file.url);
  return (
    <div className="flex items-center justify-center my-6 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
      <Image
        src={imgUrl || ''}
        priority
        alt={data.file.alternativeText || 'none provided'}
        className="object-cover w-full h-full rounded-lg overflow-hidden"
        width={400}
        height={400}
      />
    </div>
  );
}
