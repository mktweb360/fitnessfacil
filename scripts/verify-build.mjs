// Comprobación obligatoria tras `next build` (se ejecuta en local y en Vercel).
// Hace fallar la build si en el HTML generado falta la etiqueta de GA4, el canonical,
// o si el sitemap / robots.txt no están bien. Añadido el 18/10/2026: GA4 llevaba meses
// sin instalar en los 5 blogs y nadie lo detectó. NO QUITAR ESTE PASO DEL SCRIPT DE BUILD.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const app = join(root, ".next", "server", "app");
const errors = [];

const analytics = readFileSync(join(root, "components", "Analytics.tsx"), "utf8");
const gaId = (analytics.match(/GA_ID = "(G-[A-Z0-9]+)"/) || [])[1];
if (!gaId) errors.push("components/Analytics.tsx no define GA_ID");

// Recoge todas las páginas HTML prerenderizadas (salvo errores y no encontradas).
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html") && !/_not-found|_global-error|^404|^500/.test(f)) pages.push(p);
  }
})(app);
if (pages.length < 10) errors.push(`solo ${pages.length} páginas HTML generadas`);

let sinGa = 0, sinCanonical = 0, noindex = 0;
const ejemplos = [];
const imgRotas = new Set();
for (const p of pages) {
  const h = readFileSync(p, "utf8");
  // Imágenes locales que no existen en public/ (Semrush: «imágenes internas rotas»).
  for (const m of h.matchAll(/<img[^>]+src="(\/[^"?#]+)"/g)) {
    const src = decodeURIComponent(m[1]);
    if (src.startsWith("/_next/")) continue;
    if (!existsSync(join(root, "public", src))) imgRotas.add(src);
  }
  // Las fichas marcadas como no disponibles llevan noindex o redirigen: no exigen canonical.
  const isNoindex = /<meta name="robots" content="[^"]*noindex/i.test(h);
  if (isNoindex) { noindex++; continue; }
  if (!h.includes(gaId) || !h.includes("googletagmanager.com/gtag/js")) { sinGa++; ejemplos.push("sin GA4: " + p.slice(app.length)); }
  if (!/<link rel="canonical" href="https:\/\/www\.[^"]+"/.test(h)) { sinCanonical++; ejemplos.push("sin canonical: " + p.slice(app.length)); }
}
if (sinGa) errors.push(`${sinGa} páginas sin la etiqueta GA4 ${gaId}`);
if (sinCanonical) errors.push(`${sinCanonical} páginas sin canonical absoluto`);
if (imgRotas.size) errors.push(`${imgRotas.size} imágenes locales no existen en public/: ${[...imgRotas].slice(0, 5).join(", ")}`);

// Títulos duplicados entre páginas indexables (Semrush: «Duplicate title tag»).
const titulos = new Map();
for (const p of pages) {
  const h = readFileSync(p, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/i.test(h)) continue;
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (t) titulos.set(t, [...(titulos.get(t) || []), p.slice(app.length)]);
}
const dup = [...titulos].filter(([, v]) => v.length > 1);
if (dup.length) errors.push(`${dup.length} títulos duplicados, p. ej. «${dup[0][0]}» en ${dup[0][1].join(", ")}`);

const sm = join(app, "sitemap.xml.body");
if (!existsSync(sm)) errors.push("no se ha generado sitemap.xml");
else {
  const n = (readFileSync(sm, "utf8").match(/<loc>/g) || []).length;
  if (n < 10) errors.push(`sitemap.xml con solo ${n} URLs`);
}
const rb = join(app, "robots.txt.body");
if (!existsSync(rb)) errors.push("no se ha generado robots.txt");
else {
  const r = readFileSync(rb, "utf8");
  if (!/Sitemap: https:\/\/www\./.test(r)) errors.push("robots.txt sin línea Sitemap");
  if (/Disallow: \/\s*$/m.test(r)) errors.push("robots.txt bloquea todo el sitio");
}

