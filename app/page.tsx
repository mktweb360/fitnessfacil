import Link from "next/link";
import type { Metadata } from "next";
import { categories, getFeaturedProducts } from "@/data/products";
import { getLatestPosts } from "@/data/posts";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "FitnessFácil — Entrena en Casa sin Salir al Gimnasio",
  description:
    "Análisis honestos de equipamiento fitness: cintas de correr, bicicletas estáticas, mancuernas y más. Guías para ponerse en forma en casa.",
};

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const latestPosts = getLatestPosts(4);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Fitness en casa 🏠
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Ponte en forma en casa,{" "}
            <span className="text-orange-400">sin gimnasio</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Análisis honestos del mejor equipamiento fitness para entrenar en casa. Cintas de correr,
            bicicletas, pesas y suplementos. Todo probado y comparado para ayudarte a elegir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tienda"
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-lg"
            >
              Ver equipamiento →
            </Link>
            <Link
              href="/blog"
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold px-8 py-3.5 rounded-xl transition-colors text-lg"
            >
              Guías y consejos
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Categorías</h2>
        <p className="text-gray-600 mb-8">Encuentra el equipamiento perfecto para tu objetivo</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tienda/${cat.slug}`}
              className="group bg-white border border-gray-200 hover:border-green-400 hover:shadow-md rounded-xl p-5 transition-all text-center"
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors leading-snug mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500">{cat.priceRange}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Productos destacados</h2>
              <p className="text-gray-600 mt-1">Los mejor valorados por nuestra comunidad</p>
            </div>
            <Link href="/tienda" className="text-green-700 hover:text-green-900 font-semibold text-sm hidden sm:block">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Últimos artículos</h2>
            <p className="text-gray-600 mt-1">Guías y planes de entrenamiento para ponerte en forma</p>
          </div>
          <Link href="/blog" className="text-green-700 hover:text-green-900 font-semibold text-sm hidden sm:block">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 hover:border-green-300 hover:shadow-md rounded-xl p-6 transition-all"
            >
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {post.category}
              </span>
              <h3 className="font-bold text-gray-900 mt-3 mb-2 group-hover:text-green-700 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span>·</span>
                <span>{post.readTime} de lectura</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="bg-green-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">¿Por qué confiar en FitnessFácil?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-3">🔬</div>
              <h3 className="font-bold text-lg mb-2">Análisis basados en datos</h3>
              <p className="text-gray-600 text-sm">Comparamos especificaciones, opiniones reales y relación calidad-precio. Sin sesgos.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">🇪🇸</div>
              <h3 className="font-bold text-lg mb-2">Para el mercado español</h3>
              <p className="text-gray-600 text-sm">Precios en euros, productos disponibles en Amazon España y envío rápido.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-bold text-lg mb-2">Transparencia total</h3>
              <p className="text-gray-600 text-sm">Indicamos siempre qué enlaces son de afiliado. Tu confianza vale más que cualquier comisión.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
