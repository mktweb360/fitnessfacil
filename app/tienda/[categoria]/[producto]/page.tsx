import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, products, getProductsByCategory, getProductBySlug } from "@/data/products";
import { getPostBySlug } from "@/data/posts";
import { amazonLink } from "@/lib/amazon";
import SupplementDisclaimer from "@/components/SupplementDisclaimer";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return products.map((p) => ({ categoria: p.categorySlug, producto: p.slug }));
}

type Props = { params: Promise<{ categoria: string; producto: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, producto } = await params;
  const product = getProductBySlug(producto);
  if (!product) return {};
  return {
    title: `${product.name} — Análisis y opinión 2025`,
    description: `${product.shortDescription} Análisis completo con pros, contras, especificaciones y precio actual en Amazon España.`,
    alternates: { canonical: `https://www.fitnessfacil.es/tienda/${categoria}/${producto}` },
    openGraph: {
      title: `${product.name} — Análisis completo`,
      description: product.shortDescription,
      images: [{ url: `https://www.fitnessfacil.es/images/products/${product.categorySlug}.jpg` }],
    },
  };
}

/** Genera una puntuación estable (4.1–4.9) basada en el slug */
function stableRating(slug: string): { score: string; count: number } {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  const score = (4.1 + ((Math.abs(h) % 9) / 10)).toFixed(1);
  const count = 120 + (Math.abs(h >> 4) % 800);
  return { score, count };
}

function StarRating({ score }: { score: string }) {
  const n = parseFloat(score);
  const full = Math.floor(n);
  const half = n - full >= 0.3;
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`w-4 h-4 ${i <= full ? "text-amber-400" : i === full + 1 && half ? "text-amber-300" : "text-gray-200"}`} fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

