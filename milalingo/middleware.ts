import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes using createRouteMatcher
const isPublic = createRouteMatcher([]);

// Clerk middleware setup
export default clerkMiddleware(async (auth, request) => {
  // Protect all routes except the public ones
  if (!isPublic(request)) {
    await auth.protect();
  }
});

// Middleware config for matching specific routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
