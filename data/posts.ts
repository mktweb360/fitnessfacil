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
  {
    slug: "walkingpad-r2-vs-r1-pro",
    title: "WalkingPad R2 vs R1 Pro: cuál comprar en 2025",
    excerpt:
      "Comparativa directa WalkingPad R2 vs R1 Pro: diferencias reales en velocidad, motor, precio y uso para ayudarte a elegir la tuya.",
    date: "2025-07-01",
    category: "Cardio",
    readTime: "8 min",
    relatedProducts: ["walkingpad-r2-cinta-plegable", "walkingpad-r1-pro-cinta-plegable"],
  },
  {
    slug: "cinta-correr-plegable-piso-pequeno",
    title: "Cinta de correr plegable para piso pequeño: guía 2025",
    excerpt:
      "Cómo elegir una cinta de correr plegable si vives en un piso pequeño: espacio, ruido, plegado y las mejores opciones del mercado.",
    date: "2025-07-02",
    category: "Cardio",
    readTime: "7 min",
    relatedProducts: ["walkingpad-r2-cinta-plegable", "walkingpad-r1-pro-cinta-plegable"],
  },
  {
    slug: "cinta-andar-casa-bajo-escritorio",
    title: "Cinta de andar bajo el escritorio: guía completa 2025",
    excerpt:
      "Cómo usar una cinta de andar bajo el escritorio para trabajar y moverse al mismo tiempo. Qué modelos funcionan y cómo empezar.",
    date: "2025-07-03",
    category: "Cardio",
    readTime: "8 min",
    relatedProducts: ["walkingpad-r1-pro-cinta-plegable", "walkingpad-r2-cinta-plegable"],
  },
  {
    slug: "walkingpad-opiniones-analisis",
    title: "WalkingPad: opiniones reales y análisis completo 2025",
    excerpt:
      "Análisis honesto de las WalkingPad en España: qué dicen los usuarios reales, pros y contras de cada modelo y si vale la pena el precio.",
    date: "2025-07-04",
    category: "Cardio",
    readTime: "9 min",
    relatedProducts: ["walkingpad-r2-cinta-plegable", "walkingpad-r1-pro-cinta-plegable"],
  },
  {
    slug: "entrenar-caminando-casa-beneficios",
    title: "Beneficios de caminar en casa: por qué funciona mejor de lo que crees",
    excerpt:
      "Los beneficios reales de caminar en casa con una cinta: salud cardiovascular, pérdida de peso, productividad y cómo empezar desde hoy.",
    date: "2025-07-05",
    category: "Cardio",
    readTime: "7 min",
    relatedProducts: ["walkingpad-r2-cinta-plegable", "walkingpad-r1-pro-cinta-plegable"],
  },
  {
    slug: "perder-peso-cinta-andar-casa-plan",
    title: "Plan de 8 semanas para perder peso caminando en cinta",
    excerpt:
      "Plan de entrenamiento de 8 semanas para perder peso caminando en cinta en casa. Progresión semana a semana, calorías y consejos prácticos.",
    date: "2025-07-06",
    category: "Pérdida de peso",
    readTime: "10 min",
    relatedProducts: ["walkingpad-r2-cinta-plegable", "walkingpad-r1-pro-cinta-plegable"],
  },
  {
    slug: "mejor-bicicleta-estatica-casa-2025",
    title: "Mejor bicicleta estática para casa en 2025 — Comparativa completa",
    excerpt:
      "Comparativa de las mejores bicicletas estáticas para casa en 2025: MERACH, Sportstech X150 y X100-C. Guía de compra por perfil y presupuesto.",
    date: "2025-07-07",
    category: "Cardio",
    readTime: "10 min",
    relatedProducts: [
      "merach-bicicleta-estatica-app-136kg",
      "sportstech-x150-ergometro-plegable",
      "sportstech-x100c-bicicleta-cuerdas",
    ],
  },
  {
    slug: "sportstech-x100c-analisis",
    title: "Sportstech X100-C: análisis completo y opiniones 2025",
    excerpt:
      "Análisis honesto de la Sportstech X100-C: qué ofrece, para quién es ideal y si sus cuerdas de fuerza integradas realmente aportan valor.",
    date: "2025-07-08",
    category: "Cardio",
    readTime: "8 min",
    relatedProducts: ["sportstech-x100c-bicicleta-cuerdas", "sportstech-x150-ergometro-plegable"],
  },
  {
    slug: "merach-bicicleta-estatica-analisis",
    title: "MERACH bicicleta estática: análisis completo y opiniones 2025",
    excerpt:
      "Análisis detallado de la MERACH bicicleta estática con app: qué ofrece, para quién es la opción correcta y cómo se compara con otras bicis domésticas.",
    date: "2025-07-09",
    category: "Cardio",
    readTime: "9 min",
    relatedProducts: ["merach-bicicleta-estatica-app-136kg", "sportstech-x150-ergometro-plegable"],
  },
  {
    slug: "mini-bicicleta-escritorio-trabajar",
    title: "Mini bicicleta de escritorio: guía completa y análisis 2025",
    excerpt:
      "Todo sobre la mini bicicleta de escritorio: qué es, cómo funciona, si realmente sirve para algo y cuál comprar en 2025.",
    date: "2025-07-10",
    category: "Cardio",
    readTime: "8 min",
    relatedProducts: ["sportstech-dfx70-mini-bicicleta-escritorio", "sportstech-x100c-bicicleta-cuerdas"],
  },
  {
    slug: "ergometro-vs-bicicleta-estatica",
    title: "Ergómetro vs bicicleta estática: diferencias y cuál elegir",
    excerpt:
      "Diferencias reales entre ergómetro y bicicleta estática para casa: postura, músculos trabajados, espacio y cuál comprar según tu objetivo.",
    date: "2025-07-11",
    category: "Cardio",
    readTime: "7 min",
    relatedProducts: ["sportstech-x150-ergometro-plegable", "merach-bicicleta-estatica-app-136kg"],
  },
  {
    slug: "bicicleta-estatica-adelgazar-resultados",
    title: "Bicicleta estática para adelgazar: resultados reales y cuánto tiempo lleva",
    excerpt:
      "Cuánto se puede adelgazar con bicicleta estática, en cuánto tiempo y con qué frecuencia. Guía basada en evidencia para resultados reales.",
    date: "2025-07-12",
    category: "Pérdida de peso",
    readTime: "9 min",
    relatedProducts: ["merach-bicicleta-estatica-app-136kg", "sportstech-x150-ergometro-plegable"],
  },
  {
    slug: "mancuernas-ajustables-vs-fijas",
    title: "Mancuernas ajustables vs fijas: cuál comprar para casa",
    excerpt:
      "Comparativa honesta entre mancuernas ajustables y fijas para entrenar en casa: espacio, precio, durabilidad y para quién conviene cada una.",
    date: "2025-07-13",
    category: "Fuerza",
    readTime: "8 min",
    relatedProducts: [
      "lullax-neo36-mancuernas-ajustables",
      "maniboom-mancuernas-hexagonales-15kg",
      "fokky-bandas-elasticas-set-4-tpe",
    ],
  },
  {
    slug: "lullax-neo36-analisis-opinion",
    title: "LULLAX NEO36 mancuernas ajustables: análisis y opiniones 2025",
    excerpt:
      "Análisis completo de las LULLAX NEO36: qué ofrecen, para quién son la compra correcta y cómo se comparan con otras mancuernas ajustables del mercado.",
    date: "2025-07-14",
    category: "Fuerza",
    readTime: "9 min",
    relatedProducts: ["lullax-neo36-mancuernas-ajustables", "maniboom-mancuernas-hexagonales-15kg"],
  },
  {
    slug: "kettlebell-para-empezar-peso",
    title: "Kettlebell para principiantes: qué peso elegir y cómo empezar",
    excerpt:
      "Guía completa para empezar con kettlebell: qué peso elegir según sexo y objetivo, los ejercicios básicos y por qué la kettlebell es diferente a las mancuernas.",
    date: "2025-07-15",
    category: "Fuerza",
    readTime: "8 min",
    relatedProducts: ["jowy-kettlebell-pvc-16kg", "lullax-neo36-mancuernas-ajustables"],
  },
  {
    slug: "bandas-elasticas-musculacion-guia",
    title: "Bandas elásticas para musculación: guía completa 2025",
    excerpt:
      "Guía completa sobre bandas elásticas para musculación: tipos, ejercicios, niveles de resistencia y cómo elegir las mejores para entrenar en casa.",
    date: "2025-07-16",
    category: "Fuerza",
    readTime: "7 min",
    relatedProducts: ["fokky-bandas-elasticas-set-4-tpe", "jowy-kettlebell-pvc-16kg"],
  },
  {
    slug: "entrenamiento-fuerza-casa-equipamiento-minimo",
    title: "Entrenamiento de fuerza en casa con equipamiento mínimo",
    excerpt:
      "Cómo montar un home gym eficaz con menos de 100€: qué equipamiento necesitas realmente, qué es prescindible y cómo estructurar el entrenamiento.",
    date: "2025-07-17",
    category: "Fuerza",
    readTime: "8 min",
    relatedProducts: [
      "maniboom-mancuernas-hexagonales-15kg",
      "fokky-bandas-elasticas-set-4-tpe",
      "jowy-kettlebell-pvc-16kg",
    ],
  },
  {
    slug: "rutina-mancuernas-casa-semana",
    title: "Rutina de mancuernas en casa: plan semanal completo",
    excerpt:
      "Plan semanal completo de entrenamiento con mancuernas en casa: rutina de 4 días, ejercicios por grupo muscular, series y repeticiones para principiantes e intermedios.",
    date: "2025-07-18",
    category: "Fuerza",
    readTime: "9 min",
    relatedProducts: ["lullax-neo36-mancuernas-ajustables", "maniboom-mancuernas-hexagonales-15kg"],
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
