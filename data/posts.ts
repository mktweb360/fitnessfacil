export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  relatedProducts?: string[];
  isSupplement?: boolean;
};

export const posts: Post[] = [
  {
    slug: "mejor-cinta-correr-casa-2025",
    title: "La mejor cinta de correr para casa en 2025 — Análisis y comparativa",
    excerpt:
      "Analizamos las mejores cintas de correr para usar en casa: desde opciones económicas hasta premium. Guía completa con comparativa.",
    date: "2025-05-01",
    category: "Cardio",
    readTime: "11 min",
    relatedProducts: ["toorx-trx-50s", "reebok-one-gt40s"],
  },
  {
    slug: "bicicleta-estatica-o-eliptica",
    title: "Bicicleta estática o elíptica: cuál es mejor para perder peso",
    excerpt:
      "Comparativa completa entre bicicleta estática y elíptica. Cuál quema más calorías, cuál es más silenciosa y cuál deberías comprar.",
    date: "2025-05-08",
    category: "Cardio",
    readTime: "9 min",
    relatedProducts: ["bh-fitness-sb2-6", "sportstech-ux250"],
  },
  {
    slug: "rutina-entrenamiento-casa-sin-equipamiento",
    title: "Rutina de entrenamiento en casa sin equipamiento — 4 semanas",
    excerpt:
      "Plan de entrenamiento completo de 4 semanas para hacer en casa sin necesitar ningún equipo. Perfecto para principiantes.",
    date: "2025-05-15",
    category: "Entrenamiento",
    readTime: "12 min",
    relatedProducts: ["gaiam-essentials-thick-mat", "nike-fundamental-yoga-mat"],
  },
  {
    slug: "mancuernas-ajustables-merece-pena",
    title: "Mancuernas ajustables: ¿merecen la pena? Análisis completo",
    excerpt:
      "¿Vale la pena invertir en mancuernas ajustables o mejor comprar un set fijo? Analizamos pros, contras y cuándo comprar cada tipo.",
    date: "2025-05-22",
    category: "Fuerza",
    readTime: "8 min",
    relatedProducts: ["bowflex-selecttech-552", "gorilla-sports-rack-mancuernas"],
  },
  {
    slug: "proteina-whey-guia-completa",
    title: "Proteína whey: guía completa para principiantes 2025",
    excerpt:
      "Todo lo que necesitas saber sobre la proteína whey: para qué sirve, cuándo tomarla, cuánta necesitas y cuál comprar.",
    date: "2025-05-29",
    category: "Nutrición",
    readTime: "13 min",
    relatedProducts: ["optimum-nutrition-gold-standard-whey", "myprotein-impact-whey-1kg"],
    isSupplement: true,
  },
  {
    slug: "yoga-en-casa-principiantes",
    title: "Yoga en casa para principiantes — Guía de inicio completa",
    excerpt:
      "Cómo empezar a practicar yoga en casa desde cero: posturas básicas, rutina para principiantes y qué material necesitas.",
    date: "2025-06-01",
    category: "Yoga",
    readTime: "10 min",
    relatedProducts: ["manduka-pro-yoga-mat", "gaiam-essentials-thick-mat"],
  },
  {
    slug: "perder-peso-ejercicio-casa",
    title: "Cómo perder peso haciendo ejercicio en casa — Plan de 8 semanas",
    excerpt:
      "Plan completo de pérdida de peso con ejercicio en casa. Cardio, fuerza y nutrición para resultados reales en 8 semanas.",
    date: "2025-06-05",
    category: "Pérdida de peso",
    readTime: "14 min",
    relatedProducts: ["toorx-trx-50s", "bh-fitness-sb2-6"],
  },
  {
    slug: "creatina-para-que-sirve",
    title: "Creatina: para qué sirve, cómo tomarla y si funciona de verdad",
    excerpt:
      "La guía definitiva sobre la creatina: qué dice la ciencia, cómo y cuándo tomarla, efectos secundarios y qué marca elegir.",
    date: "2025-06-09",
    category: "Nutrición",
    readTime: "11 min",
    relatedProducts: ["creatina-monohidrato-bulk-500g", "myprotein-impact-whey-1kg"],
    isSupplement: true,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getLatestPosts(n: number): Post[] {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}
