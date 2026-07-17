# Adding a new day of photos and videos

Each day gets one folder here (`content/photos/YYYY-MM-DD/`) and a matching
image folder under `public/photos/YYYY-MM-DD/`. A day with no folder, or with
both `photos` and `videos` empty, simply doesn't appear anywhere on the site
— nothing needs to be pre-created in advance.

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
     ],
     "videos": [
       {
         "youtubeId": "dQw4w9WgXcQ",
         "title": "Descriptive Video Title",
         "description": "A sentence or two describing the video naturally.",
         "tags": ["interview"]
       }
     ]
   }
   ```

   Both `photos` and `videos` are optional — a day can have just one, or both.

2. Put the matching image file(s) in `public/photos/YYYY-MM-DD/`, named to
   match each photo entry's `file` field. Videos stay on YouTube — there's no
   file to add for those, just the `youtubeId` (the `v=` value from the
   YouTube URL).

3. Commit and push — Vercel rebuilds and deploys automatically.

## Field notes

**Photos:**
- `file`: filename only, must exist in the matching `public/photos/<date>/` folder.
- `title`: becomes the page's `<h1>` and URL slug (auto-generated from this).
- `caption`: shown under the photo and used as its meta description.
- `alt`: accessibility + SEO alt text — describe what's in the photo, keep it
  natural (don't force names or keywords into every one).
- `tags`: optional, short list of topical keywords.
- You do **not** need to fill in image width/height — it's read automatically
  from the file at build time.

**Videos:**
- `youtubeId`: the video ID from the YouTube URL (e.g. `dQw4w9WgXcQ` from
  `youtube.com/watch?v=dQw4w9WgXcQ`), not the full URL.
- `title`: becomes the page's `<h1>` and URL slug.
- `description`: shown under the video and used as its meta description.
- `tags`: optional, short list of topical keywords.
- Each video gets its own page with a thumbnail and a "Watch on YouTube"
  link (not an embedded player), plus structured data that ties the video to
  Brendan Ngwa Nforbi as the subject — this is what's meant to help a
  name search surface these videos, since the video itself is hosted on
  YouTube's own domain, not this site.
