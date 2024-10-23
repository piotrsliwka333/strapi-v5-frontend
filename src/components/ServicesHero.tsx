import { HttpClient } from '@/api/HttpClient';
import { Link } from '@/i18n/routing';
import { Image as ImageType } from '@/models/common/Image';
import { Link as LinkType } from '@/models/common/Link';

interface ServicesHeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    background: ImageType;
    buttonOne: LinkType;
    buttonTwo: LinkType;
  };
}

export default function ServicesHero({ data }: ServicesHeroProps) {
  const { title, description, buttonOne, buttonTwo } = data;

  return (
    <section
      className={`w-full pb-16 pt-28 md:pt-40 xl:py-40 bg-no-repeat`}
      style={{ backgroundImage: `url(${HttpClient.getStrapiMedia(data.background.url)})` }}
    >
      <div className="container mx-auto lg:flex lg:justify-end h-full">
        <div className="w-full max-w-[400px] mx-auto lg:mr-0 lg:ml-0 xl:max-w-[500px] relative">
          <h1 className="text-2xl xl:text-3xl text-white font-bold text-left xl:text-5xl mb-12">
            {title}
          </h1>
          <p className="text-base xl:text-lg font-light text-white mb-12 text-justify">
            {description}
          </p>
          <div className="w-full flex justify-end">
            <Link
              // eslint-disable-next-line
              href={buttonOne.url as any}
              className="btn-primary bg-primary flex items-center mr-8"
              target={buttonOne.isExternal ? '_blank' : '_self'}
            >
              <span className="flex items-center mr-3">{buttonOne.text}</span>
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
            <Link
              // eslint-disable-next-line
              href={buttonTwo.url as any}
              className="btn-primary flex items-center bg-transparent border border-white shadow-transparent"
              target={buttonTwo.isExternal ? '_blank' : '_self'}
            >
              <span className="flex items-center mr-3">{buttonTwo.text}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
