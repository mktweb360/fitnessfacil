import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies usamos en FitnessFácil.es y cómo gestionarlas.",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function PoliticaCookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Política de cookies</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Política de cookies</h1>

      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <p>En cumplimiento de la Ley 34/2002 (LSSICE) y el RGPD, informamos sobre las cookies utilizadas en www.fitnessfacil.es.</p>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Cookies que utilizamos</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-3 py-2 border border-gray-200">Cookie</th>
                  <th className="text-left px-3 py-2 border border-gray-200">Tipo</th>
                  <th className="text-left px-3 py-2 border border-gray-200">Finalidad</th>
                  <th className="text-left px-3 py-2 border border-gray-200">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border border-gray-200">FCCDCF</td>
                  <td className="px-3 py-2 border border-gray-200">Técnica (Google, plataforma de consentimiento)</td>
                  <td className="px-3 py-2 border border-gray-200">Guardar tu decisión de consentimiento (estándar TCF del IAB)</td>
                  <td className="px-3 py-2 border border-gray-200">13 meses</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-3 py-2 border border-gray-200">Cookies Google AdSense</td>
                  <td className="px-3 py-2 border border-gray-200">Publicidad (terceros)</td>
                  <td className="px-3 py-2 border border-gray-200">Publicidad personalizada (solo con consentimiento)</td>
                  <td className="px-3 py-2 border border-gray-200">Variable (Google)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-200">_ga, _ga_*</td>
                  <td className="px-3 py-2 border border-gray-200">Analítica (Google Analytics 4)</td>
                  <td className="px-3 py-2 border border-gray-200">Medir de forma agregada las visitas y los clics a Amazon (Google Analytics 4; solo con consentimiento)</td>
                  <td className="px-3 py-2 border border-gray-200">2 años</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-200">Cookies Amazon</td>
                  <td className="px-3 py-2 border border-gray-200">Afiliados (terceros)</td>
                  <td className="px-3 py-2 border border-gray-200">Rastreo de conversiones de afiliado</td>
                  <td className="px-3 py-2 border border-gray-200">24 horas (Amazon)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Gestión de cookies</h2>
          <ul className="space-y-1">
            <li>Acepta, rechaza o personaliza las cookies en el mensaje de consentimiento de Google que aparece al entrar; puedes cambiar tu decisión cuando quieras con el enlace «Preferencias de cookies» del pie de página</li>
            <li>Borra cookies desde la configuración de tu navegador</li>
            <li>Gestiona publicidad de Google en <a href="https://www.google.com/settings/ads" className="text-green-700 hover:underline" target="_blank" rel="noopener noreferrer">google.com/settings/ads</a></li>
          </ul>
        </section>

        <p>Más información en nuestra <Link href="/politica-de-privacidad" className="text-green-700 hover:underline">política de privacidad</Link> o escríbenos a info@mktweb360.com.</p>
        <p className="text-xs text-gray-400">Última actualización: octubre de 2026</p>
      </div>
    </div>
  );
}
