// Utilidades SEO (12/10/2026): títulos de producto acotados y enlazado interno entre productos.

const CORTES = [" — ", " – ", " - ", ", ", " (", " | ", ": "];
const COLA = /\s+(de|del|para|con|y|e|en|a|el|la|los|las|sin|por|o)$/i;

/** Título de ficha de producto de unos 65 caracteres como máximo: nombre corto + sufijo. */
export function productTitle(name: string, suffix: string, max = 65): string {
  let base = name.trim();
  for (const c of CORTES) {
    const i = base.indexOf(c);
    if (i >= 18) base = base.slice(0, i);
  }
  const limite = max - suffix.length - 2;
  if (base.length > limite) {
    base = base.slice(0, limite);
    const sp = base.lastIndexOf(" ");
    if (sp > 15) base = base.slice(0, sp);
  }
  base = base.replace(/[\s,;:–—-]+$/, "");
  while (COLA.test(base)) base = base.replace(COLA, "");
  return `${base}: ${suffix}`;
}

/** Los n productos siguientes de la misma categoría (en círculo), para que todas las fichas reciban enlaces. */
export function relatedInCategory<T extends { slug: string }>(list: T[], slug: string, n = 3): T[] {
  const i = list.findIndex((p) => p.slug === slug);
  const out: T[] = [];
  for (let k = 1; k < list.length && out.length < n; k++) out.push(list[(Math.max(i, 0) + k) % list.length]);
  return out.filter((p) => p.slug !== slug);
}
