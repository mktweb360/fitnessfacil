import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-extrabold text-white">
              Fitness<span className="text-orange-400">Fácil</span>
            </span>
            <p className="mt-3 text-sm text-gray-400">
              Análisis honestos de equipamiento fitness para entrenar en casa. Para adultos españoles que quieren ponerse en forma sin salir.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Tienda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tienda/cintas-correr" className="hover:text-white transition-colors">Cintas de correr</Link></li>
              <li><Link href="/tienda/bicicletas-estaticas" className="hover:text-white transition-colors">Bicicletas estáticas</Link></li>
              <li><Link href="/tienda/pesas-mancuernas" className="hover:text-white transition-colors">Pesas y mancuernas</Link></li>
              <li><Link href="/tienda/esterillas-yoga" className="hover:text-white transition-colors">Esterillas y yoga</Link></li>
              <li><Link href="/tienda/suplementos-proteinas" className="hover:text-white transition-colors">Suplementos y proteínas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Blog</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Todos los artículos</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso legal</Link></li>
              <li><Link href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de privacidad</Link></li>
              <li><Link href="/politica-de-cookies" className="hover:text-white transition-colors">Política de cookies</Link></li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700/40 rounded-lg text-xs text-yellow-200">
              ⚕️ Consulta con un médico antes de iniciar cualquier programa de ejercicio o tomar suplementos.
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-500 space-y-2">
          <p>
            <strong>Aviso de afiliados:</strong> FitnessFácil.es participa en el Programa de Afiliados de Amazon EU (ID: cclaserdepi01-21). Si compras a través de nuestros enlaces podemos ganar una comisión sin coste adicional para ti. Nuestras opiniones son siempre honestas e independientes.
          </p>
          <p>
            <strong>Aviso de salud:</strong> El contenido de este sitio es solo informativo. No sustituye al consejo médico profesional. Consulta con tu médico antes de iniciar un programa de ejercicio o tomar suplementos.
          </p>
          <p>© {new Date().getFullYear()} Mkt Web 360 SLU — CIF B87679304 — Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
