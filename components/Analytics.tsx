import Script from "next/script";

// GA4 (propiedad de la cuenta mktweb360@gmail.com) con Consent Mode v2: todo denegado por defecto.
// El mensaje de consentimiento certificado de Google (AdSense > Privacidad y mensajes, TCF v2.2)
// actualiza el estado cuando el usuario decide; sin consentimiento GA4 envía pings sin cookies.
// clic_amazon: mide los clics de afiliado (enlaces a Amazon) por página.
// NO QUITAR: scripts/verify-build.mjs hace fallar el build si este ID no aparece en el HTML.
export const GA_ID = "G-7R62S0W0QD";

export default function Analytics() {
  return (
    <>
      <Script id="ga4-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
gtag('js', new Date());
gtag('config', '${GA_ID}');
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[href*="amazon."]') : null;
  if (!a) return;
  gtag('event', 'clic_amazon', { link_url: a.href, link_text: (a.innerText || '').trim().slice(0, 100), page_path: location.pathname });
}, true);`}
      </Script>
      <Script id="ga4" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
