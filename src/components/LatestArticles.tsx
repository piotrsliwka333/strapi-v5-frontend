'use client';
import { ArticlesAPI } from '@/api/ArticlesAPI';
import { CategoriesAPI } from '@/api/CategoriesAPI';
import { Link } from '@/i18n/routing';
import { Article as ArticleType } from '@/models/Article';
import { Category } from '@/models/Category';
import { ErrorAPI } from '@/models/ErrorAPI';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Article, ArticleKindType, ArticleOrientation } from './Article';
import { Meta } from '@/models/CollectionType';

interface LatestArticles {
  data: {
    title: string;
    categoriesListTile: string;
    pagesPaginationListTitle: string;
  };
}

export default function LatestArticles({ data }: LatestArticles) {
  const { title, categoriesListTile, pagesPaginationListTitle } = data;
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [searchParamsCategory, setSearchParamsCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [searchParamsPage, setSearchParamsPage] = useState<string | null>(
    searchParams.get('page') || '1'
  );
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoriesError, setCategoriesError] = useState<ErrorAPI | null>(null);

  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  const [articlesPagination, setArticlesPagination] = useState<Meta | null>(null);
  const [articlesError, setArticlesError] = useState<ErrorAPI | null>(null);

  useEffect(() => {
    setSearchParamsCategory(searchParams.get('category'));
    setSearchParamsPage(searchParams.get('page') ? searchParams.get('page') : '1');
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const categoriesResponse = await CategoriesAPI.findMany(locale);

        if ('error' in categoriesResponse) return setCategoriesError(categoriesResponse);
        setCategories(categoriesResponse.data);
        // eslint-disable-next-line
      } catch (e: unknown) {
        setCategoriesError({
          data: null,
          error: {
            status: 500,
            name: 'catch error - categories',
            message: 'catch error - categories',
            details: { errors: [] },
          },
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const articlesResponse = await ArticlesAPI.findMany(
          locale,
          searchParamsPage ? +searchParamsPage : 1,
          2,
          searchParamsCategory ? { category: { slug: searchParamsCategory } } : undefined
        );
        if ('error' in articlesResponse) return setArticlesError(articlesResponse);
        setArticles(articlesResponse.data);
        setArticlesPagination(articlesResponse.meta);
        // eslint-disable-next-line
      } catch (e: unknown) {
        setArticlesError({
          data: null,
          error: {
            status: 500,
            name: 'catch error - articles',
            message: 'catch error - articles',
            details: { errors: [] },
          },
        });
      }
    })();
  }, [searchParamsCategory, searchParamsPage]);

  if (categoriesError || articlesError)
    return (
      <section className="container mx-auto py-16">
        <h1>Error</h1>
      </section>
    );
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-left font-bold text-5xl text-textPrimary mb-8">{title}</h1>
      <div className="lg:flex">
        <aside className="mb-8 lg:mb-0 lg:mr-8 w-full lg:w-[300px]">
          {!categories ? (
            <div className="p-4 w-full mb-8 h-fit bg-secondary p-2 block rounded-lg">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="h-8 bg-slate-700 rounded"></div>
                    <div className="h-8 bg-slate-700 rounded"></div>
                    <div className="h-8 bg-slate-700 rounded"></div>
                    <div className="h-8 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="mb-2 font-bold" id="categories-list">
                {categoriesListTile}
              </h1>
              <ul
                aria-labelledby="categories-list"
                className="mb-8 h-fit bg-secondary p-2 block rounded-lg"
              >
                <li key={'001'} className="mb-2 last-of-type:mb-0">
                  <Link
                    scroll={false}
                    className={`p-2.5 block footer-nav-link ${
                      searchParamsCategory === null ? 'bg-primary' : ''
                    }`}
                    href={{
                      pathname: '/blog',
                    }}
                  >
                    All
                  </Link>
                </li>
                {categories.map((category: Category) => (
                  <li key={category.id} className="mb-2 last-of-type:mb-0">
                    <Link
                      className={`p-2.5 block footer-nav-link ${
                        searchParamsCategory === category.slug ? 'bg-primary' : ''
                      }`}
                      scroll={false}
                      href={{
                        pathname: '/blog',
                        query: { category: category.slug },
                      }}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!articlesPagination ? (
            <div className="p-4 w-full h-fit bg-secondary p-2 block rounded-lg">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="space-y-3">
                    <div className="h-8 bg-slate-700 rounded"></div>
                    <div className="h-8 bg-slate-700 rounded"></div>
                    <div className="h-8 bg-slate-700 rounded"></div>
                    <div className="h-8 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {articlesPagination.pagination.pageCount > 1 && (
                <div className="mt-4">
                  <h1 className="mb-2 font-bold" id="pages-pagination-list">
                    {pagesPaginationListTitle}
                  </h1>
                  <ul
                    aria-labelledby="pages-pagination-list"
                    style={{
                      gridTemplateRows: 'auto',
                      gridTemplateColumns: `repeat(auto-fill, minmax(50px, 1fr))`,
                    }}
                    className="bg-secondary p-2 grid justify-center w-full h-fit bg-secondary p-2 block rounded-lg"
                  >
                    {Array.from(Array<number>(articlesPagination.pagination.pageCount).keys()).map(
                      (element: number) => {
                        const fixedElement = (element += 1);
                        return (
                          <li key={fixedElement}>
                            <Link
                              className={`p-2.5 block footer-nav-link text-center ${
                                searchParamsPage && +searchParamsPage === fixedElement
                                  ? 'bg-primary'
                                  : ''
                              }`}
                              scroll={false}
                              href={{
                                pathname: '/blog',
                                query: setupSearchParams(searchParamsCategory, fixedElement),
                              }}
                            >
                              {fixedElement}
                            </Link>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}
            </>
          )}
        </aside>
        <div className="w-full lg:w-[calc(100%-300px)]">
          {!articles || !articlesPagination ? (
            <div className="grid gap-8 w-full">
              <div className="border border-secondary rounded-md p-4 w-full">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-secondary rounded-md p-4 w-full">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <ul className="grid gap-8 w-full">
                {articles.map((article: ArticleType) => (
                  <li key={article.id} className="w-full">
                    <Article
                      article={article}
                      type={ArticleKindType.PRIMARY}
                      orientation={ArticleOrientation.HORIZONTAL}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const setupSearchParams = (
  searchParamsCategory: string | null,
  searchParamsPage: number | null
): Record<string, string | number> => {
  const queryObject: Record<string, string | number> = {};
  if (searchParamsCategory) queryObject.category = searchParamsCategory;
  if (searchParamsPage) queryObject.page = searchParamsPage;
  return queryObject;
};
