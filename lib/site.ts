export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const PERSON_NAME = "Brendan Ngwa Nforbi";
export const PERSON_NAME_ALTERNATE = "Ngehsi Brendan Ngwa Nforbi";

export const SITE_TITLE = `${PERSON_NAME} — Photography`;
export const SITE_DESCRIPTION =
  `Personal photo album by ${PERSON_NAME} (also known as ${PERSON_NAME_ALTERNATE}), ` +
  `documenting daily photography.`;

export const PERSON_TAGLINE =
  "Gospel Singer-Songwriter, Public Speaker & Christian Author";

// Home page bio copy — leads with the full legal name, then covers basic
// history. Keep this short; it's the first thing a visitor and Googlebot see.
export const BIO_PARAGRAPHS: string[] = [
  `${PERSON_NAME_ALTERNATE} is a Gospel singer-songwriter, public speaker, ` +
    `and Christian author who shares his faith through music, speaking, and writing.`,
  `In 2014, he was named a Youth of the Year honoree by the Boys & Girls Clubs ` +
    `of Silicon Valley, recognized for character, leadership, and service.`,
];

export const MUSIC_LINKS: Array<{ label: string; url: string }> = [
  { label: "SoundCloud", url: "https://soundcloud.com/brendanngwanforbi" },
  { label: "Bandcamp", url: "https://brendanngwanforbi.bandcamp.com" },
  { label: "YouTube", url: "https://www.youtube.com/@brendanngwanforbi" },
];

// Profile URLs for the same identity across the web — each also gets a
// matching rel="me" link in the site footer.
export const SAME_AS_LINKS: string[] = MUSIC_LINKS.map((link) => link.url);

export interface PressMention {
  url: string;
  headline: string;
  publication: string;
  datePublished: string; // ISO date, e.g. "2014-11-20"
}

// Real, independent press coverage that names PERSON_NAME — surfaced on
// the About page and in the Person structured data (`subjectOf`) to help
// search engines associate the name with these articles. Add more here as
// working links turn up.
export const PRESS_MENTIONS: PressMention[] = [
  {
    url: "https://www.chicoer.com/2014/11/20/boys-girls-clubs-of-silicon-valley-names-honoree/",
    headline: "Boys & Girls Clubs of Silicon Valley names honoree",
    publication: "San Jose Mercury News",
    datePublished: "2014-11-20",
  },
];

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
