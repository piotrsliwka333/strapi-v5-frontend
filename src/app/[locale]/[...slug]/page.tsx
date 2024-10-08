import { PagesAPI } from '@/api/PagesAPI';
import componentResolver from '@/utils/component-resolver';
import { notFound } from 'next/navigation';

export default async function PageRoute({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  const pages = await PagesAPI.findMany(locale, { slug });
  if (pages && 'error' in pages)
    return (
      <div>
        <h1>
          {
            'Missing or invalid credentials. Have you created an access token using the Strapi admin panel?'
          }
        </h1>
        <p>Error Type: {pages.error.name}</p>
        <p>Error Status: {pages.error.status}</p>
      </div>
    );
  if (pages && pages.data && pages.data.length === 0) return notFound();
  // eslint-disable-next-line
  return pages.data[0].blocks.map((section: any, index: number) =>
    componentResolver(section, index)
  );
}
