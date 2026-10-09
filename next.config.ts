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
      {
        source: "/tienda/suplementos-proteinas/optimum-nutrition-gold-standard-whey-2kg",
        destination: "/tienda/suplementos-proteinas/optimum-nutrition-gold-standard-whey-226kg",
        permanent: true,
      },
      {
        source: "/tienda/cintas-correr/domyos-t520b-cinta-correr",
        destination: "/tienda/cintas-correr",
        permanent: true,
      },
      {
        source: "/tienda/cintas-correr/toorx-voyager-plus-cinta-correr",
        destination: "/tienda/cintas-correr",
        permanent: true,
      },
      // 27/09/2026 loop: productos retirados en 2026-06/08 sin redirect (auditoría historial git)
      {
        source: "/tienda/pesas-mancuernas/amazon-basics-kettlebell-16kg",
        destination: "/tienda/pesas-mancuernas/jowy-kettlebell-pvc-16kg",
        permanent: true,
      },
      {
        source: "/tienda/bicicletas-estaticas/bh-fitness-sb2-6",
        destination: "/tienda/bicicletas-estaticas",
        permanent: true,
      },
      {
        source: "/tienda/bicicletas-estaticas/bowflex-velocore-bicicleta",
        destination: "/tienda/bicicletas-estaticas",
        permanent: true,
      },
      {
        source: "/tienda/bicicletas-estaticas/decathlon-domyos-eb900",
        destination: "/tienda/bicicletas-estaticas",
        permanent: true,
      },
      {
        source: "/tienda/bicicletas-estaticas/domyos-ve520-bicicleta-estatica",
        destination: "/tienda/bicicletas-estaticas",
        permanent: true,
      },
      {
        source: "/tienda/pesas-mancuernas/gorilla-sports-rack-mancuernas",
        destination: "/tienda/pesas-mancuernas",
        permanent: true,
      },
      {
        source: "/tienda/esterillas-yoga/manduka-pro-yoga-mat",
        destination: "/tienda/esterillas-yoga/manduka-pro-yoga-mat-6mm",
        permanent: true,
      },
      {
        source: "/tienda/suplementos-proteinas/myprotein-impact-whey-1kg",
        destination: "/tienda/suplementos-proteinas/myprotein-impact-whey-1kg-galletas",
        permanent: true,
      },
      {
        source: "/tienda/esterillas-yoga/nike-fundamental-yoga-mat",
        destination: "/tienda/esterillas-yoga",
        permanent: true,
      },
      {
        source: "/tienda/cintas-correr/reebok-one-gt40s",
        destination: "/tienda/cintas-correr",
        permanent: true,
      },
      {
        source: "/tienda/bicicletas-estaticas/sportstech-ux250",
        destination: "/tienda/bicicletas-estaticas",
        permanent: true,
      },
      {
        source: "/tienda/cintas-correr/toorx-trx-50s",
        destination: "/tienda/cintas-correr",
        permanent: true,
      },
      {
        source: "/tienda/cintas-correr/xiaomi-kingsmith-walkingpad",
        destination: "/tienda/cintas-correr/walkingpad-r2-cinta-plegable",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
