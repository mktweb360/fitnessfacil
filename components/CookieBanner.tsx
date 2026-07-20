"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";

const CONSENT_KEY = "fitnessfacil_consent";
// Se dispara al guardar una decisión para que el snapshot relea localStorage.
const CONSENT_CHANGED_EVENT = "fitnessfacil:consent-changed";
// Lo dispara el Footer para reabrir el banner y poder revocar el consentimiento.
export const OPEN_BANNER_EVENT = "openCookieBanner";

type StoredConsent = "accepted" | "rejected" | null;
// "unknown" es el valor en servidor y durante la hidratación: garantiza que el
// primer render del cliente coincide con el HTML del servidor y evita desajustes.
type ConsentSnapshot = StoredConsent | "unknown";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): ConsentSnapshot {
  return localStorage.getItem(CONSENT_KEY) as StoredConsent;
}

function getServerSnapshot(): ConsentSnapshot {
  return "unknown";
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_BANNER_EVENT, open);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, open);
  }, []);

  const save = useCallback((value: Exclude<StoredConsent, null>) => {
    localStorage.setItem(CONSENT_KEY, value);
    setReopened(false);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  }, []);

  // Con "unknown" no se muestra nada, igual que antes de hidratar.
  const visible = reopened || consent === null;

  return (
    <>
      {consent === "accepted" && (
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
                <button onClick={() => save("rejected")} className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Rechazar
                </button>
                <button onClick={() => save("accepted")} className="px-4 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
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
