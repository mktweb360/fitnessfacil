"use client";

import AdSenseAd from "@/components/AdSenseAd";
import ArticleToc, { type TocItem } from "@/components/ArticleToc";
import type { Promo } from "@/lib/promo";

export type SidebarProduct = { slug: string; name: string; href: string; image?: string };

/**
 * Barra lateral de los artículos (solo escritorio): índice de anclas, material de la guía
 * (enlaces a nuestras fichas, no a tiendas), una promoción propia de Mkt Web 360 y el hueco
 * de AdSense (inactivo hasta la aprobación).
 */
export default function BlogSidebar({
  toc,
  products,
  promo,
  promoHref,
  ctaHref,
  ctaText,
}: {
  toc: TocItem[];
  products: SidebarProduct[];
  promo: Promo;
  promoHref: string;
  ctaHref?: string;
  ctaText?: string;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 space-y-5 max-h-[calc(100vh-3rem)] overflow-y-auto pr-1">
        <ArticleToc items={toc} variant="side" />

        {products.length > 0 && (
          <section aria-label="Material de esta guía" className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Material de esta guía</p>
            <ul className="space-y-3">
              {products.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <a href={p.href} className="flex items-center gap-3 group">
                    {p.image && (
                      <img src={p.image} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 shrink-0 rounded-lg object-cover bg-gray-50" />
                    )}
                    <span className="text-sm leading-snug text-gray-700 group-hover:text-green-700">{p.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            {ctaHref && ctaText && (
              <a href={ctaHref} className="mt-4 block text-center text-sm font-semibold text-green-700 hover:text-green-900">
                {ctaText} →
              </a>
            )}
          </section>
        )}

        <AdSenseAd placement="lateral" />

        <section aria-label="Mkt Web 360" className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-violet-700 mb-1">Mkt Web 360 · Nuestra agencia</p>
          <p className="text-sm font-bold text-gray-900 mb-1">{promo.title}</p>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">{promo.text}</p>
          <a href={promoHref} target="_blank" rel="noopener" className="text-sm font-semibold text-violet-700 hover:text-violet-900">
            {promo.cta} →
          </a>
        </section>
      </div>
    </aside>
  );
}
