'use client';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  // h1 styled in global.css by rich-text h1 style property
  return (
    <section className="rich-text my-6 dark:bg-black dark:text-gray-50 ">
      <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
