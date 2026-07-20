export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  relatedProducts?: string[];
  relatedPosts?: string[];
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
    relatedPosts: [
      "walkingpad-r2-vs-r1-pro",
      "cinta-correr-plegable-piso-pequeno",
      "entrenar-caminando-casa-beneficios",
    ],
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
    relatedPosts: [
      "mejor-bicicleta-estatica-casa-2025",
      "ergometro-vs-bicicleta-estatica",
      "bicicleta-estatica-adelgazar-resultados",
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
    relatedPosts: [
      "entrenamiento-fuerza-casa-equipamiento-minimo",
      "bandas-elasticas-musculacion-guia",
      "rutina-mancuernas-casa-semana",
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
    relatedPosts: [
      "lullax-neo36-analisis-opinion",
      "mancuernas-ajustables-vs-fijas",
      "kettlebell-para-empezar-peso",
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
    relatedPosts: [
      "on-gold-standard-whey-analisis",
      "myprotein-impact-whey-opinion",
      "suplementos-fitness-casa-necesarios",
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
    relatedPosts: [
      "mejor-esterilla-yoga-casa-2025",
      "pilates-casa-principiantes-guia",
      "yoga-adelgazar-funciona",
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
    relatedPosts: [
      "perder-peso-cinta-andar-casa-plan",
      "bicicleta-estatica-adelgazar-resultados",
      "suplementos-fitness-casa-necesarios",
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
    relatedPosts: [
      "creatina-monohidrato-guia-completa",
      "suplementos-fitness-casa-necesarios",
      "proteina-whey-guia-completa",
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
    relatedPosts: [
      "mejor-cinta-correr-casa-2025",
      "cinta-andar-casa-bajo-escritorio",
      "cinta-correr-plegable-piso-pequeno",
    ],
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
    relatedPosts: [
      "walkingpad-r2-vs-r1-pro",
      "cinta-andar-casa-bajo-escritorio",
      "walkingpad-opiniones-analisis",
    ],
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
    relatedPosts: [
      "walkingpad-r2-vs-r1-pro",
      "cinta-correr-plegable-piso-pequeno",
      "mini-bicicleta-escritorio-trabajar",
    ],
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
    relatedPosts: [
      "walkingpad-r2-vs-r1-pro",
      "mejor-cinta-correr-casa-2025",
      "entrenar-caminando-casa-beneficios",
    ],
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
    relatedPosts: [
      "perder-peso-cinta-andar-casa-plan",
      "walkingpad-r2-vs-r1-pro",
      "bicicleta-estatica-adelgazar-resultados",
    ],
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
    relatedPosts: [
      "entrenar-caminando-casa-beneficios",
      "bicicleta-estatica-adelgazar-resultados",
      "mejor-cinta-correr-casa-2025",
    ],
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
    relatedPosts: [
      "sportstech-x100c-analisis",
      "merach-bicicleta-estatica-analisis",
      "ergometro-vs-bicicleta-estatica",
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
    relatedPosts: [
      "mejor-bicicleta-estatica-casa-2025",
      "ergometro-vs-bicicleta-estatica",
      "merach-bicicleta-estatica-analisis",
    ],
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
    relatedPosts: [
      "mejor-bicicleta-estatica-casa-2025",
      "bicicleta-estatica-adelgazar-resultados",
      "sportstech-x100c-analisis",
    ],
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
    relatedPosts: [
      "cinta-andar-casa-bajo-escritorio",
      "mejor-bicicleta-estatica-casa-2025",
      "sportstech-x100c-analisis",
    ],
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
    relatedPosts: [
      "mejor-bicicleta-estatica-casa-2025",
      "merach-bicicleta-estatica-analisis",
      "bicicleta-estatica-adelgazar-resultados",
    ],
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
    relatedPosts: [
      "perder-peso-cinta-andar-casa-plan",
      "mejor-bicicleta-estatica-casa-2025",
      "suplementos-fitness-casa-necesarios",
    ],
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
    relatedPosts: [
      "lullax-neo36-analisis-opinion",
      "mancuernas-ajustables-merece-pena",
      "entrenamiento-fuerza-casa-equipamiento-minimo",
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
    relatedPosts: [
      "mancuernas-ajustables-vs-fijas",
      "rutina-mancuernas-casa-semana",
      "mancuernas-ajustables-merece-pena",
    ],
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
    relatedPosts: [
      "mancuernas-ajustables-vs-fijas",
      "entrenamiento-fuerza-casa-equipamiento-minimo",
      "bandas-elasticas-musculacion-guia",
    ],
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
    relatedPosts: [
      "entrenamiento-fuerza-casa-equipamiento-minimo",
      "kettlebell-para-empezar-peso",
      "rutina-entrenamiento-casa-sin-equipamiento",
    ],
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
    relatedPosts: [
      "mancuernas-ajustables-vs-fijas",
      "bandas-elasticas-musculacion-guia",
      "kettlebell-para-empezar-peso",
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
    relatedPosts: [
      "lullax-neo36-analisis-opinion",
      "entrenamiento-fuerza-casa-equipamiento-minimo",
      "mancuernas-ajustables-vs-fijas",
    ],
  },
  {
    slug: "mejor-esterilla-yoga-casa-2025",
    title: "Mejor esterilla de yoga para casa en 2025 — Comparativa y guía",
    excerpt:
      "Comparativa de las mejores esterillas de yoga para casa en 2025: TOPLUS vs La Mente Es Maravillosa. Guía de compra por grosor, material y uso.",
    date: "2025-07-19",
    category: "Yoga",
    readTime: "7 min",
    relatedProducts: ["toplus-esterilla-yoga-tpe-6mm", "la-mente-es-maravillosa-esterilla-tpe"],
    relatedPosts: [
      "toplus-esterilla-analisis",
      "esterilla-tpe-vs-pvc-diferencias",
      "yoga-en-casa-principiantes",
    ],
  },
  {
    slug: "esterilla-tpe-vs-pvc-diferencias",
    title: "Esterilla TPE vs PVC: diferencias reales y cuál elegir",
    excerpt:
      "Diferencias reales entre esterillas de yoga de TPE y PVC: agarre, durabilidad, precio, toxicidad y cuál conviene según tu práctica.",
    date: "2025-07-20",
    category: "Yoga",
    readTime: "6 min",
    relatedProducts: ["toplus-esterilla-yoga-tpe-6mm", "la-mente-es-maravillosa-esterilla-tpe"],
    relatedPosts: [
      "mejor-esterilla-yoga-casa-2025",
      "toplus-esterilla-analisis",
      "pilates-casa-principiantes-guia",
    ],
  },
  {
    slug: "toplus-esterilla-analisis",
    title: "TOPLUS esterilla de yoga: análisis completo y opiniones 2025",
    excerpt:
      "Análisis detallado de la TOPLUS esterilla yoga TPE 6mm: qué ofrece, para quién es la mejor opción y cómo se compara con otras esterillas del mercado.",
    date: "2025-07-21",
    category: "Yoga",
    readTime: "7 min",
    relatedProducts: ["toplus-esterilla-yoga-tpe-6mm", "la-mente-es-maravillosa-esterilla-tpe"],
    relatedPosts: [
      "mejor-esterilla-yoga-casa-2025",
      "esterilla-tpe-vs-pvc-diferencias",
      "yoga-en-casa-principiantes",
    ],
  },
  {
    slug: "pilates-casa-principiantes-guia",
    title: "Pilates en casa para principiantes: guía completa para empezar",
    excerpt:
      "Guía completa de pilates en casa para principiantes: qué es, qué beneficios tiene, qué equipamiento necesitas y una rutina inicial de 20 minutos.",
    date: "2025-07-22",
    category: "Yoga",
    readTime: "8 min",
    relatedProducts: ["la-mente-es-maravillosa-esterilla-tpe", "toplus-esterilla-yoga-tpe-6mm"],
    relatedPosts: [
      "yoga-en-casa-principiantes",
      "estiramientos-despues-ejercicio",
      "mejor-esterilla-yoga-casa-2025",
    ],
  },
  {
    slug: "estiramientos-despues-ejercicio",
    title: "Estiramientos después del ejercicio: guía completa y rutina",
    excerpt:
      "Por qué estirar después de entrenar, cuánto tiempo, qué músculos priorizar y una rutina de 10 minutos para hacer en casa con esterilla.",
    date: "2025-07-23",
    category: "Yoga",
    readTime: "7 min",
    relatedProducts: ["toplus-esterilla-yoga-tpe-6mm", "fokky-bandas-elasticas-set-4-tpe"],
    relatedPosts: [
      "pilates-casa-principiantes-guia",
      "yoga-en-casa-principiantes",
      "rutina-mancuernas-casa-semana",
    ],
  },
  {
    slug: "yoga-adelgazar-funciona",
    title: "¿El yoga adelgaza? Lo que dice la evidencia",
    excerpt:
      "¿Se puede perder peso haciendo yoga? Lo que dice la evidencia científica sobre yoga y pérdida de peso, cuántas calorías quema y qué estilos son más efectivos.",
    date: "2025-07-24",
    category: "Yoga",
    readTime: "7 min",
    relatedProducts: ["la-mente-es-maravillosa-esterilla-tpe", "toplus-esterilla-yoga-tpe-6mm"],
    relatedPosts: [
      "yoga-en-casa-principiantes",
      "bicicleta-estatica-adelgazar-resultados",
      "perder-peso-cinta-andar-casa-plan",
    ],
  },
  {
    slug: "on-gold-standard-whey-analisis",
    title: "Optimum Nutrition Gold Standard Whey: análisis completo 2025",
    excerpt:
      "Análisis detallado del Gold Standard Whey de Optimum Nutrition: qué lo hace el más vendido del mundo, para quién es ideal y si justifica el precio.",
    date: "2025-07-25",
    category: "Nutrición",
    readTime: "8 min",
    relatedProducts: ["optimum-nutrition-gold-standard-whey-226kg", "myprotein-impact-whey-1kg-galletas"],
    relatedPosts: [
      "myprotein-impact-whey-opinion",
      "proteina-whey-antes-despues-entreno",
      "suplementos-fitness-casa-necesarios",
    ],
    isSupplement: true,
  },
  {
    slug: "proteina-whey-antes-despues-entreno",
    title: "Proteína whey: cuándo tomarla y si importa el momento",
    excerpt:
      "Cuándo tomar la proteína whey según la evidencia: antes, durante o después del entrenamiento. Lo que dice la ciencia sobre la ventana anabólica.",
    date: "2025-07-26",
    category: "Nutrición",
    readTime: "7 min",
    relatedProducts: ["optimum-nutrition-gold-standard-whey-226kg", "myprotein-impact-whey-1kg-galletas"],
    relatedPosts: [
      "on-gold-standard-whey-analisis",
      "myprotein-impact-whey-opinion",
      "creatina-monohidrato-guia-completa",
    ],
    isSupplement: true,
  },
  {
    slug: "creatina-monohidrato-guia-completa",
    title: "Creatina monohidrato: guía completa para principiantes 2025",
    excerpt:
      "Todo sobre la creatina monohidrato: cómo funciona, cómo tomarla, cuándo se notan los efectos y por qué es el suplemento con más respaldo científico.",
    date: "2025-07-27",
    category: "Nutrición",
    readTime: "9 min",
    relatedProducts: ["myprotein-creatina-monohidrato-250g", "optimum-nutrition-gold-standard-whey-226kg"],
    relatedPosts: [
      "creatina-para-que-sirve",
      "suplementos-fitness-casa-necesarios",
      "proteina-whey-antes-despues-entreno",
    ],
    isSupplement: true,
  },
  {
    slug: "myprotein-impact-whey-opinion",
    title: "Myprotein Impact Whey: análisis y opiniones 2025",
    excerpt:
      "Análisis completo de la Myprotein Impact Whey: calidad real, sabores, comparativa con ON Gold Standard y para quién es la mejor opción.",
    date: "2025-07-28",
    category: "Nutrición",
    readTime: "7 min",
    relatedProducts: ["myprotein-impact-whey-1kg-galletas", "optimum-nutrition-gold-standard-whey-226kg"],
    relatedPosts: [
      "on-gold-standard-whey-analisis",
      "proteina-vegana-vs-whey",
      "proteina-whey-antes-despues-entreno",
    ],
    isSupplement: true,
  },
  {
    slug: "suplementos-fitness-casa-necesarios",
    title: "¿Qué suplementos necesitas realmente para entrenar en casa?",
    excerpt:
      "Guía honesta sobre suplementos para fitness en casa: cuáles tienen respaldo científico, cuáles son marketing y cuál es el orden correcto de prioridades.",
    date: "2025-07-29",
    category: "Nutrición",
    readTime: "8 min",
    relatedProducts: [
      "myprotein-creatina-monohidrato-250g",
      "optimum-nutrition-gold-standard-whey-226kg",
      "myprotein-impact-whey-1kg-galletas",
    ],
    relatedPosts: [
      "creatina-monohidrato-guia-completa",
      "proteina-whey-guia-completa",
      "myprotein-impact-whey-opinion",
    ],
    isSupplement: true,
  },
  {
    slug: "proteina-vegana-vs-whey",
    title: "Proteína vegana vs whey: diferencias reales y cuál elegir",
    excerpt:
      "Comparativa proteína vegana vs whey: perfil de aminoácidos, digestión, precio y cuál es mejor según tus objetivos y preferencias alimentarias.",
    date: "2025-07-30",
    category: "Nutrición",
    readTime: "7 min",
    relatedProducts: ["myprotein-impact-whey-1kg-galletas", "optimum-nutrition-gold-standard-whey-226kg"],
    relatedPosts: [
      "myprotein-impact-whey-opinion",
      "on-gold-standard-whey-analisis",
      "suplementos-fitness-casa-necesarios",
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
