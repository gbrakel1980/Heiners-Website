import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a1628",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: "#00d4ff",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          fontFamily: "sans-serif",
        }}
      >
        BCC
      </span>
    </div>,
    { ...size }
  );
}
