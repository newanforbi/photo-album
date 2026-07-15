import {
  PERSON_ID,
  PERSON_NAME_FULL,
  PERSON_NAME_SHORT,
  SAME_AS_LINKS,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  WEBSITE_ID,
} from "./site";
import type { Photo } from "./photos";

type JsonLdNode = Record<string, unknown>;

export function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME_FULL,
    alternateName: PERSON_NAME_SHORT,
    url: SITE_URL,
    jobTitle: "Photographer",
    ...(SAME_AS_LINKS.length > 0 ? { sameAs: SAME_AS_LINKS } : {}),
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

export function profilePageNode(): JsonLdNode {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: `About ${PERSON_NAME_FULL}`,
    mainEntity: { "@id": PERSON_ID },
  };
}

export function imageObjectNode(photo: Photo): JsonLdNode {
  const url = `${SITE_URL}${photo.src}`;
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
    ...(photo.tags && photo.tags.length > 0 ? { keywords: photo.tags.join(", ") } : {}),
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
}): JsonLdNode {
  return {
    "@type": "CollectionPage",
    "@id": options.id,
    url: options.url,
    name: options.name,
    description: options.description,
    about: { "@id": PERSON_ID },
    hasPart: options.photos.map((photo) => imageObjectNode(photo)),
  };
}

export function graph(...nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
