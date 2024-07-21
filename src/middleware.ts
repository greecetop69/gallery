import createMiddleware from 'next-intl/middleware';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Locale middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ru'],
  // Used when no locale matches
  defaultLocale: 'en'
});

// Clerk middleware
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const clerkAuthMiddleware = clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) auth().protect();
});

// Combine middlewares
export default async function combinedMiddleware(req: NextRequest, ev: NextFetchEvent) {
  await clerkAuthMiddleware(req, ev);
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)', '/(ru|en)/:path*']
};
