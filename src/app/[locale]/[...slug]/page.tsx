import { HttpClient } from '@/api/HttpClient';
import { PagesAPI } from '@/api/PagesAPI';
import { Page } from '@/models/Page';
import { MetaSocial, MetaSocialNetwork } from '@/models/common/SEO';
import componentResolver from '@/utils/component-resolver';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function PageRoute({
  params,
}: {
  params: { slug: string[]; locale: string };
}) {
  const { slug, locale } = params;
  console.log('slug', slug.join('/'));
  const pagesResponse = await PagesAPI.findMany(locale, { slug: slug[0] });
  if (pagesResponse && 'error' in pagesResponse)
    return (
      <div>
        <h1>
          {
            'Missing or invalid credentials. Have you created an access token using the Strapi admin panel?'
          }
        </h1>
        <p>Error Type: {pagesResponse.error.name}</p>
        <p>Error Status: {pagesResponse.error.status}</p>
      </div>
    );
  if (pagesResponse && pagesResponse.data && pagesResponse.data.length === 0) return notFound();

  // eslint-disable-next-line
  return pagesResponse.data[0].blocks.map((section: any, index: number) =>
    componentResolver(section, index)
  );
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const pagesResponse = await PagesAPI.findMany(locale);

  if (pagesResponse && 'error' in pagesResponse) return [];
  return pagesResponse.data
    .filter((element: Page) => element.slug !== 'home')
    .map((element: Page) => ({ slug: [element.slug] }));
}

const FALLBACK_SEO: Metadata = {
  title: 'Rohi Global Consulting',
  description: 'Rohi Global Consulting Page',
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string[] };
}): Promise<Metadata> {
  const pagesResponse = await PagesAPI.findMany(locale, { slug: slug[0] });

  if (pagesResponse && 'error' in pagesResponse) return FALLBACK_SEO;

  if (pagesResponse.data.length === 0) return FALLBACK_SEO;
  const { seo, slug: slugFromResponse } = pagesResponse.data[0];
  const facebookSeo: MetaSocial | undefined = seo.metaSocial.find(
    (element: MetaSocial) => element.socialNetwork === MetaSocialNetwork.Facebook
  );
  const xSeo: MetaSocial | undefined = seo.metaSocial.find(
    (element: MetaSocial) => element.socialNetwork === MetaSocialNetwork.Facebook
  );
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: facebookSeo
      ? {
          title: facebookSeo.title,
          description: facebookSeo.description,
          url: HttpClient.getStrapiURL(`/${slugFromResponse}`),
          images: facebookSeo.image ? [
            {
              url: HttpClient.getStrapiMedia(facebookSeo.image.url),
            },
          ] : [],
          locale: locale,
          type: 'website',
        }
      : seo.metaImage
      ? {
          url: HttpClient.getStrapiURL(`/${slugFromResponse}`),
          images: [
            {
              url: HttpClient.getStrapiMedia(seo.metaImage.url),
            },
          ],
        }
      : {},
    twitter: xSeo
      ? {
          card: 'summary_large_image',
          title: xSeo.title,
          description: xSeo.description,
          images: xSeo.image ? [HttpClient.getStrapiMedia(xSeo.image.url)] : [],
        }
      : {},
  };
}
