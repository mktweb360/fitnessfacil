# Protocolo de gestión de URLs de producto

## Regla obligatoria

Cualquier producto eliminado de `data/products.ts` debe llevar su redirect en `next.config.ts` **en el mismo commit**.

Sin excepción. Si se elimina un producto sin su redirect, Google detectará el 404, lo registrará en GSC y potencialmente desindexará páginas relacionadas.

---

## Destino del redirect

| Situación | Destino |
|---|---|
| Existe producto sustituto | `/tienda/[categoria]/[slug-sustituto]` |
| No existe sustituto | `/tienda/[categoria]` (la categoría padre) |

## Sintaxis en `next.config.ts`

```ts
{
  source: "/tienda/[categoria]/[slug-eliminado]",
  destination: "/tienda/[categoria]",  // o slug sustituto
  permanent: true,  // emite HTTP 308, equivalente SEO a 301
},
```

## Mensaje de commit estándar

```
fix(seo): redirect 308 [slug-eliminado] → [destino]
```

Si se eliminan varios productos a la vez:

```
fix(seo): redirects 308 para productos retirados ([n] URLs)
```

---

## Gestión periódica hasta activar Creators API

**Frecuencia recomendada: semanal**

1. Abrir GSC → Indexación → Páginas → filtrar "No se ha encontrado (404)"
2. Por cada URL nueva de `/tienda/`:
   - Identificar si el producto fue retirado del catálogo
   - Añadir redirect en `next.config.ts`
   - Commit con mensaje estándar
3. Después de hacer deploy, volver a GSC y pulsar "Validar corrección" en el informe de 404

---

## Automatización futura — Creators API

Cuando el programa alcance 10 ventas/30 días (requisito de activación):

- Usar `getItems()` para consultar `Availability` de cada ASIN del catálogo
- Si `availability = OUT_OF_STOCK` de forma persistente (>14 días): generar redirect automático y eliminar el producto del catálogo en el mismo PR
- Evaluar webhook o cron job semanal para esta comprobación

---

## Redirects activos (historial)

| Source | Destination | Tipo | Commit |
|---|---|---|---|
| `/tienda/esterillas-yoga/fokky` | `/tienda/pesas-mancuernas/fokky` | 308 | previo |
| `/tienda/pesas-mancuernas/bowflex-selecttech-552` | `/tienda/pesas-mancuernas` | 308 | 679a8cb |
| `/tienda/suplementos-proteinas/creatina-monohidrato-bulk-500g` | `/tienda/suplementos-proteinas` | 308 | 679a8cb |
| `/tienda/esterillas-yoga/gaiam-essentials-thick-mat` | `/tienda/esterillas-yoga` | 308 | 679a8cb |
| `/tienda/suplementos-proteinas/optimum-nutrition-gold-standard-whey` | `/tienda/suplementos-proteinas/optimum-nutrition-gold-standard-whey-226kg` | 308 | 679a8cb |

---

## Pendientes SEO identificados

- [ ] `buyingGuides` en `app/tienda/[categoria]/page.tsx`: actualizar textos de las 5 categorías — referencian productos que no están en el catálogo (Toorx, Reebok, Bowflex, Manduka, etc.)
- [ ] `categoryFaqs` en `app/tienda/[categoria]/[producto]/page.tsx`: misma corrección en FAQs de cintas-correr
- [ ] Implementar `og:image` por tipo de página
- [ ] Añadir canonical en páginas legales (/aviso-legal, /contacto, /politica-de-privacidad, /politica-de-cookies, /sobre-nosotros)

---

*Última actualización: agosto 2026 — auditoría SEO completa, commits 672da97 y 679a8cb*
