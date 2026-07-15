import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import {
  getAdjacentPhoto,
  getAllPhotosFlat,
  getPhotoBySlug,
} from "@/lib/photos";
import { breadcrumbListNode, graph, imageObjectNode } from "@/lib/schema";
import { PERSON_NAME_FULL, SITE_URL } from "@/lib/site";

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
        <Link href={`/album/${photo.date}`}>&larr; {photo.date}</Link>
      </p>
      <h1>{photo.title}</h1>
      {photo.width > 0 && photo.height > 0 ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.src} alt={photo.alt} style={{ width: "100%", height: "auto" }} />
      )}
      <p>{photo.caption}</p>
      <p>
        Photographed by <strong>{PERSON_NAME_FULL}</strong> on {photo.date}.
      </p>
      {photo.tags && photo.tags.length > 0 && (
        <p>
          Tags:{" "}
          {photo.tags.map((tag, i) => (
            <span key={tag}>
              {tag}
              {i < photo.tags!.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {prev ? (
          <Link href={`/photo/${prev.date}/${prev.slug}`}>&larr; {prev.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/photo/${next.date}/${next.slug}`}>{next.title} &rarr;</Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
