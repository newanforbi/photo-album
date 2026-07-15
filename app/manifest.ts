import type { MetadataRoute } from "next";
import { PERSON_NAME_FULL, SITE_TITLE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: PERSON_NAME_FULL,
    description: `Personal photo album of ${PERSON_NAME_FULL}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a1a1a",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
