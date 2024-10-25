import { HttpClient } from '@/api/HttpClient';
import { Image as ImageType } from '@/models/common/Image';

interface OwnProps {
  data: {
    file: ImageType;
  };
}

export default function Media(props: OwnProps) {
  const { data } = props;
  return (
    <section className="container mx-auto">
      {/* because of reaching limit on vercel for image optimizations has to swich to normal images */}
      {/* <Image
        priority
        src={HttpClient.getStrapiMedia(data.file.url)}
        alt={data.file.alternativeText || 'not provided'}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto mx-auto"
      /> */}
      <img
        src={HttpClient.getStrapiMedia(data.file.url)}
        alt={data.file.alternativeText || 'not provided'}
        className="w-full h-auto mx-auto"
      />
    </section>
  );
}
