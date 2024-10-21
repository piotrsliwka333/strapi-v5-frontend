import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // there is posiiblity that the problem with sitemap was generated through the matcher - TODO: Investigate it
  matcher: ['/', '/(pl|en|)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
