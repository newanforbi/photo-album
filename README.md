# photo-album

Personal photo album site for Ngehsi Brendan Ngwa Nforbi (Brendan Ngwa Nforbi),
built with Next.js and engineered for Google Search / Google Images
discoverability: per-photo structured data (schema.org `Person` /
`ImageObject`), an image sitemap, canonical URLs, and an About page tying it
all to a single identity.

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

Import this repository into [Vercel](https://vercel.com/new) — no extra
config is required. The canonical site URL is derived automatically from the
Vercel production URL, so attaching a custom domain later needs no code
changes. Optional environment variables are documented in `.env.example`.

## SEO checklist after first deploy

- Verify the site in [Google Search Console](https://search.google.com/search-console) and submit `/sitemap.xml`.
- Confirm Vercel's Production deployment has no Deployment Protection enabled (it blocks Googlebot).
- Use URL Inspection → "Request Indexing" on `/`, `/about`, and a few photo pages.
- Validate structured data with [Google's Rich Results Test](https://search.google.com/test/rich-results).
