export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const PERSON_NAME_FULL = "Ngehsi Brendan Ngwa Nforbi";
export const PERSON_NAME_SHORT = "Brendan Ngwa Nforbi";

export const SITE_TITLE = `${PERSON_NAME_FULL} — Photography`;
export const SITE_DESCRIPTION =
  `Personal photo album by ${PERSON_NAME_FULL} (also known as ${PERSON_NAME_SHORT}), ` +
  `documenting daily photography.`;

// Populate with real profile URLs (LinkedIn, Instagram, X, etc.) when available.
// Each entry should also get a matching rel="me" link in the About page footer.
export const SAME_AS_LINKS: string[] = [];

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
