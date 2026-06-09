"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            <span className="text-2xl font-extrabold text-green-700 tracking-tight">
              Fitness<span className="text-orange-500">Fácil</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/tienda" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              Tienda
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/sobre-nosotros" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              Sobre nosotros
            </Link>
            <Link
              href="/tienda"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Ver tienda →
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4">
            <Link href="/tienda" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Tienda</Link>
            <Link href="/blog" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link href="/sobre-nosotros" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Sobre nosotros</Link>
            <Link href="/contacto" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </div>
        )}
      </div>
    </header>
  );
}
