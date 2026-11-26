This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sincronización con la Creators API de Amazon

`pnpm sync:amazon` consulta la Creators API (marketplace `www.amazon.es`, tag de `lib/amazon.ts`) y guarda en `data/amazon-sync.json` la imagen oficial, el estado de la oferta y el vendedor de cada ASIN de `data/products.ts`.

- Credenciales en `.env.local` (ignorado por git): `CREATORS_CLIENT_ID` y `CREATORS_CLIENT_SECRET`. Nunca en el código.
- `--dry` lista los ASIN sin red; `--raw` imprime la primera respuesta cruda; `--only=ASIN1,ASIN2` limita la consulta.
- No se guardan ni se muestran precios, valoraciones ni reseñas (reglas de Associates y `verify-build`).
- No modifica `data/products.ts`. El informe final lista fichas sin oferta o no accesibles: marcar `unavailable` y añadir el 301 es decisión manual.
- Las fichas usan `product.image ?? syncedImage(asin) ?? imagen de categoría`.
