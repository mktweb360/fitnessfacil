import Link from "next/link";
import type { Metadata } from "next";
import { categories, getFeaturedProducts, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Tienda de Fitness — Equipamiento para Entrenar en Casa",
  description:
    "Cintas de correr, bicicletas estáticas, mancuernas, esterillas y suplementos. Todo lo que necesitas para montar tu gym en casa.",
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tienda FitnessFácil — Equipamiento para Casa",
  description: "Equipamiento fitness para entrenar en casa: cintas, bicicletas, pesas, esterillas y suplementos.",
  url: "https://www.fitnessfacil.es/tienda",
};

export default function TiendaPage() {
  const featured = getFeaturedProducts(6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-green-300 text-sm mb-3">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Tienda</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Tienda — Equipamiento para Entrenar en Casa
          </h1>
          <p className="text-green-100 text-lg">
            Analizamos y comparamos el mejor equipamiento fitness para que entrenes en casa sin
            salir al gimnasio. Todos los productos con análisis honestos y precios actualizados.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/tienda/${cat.slug}`}
                className="group bg-white border border-gray-200 hover:border-green-400 hover:shadow-lg rounded-xl p-5 transition-all"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors leading-snug mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{cat.priceRange}</span>
                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {count} productos
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Productos destacados</h2>
          <p className="text-gray-600 mb-8">Los mejor valorados de toda nuestra tienda</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
