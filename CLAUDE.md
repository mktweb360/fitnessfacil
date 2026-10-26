# CLAUDE.md — fitnessfacil.es

Blog de afiliación de Amazon Associates de Mkt Web 360 (uno de los 5 blogs de monetización). Next.js (App Router, SSG) desplegado en Vercel desde la rama `main` de GitHub (mktweb360/fitnessfacil).

Antes de tocar nada, lee el HISTORIAL vigente del proyecto, que es la fuente de verdad del estado. Está en OneDrive › Mkt Web 360 › Agencia › Blogs monetización y tiene copia en la carpeta Monetización de Google Drive.

## Flujo obligatorio de cambios

1. `git pull`. José trabaja en dos equipos.
2. Crea una rama (`fix/...`, `contenido/...`). Nada se commitea directamente en `main`.
3. `pnpm build`, que ejecuta `next build && node scripts/verify-build.mjs`. Tiene que terminar en ✔.
4. `git push -u origin <rama>`. Vercel genera una vista previa: revísala (HTML servido, title, canonical, enlaces a Amazon con el tag).
5. Fusiona en `main` solo con la vista previa verificada y con el OK de José, por PR o por `git merge --ff-only`.
6. Tras el deploy, verifica en vivo, en modo lectura:
   - `curl` de las URLs tocadas;
   - si se tocó el layout, el consentimiento o los scripts, un hit en GA4 Tiempo real;
   - rastreo con `C:Usersadmoneposscanseo-tecnico.mjs fitnessfacil.es`, `imagenes.mjs` y `enlaces-externos.mjs`.
7. Registra lo hecho en el HISTORIAL (fecha, commits y verificación). Una tarea puntual se cierra con su guarda automática (principio 28 del CORE); una recurrente se convierte en skill o en tarea programada.

Los commits se firman con la identidad del repo (José Marcos), sin líneas de coautoría de herramientas de IA.

## scripts/verify-build.mjs — no quitarlo del build

Hace fallar la build, y por tanto el deploy, si:
- falta GA4 (G-7R62S0W0QD) o el canonical absoluto en alguna página;
- hay títulos duplicados o imágenes locales que no existen en `public/`;
- el sitemap o robots.txt no están bien;
- se incumple Amazon Associates:
  - un precio en €;
  - «mejor precio», «comparativa de precios», «más vendido» o «chollo»;
  - valoraciones (★, «x de 5», «opiniones verificadas»);
  - un número de reseñas;
  - JSON-LD de Product, offers o aggregateRating;
  - un € en `public/llms.txt`.

Las excepciones justificadas van en `scripts/compliance-allow.json`, con el motivo. Nunca se desactiva una regla para que pase la build.

## Reglas de contenido y catálogo

- **Amazon Associates:**
  - Sin precios, valoraciones ni número de reseñas escritos a mano.
  - Los enlaces siempre con `amazonLink(ASIN)`, que lleva el tag `cclaserdepi01-21`.
- **Decathlon (desde el 26/10/2026):**
  - Programa «Afiliacion ES especialistas» (21712), publisher 43981. Condiciones en OneDrive › Blogs monetización › AFILIACIONES (fila de Decathlon).
  - Cada producto lleva `offers` (lib/affiliate.ts): `{ store: "decathlon", path, mc }` con la ruta y el código de modelo tal y como salen en el buscador «Mis productos» del panel, ruta sin codificar (p. ej. «×», no «%C3%97»). El enlace lo genera `offerUrl()`; nunca se escribe a mano ni se alteran sus parámetros (lo prohíbe el contrato).
  - Varios comercios en una ficha: el orden de `offers` es el de los botones y va primero el más barato el día de la comprobación (regla de José), con un comentario que diga precios y fecha. Sin precios en la web.
  - Sin stock en decathlon.es (la talla aparece como «Agotado»): `unavailable: "AAAA-MM-DD"` en la ficha, o en la oferta si hay otro comercio.
  - Prohibido usar enlaces de Decathlon en SEM, Google Shopping, display, email o pujas de marca.
  - decathlon.es corta con Cloudflare si se le hacen muchas peticiones seguidas: espaciarlas y no forzar la verificación.
  - En redes, nunca un enlace de afiliado directo: siempre la URL de la guía con UTM.
- **Productos nuevos:**
  - Solo con botón de compra en Amazon.es o en Decathlon.es (con stock) el día del alta.
  - Datos solo de la ficha de Amazon o del fabricante.
  - «Vendido por un tercero» en contras cuando corresponda.
  - Si el ASIN deja de venderse, se marca `unavailable: "AAAA-MM-DD"`; el slug no se borra.
  - Desde Node, Amazon devuelve captcha. Para verificar usa `fetch` + `DOMParser` en una pestaña de amazon.es.
- **Title:**
  - El `<title>` final, con la marca, mide 70 caracteres o menos y no puede ser igual al H1. En artículos se usa `seoTitle`.
  - Las fichas de producto usan `productTitleUnique()` de `lib/seo.ts`.
- **Textos:**
  - Sin datos inventados. Cada cifra, con fuente oficial enlazada y fecha.
  - Antes de publicar, revisión de huellas de IA (E1 §8.9: paralelismos vacíos, adverbios redundantes, conclusiones obvias, listas que deberían ser prosa, transiciones de manual, frases de impacto genérico).
- **Dónde va cada cosa:** artículos en data/posts.ts (metadatos y seoTitle) + app/blog/[slug]/page.tsx (cuerpo).
- Suplementos llevan `isSupplement: true`. El esquema de producto no tiene `category`.

## Medición

GA4 G-7R62S0W0QD (cuenta mktweb360@gmail.com) en `components/Analytics.tsx`:
- Consent Mode v2 con todo denegado por defecto y `gtag_enable_tcf_support`.
- La analítica se concede leyendo el TCF (propósito 1 + 8 o 9).
- Eventos `clic_amazon` y `clic_decathlon` en cada clic a cada comercio.
- Las cookies `_ga` figuran en la política de cookies y el tratamiento, en la de privacidad.

Search Console: propiedad https://www.fitnessfacil.es/ en la cuenta `/u/1/` (mktweb360@gmail.com).
