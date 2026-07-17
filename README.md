# photo-album

**Live at [brendanngwanforbi.com](https://brendanngwanforbi.com)**

Personal photo album site for Brendan Ngwa Nforbi (also known as Ngehsi Brendan
Ngwa Nforbi), built with Next.js and engineered for Google Search / Google Images
discoverability: per-photo structured data (schema.org `Person` /
`ImageObject`), an image sitemap, canonical URLs, and a bio-first home page
tying it all to a single identity (`/about` redirects here). A warm
light/dark masonry gallery with a lightbox sits on top of that — see
`app/photo/[date]/[slug]/page.tsx` for the canonical per-photo pages the SEO
layer depends on.

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
