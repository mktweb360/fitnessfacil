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

if (errors.length) {
  console.error("\n✖ verify-build: la build NO cumple los mínimos de SEO/medición:");
  for (const e of errors) console.error("  - " + e);
  for (const e of ejemplos.slice(0, 10)) console.error("    · " + e);
  process.exit(1);
}
console.log(`✔ verify-build: ${pages.length - noindex} páginas con GA4 ${gaId} y canonical; ${noindex} con noindex; sitemap y robots correctos.`);
