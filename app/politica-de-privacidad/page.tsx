import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad y protección de datos",
  description: "Política de privacidad y protección de datos de FitnessFácil.es.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Política de privacidad</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Política de privacidad</h1>

      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <p>En cumplimiento del RGPD (UE) 2016/679 y la LOPDGDD 3/2018, Mkt Web 360 SLU informa sobre el tratamiento de datos personales en www.fitnessfacil.es.</p>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">1. Responsable del tratamiento</h2>
          <ul className="space-y-1">
            <li><strong>Identidad:</strong> Mkt Web 360 SLU</li>
            <li><strong>CIF:</strong> B87679304</li>
            <li><strong>Email:</strong> info@mktweb360.com</li>
          </ul>
          <p className="mt-2">Los datos completos del titular figuran en el <Link href="/aviso-legal" className="text-green-700 hover:underline">aviso legal</Link>.</p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">2. Datos que recopilamos</h2>
          <ul className="space-y-1">
            <li><strong><Link href="/contacto" className="text-green-700 hover:underline">Formulario de contacto</Link>:</strong> nombre y email cuando nos escribes</li>
            <li><strong>Google Analytics 4:</strong> datos de navegación y del dispositivo para medir visitas de forma agregada, con cookies solo si las aceptas (ver apartado 4)</li>
            <li><strong>Cookies analíticas y publicitarias:</strong> con tu consentimiento (ver <Link href="/politica-de-cookies" className="text-green-700 hover:underline">política de cookies</Link>)</li>
            <li><strong>Google AdSense:</strong> con consentimiento, Google recopila datos para publicidad personalizada</li>
            <li><strong>Amazon Associates:</strong> cuando clicas en nuestros enlaces de Amazon, Amazon gestiona datos según su política propia</li>
            <li><strong>Decathlon España:</strong> cuando clicas en nuestros enlaces de Decathlon, Decathlon y su plataforma de afiliación (eMarketingSolutions) gestionan datos según su política propia</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">3. Finalidad y base legal</h2>
          <ul className="space-y-2">
            <li><strong>Atender consultas:</strong> base legal: consentimiento del interesado</li>
            <li><strong>Analítica web (Google Analytics 4):</strong> base legal: consentimiento (art. 6.1.a RGPD)</li>
            <li><strong>Publicidad personalizada (AdSense):</strong> base legal: consentimiento explícito</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">4. Analítica web: Google Analytics 4</h2>
          <p className="mb-2">Usamos Google Analytics 4, un servicio de Google Ireland Limited, para medir de forma agregada las visitas, las páginas vistas y los clics en los enlaces de afiliado a Amazon (registramos la URL del enlace y la página en la que se pulsa), con el fin de saber qué contenidos resultan útiles y mejorarlos.</p>
          <ul className="space-y-1">
            <li><strong>Base legal:</strong> tu consentimiento (art. 6.1.a RGPD), que das o rechazas en el mensaje de consentimiento de Google y puedes retirar en cualquier momento desde «Preferencias de cookies» en el pie de página.</li>
            <li><strong>Datos tratados:</strong> identificador online de la cookie de analítica, dirección IP (Google Analytics 4 la trunca o anonimiza y no la almacena completa) y datos de navegación y del dispositivo (páginas vistas, enlaces pulsados, navegador, sistema operativo y tipo de dispositivo).</li>
            <li><strong>Sin consentimiento:</strong> no se instalan cookies de analítica; Google Analytics solo recibe señales sin cookies y sin identificadores persistentes.</li>
            <li><strong>Conservación:</strong> los datos de usuario y de eventos se conservan en Google Analytics hasta 14 meses.</li>
            <li><strong>Transferencias internacionales:</strong> los datos pueden ser tratados por Google LLC en EE. UU.; la transferencia está amparada en el Marco de Privacidad de Datos UE-EE. UU. y en las cláusulas contractuales tipo de la Comisión Europea.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">5. Google AdSense</h2>
          <p>Utilizamos Google AdSense (Publisher ID: ca-pub-6063067965030118) solo tras consentimiento explícito de cookies. Puedes gestionar preferencias de publicidad en <a href="https://www.google.com/settings/ads" className="text-green-700 hover:underline" target="_blank" rel="noopener noreferrer">google.com/settings/ads</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">6. Programas de afiliados (Amazon y Decathlon)</h2>
          <p>Somos afiliados del Programa de Amazon EU (ID: cclaserdepi01-21). Al hacer clic en nuestros enlaces, Amazon puede recopilar datos según su propia política de privacidad.</p>
          <p className="mt-2">También somos afiliados del programa de Decathlon España. Sus enlaces pasan por afiliacion.decathlon.es antes de llevarte a decathlon.es, y Decathlon puede recopilar datos según su propia política de privacidad.</p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">7. Conservación de los datos</h2>
          <ul className="space-y-1">
            <li><strong>Formulario de contacto:</strong> el tiempo necesario para responder y, después, durante los plazos legales de prescripción.</li>
            <li><strong>Analítica (Google Analytics 4):</strong> hasta 14 meses.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">8. Derechos del usuario</h2>
          <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento en cualquier momento (sin que afecte a la licitud del tratamiento anterior), escribiendo a info@mktweb360.com. Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, www.aepd.es).</p>
        </section>

        <p className="text-xs text-gray-400">Última actualización: octubre de 2026</p>
      </div>
    </div>
  );
}
