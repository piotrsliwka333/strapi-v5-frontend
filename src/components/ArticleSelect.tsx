'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Category } from '@/models/Category';
import { Article } from '@/models/Article';
import { Link } from '@/i18n/routing';

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? 'px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100'
    : 'px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900';
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {
  const t = useTranslations();
  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">{t('blog.article.categoryFilterTitle')}</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
          {categories.map((category: Category) => {
            if (category.articles.length === 0) return null;
            return (
              <Link
                key={category.id}
                // eslint-disable-next-line
                href={`/blog?category=${category.slug}` as any}
                className={selectedFilter(category.slug, params.category)}
              >
                #{category.name}
              </Link>
            );
          })}
          <Link href={'/blog'} className={selectedFilter('', 'filter')}>
            #all
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">{t('blog.article.otherPosts')}</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              if (article.slug === params.slug) return null;
              return (
                <li key={article.id}>
                  <Link
                    rel="noopener noreferrer"
                    // eslint-disable-next-line
                    href={`/blog/articles/${article.slug}` as any}
                    className={`${
                      params.slug === article.slug && 'text-textPrimary'
                    }  hover:underline hover:text-textPrimary transition-colors duration-200`}
                  >
                    {article.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
