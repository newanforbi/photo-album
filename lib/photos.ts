import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { slugify } from "./slugify";

const CONTENT_DIR = path.join(process.cwd(), "content", "photos");
const PUBLIC_DIR = path.join(process.cwd(), "public", "photos");
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export interface RawPhoto {
  file: string;
  title: string;
  caption: string;
  alt: string;
  tags?: string[];
}

export interface Photo extends RawPhoto {
  date: string;
  slug: string;
  src: string;
  width: number;
  height: number;
}

export interface RawVideo {
  youtubeId: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface Video extends RawVideo {
  date: string;
  slug: string;
  watchUrl: string;
  thumbnailUrl: string;
}

export interface Day {
  date: string;
  dayTitle: string;
  photos: Photo[];
  videos: Video[];
}

interface DayFile {
  dayTitle: string;
  photos?: RawPhoto[];
  videos?: RawVideo[];
}

let cache: Day[] | null = null;

function loadAllDays(): Day[] {
  if (cache) return cache;

  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }

  const entries = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && DATE_RE.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  const days: Day[] = [];

  for (const date of entries) {
    const dataPath = path.join(CONTENT_DIR, date, "index.json");
    if (!fs.existsSync(dataPath)) continue;

    let parsed: DayFile;
    try {
      parsed = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    } catch {
      continue;
    }

    const rawPhotos = parsed.photos ?? [];
    const rawVideos = parsed.videos ?? [];
    if (rawPhotos.length === 0 && rawVideos.length === 0) continue;

    const photos: Photo[] = rawPhotos.map((raw) => {
      const imgPath = path.join(PUBLIC_DIR, date, raw.file);
      let width = 0;
      let height = 0;
      if (fs.existsSync(imgPath)) {
        const dimensions = imageSize(fs.readFileSync(imgPath));
        width = dimensions.width ?? 0;
        height = dimensions.height ?? 0;
      }
      return {
        ...raw,
        date,
        slug: slugify(raw.title),
        src: `/photos/${date}/${raw.file}`,
        width,
        height,
      };
    });

    const videos: Video[] = rawVideos.map((raw) => ({
      ...raw,
      date,
      slug: slugify(raw.title),
      watchUrl: `https://www.youtube.com/watch?v=${raw.youtubeId}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${raw.youtubeId}/hqdefault.jpg`,
    }));

    days.push({ date, dayTitle: parsed.dayTitle, photos, videos });
  }

  // Newest first.
  days.sort((a, b) => (a.date < b.date ? 1 : -1));
  cache = days;
  return days;
}

export function getAllDates(): string[] {
  return loadAllDays().map((day) => day.date);
}

export function getDayData(date: string): Day | undefined {
  return loadAllDays().find((day) => day.date === date);
}

export function getAllPhotosFlat(): Photo[] {
  return loadAllDays().flatMap((day) => day.photos);
}

export function getPhotoBySlug(date: string, slug: string): Photo | undefined {
  return getDayData(date)?.photos.find((photo) => photo.slug === slug);
}

export function getAdjacentDates(date: string): {
  prev: string | null;
  next: string | null;
} {
  const dates = getAllDates(); // newest first
  const index = dates.indexOf(date);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < dates.length - 1 ? dates[index + 1] : null, // older
    next: index > 0 ? dates[index - 1] : null, // newer
  };
}

export function getAdjacentPhoto(
  date: string,
  slug: string
): { prev: Photo | null; next: Photo | null } {
  const flat = getAllPhotosFlat(); // newest day first, in-day order preserved
  const index = flat.findIndex((p) => p.date === date && p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < flat.length - 1 ? flat[index + 1] : null,
    next: index > 0 ? flat[index - 1] : null,
  };
}

export function getAllVideosFlat(): Video[] {
  return loadAllDays().flatMap((day) => day.videos);
}

export function getVideoBySlug(date: string, slug: string): Video | undefined {
  return getDayData(date)?.videos.find((video) => video.slug === slug);
}

export function getAdjacentVideo(
  date: string,
  slug: string
): { prev: Video | null; next: Video | null } {
  const flat = getAllVideosFlat(); // newest day first, in-day order preserved
  const index = flat.findIndex((v) => v.date === date && v.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < flat.length - 1 ? flat[index + 1] : null,
    next: index > 0 ? flat[index - 1] : null,
  };
}
