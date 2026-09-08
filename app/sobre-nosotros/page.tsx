import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros — FitnessFácil.es",
  description:
    "Carlos Moreno, entrenador personal certificado por la NSCA, lidera FitnessFácil.es: análisis honestos de equipamiento fitness y guías de entrenamiento en casa.",
  alternates: { canonical: "/sobre-nosotros" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Carlos Moreno",
  jobTitle: "Entrenador Personal NSCA",
  description:
    "Entrenador personal certificado por la NSCA con 10 años de experiencia en entrenamiento en casa y equipamiento fitness.",
  url: "https://www.fitnessfacil.es/sobre-nosotros",
  worksFor: {
    "@type": "Organization",
    name: "FitnessFácil.es",
    url: "https://www.fitnessfacil.es",
  },
  knowsAbout: [
    "entrenamiento en casa",
    "cintas de correr",
    "bicicletas estáticas",
    "pesas y mancuernas",
    "suplementación deportiva",
    "pérdida de peso",
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FitnessFácil.es",
  legalName: "Mkt Web 360 SLU",
  url: "https://www.fitnessfacil.es",
  logo: { "@type": "ImageObject", url: "https://www.fitnessfacil.es/logo.png" },
  taxID: "B87679304",
  email: "info@mktweb360.com",
  description:
    "Portal especializado en equipamiento fitness y entrenamiento en casa. Comparativas y análisis de cintas de correr, bicicletas estáticas, pesas y suplementos.",
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "España" },
  knowsAbout: [
    "entrenamiento en casa",
    "equipamiento fitness",
    "cintas de correr",
    "bicicletas estáticas",
    "suplementos deportivos",
  ],
  sameAs: [
    "https://www.instagram.com/fitnessfacil.es",
    "https://www.facebook.com/fitnessfacil.es",
  ],
  employee: {
    "@type": "Person",
    name: "Carlos Moreno",
    jobTitle: "Entrenador Personal NSCA",
    url: "https://www.fitnessfacil.es/sobre-nosotros",
  },
};

export default function SobreNosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-gray-400 text-sm mb-6">
          <Link href="/" className="hover:text-green-700">
            Inicio
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Sobre nosotros</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Sobre FitnessFácil.es
        </h1>

        {/* Author profile card */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10 flex gap-5 items-start">
          {/* Initials avatar */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-extrabold select-none">
            CM
          </div>
          <div>
            <p className="text-lg font-extrabold text-gray-900 leading-tight">Carlos Moreno</p>
            <p className="text-sm font-semibold text-green-700 mb-2">
              Entrenador Personal NSCA · Director editorial de FitnessFácil.es
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Carlos es entrenador personal certificado por la <strong>NSCA (National Strength and Conditioning Association)</strong> con más de 10 años de experiencia ayudando a adultos a entrenar en casa de forma efectiva y segura. Especializado en diseño de rutinas sin equipamiento, selección de equipamiento fitness doméstico y nutrición deportiva aplicada a la pérdida de peso.
            </p>
            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2">
              {[
                "Entrenamiento en casa",
                "Cintas de correr",
                "Bicicletas estáticas",
                "Suplementación deportiva",
                "Pérdida de peso",
                "Fuerza y acondicionamiento",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <p className="text-lg">
            FitnessFácil.es es un proyecto de <strong>Mkt Web 360 SLU</strong>{" "}
            (CIF B87679304) dedicado a ayudar a adultos españoles a encontrar el
            mejor equipamiento fitness para entrenar en casa, perder peso y mejorar
            su salud sin necesidad de ir al gimnasio.
          </p>

          {/* Methodology */}
          <h2 className="text-xl font-extrabold text-gray-900">Nuestra metodología</h2>
          <p>
            Cada análisis parte de los criterios técnicos que aplica Carlos en su
            práctica como entrenador: eficacia demostrada, relación calidad-precio,
            durabilidad y experiencia de uso real. Combinamos su experiencia de campo
            con datos de fabricante verificados, reseñas de usuarios contrastadas y,
            cuando es posible, pruebas directas del equipamiento.
          </p>
          <ul className="space-y-2">
            <li>✓ Criterios técnicos basados en certificación NSCA</li>
            <li>✓ Comparativas con datos de fabricante verificados</li>
            <li>✓ Reseñas de usuarios contrastadas antes de publicar</li>
            <li>✓ Actualización de precios y disponibilidad periódica</li>
            <li>✓ Sin recomendaciones de productos que no superen el estándar mínimo</li>
          </ul>

          <h2 className="text-xl font-extrabold text-gray-900">¿Qué analizamos?</h2>
          <p>
            Analizamos y comparamos equipamiento fitness — cintas de correr,
            bicicletas estáticas, mancuernas, esterillas y suplementos deportivos —
            con criterios objetivos. No recomendamos productos que no cumplan un
            estándar mínimo de calidad.
          </p>

          <h2 className="text-xl font-extrabold text-gray-900">Aviso de salud</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="font-semibold text-blue-900 mb-2">⚕️ Importante</p>
            <p className="text-blue-800 text-sm">
              El contenido de FitnessFácil.es es solo informativo y no sustituye al
              consejo médico profesional. Consulta con tu médico antes de iniciar un
              programa de ejercicio, especialmente si tienes alguna condición de
              salud. Consulta con un médico o dietista antes de tomar suplementos
              deportivos.
            </p>
          </div>

          <h2 className="text-xl font-extrabold text-gray-900">
            Cómo nos financiamos — transparencia total
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="font-semibold text-amber-900 mb-2">
              Programa de afiliados que usamos:
            </p>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>
                <strong>Amazon Associates (cclaserdepi01-21):</strong> Somos
                afiliados del programa de Amazon España. Cuando compras a través de
                nuestros enlaces a Amazon, recibimos una comisión (generalmente
                3-8%) sin coste adicional para ti.
              </li>
              <li>
                <strong>Google AdSense (pub-6063067965030118):</strong> Mostramos
                publicidad de Google en algunas páginas, solo con tu consentimiento
                de cookies.
              </li>
            </ul>
          </div>

          <p>
            Estas comisiones nos permiten mantener el sitio y crear contenido
            gratuito de calidad.{" "}
            <strong>
              En ningún caso las comisiones afectan nuestras recomendaciones
            </strong>
            : si un producto no es bueno, no lo recomendamos aunque tenga mayor
            comisión.
          </p>

          <h2 className="text-xl font-extrabold text-gray-900">
            Nuestro compromiso
          </h2>
          <ul className="space-y-2">
            <li>✓ Indicamos siempre qué enlaces son de afiliado</li>
            <li>✓ Opiniones honestas e independientes</li>
            <li>✓ No aceptamos pagos por reseñas positivas</li>
            <li>✓ Precios orientativos, pueden variar en Amazon</li>
            <li>
              ✓ Avisos de salud en todo contenido sobre suplementos y ejercicio
            </li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
            <p>
              <strong>Datos de la empresa:</strong>
            </p>
            <p>
              Mkt Web 360 SLU · CIF: B87679304 · Email: info@mktweb360.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
