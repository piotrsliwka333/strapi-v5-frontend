import { ArticlesAPI } from '@/api/ArticlesAPI';
import Post from '@/components/Post';
import { redirect } from '@/i18n/routing';

export default async function PostRoute({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  const data = await ArticlesAPI.findMany(locale, 0, 1, { slug });
  if (data.data.length === 0) return redirect('/blog');
  return <Post article={data.data[0]} />;
}
