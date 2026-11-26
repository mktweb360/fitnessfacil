#!/usr/bin/env node
// Sincroniza con la Creators API de Amazon los datos de los productos de data/products.ts
// y los guarda en data/amazon-sync.json: imagen oficial, estado de oferta y vendedor.
//
// NO escribe precios, valoraciones ni número de reseñas: verify-build bloquea el deploy si aparecen
// en el HTML y los términos de Associates exigen no mostrarlos desactualizados (ver CLAUDE.md).
// NO modifica data/products.ts: marcar una ficha como `unavailable` exige un 301 elegido por una persona.
//
// Uso:
//   node scripts/sync-amazon.mjs            sincroniza todos los ASIN
//   node scripts/sync-amazon.mjs --dry      lista los ASIN y sale (sin credenciales ni red)
//   node scripts/sync-amazon.mjs --raw      además imprime la primera respuesta cruda de la API
//   node scripts/sync-amazon.mjs --only=B0DRW8WDB1,B07MZPPVMZ
//
// Credenciales: variables de entorno o fichero .env.local (ignorado por git):
//   CREATORS_CLIENT_ID, CREATORS_CLIENT_SECRET
// Opcionales: CREATORS_TOKEN_URL, CREATORS_API_BASE, CREATORS_MARKETPLACE
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
try { process.loadEnvFile(join(root, ".env.local")); } catch { /* sin .env.local: se usan las variables del entorno */ }

const {
  CREATORS_CLIENT_ID,
  CREATORS_CLIENT_SECRET,
  CREATORS_TOKEN_URL = "https://api.amazon.co.uk/auth/o2/token", // región EU (incluye ES)
  CREATORS_API_BASE = "https://creatorsapi.amazon",
  CREATORS_MARKETPLACE = "www.amazon.es",
} = process.env;

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => (args.find((a) => a.startsWith(`--${n}=`)) || "").split("=").slice(1).join("=");

const RESOURCES = [
  "itemInfo.title",
  "images.primary.large",
  "offersV2.listings.availability",
  "offersV2.listings.merchantInfo",
];
const BATCH = 10; // máximo de ASIN por petición según la documentación
const PAUSE_MS = 1200;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Catálogo local ────────────────────────────────────────────────────────────
const tagSrc = readFileSync(join(root, "lib", "amazon.ts"), "utf8");
const partnerTag = (tagSrc.match(/(?:AMAZON_TAG|ASSOCIATE_TAG)\s*=\s*"([^"]+)"/) || [])[1];
if (!partnerTag) { console.error("No se encuentra la constante del tag en lib/amazon.ts"); process.exit(1); }

const prodSrc = readFileSync(join(root, "data", "products.ts"), "utf8");
const catalogo = new Map(); // asin -> { slug, unavailable }
for (const b of prodSrc.split(/\n  \{\n    slug:/).slice(1)) {
  const slug = (b.match(/^\s*"([^"]+)"/) || [])[1];
  const unavailable = /\n    unavailable: "/.test(b);
  // ASIN de la ficha y de sus ofertas de Amazon (las fichas solo de Decathlon no llevan ninguno).
  const encontrados = new Set([...b.matchAll(/\n    asin: "([A-Z0-9]{10})"/g), ...b.matchAll(/store: "amazon", asin: "([A-Z0-9]{10})"/g)].map((m) => m[1]));
  if (slug) for (const asin of encontrados) catalogo.set(asin, { slug, unavailable });
}
let asins = [...catalogo.keys()];
const only = opt("only");
if (only) asins = asins.filter((a) => only.split(",").includes(a));

console.log(`Catálogo: ${catalogo.size} fichas; a consultar: ${asins.length}; tag: ${partnerTag}; marketplace: ${CREATORS_MARKETPLACE}`);
if (flag("dry")) { console.log(asins.join("\n")); process.exit(0); }
if (!asins.length) { console.error("Ningún ASIN que consultar."); process.exit(1); }
if (!CREATORS_CLIENT_ID || !CREATORS_CLIENT_SECRET) {
  console.error("Faltan CREATORS_CLIENT_ID y CREATORS_CLIENT_SECRET (variables de entorno o .env.local).");
  process.exit(1);
}

// ── API ───────────────────────────────────────────────────────────────────────
async function pedirToken() {
  const r = await fetch(CREATORS_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: CREATORS_CLIENT_ID,
      client_secret: CREATORS_CLIENT_SECRET,
      scope: "creatorsapi::default",
    }),
  });
  if (!r.ok) throw new Error(`token: HTTP ${r.status}`);
  const j = await r.json();
  if (!j.access_token) throw new Error("token: respuesta sin access_token");
  return j.access_token;
}

