"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";

const CONSENT_KEY = "fitnessfacil_consent_v2";
// Clave del formato antiguo ("accepted" / "rejected"), sólo se lee para migrar.
const LEGACY_CONSENT_KEY = "fitnessfacil_consent";
// Se dispara al guardar una decisión para que el snapshot relea localStorage.
const CONSENT_CHANGED_EVENT = "fitnessfacil:consent-changed";
// Lo dispara el Footer para reabrir el banner y poder revocar el consentimiento.
export const OPEN_BANNER_EVENT = "openCookieBanner";

// Dos categorías; cada una gobierna las señales de Consent Mode v2 de su ámbito.
type Consent = { advertising: boolean; analytics: boolean };
// "unknown" es el valor en servidor y durante la hidratación: garantiza que el
// primer render del cliente coincide con el HTML del servidor y evita desajustes.
// null significa que el visitante todavía no ha decidido.
type ConsentSnapshot = Consent | null | "unknown";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function parseConsent(raw: string): Consent | null {
  try {
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed.advertising === "boolean" && typeof parsed.analytics === "boolean") {
      return { advertising: parsed.advertising, analytics: parsed.analytics };
    }
  } catch {
    // Valor corrupto: se trata como "sin decisión" y se vuelve a preguntar.
  }
  return null;
}

/**
 * Migra el formato antiguo al nuevo si aún no existe la clave v2. Se ejecuta una
 * sola vez al cargar el módulo en cliente, antes del primer render, para que un
 * visitante que ya había decidido no vea reaparecer el banner.
 */
function migrateLegacyConsent() {
  if (localStorage.getItem(CONSENT_KEY) !== null) return;
  const legacy = localStorage.getItem(LEGACY_CONSENT_KEY);
  if (legacy !== "accepted" && legacy !== "rejected") return;
  const accepted = legacy === "accepted";
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ advertising: accepted, analytics: accepted } satisfies Consent)
  );
  localStorage.removeItem(LEGACY_CONSENT_KEY);
}

if (typeof window !== "undefined") {
  migrateLegacyConsent();
}

// useSyncExternalStore exige que getSnapshot devuelva la MISMA referencia
// mientras el valor no cambie; si no, provoca un bucle de renders. Cacheamos el
// objeto parseado y sólo lo reconstruimos cuando cambia la cadena almacenada.
let cachedRaw: string | null = null;
let cachedConsent: Consent | null = null;

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): ConsentSnapshot {
  const raw = localStorage.getItem(CONSENT_KEY);
  if (raw === null) {
    cachedRaw = null;
    cachedConsent = null;
    return null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedConsent = parseConsent(raw);
  }
  return cachedConsent;
}

function getServerSnapshot(): ConsentSnapshot {
  return "unknown";
}

function pushConsentUpdate(consent: Consent) {
  const ad = consent.advertising ? "granted" : "denied";
  const analytics = consent.analytics ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
    analytics_storage: analytics,
  });
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_BANNER_EVENT, open);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, open);
  }, []);

  // El default del <head> es 'denied'; aquí se refleja la decisión ya guardada
  // (al hidratar) y cada cambio posterior, incluido desde otra pestaña.
  useEffect(() => {
    if (consent === "unknown" || consent === null) return;
    pushConsentUpdate(consent);
  }, [consent]);

  const save = useCallback((value: Consent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    setReopened(false);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  }, []);

  const acceptAll = useCallback(
    () => save({ advertising: true, analytics: true }),
    [save]
  );
  const rejectAll = useCallback(
    () => save({ advertising: false, analytics: false }),
    [save]
  );

  // Con "unknown" no se muestra nada, igual que antes de hidratar.
  const visible = reopened || consent === null;

  return (
    <>
      {consent !== "unknown" && consent?.advertising && (
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6063067965030118"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t-2 border-green-600 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold text-sm mb-1">🍪 Utilizamos cookies</p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Usamos cookies propias y de terceros (Google AdSense, Amazon) para mostrarte
                  publicidad personalizada y analizar el tráfico.{" "}
                  <a href="/politica-de-cookies" className="underline text-green-400 hover:text-green-300">
                    Más información
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button onClick={rejectAll} className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Rechazar
                </button>
                <button onClick={acceptAll} className="px-4 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  Aceptar todas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
