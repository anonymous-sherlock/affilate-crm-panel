import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { DASHBOARD_REDIRECT } from "@routes";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, req) => {
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(DASHBOARD_REDIRECT, req.url));
  }
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(trpc)(.*)",
  ],
};
