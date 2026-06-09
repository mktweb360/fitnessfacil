import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal — FitnessFácil.es",
  description: "Información legal de FitnessFácil.es — Mkt Web 360 SLU, CIF B87679304.",
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Aviso legal</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Aviso legal</h1>

      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">1. Identificación del titular</h2>
          <ul className="space-y-1">
            <li><strong>Razón social:</strong> Mkt Web 360 SLU</li>
            <li><strong>CIF:</strong> B87679304</li>
            <li><strong>Domicilio social:</strong> España</li>
            <li><strong>Email:</strong> info@mktweb360.com</li>
            <li><strong>Sitio web:</strong> https://www.fitnessfacil.es</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">2. Objeto y ámbito</h2>
          <p>El presente Aviso Legal regula el acceso y uso del sitio web www.fitnessfacil.es, titularidad de Mkt Web 360 SLU. El acceso al sitio implica la aceptación de este Aviso Legal.</p>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">3. Propiedad intelectual</h2>
          <p>Todos los contenidos del sitio son titularidad de Mkt Web 360 SLU o de terceros que han autorizado su uso. Queda prohibida la reproducción sin autorización expresa.</p>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">4. Aviso de salud</h2>
          <p>El contenido de FitnessFácil.es es de carácter informativo únicamente y no constituye consejo médico. Consulta con un profesional de salud antes de iniciar cualquier programa de ejercicio o tomar suplementos deportivos.</p>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">5. Información sobre afiliados</h2>
          <p>FitnessFácil.es participa en el Programa de Afiliados de Amazon EU (ID: cclaserdepi01-21). Los enlaces de afiliado pueden generar comisión sin coste adicional para el usuario.</p>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">6. Legislación aplicable</h2>
          <p>Este Aviso Legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales competentes.</p>
        </section>
        <p className="text-xs text-gray-400">Última actualización: junio 2025</p>
      </div>
    </div>
  );
}
