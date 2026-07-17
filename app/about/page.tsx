import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { graph, personNode, profilePageNode } from "@/lib/schema";
import { PERSON_NAME_FULL, PERSON_NAME_SHORT, PRESS_MENTIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${PERSON_NAME_FULL} (${PERSON_NAME_SHORT}), photographer and creator of this photo album.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(personNode(), profilePageNode())} />
      <h1>About {PERSON_NAME_FULL}</h1>
      <p>
        {PERSON_NAME_FULL} — also known as {PERSON_NAME_SHORT} — is the
        photographer behind this album. This site is a running, daily
        collection of photographs, organized by date and shared publicly.
      </p>
      <p>
        Every photo published here was taken and curated by{" "}
        {PERSON_NAME_FULL}. Browse the{" "}
        <Link href="/album">full archive</Link> to see the latest additions.
      </p>
      {PRESS_MENTIONS.length > 0 && (
        <>
          <h2>In the News</h2>
          <ul>
            {PRESS_MENTIONS.map((mention) => (
              <li key={mention.url}>
                <a href={mention.url} target="_blank" rel="noopener noreferrer">
                  {mention.headline}
                </a>{" "}
                — {mention.publication}, {mention.datePublished}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
