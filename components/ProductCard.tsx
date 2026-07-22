import Link from "next/link";
import { Product } from "@/data/products";
import { amazonLink } from "@/lib/amazon";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col">
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
      <div className="flex gap-2 flex-col sm:flex-row">
        <a
          href={amazonLink(product.asin)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-3 rounded-lg transition-colors text-sm"
        >
          Ver precio en Amazon →
        </a>
        <Link
          href={`/tienda/${product.categorySlug}/${product.slug}`}
          className="flex-1 text-center border border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2.5 px-3 rounded-lg transition-colors text-sm"
        >
          Análisis completo
        </Link>
      </div>
    </div>
  );
}
