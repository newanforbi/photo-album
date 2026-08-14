import { ImageResponse } from "next/og";
import { PERSON_NAME, SITE_TAGLINE_SHORT } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#0b0a09",
          color: "#f4efe8",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c9a36a",
            marginBottom: 18,
          }}
        >
          Photo Album
        </div>
        <div style={{ fontSize: 64, fontWeight: 500, lineHeight: 1.1 }}>
          {PERSON_NAME}
        </div>
        <div style={{ fontSize: 28, fontWeight: 400, marginTop: 18, color: "#cfc6ba" }}>
          {SITE_TAGLINE_SHORT}
        </div>
      </div>
    ),
    { ...size }
  );
}
