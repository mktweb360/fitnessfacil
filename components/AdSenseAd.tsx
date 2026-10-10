"use client";

import { useEffect } from "react";

// Bloques de anuncios que existen de verdad en la cuenta de AdSense (pub-6063067965030118).
// Los identificadores que no estén aquí no se pintan: hasta tener bloques creados, los anuncios
// los coloca Auto ads con el script del layout. Para activar un bloque manual, añade su ID.
export const ACTIVE_SLOTS: string[] = [];

export function isActiveSlot(slot: string): boolean {
  return ACTIVE_SLOTS.includes(slot);
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSenseAd({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}) {
  const active = isActiveSlot(slot);

  useEffect(() => {
    if (!active) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className={`my-6 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6063067965030118"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
