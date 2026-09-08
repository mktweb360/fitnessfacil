import Link from "next/link";
import type { Metadata } from "next";
import { categories, getFeaturedProducts, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Tienda de Fitness — Equipamiento para Entrenar en Casa",
  description:
    "Cintas de correr, bicicletas estáticas, mancuernas, esterillas y suplementos. Todo lo que necesitas para montar tu gym en casa.",
  alternates: { canonical: "/tienda" },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tienda FitnessFácil — Equipamiento para Casa",
  description:
    "Equipamiento fitness para entrenar en casa: cintas, bicicletas, pesas, esterillas y suplementos.",
  url: "https://www.fitnessfacil.es/tienda",
};

export default function TiendaPage() {
  const featured = getFeaturedProducts(6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Mobile: category pills */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/tienda/${cat.slug}`}
                className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium px-3 py-1.5 rounded-full bg-gray-100 hover:bg-green-700 hover:text-white transition-colors text-gray-700"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs opacity-60">({count})</span>
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
                {categories.map((cat) => {
                  const count = products.filter((p) => p.categorySlug === cat.slug).length;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/tienda/${cat.slug}`}
                      className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-green-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm font-medium text-gray-800 group-hover:text-green-700">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full group-hover:bg-green-100 group-hover:text-green-700">
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
            <div className="mb-6">
              <nav className="text-gray-500 text-sm mb-2">
                <Link href="/" className="hover:text-green-700">
                  Inicio
                </Link>
                <span className="mx-1.5">›</span>
                <span className="text-gray-800">Tienda</span>
              </nav>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                Equipamiento para entrenar en casa
              </h1>
              <p className="text-gray-600 text-sm">
                Analizamos y comparamos el mejor equipamiento fitness para tu gym en casa. Precios
                actualizados y análisis honestos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {featured.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-8 pl-3 border-l-2 border-gray-200">
              Enlace de afiliado Amazon Associates. Recibimos una comisión sin coste adicional para ti.
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
