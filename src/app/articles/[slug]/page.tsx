import Post from '@/components/Post';
import { fetchAPI } from '@/utils/fetch-api';

async function getPostBySlug(slug: string) {
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ['url'] },
      category: { populate: '*' },
      author: {
        populate: '*',
      },
      blocks: {
        on: {
          'shared.media': {
            populate: '*',
          },
          'shared.quote': {
            populate: '*',
          },
          'shared.rich-text': {
            populate: '*',
          },
        },
      },
    },
  };

  const response = await fetchAPI(path, urlParamsObject);
  return response;
}

export default async function PostRoute({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  console.log(data);

  return <Post article={data.data[0]} />;
}
