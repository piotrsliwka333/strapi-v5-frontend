import { HttpClient } from '@/api/HttpClient';
import { Image as ImageType } from '@/models/common/Image';
import Image from 'next/image';

interface OwnProps {
  data: {
    file: ImageType;
  };
}

export default function Media(props: OwnProps) {
  const { data } = props;
  return (
    <section className="container mx-auto">
      <Image
        priority
        src={HttpClient.getStrapiMedia(data.file.url)}
        alt={data.file.alternativeText || 'not provided'}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto mx-auto"
      />
    </section>
  );
}
