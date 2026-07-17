import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PrevNextNav from "@/components/PrevNextNav";
import TagList from "@/components/TagList";
import {
  getAdjacentPhoto,
  getAllPhotosFlat,
  getPhotoBySlug,
} from "@/lib/photos";
import { breadcrumbListNode, graph, imageObjectNode } from "@/lib/schema";
import { PERSON_NAME, SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllPhotosFlat().map((photo) => ({
    date: photo.date,
    slug: photo.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}): Promise<Metadata> {
  const { date, slug } = await params;
  const photo = getPhotoBySlug(date, slug);
  if (!photo) return {};
  const url = `/photo/${photo.date}/${photo.slug}`;
  const imageUrl = `${SITE_URL}${photo.src}`;
  return {
    title: photo.title,
    description: photo.caption,
    alternates: { canonical: url },
    openGraph: {
      title: photo.title,
      description: photo.caption,
      url,
      type: "article",
      images: [{ url: imageUrl, width: photo.width, height: photo.height, alt: photo.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: photo.title,
      description: photo.caption,
      images: [imageUrl],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}) {
  const { date, slug } = await params;
  const photo = getPhotoBySlug(date, slug);
  if (!photo) notFound();

  const { prev, next } = getAdjacentPhoto(photo.date, photo.slug);

  return (
    <>
      <JsonLd
        data={graph(
          imageObjectNode(photo),
          breadcrumbListNode([
            { name: "Home", path: "/" },
            { name: "Album", path: "/album" },
            { name: photo.date, path: `/album/${photo.date}` },
            { name: photo.title, path: `/photo/${photo.date}/${photo.slug}` },
          ])
        )}
      />
      <p>
        <Link href={`/album/${photo.date}`} className={styles.back}>
          &larr; {photo.date}
        </Link>
      </p>
      <h1>{photo.title}</h1>
      <div className={styles.figure}>
        {photo.width > 0 && photo.height > 0 ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className={styles.image}
            priority
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.alt} className={styles.image} />
        )}
      </div>
      <p className={styles.caption}>{photo.caption}</p>
      <p className={styles.meta}>
        Photographed by <strong>{PERSON_NAME}</strong> on {photo.date}.
      </p>
      {photo.tags && photo.tags.length > 0 && (
        <>
          <p className={styles.tagsHeading}>Tags</p>
          <TagList tags={photo.tags} />
        </>
      )}
      <PrevNextNav
        prevHref={prev ? `/photo/${prev.date}/${prev.slug}` : undefined}
        prevLabel={<>&larr; {prev?.title}</>}
        nextHref={next ? `/photo/${next.date}/${next.slug}` : undefined}
        nextLabel={<>{next?.title} &rarr;</>}
      />
    </>
  );
}
