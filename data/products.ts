export type Product = {
  slug: string;
  name: string;
  asin: string;
  categorySlug: string;
  categoryName: string;
  price: string;
  priceMin: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  fullDescription: string;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  badge?: string;
  isSupplement?: boolean;
};

export const categories = [
  {
    slug: "cintas-correr",
    name: "Cintas de correr",
    description: "Las mejores cintas de correr para entrenar en casa a cualquier hora",
    icon: "🏃",
    priceRange: "299€ — 1.299€",
  },
  {
    slug: "bicicletas-estaticas",
    name: "Bicicletas estáticas",
    description: "Bicicletas estáticas y de spinning para cardio en casa sin ruido",
    icon: "🚴",
    priceRange: "199€ — 799€",
  },
  {
    slug: "pesas-mancuernas",
    name: "Pesas y mancuernas",
    description: "Mancuernas, kettlebells y pesas para entrenamiento de fuerza",
    icon: "🏋️",
    priceRange: "29€ — 299€",
  },
  {
    slug: "esterillas-yoga",
    name: "Esterillas y yoga",
    description: "Esterillas de yoga y pilates para entrenar cómodo en cualquier superficie",
    icon: "🧘",
    priceRange: "19€ — 89€",
  },
  {
    slug: "suplementos-proteinas",
    name: "Suplementos y proteínas",
    description: "Proteínas, creatina y suplementos deportivos para mejorar resultados",
    icon: "💊",
    priceRange: "19€ — 59€",
  },
];

