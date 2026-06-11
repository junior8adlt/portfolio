import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d0b",
          borderRadius: 7,
          border: "1.5px solid #2c352e",
          color: "#46f06e",
          fontSize: 17,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: -2,
        }}
      >
        ❯_
      </div>
    ),
    { ...size },
  );
}
