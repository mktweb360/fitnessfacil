import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FitnessFácil.es — Fitness en casa sin complicaciones";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#16a34a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-2px",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          FitnessFácil.es
        </div>
        <div
          style={{
            color: "#bbf7d0",
            fontSize: 32,
            fontWeight: 400,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Fitness en casa sin complicaciones
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 60,
            color: "#4ade80",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          fitnessfacil.es
        </div>
      </div>
    ),
    { ...size }
  );
}
