"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams({
      subject: `Contacto FitnessFácil: ${data.get("asunto") as string}`,
      body: `Nombre: ${data.get("nombre") as string}\nEmail: ${data.get("email") as string}\n\nMensaje:\n${data.get("mensaje") as string}`,
    });
    window.location.href = `mailto:info@mktweb360.com?${params.toString()}`;
    setSubmitted(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Contacto</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contacto</h1>
      <p className="text-gray-600 mb-8">¿Tienes dudas sobre algún producto o artículo? Escríbenos.</p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">✓</div>
          <h2 className="font-bold text-green-800 text-lg mb-2">¡Mensaje enviado!</h2>
          <p className="text-green-700 text-sm">Tu cliente de correo se ha abierto. Te responderemos por email.</p>
          <Link href="/" className="mt-4 inline-block text-green-700 font-semibold text-sm">← Volver al inicio</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
            <input type="text" id="nombre" name="nombre" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Tu nombre" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="tu@email.com" />
          </div>
          <div>
            <label htmlFor="asunto" className="block text-sm font-semibold text-gray-700 mb-1">Asunto *</label>
            <select id="asunto" name="asunto" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
              <option value="">Selecciona un asunto</option>
              <option value="Consulta sobre producto">Consulta sobre un producto</option>
              <option value="Pregunta sobre entrenamiento">Pregunta sobre entrenamiento</option>
              <option value="Error en el sitio">Error en el sitio web</option>
              <option value="Colaboración">Colaboración o publicidad</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-1">Mensaje *</label>
            <textarea id="mensaje" name="mensaje" required rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" placeholder="Escribe tu mensaje..." />
          </div>
          <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Enviar mensaje
          </button>
          <p className="text-xs text-gray-400 text-center">
            Se abrirá tu cliente de correo para enviar a <strong>info@mktweb360.com</strong>
          </p>
        </form>
      )}

      <div className="mt-12 space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">¿Para qué puedes escribirnos?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Dudas sobre una guía o un análisis:</strong> si algo de un artículo del <Link href="/blog" className="text-green-700 hover:underline">blog</Link> no queda claro o quieres que ampliemos un tema, cuéntanoslo e indícanos en qué página lo has leído.</li>
            <li><strong>Sugerencias de productos:</strong> si conoces una cinta, una bicicleta, unas mancuernas o un suplemento que crees que debería estar en las comparativas de la <Link href="/tienda" className="text-green-700 hover:underline">tienda</Link>, envíanos el nombre exacto del modelo.</li>
            <li><strong>Errores detectados:</strong> un dato técnico equivocado, un enlace roto o un producto que ya no está disponible. Revisamos cada aviso y corregimos la página cuando el error se confirma.</li>
            <li><strong>Colaboraciones:</strong> propuestas de marcas o medios. No aceptamos pagos por reseñas positivas.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Lo que no hacemos</h2>
          <p>
            No vendemos productos directamente: FitnessFácil.es es una web de análisis y comparativas, y los productos se
            compran en Amazon.es o en Decathlon.es a través de nuestros enlaces. Por eso no podemos gestionar pedidos, envíos, devoluciones ni
            garantías; para eso tienes que dirigirte a la tienda donde hiciste la compra.
          </p>
          <p className="mt-2">
            Tampoco respondemos consultas médicas ni diseñamos planes de entrenamiento o de nutrición personalizados. Nuestro
            contenido es informativo y no sustituye el consejo de un médico, un fisioterapeuta o un dietista-nutricionista,
            sobre todo si tienes una lesión, una enfermedad o vas a empezar a tomar suplementos.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Cómo elegimos y actualizamos los productos</h2>
          <p>
            Comparamos especificaciones técnicas, datos del fabricante y opiniones de compradores, y revisamos periódicamente
            la disponibilidad de cada producto. Explicamos la metodología completa y cómo nos financiamos en{" "}
            <Link href="/sobre-nosotros" className="text-green-700 hover:underline">Sobre nosotros</Link>.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Quién está detrás</h2>
          <p>
            FitnessFácil.es es un proyecto de Mkt Web 360 SLU. Puedes escribirnos directamente a{" "}
            <strong>info@mktweb360.com</strong>. Los datos que nos envíes se tratan según nuestra{" "}
            <Link href="/politica-de-privacidad" className="text-green-700 hover:underline">política de privacidad</Link>, y los
            datos del titular están en el <Link href="/aviso-legal" className="text-green-700 hover:underline">aviso legal</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
