import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';

// Define protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// Define localization middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

// Combine Clerk and localization middleware
export default clerkMiddleware((auth, request) => {
  console.log(`Incoming request: ${request.nextUrl.pathname}`);

  if (isProtectedRoute(request)) {
    auth().protect();
    console.log(`Protected route accessed: ${request.nextUrl.pathname}`);
  }

  const response = intlMiddleware(request);
  console.log(`Localization middleware processed: ${request.nextUrl.pathname}`);

  return response;
});

export const config = {
  matcher: ['/', '/(en|ru)/:path*'],
};
