import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, products, getProductsByCategory, getProductBySlug } from "@/data/products";
import { amazonLink } from "@/lib/amazon";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import SupplementDisclaimer from "@/components/SupplementDisclaimer";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return products.map((p) => ({ categoria: p.categorySlug, producto: p.slug }));
}

type Props = { params: Promise<{ categoria: string; producto: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { producto } = await params;
  const product = getProductBySlug(producto);
  if (!product) return {};
  return {
    title: `${product.name} — Análisis y opinión 2025`,
    description: `${product.shortDescription} Análisis completo con pros, contras, especificaciones y precio actual en Amazon España.`,
  };
}

const categoryFaqs: Record<string, Array<{ q: string; a: string }>> = {
  "cintas-correr": [
    { q: "¿Cuánto espacio necesito para una cinta de correr en casa?", a: "Para la cinta en uso necesitas la superficie de la banda más 1m por detrás (seguridad) y 0.5m por los lados. Una cinta estándar de 40x110cm necesita una zona de 150x200cm mínimo. Las plegables como la Toorx pueden guardarse en la mitad del espacio cuando no se usan." },
    { q: "¿Cuántos CV de motor necesito para correr?", a: "Para caminata y trote suave hasta 8-10 km/h, 1.5 CV es suficiente. Para correr regularmente a 10-14 km/h, necesitas 1.75-2.0 CV. Para corredores habituales o personas de más de 90kg, 2.0+ CV garantiza mayor durabilidad del motor." },
    { q: "¿Es muy ruidosa una cinta de correr?", a: "Depende del modelo y la velocidad. Las cintas domésticas modernas producen 60-75 dB a velocidades medias, similar a una conversación normal. El mayor ruido suele ser el impacto de las pisadas, no el motor. Las bandas con buena amortiguación (como la Reebok GT40S) reducen significativamente el impacto." },
  ],
  "bicicletas-estaticas": [
    { q: "¿Qué diferencia hay entre bicicleta estática y de spinning?", a: "La bicicleta estática clásica tiene volante de inercia más ligero (6-12kg), posición más vertical y suele tener pantalla con programas. La de spinning tiene volante pesado (16-25kg), posición más agresiva similar a ciclismo real y se enfoca en entrenamientos de alta intensidad sin pantalla digital." },
    { q: "¿Cuántas calorías quema una bicicleta estática?", a: "Depende de la intensidad y el peso. A intensidad moderada, una persona de 75kg quema aproximadamente 400-600 kcal por hora en bicicleta estática. A alta intensidad (HIIT en spinning), puede llegar a 600-800 kcal/hora. La bicicleta elíptica quema similar pero con menor impacto articular." },
    { q: "¿Es más efectiva la bicicleta estática que correr para perder peso?", a: "Ambas son efectivas; la diferencia es mínima a la misma intensidad. La ventaja de la bicicleta es menor impacto en rodillas y tobillos, por lo que es más sostenible para personas con sobrepeso o lesiones articulares. Lo más importante es la consistencia: el mejor ejercicio es el que harás regularmente." },
  ],
  "pesas-mancuernas": [
    { q: "¿Con qué peso de mancuernas debo empezar?", a: "Para mujeres principiantes: 4-8kg para ejercicios de tren superior, 8-12kg para tren inferior. Para hombres principiantes: 8-12kg para tren superior, 12-16kg para tren inferior. La regla es que las últimas 2-3 repeticiones del ejercicio deben ser difíciles pero ejecutables con buena forma." },
    { q: "¿Son mejores las mancuernas ajustables o las fijas?", a: "Ajustables si tienes espacio limitado y necesitas múltiples pesos para distintos ejercicios. Fijas si siempre entrenas con el mismo peso o prefieres cambios rápidos entre ejercicios. Para home gym completo, las ajustables suelen ser más prácticas y económicas a largo plazo." },
    { q: "¿Para qué sirve una kettlebell y en qué se diferencia de una mancuerna?", a: "La kettlebell permite movimientos balísticos y de oscilación (swings, cleans, snatches) que no son posibles con mancuernas. Estos ejercicios trabajan el cuerpo completo de forma más dinámica y mejoran la coordinación y potencia. Para fuerza pura y control de movimiento, las mancuernas son superiores." },
  ],
  "esterillas-yoga": [
    { q: "¿Qué grosor de esterilla necesito para yoga?", a: "Para yoga con muchas posturas de suelo y principiantes: 6-10mm. Para yoga más dinámico y con equilibrios: 3-5mm (mayor estabilidad). Para meditación y ejercicios suaves: 10mm+ para máximo confort. Los profesores de yoga suelen preferir 4-6mm como equilibrio entre confort y estabilidad." },
    { q: "¿Cuánto dura una esterilla de yoga?", a: "Depende de la frecuencia de uso y el material. Las de PVC de calidad (como Manduka) duran 10+ años con uso diario. Las de NBR y TPE económicas suelen durar 2-4 años. Una buena esterilla que se limpia regularmente puede durar muchos años." },
    { q: "¿Puedo usar una esterilla de yoga para pilates y ejercicios de suelo?", a: "Sí, una esterilla de yoga sirve perfectamente para pilates, estiramientos y ejercicios de suelo. Para pilates intenso con mucho trabajo de rodillas, una esterilla más gruesa (6-10mm) es más cómoda. La diferencia principal es el grosor y la superficie antideslizante." },
  ],
  "suplementos-proteinas": [
    { q: "¿Necesito proteína en polvo si entreno en casa?", a: "No es imprescindible. Si alcanzas tu objetivo proteico (1.6-2.2g/kg/día) con alimentos normales, no necesitas suplementos. La proteína en polvo es conveniente y económica como fuente adicional de proteína, especialmente post-entrenamiento, pero no tiene propiedades mágicas que no pueda conseguir con comida real." },
    { q: "¿Cuándo es mejor tomar la proteína whey?", a: "El timing importa menos de lo que se creía. Lo más importante es la ingesta proteica total diaria. Dicho esto, tomar proteína en las 2 horas post-entrenamiento puede ayudar a la recuperación muscular. Puedes tomarla en cualquier momento del día que te resulte conveniente." },
    { q: "¿La creatina está permitida y es segura?", a: "Sí, la creatina monohidrato es legal, no dopante y está clasificada como el suplemento más seguro y eficaz por la mayoría de instituciones científicas deportivas. Está estudiada desde los años 90 con más de 500 estudios que avalan su seguridad y eficacia. Consulta con tu médico si tienes problemas renales." },
  ],
};

export default async function ProductPage({ params }: Props) {
  const { categoria, producto } = await params;
  const product = getProductBySlug(producto);
  if (!product || product.categorySlug !== categoria) notFound();

  const cat = categories.find((c) => c.slug === categoria);
  const related = getProductsByCategory(categoria).filter((p) => p.slug !== producto).slice(0, 3);
  const faqs = categoryFaqs[categoria] ?? [];
  const link = amazonLink(product.asin);

  // Product schema sin `offers` (precio) ni `aggregateRating`: el precio y las
  // opiniones solo pueden mostrarse vía la API oficial de Amazon (Creators API).
  // Emitir precio estático o ratings de Amazon incumple el Operating Agreement
  // de Amazon y la política de datos estructurados de Google.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.asin,
  };

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.fitnessfacil.es" },
      { "@type": "ListItem", position: 2, name: "Tienda", item: "https://www.fitnessfacil.es/tienda" },
      { "@type": "ListItem", position: 3, name: cat?.name, item: `https://www.fitnessfacil.es/tienda/${categoria}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `https://www.fitnessfacil.es/tienda/${categoria}/${producto}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-gray-400 text-sm mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-green-700">Inicio</Link>
          <span>›</span>
          <Link href="/tienda" className="hover:text-green-700">Tienda</Link>
          <span>›</span>
          <Link href={`/tienda/${categoria}`} className="hover:text-green-700">{cat?.name}</Link>
          <span>›</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            {product.badge && (
              <span className="text-xs font-bold text-white bg-orange-500 px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {product.categoryName}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            {product.name} — Análisis y opinión 2025
          </h1>

          <p className="text-gray-700 text-lg mt-2 mb-6">{product.shortDescription}</p>

          {product.isSupplement && <SupplementDisclaimer />}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-700">Disponible en Amazon España</p>
              <p className="text-xs text-gray-400 mt-0.5">Consulta el precio actualizado y las opiniones en la ficha de Amazon</p>
            </div>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="sm:ml-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors shadow-md"
            >
              Ver precio en Amazon →
            </a>
          </div>

          <AffiliateDisclosure />
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Análisis completo</h2>
          <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="font-bold text-green-800 mb-3">✓ Ventajas</h3>
            <ul className="space-y-2">
              {product.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-green-700">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>{pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="font-bold text-red-800 mb-3">✗ Inconvenientes</h3>
            <ul className="space-y-2">
              {product.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-red-700">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span>{con}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Especificaciones técnicas</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-3 font-semibold text-gray-700 w-1/3 border-r border-gray-100">{key}</td>
                    <td className="px-4 py-3 text-gray-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-10">
          <p className="font-bold text-gray-900 mb-1">¿Listo para comprarlo?</p>
          <p className="text-sm text-gray-600 mb-4">Ver precio actual y opiniones verificadas en Amazon España</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-xl text-lg transition-colors shadow-md"
          >
            Ver precio en Amazon →
          </a>
          <p className="text-xs text-gray-400 mt-3">Enlace de afiliado — si compras ganamos una comisión sin coste para ti</p>
        </div>

        {faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">
              Otros {cat?.name.toLowerCase()} que te pueden interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
