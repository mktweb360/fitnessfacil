"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "fitnessfacil_consent";
type ConsentState = "accepted" | "rejected" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null;
    if (stored) {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  }

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
                <button onClick={reject} className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Rechazar
                </button>
                <button onClick={reject} className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Personalizar
                </button>
                <button onClick={accept} className="px-4 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
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
