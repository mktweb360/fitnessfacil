// Promoción propia de Mkt Web 360 en la barra lateral: una por página, rotando según el artículo.
// Ofertas tomadas de https://www.mktweb360.com/ (15/11/2026). Sin precios en la web del blog.
export type Promo = { id: string; title: string; text: string; cta: string; href: string };

export const MKT360_PROMOS: Promo[] = [
  {
    id: "seo-geo-gbp",
    title: "SEO + GEO + Google Maps",
    text: "Visibilidad en Google, en asistentes de IA y en Maps con un servicio mensual.",
    cta: "Ver la oferta",
    href: "https://www.mktweb360.com/oferta-seo-geo-gbp/",
  },
  {
    id: "web-corporativa",
    title: "Web corporativa en WordPress",
    text: "Una web a medida que puedes gestionar tú mismo, sin permanencia.",
    cta: "Ver la oferta",
    href: "https://www.mktweb360.com/oferta-web-seo-organico/",
  },
  {
    id: "tienda-online",
    title: "Tienda online con SEO técnico",
    text: "Diseño propio y SEO técnico desde el primer día, sin comisiones por venta.",
    cta: "Ver la oferta",
    href: "https://www.mktweb360.com/landing/tienda-online-490/",
  },
  {
    id: "auditoria",
    title: "Auditoría SEO gratuita",
    text: "Revisamos tu SEO, tu visibilidad en IA y tu ficha de Google Business Profile.",
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
