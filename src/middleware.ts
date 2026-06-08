import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, hasLocale } from './i18n-config';

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  for (const part of acceptLanguage.split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase();
    if (tag.startsWith('en')) return 'en';
    if (tag.startsWith('uk')) return 'uk';
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = pathname.split('/')[1];
  const pathnameHasLocale =
    hasLocale(pathnameLocale) &&
    (pathname.startsWith(`/${pathnameLocale}/`) || pathname === `/${pathnameLocale}`);

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', pathnameLocale);
    return response;
  }

  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|icon\\.png|logo\\.svg|logo\\.png|sitemap\\.xml|robots\\.txt).*)',
  ],
};
