import Link from "next/link";
import type { Video } from "@/lib/photos";
import styles from "./PhotoGrid.module.css";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className={styles.grid}>
      {videos.map((video) => (
        <Link
          key={`${video.date}-${video.slug}`}
          href={`/video/${video.date}/${video.slug}`}
          className={styles.card}
        >
          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              loading="lazy"
              className={styles.image}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
          </div>
          <p className={styles.caption}>&#9654; {video.title}</p>
        </Link>
      ))}
    </div>
  );
}
