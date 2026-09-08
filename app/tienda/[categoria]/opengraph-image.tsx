import { ImageResponse } from "next/og";
import { categories } from "@/data/products";

export const alt = "Guía de compra — FitnessFácil.es";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  const catName = cat?.name ?? "Tienda";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#16a34a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "70px 80px",
        }}
      >
        <div
          style={{
            color: "#bbf7d0",
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          Guía de compra
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 32,
            maxWidth: 900,
          }}
        >
          {catName}
        </div>
        <div
          style={{
            color: "#4ade80",
            fontSize: 26,
            fontWeight: 500,
          }}
        >
          fitnessfacil.es
        </div>
      </div>
    ),
    { ...size }
  );
}
