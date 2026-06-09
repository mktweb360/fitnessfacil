import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros — FitnessFácil.es",
  description: "Quiénes somos, cómo trabajamos y nuestra política de transparencia en afiliados y recomendaciones.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Sobre nosotros</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Sobre FitnessFácil.es</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <p className="text-lg">
          FitnessFácil.es es un proyecto de <strong>Mkt Web 360 SLU</strong> (CIF B87679304)
          dedicado a ayudar a adultos españoles a encontrar el mejor equipamiento fitness para
          entrenar en casa, perder peso y mejorar su salud sin necesidad de ir al gimnasio.
        </p>

        <h2 className="text-xl font-extrabold text-gray-900">¿Qué hacemos?</h2>
        <p>
          Analizamos y comparamos equipamiento fitness — cintas de correr, bicicletas estáticas,
          mancuernas, esterillas y suplementos deportivos — con criterios objetivos: eficacia
          demostrada, relación calidad-precio, durabilidad y experiencia de uso real. No
          recomendamos productos que no cumplan un estándar mínimo de calidad.
        </p>

        <h2 className="text-xl font-extrabold text-gray-900">Aviso de salud</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <p className="font-semibold text-blue-900 mb-2">⚕️ Importante</p>
          <p className="text-blue-800 text-sm">
            El contenido de FitnessFácil.es es solo informativo y no sustituye al consejo médico
            profesional. Consulta con tu médico antes de iniciar un programa de ejercicio,
            especialmente si tienes alguna condición de salud. Consulta con un médico o dietista
            antes de tomar suplementos deportivos.
          </p>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900">Cómo nos financiamos — transparencia total</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="font-semibold text-amber-900 mb-2">Programa de afiliados que usamos:</p>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>
              <strong>Amazon Associates (cclaserdepi01-21):</strong> Somos afiliados del programa
              de Amazon España. Cuando compras a través de nuestros enlaces a Amazon, recibimos
              una comisión (generalmente 3-8%) sin coste adicional para ti.
            </li>
            <li>
              <strong>Google AdSense (pub-6063067965030118):</strong> Mostramos publicidad de
              Google en algunas páginas, solo con tu consentimiento de cookies.
            </li>
          </ul>
        </div>

        <p>
          Estas comisiones nos permiten mantener el sitio y crear contenido gratuito de calidad.
          <strong> En ningún caso las comisiones afectan nuestras recomendaciones</strong>: si un
          producto no es bueno, no lo recomendamos aunque tenga mayor comisión.
        </p>

        <h2 className="text-xl font-extrabold text-gray-900">Nuestro compromiso</h2>
        <ul className="space-y-2">
          <li>✓ Indicamos siempre qué enlaces son de afiliado</li>
          <li>✓ Opiniones honestas e independientes</li>
          <li>✓ No aceptamos pagos por reseñas positivas</li>
          <li>✓ Precios orientativos, pueden variar en Amazon</li>
          <li>✓ Avisos de salud en todo contenido sobre suplementos y ejercicio</li>
        </ul>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
          <p><strong>Datos de la empresa:</strong></p>
          <p>Mkt Web 360 SLU · CIF: B87679304 · Email: info@mktweb360.com</p>
        </div>
      </div>
    </div>
  );
}
