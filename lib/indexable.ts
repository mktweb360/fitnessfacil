// Fichas de producto que se mantienen indexables (11/2026).
// Criterio: las más citadas por las guías del blog (relatedProducts). El resto de fichas siguen
// accesibles para el usuario, pero con noindex,follow y fuera del sitemap: Google AdSense evalúa
// el sitio completo y las fichas plantilla de afiliado restaban valor al conjunto.
export const FEATURED_PRODUCT_SLUGS = new Set<string>([
  "toplus-esterilla-yoga-tpe-6mm",
  "optimum-nutrition-gold-standard-whey-226kg",
  "walkingpad-r2-cinta-plegable",
  "sportstech-x150-ergometro-plegable",
  "walkingpad-r1-pro-cinta-plegable",
  "la-mente-es-maravillosa-esterilla-tpe",
  "fokky-bandas-elasticas-set-4-tpe",
  "myprotein-impact-whey-1kg-galletas",
  "merach-bicicleta-estatica-app-136kg",
  "lullax-neo36-mancuernas-ajustables",
  "maniboom-mancuernas-hexagonales-15kg",
  "domyos-corength-kit-mancuernas-20kg-maletin",
  "jupplies-mancuernas-15-niveles-24kg",
  "domyos-x-bike-100-v2-bicicleta-plegable",
  "kimjaly-esterilla-yoga-suave-5mm",
]);

export const isFeaturedProduct = (slug: string) => FEATURED_PRODUCT_SLUGS.has(slug);
