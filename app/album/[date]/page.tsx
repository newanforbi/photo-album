import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PhotoGrid from "@/components/PhotoGrid";
import VideoGrid from "@/components/VideoGrid";
import { getAdjacentDates, getAllDates, getDayData } from "@/lib/photos";
import { collectionPageNode, graph } from "@/lib/schema";
import { PERSON_NAME_FULL, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllDates().map((date) => ({ date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const day = getDayData(date);
  if (!day) return {};
  const kind = day.photos.length > 0 && day.videos.length > 0
    ? "Photos and videos"
    : day.videos.length > 0
      ? "Videos"
      : "Photos";
  return {
    title: `${day.dayTitle} — ${day.date}`,
    description: `${kind} from ${day.date} by ${PERSON_NAME_FULL}: ${day.dayTitle}.`,
    alternates: { canonical: `/album/${day.date}` },
  };
}

export default async function AlbumDayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = getDayData(date);
  if (!day) notFound();

  const { prev, next } = getAdjacentDates(day.date);

  return (
    <>
      <JsonLd
        data={graph(
          collectionPageNode({
            id: `${SITE_URL}/album/${day.date}#collection`,
            url: `${SITE_URL}/album/${day.date}`,
            name: `${day.dayTitle} — ${day.date}`,
            description: `Photos from ${day.date} by ${PERSON_NAME_FULL}.`,
            photos: day.photos,
            videos: day.videos,
          })
        )}
      />
      <p>
        <Link href="/album">&larr; Album Archive</Link>
      </p>
      <h1>{day.dayTitle}</h1>
      <p>{day.date}</p>
      {day.photos.length > 0 && <PhotoGrid photos={day.photos} />}
      {day.videos.length > 0 && (
        <>
          <h2>Videos</h2>
          <VideoGrid videos={day.videos} />
        </>
      )}
      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {prev ? <Link href={`/album/${prev}`}>&larr; Older day</Link> : <span />}
        {next ? <Link href={`/album/${next}`}>Newer day &rarr;</Link> : <span />}
      </nav>
    </>
  );
}
