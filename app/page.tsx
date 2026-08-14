import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DayCard from "@/components/DayCard";
import JsonLd from "@/components/JsonLd";
import PhotoGrid from "@/components/PhotoGrid";
import { formatDisplayDate } from "@/lib/dates";
import { getAllDays, getDayData, getPhotoBySlug } from "@/lib/photos";
import { graph, imageObjectNode, personNode, profilePageNode } from "@/lib/schema";
import {
  BIO_PARAGRAPHS,
  PERSON_NAME,
  PERSON_TAGLINE,
  PRESS_MENTIONS,
} from "@/lib/site";
import styles from "./page.module.css";

const FEATURED_PHOTO_DATE = "2026-08-14";
const FEATURED_PHOTO_SLUG = "flags-at-the-courthouse";

export const metadata: Metadata = {
  description: `${PERSON_NAME} is a Gospel singer-songwriter, public speaker, and Christian author.`,
};

export default function HomePage() {
  const photo = getPhotoBySlug(FEATURED_PHOTO_DATE, FEATURED_PHOTO_SLUG);
  const latestDay = getDayData(FEATURED_PHOTO_DATE);
  const archivePreview = getAllDays()
    .filter((day) => day.date !== FEATURED_PHOTO_DATE)
    .slice(0, 6);

  return (
    <>
      <JsonLd
        data={graph(
          personNode(),
          profilePageNode(photo),
          ...(photo ? [imageObjectNode(photo)] : [])
        )}
      />
      <section className={styles.hero}>
        {photo && photo.width > 0 && photo.height > 0 && (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className={styles.heroImage}
            priority
          />
        )}
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className="eyebrow">Photo album</p>
          <h1>{PERSON_NAME}</h1>
          <p className={styles.tagline}>{PERSON_TAGLINE}</p>
          <div className={styles.actions}>
            <Link href="/album" className="button">
              Enter the album
            </Link>
            <Link href="/music" className="button-ghost">
              Listen
            </Link>
          </div>
        </div>
      </section>

      {latestDay && latestDay.photos.length > 0 && (
        <section className={`container ${styles.section}`}>
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Latest</p>
              <h2>{latestDay.dayTitle}</h2>
              <p className={styles.muted}>{formatDisplayDate(latestDay.date)}</p>
            </div>
            <Link href={`/album/${latestDay.date}`} className={styles.sectionLink}>
              Open this day
            </Link>
          </div>
          <PhotoGrid photos={latestDay.photos} />
        </section>
      )}

      <section className={`container ${styles.about}`}>
        <div>
          <p className="eyebrow">About</p>
          <h2>The work, the witness, the record.</h2>
        </div>
        <div className={styles.aboutCopy}>
          {BIO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {PRESS_MENTIONS.map((mention) => (
            <p key={mention.url} className={styles.press}>
              <a href={mention.url} rel="noopener noreferrer" target="_blank">
                {mention.headline}
              </a>
              <span>
                {mention.publication} · {mention.datePublished.slice(0, 4)}
              </span>
            </p>
          ))}
        </div>
      </section>

      {archivePreview.length > 0 && (
        <section className={`container ${styles.section}`}>
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Archive</p>
              <h2>Earlier days</h2>
            </div>
            <Link href="/album" className={styles.sectionLink}>
              Full album
            </Link>
          </div>
          <div className={styles.dayGrid}>
            {archivePreview.map((day) => (
              <DayCard key={day.date} day={day} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
