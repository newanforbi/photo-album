import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PrevNextNav from "@/components/PrevNextNav";
import TagList from "@/components/TagList";
import { formatDisplayDate } from "@/lib/dates";
import {
  getAdjacentVideo,
  getAllVideosFlat,
  getVideoBySlug,
} from "@/lib/photos";
import { breadcrumbListNode, graph, videoObjectNode } from "@/lib/schema";
import { PERSON_NAME } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllVideosFlat().map((video) => ({
    date: video.date,
    slug: video.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}): Promise<Metadata> {
  const { date, slug } = await params;
  const video = getVideoBySlug(date, slug);
  if (!video) return {};
  const url = `/video/${video.date}/${video.slug}`;
  return {
    title: video.title,
    description: video.description,
    alternates: { canonical: url },
    openGraph: {
      title: video.title,
      description: video.description,
      url,
      type: "video.other",
      images: [{ url: video.thumbnailUrl, alt: video.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [video.thumbnailUrl],
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}) {
  const { date, slug } = await params;
  const video = getVideoBySlug(date, slug);
  if (!video) notFound();

  const { prev, next } = getAdjacentVideo(video.date, video.slug);

  return (
    <div className={`container ${styles.page}`}>
      <JsonLd
        data={graph(
          videoObjectNode(video),
          breadcrumbListNode([
            { name: "Home", path: "/" },
            { name: "Album", path: "/album" },
            { name: video.date, path: `/album/${video.date}` },
            { name: video.title, path: `/video/${video.date}/${video.slug}` },
          ])
        )}
      />
      <p className={styles.backRow}>
        <Link href={`/album/${video.date}`} className={styles.back}>
          {formatDisplayDate(video.date)}
        </Link>
      </p>
      <h1>{video.title}</h1>
      <a
        href={video.watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.thumbLink}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={styles.thumb}
        />
      </a>
      <p>
        <a
          href={video.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Watch on YouTube
        </a>
      </p>
      <p className={styles.description}>{video.description}</p>
      <p className={styles.meta}>
        Featuring <strong>{PERSON_NAME}</strong>, from {formatDisplayDate(video.date)}.
      </p>
      {video.tags && video.tags.length > 0 && (
        <div className={styles.tags}>
          <p className={styles.tagsHeading}>Tags</p>
          <TagList tags={video.tags} />
        </div>
      )}
      <PrevNextNav
        prevHref={prev ? `/video/${prev.date}/${prev.slug}` : undefined}
        prevLabel={prev?.title}
        nextHref={next ? `/video/${next.date}/${next.slug}` : undefined}
        nextLabel={next?.title}
      />
    </div>
  );
}