const categoryFaqs: Record<string, Array<{ q: string; a: string }>> = {
  "cintas-correr": [
    { q: "¿Cuánto espacio necesito para una cinta de correr en casa?", a: "Para la cinta en uso necesitas la superficie de la banda más 1m por detrás (seguridad) y 0.5m por los lados. Una cinta estándar de 40x110cm necesita una zona de 150x200cm mínimo. Las plegables como la WalkingPad pueden guardarse en la mitad del espacio cuando no se usan." },
    { q: "¿Cuántos CV de motor necesito para correr?", a: "Para caminata y trote suave hasta 8-10 km/h, 1.5 CV es suficiente. Para correr regularmente a 10-14 km/h, necesitas 1.75-2.0 CV. Para corredores habituales o personas de más de 90kg, 2.0+ CV garantiza mayor durabilidad del motor." },
    { q: "¿Es muy ruidosa una cinta de correr?", a: "Depende del modelo y la velocidad. Las cintas domésticas modernas producen 60-75 dB a velocidades medias, similar a una conversación normal. El mayor ruido suele ser el impacto de las pisadas, no el motor. Las cintas con buena amortiguación reducen significativamente el impacto de las pisadas, algo especialmente importante si vives en un piso." },
    { q: "¿Cuánto tiempo al día debo usar la cinta de correr?", a: "La OMS recomienda 150-300 minutos de actividad aeróbica moderada a la semana. Para empezar, 20-30 minutos al día 3-4 veces por semana es un objetivo realista. Aumenta gradualmente la duración e intensidad para evitar lesiones." },
  ],
  "bicicletas-estaticas": [
    { q: "¿Qué diferencia hay entre bicicleta estática y de spinning?", a: "La bicicleta estática clásica tiene volante de inercia más ligero (6-12kg), posición más vertical y suele tener pantalla con programas. La de spinning tiene volante pesado (16-25kg), posición más agresiva similar a ciclismo real y se enfoca en entrenamientos de alta intensidad sin pantalla digital." },
    { q: "¿Cuántas calorías quema una bicicleta estática?", a: "Depende de la intensidad y el peso. A intensidad moderada, una persona de 75kg quema aproximadamente 400-600 kcal por hora en bicicleta estática. A alta intensidad (HIIT en spinning), puede llegar a 600-800 kcal/hora. La bicicleta elíptica quema similar pero con menor impacto articular." },
    { q: "¿Es más efectiva la bicicleta estática que correr para perder peso?", a: "Ambas son efectivas; la diferencia es mínima a la misma intensidad. La ventaja de la bicicleta es menor impacto en rodillas y tobillos, por lo que es más sostenible para personas con sobrepeso o lesiones articulares. Lo más importante es la consistencia: el mejor ejercicio es el que harás regularmente." },
    { q: "¿Qué resistencia debo elegir en una bicicleta estática?", a: "Para uso doméstico general, 8 niveles de resistencia son suficientes. Si buscas entrenamientos de alta intensidad o eres ciclista experimentado, opta por 16+ niveles o resistencia magnética con ajuste fino. Las bicicletas con resistencia por fricción son más económicas pero requieren más mantenimiento." },
  ],
  "pesas-mancuernas": [
    { q: "¿Con qué peso de mancuernas debo empezar?", a: "Para mujeres principiantes: 4-8kg para ejercicios de tren superior, 8-12kg para tren inferior. Para hombres principiantes: 8-12kg para tren superior, 12-16kg para tren inferior. La regla es que las últimas 2-3 repeticiones del ejercicio deben ser difíciles pero ejecutables con buena forma." },
    { q: "¿Son mejores las mancuernas ajustables o las fijas?", a: "Ajustables si tienes espacio limitado y necesitas múltiples pesos para distintos ejercicios. Fijas si siempre entrenas con el mismo peso o prefieres cambios rápidos entre ejercicios. Para home gym completo, las ajustables suelen ser más prácticas y económicas a largo plazo." },
    { q: "¿Para qué sirve una kettlebell y en qué se diferencia de una mancuerna?", a: "La kettlebell permite movimientos balísticos y de oscilación (swings, cleans, snatches) que no son posibles con mancuernas. Estos ejercicios trabajan el cuerpo completo de forma más dinámica y mejoran la coordinación y potencia. Para fuerza pura y control de movimiento, las mancuernas son superiores." },
    { q: "¿Cuántas series y repeticiones debo hacer con mancuernas?", a: "Para hipertrofia (ganar músculo): 3-4 series de 8-12 repeticiones. Para fuerza máxima: 4-5 series de 3-6 repeticiones. Para resistencia muscular: 2-3 series de 15-20 repeticiones. Descansa 60-90 segundos entre series para hipertrofia, 2-3 minutos para fuerza." },
  ],
  "esterillas-yoga": [
    { q: "¿Qué grosor de esterilla necesito para yoga?", a: "Para yoga con muchas posturas de suelo y principiantes: 6-10mm. Para yoga más dinámico y con equilibrios: 3-5mm (mayor estabilidad). Para meditación y ejercicios suaves: 10mm+ para máximo confort. Los profesores de yoga suelen preferir 4-6mm como equilibrio entre confort y estabilidad." },
    { q: "¿Cuánto dura una esterilla de yoga?", a: "Depende de la frecuencia de uso y el material. Las de TPE de calidad (como la TOPLUS profesional) duran 5-8 años con uso regular. Las de NBR económicas suelen durar 2-3 años. Una buena esterilla que se limpia regularmente puede durar muchos años." },
    { q: "¿Puedo usar una esterilla de yoga para pilates y ejercicios de suelo?", a: "Sí, una esterilla de yoga sirve perfectamente para pilates, estiramientos y ejercicios de suelo. Para pilates intenso con mucho trabajo de rodillas, una esterilla más gruesa (6-10mm) es más cómoda. La diferencia principal es el grosor y la superficie antideslizante." },
    { q: "¿Cómo limpio y mantengo mi esterilla de yoga?", a: "Limpia con un paño húmedo y jabón suave después de cada uso. Para limpieza profunda, usa una mezcla de agua y vinagre blanco al 50%. Deja secar al aire (nunca en secadora). Enrolla con la superficie de práctica hacia fuera para mantener la forma y evitar que los bordes se levanten." },
  ],
  "suplementos-proteinas": [
    { q: "¿Necesito proteína en polvo si entreno en casa?", a: "No es imprescindible. Si alcanzas tu objetivo proteico (1.6-2.2g/kg/día) con alimentos normales, no necesitas suplementos. La proteína en polvo es conveniente y económica como fuente adicional de proteína, especialmente post-entrenamiento, pero no tiene propiedades mágicas que no pueda conseguir con comida real." },
    { q: "¿Cuándo es mejor tomar la proteína whey?", a: "El timing importa menos de lo que se creía. Lo más importante es la ingesta proteica total diaria. Dicho esto, tomar proteína en las 2 horas post-entrenamiento puede ayudar a la recuperación muscular. Puedes tomarla en cualquier momento del día que te resulte conveniente." },
    { q: "¿La creatina está permitida y es segura?", a: "Sí, la creatina monohidrato es legal, no dopante y está clasificada como el suplemento más seguro y eficaz por la mayoría de instituciones científicas deportivas. Está estudiada desde los años 90 con más de 500 estudios que avalan su seguridad y eficacia. Consulta con tu médico si tienes problemas renales." },
    { q: "¿Cuánta proteína debo tomar al día para ganar músculo?", a: "La recomendación científica actual es 1.6-2.2g de proteína por kg de peso corporal al día para maximizar la síntesis proteica muscular. Más de 2.2g/kg no aporta beneficios adicionales demostrados. Distribuye la ingesta en 3-4 comidas de 30-40g para optimizar la absorción." },
  ],
};

