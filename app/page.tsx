import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PhotoGrid from "@/components/PhotoGrid";
import { getAllPhotosFlat } from "@/lib/photos";
import { collectionPageNode, graph } from "@/lib/schema";
import { PERSON_NAME, PERSON_NAME_ALTERNATE, SITE_URL } from "@/lib/site";

const RECENT_COUNT = 12;

export default function HomePage() {
  const photos = getAllPhotosFlat().slice(0, RECENT_COUNT);

  return (
    <>
      <JsonLd
        data={graph(
          collectionPageNode({
            id: `${SITE_URL}/#latest-photos`,
            url: SITE_URL,
            name: `Latest Photos by ${PERSON_NAME}`,
            description: `Recent photography from ${PERSON_NAME}.`,
            photos,
          })
        )}
      />
      <h1>{PERSON_NAME}</h1>
      <p>
        Welcome — this is the personal photo album of {PERSON_NAME}, also
        known as {PERSON_NAME_ALTERNATE}. New photographs are added daily; browse
        the <Link href="/album">full album archive</Link> or read more{" "}
        <Link href="/about">about {PERSON_NAME}</Link>.
      </p>
      <h2>Latest Photos</h2>
      {photos.length > 0 ? (
        <PhotoGrid photos={photos} />
      ) : (
        <p>No photos have been published yet — check back soon.</p>
      )}
    </>
  );
}
