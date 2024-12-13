import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { LocalePrefix, defineRouting } from 'next-intl/routing';

export const localePrefix = 'as-needed' satisfies LocalePrefix;
export const defaultLocale = 'en' as const;
export const locales: string[] = ['en', 'pl'];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,
  localePrefix,
  pathnames: {
    '/': '/',
    '/training': {
      en: '/training',
      pl: '/trening',
    },
    '/about-us': {
      en: '/about-us',
      pl: '/o-nas',
    },
    '/employee-engagement-and-culture': {
      en: '/employee-engagement-and-culture',
      pl: '/zaangazowanie-pracownikow-i-kultura'
    },
    '/assessment-credentials': {
      en: '/assessment-credentials',
      pl: '/ocena-poswiadczenia'
    },
    '/business-mastery-solutions': {
      en: '/business-mastery-solutions',
      pl: '/rozwiazania-do-opanowania-biznesu'
    },
    '/work-life-coaching': {
      en: '/work-life-coaching',
      pl: '/coaching-zawodowo-zyciowy'
    },
    '/integrated-learning': {
      en: '/integrated-learning',
      pl: '/zintegrowane-nauczanie'
    },
    '/business-re-education': {
      en: '/business-re-education',
      pl: '/reedukacja-biznesowa'
    },
    '/blog': {
      en: '/blog',
      pl: '/blog',
    },
    '/blog/articles/[slug]': {
      en: '/blog/articles/[slug]',
      pl: '/blog/artykuly/[slug]',
    },
  },
  // Used when no locale matches
  defaultLocale,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);
