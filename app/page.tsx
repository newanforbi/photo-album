import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PhotoGrid from "@/components/PhotoGrid";
import { getAllPhotosFlat } from "@/lib/photos";
import { collectionPageNode, graph } from "@/lib/schema";
import { PERSON_NAME_FULL, PERSON_NAME_SHORT, SITE_URL } from "@/lib/site";

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
            name: `Latest Photos by ${PERSON_NAME_FULL}`,
            description: `Recent photography from ${PERSON_NAME_FULL}.`,
            photos,
          })
        )}
      />
      <h1>{PERSON_NAME_FULL}</h1>
      <p>
        Welcome — this is the personal photo album of {PERSON_NAME_FULL}, also
        known as {PERSON_NAME_SHORT}. New photographs are added daily; browse
        the <Link href="/album">full album archive</Link> or read more{" "}
        <Link href="/about">about {PERSON_NAME_FULL}</Link>.
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
