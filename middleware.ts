import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Permanently removed URLs. Their content entries and image files are already
// deleted, so these paths would 404 on their own — this upgrades them to
// `410 Gone`, which Google treats as a stronger, faster "never coming back"
// signal than a plain 404 (see README.md → "Taking this site down", step 6).
//
// Both the page URLs and the underlying image files are listed: the images
// were indexed in Google Images independently of the pages that embedded them.
//
// Keep these paths crawlable (app/robots.ts still allows "/"). A crawler has
// to be able to fetch a URL to see the 410; blocking it in robots.txt would
// strand the old entries in the index.
const GONE_PATHS = new Set([
  "/photo/2026-07-15/suited-up-with-a-city-view",
  "/photo/2026-07-15/another-look-at-the-waterfront",
  "/photos/2026-07-15/office-window-portrait-1.jpg",
  "/photos/2026-07-15/waterfront-promenade-portrait-2.jpg",
]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "");
  if (GONE_PATHS.has(pathname)) {
    return new NextResponse("410 Gone — this page has been permanently removed.", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }
  return NextResponse.next();
}

// Narrow the matcher to the one day these removals live under, so middleware
// doesn't run on every request just to answer four paths.
export const config = {
  matcher: ["/photo/2026-07-15/:path*", "/photos/2026-07-15/:path*"],
};
