import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — FitnessFácil.es",
  description: "Política de privacidad y protección de datos de FitnessFácil.es.",
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
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">2. Datos que recopilamos</h2>
          <ul className="space-y-1">
            <li><strong>Formulario de contacto:</strong> nombre y email cuando nos escribes</li>
            <li><strong>Cookies analíticas y publicitarias:</strong> con tu consentimiento (ver política de cookies)</li>
            <li><strong>Google AdSense:</strong> con consentimiento, Google recopila datos para publicidad personalizada</li>
            <li><strong>Amazon Associates:</strong> cuando clicas en nuestros enlaces de Amazon, Amazon gestiona datos según su política propia</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">3. Finalidad y base legal</h2>
          <ul className="space-y-2">
            <li><strong>Atender consultas:</strong> base legal: consentimiento del interesado</li>
            <li><strong>Analítica web:</strong> base legal: interés legítimo / consentimiento</li>
            <li><strong>Publicidad personalizada (AdSense):</strong> base legal: consentimiento explícito</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">4. Google AdSense</h2>
          <p>Utilizamos Google AdSense (Publisher ID: ca-pub-6063067965030118) solo tras consentimiento explícito de cookies. Puedes gestionar preferencias de publicidad en <a href="https://www.google.com/settings/ads" className="text-green-700 hover:underline" target="_blank" rel="noopener noreferrer">google.com/settings/ads</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">5. Amazon Associates</h2>
          <p>Somos afiliados del Programa de Amazon EU (ID: cclaserdepi01-21). Al hacer clic en nuestros enlaces, Amazon puede recopilar datos según su propia política de privacidad.</p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">6. Derechos del usuario</h2>
          <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación y portabilidad escribiendo a info@mktweb360.com. Puedes reclamar ante la AEPD (www.aepd.es).</p>
        </section>

        <p className="text-xs text-gray-400">Última actualización: junio 2025</p>
      </div>
    </div>
  );
}
