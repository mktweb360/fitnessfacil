import sync from "@/data/amazon-sync.json";
import type { Offer } from "@/lib/affiliate";

// Datos de la Creators API de Amazon, generados por scripts/sync-amazon.mjs.
// Solo se usa la imagen oficial: precios, valoraciones y reseñas no se muestran (ver CLAUDE.md).
interface SyncEntry {
  status: "ok" | "sin-oferta" | "no-accesible";
  image?: string;
  checkedAt?: string;
}

const items = (sync as { items: Record<string, SyncEntry> }).items;

/** Imagen oficial de Amazon para la ficha (por su ASIN o el de su oferta de Amazon), si la sincronización la ha traído. */
export function syncedImage(p: { asin?: string; offers?: Offer[] }): string | undefined {
  const asins = [p.asin, ...(p.offers ?? []).map((o) => (o.store === "amazon" ? o.asin : undefined))];
  for (const a of asins) {
    const img = a ? items[a]?.image : undefined;
    if (img) return img;
  }
  return undefined;
}
