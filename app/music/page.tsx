import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { graph, personNode } from "@/lib/schema";
import { MUSIC_LINKS, PERSON_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music",
  description: `Listen to music by ${PERSON_NAME} on SoundCloud, Bandcamp, and YouTube.`,
  alternates: { canonical: "/music" },
};

export default function MusicPage() {
  return (
    <>
      <JsonLd data={graph(personNode())} />
      <h1>Music</h1>
      <p>Listen to {PERSON_NAME} on:</p>
      <ul>
        {MUSIC_LINKS.map((link) => (
          <li key={link.url}>
            <a href={link.url} rel="me noopener noreferrer" target="_blank">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
