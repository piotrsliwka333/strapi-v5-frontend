import { GlobalConfigAPI } from '@/api/GlobalConfigAPI';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { locales } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import './globals.css';
import { HttpClient } from '@/api/HttpClient';

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const globalResponse = await GlobalConfigAPI.find(locale);
  const messages = await getMessages({ locale });
  if (globalResponse && 'error' in globalResponse)
    return (
      <div>
        <h1>
          {
            'Missing or invalid credentials. Have you created an access token using the Strapi admin panel?'
          }
        </h1>
        <p>Error Type: {globalResponse.error.name}</p>
        <p>Error Status: {globalResponse.error.status}</p>
      </div>
    );
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header header={globalResponse.data.header} />
          <main>{children}</main>
          <Footer footer={globalResponse.data.footer} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const FALLBACK_SEO: Metadata = {
  title: 'Rohi Global Consulting',
  description: 'Rohi Global Consulting blog app',
  icons: {
    icon: [{ url: `/icon.ico` }],
  },
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const globalResponse = await GlobalConfigAPI.find(locale);

  if (globalResponse && 'error' in globalResponse) return FALLBACK_SEO;
  return {
    title: FALLBACK_SEO.title,
    description: FALLBACK_SEO.description,
    icons: {
      icon: [{ url: `${HttpClient.getStrapiMedia(globalResponse.data.favicon.url)}` }],
    },
  };
}
