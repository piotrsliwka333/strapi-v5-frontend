'use client';
import { useState, useEffect, useCallback } from 'react';

import Loader from '@/components/Loader';
import PostList from '@/components/PostList';
import PageHeader from '@/components/PageHeader';
import { fetchAPI } from '@/utils/fetch-api';
import { unstable_setRequestLocale } from 'next-intl/server';

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function HomeRoute() {
  const [meta, setMeta] = useState<Meta | undefined>();
  /* eslint-disable */
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: 'desc' },
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
            },
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const responseData = await fetchAPI(path, urlParamsObject);

      if (start === 0) {
        setData(responseData.data);
      } else {
        // eslint-disable-next-line
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div className="py-16">
      <PageHeader heading={'Blog'} text={'Blog'} />
      <PostList articles={data}>
        {meta!.pagination.start + meta!.pagination.limit < meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more posts
            </button>
          </div>
        )}
      </PostList>
    </div>
  );
}