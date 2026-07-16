import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import {
  getAdjacentVideo,
  getAllVideosFlat,
  getVideoBySlug,
} from "@/lib/photos";
import { breadcrumbListNode, graph, videoObjectNode } from "@/lib/schema";
import { PERSON_NAME_FULL } from "@/lib/site";

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
    <>
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
      <p>
        <Link href={`/album/${video.date}`}>&larr; {video.date}</Link>
      </p>
      <h1>{video.title}</h1>
      <a href={video.watchUrl} target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </a>
      <p>
        <a href={video.watchUrl} target="_blank" rel="noopener noreferrer">
          &#9654; Watch on YouTube
        </a>
      </p>
      <p>{video.description}</p>
      <p>
        Featuring <strong>{PERSON_NAME_FULL}</strong>, from {video.date}.
      </p>
      {video.tags && video.tags.length > 0 && (
        <p>
          Tags:{" "}
          {video.tags.map((tag, i) => (
            <span key={tag}>
              {tag}
              {i < video.tags!.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {prev ? (
          <Link href={`/video/${prev.date}/${prev.slug}`}>&larr; {prev.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/video/${next.date}/${next.slug}`}>{next.title} &rarr;</Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
