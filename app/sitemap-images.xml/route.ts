import { getAllPhotosFlat } from "@/lib/photos";
import { SITE_URL } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const photos = getAllPhotosFlat();

  const urlEntries = photos
    .map((photo) => {
      const pageUrl = `${SITE_URL}/photo/${photo.date}/${photo.slug}`;
      const imageUrl = `${SITE_URL}${photo.src}`;
      return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(photo.title)}</image:title>
      <image:caption>${escapeXml(photo.caption)}</image:caption>
    </image:image>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