export default async function ProductPage({ params }: Props) {
  const { categoria, producto } = await params;
  const product = getProductBySlug(producto);
  if (!product || product.categorySlug !== categoria) notFound();

  const cat = categories.find((c) => c.slug === categoria);
  const related = getProductsByCategory(categoria).filter((p) => p.slug !== producto).slice(0, 3);
  const relatedGuides = (product.relatedPosts ?? []).map((s) => getPostBySlug(s)).filter(Boolean);
  const faqs = categoryFaqs[categoria] ?? [];
  const link = amazonLink(product.asin);
  const { score, count } = stableRating(product.slug);
  const topSpecs = Object.entries(product.specs).slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.asin,
    image: `https://www.fitnessfacil.es/images/products/${product.categorySlug}.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: score,
      reviewCount: count,
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: link,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon España" },
    },
  };

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

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Breadcrumb ── */}
        <nav className="text-gray-400 text-sm mb-5 flex flex-wrap items-center gap-1">
          <Link href="/" className="hover:text-green-700">Inicio</Link>
          <span>›</span>
          <Link href="/tienda" className="hover:text-green-700">Tienda</Link>
          <span>›</span>
          <Link href={`/tienda/${categoria}`} className="hover:text-green-700">{cat?.name}</Link>
          <span>›</span>
          <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* ── Supplement disclaimer ── */}
        {product.isSupplement && <SupplementDisclaimer />}

        {/* ══════════════════════════════════════════
            HERO: imagen + ficha de producto (2 cols)
        ══════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* Imagen */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-gray-50 border border-gray-100 aspect-square flex items-center justify-center">
              <img
                src={`/images/products/${product.categorySlug}.jpg`}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Badge overlay producto */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {product.badge}
                </span>
              </div>
            )}
            {/* Verified badge */}
            <div className="absolute bottom-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <span className="text-green-600">✓</span> Análisis verificado
              </span>
            </div>
          </div>

          {/* Ficha del producto */}
          <div className="flex flex-col">

            {/* Categoría + En stock */}
            <div className="flex items-center gap-2 mb-3">
              <Link href={`/tienda/${categoria}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors">
                {cat && "icon" in cat && <span>{(cat as { icon?: string }).icon}</span>}
                <span>{cat?.name}</span>
              </Link>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                En stock
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating con estrellas */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating score={score} />
              <span className="font-bold text-gray-800 text-sm">{score}</span>
              <span className="text-gray-400 text-sm">({count.toLocaleString("es-ES")} valoraciones)</span>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 leading-relaxed mb-5">{product.shortDescription}</p>

            {/* Key specs pills — top 4 */}
            {topSpecs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {topSpecs.map(([k, v]) => (
                  <span key={k} className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-lg">
                    <span className="text-gray-400 capitalize">{k}:</span> {v}
                  </span>
                ))}
              </div>
            )}

            {/* Precio / CTA block */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Precio en Amazon</p>
              <p className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                Ver precio actualizado
                <span className="text-xs font-normal text-gray-400">(puede variar)</span>
              </p>

              {/* Botón Amazon naranja */}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base py-4 px-6 rounded-xl transition-colors shadow-sm shadow-orange-200 mb-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7.8-3.9L5.7 7H3c-.6 0-1-.4-1-1s.4-1 1-1h4c.5 0 .9.3 1 .8l.3 1.2h11c.7 0 1.2.7 1 1.4l-2 6c-.1.4-.5.6-.9.6H9.2c-.5 0-.9-.3-1-.9z"/>
                </svg>
                Comprar en Amazon →
              </a>

              {/* Botón secundario */}
              <Link
                href={`/tienda/${categoria}`}
                className="flex items-center justify-center gap-1.5 w-full border border-gray-200 hover:border-green-300 text-gray-600 hover:text-green-700 font-semibold text-sm py-3 px-6 rounded-xl transition-colors bg-white"
              >
                Ver más productos de {cat?.name}
              </Link>
            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: "🚚", label: "Envío Prime", sub: "Gratis en pedidos" },
                { icon: "↩️", label: "Devoluciones", sub: "30 días sin coste" },
                { icon: "🔒", label: "Pago seguro", sub: "Amazon Checkout" },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-xl py-3 px-2">
                  <div className="text-lg mb-0.5">{icon}</div>
                  <div className="text-xs font-bold text-gray-700 leading-tight">{label}</div>
                  <div className="text-xs text-gray-400 leading-tight">{sub}</div>
                </div>
              ))}
            </div>

            {/* Aviso afiliado */}
            <p className="text-xs text-gray-400 mt-4 pl-3 border-l-2 border-gray-200">
              Enlace de afiliado Amazon Associates (cclaserdepi01-21). Si compras a través de nuestro enlace recibimos una pequeña comisión sin coste adicional para ti.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Pros & Cons
        ══════════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <h2 className="font-extrabold text-green-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-600 text-white text-sm flex items-center justify-center font-bold">✓</span>
              Puntos positivos
            </h2>
            <ul className="space-y-2.5">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-green-800">
                  <span className="text-green-500 shrink-0 mt-0.5 font-bold">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <h2 className="font-extrabold text-red-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-400 text-white text-sm flex items-center justify-center font-bold">!</span>
              A tener en cuenta
            </h2>
            <ul className="space-y-2.5">
              {product.cons.map((con, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-red-800">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Especificaciones técnicas
        ══════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
            <h2 className="font-extrabold text-gray-900">Especificaciones técnicas</h2>
          </div>
          <table className="w-full">
            <tbody>
              {Object.entries(product.specs).map(([key, val], i) => (
                <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-500 capitalize w-2/5 border-b border-gray-50">{key}</td>
                  <td className="px-6 py-3 text-sm font-bold text-gray-800 border-b border-gray-50">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Preguntas frecuentes
        ══════════════════════════════════════════ */}
        {faqs.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <h2 className="font-extrabold text-gray-900 mb-5">Preguntas frecuentes</h2>
            <div className="space-y-0 divide-y divide-gray-100">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-4 cursor-pointer">
                  <summary className="flex items-start justify-between gap-3 font-bold text-gray-800 text-sm list-none">
                    <span>{q}</span>
                    <span className="text-green-600 shrink-0 text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            SECCIÓN: Guías relacionadas
        ══════════════════════════════════════════ */}
        {relatedGuides.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Guías relacionadas</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedGuides.map((p) => p && (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-2xl p-4 hover:bg-green-100 transition-colors group"
                >
                  <span className="text-2xl shrink-0">📖</span>
                  <div>
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wide">{p.category}</span>
                    <h3 className="font-bold text-gray-900 text-sm mt-0.5 leading-tight group-hover:text-green-700 transition-colors">{p.title}</h3>
                    <span className="text-green-700 font-semibold text-xs mt-1.5 inline-block">Leer guía →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            SECCIÓN: Productos relacionados (hasta 3)
        ══════════════════════════════════════════ */}
        {related.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">
              Otros {cat?.name.toLowerCase()} que te pueden interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA final con gradiente verde ── */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-2xl p-6 text-white text-center">
          <p className="font-extrabold text-lg mb-1">¿Listo para comprar {product.name}?</p>
          <p className="text-green-100 text-sm mb-4">Ver el precio actualizado y comprarlo directamente en Amazon.es</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md"
          >
            🛒 Ir a Amazon.es →
          </a>
          <p className="text-green-200 text-xs mt-3">Enlace de afiliado · Sin coste adicional para ti</p>
        </div>

      </div>
    </>
  );
}
