# Adding a new day of photos

Each day gets one folder here (`content/photos/YYYY-MM-DD/`) and a matching
image folder under `public/photos/YYYY-MM-DD/`. A day with no folder, or an
empty `photos` list, simply doesn't appear anywhere on the site — nothing
needs to be pre-created in advance.

## Quick way

```
npm run new-day -- 2026-07-20
```

This creates `content/photos/2026-07-20/index.json` (with one placeholder
photo entry) and an empty `public/photos/2026-07-20/` folder for you to drop
images into.

## Manual way

1. Create `content/photos/YYYY-MM-DD/index.json`:

   ```json
   {
     "dayTitle": "A short title for the whole day",
     "photos": [
       {
         "file": "my-photo.jpg",
         "title": "Descriptive Photo Title",
         "caption": "A sentence or two describing the photo naturally.",
         "alt": "Plain description of what's visible in the image.",
         "tags": ["landscape", "sunset"]
       }
     ]
   }
   ```

2. Put the matching image file(s) in `public/photos/YYYY-MM-DD/`, named to
   match each entry's `file` field.

3. Commit and push — Vercel rebuilds and deploys automatically.

## Field notes

- `file`: filename only, must exist in the matching `public/photos/<date>/` folder.
- `title`: becomes the page's `<h1>` and URL slug (auto-generated from this).
- `caption`: shown under the photo and used as its meta description.
- `alt`: accessibility + SEO alt text — describe what's in the photo, keep it
  natural (don't force names or keywords into every one).
- `tags`: optional, short list of topical keywords.
- You do **not** need to fill in image width/height — it's read automatically
  from the file at build time.
