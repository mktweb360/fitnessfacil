import Script from "next/script";

// GA4 (propiedad de la cuenta mktweb360@gmail.com) con Consent Mode v2: todo denegado por defecto.
// El mensaje de consentimiento certificado de Google (AdSense > Privacidad y mensajes, TCF v2.2)
// actualiza el estado cuando el usuario decide (gtag lee el TC string con gtag_enable_tcf_support); sin consentimiento GA4 envía pings sin cookies.
// clic_amazon y clic_decathlon: miden los clics de afiliado a cada comercio por página.
// NO QUITAR: scripts/verify-build.mjs hace fallar el build si este ID no aparece en el HTML.
export const GA_ID = "G-7R62S0W0QD";

export default function Analytics() {
  return (
    <>
      <Script id="ga4-init" strategy="beforeInteractive">
        {`window['gtag_enable_tcf_support'] = true;
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
gtag('js', new Date());
gtag('config', '${GA_ID}');
// El mensaje TCF de Google solo actualiza el consentimiento publicitario: la analítica se concede aquí
// si el usuario acepta almacenar información (propósito 1) y medir contenido o audiencia (propósitos 8 o 9).
(function analyticsFromTcf(n){
  if (typeof window.__tcfapi !== 'function') { if (n < 40) setTimeout(function(){ analyticsFromTcf(n + 1); }, 250); return; }
  window.__tcfapi('addEventListener', 2, function (d, ok) {
    if (!ok || !d || (d.eventStatus !== 'tcloaded' && d.eventStatus !== 'useractioncomplete')) return;
    var c = (d.purpose && d.purpose.consents) || {};
    var granted = d.gdprApplies === false || (c[1] && (c[8] || c[9]));
    gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
  });
})(0);
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[href*="amazon."], a[href*="afiliacion.decathlon.es"]') : null;
  if (!a) return;
  var ev = a.href.indexOf('afiliacion.decathlon.es') > -1 ? 'clic_decathlon' : 'clic_amazon';
  gtag('event', ev, { link_url: a.href, link_text: (a.innerText || '').trim().slice(0, 100), page_path: location.pathname });
}, true);`}
      </Script>
      <Script id="ga4" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
