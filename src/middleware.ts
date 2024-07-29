import createMiddleware from 'next-intl/middleware';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Locale middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ru'],
  // Used when no locale matches
  defaultLocale: 'en',
});

// Clerk middleware
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// Combine middlewares
export default clerkMiddleware((auth, req) => {

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/')
  ) {
    return
  }

  if (isProtectedRoute(req)) auth().protect();

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)', '/(ru|en)/:path*']
};
