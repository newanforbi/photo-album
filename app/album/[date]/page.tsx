import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PhotoGrid from "@/components/PhotoGrid";
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
  return {
    title: `${day.dayTitle} — ${day.date}`,
    description: `Photos from ${day.date} by ${PERSON_NAME_FULL}: ${day.dayTitle}.`,
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
          })
        )}
      />
      <p>
        <Link href="/album">&larr; Album Archive</Link>
      </p>
      <h1>{day.dayTitle}</h1>
      <p>{day.date}</p>
      <PhotoGrid photos={day.photos} />
      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {prev ? <Link href={`/album/${prev}`}>&larr; Older day</Link> : <span />}
        {next ? <Link href={`/album/${next}`}>Newer day &rarr;</Link> : <span />}
      </nav>
    </>
  );
}
