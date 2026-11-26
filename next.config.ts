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
      { source: "/tienda/bicicletas-estaticas/sportstech-x150-ergometro-plegable", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/cintas-correr/nordictrack-t65s-cinta-correr", destination: "/tienda/cintas-correr/walkingpad-r1-pro-cinta-plegable", permanent: true },
      { source: "/tienda/suplementos-proteinas/myprotein-impact-whey-2-5kg", destination: "/tienda/suplementos-proteinas/optimum-nutrition-gold-standard-whey-226kg", permanent: true },
      { source: "/tienda/bicicletas-estaticas/vannect-bicicleta-estatica-plegable-16-niveles", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/accesorios-gimnasio/picsil-comba-rapida-abs-doble-rodamiento", destination: "/tienda/accesorios-gimnasio/grifema-ga5004-comba-cuerda-acero-rodamientos", permanent: true },
      { source: "/tienda/cintas-correr/walkingpad-r2-cinta-plegable", destination: "/tienda/cintas-correr/walkingpad-r1-pro-cinta-plegable", permanent: true },
      { source: "/tienda/bicicletas-estaticas/sportstech-x100c-bicicleta-cuerdas", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/bicicletas-estaticas/merach-bicicleta-estatica-app-136kg", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/bicicletas-estaticas/sportstech-dfx70-mini-bicicleta-escritorio", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/esterillas-yoga/toplus-esterilla-yoga-tpe-6mm", destination: "/tienda/esterillas-yoga/la-mente-es-maravillosa-esterilla-tpe", permanent: true },
      { source: "/tienda/cintas-correr/horizon-t101-cinta-correr", destination: "/tienda/cintas-correr/walkingpad-r1-pro-cinta-plegable", permanent: true },
      { source: "/tienda/bicicletas-estaticas/kettler-avior-m-bicicleta-estatica", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/bicicletas-estaticas/sportstech-sx400-bicicleta-indoor", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/bicicletas-estaticas/sportstech-sx600-bicicleta-indoor", destination: "/tienda/bicicletas-estaticas/merach-bicicleta-plegable-resistencia-magnetica", permanent: true },
      { source: "/tienda/pesas-mancuernas/bowflex-selecttech-552-mancuernas", destination: "/tienda/pesas-mancuernas/lullax-neo36-mancuernas-ajustables", permanent: true },
      { source: "/tienda/bandas-resistencia/bandas-elasticas-loop-set-5-niveles", destination: "/tienda/bandas-resistencia/theraband-banda-elastica-roja-25m", permanent: true },
      { source: "/tienda/bandas-resistencia/bandas-resistencia-piernas-gluteos-set", destination: "/tienda/bandas-resistencia/theraband-banda-elastica-roja-25m", permanent: true },
      { source: "/tienda/suplementos-proteinas/myprotein-alpha-pre-workout-manzana-acida", destination: "/tienda/suplementos-proteinas", permanent: true },
      { source: "/tienda/pesas-mancuernas/activeweight-banco-pesas-ajustable-plegable", destination: "/tienda/pesas-mancuernas", permanent: true },
      { source: "/tienda/cintas-correr/superun-cinta-correr-app-pitpat", destination: "/tienda/cintas-correr/walkingpad-r1-pro-cinta-plegable", permanent: true },
      { source: "/tienda/cintas-correr/merach-t21-cinta-andar-3-en-1", destination: "/tienda/cintas-correr/walkingpad-r1-pro-cinta-plegable", permanent: true },
      { source: "/tienda/elipticas/capital-sports-helix-pro-eliptica-volante-20kg", destination: "/tienda/elipticas/merach-eliptica-magnetica-autoalimentada-app", permanent: true },
      { source: "/tienda/maquinas-remo/joroto-mr280pro-maquina-remo-agua-roble-plegable", destination: "/tienda/maquinas-remo/merach-q1s-maquina-remo-magnetica-16-niveles-app", permanent: true },
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
        destination: "/tienda/cintas-correr/walkingpad-r1-pro-cinta-plegable",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