// ── Cumplimiento de Amazon Associates (18/10/2026) ─────────────────────────────
// Prohibido mostrar precios, reclamos de precio, «más vendido», valoraciones o nº de reseñas
// de productos de Amazon escritos a mano. Se limpió el 13/10 y reapareció: por eso ahora bloquea el deploy.
// Excepciones justificadas (p. ej. precios de SaaS/hosting que no son de Amazon) en scripts/compliance-allow.json:
// { "paths": ["/blog/slug-con-precios-saas"], "phrases": ["texto exacto permitido"] }
const allowFile = join(root, "scripts", "compliance-allow.json");
const allow = existsSync(allowFile) ? JSON.parse(readFileSync(allowFile, "utf8")) : { paths: [], phrases: [] };
const reglas = [
  { id: "R1 precio en €", re: /\d[\d.,]*\s?€|€\s?\d/ },
  { id: "R3 reclamo de precio o ventas", re: /mejor(es)? precios?|comparativa de precios|precio más bajo|más vendid[oa]s?|best ?seller|chollo/i },
  { id: "R4 valoración", re: /★|☆|\d[.,]\d\s?(\/|de)\s?5\b|de 5 estrellas|valoraci[oó]n media|opiniones verificadas|calificaci[oó]n de (los )?clientes/i },
  { id: "R5 nº de reseñas", re: /\d[\d.]*\s?(valoraciones|reseñas|opiniones|reviews)\b/i },
];
const infracciones = [];
for (const p of pages) {
  const ruta = p.slice(app.length).replace(/\\/g, "/").replace(/\.html$/, "").replace(/\/index$/, "") || "/";
  if (allow.paths.includes(ruta)) continue;
  let texto = readFileSync(p, "utf8")
    .replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
  for (const f of allow.phrases) texto = texto.split(f).join(" ");
  for (const r of reglas) {
    const m = texto.match(r.re);
    if (m) infracciones.push(`${r.id}: «${texto.slice(Math.max(0, m.index - 40), m.index + 40).trim()}» en ${ruta}`);
  }
  // JSON-LD: sin Product, offers ni aggregateRating
  const html = readFileSync(p, "utf8");
  if (/"@type":\s*"Product"|"aggregateRating"|"offers"\s*:/.test(html)) infracciones.push(`R4 JSON-LD de producto/valoración en ${ruta}`);
}
const llms = join(root, "public", "llms.txt");
if (existsSync(llms) && /€/.test(readFileSync(llms, "utf8"))) infracciones.push("R2 precio en € en public/llms.txt");
if (infracciones.length) {
  errors.push(`${infracciones.length} incumplimientos de Amazon Associates (precios, reclamos, valoraciones o reseñas)`);
  ejemplos.unshift(...infracciones.slice(0, 15));
}

// ── Enlaces de afiliado multicomercio (26/10/2026) ─────────────────────────────
// Toda ficha de producto indexable tiene botón de compra; los enlaces de Decathlon llevan nuestro
// programa (act=21712) y publisher (pub=43981) tal y como los genera el panel; ningún href con «undefined».
const malEnlace = [];
let enlacesDecathlon = 0;
for (const p of pages) {
  const html = readFileSync(p, "utf8");
  const ruta = p.slice(app.length).replace(/\\/g, "/").replace(/\.html$/, "");
  if (/href="[^"]*undefined[^"]*"/.test(html)) malEnlace.push(`href con undefined en ${ruta}`);
  for (const m of html.matchAll(/href="(https:\/\/afiliacion\.decathlon\.es[^"]*)"/g)) {
    enlacesDecathlon++;
    const u = m[1].replace(/&amp;/g, "&");
    if (!u.startsWith("https://afiliacion.decathlon.es/tracking/clk?act=21712&gel=233292&pub=43981&org=2615&url=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fp%2F")) malEnlace.push(`enlace de Decathlon mal formado en ${ruta}`);
  }
  // Las fichas retiradas (unavailable) se prerenderizan como redirección a su categoría.
  const esFicha = /^\/tienda\/[^/]+\/[^/]+$/.test(ruta) && !/<meta name="robots" content="[^"]*noindex/i.test(html) && !html.includes("NEXT_REDIRECT");
  if (esFicha && !/href="https:\/\/(www\.amazon\.es\/dp\/|afiliacion\.decathlon\.es\/)/.test(html)) malEnlace.push(`ficha sin botón de compra: ${ruta}`);
}
if (malEnlace.length) {
  errors.push(`${malEnlace.length} problemas en enlaces de afiliado`);
  ejemplos.unshift(...malEnlace.slice(0, 10));
}

if (errors.length) {
  console.error("\n✖ verify-build: la build NO cumple los mínimos de SEO/medición:");
  for (const e of errors) console.error("  - " + e);
  for (const e of ejemplos.slice(0, 10)) console.error("    · " + e);
  process.exit(1);
}
console.log(`✔ verify-build: ${pages.length - noindex} páginas con GA4 ${gaId} y canonical; ${noindex} con noindex; sitemap y robots correctos; ${enlacesDecathlon} enlaces de Decathlon bien formados.`);
