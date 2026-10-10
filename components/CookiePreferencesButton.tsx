"use client";

declare global {
  interface Window {
    googlefc?: { callbackQueue?: unknown[]; showRevocationMessage?: () => void };
  }
}

// Reabre el mensaje de consentimiento de Google (AdSense > Privacidad y mensajes)
// para que el visitante pueda cambiar o retirar su consentimiento en cualquier momento.
export default function CookiePreferencesButton() {
  const open = () => {
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push(() => window.googlefc?.showRevocationMessage?.());
  };
  return (
    <button type="button" onClick={open} className="hover:text-white transition-colors text-left">
      Preferencias de cookies
    </button>
  );
}
