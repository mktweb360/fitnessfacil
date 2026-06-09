import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/data/posts";
import { getProductBySlug } from "@/data/products";
import { amazonLink } from "@/lib/amazon";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import SupplementDisclaimer from "@/components/SupplementDisclaimer";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date },
  };
}

const articleContent: Record<string, {
  intro: string;
  sections: Array<{ heading: string; body: string }>;
  comparison?: { headers: string[]; rows: string[][] };
  plan?: Array<{ week: string; description: string; sessions: string[] }>;
  conclusion: string;
  faqs: Array<{ q: string; a: string }>;
}> = {
  "mejor-cinta-correr-casa-2025": {
    intro: "Tener una cinta de correr en casa elimina para siempre la excusa del mal tiempo, del horario del gimnasio o de la falta de tiempo. Pero con opciones desde 200€ hasta más de 1.000€, elegir la correcta puede ser confuso. Esta guía analiza las mejores opciones del mercado español en 2025 para ayudarte a tomar la decisión correcta.",
    sections: [
      { heading: "Toorx TRX-50S: la mejor relación calidad-precio", body: "La Toorx TRX-50S domina las ventas en Amazon España gracias a un equilibrio perfecto entre precio y características. Su motor de 1.5 CV aguanta perfectamente jornadas de 30-45 minutos a velocidades de hasta 10-12 km/h. El diseño plegable permite guardarla vertical contra la pared, ocupando solo 60x45 cm en posición guardada. Los 12 programas preestablecidos incluyen intervalos, colinas y programas de pérdida de peso para mantener el entrenamiento variado." },
      { heading: "Reebok GT40S: para corredores que se toman en serio el entrenamiento", body: "Si corres habitualmente más de 3 veces por semana o superas los 10 km/h regularmente, la Reebok GT40S justifica su mayor precio. Su motor de 2.0 CV proporciona una potencia suave y constante incluso a máxima velocidad, y la superficie de 51x140 cm es significativamente más cómoda para zancadas largas. La conectividad Bluetooth permite sincronización con apps de entrenamiento como Zwift o Fitbit." },
      { heading: "Kingsmith WalkingPad: trabajar caminando como en Silicon Valley", body: "La tendencia de trabajar caminando lentamente bajo el escritorio ha llegado a España, y la Xiaomi Kingsmith WalkingPad es la reina de ese nicho. A velocidades de 1-3 km/h puedes trabajar con tu ordenador mientras mantienes el cuerpo activo. Plegada mide solo 13 cm de altura, cabe literalmente debajo del sofá. No está pensada para correr, pero para sumar 5.000-8.000 pasos diarios sin esfuerzo adicional, es imbatible." },
    ],
    comparison: {
      headers: ["Característica", "Toorx TRX-50S", "Reebok GT40S", "Kingsmith WalkingPad"],
      rows: [
        ["Precio", "~400€", "~600€", "~300€"],
        ["Velocidad máx.", "14 km/h", "20 km/h", "6 km/h"],
        ["Motor", "1.5 CV", "2.0 CV", "0.75 CV"],
        ["Superficie", "40x110 cm", "51x140 cm", "46x102 cm"],
        ["Plegable", "Sí", "Sí", "Ultra-compacta"],
        ["Bluetooth", "No", "Sí", "Sí (app)"],
        ["Ideal para", "Uso moderado", "Corredores serios", "Caminar/trabajar"],
      ],
    },
    conclusion: "Para la mayoría de usuarios que empiezan a correr en casa, la Toorx TRX-50S es la elección perfecta. Si ya corres habitualmente y quieres seguir haciéndolo en casa con calidad, invierte en la Reebok GT40S. Y si lo que buscas es simplemente moverte más durante el día de trabajo, la Kingsmith WalkingPad es una solución brillante.",
    faqs: [
      { q: "¿Puedo perder peso corriendo en cinta?", a: "Sí, definitivamente. Correr a 8-10 km/h durante 30 minutos quema entre 250-350 kcal en una persona de 70 kg. Combinado con una dieta adecuada, correr 3-4 veces por semana produce una pérdida de peso consistente y sostenible." },
      { q: "¿Es malo correr siempre en cinta vs. al aire libre?", a: "No es malo, pero hay diferencias. La cinta no simula el viento ni las irregularidades del terreno. Una inclinación del 1-2% en la cinta compensa parcialmente estas diferencias. Para entrenamiento general de salud, la cinta es completamente válida." },
      { q: "¿Cada cuánto debo hacer mantenimiento a la cinta?", a: "Lubrica la banda cada 3-6 meses (o cada 40-50 horas de uso) con aceite de silicona específico para cintas. Limpia la superficie regularmente con un paño húmedo. Un mantenimiento correcto puede doblar la vida útil de la cinta." },
      { q: "¿Cuánto ruido hace una cinta de correr?", a: "Las cintas domésticas modernas producen 60-70 dB a velocidades medias. El ruido principal son las pisadas (no el motor). Con una alfombrilla de amortiguación bajo la cinta reduces significativamente la transmisión de vibración al suelo." },
      { q: "¿Cuánto espacio necesito para una cinta de correr?", a: "La zona de uso necesita la superficie de la banda más 1m detrás y 0.5m a cada lado por seguridad. Para una cinta de 40x110 cm necesitas una zona de al menos 150x200 cm. Las plegables reducen el espacio de almacenamiento pero no el espacio de uso." },
    ],
  },

  "bicicleta-estatica-o-eliptica": {
    intro: "Dos de las máquinas más populares del gimnasio también son las más vendidas para uso doméstico: la bicicleta estática y la elíptica. Ambas ofrecen cardio efectivo de bajo impacto, pero tienen diferencias importantes en músculos trabajados, espacio necesario y tipo de entrenamiento. Esta guía te ayuda a elegir cuál encaja mejor con tus objetivos.",
    sections: [
      { heading: "Bicicleta estática: cardio intenso y enfocado", body: "La bicicleta estática trabaja principalmente el tren inferior: cuádriceps, isquiotibiales, glúteos y gemelos. A intensidad alta (spinning), es una de las máquinas que más calorías quema por hora. La postura más agresiva de las bicicletas de spinning activa más los glúteos y el core. Su ventaja principal: es extremadamente silenciosa (especialmente las de resistencia magnética) y compacta. Ideal para pisos y para entrenar tarde sin molestar a nadie." },
      { heading: "Elíptica: cardio completo con mínimo impacto", body: "La elíptica trabaja simultáneamente tren superior e inferior: brazos, pecho, espalda, cuádriceps y glúteos. El movimiento elíptico no hay impacto en rodillas y tobillos, lo que la hace ideal para personas con sobrepeso, lesiones articulares o que simplemente quieren proteger sus articulaciones a largo plazo. Quema calorías similares a correr pero con impacto casi nulo. Su desventaja: ocupa más espacio y suele ser más cara." },
      { heading: "BH Fitness SB2.6 vs. Sportstech UX250: las opciones para cada presupuesto", body: "Para quienes buscan experiencia de spinning real: la BH Fitness SB2.6 con su volante de 18 kg ofrece una inercia que recuerda a las clases de estudio. Para quienes buscan simplemente cardio económico en casa: la Sportstech UX250 cubre todas las necesidades básicas a la mitad del precio." },
    ],
    comparison: {
      headers: ["Criterio", "Bicicleta estática", "Bicicleta spinning", "Elíptica"],
      rows: [
        ["Músculos trabajados", "Tren inferior", "Tren inferior intenso", "Tren completo"],
        ["Impacto articular", "Bajo", "Bajo", "Mínimo"],
        ["Calorías/hora (media)", "400-500 kcal", "500-700 kcal", "450-600 kcal"],
        ["Ruido", "Bajo-Medio", "Bajo (magnético)", "Bajo"],
        ["Espacio", "Compacto", "Compacto", "Mayor"],
        ["Precio de entrada", "~200€", "~350€", "~400€"],
        ["Ideal para", "Principiantes", "Entusiastas cardio", "Lesiones/mayor", ""],
      ],
    },
    conclusion: "Si tienes rodillas o articulaciones sensibles, la elíptica es la mejor opción. Si buscas la intensidad de las clases de spinning en casa, la BH Fitness SB2.6 es tu elección. Y si simplemente quieres cardio efectivo al mejor precio, la Sportstech UX250 cumple perfectamente con todo lo necesario.",
    faqs: [
      { q: "¿Cuántas calorías quema la bicicleta estática?", a: "A intensidad moderada, una persona de 75 kg quema aproximadamente 400-500 kcal/hora en bicicleta estática. A alta intensidad en spinning puede llegar a 600-700 kcal/hora. Las calorías exactas varían mucho según el peso, la intensidad y la genética." },
      { q: "¿Es mejor la bicicleta o la elíptica para perder peso?", a: "Ambas son efectivas para pérdida de peso a la misma intensidad. La elíptica trabaja más grupos musculares (tren superior + inferior), lo que puede suponer un mayor gasto calórico total. La clave es la consistencia: el mejor ejercicio es el que harás regularmente." },
      { q: "¿La bicicleta estática daña las rodillas?", a: "Al contrario: la bicicleta estática es uno de los ejercicios más recomendados para personas con problemas de rodilla. El movimiento circular sin impacto fortalece los cuádriceps (que protegen la rodilla) sin estrés articular. Asegúrate de que el sillín esté a la altura correcta (rodilla ligeramente flexionada en la parte baja del pedaleo)." },
      { q: "¿Cuánto tiempo en bicicleta estática para ver resultados?", a: "Con sesiones de 30-45 minutos a intensidad moderada, 3-4 veces por semana, verás mejoras en resistencia cardiovascular en 2-3 semanas. Para pérdida de peso visible (combinado con dieta adecuada), espera resultados en 4-6 semanas de entrenamiento consistente." },
      { q: "¿Es mejor la resistencia magnética o por fricción?", a: "La magnética es silenciosa, requiere menos mantenimiento y ofrece mayor precisión en los niveles de resistencia. La de fricción (más común en spinning) simula mejor la resistencia real del ciclismo y permite ajustes más graduales. Para uso doméstico tranquilo, la magnética es superior." },
    ],
  },

  "rutina-entrenamiento-casa-sin-equipamiento": {
    intro: "No necesitas equipamiento para empezar a entrenar. Con el peso de tu propio cuerpo puedes conseguir un físico funcional, fuerte y saludable desde el salón de tu casa. Esta rutina de 4 semanas está diseñada para principiantes absolutos que quieren crear el hábito de entrenar sin abrumarse desde el primer día.",
    sections: [
      { heading: "Los fundamentos del entrenamiento con peso corporal", body: "Los ejercicios básicos de calistenia — sentadillas, flexiones, zancadas, planchas y abdominales — son suficientes para un entrenamiento completo. La clave para principiantes es aprender la técnica correcta antes de aumentar la dificultad. Una esterilla de yoga o pilates hace el entrenamiento mucho más cómodo en suelos duros." },
      { heading: "Semanas 1-2: Construyendo la base", body: "Las primeras dos semanas se enfocan en aprender los movimientos y crear el hábito. Tres sesiones por semana con días de descanso entre medias es el volumen ideal para principiantes. No te preocupes si no puedes hacer muchas repeticiones: la calidad importa más que la cantidad. Descansa 60 segundos entre series." },
      { heading: "Semanas 3-4: Aumentando la intensidad", body: "Una vez que los movimientos son familiares, aumentamos el volumen y reducimos el descanso. Introducimos circuit training (ejercicios en serie sin descanso) para mayor intensidad cardiovascular. Si has completado bien las 4 semanas, estarás listo para añadir algún equipamiento básico como una kettlebell o mancuernas." },
    ],
    plan: [
      {
        week: "Semana 1-2: Base",
        description: "3 sesiones/semana, lunes-miércoles-viernes. Descansa 60 seg entre series.",
        sessions: [
          "Sentadillas — 3 series × 10 reps",
          "Flexiones (rodillas si es necesario) — 3 × 8",
          "Zancadas alternadas — 3 × 8 cada pierna",
          "Plancha — 3 × 20 segundos",
          "Abdominales crunch — 3 × 12",
          "Puente de glúteos — 3 × 12",
        ],
      },
      {
        week: "Semana 3-4: Intensidad",
        description: "4 sesiones/semana, lunes-martes-jueves-viernes. Descansa 45 seg.",
        sessions: [
          "Sentadillas con salto — 3 × 12",
          "Flexiones completas — 3 × 10",
          "Zancadas con salto — 3 × 8 cada pierna",
          "Plancha — 3 × 40 segundos",
          "Mountain climbers — 3 × 20 reps",
          "Hip thrust — 3 × 15",
          "Burpees — 3 × 8",
        ],
      },
    ],
    conclusion: "Con estas 4 semanas habrás creado el hábito de entrenar y notarás mejoras reales en fuerza, resistencia y composición corporal. El siguiente paso natural es añadir una esterilla de calidad para mayor comodidad y explorar el yoga o pilates como complemento de flexibilidad.",
    faqs: [
      { q: "¿Cuántas veces a la semana debo entrenar para ver resultados?", a: "Para principiantes, 3-4 sesiones de 30-45 minutos por semana es óptimo. El cuerpo necesita días de descanso para recuperarse y crecer. Más no siempre es mejor: el sobreentrenamiento es tan perjudicial como no entrenar." },
      { q: "¿Necesito calentar antes de entrenar?", a: "Sí, siempre. 5-10 minutos de calentamiento dinámico (rotaciones de articulaciones, saltos suaves, movimientos similares al entrenamiento a baja intensidad) reducen el riesgo de lesión y mejoran el rendimiento. El estiramiento estático se deja para después del entrenamiento." },
      { q: "¿Cuándo veré los primeros resultados?", a: "Las primeras mejoras en fuerza y resistencia se notan en 2-3 semanas. Los cambios visibles en composición corporal empiezan a ser evidentes hacia las 4-6 semanas con entrenamiento constante y alimentación adecuada. La paciencia es clave: los cambios duraderos llevan tiempo." },
      { q: "¿Puedo entrenar si tengo dolor muscular?", a: "El dolor muscular tardío (DOMS, el que aparece 24-48h después) es normal y no impide entrenar. Puedes hacer ejercicio suave o trabajar grupos musculares diferentes. Si el dolor es agudo o articular, descansa y consulta a un médico si persiste." },
      { q: "¿Necesito proteína en polvo para esta rutina?", a: "No es necesario. Para una rutina de iniciación con peso corporal, una dieta normal equilibrada proporciona toda la proteína necesaria. Si entrenas con mayor intensidad y volumen, puede ser conveniente pero nunca imprescindible." },
    ],
  },

  "mancuernas-ajustables-merece-pena": {
    intro: "Las mancuernas ajustables prometen reemplazar 10-15 pares de mancuernas fijas en el espacio de una. Pero su precio elevado y sus particularidades de uso generan dudas: ¿merecen la pena o es mejor un set de mancuernas fijas? Esta análisis te da la respuesta honesta según tu caso.",
    sections: [
      { heading: "Cómo funcionan las mancuernas ajustables", body: "Las mancuernas ajustables tienen un sistema de dial o palanca que selecciona los discos que se incluyen en el agarre. En las Bowflex SelectTech 552, girar el dial hacia el peso deseado (entre 2 y 24 kg en 14 pasos) hace que solo se acoplen al mango los discos correspondientes. El proceso lleva literalmente 2-3 segundos. La limitación: no puedes soltarlas al suelo con fuerza como las fijas (se rompen) y son más anchas que las fijas del mismo peso." },
      { heading: "Bowflex SelectTech 552: el estándar de referencia", body: "Con más de 5.000 reseñas en Amazon y una media de 4.7 estrellas, las Bowflex SelectTech 552 son las mancuernas ajustables más vendidas por una razón: funcionan exactamente como prometen. 14 configuraciones desde 2 kg hasta 24 kg cubren la mayoría de ejercicios para la mayoría de usuarios. El sistema de dial es fiable y dura muchos años con uso normal." },
      { heading: "Gorilla Sports 2x20kg: la alternativa económica", body: "Si prefieres las mancuernas tradicionales pero quieres versatilidad, el set Gorilla Sports con soporte incluye suficientes discos para una amplia gama de pesos. La ventaja: puedes soltarlas sin preocuparte y el grip es más natural. La desventaja: cambiar discos lleva 30-60 segundos vs. 3 segundos de las ajustables." },
    ],
    comparison: {
      headers: ["Criterio", "Bowflex SelectTech 552", "Gorilla Sports 2x20kg", "Amazon Basics Kettlebell"],
      rows: [
        ["Precio", "~300€", "~90€", "~40€ (16kg)"],
        ["Pesos disponibles", "2-24 kg (14 niveles)", "Ajustable hasta 20kg", "Peso fijo"],
        ["Cambio de peso", "3 segundos", "30-60 segundos", "N/A"],
        ["Espacio ocupado", "Mínimo", "Más espacio + soporte", "Mínimo"],
        ["Durabilidad", "Excelente", "Buena", "Excelente"],
        ["Ejercicios ideales", "Fuerza clásica", "Fuerza clásica", "Funcional, cardio"],
      ],
    },
    conclusion: "Si tienes poco espacio y presupuesto para invertir, las Bowflex SelectTech son la solución perfecta para un home gym completo. Si el presupuesto es limitado y tienes espacio, el set Gorilla Sports cubre perfectamente las necesidades básicas. Y para entrenamiento funcional y variedad de movimientos, añade una kettlebell de 16-20 kg.",
    faqs: [
      { q: "¿Puedo hacer todos los ejercicios con mancuernas ajustables?", a: "La mayoría sí, pero con matices. Los ejercicios de press, curl, remo, sentadilla con mancuerna y extensiones se hacen perfectamente. Ejercicios que requieren soltarlas al suelo (snatch, clean) o con agarre neutro específico son mejores con mancuernas hexagonales fijas." },
      { q: "¿Hasta qué peso debo llegar con mancuernas para ver resultados?", a: "No hay un peso mágico. Lo importante es la progresión: cuando puedas hacer 3 series de 12 repeticiones con buena forma, aumenta el peso. Para mujeres adultas en forma media, llegar a curl con 10-12 kg o press con 12-15 kg ya es un nivel fitness excelente." },
      { q: "¿Son seguras las mancuernas ajustables?", a: "Sí, con el mantenimiento correcto. Comprueba periódicamente que los mecanismos de bloqueo funcionan correctamente antes de cada uso. Las marcas premium como Bowflex tienen sistemas de seguridad muy fiables. Nunca las sueltes al suelo: están diseñadas para posarlas suavemente." },
      { q: "¿Cuántos kg de mancuernas necesito para trabajar todo el cuerpo?", a: "Para un set versátil: 4-8 kg para ejercicios de hombro y tríceps, 8-15 kg para pecho y bíceps, 15-24 kg para espalda y piernas. Las mancuernas ajustables como las Bowflex cubren todo este rango en un solo par." },
      { q: "¿Kettlebell o mancuernas, qué es mejor para empezar?", a: "Depende del objetivo. Para fuerza e hipertrofia tradicional: mancuernas. Para ejercicios funcionales, trabajo cardiovascular con pesas y movimientos más dinámicos: kettlebell. Idealmente, tener ambas es lo más versátil, pero si solo puedes elegir una, empieza por mancuernas." },
    ],
  },

  "proteina-whey-guia-completa": {
    intro: "La proteína whey es el suplemento deportivo más vendido del mundo y también el más incomprendido. Desde mitos sobre el daño renal hasta confusión sobre cuándo tomarla, esta guía te da la información basada en evidencia científica para que tomes decisiones informadas. Recuerda: consulta siempre con un médico o dietista antes de empezar con cualquier suplemento.",
    sections: [
      { heading: "Qué es la proteína whey y de dónde viene", body: "La proteína whey (suero de leche) es un subproducto de la fabricación del queso. Cuando la leche se corta para hacer queso, el líquido sobrante (suero) contiene una alta concentración de proteínas de alta calidad. Este suero se filtra, concentra y seca para producir el polvo de proteína. Existen tres formas principales: concentrate (70-80% proteína, contiene lactosa), isolate (90%+ proteína, casi sin lactosa) y hydrolysate (pre-digerida, absorción más rápida)." },
      { heading: "Optimum Nutrition Gold Standard: el benchmark mundial", body: "El Gold Standard de ON lleva décadas siendo la proteína de referencia por una razón: calidad, sabor y transparencia en el etiquetado. Su mezcla de concentrate + isolate + peptides ofrece un perfil de aminoácidos completo con absorción escalonada. El sabor Double Rich Chocolate es el más vendido del mundo de cualquier proteína: se mezcla perfectamente con agua sin grumos, cosa que muchas proteínas no logran." },
      { heading: "Myprotein Impact Whey: la mejor relación calidad-precio", body: "Myprotein democratizó la proteína de calidad en España. Fabricada en UK con certificaciones de calidad exhaustivas, la Impact Whey ofrece 21g de proteína por toma a un precio que ninguna otra marca de calidad puede igualar. Los más de 80 sabores disponibles significan que siempre encontrarás uno que te guste, y hay versiones lactose-free para intolerantes." },
    ],
    comparison: {
      headers: ["Característica", "Optimum Nutrition Gold Standard", "Myprotein Impact Whey"],
      rows: [
        ["Precio/kg", "~24€/kg", "~20€/kg"],
        ["Proteína por toma", "24g", "21g"],
        ["Tipo de whey", "Concentrate + Isolate", "Concentrate"],
        ["Sabores disponibles", "~20", "80+"],
        ["Lactosa", "Sí (contiene)", "Opción lactose-free"],
        ["Certificaciones", "Informed Sport", "Informed Sport"],
        ["Mejor para", "Calidad premium", "Máximo ahorro"],
      ],
    },
    conclusion: "Para la mayoría de usuarios, Myprotein Impact Whey ofrece la mejor relación calidad-precio del mercado. Si prefieres una marca con décadas de historial y el mejor sabor del mercado, Optimum Nutrition Gold Standard justifica su precio ligeramente superior. Lo más importante: ningún suplemento reemplaza a una dieta equilibrada.",
    faqs: [
      { q: "¿La proteína whey engorda?", a: "No por sí sola. La proteína whey es simplemente proteína en polvo: 1g de proteína tiene 4 kcal. El peso se gana o se pierde según el balance calórico total. Usar proteína whey en el contexto de una dieta equilibrada no engorda; tomarla en exceso del total calórico necesario, sí." },
      { q: "¿La proteína daña los riñones?", a: "En personas sanas, no. Décadas de estudios no han encontrado evidencia de daño renal en personas sanas con ingesta alta de proteína. Sí puede ser problemático en personas con enfermedad renal preexistente. Si tienes dudas, consulta a tu médico antes de suplementarte." },
      { q: "¿Necesito tomar proteína después de entrenar?", a: "La ventana anabólica post-entrenamiento es más amplia de lo que se pensaba (4-6 horas, no 30 minutos). Lo más importante es la ingesta proteica total diaria (1.6-2.2g/kg). Tomar proteína post-entrenamiento es conveniente pero no imprescindible si ya alcanzas tu objetivo diario con comida." },
      { q: "¿Cuánta proteína necesito al día si entreno?", a: "La evidencia actual recomienda entre 1.6-2.2g de proteína por kg de peso corporal para maximizar la síntesis muscular en personas que entrenan. Para una persona de 70 kg, eso es 112-154g de proteína al día. Si no alcanzas esa cantidad con la dieta, el suplemento puede ayudar." },
      { q: "¿Los veganos pueden tomar proteína whey?", a: "No, ya que es de origen animal (suero de leche). Para veganos, existen excelentes proteínas de origen vegetal: proteína de guisante, arroz o soja. La proteína de guisante tiene un perfil de aminoácidos especialmente completo entre las opciones vegetales." },
    ],
  },

  "yoga-en-casa-principiantes": {
    intro: "El yoga es mucho más que posturas fotogénicas en redes sociales: es una práctica milenaria que combina movimiento, respiración y atención plena para mejorar simultáneamente la flexibilidad, la fuerza, el equilibrio y el bienestar mental. Y no necesitas ir a un estudio: con una buena esterilla y una conexión a internet, puedes empezar hoy en casa.",
    sections: [
      { heading: "Qué necesitas para empezar con yoga en casa", body: "El equipamiento mínimo para yoga en casa es simple: una esterilla antideslizante y ropa cómoda. Para principiantes, una esterilla más gruesa (6-10mm) como la Gaiam Essentials reduce el discomfort en posturas de rodillas. Para practicantes más avanzados, una esterilla thinner (3-5mm) como la Manduka PRO ofrece mejor conexión con el suelo en posturas de equilibrio. Opcional pero útil: un bloque y una correa de yoga para adaptar posturas a tu nivel actual." },
      { heading: "Las 7 posturas básicas que todo principiante debe aprender", body: "Postura del niño (Balasana) para descanso y extensión de espalda. Perro boca abajo (Adho Mukha Svanasana) para estirar toda la cadena posterior. Guerrero I y II (Virabhadrasana) para fuerza de piernas y apertura de cadera. Tabla (Plank) para fuerza de core. Cobra (Bhujangasana) para extensión de columna. Postura del árbol (Vrksasana) para equilibrio y concentración. Shavasana para relajación y cierre de la práctica." },
      { heading: "Tu primera rutina de 20 minutos", body: "Para empezar: 5 minutos de respiración consciente y calentamiento suave. 10 minutos de secuencia con las posturas básicas, moviéndote con la respiración (inhala para expandir, exhala para profundizar). 5 minutos de Shavasana. Practica esta rutina 3-4 veces por semana durante el primer mes antes de pasar a clases más largas o intensas." },
    ],
    comparison: {
      headers: ["Esterilla", "Manduka PRO 6mm", "Gaiam Essentials 10mm", "Nike Fundamental 3mm"],
      rows: [
        ["Precio", "~90€", "~35€", "~30€"],
        ["Grosor", "6mm", "10mm", "3mm"],
        ["Adherencia", "Excelente", "Buena", "Buena"],
        ["Peso", "3kg", "1.5kg", "1.1kg"],
        ["Garantía", "De por vida", "1 año", "1 año"],
        ["Ideal para", "Práctica seria", "Principiantes / suelo duro", "Ligera / transporte"],
      ],
    },
    conclusion: "Para empezar con yoga en casa, la Gaiam Essentials Thick de 10mm ofrece la comodidad necesaria a precio asequible. Si ya practicas yoga regularmente o quieres una inversión a largo plazo, la Manduka PRO justifica completamente su precio con una garantía de por vida y adherencia superior.",
    faqs: [
      { q: "¿Cuánto tiempo tarda en verse el resultado del yoga?", a: "La mayoría de principiantes nota mejoras en flexibilidad y postura en 2-3 semanas de práctica regular (3-4 veces/semana). Las mejoras en fuerza y equilibrio son evidentes hacia el mes. Los beneficios en estrés y bienestar mental pueden notarse desde la primera semana." },
      { q: "¿El yoga sirve para perder peso?", a: "No es la forma más eficiente de quemar calorías comparado con cardio intenso. Sin embargo, el yoga mejora la composición corporal aumentando masa muscular, reduce el cortisol (hormona del estrés relacionada con acumulación de grasa abdominal) y desarrolla mayor conciencia corporal que ayuda a una mejor alimentación." },
      { q: "¿Puedo hacer yoga con problemas de espalda?", a: "Muchas personas con dolor de espalda encuentran alivio con yoga suave. Posturas como Balasana, Gato-Vaca y el estiramiento de piriforme son especialmente beneficiosas. Sin embargo, siempre consulta con tu médico antes de empezar si tienes lesiones específicas." },
      { q: "¿Qué diferencia hay entre yoga y pilates?", a: "Aunque comparten similitudes (trabajo de cuerpo-mente, mat, respiración), el yoga tiene raíces filosóficas y espirituales más profundas y mayor variedad de estilos. El pilates se centra específicamente en el fortalecimiento del core y la alineación postural. Para flexibilidad: yoga. Para rehabilitación y core: pilates." },
      { q: "¿Necesito un profesor o puedo aprender solo con YouTube?", a: "Puedes aprender los fundamentos con YouTube (canales como Yoga With Adriene son excelentes para principiantes). Sin embargo, un profesor físico o clases de calidad son importantes para corregir posturas que podrían causar lesiones. Recomendable al menos 2-3 clases presenciales para aprender la alineación correcta." },
    ],
  },

  "perder-peso-ejercicio-casa": {
    intro: "Perder peso requiere una combinación de déficit calórico moderado y ejercicio regular. La buena noticia: no necesitas un gimnasio caro ni horas al día. Con el equipamiento correcto y un plan estructurado, puedes perder grasa de manera eficiente desde casa. Este plan de 8 semanas combina cardio y fuerza para maximizar la pérdida de grasa mientras preservas la masa muscular.",
    sections: [
      { heading: "La ciencia de la pérdida de peso con ejercicio", body: "El ejercicio ayuda a perder peso de dos formas: quema calorías durante la actividad y aumenta la tasa metabólica basal al incrementar la masa muscular. El entrenamiento de fuerza es especialmente valioso: el músculo consume más energía en reposo que la grasa. La combinación de cardio + fuerza produce mejores resultados que solo cardio. Un déficit de 300-500 kcal/día produce una pérdida sostenible de 0.5-1 kg por semana." },
      { heading: "Semanas 1-4: Base cardiovascular y técnica", body: "Las primeras 4 semanas se enfocan en crear el hábito y construir la base. Cardio: 30 minutos de cinta o bicicleta a intensidad moderada (puedes mantener una conversación), 3 días por semana. Fuerza: ejercicios básicos con peso corporal 2 días por semana. Descanso: 2 días. El objetivo es llegar a la semana 5 sin lesiones y con el hábito establecido." },
      { heading: "Semanas 5-8: Intensificación y HIIT", body: "Las últimas 4 semanas añaden intensidad. Cardio HIIT: 20 minutos de intervalos (1 min alta intensidad + 1 min recuperación) en cinta o bicicleta, 2 días por semana. Cardio continuo: 40 min a intensidad media, 1 día. Fuerza: 3 días con peso libre (mancuernas o kettlebell). La combinación HIIT + fuerza en este bloque acelera significativamente la pérdida de grasa." },
    ],
    plan: [
      {
        week: "Semanas 1-4: Base",
        description: "5 días/semana de ejercicio. 2 días de descanso activo.",
        sessions: [
          "Lunes: Cardio 30 min (cinta 8-9 km/h o bicicleta nivel medio)",
          "Martes: Fuerza — sentadillas, flexiones, zancadas, plancha",
          "Miércoles: Cardio 30 min",
          "Jueves: Descanso o yoga/estiramientos",
          "Viernes: Fuerza — peso corporal circuito",
          "Sábado: Cardio 30 min",
          "Domingo: Descanso",
        ],
      },
      {
        week: "Semanas 5-8: Intensificación",
        description: "5-6 días/semana. Añadir HIIT y pesas libres.",
        sessions: [
          "Lunes: HIIT 20 min (1 min sprint / 1 min recuperación)",
          "Martes: Fuerza con mancuernas — press, remo, curl, sentadilla",
          "Miércoles: Cardio continuo 40 min (intensidad media)",
          "Jueves: Fuerza con kettlebell — swings, goblet squat, press",
          "Viernes: HIIT 20 min",
          "Sábado: Cardio ligero 30 min + estiramientos",
          "Domingo: Descanso",
        ],
      },
    ],
    conclusion: "Este plan de 8 semanas combina lo mejor del cardio y la fuerza para una pérdida de grasa efectiva. La cinta de correr o la bicicleta estática son herramientas perfectas para el cardio, y añadir mancuernas o kettlebells en la segunda fase acelera los resultados. Recuerda: el ejercicio debe ir acompañado de una dieta adecuada.",
    faqs: [
      { q: "¿Es mejor hacer cardio o pesas para perder peso?", a: "La combinación es superior a cualquiera de los dos por separado. El cardio quema más calorías durante la sesión; la fuerza aumenta el metabolismo basal a largo plazo al incrementar la masa muscular. Estudios muestran que la combinación cardio+fuerza produce mayor pérdida de grasa que solo cardio." },
      { q: "¿Cuánto tiempo lleva perder 10 kg haciendo ejercicio en casa?", a: "Con un déficit calórico de 400-500 kcal/día (300 de ejercicio + 100-200 de dieta) y el plan descrito, puedes perder 0.5-1 kg por semana. Perder 10 kg de manera saludable lleva aproximadamente 10-20 semanas. La velocidad varía según el individuo, el metabolismo y la consistencia." },
      { q: "¿A qué hora es mejor hacer ejercicio para perder peso?", a: "No hay un momento mágico: el mejor momento es el que te permite ser consistente. El entrenamiento en ayunas (mañana antes del desayuno) puede aumentar ligeramente la oxidación de grasas pero la diferencia práctica es mínima. Prioriza la consistencia sobre el timing." },
      { q: "¿Necesito seguir una dieta específica con este plan?", a: "No una dieta restrictiva, pero sí controlar las calorías. Come con un déficit moderado (300-500 kcal menos de tu gasto diario), prioriza proteína (1.6-2g/kg) para preservar músculo, incluye frutas, verduras y carbohidratos complejos. Evita las dietas extremas: son insostenibles y contraproducentes." },
      { q: "¿Es normal que las primeras semanas no baje el peso en la báscula?", a: "Sí, muy normal. Al empezar a entrenar, el cuerpo retiene más agua en los músculos (glucógeno muscular requiere agua). Puedes estar perdiendo grasa mientras el peso se mantiene. Mide también circunferencias (cintura, cadera) y cómo te queda la ropa: son mejores indicadores que la báscula." },
    ],
  },

  "creatina-para-que-sirve": {
    intro: "La creatina monohidrato es el suplemento deportivo con mayor respaldo científico de todos los tiempos. Con más de 500 estudios clínicos y décadas de uso seguro documentado, es el único suplemento que la mayoría de organismos científicos deportivos recomiendan sin reservas. Sin embargo, sigue siendo incomprendida y rodeada de mitos. Esta guía desmonta esos mitos con ciencia real. Consulta siempre con tu médico antes de tomar cualquier suplemento.",
    sections: [
      { heading: "Qué es la creatina y cómo funciona", body: "La creatina es un compuesto natural producido por el hígado, riñones y páncreas a partir de tres aminoácidos (arginina, glicina y metionina). Se almacena principalmente en los músculos como fosfocreatina, que actúa como reserva rápida de energía (ATP) para esfuerzos de alta intensidad cortos (5-30 segundos). La suplementación con creatina satura estas reservas por encima de los niveles naturales, permitiendo mayor rendimiento en este tipo de esfuerzos." },
      { heading: "Bulk Creatina Monohidrato: creatina pura sin complicaciones", body: "La creatina monohidrato es la forma más estudiada, la más económica y la más eficaz. Las formas 'avanzadas' (creatina HCL, buffered, etc.) no ofrecen ventajas demostradas sobre el monohidrato y cuestan significativamente más. Bulk Pure Creatine ofrece creatina monohidrato 100% pura sin aditivos a un precio excelente, cumpliendo con todo lo que la ciencia demuestra que necesitas." },
      { heading: "Protocolo: carga vs. mantenimiento", body: "Existen dos protocolos: con carga (20g/día durante 5-7 días, luego 3-5g/día) o sin carga (3-5g/día desde el inicio). La carga satura los depósitos musculares en una semana; sin carga, la saturación tarda 3-4 semanas. El resultado final a largo plazo es idéntico. Para la mayoría de usuarios, el protocolo sin carga (3-5g/día consistentemente) es más práctico y mejor tolerado." },
    ],
    comparison: {
      headers: ["Característica", "Creatina Monohidrato", "Creatina HCL", "Creatina Buffered (Kre-Alkalyn)"],
      rows: [
        ["Precio/mes", "~3-5€", "~15-25€", "~15-20€"],
        ["Evidencia científica", "Muy alta (500+ estudios)", "Limitada", "Limitada"],
        ["Eficacia demostrada", "Sí", "Similar o inferior", "Similar"],
        ["Retención de agua", "Ligera (intramuscular)", "Menor", "Menor"],
        ["Necesita carga", "Opcional", "No", "No"],
        ["Veredicto", "La única necesaria", "No justifica el precio", "No justifica el precio"],
      ],
    },
    conclusion: "La creatina monohidrato pura es todo lo que necesitas. Cualquier otra forma es marketing más que ciencia. Bulk Pure Creatine o cualquier creatina monohidrato de calidad con buenos controles analíticos son la elección correcta. 3-5g al día con comida o post-entrenamiento, de forma consistente, es el protocolo más efectivo.",
    faqs: [
      { q: "¿La creatina retiene líquidos y hace parecer hinchado?", a: "La creatina produce retención de agua intramuscular (dentro del músculo, no bajo la piel). Esto puede suponer 1-2 kg de peso en agua en los primeros días, pero este agua está dentro del músculo y en realidad hace que el músculo parezca más lleno y definido, no hinchado. La retención subcutánea que hace parecer 'blandengue' no es un efecto documentado de la creatina." },
      { q: "¿La creatina es solo para hombres que quieren ponerse grandes?", a: "No. La creatina es beneficiosa para cualquier persona que haga ejercicio de alta intensidad: hombres, mujeres, jóvenes, mayores. Los estudios muestran beneficios en rendimiento deportivo, recuperación muscular y, especialmente en personas mayores, mantenimiento de masa muscular y función cognitiva." },
      { q: "¿Cuándo veré resultados con creatina?", a: "Las mejoras en fuerza y potencia empiezan a notarse en 1-2 semanas. El efecto de llenado muscular (volumización) se ve en pocos días. Para resultados óptimos, necesitas creatina consistente durante meses combinada con entrenamiento de fuerza adecuado." },
      { q: "¿Hay que ciclar la creatina o hacer descansos?", a: "No hay evidencia científica que respalde la necesidad de ciclar la creatina. Puede tomarse de manera continua indefinidamente con total seguridad. Las pausas solo significan que pierdes la saturación muscular y tardas semanas en volver a niveles óptimos." },
      { q: "¿Con qué tomar la creatina para mejor absorción?", a: "Con agua y una comida o bebida que contenga carbohidratos e insulina. La insulina mejora el transporte de creatina al músculo. Una opción práctica: mezclarla en el batido post-entrenamiento con fruta o en agua con una pieza de fruta al lado. La creatina monohidrato no tiene sabor, así que mezcla perfectamente." },
    ],
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = articleContent[slug];
  const relatedProducts = post.relatedProducts?.map((s) => getProductBySlug(s)).filter(Boolean) ?? [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "FitnessFácil.es", url: "https://www.fitnessfacil.es" },
    publisher: {
      "@type": "Organization",
      name: "FitnessFácil.es",
      logo: { "@type": "ImageObject", url: "https://www.fitnessfacil.es/logo.png" },
    },
  };

  const faqSchema = content?.faqs.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-green-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-green-200">{post.category}</span>
          </nav>
          <span className="inline-block text-xs font-semibold bg-orange-500 px-2 py-0.5 rounded-full mb-3">{post.category}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">{post.title}</h1>
          <p className="text-green-100 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-green-300">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.readTime} de lectura</span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {post.isSupplement && <SupplementDisclaimer />}
        {relatedProducts.length > 0 && <AffiliateDisclosure />}

        {content && (
          <article>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{content.intro}</p>

            {content.sections.map((section) => (
              <section key={section.heading} className="mb-8">
                <h2 className="text-xl font-extrabold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{section.body}</p>
              </section>
            ))}

            {content.comparison && (
              <section className="mb-8">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">Comparativa</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-green-700 text-white">
                        {content.comparison.headers.map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-semibold text-xs">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.comparison.rows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          {row.map((cell, j) => (
                            <td key={j} className={`px-3 py-2 border-b border-gray-100 text-xs ${j === 0 ? "font-semibold text-gray-800" : "text-gray-700"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {content.plan && (
              <section className="mb-8">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">Plan de entrenamiento</h2>
                <div className="space-y-4">
                  {content.plan.map((block) => (
                    <div key={block.week} className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-green-900 mb-1">{block.week}</h3>
                      <p className="text-xs text-green-700 mb-3">{block.description}</p>
                      <ul className="space-y-1">
                        {block.sessions.map((s) => (
                          <li key={s} className="text-sm text-green-800 flex items-start gap-1.5">
                            <span className="text-green-500 shrink-0">▸</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h2 className="text-lg font-extrabold text-gray-900 mb-3">Conclusión</h2>
              <p className="text-gray-700 leading-relaxed">{content.conclusion}</p>
            </section>
          </article>
        )}

        {relatedProducts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Productos mencionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProducts.map((p) => p && (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            {relatedProducts[0] && (
              <div className="mt-3 text-center">
                <Link href={`/tienda/${relatedProducts[0].categorySlug}`} className="text-sm text-green-700 hover:text-green-900 font-semibold">
                  Ver más en esta categoría →
                </Link>
              </div>
            )}
          </section>
        )}

        {content?.faqs && content.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {content.faqs.map((faq) => (
                <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-gray-200 pt-6">
          <Link href="/blog" className="text-green-700 hover:text-green-900 font-semibold text-sm">
            ← Volver al blog
          </Link>
        </div>
      </div>
    </>
  );
}
