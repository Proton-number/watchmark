import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Apply middleware to all application routes except static files and Next.js internals
    "/((?!_next|.*\\..*).*)",
    // Always apply middleware to API and TRPC routes
    "/(api|trpc)(.*)",
  ],
};

