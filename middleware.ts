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
// These two photo pages previously rendered the root layout, which injected
// Person JSON-LD with `alternateName: "Ngehsi Brendan Ngwa Nforbi"`. Anyone
// inspecting view-source in the browser would see that string even though it
// was never in the photo captions. The 410 response is therefore a bare HTML
// document — no site chrome, no JSON-LD — and matching is prefix-based so
// leftover Next.js subpaths (`/opengraph-image`, `/twitter-image`) cannot
// fall through to a 404 that still wraps the layout.
//
// Keep these paths crawlable (app/robots.ts still allows "/"). A crawler has
// to be able to fetch a URL to see the 410; blocking it in robots.txt would
// strand the old entries in the index.
const GONE_PATHS = [
  "/photo/2026-07-15/suited-up-with-a-city-view",
  "/photo/2026-07-15/another-look-at-the-waterfront",
  "/photos/2026-07-15/office-window-portrait-1.jpg",
  "/photos/2026-07-15/waterfront-promenade-portrait-2.jpg",
] as const;

function isGonePath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return GONE_PATHS.some(
    (gone) => normalized === gone || normalized.startsWith(`${gone}/`)
  );
}

const GONE_BODY = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>410 Gone</title>
  </head>
  <body>
    <p>This page has been permanently removed.</p>
  </body>
</html>
`;

export function middleware(request: NextRequest) {
  if (isGonePath(request.nextUrl.pathname)) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "CDN-Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
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
