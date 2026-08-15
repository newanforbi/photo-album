import type { MetadataRoute } from "next";

// De-indexing in progress (see README.md → "Taking this site down"). Crawling
// stays allowed on purpose: every page now serves a `noindex` meta tag
// (app/layout.tsx), and Googlebot has to be able to fetch a page to notice
// that tag and drop it from the index. Once Search Console's Pages report
// shows these URLs excluded, switch `allow: "/"` below to `disallow: "/"`.
// No sitemap is advertised here anymore — don't point crawlers at content
// that's being removed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
