"use client";

import { useEffect, useRef } from "react";
import { ADS_ENABLED, AD_CLIENT, AD_UNITS, type AdPlacement } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// Un hueco de anuncio de tamaño fijo. Máximo recomendado por página: uno "contenido" y uno "lateral".
export default function AdSenseAd({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  const unit = AD_UNITS[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // El script de AdSense aún no ha cargado: se procesará al cargar.
    }
  }, []);

  if (!ADS_ENABLED) return null;

  return (
    <aside aria-label="Publicidad" className={`mx-auto my-8 ${className}`} style={{ width: unit.width }}>
      <p className="mb-1 text-center text-[11px] uppercase tracking-wide text-gray-400">Publicidad</p>
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: unit.width, height: unit.height }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={unit.slot}
      />
    </aside>
  );
}
