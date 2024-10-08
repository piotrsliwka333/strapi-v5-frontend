import React from 'react';
import { ArticlesAPI } from '@/api/ArticlesAPI';
import { CategoriesAPI } from '@/api/CategoriesAPI';
import ArticleSelect from '@/components/ArticleSelect';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    category: string;
    locale: string;
  };
}) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const categories = await CategoriesAPI.findMany(locale);
  // console.log(categories);
  const articles = await ArticlesAPI.findMany(locale, 0, 3);

  if ('error' in categories || 'error' in articles) return <h1>Error</h1>;
  return (
    <section className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <aside>
          <ArticleSelect categories={categories.data} articles={articles.data} params={params} />
        </aside>
        <div className="col-span-2">{children}</div>
      </div>
    </section>
  );
}
