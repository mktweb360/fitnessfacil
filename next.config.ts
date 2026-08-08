import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/tienda/esterillas-yoga/fokky-bandas-elasticas-set-4-tpe",
        destination: "/tienda/pesas-mancuernas/fokky-bandas-elasticas-set-4-tpe",
        permanent: true,
      },
      {
        source: "/tienda/pesas-mancuernas/bowflex-selecttech-552",
        destination: "/tienda/pesas-mancuernas",
        permanent: true,
      },
      {
        source: "/tienda/suplementos-proteinas/creatina-monohidrato-bulk-500g",
        destination: "/tienda/suplementos-proteinas",
        permanent: true,
      },
      {
        source: "/tienda/esterillas-yoga/gaiam-essentials-thick-mat",
        destination: "/tienda/esterillas-yoga",
        permanent: true,
      },
      {
        source: "/tienda/suplementos-proteinas/optimum-nutrition-gold-standard-whey",
        destination: "/tienda/suplementos-proteinas/optimum-nutrition-gold-standard-whey-226kg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
