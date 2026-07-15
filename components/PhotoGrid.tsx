import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";
import styles from "./PhotoGrid.module.css";

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className={styles.grid}>
      {photos.map((photo) => (
        <Link
          key={`${photo.date}-${photo.slug}`}
          href={`/photo/${photo.date}/${photo.slug}`}
          className={styles.card}
        >
          <div className={styles.imageWrap}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 600px) 100vw, 220px"
              className={styles.image}
            />
          </div>
          <p className={styles.caption}>{photo.title}</p>
        </Link>
      ))}
    </div>
  );
}
