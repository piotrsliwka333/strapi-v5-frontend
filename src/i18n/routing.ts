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
    '/articles': {
      en: '/articles',
      pl: "/artykuły"
    },
    '/articles/[slug]': {
      en: '/articles/[slug]',
      pl: "/artykuły/[slug]"
    }
  },
  // Used when no locale matches
  defaultLocale
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation(routing);