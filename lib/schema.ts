import {
  PERSON_ID,
  PERSON_NAME,
  PERSON_NAME_ALTERNATE,
  PERSON_TAGLINE,
  PRESS_MENTIONS,
  SAME_AS_LINKS,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  WEBSITE_ID,
} from "./site";
import type { Photo, Video } from "./photos";

type JsonLdNode = Record<string, unknown>;

export function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    alternateName: PERSON_NAME_ALTERNATE,
    url: SITE_URL,
    jobTitle: PERSON_TAGLINE,
    ...(SAME_AS_LINKS.length > 0 ? { sameAs: SAME_AS_LINKS } : {}),
    ...(PRESS_MENTIONS.length > 0
      ? {
          subjectOf: PRESS_MENTIONS.map((mention) => ({
            "@type": "NewsArticle",
            url: mention.url,
            headline: mention.headline,
            datePublished: mention.datePublished,
            publisher: { "@type": "Organization", name: mention.publication },
          })),
        }
      : {}),
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    publisher: { "@id": PERSON_ID },
  };
}

export function profilePageNode(photo?: Photo): JsonLdNode {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: `About ${PERSON_NAME}`,
    mainEntity: { "@id": PERSON_ID },
    ...(photo
      ? { primaryImageOfPage: { "@id": `${SITE_URL}${photo.src}#image` } }
      : {}),
  };
}

export function imageObjectNode(photo: Photo): JsonLdNode {
  const url = `${SITE_URL}${photo.src}`;
  const year = photo.date.slice(0, 4);
  return {
    "@type": "ImageObject",
    "@id": `${url}#image`,
    contentUrl: url,
    url,
    name: photo.title,
    caption: photo.caption,
    description: photo.caption,
    ...(photo.width && photo.height
      ? { width: photo.width, height: photo.height }
      : {}),
    uploadDate: `${photo.date}T00:00:00.000Z`,
    creator: { "@id": PERSON_ID },
    copyrightHolder: { "@id": PERSON_ID },
    creditText: PERSON_NAME,
    copyrightNotice: `© ${year} ${PERSON_NAME}`,
    license: `${SITE_URL}/copyright`,
    acquireLicensePage: `${SITE_URL}/copyright`,
    ...(photo.tags && photo.tags.length > 0 ? { keywords: photo.tags.join(", ") } : {}),
  };
}

export function videoObjectNode(video: Video): JsonLdNode {
  const url = `${SITE_URL}/video/${video.date}/${video.slug}`;
  return {
    "@type": "VideoObject",
    "@id": `${url}#video`,
    url,
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: `${video.date}T00:00:00.000Z`,
    contentUrl: video.watchUrl,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    // Not `creator`: these videos come from other sources, not shot by
    // PERSON_ID — `actor`/`about` correctly describe them as the subject.
    actor: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    ...(video.tags && video.tags.length > 0 ? { keywords: video.tags.join(", ") } : {}),
  };
}

export function breadcrumbListNode(
  items: Array<{ name: string; path: string }>
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function collectionPageNode(options: {
  id: string;
  url: string;
  name: string;
  description: string;
  photos: Photo[];
  videos?: Video[];
}): JsonLdNode {
  return {
    "@type": "CollectionPage",
    "@id": options.id,
    url: options.url,
    name: options.name,
    description: options.description,
    about: { "@id": PERSON_ID },
    hasPart: [
      ...options.photos.map((photo) => imageObjectNode(photo)),
      ...(options.videos ?? []).map((video) => videoObjectNode(video)),
    ],
  };
}

export function graph(...nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
