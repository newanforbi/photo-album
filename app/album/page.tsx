import type { Metadata } from "next";
import DayCard from "@/components/DayCard";
import PageHeader from "@/components/PageHeader";
import { getAllDays } from "@/lib/photos";
import { PERSON_NAME } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Album Archive",
  description: `Full chronological archive of photos by ${PERSON_NAME}.`,
  alternates: { canonical: "/album" },
};

export default function AlbumIndexPage() {
  const days = getAllDays();
  const years = Array.from(
    days.reduce((map, day) => {
      const year = day.date.slice(0, 4);
      const list = map.get(year) ?? [];
      list.push(day);
      map.set(year, list);
      return map;
    }, new Map<string, typeof days>())
  );

  return (
    <div className="container">
      <PageHeader eyebrow="Index" title="The album">
        <p>
          Every published day of photography by {PERSON_NAME}, newest first.
        </p>
      </PageHeader>
      {days.length === 0 ? (
        <p>No albums have been published yet — check back soon.</p>
      ) : (
        years.map(([year, yearDays]) => (
          <section key={year} className={styles.year}>
            <h2 className={styles.yearTitle}>{year}</h2>
            <div className={styles.grid}>
              {yearDays.map((day) => (
                <DayCard key={day.date} day={day} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
