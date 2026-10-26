import { amazonLink } from "@/lib/amazon";

/**
 * Comercios de afiliación de un producto. El orden de `offers` es el de los botones:
 * el primero es el principal (regla de José, 26/10/2026: primero el más barato el día de la comprobación).
 * Decathlon: programa «Afiliacion ES especialistas» (21712), publisher 43981.
 */
export type Offer =
  | { store: "amazon"; asin: string; unavailable?: string }
  | { store: "decathlon"; path: string; mc?: string; unavailable?: string };

export type Store = Offer["store"];

export const STORE_NAME: Record<Store, string> = { amazon: "Amazon", decathlon: "Decathlon" };

// Formato exacto de los enlaces del buscador «Mis productos» del panel (comprobado el 26/10/2026).
const DECATHLON_CLK = "https://afiliacion.decathlon.es/tracking/clk?act=21712&gel=233292&pub=43981&org=2615&url=";
const DECATHLON_UTM = "utm_campaign=decathlon_afiliados_es&utm_source=43981_1";

export function offerUrl(o: Offer): string {
  if (o.store === "amazon") return amazonLink(o.asin);
  // Sin código de modelo, el panel pega los utm a la ruta sin «?»; decathlon.es la abre igual.
  const dest = o.mc
    ? `https://www.decathlon.es/es/p/${o.path}?mc=${o.mc}&${DECATHLON_UTM}`
    : `https://www.decathlon.es/es/p/${o.path}&${DECATHLON_UTM}`;
  return DECATHLON_CLK + encodeURIComponent(dest);
}

/** Ofertas vigentes de un producto. Las fichas antiguas solo tienen `asin` y equivalen a una oferta de Amazon. */
export function offersOf(p: { asin?: string; offers?: Offer[] }): Offer[] {
  const list: Offer[] = p.offers ?? (p.asin ? [{ store: "amazon", asin: p.asin }] : []);
  return list.filter((o) => !o.unavailable);
}

/** Oferta principal (la primera vigente) o `undefined` si ya no queda ninguna. */
export function primaryOffer(p: { asin?: string; offers?: Offer[] }): Offer | undefined {
  return offersOf(p)[0];
}
