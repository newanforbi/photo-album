# photo-album

**Live at [brendanngwanforbi.com](https://brendanngwanforbi.com)**

Personal photo album site for Brendan Ngwa Nforbi, built with Next.js and
engineered for Google Search / Google Images discoverability: per-photo
structured data (schema.org `Person` / `ImageObject`), an image sitemap,
canonical URLs, and a bio-first home page tying it all to a single identity
(`/about` redirects here). A dark editorial gallery with a lightbox sits on
top of that — see `app/photo/[date]/[slug]/page.tsx` for the canonical
per-photo pages the SEO layer depends on.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding photos

See [`content/photos/README.md`](content/photos/README.md) — in short:

```bash
npm run new-day -- 2026-07-20
```

then drop image files into `public/photos/2026-07-20/` and fill in the
generated `content/photos/2026-07-20/index.json`.

## Deploying

Hosted on [Vercel](https://vercel.com), with `brendanngwanforbi.com` (bought on
Namecheap) attached as the production domain — DNS is managed on Namecheap's
Advanced DNS tab, pointed at Vercel per the values in its Domains settings.
The canonical site URL (`SITE_URL` in `lib/site.ts`) is derived automatically
from Vercel's assigned production domain, so no code change is needed if the
domain or its DNS ever changes. Optional environment variables are documented
in `.env.example`.

## SEO checklist after first deploy

- Verify the site in [Google Search Console](https://search.google.com/search-console) as a **Domain** property (`brendanngwanforbi.com`, verified via a Namecheap DNS TXT record) and submit `/sitemap.xml` and `/sitemap-images.xml`.
- Confirm Vercel's Production deployment has no Deployment Protection enabled (it blocks Googlebot).
- Use URL Inspection → "Request Indexing" on `/`, `/music`, and a few photo pages.
- Validate structured data with [Google's Rich Results Test](https://search.google.com/test/rich-results).

## Taking this site down

This reverses the checklist above. Do it in this order — de-index **before**
you shut off hosting, or Google can't recrawl the "noindex" signal and pages
can linger in search for months.

1. **Ship the `noindex` change** (already done in `app/layout.tsx`: every
   page's `<meta name="robots">` now says `noindex, nofollow`). Deploy it and
   confirm it's live by viewing source on `/` in production and checking for
   `<meta name="robots" content="noindex, nofollow">` in `<head>`.
   `app/robots.ts` intentionally still `allow`s crawling at this stage —
   Googlebot has to be able to fetch a page to see the `noindex` tag.
2. **Force a recrawl** in Search Console (search.google.com/search-console)
   for the domain property: URL Inspection → paste each key URL (`/`,
   `/album`, `/music`, a sample of `/photo/...` and `/album/...` pages) →
   "Request Indexing". This nudges Google to refetch sooner than its normal
   crawl schedule.
3. **Use the Removals tool for an immediate stopgap**: Search Console →
   Removals → "New Request" → "Temporarily remove URL" for the root domain
   (or a prefix like `https://brendanngwanforbi.com/`). This hides the site
   from search results within hours, but only for ~6 months — it's a bridge
   until step 2's `noindex` is actually crawled and honored, not a
   replacement for it.
4. **Watch Search Console's Pages report** (Indexing → Pages) until the
   affected URLs move into the "Excluded" bucket with reason "Excluded by
   'noindex' tag." This can take anywhere from a few days to a few weeks
   depending on how often Google was already crawling the site. Don't move to
   step 5 until this happens, or you'll strand pages that are indexed but no
   longer crawlable.
5. **Lock crawling down** once pages are confirmed excluded: change
   `app/robots.ts` to `disallow: "/"` (see the comment in that file) and
   redeploy. Also delete/deprecate `content/` you don't want ever resurfacing
   before this point, since it's what feeds the sitemap and per-photo pages.
6. **Serve `410 Gone` instead of taking the deploy down outright**, if you
   want the cleanest possible signal to Google and other crawlers that the
   content is gone forever (410 is treated as stronger/faster than a plain
   404). The simplest way here is a maintenance branch whose pages all return
   410, deployed for a week or two before final teardown. This step is
   optional — you can skip straight to step 7 if speed matters more than a
   textbook-clean signal.
7. **Take the site itself down**:
   - In Vercel, remove the production domain from the project (Project →
     Settings → Domains → remove `brendanngwanforbi.com`), then delete the
     project (or just stop deploying to it) once you've confirmed the domain
     is detached.
   - In Namecheap's Advanced DNS tab, delete the DNS records that pointed the
     domain at Vercel (the `A`/`CNAME` records from the original setup).
   - Optionally let the domain registration itself lapse (don't renew) once
     you no longer need it, or repoint it elsewhere if you want to keep
     ownership.
8. **Clean up other surfaces** the site fed: submit a removal request for the
   `sitemap.xml`/`sitemap-images.xml` entries still listed in Search Console
   (Sitemaps report → "..." → Remove), and revisit `SAME_AS_LINKS` /
   `PRESS_MENTIONS` in `lib/site.ts` — those are independent profiles/press
   this repo's structured data links to, and won't disappear just because
   this site does.
9. **Verify** a few weeks after full teardown: `site:brendanngwanforbi.com`
   in Google should return no results, and the domain should 404/refuse to
   connect for visitors.

## Permanently removed URLs

Some individual pages have been taken down for good, independently of the
site-wide teardown above. The process for each:

1. Delete its entry from the day's `content/photos/<date>/index.json` and
   delete the image file from `public/photos/<date>/`. That drops the URL from
   the day page, `/sitemap.xml`, and `/sitemap-images.xml` automatically.
2. Add the page path *and* the image path to `GONE_PATHS` in `middleware.ts`,
   so both answer `410 Gone` rather than a plain `404`. Matching is prefix-based
   (`/opengraph-image` and similar subpaths included) and the body is a bare
   HTML document with no site layout or JSON-LD, so view-source cannot still
   expose an old `alternateName`. Google treats 410 as a stronger, faster
   signal that content is never coming back. The image path matters on its
   own — images get indexed in Google Images separately from the pages that
   embed them.
3. Leave the paths crawlable. `app/robots.ts` still allows `/`, and a crawler
   has to be able to fetch a URL to see the 410 — blocking it in `robots.txt`
   would strand the old entry in the index.
4. In Search Console, run URL Inspection → "Request Indexing" on each removed
   URL to pull the recrawl forward, and optionally file a Removals request as
   a same-day stopgap. The Removals tool expires after ~6 months; the 410 is
   what makes it permanent.

Currently removed (2026-07-15): `suited-up-with-a-city-view` and
`another-look-at-the-waterfront`, plus their two source images.
