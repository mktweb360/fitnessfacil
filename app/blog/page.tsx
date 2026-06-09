import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog — Guías de Fitness y Ejercicio en Casa",
  description:
    "Guías de entrenamiento, planes de pérdida de peso, análisis de equipamiento y consejos de nutrición para ponerte en forma en casa.",
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const categoryList = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-green-300 text-sm mb-3">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Blog — Guías de Fitness y Ejercicio en Casa
          </h1>
          <p className="text-green-100 text-lg">
            Planes de entrenamiento, análisis de equipamiento y consejos para ponerte en forma sin salir de casa
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm font-semibold text-white bg-green-700 px-3 py-1.5 rounded-full">Todos</span>
          {categoryList.map((cat) => (
            <span key={cat} className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 hover:border-green-300 hover:shadow-md rounded-xl p-6 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                {post.isSupplement && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">⚕️ Suplementos</span>
                )}
              </div>
              <h2 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span>·</span>
                <span>{post.readTime} de lectura</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
