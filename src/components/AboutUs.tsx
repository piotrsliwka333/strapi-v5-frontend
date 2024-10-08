import React from 'react';
import Image from 'next/image';
import { Image as ImageType } from '@/models/common/Image';
import { HttpClient } from '@/api/HttpClient';
import { Link } from '@/i18n/routing';

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface AboutUsProps {
  data: {
    title: string;
    description: string;
    image: ImageType;
    button: Button;
  };
}

export default function AboutUs({ data }: AboutUsProps) {
  return (
    <section className="container mx-auto py-12 lg:py-20 flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between">
      <Image
        priority
        src={HttpClient.getStrapiMedia(data.image.url)}
        alt="none provided"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full lg:w-auto lg:basis-2/4 lg:pr-32"
      />
      <div className="mb-24 lg:mb-0 lg:basis-2/4">
        <h1 className="text-5xl text-textPrimary text-center font-bold lg:text-left xl:text-5xl mb-12">
          {data.title}
        </h1>
        <p className="text-textPrimary text-lg text-center sm:text-xl dark:text-gray-400 lg:text-left">
          {data.description}
        </p>
        {data.button && (
          <div className="flex justify-center mt-8 lg:justify-start">
            <Link
              // eslint-disable-next-line
              href={data.button.url as any}
              target={data.button.newTab ? '_blank' : '_self'}
              className="btn-primary flex items-center"
            >
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
    </section>
  );
}
