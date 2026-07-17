import type { MetadataRoute } from "next";
import { getAllDates, getAllPhotosFlat, getAllVideosFlat, getDayData } from "@/lib/photos";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const dates = getAllDates();
  const photos = getAllPhotosFlat();
  const videos = getAllVideosFlat();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/music`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/album`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/copyright`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const dayEntries: MetadataRoute.Sitemap = dates.map((date) => ({
    url: `${SITE_URL}/album/${date}`,
    lastModified: getDayData(date) ? `${date}T00:00:00.000Z` : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const photoEntries: MetadataRoute.Sitemap = photos.map((photo) => ({
    url: `${SITE_URL}/photo/${photo.date}/${photo.slug}`,
    lastModified: `${photo.date}T00:00:00.000Z`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const videoEntries: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${SITE_URL}/video/${video.date}/${video.slug}`,
    lastModified: `${video.date}T00:00:00.000Z`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticEntries, ...dayEntries, ...photoEntries, ...videoEntries];
}
