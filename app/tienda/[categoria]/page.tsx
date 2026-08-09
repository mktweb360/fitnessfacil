import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProductsByCategory, products } from "@/data/products";
import { posts } from "@/data/posts";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return categories.map((cat) => ({ categoria: cat.slug }));
}

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  if (!cat) return {};
  return {
    title: `${cat.name} — Guía de compra y comparativa 2025`,
    description: `${cat.description}. Análisis completo con los mejores modelos, comparativa de precios y guía de compra para elegir el equipamiento perfecto.`,
    alternates: { canonical: `/tienda/${categoria}` },
  };
}

const buyingGuides: Record<string, { intro: string; middle: string; conclusion: string }> = {
  "cintas-correr": {
    intro:
      "Una cinta de correr en casa elimina la excusa del tiempo o el mal tiempo para salir a correr. El mercado español ofrece opciones desde 300€ hasta más de 1.000€, con diferencias significativas en motor, superficie y características. La elección correcta depende de tu peso, velocidad habitual de carrera y el espacio disponible.",
    middle:
      "Para uso doméstico moderado (30-45 min, 3-4 veces/semana, velocidad hasta 10-12 km/h), una cinta con motor de 1.5-2.0 CV y superficie de 40x110 cm es más que suficiente. Si corres regularmente a más de 12 km/h o pesas más de 90 kg, invierte en motor de 2.0+ CV y superficie de 50x140 cm mínimo. Las cintas plegables como la WalkingPad son perfectas para pisos pequeños: se guardan debajo de la cama y pesan menos de 30 kg.",
    conclusion:
      "Para caminatas, trabajo de pie y cardio suave, la WalkingPad R2 es imbatible en compacidad y silencio (0.5-12 km/h). Si necesitas más potencia para trote real, la WalkingPad R1 Pro (918W) es el paso natural. Ambas son la opción ideal para pisos pequeños donde el espacio es el factor limitante.",
  },
  "bicicletas-estaticas": {
    intro:
      "Las bicicletas estáticas son el equipamiento cardio más vendido en España para uso doméstico. Silenciosas, sin impacto y efectivas para quemar calorías, son ideales para pisos donde una cinta sería molesta para los vecinos. La elección entre bicicleta estática clásica, con app o mini-escritorio depende de tus objetivos y del espacio disponible.",
    middle:
      "Para quemar calorías con cardio suave: la Sportstech X100-C (plegable, con LCD y cuerdas de fuerza integradas) o la MERACH (silenciosa con app y soporte hasta 136 kg). Para entrenamientos progresivos con 8 niveles de resistencia: la Sportstech X150. Si trabajas desde casa y quieres moverte mientras estás sentado sin interrumpir el trabajo, la Sportstech DFX70 mini-escritorio es una categoría aparte. El volante de inercia es el factor clave: más kg = movimiento más suave y natural.",
    conclusion:
      "Para iniciarse siendo plegable y con el mayor número de extras por precio, la Sportstech X100-C es la opción más completa. Los que buscan silencio máximo y seguimiento por app apreciarán la MERACH. Para teletrabajar activo sin dejar la silla, la DFX70 no tiene competidor en su categoría.",
  },
  "pesas-mancuernas": {
    intro:
      "El entrenamiento de fuerza en casa requiere menos equipamiento del que parece. Con un set de mancuernas y suficiente espacio para moverte, puedes trabajar todos los grupos musculares. La decisión clave es entre mancuernas ajustables (más prácticas, mayor inversión inicial) y sets fijos (más baratos, ocupan más espacio).",
    middle:
      "Las mancuernas ajustables como las LULLAX NEO36 (hasta 36 kg con base incluida) son perfectas si tienes poco espacio: múltiples pesos en el espacio de una. La inversión inicial es mayor pero se amortiza si entrenas con regularidad. Para cargas fijas sin mecanismos: las ManiBoom hexagonales antideslizantes de 15 kg son sólidas y seguras. Las kettlebells añaden versatilidad para ejercicios funcionales (swing, turkish get-up) que las mancuernas no cubren bien, y las bandas elásticas Fokky TPE complementan el trabajo de resistencia con mínimo espacio.",
    conclusion:
      "Si tienes espacio limitado y buscas la mayor progresión posible, las LULLAX NEO36 son la mejor inversión a largo plazo. Para empezar sin gran desembolso, las ManiBoom 15 kg cubren la mayoría de ejercicios de tren superior. Completa el set con la kettlebell JOWY de 16 kg y las bandas Fokky para un home gym funcional y completo.",
  },
  "esterillas-yoga": {
    intro:
      "La esterilla es la pieza más básica y esencial del equipamiento fitness casero. Ya sea para yoga, pilates, estiramientos o simplemente proteger el suelo durante ejercicios de suelo, elegir la correcta marca la diferencia en comodidad y seguridad. El grosor, material y adherencia son los factores clave.",
    middle:
      "Para yoga dinámico (vinyasa, ashtanga) o práctica regular: una esterilla de 6 mm con alta adherencia en ambas caras como la TOPLUS TPE profesional ofrece el equilibrio perfecto entre estabilidad y amortiguación. Para iniciarse o para uso mixto (yoga, pilates, estiramientos en casa): la LA MENTE ES MARAVILLOSA TPE incluye bolsa de transporte y e-book de ejercicios guiados, todo en un kit completo. Las esterillas de TPE son más ecológicas que las de PVC, sin sustancias tóxicas y aptas para alérgicos al látex.",
    conclusion:
      "Para práctica seria de yoga con frecuencia semanal alta, la TOPLUS 6 mm nivel profesional ofrece la adherencia y durabilidad que exige una práctica constante. Para iniciarse o para tener todo lo necesario desde el primer día, la LA MENTE ES MARAVILLOSA es el kit más completo a precio competitivo.",
  },
  "suplementos-proteinas": {
    intro:
      "Los suplementos deportivos pueden ayudarte a alcanzar tus objetivos de fitness, pero no son imprescindibles para la mayoría de personas. La proteína whey es el suplemento con mayor evidencia científica para recuperación muscular, y la creatina es el más estudiado para mejorar la fuerza. Antes de cualquier suplemento, consulta con tu médico.",
    middle:
      "La proteína whey es útil si no alcanzas tu objetivo proteico solo con la dieta (1.6-2.2g por kg de peso corporal). Los concentrados de whey como Optimum Nutrition ofrecen sabor superior y mayor palatabilidad; los de Myprotein ofrecen la mejor relación gramos de proteína por euro. La creatina monohidrato es el suplemento más seguro y eficaz para mejorar rendimiento en ejercicios de alta intensidad de menos de 30 segundos.",
    conclusion:
      "Para proteína, Optimum Nutrition Gold Standard 2.26 kg es la referencia mundial en sabor y calidad; Myprotein Impact Whey 1 kg es la mejor relación calidad-precio para consumo diario. Para creatina, Myprotein Creatina Monohidrato en polvo 250 g es una de las opciones más puras del mercado. Recuerda: los suplementos solo aportan valor sobre una base sólida de entrenamiento y nutrición.",
  },
};

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  if (!cat) notFound();

  const catProducts = getProductsByCategory(categoria);
  const guide = buyingGuides[categoria];
  const relatedPosts = posts.filter((p) =>
    p.relatedProducts?.some((rp) => catProducts.some((cp) => cp.slug === rp))
  );
  const hasSupplement = catProducts.some((p) => p.isSupplement);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.name,
    numberOfItems: catProducts.length,
    itemListElement: catProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `https://www.fitnessfacil.es/tienda/${p.categorySlug}/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Mobile: category pills with active state */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((catItem) => {
            const isActive = catItem.slug === categoria;
            return (
              <Link
                key={catItem.slug}
                href={`/tienda/${catItem.slug}`}
                className={`flex items-center gap-1.5 whitespace-nowrap text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 hover:bg-green-700 hover:text-white text-gray-700"
                }`}
              >
                <span>{catItem.icon}</span>
                <span>{catItem.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-56 lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-green-700 text-white px-4 py-3 rounded-t-lg">
                <h2 className="font-bold text-sm uppercase tracking-wide">Categorías</h2>
              </div>
              <nav className="bg-white border border-t-0 border-gray-200 rounded-b-lg overflow-hidden">
                {categories.map((catItem) => {
                  const isActive = catItem.slug === categoria;
                  const count = products.filter((p) => p.categorySlug === catItem.slug).length;
                  return (
                    <Link
                      key={catItem.slug}
                      href={`/tienda/${catItem.slug}`}
                      className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 transition-colors group ${
                        isActive ? "bg-green-700" : "hover:bg-green-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{catItem.icon}</span>
                        <span
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-white"
                              : "text-gray-800 group-hover:text-green-700"
                          }`}
                        >
                          {catItem.name}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-green-600 text-white"
                            : "text-gray-400 bg-gray-100 group-hover:bg-green-100 group-hover:text-green-700"
                        }`}
                      >
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Compact header */}
            <div className="mb-5">
              <nav className="text-gray-500 text-sm mb-3">
                <Link href="/" className="hover:text-green-700">
                  Inicio
                </Link>
                <span className="mx-1.5">›</span>
                <Link href="/tienda" className="hover:text-green-700">
                  Tienda
                </Link>
                <span className="mx-1.5">›</span>
                <span className="text-gray-800">{cat.name}</span>
              </nav>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                    {cat.name} — Guía de compra 2025
                  </h1>
                  <p className="text-gray-600 text-sm mt-0.5">{cat.description}</p>
                </div>
              </div>
            </div>

            {hasSupplement && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900 mb-5">
                <p className="font-semibold mb-1">⚕️ Aviso de salud</p>
                <p>
                  Este contenido es solo informativo. Consulta con un médico o dietista antes de
                  tomar suplementos.
                </p>
              </div>
            )}

            {/* Product count bar */}
            <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="text-green-700 font-bold">{catProducts.length}</span> productos
                analizados
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {catProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>

            {guide && (
              <div className="mt-10">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">
                  Guía de compra: cómo elegir {cat.name.toLowerCase()}
                </h2>
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                  <p>{guide.intro}</p>
                  <p>{guide.middle}</p>
                  <p>{guide.conclusion}</p>
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="mt-8 pb-6">
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Artículos relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-white border border-gray-200 hover:border-green-300 rounded-xl p-4 transition-all"
                    >
                      <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-2 group-hover:text-green-700 transition-colors text-sm leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{post.readTime} de lectura</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-8 pl-3 border-l-2 border-gray-200">
              Enlace de afiliado Amazon Associates. Recibimos una comisión sin coste adicional para ti.
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
