import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { graph, personNode } from "@/lib/schema";
import { MUSIC_LINKS, PERSON_NAME } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Music",
  description: `Listen to music by ${PERSON_NAME} on SoundCloud, Bandcamp, and YouTube.`,
  alternates: { canonical: "/music" },
};

export default function MusicPage() {
  return (
    <div className="container">
      <JsonLd data={graph(personNode())} />
      <PageHeader eyebrow="Listen" title="Music">
        <p>Find {PERSON_NAME} on the platforms below.</p>
      </PageHeader>
      <ul className={styles.list}>
        {MUSIC_LINKS.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              rel="me noopener noreferrer"
              target="_blank"
              className={styles.card}
            >
              <span className={styles.label}>{link.label}</span>
              <span className={styles.blurb}>{link.blurb}</span>
              <span className={styles.go}>Open</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
