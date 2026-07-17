import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getPhotoBySlug } from "@/lib/photos";
import { graph, imageObjectNode, personNode, profilePageNode } from "@/lib/schema";
import { BIO_PARAGRAPHS, PERSON_NAME_ALTERNATE } from "@/lib/site";
import styles from "./page.module.css";

const FEATURED_PHOTO_DATE = "2026-07-15";
const FEATURED_PHOTO_SLUG = "another-look-at-the-waterfront";

export const metadata: Metadata = {
  description: `${PERSON_NAME_ALTERNATE} is a Gospel singer-songwriter, public speaker, and Christian author.`,
};

export default function HomePage() {
  const photo = getPhotoBySlug(FEATURED_PHOTO_DATE, FEATURED_PHOTO_SLUG);

  return (
    <>
      <JsonLd
        data={graph(
          personNode(),
          profilePageNode(photo),
          ...(photo ? [imageObjectNode(photo)] : [])
        )}
      />
      <div className={styles.hero}>
        {photo && photo.width > 0 && photo.height > 0 && (
          <Link href={`/photo/${photo.date}/${photo.slug}`} className={styles.figureLink}>
            <div className={styles.figure}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className={styles.image}
                priority
              />
            </div>
          </Link>
        )}
        <div className={styles.content}>
          <h1>About</h1>
          <p>{BIO_PARAGRAPHS[0]}</p>
          {BIO_PARAGRAPHS.slice(1).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <p>
            Browse the <Link href="/album">full photo album</Link> or listen to{" "}
            <Link href="/music">music</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
