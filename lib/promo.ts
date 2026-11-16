// Promoción propia de Mkt Web 360 en la barra lateral: una por página, rotando según el artículo.
// Textos verificados en las páginas de cada oferta de mktweb360.com (16/11/2026). Sin precios en la web del blog (regla de cumplimiento).
export type Promo = { id: string; title: string; text: string; cta: string; href: string };

export const MKT360_PROMOS: Promo[] = [
  {
    id: "seo-geo-gbp",
    title: "SEO + GEO + Google Maps",
    text: "Un solo servicio mensual para aparecer en Google, en las respuestas de la IA y en el mapa.",
    cta: "Ver la oferta",
    href: "https://www.mktweb360.com/oferta-seo-geo-gbp/",
  },
  {
    id: "web-corporativa",
    title: "Web profesional en WordPress",
    text: "Diseño a medida que gestionas tú mismo, sin permanencia.",
    cta: "Ver la oferta",
    href: "https://www.mktweb360.com/oferta-web-seo-organico/",
  },
  {
    id: "tienda-online",
    title: "Tienda online sin comisiones",
    text: "Diseño 100 % personalizado, SEO técnico incluido y sin comisión por venta.",
    cta: "Ver la oferta",
    href: "https://www.mktweb360.com/landing/tienda-online-490/",
  },
  {
    id: "auditoria",
    title: "Auditoría SEO gratuita",
    text: "Diagnóstico gratuito de SEO, visibilidad en IA y ficha de Google, en 24 horas laborables.",
    cta: "Pedir la auditoría",
    href: "https://www.mktweb360.com/auditoria-digital/",
  },
];

export function pickPromo(slug: string): Promo {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return MKT360_PROMOS[h % MKT360_PROMOS.length];
}

export function promoUrl(p: Promo, site: string, slug: string): string {
  return `${p.href}?utm_source=${site}&utm_medium=referral&utm_campaign=lateral-blog&utm_content=${slug}`;
}
