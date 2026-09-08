import Link from "next/link";
import { Product } from "@/data/products";

const CATEGORY_IMAGES: Record<string, string> = {
  "cintas-correr": "/images/products/cintas-correr.jpg",
  "bicicletas-estaticas": "/images/products/bicicletas-estaticas.jpg",
  "pesas-mancuernas": "/images/products/pesas-mancuernas.jpg",
  "esterillas-yoga": "/images/products/esterillas-yoga.jpg",
  "suplementos-proteinas": "/images/products/suplementos-proteinas.jpg",
  "elipticas": "/images/products/elipticas.jpg",
  "bandas-resistencia": "/images/products/bandas-resistencia.jpg",
};

export default function ProductCard({ product }: { product: Product }) {
  const imgSrc = product.image ?? CATEGORY_IMAGES[product.categorySlug] ?? "/images/products/cintas-correr.jpg";
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/tienda/${product.categorySlug}/${product.slug}`} className="block overflow-hidden bg-gray-50">
        <img src={imgSrc} alt={product.name} className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        {product.badge && (
          <span className="self-start text-xs font-bold text-white bg-orange-500 px-2 py-0.5 rounded-full mb-3">
            {product.badge}
          </span>
        )}
        <h3 className="font-bold text-gray-900 mb-2 leading-snug">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{product.shortDescription}</p>
        {product.isSupplement && (
          <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded px-2 py-1 mb-3">
            ⚕️ Consulta con un médico antes de tomar suplementos
          </p>
        )}
        <Link
          href={`/tienda/${product.categorySlug}/${product.slug}`}
          className="block text-center border border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2.5 px-3 rounded-lg transition-colors text-sm"
        >
          Ver análisis y precio →
        </Link>
      </div>
    </div>
  );
}
