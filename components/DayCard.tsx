import Image from "next/image";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/dates";
import type { Day } from "@/lib/photos";
import styles from "./DayCard.module.css";

export default function DayCard({ day }: { day: Day }) {
  const cover = day.photos[0];
  const videoCover = day.videos[0];
  const count = day.photos.length;
  const videoCount = day.videos.length;
  const pieces = [
    count > 0 ? `${count} photo${count === 1 ? "" : "s"}` : null,
    videoCount > 0 ? `${videoCount} video${videoCount === 1 ? "" : "s"}` : null,
  ].filter(Boolean);

  return (
    <Link href={`/album/${day.date}`} className={styles.card}>
      <div className={styles.cover}>
        {cover && cover.width > 0 && cover.height > 0 ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
        ) : videoCover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={videoCover.thumbnailUrl}
            alt={videoCover.title}
            className={styles.image}
          />
        ) : null}
        <div className={styles.shade} />
        <div className={styles.meta}>
          <p className={styles.date}>{formatDisplayDate(day.date)}</p>
          <p className={styles.title}>{day.dayTitle}</p>
          {pieces.length > 0 ? <p className={styles.count}>{pieces.join(" · ")}</p> : null}
        </div>
      </div>
    </Link>
  );
}
