"use client";

import { OPEN_BANNER_EVENT } from "./CookieBanner";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_BANNER_EVENT))}
      className="hover:text-white transition-colors text-left"
    >
      Preferencias de cookies
    </button>
  );
}
