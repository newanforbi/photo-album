import type { Metadata } from "next";
import Link from "next/link";
import { getAllDates, getDayData } from "@/lib/photos";
import { PERSON_NAME_FULL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Album Archive",
  description: `Full chronological archive of photos by ${PERSON_NAME_FULL}.`,
  alternates: { canonical: "/album" },
};

export default function AlbumIndexPage() {
  const dates = getAllDates(); // newest first

  return (
    <>
      <h1>Album Archive</h1>
      <p>
        Every day of photography by {PERSON_NAME_FULL}, newest first.
      </p>
      {dates.length === 0 ? (
        <p>No albums have been published yet — check back soon.</p>
      ) : (
        <ul>
          {dates.map((date) => {
            const day = getDayData(date);
            return (
              <li key={date}>
                <Link href={`/album/${date}`}>
                  {date} — {day?.dayTitle} ({day?.photos.length} photo
                  {day?.photos.length === 1 ? "" : "s"})
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
