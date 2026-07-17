import { ImageResponse } from "next/og";
import { PERSON_NAME } from "@/lib/site";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: 64,
          fontWeight: 600,
        }}
      >
        {PERSON_NAME}
        <div style={{ fontSize: 32, fontWeight: 400, marginTop: 20, color: "#ccc" }}>
          Photography
        </div>
      </div>
    ),
    { ...size }
  );
}