async function getItems(token, itemIds) {
  const body = JSON.stringify({
    itemIds, itemIdType: "ASIN", marketplace: CREATORS_MARKETPLACE, partnerTag, resources: RESOURCES,
  });
  for (let intento = 1; intento <= 4; intento++) {
    const r = await fetch(`${CREATORS_API_BASE}/catalog/v1/getItems`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-marketplace": CREATORS_MARKETPLACE,
      },
      body,
    });
    if (r.ok) return r.json();
    if ((r.status === 429 || r.status >= 500) && intento < 4) {
      const espera = Number(r.headers.get("retry-after")) * 1000 || 2000 * 2 ** intento;
      console.warn(`  HTTP ${r.status}; reintento ${intento} en ${Math.round(espera / 1000)} s`);
      await sleep(espera);
      continue;
    }
    throw new Error(`getItems: HTTP ${r.status} ${(await r.text()).slice(0, 200)}`);
  }
}

// ── Lectura defensiva de la respuesta ──────────────────────────────────────────
const pick = (o, ...rutas) => {
  for (const ruta of rutas) {
    let v = o;
    for (const k of ruta.split(".")) v = v == null ? undefined : v[k];
    if (v != null) return v;
  }
  return undefined;
};

function leerItem(item) {
  const listing = pick(item, "offersV2.listings")?.[0];
  const disp = listing?.availability;
  return {
    asin: item.asin ?? item.ASIN,
    status: listing ? "ok" : "sin-oferta",
    title: pick(item, "itemInfo.title.displayValue"),
    image: pick(item, "images.primary.large.url", "images.primary.large.URL"),
    availability: disp ? { type: disp.type, message: disp.message } : undefined,
    merchant: typeof listing?.merchantInfo?.name === "string" ? listing.merchantInfo.name : undefined,
  };
}

// ── Ejecución ─────────────────────────────────────────────────────────────────
const hoy = new Date().toISOString().slice(0, 10);
const outPath = join(root, "data", "amazon-sync.json");
const previo = existsSync(outPath) ? JSON.parse(readFileSync(outPath, "utf8")) : { items: {} };
const items = { ...previo.items };
let lotesFallidos = 0;

const token = await pedirToken();
console.log("Token obtenido.");

for (let i = 0; i < asins.length; i += BATCH) {
  const lote = asins.slice(i, i + BATCH);
  try {
    const json = await getItems(token, lote);
    if (flag("raw") && i === 0) console.log(JSON.stringify(json, null, 2));
    const recibidos = pick(json, "itemsResult.items", "items") ?? [];
    const vistos = new Set();
    for (const it of recibidos) {
      const d = leerItem(it);
      if (!d.asin) continue;
      vistos.add(d.asin);
      items[d.asin] = {
        status: d.status,
        ...(d.title && { title: d.title }),
        ...(d.image && { image: d.image }),
        ...(d.availability && { availability: d.availability }),
        ...(d.merchant && { merchant: d.merchant }),
        checkedAt: hoy,
      };
    }
    // Un ASIN que la API no devuelve (ItemNotAccessible u otro error) se registra como no accesible.
    for (const a of lote) {
      if (!vistos.has(a)) items[a] = { status: "no-accesible", checkedAt: hoy };
    }
  } catch (e) {
    lotesFallidos++;
    console.error(`  Lote ${i / BATCH + 1} fallido: ${e.message}`);
  }
  if (i + BATCH < asins.length) await sleep(PAUSE_MS);
}

// Solo ASIN que siguen en el catálogo, ordenados para que el diff de git sea estable.
const ordenado = {};
for (const a of [...catalogo.keys()].sort()) if (items[a]) ordenado[a] = items[a];
const salida = { generatedAt: hoy, marketplace: CREATORS_MARKETPLACE, items: ordenado };
writeFileSync(outPath, JSON.stringify(salida, null, 1) + "\n");

// ── Informe ───────────────────────────────────────────────────────────────────
const lista = (f) => asins.filter((a) => f(items[a], catalogo.get(a)));
const sinOferta = lista((d, c) => d?.status === "sin-oferta" && !c.unavailable);
const noAcc = lista((d, c) => d?.status === "no-accesible" && !c.unavailable);
const vuelven = lista((d, c) => d?.status === "ok" && c.unavailable);
const conImagen = lista((d) => d?.image).length;
const terceros = lista((d) => d?.merchant && !/amazon/i.test(d.merchant));

console.log(`\nResumen ${hoy}: ${asins.length} consultados, ${conImagen} con imagen, ${lotesFallidos} lotes fallidos.`);
const bloque = (titulo, arr) => {
  if (!arr.length) return;
  console.log(`\n${titulo} (${arr.length}):`);
  for (const a of arr) console.log(`  ${a}  ${catalogo.get(a).slug}`);
};
bloque("SIN OFERTA en Amazon.es y no marcadas como unavailable: revisar y, si procede, marcar `unavailable` + 301", sinOferta);
bloque("NO ACCESIBLES por la API y no marcadas como unavailable: comprobar a mano", noAcc);
bloque("MARCADAS unavailable pero la API devuelve oferta: valorar reactivar", vuelven);
bloque("Vendidas por un tercero según la API: recordar «Vendido por un tercero» en contras", terceros);
console.log("\nNo se ha modificado data/products.ts. Revisa el informe, aplica los cambios y ejecuta pnpm build.");
if (lotesFallidos === Math.ceil(asins.length / BATCH)) process.exit(1);
