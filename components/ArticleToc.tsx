"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/** Índice de anclas del artículo. `mobile` = desplegable; `side` = lista fija en la barra lateral. */
export default function ArticleToc({ items, variant }: { items: TocItem[]; variant: "mobile" | "side" }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (variant !== "side" || items.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items, variant]);

  if (items.length < 3) return null;

  const list = (
    <ol className="space-y-1.5 text-sm">
      {items.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            aria-current={active === i.id ? "location" : undefined}
            className={`block border-l-2 pl-3 py-0.5 leading-snug transition-colors ${
              active === i.id ? "border-green-600 text-green-800 font-semibold" : "border-transparent text-gray-600 hover:text-green-700 hover:border-green-300"
            }`}
          >
            {i.label}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <details className="lg:hidden mb-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <summary className="cursor-pointer text-sm font-bold text-gray-800">En este artículo</summary>
        <nav aria-label="Índice del artículo" className="mt-3">{list}</nav>
      </details>
    );
  }

  return (
    <nav aria-label="Índice del artículo" className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">En este artículo</p>
      {list}
    </nav>
  );
}
