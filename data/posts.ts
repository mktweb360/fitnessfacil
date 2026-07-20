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
    relatedProducts: ["walkingpad-r2-cinta-plegable", "walkingpad-r1-pro-cinta-plegable"],
  },
  {
    slug: "bicicleta-estatica-o-eliptica",
    title: "Tipos de bicicleta estática para casa: cuál elegir según tu espacio",
    excerpt:
      "Bicicleta vertical, ergómetro plegable o mini bici de escritorio: los tres tipos comparados para que aciertes con el que encaja contigo.",
    date: "2025-05-08",
    category: "Cardio",
    readTime: "9 min",
    relatedProducts: [
      "merach-bicicleta-estatica-app-136kg",
      "sportstech-x150-ergometro-plegable",
      "sportstech-x100c-bicicleta-cuerdas",
    ],
  },
  {
    slug: "rutina-entrenamiento-casa-sin-equipamiento",
    title: "Rutina de entrenamiento en casa sin equipamiento — 4 semanas",
    excerpt:
      "Plan de entrenamiento completo de 4 semanas para hacer en casa sin necesitar ningún equipo. Perfecto para principiantes.",
    date: "2025-05-15",
    category: "Entrenamiento",
    readTime: "12 min",
    relatedProducts: [
      "toplus-esterilla-yoga-tpe-6mm",
      "la-mente-es-maravillosa-esterilla-tpe",
      "fokky-bandas-elasticas-set-4-tpe",
    ],
  },
  {
    slug: "mancuernas-ajustables-merece-pena",
    title: "Mancuernas ajustables: ¿merecen la pena? Análisis completo",
    excerpt:
      "¿Vale la pena invertir en mancuernas ajustables o mejor comprar un set fijo? Analizamos pros, contras y cuándo comprar cada tipo.",
    date: "2025-05-22",
    category: "Fuerza",
    readTime: "8 min",
    relatedProducts: [
      "lullax-neo36-mancuernas-ajustables",
      "maniboom-mancuernas-hexagonales-15kg",
      "jowy-kettlebell-pvc-16kg",
    ],
  },
  {
    slug: "proteina-whey-guia-completa",
    title: "Proteína whey: guía completa para principiantes 2025",
    excerpt:
      "Todo lo que necesitas saber sobre la proteína whey: para qué sirve, cuándo tomarla, cuánta necesitas y cuál comprar.",
    date: "2025-05-29",
    category: "Nutrición",
    readTime: "13 min",
    relatedProducts: [
      "optimum-nutrition-gold-standard-whey-226kg",
      "myprotein-impact-whey-1kg-galletas",
    ],
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
    relatedProducts: [
      "la-mente-es-maravillosa-esterilla-tpe",
      "toplus-esterilla-yoga-tpe-6mm",
    ],
  },
  {
    slug: "perder-peso-ejercicio-casa",
    title: "Cómo perder peso haciendo ejercicio en casa — Plan de 8 semanas",
    excerpt:
      "Plan completo de pérdida de peso con ejercicio en casa. Cardio, fuerza y nutrición para resultados reales en 8 semanas.",
    date: "2025-06-05",
    category: "Pérdida de peso",
    readTime: "14 min",
    relatedProducts: [
      "walkingpad-r2-cinta-plegable",
      "merach-bicicleta-estatica-app-136kg",
      "sportstech-dfx70-mini-bicicleta-escritorio",
    ],
  },
  {
    slug: "creatina-para-que-sirve",
    title: "Creatina: para qué sirve, cómo tomarla y si funciona de verdad",
    excerpt:
      "La guía definitiva sobre la creatina: qué dice la ciencia, cómo y cuándo tomarla, efectos secundarios y qué marca elegir.",
    date: "2025-06-09",
    category: "Nutrición",
    readTime: "11 min",
    relatedProducts: [
      "myprotein-creatina-monohidrato-250g",
      "optimum-nutrition-gold-standard-whey-226kg",
    ],
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
