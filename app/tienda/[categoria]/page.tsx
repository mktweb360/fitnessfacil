import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/data/products";
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
  };
}

const buyingGuides: Record<string, { intro: string; middle: string; conclusion: string }> = {
  "cintas-correr": {
    intro:
      "Una cinta de correr en casa elimina la excusa del tiempo o el mal tiempo para salir a correr. El mercado español ofrece opciones desde 300€ hasta más de 1.000€, con diferencias significativas en motor, superficie y características. La elección correcta depende de tu peso, velocidad habitual de carrera y el espacio disponible.",
    middle:
      "Para uso doméstico moderado (30-45 min, 3-4 veces/semana, velocidad hasta 10-12 km/h), una cinta con motor de 1.5-2.0 CV y superficie de 40x110 cm es más que suficiente. Si corres regularmente a más de 12 km/h o pesas más de 90 kg, invierte en motor de 2.0+ CV y superficie de 50x140 cm mínimo. Las cintas plegables como la WalkingPad son perfectas para pisos pequeños pero limitadas en velocidad.",
    conclusion:
      "Para la mayoría de usuarios, la Toorx TRX-50S ofrece el mejor equilibrio calidad-precio para empezar. Si eres corredor habitual, la Reebok GT40S justifica su precio premium. Para trabajo de pie o caminatas, la Kingsmith WalkingPad es imbatible en compacidad.",
  },
  "bicicletas-estaticas": {
    intro:
      "Las bicicletas estáticas son el equipamiento cardio más vendido en España para uso doméstico. Silenciosas, sin impacto y efectivas para quemar calorías, son ideales para pisos donde una cinta sería molesta para los vecinos. La elección entre bicicleta estática clásica, spinning y elíptica depende de tus objetivos y condición física.",
    middle:
      "Para perder peso con cardio suave: bicicleta estática clásica como la Sportstech UX250. Para entrenamientos de alta intensidad (HIIT) similares a las clases de spinning: BH Fitness SB2.6. Para bajo impacto con trabajo de brazos incluido, especialmente si tienes problemas de rodilla: elíptica como la Domyos EB 900. El volante de inercia es el factor clave en spinning: más kg = más suave y natural la pedaleada.",
    conclusion:
      "Para iniciarse sin gran inversión, la Sportstech UX250 cumple perfectamente. Los entusiastas del ciclismo y quienes quieran clases de spinning en casa apreciarán el volante de 18kg de la BH Fitness. La Domyos EB 900 es la mejor opción si buscas cardio de bajo impacto o tienes dolores articulares.",
  },
  "pesas-mancuernas": {
    intro:
      "El entrenamiento de fuerza en casa requiere menos equipamiento del que parece. Con un set de mancuernas y suficiente espacio para moverte, puedes trabajar todos los grupos musculares. La decisión clave es entre mancuernas ajustables (más prácticas, mayor inversión inicial) y sets fijos (más baratos, ocupan más espacio).",
    middle:
      "Las mancuernas ajustables como las Bowflex SelectTech son perfectas si tienes poco espacio: 15 pares de mancuernas en el espacio de una. La inversión inicial es mayor pero se amortiza si entrenas consistentemente. Los sets fijos como el Gorilla Sports son mejores si siempre entrenas con el mismo peso o compartes el equipamiento. Las kettlebells añaden versatilidad para ejercicios funcionales que las mancuernas no cubren bien.",
    conclusion:
      "Si tienes espacio limitado y entrenas regularmente, las Bowflex SelectTech son la mejor inversión a largo plazo. Para empezar sin gran desembolso, el set Gorilla Sports 2x20kg cubre la mayoría de ejercicios. Añade una kettlebell de 16kg para ejercicios funcionales y habrás completado un home gym básico efectivo.",
  },
  "esterillas-yoga": {
    intro:
      "La esterilla es la pieza más básica y esencial del equipamiento fitness casero. Ya sea para yoga, pilates, estiramientos o simplemente proteger el suelo durante ejercicios de suelo, elegir la correcta marca la diferencia en comodidad y seguridad. El grosor, material y adherencia son los factores clave.",
    middle:
      "Para yoga dinámico (vinyasa, ashtanga): esterilla de 3-4mm con alta adherencia como la Manduka PRO. Para principiantes y pilates en suelo duro: esterilla gruesa de 6-10mm como la Gaiam Essentials. Para llevar a clase o viajar: esterilla ligera de 3mm como la Nike Fundamental. Las esterillas de PVC son más duraderas; las de TPE son más ecológicas pero menos resistentes; las de NBR son las más económicas y acolchadas.",
    conclusion:
      "Para práctica seria de yoga, la Manduka PRO es la inversión que dura toda la vida. Para uso casual y principiantes, la Gaiam Essentials 10mm ofrece comodidad máxima a buen precio. La Nike Fundamental es perfecta si buscas algo ligero y de marca reconocida.",
  },
  "suplementos-proteinas": {
    intro:
      "Los suplementos deportivos pueden ayudarte a alcanzar tus objetivos de fitness, pero no son imprescindibles para la mayoría de personas. La proteína whey es el suplemento con mayor evidencia científica para recuperación muscular, y la creatina es el más estudiado para mejorar la fuerza. Antes de cualquier suplemento, consulta con tu médico.",
    middle:
      "La proteína whey es útil si no alcanzas tu objetivo proteico solo con la dieta (1.6-2.2g por kg de peso corporal). Los concentrados de whey como Optimum Nutrition ofrecen sabor superior; los isolates tienen menos lactosa para intolerantes. La creatina monohidrato es el suplemento más seguro y eficaz para mejorar rendimiento en ejercicios de alta intensidad de menos de 30 segundos.",
    conclusion:
      "Para proteína, Optimum Nutrition Gold Standard es la referencia mundial; Myprotein ofrece la mejor relación calidad-precio. Para creatina, cualquier creatina monohidrato pura sirve: Bulk es una de las mejores opciones económicas. Importante: los suplementos solo son útiles sobre una base sólida de entrenamiento y nutrición adecuada.",
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

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-green-300 text-sm mb-3">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/tienda" className="hover:text-white">Tienda</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <span className="text-3xl mb-3 block">{cat.icon}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            {cat.name} — Guía de compra y comparativa 2025
          </h1>
          <p className="text-green-100 text-lg">{cat.description}</p>
          <p className="text-green-300 text-sm mt-2">
            {catProducts.length} productos analizados
          </p>
        </div>
      </section>

      {hasSupplement && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
            <p className="font-semibold mb-1">⚕️ Aviso de salud</p>
            <p>Este contenido es solo informativo. Consulta con un médico o dietista antes de tomar suplementos.</p>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {catProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {guide && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Guía de compra: cómo elegir {cat.name.toLowerCase()}
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>{guide.intro}</p>
            <p>{guide.middle}</p>
            <p>{guide.conclusion}</p>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-14">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Artículos relacionados</h2>
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
        </section>
      )}
    </>
  );
}