export const products: Product[] = [
  // CINTAS DE CORRER
  {
    slug: "toorx-trx-50s",
    name: "Toorx TRX-50S Cinta de Correr",
    asin: "B07PXMJM9Q",
    categorySlug: "cintas-correr",
    categoryName: "Cintas de correr",
    price: "€399,99",
    priceMin: 399,
    rating: 4.3,
    reviewCount: 1876,
    shortDescription:
      "Cinta de correr plegable con velocidad hasta 14 km/h. Ideal para corredores principiantes e intermedios.",
    fullDescription:
      "La Toorx TRX-50S es la cinta de correr más vendida en Amazon España para uso doméstico. Su diseño plegable permite guardarla en poco espacio cuando no se usa, y sus 12 programas preestablecidos cubren desde caminata hasta carrera suave. El motor de 1.5 CV es suficiente para corredores de hasta 90 kg que entrenen a ritmo moderado.",
    pros: [
      "Plegable y compacta",
      "Pantalla LCD completa",
      "12 programas preestablecidos",
      "Buena relación calidad-precio",
    ],
    cons: [
      "Velocidad máxima limitada para corredores avanzados",
      "Motor algo ruidoso a velocidades altas",
    ],
    specs: {
      "Velocidad máx.": "14 km/h",
      Motor: "1.5 CV",
      Superficie: "40x110 cm",
      Capacidad: "110 kg",
    },
    badge: "Más vendida",
  },
  {
    slug: "reebok-one-gt40s",
    name: "Reebok One GT40S Cinta Plegable",
    asin: "B08Z9J7QXL",
    categorySlug: "cintas-correr",
    categoryName: "Cintas de correr",
    price: "€599,99",
    priceMin: 599,
    rating: 4.5,
    reviewCount: 987,
    shortDescription:
      "Cinta plegable premium con 20 km/h y aplicación Bluetooth. Para corredores serios en casa.",
    fullDescription:
      "La Reebok One GT40S eleva el listón en cintas domésticas con una velocidad máxima de 20 km/h, perfecta para corredores habituales que quieren hacer series de velocidad o entrenamiento HIIT en casa. Su superficie de 51x140 cm es de las más amplias en su categoría, ofreciendo mayor comodidad y seguridad en zancadas largas.",
    pros: [
      "Velocidad hasta 20 km/h",
      "Conectividad Bluetooth",
      "Superficie amplia 51x140cm",
      "Amortiguación excelente",
    ],
    cons: ["Precio elevado", "Pesada al mover"],
    specs: {
      "Velocidad máx.": "20 km/h",
      Motor: "2.0 CV",
      Superficie: "51x140 cm",
      Conectividad: "Bluetooth",
    },
    badge: "Mejor rendimiento",
  },
  {
    slug: "xiaomi-kingsmith-walkingpad",
    name: "Xiaomi Kingsmith WalkingPad R2",
    asin: "B09NMQT4YX",
    categorySlug: "cintas-correr",
    categoryName: "Cintas de correr",
    price: "€299,99",
    priceMin: 299,
    rating: 4.2,
    reviewCount: 3241,
    shortDescription:
      "La cinta de andar plegable más compacta. Perfecta bajo el escritorio para trabajar caminando.",
    fullDescription:
      "La Xiaomi Kingsmith WalkingPad R2 es la solución perfecta para quienes quieren mantenerse activos mientras trabajan desde casa. Su diseño ultra compacto permite guardarla literalmente debajo del sofá o apoyarla en la pared. El modo automático ajusta la velocidad según el ritmo de tus pasos.",
    pros: [
      "Ultra compacta y ligera",
      "Control por app",
      "Sin montar",
      "Modo automático",
    ],
    cons: ["Solo hasta 6 km/h", "Sin inclinación"],
    specs: {
      "Velocidad máx.": "6 km/h",
      Peso: "28 kg",
      Plegada: "82x63x13 cm",
    },
    badge: "Más compacta",
  },

  // BICICLETAS ESTÁTICAS
  {
    slug: "bh-fitness-sb2-6",
    name: "BH Fitness SB2.6 Bicicleta Spinning",
    asin: "B07RIEGO123",
    categorySlug: "bicicletas-estaticas",
    categoryName: "Bicicletas estáticas",
    price: "€399,99",
    priceMin: 399,
    rating: 4.4,
    reviewCount: 2341,
    shortDescription:
      "Bicicleta de spinning con volante de 18kg. La favorita de los entusiastas del ciclismo en casa.",
    fullDescription:
      "La BH Fitness SB2.6 es la bicicleta de spinning de referencia para uso doméstico en España. Su volante de 18 kg proporciona una inercia similar a las bicicletas de estudio profesionales, y la resistencia por fricción ofrece una sensación de pedaleo muy natural. BH es marca española con décadas de experiencia en ciclismo.",
    pros: [
      "Volante 18kg muy suave",
      "Manillar y sillín ajustables",
      "Resistencia por fricción real",
      "Silenciosa",
    ],
    cons: ["Sin pantalla digital", "Montaje requiere 2 personas"],
    specs: {
      "Volante de inercia": "18 kg",
      Resistencia: "Fricción",
      "Peso máx.": "120 kg",
    },
    badge: "Mejor spinning",
  },
  {
    slug: "decathlon-domyos-eb900",
    name: "Domyos EB 900 Bicicleta Elíptica",
    asin: "B08CESPED12",
    categorySlug: "bicicletas-estaticas",
    categoryName: "Bicicletas estáticas",
    price: "€499,99",
    priceMin: 499,
    rating: 4.3,
    reviewCount: 1543,
    shortDescription:
      "Bicicleta elíptica silenciosa con 20 niveles de resistencia y pantalla de 9 funciones.",
    fullDescription:
      "La Domyos EB 900 es la bicicleta elíptica más silenciosa de su precio. A diferencia de las bicicletas de spinning, la elíptica trabaja simultáneamente tren superior e inferior con menor impacto en las rodillas, ideal para personas con dolores articulares o que buscan un cardio de bajo impacto.",
    pros: [
      "Muy silenciosa",
      "20 niveles resistencia",
      "Pantalla completa",
      "Compatible con app",
    ],
    cons: ["Tamaño grande", "Precio medio-alto"],
    specs: {
      "Niveles resistencia": "20",
      Pantalla: "9 funciones",
      "Peso máx.": "135 kg",
    },
    badge: "Más silenciosa",
  },
  {
    slug: "sportstech-ux250",
    name: "Sportstech UX250 Bicicleta Estática",
    asin: "B08PERGOLA1",
    categorySlug: "bicicletas-estaticas",
    categoryName: "Bicicletas estáticas",
    price: "€199,99",
    priceMin: 199,
    rating: 4.1,
    reviewCount: 4521,
    shortDescription:
      "La bicicleta estática más vendida en Amazon España. Precio económico con todo lo necesario.",
    fullDescription:
      "La Sportstech UX250 domina las ventas en Amazon España gracias a su precio imbatible y funcionalidad completa. Con pantalla LCD, 8 niveles de resistencia magnética y montaje sencillo, es la opción perfecta para empezar a hacer cardio en casa sin gran inversión.",
    pros: [
      "Precio muy asequible",
      "Pantalla LCD",
      "8 niveles resistencia",
      "Fácil montaje",
    ],
    cons: ["Resistencia básica", "Sillín poco cómodo de serie"],
    specs: {
      "Niveles resistencia": "8",
      Pantalla: "LCD",
      "Peso máx.": "100 kg",
    },
    badge: "Mejor precio",
  },

  // PESAS Y MANCUERNAS
  {
    slug: "bowflex-selecttech-552",
    name: "Bowflex SelectTech 552 Mancuernas Ajustables",
    asin: "B001AXRCUA",
    categorySlug: "pesas-mancuernas",
    categoryName: "Pesas y mancuernas",
    price: "€299,99",
    priceMin: 299,
    rating: 4.7,
    reviewCount: 5432,
    shortDescription:
      "Las mancuernas ajustables más vendidas del mundo. De 2 a 24 kg en segundos.",
    fullDescription:
      "Las Bowflex SelectTech 552 son el estándar mundial en mancuernas ajustables y el sueño de cualquier home gym. Con un simple giro del dial, pasas de 2 a 24 kg en 15 pasos sin cambiar discos manualmente. Es como tener 15 pares de mancuernas en el espacio de uno.",
    pros: [
      "15 pesos en una mancuerna",
      "Cambio en segundos",
      "Diseño compacto",
      "Muy duraderas",
    ],
    cons: [
      "Precio elevado",
      "No apta para ejercicios con agarre tradicional",
    ],
    specs: {
      "Peso mínimo": "2 kg",
      "Peso máximo": "24 kg",
      Incrementos: "14 niveles",
    },
    badge: "Más vendidas",
  },
  {
    slug: "gorilla-sports-rack-mancuernas",
    name: "Gorilla Sports Set Mancuernas 2x20kg",
    asin: "B07MQDKQ9D",
    categorySlug: "pesas-mancuernas",
    categoryName: "Pesas y mancuernas",
    price: "€89,99",
    priceMin: 89,
    rating: 4.3,
    reviewCount: 3241,
    shortDescription:
      "Set completo de mancuernas con soporte. Incluye 2x20kg para entrenamiento completo.",
    fullDescription:
      "El set Gorilla Sports de 2x20kg es la solución más completa para quienes quieren un home gym serio sin gastar una fortuna. Los discos intercambiables permiten ajustar el peso según el ejercicio, y el soporte incluido mantiene todo ordenado y accesible.",
    pros: [
      "Set completo con soporte",
      "Buena relación calidad-precio",
      "Discos intercambiables",
      "Grip antideslizante",
    ],
    cons: ["Cambiar discos lleva tiempo", "Soporte básico"],
    specs: {
      "Peso por mancuerna": "20 kg",
      Material: "Hierro fundido",
      Incluye: "Soporte",
    },
    badge: "Mejor precio",
  },
  {
    slug: "amazon-basics-kettlebell-16kg",
    name: "Amazon Basics Kettlebell 16kg",
    asin: "B09BNKQN5Q",
    categorySlug: "pesas-mancuernas",
    categoryName: "Pesas y mancuernas",
    price: "€39,99",
    priceMin: 39,
    rating: 4.4,
    reviewCount: 8765,
    shortDescription:
      "Kettlebell de 16kg de hierro fundido. El peso más popular para iniciarse en el entrenamiento funcional.",
    fullDescription:
      "La kettlebell de 16 kg de Amazon Basics es el punto de entrada ideal al entrenamiento funcional. Los swings, turkish get-ups y goblet squats con esta kettlebell trabajan el cuerpo completo en sesiones de 20-30 minutos. El hierro fundido de calidad garantiza durabilidad indefinida.",
    pros: [
      "Precio imbatible",
      "Hierro fundido duradero",
      "Base plana antideslizante",
      "Varios pesos disponibles",
    ],
    cons: ["Sin recubrimiento de goma", "Solo un peso fijo"],
    specs: {
      Peso: "16 kg",
      Material: "Hierro fundido",
      Base: "Plana antideslizante",
    },
    badge: "Mejor precio",
  },

  // ESTERILLAS YOGA
  {
    slug: "manduka-pro-yoga-mat",
    name: "Manduka PRO Yoga Mat 6mm",
    asin: "B07BFKPDXC",
    categorySlug: "esterillas-yoga",
    categoryName: "Esterillas y yoga",
    price: "€89,99",
    priceMin: 89,
    rating: 4.8,
    reviewCount: 12543,
    shortDescription:
      "La esterilla de yoga más duradera del mercado. Garantía de por vida.",
    fullDescription:
      "La Manduka PRO es la esterilla que eligen los profesores de yoga y los practicantes serios. Su superficie cerrada de PVC de alta densidad nunca se deteriora, y la garantía de por vida de Manduka no es marketing: si la esterilla falla por cualquier razón, la reemplazan. Los 6mm de grosor ofrecen amortiguación premium para rodillas y articulaciones.",
    pros: [
      "Garantía de por vida",
      "Antideslizante excepcional",
      "6mm de amortiguación",
      "Eco-friendly",
    ],
    cons: ["Precio elevado", "Pesada (3kg)"],
    specs: {
      Grosor: "6 mm",
      Peso: "3 kg",
      Material: "PVC reciclado",
      Garantía: "De por vida",
    },
    badge: "Premium",
  },
  {
    slug: "nike-fundamental-yoga-mat",
    name: "Nike Fundamental Yoga Mat 3mm",
    asin: "B07XS7JWHH",
    categorySlug: "esterillas-yoga",
    categoryName: "Esterillas y yoga",
    price: "€29,99",
    priceMin: 29,
    rating: 4.3,
    reviewCount: 5432,
    shortDescription:
      "Esterilla oficial Nike con textura antideslizante. Ligera y fácil de transportar.",
    fullDescription:
      "La Nike Fundamental es la esterilla perfecta para quien empieza con yoga o pilates y busca calidad de marca a precio asequible. Su textura superficial antideslizante funciona bien en superficies secas, y su peso de solo 1.1kg la hace ideal para llevar a clase o guardarse en cualquier rincón.",
    pros: [
      "Ligera (1.1kg)",
      "Diseño Nike atractivo",
      "Agarre decente",
      "Precio asequible",
    ],
    cons: ["Solo 3mm de grosor", "No apta para superficies muy duras"],
    specs: {
      Grosor: "3 mm",
      Peso: "1.1 kg",
      Material: "NBR",
    },
    badge: "Más vendida",
  },
  {
    slug: "gaiam-essentials-thick-mat",
    name: "Gaiam Essentials Thick Yoga Mat 10mm",
    asin: "B09XS7JWHH",
    categorySlug: "esterillas-yoga",
    categoryName: "Esterillas y yoga",
    price: "€34,99",
    priceMin: 34,
    rating: 4.5,
    reviewCount: 7654,
    shortDescription:
      "Esterilla extra gruesa de 10mm para mayor comodidad en suelos duros. Incluye correa.",
    fullDescription:
      "La Gaiam Essentials Thick es la esterilla favorita de principiantes por una razón: sus 10mm de espuma NBR proporcionan amortiguación excepcional en posturas de rodillas, abdominales o descanso en suelos de parquet o baldosa. Incluye correa de transporte y está disponible en múltiples colores.",
    pros: [
      "10mm de amortiguación extra",
      "Incluye correa de transporte",
      "Muy cómoda para principiantes",
      "Precio accesible",
    ],
    cons: [
      "Menos estabilidad en posturas de equilibrio",
      "Material básico",
    ],
    specs: {
      Grosor: "10 mm",
      Incluye: "Correa de transporte",
      Material: "NBR foam",
    },
    badge: "Más cómoda",
  },

  // SUPLEMENTOS
  {
    slug: "optimum-nutrition-gold-standard-whey",
    name: "Optimum Nutrition Gold Standard Whey 2.27kg",
    asin: "B000UXZQ42",
    categorySlug: "suplementos-proteinas",
    categoryName: "Suplementos y proteínas",
    price: "€54,99",
    priceMin: 54,
    rating: 4.7,
    reviewCount: 45321,
    shortDescription:
      "La proteína whey más vendida del mundo. 24g de proteína por servicio, sabor chocolate.",
    fullDescription:
      "Optimum Nutrition Gold Standard es la proteína de referencia mundial desde los años 90. Su fórmula combina whey concentrate, isolate y peptides para una absorción óptima. El sabor Double Rich Chocolate es el más vendido del mundo por buena razón: mezcla perfecto con agua o leche sin grumos.",
    pros: [
      "Sabor excelente",
      "24g proteína por toma",
      "Marca referencia mundial",
      "Sin sugar coating",
    ],
    cons: ["Precio superior a marcas blancas", "Contiene lactosa"],
    specs: {
      "Proteína por servicio": "24g",
      Sabor: "Chocolate",
      Tamaño: "2.27 kg",
      Servicios: "74",
    },
    badge: "Más vendida",
    isSupplement: true,
  },
  {
    slug: "myprotein-impact-whey-1kg",
    name: "Myprotein Impact Whey Protein 1kg",
    asin: "B07ZVKTP53",
    categorySlug: "suplementos-proteinas",
    categoryName: "Suplementos y proteínas",
    price: "€19,99",
    priceMin: 19,
    rating: 4.5,
    reviewCount: 23456,
    shortDescription:
      "La proteína más económica sin sacrificar calidad. 21g de proteína, múltiples sabores.",
    fullDescription:
      "Myprotein Impact Whey es el mejor valor del mercado en proteína de calidad. Fabricada en UK con controles de calidad rigurosos, ofrece 21g de proteína por toma a un precio que no tiene rival. Con más de 80 sabores disponibles, siempre encontrarás uno que te guste.",
    pros: [
      "Precio imbatible",
      "80+ sabores disponibles",
      "21g proteína por toma",
      "Sin aditivos innecesarios",
    ],
    cons: ["Textura algo granulosa", "Sabores muy dulces algunos"],
    specs: {
      "Proteína por servicio": "21g",
      Tamaño: "1 kg",
      Servicios: "40",
    },
    badge: "Mejor precio",
    isSupplement: true,
  },
  {
    slug: "creatina-monohidrato-bulk-500g",
    name: "Bulk Creatina Monohidrato 500g",
    asin: "B07CJP7XYJ",
    categorySlug: "suplementos-proteinas",
    categoryName: "Suplementos y proteínas",
    price: "€19,99",
    priceMin: 19,
    rating: 4.6,
    reviewCount: 12345,
    shortDescription:
      "Creatina monohidrato pura sin aditivos. El suplemento más estudiado y eficaz para fuerza y masa.",
    fullDescription:
      "La creatina monohidrato es el suplemento deportivo con mayor evidencia científica. Bulk Pure Creatine ofrece creatina 100% pura sin aditivos, colorantes ni edulcorantes. Con más de 500 estudios científicos que avalan su eficacia para mejorar la fuerza y potencia en ejercicios de alta intensidad.",
    pros: [
      "100% creatina pura",
      "Sin aditivos ni colorantes",
      "166 servicios por bote",
      "Precio excelente",
    ],
    cons: ["Sin sabor (requiere mezclar)", "Solo creatina pura"],
    specs: {
      Pureza: "100%",
      Servicios: "166",
      "Dosis": "3g/día",
      Alérgenos: "Ninguno",
    },
    badge: "Mejor relación calidad-precio",
    isSupplement: true,
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(n: number): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, n);
}
