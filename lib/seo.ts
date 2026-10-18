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

// Title único por ficha: si dos productos dan el mismo productTitle (variantes de talla, medida,
// color…), se añade la parte del slug que los distingue. Evita «Duplicate title tag» en Semrush.
export function productTitleUnique(
  product: { slug: string; name: string },
  all: { slug: string; name: string }[],
  suffix: string,
  max = 65
): string {
  const t = productTitle(product.name, suffix, max);
  const twins = all.filter((p) => p.slug !== product.slug && productTitle(p.name, suffix, max) === t);
  if (!twins.length) return t;
  const otros = new Set(twins.flatMap((p) => p.slug.split("-")));
  const propio = product.slug.split("-").filter((w) => !otros.has(w)).map((w) => w.replace(/^(\d)(\d{2})kg$/, "$1,$2 kg")).join(" ");
  if (!propio) return t;
  const base = t.slice(0, t.length - suffix.length - 2);
  const corto = productTitle(base, suffix, max - propio.length - 1).slice(0, -(suffix.length + 2));
  return `${corto} ${propio}: ${suffix}`;
}
