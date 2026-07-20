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

// productSlug (opcional) engancha un CTA de afiliado al final de la sección.
type ArticleSection = { heading: string; body: string; productSlug?: string };

const articleContent: Record<string, {
  intro: string;
  sections: ArticleSection[];
  comparison?: { headers: string[]; rows: string[][] };
  plan?: Array<{ week: string; description: string; sessions: string[] }>;
  conclusion: string;
  faqs: Array<{ q: string; a: string }>;
}> = {
  "mejor-cinta-correr-casa-2025": {
    intro: "Una cinta de correr plegable resuelve el problema real de entrenar en casa en España: el espacio. Antes de mirar marcas conviene tener claros cuatro criterios: cuánto ocupa plegada, cuánto ruido transmite al suelo (decisivo en un piso), qué velocidad máxima alcanza y qué peso máximo soporta. Esta guía compara las dos cintas plegables del catálogo, ambas de la gama WalkingPad, para que elijas según tu perfil y no según el marketing.",
    sections: [
      {
        heading: "WalkingPad R2: la más rápida de las dos",
        body: "La R2 llega hasta 12 km/h, lo que la sitúa en territorio de carrera suave y no solo de caminata. Su motor brushless es el argumento fuerte: al no tener escobillas, funciona con menos ruido y menos mantenimiento que un motor convencional, algo que importa mucho si entrenas en un piso o a última hora. El sistema de plegado patentado deja el conjunto en unos 0,2 m² guardado, y soporta hasta 110 kg de carga. Incluye tres modos de entrenamiento (adaptativo, automático y manual), control desde la app KS Fit y mando a distancia. A favor: los 12 km/h, el motor silencioso y el plegado. En contra: es la opción más cara de las dos y el montaje inicial requiere algo de paciencia.",
        productSlug: "walkingpad-r2-cinta-plegable",
      },
      {
        heading: "WalkingPad R1 Pro: la más asequible",
        body: "La R1 Pro plantea un enfoque 2 en 1: con la barandilla plegada funciona como cinta de andar bajo el escritorio hasta 6 km/h, y desplegada como cinta de correr hasta 10 km/h. Su motor de 918 W mueve bien ambos modos. La diferencia práctica más útil frente a la R2 es que no requiere montaje: llega lista para usar, se pliega 180° y trae ruedas para moverla. A favor: 50 euros menos, el doble uso andar/correr y la ausencia de montaje. En contra: el tope de 10 km/h la deja corta si tu plan es correr series de velocidad, y su ficha no publica el dato de carga máxima, así que conviene consultarlo antes de comprar si superas los 100 kg.",
        productSlug: "walkingpad-r1-pro-cinta-plegable",
      },
      {
        heading: "¿Cuál elegir según tu perfil?",
        body: "Si tu objetivo es caminar: sumar pasos mientras teletrabajas o hacer 30-40 minutos a ritmo tranquilo, la R1 Pro cubre todo lo que necesitas y ahorra 50 euros. Si tu objetivo es correr, aunque sea de forma suave, la diferencia entre 10 y 12 km/h es más relevante de lo que parece: a 10 km/h ya vas al límite del aparato, y trabajar constantemente en el tope de una máquina acorta su vida útil. En ese caso, la R2 es la compra correcta. Si el factor decisivo es el espacio o el ruido, ambas cumplen, pero el motor brushless de la R2 tiene ventaja objetiva. Y si nunca has usado una cinta, empieza por la R1 Pro: sin montaje y con menos inversión, es la forma más barata de comprobar si el hábito se te queda.",
      },
    ],
    comparison: {
      headers: ["Criterio", "WalkingPad R2", "WalkingPad R1 Pro"],
      rows: [
        ["Precio", "399,00 €", "349,00 €"],
        ["Velocidad máx.", "12 km/h", "10 km/h (6 km/h en modo andar)"],
        ["Potencia", "Motor brushless silencioso", "918 W"],
        ["Plegado", "Patentado, 0,2 m² guardada", "180°, sin montaje, con ruedas"],
        ["Mejor para", "Correr suave y caminar", "Caminar y trotar con presupuesto ajustado"],
      ],
    },
    conclusion: "Las dos son buenas cintas plegables y la elección se reduce a una pregunta: ¿vas a correr o vas a caminar? Para caminar y trotar ocasionalmente, la WalkingPad R1 Pro ofrece lo mismo por 50 euros menos y sin montaje. Para correr con regularidad, los 12 km/h y el motor brushless de la R2 justifican la diferencia. Ninguna de las dos sustituye a una cinta de gimnasio para entrenamientos exigentes, pero ambas cumplen de sobra el objetivo de moverse más en casa.",
    faqs: [
      { q: "¿Cuánto ocupa plegada una WalkingPad?", a: "La R2 declara unos 0,2 m² en posición guardada gracias a su sistema de plegado patentado, lo que permite apoyarla contra una pared o deslizarla bajo un mueble. La R1 Pro se pliega 180° y trae ruedas de transporte. En ambos casos, ten en cuenta que el espacio de almacenamiento no es el mismo que el espacio de uso: para entrenar con seguridad necesitas al menos un metro libre por detrás." },
      { q: "¿Aguantan personas de más de 100 kg?", a: "La WalkingPad R2 declara una carga máxima de 110 kg, así que sí dentro de ese límite. La ficha de la R1 Pro no publica el dato de carga máxima, por lo que conviene consultarlo con el fabricante antes de comprar si ese es tu caso. Como norma general, usar una cinta cerca de su límite de carga acelera el desgaste del motor y de la banda." },
      { q: "¿Se puede usar en un piso de madera?", a: "Sí, pero conviene poner una alfombrilla de amortiguación debajo. Protege el parquet de las marcas de apoyo y, sobre todo, reduce la vibración que se transmite a la estructura del edificio. El ruido que molesta a los vecinos de abajo casi nunca es el motor: son las pisadas. Una alfombrilla de 6-8 mm reduce notablemente esa transmisión." },
      { q: "¿Cuánto consume en electricidad?", a: "Depende de la velocidad y del peso del usuario, porque el motor solo consume la potencia que necesita. La R1 Pro tiene un motor de 918 W, que es su consumo máximo teórico: en uso real, caminando a ritmo suave, el consumo es bastante menor. A modo orientativo, incluso funcionando cerca de su máximo durante una hora diaria, el coste mensual queda en el entorno de unos pocos euros con las tarifas domésticas habituales." },
    ],
  },

  "bicicleta-estatica-o-eliptica": {
    intro: "Bajo la etiqueta bicicleta estática caben aparatos muy distintos, y comprar el tipo equivocado es la razón más común por la que acaban arrinconados a los tres meses. No es lo mismo una bicicleta vertical pensada para sesiones de cardio serias, que un ergómetro plegable pensado para pisos sin espacio, que una mini bicicleta de pedales para usar bajo el escritorio. Esta guía compara los tres tipos con un modelo representativo de cada uno para que identifiques cuál encaja con tu espacio, tu presupuesto y tu forma real de entrenar.",
    sections: [
      {
        heading: "MERACH: para quien quiere resultados serios",
        body: "Es la opción más completa de las tres y la única pensada para entrenar de verdad, no solo para moverse. Su resistencia magnética es prácticamente silenciosa, lo que permite usarla a cualquier hora sin conflictos vecinales, y el monitor LED muestra velocidad, distancia, tiempo y calorías. Incluye app propia para seguir la evolución de los entrenamientos, algo que marca la diferencia a la hora de mantener la constancia: ver la progresión registrada es uno de los factores que más ayuda a no abandonar. Soporta hasta 136 kg, la capacidad más alta del catálogo, y el asiento acolchado permite sesiones largas sin incomodidad. A favor: silencio, app, capacidad y comodidad. En contra: no es plegable y la app es más básica que la de marcas premium.",
        productSlug: "merach-bicicleta-estatica-app-136kg",
      },
      {
        heading: "Sportstech X150: para espacios pequeños",
        body: "El X150 es un ergómetro plegable, y ahí está toda su razón de ser: se guarda cuando no se usa. Si vives en un piso donde una bicicleta fija permanente no es viable, esta es la categoría que necesitas. Ofrece 8 niveles de resistencia magnética, suficientes para progresar durante bastante tiempo en un uso doméstico, con asiento ajustable y funcionamiento silencioso. Sportstech es una marca alemana con recorrido en equipamiento doméstico, lo que aporta cierta garantía de repuestos y soporte. A favor: se pliega, es silenciosa y cuesta 35 euros menos que la MERACH. En contra: no tiene conectividad con app y los 8 niveles de resistencia pueden quedarse cortos si progresas mucho.",
        productSlug: "sportstech-x150-ergometro-plegable",
      },
      {
        heading: "Sportstech DFX70: para trabajar y pedalear",
        body: "La DFX70 no es una bicicleta estática en sentido estricto: es un pedalier, un bloque de pedales que se coloca bajo el escritorio o delante de cualquier silla. Su propósito no es sustituir a una sesión de cardio, sino combatir el sedentarismo de ocho horas sentado. Su ángulo de pedaleo permite usarla con una mesa normal, sin necesidad de escritorio elevable, y la transmisión por correa es muy silenciosa, lo que la hace viable incluso en videollamada. Trae 8 niveles de resistencia magnética, asa integrada y ruedas. A favor: 119 euros, ocupa nada y se usa mientras haces otra cosa. En contra: solo trabaja el tren inferior y no permite entrenamientos de intensidad real.",
        productSlug: "sportstech-dfx70-mini-bicicleta-escritorio",
      },
      {
        heading: "¿Cuál es la tuya?",
        body: "Si eres principiante y tu objetivo es perder grasa o mejorar el fondo con sesiones de 30-45 minutos varias veces por semana, la MERACH es la elección: es la única de las tres que permite entrenar con intensidad progresiva y registrar la evolución. Si tu limitación principal es el espacio, y guardar el aparato entre sesión y sesión es condición para que el plan funcione, el ergómetro plegable X150 es la respuesta, aceptando que renuncias a la conectividad. Y si tu problema no es entrenar sino pasar demasiadas horas sentado, la DFX70 resuelve un problema distinto y no compite con las otras dos: por 119 euros añade movimiento a la jornada laboral, pero no esperes de ella una sesión de cardio. Un error frecuente es comprar el pedalier esperando resultados de bicicleta estática; son categorías diferentes.",
      },
    ],
    comparison: {
      headers: ["Criterio", "MERACH", "Sportstech X150", "Sportstech DFX70"],
      rows: [
        ["Precio", "249,99 €", "214,00 €", "119,00 €"],
        ["Tipo", "Estática vertical", "Ergómetro plegable", "Mini bici de escritorio"],
        ["Plegable", "No, es fija", "Sí", "Compacta, con asa y ruedas"],
        ["App / conectividad", "App propia + monitor LED", "Sin app, consola básica", "Sin app"],
        ["Mejor para", "Entrenar en serio en casa", "Pisos sin espacio", "Pedalear mientras trabajas"],
      ],
    },
    conclusion: "No hay una bicicleta estática mejor que otra: hay tres categorías que resuelven tres problemas distintos. La MERACH es la compra correcta si vas a entrenar de verdad y tienes sitio donde dejarla. El Sportstech X150 es la opción si el espacio manda y necesitas plegarla. Y la DFX70 no compite con ninguna de las dos: es la respuesta al sedentarismo del teletrabajo, no a un plan de entrenamiento. Identifica primero cuál de esos tres problemas es el tuyo y la elección se vuelve evidente.",
    faqs: [
      { q: "¿Cuántas calorías quema una bicicleta estática en 30 minutos?", a: "A intensidad moderada, una persona de unos 75 kg quema aproximadamente entre 200 y 250 kcal en 30 minutos. A intensidad alta puede superar las 300 kcal. Son cifras orientativas: el gasto real depende del peso, del nivel de forma y de la intensidad sostenida. Los contadores de calorías de las consolas suelen sobreestimar, porque no conocen tu peso real ni tu frecuencia cardíaca." },
      { q: "¿Es mejor bici estática o cinta de correr para adelgazar?", a: "A igualdad de intensidad y tiempo, la cinta suele quemar algo más porque implica soportar el peso corporal y activa más musculatura. Pero esa ventaja teórica importa poco frente al factor decisivo: cuál vas a usar de forma constante. La bicicleta tiene menos impacto articular, hace menos ruido y suele ocupar menos, así que para muchas personas es la opción que realmente se mantiene en el tiempo. El mejor aparato para adelgazar es el que sigues usando en el mes seis." },
      { q: "¿Cuánto ruido hace una bicicleta estática magnética?", a: "Muy poco. La resistencia magnética no genera fricción física entre piezas, así que el sonido dominante es el del propio pedaleo y el de la transmisión por correa. En la práctica permite ver la televisión a volumen normal o mantener una conversación mientras pedaleas. Es notablemente más silenciosa que una cinta de correr, donde el ruido de las pisadas se transmite al suelo." },
      { q: "¿Merece la pena la conectividad con app?", a: "Depende de tu perfil. La app no mejora el entrenamiento en sí, pero registra la progresión, y para bastantes personas ver esa evolución es justo lo que sostiene el hábito los primeros meses. Si sabes que te motiva el seguimiento de datos, es un extra que se aprovecha. Si nunca has usado apps de fitness o sabes que no vas a abrirlas, no pagues por ello: un ergómetro sin conectividad como el X150 entrena exactamente igual." },
    ],
  },

  "rutina-entrenamiento-casa-sin-equipamiento": {
    intro: "La falta de material es la excusa más repetida y la más fácil de desmontar: con el peso del propio cuerpo se puede construir una base de fuerza sólida sin comprar absolutamente nada. Lo que sigue es una rutina estructurada de cinco días con dos de descanso, pensada para alguien que empieza desde cero y necesita un plan concreto en lugar de una lista de ejercicios sueltos. Al final encontrarás cuándo tiene sentido añadir el primer equipamiento y cuál conviene que sea.",
    sections: [
      {
        heading: "Los tres errores que arruinan el progreso",
        body: "El primero es entrenar en frío. Cinco o diez minutos de movilidad articular y activación suave reducen el riesgo de lesión y mejoran el rendimiento de la sesión; saltárselos para ganar tiempo es la peor economía posible. El segundo es no progresar: si llevas dos meses haciendo las mismas 4 series de 12 sentadillas, tu cuerpo dejó de recibir un estímulo de adaptación hace semanas. La progresión con peso corporal se consigue añadiendo repeticiones, reduciendo el descanso, ralentizando la fase excéntrica o pasando a una variante más difícil. El tercero es no descansar: el músculo no crece durante el entrenamiento sino durante la recuperación, y encadenar días sin descanso produce estancamiento y lesiones, no resultados más rápidos.",
      },
      {
        heading: "Cuándo añadir equipamiento",
        body: "El momento llega cuando el propio peso deja de suponer un desafío: cuando completas todas las series al máximo de repeticiones con técnica limpia y sin llegar cerca del fallo. En ese punto tienes dos caminos: complicar los ejercicios o añadir resistencia externa. Las bandas elásticas son el paso natural más económico, y con diferencia. Un set de cuatro bandas con niveles progresivos cubre desde asistencia en dominadas hasta resistencia en sentadillas, press y remo, ocupa lo que un puño y cuesta menos que una sola mancuerna. Las de TPE sin látex tienen la ventaja añadida de ser aptas para personas con alergia al látex, un detalle que se pasa por alto hasta que es un problema.",
        productSlug: "fokky-bandas-elasticas-set-4-tpe",
      },
      {
        heading: "La esterilla: el único extra que notarás desde el primer día",
        body: "Si vas a comprar una sola cosa antes que ninguna otra, que sea una esterilla. Las planchas, los abdominales, el puente de glúteo y cualquier trabajo de suelo sobre parquet o baldosa son incómodos hasta el punto de que se acaban evitando, y un ejercicio que se evita es un ejercicio que no existe en tu rutina. Una esterilla de TPE de 6 mm resuelve el problema por menos de 30 euros, y el TPE tiene la ventaja de no llevar PVC ni látex y pesar poco. Si además la vas a mover por casa o llevarla fuera, valora que incluya bolsa y correa de transporte: parece un detalle menor y determina si acaba guardada en un armario o siempre a mano.",
        productSlug: "toplus-esterilla-yoga-tpe-6mm",
      },
    ],
    comparison: {
      headers: ["Día", "Ejercicios", "Series × repeticiones"],
      rows: [
        ["Día 1 — Pierna y glúteo", "Sentadillas · Zancadas · Puente de glúteo · Sentadilla sumo", "4×12 · 3×10 por lado · 4×15 · 3×12"],
        ["Día 2 — Empuje", "Flexiones · Flexiones diamante · Fondos en silla · Plancha", "4×10 · 3×8 · 3×12 · 3×30 s"],
        ["Día 3 — Descanso activo", "Caminata suave o sesión de estiramientos", "30 min"],
        ["Día 4 — Tirón y core", "Remo invertido en mesa · Superman · Plancha lateral · Mountain climbers", "3×10 · 4×12 · 3×20 s por lado · 3×20"],
        ["Día 5 — Full body", "Burpees · Jumping jacks · Sentadilla con press · Plancha", "3×8 · 3×30 s · 3×10 · 3×45 s"],
        ["Días 6 y 7 — Descanso", "Recuperación completa", "—"],
      ],
    },
    conclusion: "Esta rutina cubre los cinco patrones de movimiento fundamentales (sentadilla, empuje, tirón, bisagra de cadera y core) sin necesitar nada más que suelo y una silla. Mantenla cuatro u ocho semanas aplicando progresión real y notarás cambios claros en fuerza y resistencia. Cuando el peso corporal deje de suponer un reto, unas bandas elásticas por poco más de 12 euros multiplican las posibilidades sin ocupar espacio. Y si vas a entrenar en suelo duro, la esterilla es la primera compra, no la última.",
    faqs: [
      { q: "¿Cuántas veces a la semana entrenar en casa sin equipamiento?", a: "Entre tres y cinco sesiones semanales es el rango donde está el equilibrio para la mayoría de personas. Menos de tres hace difícil consolidar el hábito y el estímulo se diluye; más de cinco sin experiencia previa suele llevar a fatiga acumulada y abandono. La rutina de este artículo propone cuatro días de trabajo, uno de descanso activo y dos de descanso completo, que es una distribución sostenible para empezar." },
      { q: "¿Se puede ganar músculo sin pesas?", a: "Sí, sobre todo en los primeros meses, cuando el cuerpo responde con rapidez a cualquier estímulo nuevo. La hipertrofia depende de tensión mecánica, volumen y progresión, y el peso corporal puede aportar los tres si se manejan bien las variantes y las repeticiones. El límite aparece más adelante: llega un punto en el que resulta difícil seguir aumentando la dificultad solo con el propio cuerpo, y ahí la resistencia externa (bandas o mancuernas) pasa de opcional a necesaria." },
      { q: "¿Cuánto tiempo tarda en notarse el entrenamiento en casa?", a: "Las primeras mejoras son neuronales y se notan pronto: en dos o tres semanas harás más repeticiones con mejor técnica, aunque el espejo no muestre nada todavía. Los cambios visibles en composición corporal suelen empezar a apreciarse entre la cuarta y la octava semana, siempre que la alimentación acompañe. Conviene medir progreso por repeticiones completadas y por cómo sienta la ropa, no solo por la báscula." },
      { q: "¿Qué es mejor: HIIT o entrenamiento de fuerza en casa?", a: "Resuelven objetivos distintos y no son excluyentes. El HIIT genera un gasto calórico alto en poco tiempo y mejora la capacidad cardiovascular; el entrenamiento de fuerza construye y preserva masa muscular, que es lo que sostiene el metabolismo a largo plazo. Si el objetivo es perder grasa manteniendo músculo, la combinación de ambos supera claramente a cualquiera de los dos por separado. Si solo puedes elegir uno y partes de cero, empieza por la fuerza." },
    ],
  },

  "mancuernas-ajustables-merece-pena": {
    intro: "Las mancuernas ajustables prometen sustituir una estantería entera de hierro por un solo par, y el argumento es real, pero el precio de entrada hace dudar con razón. Este análisis responde a la pregunta de forma honesta: no hay una respuesta universal, hay dos variables que deciden por ti. Cuánto espacio tienes y durante cuánto tiempo piensas seguir entrenando. Según cómo respondas a esas dos, la compra correcta cambia por completo.",
    sections: [
      {
        heading: "Cuándo SÍ merece la pena una mancuerna ajustable",
        body: "Hay tres escenarios donde la inversión se justifica sin discusión. El primero es la progresión: si vas a entrenar durante años, necesitarás pesos cada vez mayores, y comprar pares fijos sucesivos acaba costando más que un ajustable y llenando la casa de hierro que ya no usas. El segundo es el espacio: un par de ajustables ocupa lo que un par fijo y cubre el rango de quince, algo determinante en un piso. El tercero es la variedad: si entrenas cuerpo completo, necesitas cargas distintas para press de hombro y para remo o sentadilla, y cambiar de peso en segundos es lo que permite encadenar ejercicios sin romper el ritmo de la sesión.",
      },
      {
        heading: "Cuándo NO merece la pena",
        body: "También hay casos claros en contra. Si vas a usar siempre el mismo peso, para un circuito fijo o para rehabilitación, estás pagando un mecanismo que no aprovechas: un par fijo cuesta una fracción. Si tu entrenamiento es funcional, con swings, cargadas o movimientos balísticos, las ajustables no son la herramienta: no se pueden soltar contra el suelo sin dañar el mecanismo y su forma no acompaña esos gestos; ahí la kettlebell es superior. Y si tu presupuesto está por debajo de los 60 euros, la comparación ni siquiera se plantea: es mejor un par de mancuernas fijas de calidad que un ajustable barato con un sistema de bloqueo en el que no confiarías con carga alta sobre la cara.",
      },
      {
        heading: "LULLAX NEO36: para quien quiere crecer a largo plazo",
        body: "Son las ajustables premium del catálogo y su planteamiento va más allá del rango de peso. Cubren de 2,5 a 36 kg por mancuerna en 14 posiciones, de modo que el par equivale a quince juegos de mancuernas tradicionales. El detalle que las diferencia del resto: al seleccionar un peso inferior al máximo, la mancuerna reduce su longitud física, lo que mejora la maniobrabilidad en ejercicios de brazo donde una mancuerna larga estorba. Incluyen base de almacenamiento. A favor: 36 kg por mano dan margen de progresión para años, el cambio de peso es rápido y la construcción es sólida. En contra: 349 euros son una barrera de entrada real, y para un usuario avanzado con años de fuerza acumulados, 36 kg pueden acabar quedándose cortos en tirón.",
        productSlug: "lullax-neo36-mancuernas-ajustables",
      },
      {
        heading: "ManiBoom 15 kg: la entrada equilibrada",
        body: "Si las NEO36 son la inversión a largo plazo, las ManiBoom son la puerta de entrada sensata. Su diseño hexagonal evita que rueden por el suelo, un detalle práctico que se agradece cada sesión y que las mancuernas cilíndricas no resuelven. El sistema es de discos con cierre de seguridad, e incluyen una barra que permite unir ambas mancuernas y convertirlas en barra larga, ampliando el repertorio a press de banca, remo con barra o sentadilla frontal. Las empuñaduras son antideslizantes. A favor: por 59,99 euros cubren la mayoría de ejercicios de un principiante o intermedio, y el 2 en 1 con barra multiplica opciones. En contra: 15 kg por mancuerna es un techo que se alcanza antes de lo que parece en ejercicios de pierna y espalda, y cambiar discos manualmente lleva su tiempo.",
        productSlug: "maniboom-mancuernas-hexagonales-15kg",
      },
      {
        heading: "JOWY Kettlebell 16 kg: para entrenamiento funcional",
        body: "La kettlebell no compite con las mancuernas: hace otra cosa. Su centro de gravedad desplazado respecto al asa es justo lo que permite los movimientos balísticos (swing, snatch, clean) que ninguna mancuerna reproduce bien, y esos gestos trabajan la cadena posterior y el sistema cardiovascular a la vez. Los 16 kg son el peso de entrada estándar para hombres adultos y un peso de trabajo sólido para mujeres con algo de experiencia. Esta es de PVC relleno de arena de acero, lo que significa que no daña el suelo al apoyarla, una diferencia importante frente al hierro fundido si entrenas en casa sin plataforma. A favor: 34,99 euros, no marca el parquet y abre toda la familia de ejercicios funcionales. En contra: un solo peso fijo, y su volumen es mayor que el de una kettlebell de hierro equivalente.",
        productSlug: "jowy-kettlebell-pvc-16kg",
      },
    ],
    comparison: {
      headers: ["Criterio", "LULLAX NEO36", "ManiBoom 15 kg", "JOWY Kettlebell 16 kg"],
      rows: [
        ["Precio", "349,00 €", "59,99 €", "34,99 €"],
        ["Peso máximo", "36 kg por mancuerna (14 posiciones)", "15 kg por mancuerna", "16 kg fijo"],
        ["Tipo", "Ajustable de selección rápida", "Ajustable por discos, hexagonal", "Kettlebell de PVC"],
        ["Mejor ejercicio", "Press y remo con progresión", "Curl, press y remo con barra 2 en 1", "Swing, goblet squat, turkish get-up"],
        ["Para quién", "Progresión a años vista", "Empezar sin gastar de más", "Entrenamiento funcional y cardio"],
      ],
    },
    conclusion: "Si vas a entrenar de forma sostenida durante años y el espacio manda, las LULLAX NEO36 son la compra que no repetirás: 36 kg por mano cubren prácticamente cualquier progresión doméstica. Si estás empezando y no quieres arriesgar 349 euros en un hábito sin consolidar, las ManiBoom por 59,99 euros hacen el trabajo y la barra 2 en 1 añade recorrido. Y si lo que buscas es entrenamiento funcional y acondicionamiento, la kettlebell JOWY no es una alternativa a las anteriores sino un complemento: muchos home gyms acaban teniendo ambas cosas.",
    faqs: [
      { q: "¿Qué peso de mancuernas es bueno para empezar?", a: "Para una persona adulta sin experiencia previa, un rango de 5 a 10 kg por mancuerna cubre la mayoría de ejercicios de tren superior las primeras semanas, y de 10 a 15 kg para tren inferior y espalda. La referencia práctica no es un número absoluto sino la técnica: el peso correcto es el que te permite completar todas las repeticiones de la última serie con buena forma y algo de margen. Si la técnica se rompe antes de terminar, sobra peso." },
      { q: "¿Es mejor kettlebell o mancuernas para quemar grasa?", a: "La kettlebell tiene ventaja en gasto calórico por sesión porque sus movimientos balísticos implican todo el cuerpo y elevan la frecuencia cardíaca de forma sostenida: un circuito de swings se parece más a un HIIT que a una serie de fuerza. Las mancuernas son superiores para construir y mantener masa muscular con trabajo analítico. Como la masa muscular es lo que sostiene el metabolismo a largo plazo, la respuesta útil vuelve a ser la combinación de ambas." },
      { q: "¿Cuánto duran las mancuernas ajustables?", a: "Con uso doméstico y cuidado razonable, muchos años. El punto débil no es el hierro sino el mecanismo de selección, y su enemigo número uno es soltarlas contra el suelo: están diseñadas para posarse, no para dejarse caer. Conviene revisar periódicamente que el sistema de bloqueo encaja con firmeza antes de cada serie, sobre todo en ejercicios por encima de la cabeza." },
      { q: "¿Se pueden hacer sentadillas con mancuernas en casa?", a: "Sí, y son uno de los ejercicios donde mejor rinden. La sentadilla goblet, sujetando una mancuerna vertical contra el pecho, es especialmente recomendable para principiantes porque la posición del peso ayuda a mantener el torso erguido y corrige la técnica de forma natural. También funcionan bien las sentadillas búlgaras con una mancuerna en cada mano. La limitación aparece cuando tus piernas son lo bastante fuertes como para necesitar más carga de la que puedes sostener con las manos." },
    ],
  },

  "proteina-whey-guia-completa": {
    intro: "La proteína whey es el suplemento deportivo más vendido del mundo y también el más rodeado de mitos, desde el supuesto daño renal hasta la obsesión con la ventana anabólica. Esta guía reúne lo que respalda la evidencia científica actual para que decidas con criterio si la necesitas y cuál comprar. Como con cualquier suplemento, consulta con tu médico o con un dietista-nutricionista antes de incorporarla, especialmente si tienes alguna patología previa.",
    sections: [
      {
        heading: "Qué es la proteína whey y de dónde viene",
        body: "La proteína whey (suero de leche) es un subproducto de la fabricación del queso. Cuando la leche se corta, el líquido sobrante contiene proteínas de alto valor biológico que se filtran, concentran y secan hasta obtener el polvo. Existen tres formas principales. El concentrado ronda el 70-80 % de proteína y conserva algo de lactosa y grasa. El aislado supera el 90 % y elimina casi toda la lactosa, lo que lo hace apto para la mayoría de intolerantes. El hidrolizado está predigerido para una absorción más rápida, una ventaja marginal que rara vez justifica su precio. Para la inmensa mayoría de personas, un buen concentrado cumple exactamente el mismo objetivo que una fórmula más cara.",
      },
      {
        heading: "Optimum Nutrition Gold Standard: la referencia del mercado",
        body: "Lleva más de tres décadas siendo el estándar contra el que se comparan las demás, y no por casualidad. Su fórmula combina concentrado y aislado de suero, con el aislado como ingrediente principal, lo que da un perfil completo de aminoácidos con BCAA y glutamina naturalmente presentes. Aporta 24 g de proteína por servicio y el bote de 2,26 kg rinde 73 servicios. El punto que más se valora en el uso diario es que se disuelve sin grumos en agua, algo que muchas proteínas más baratas no consiguen y que determina si acabas tomándola o no. Está certificada por Informed Choice, el programa de análisis antidopaje que verifica la ausencia de sustancias prohibidas, un dato relevante si compites en federación.",
        productSlug: "optimum-nutrition-gold-standard-whey-226kg",
      },
      {
        heading: "Myprotein Impact Whey: la mejor relación calidad-precio",
        body: "Myprotein hizo accesible la proteína de calidad en España y su Impact Whey sigue siendo la referencia en la relación entre precio y calidad. Aporta 21 g de proteína por servicio en un formato de 1 kg que rinde 40 raciones, es baja en grasa y carbohidratos, y está disponible en múltiples sabores, de los que el de galletas y crema es uno de los más populares. Es un concentrado, no un aislado: la diferencia práctica está en que conserva algo más de lactosa, así que si tienes intolerancia notable te sentará mejor un aislado. A cambio, el coste por kilo es sensiblemente inferior al de las opciones premium, lo que la convierte en la entrada lógica para quien empieza a suplementarse.",
        productSlug: "myprotein-impact-whey-1kg-galletas",
      },
    ],
    comparison: {
      headers: ["Característica", "ON Gold Standard", "Myprotein Impact Whey"],
      rows: [
        ["Precio", "54,99 € (2,26 kg)", "20,00 € (1 kg)"],
        ["Precio por kilo", "~24 €/kg", "~20 €/kg"],
        ["Proteína por servicio", "24 g", "21 g"],
        ["Servicios por envase", "73", "40"],
        ["Tipo de whey", "Concentrado + aislado", "Concentrado"],
        ["Lactosa", "Contiene", "Contiene"],
        ["Certificación antidopaje", "Informed Choice", "No especificada en ficha"],
        ["Mejor para", "Calidad y certificación", "Máximo ahorro por servicio"],
      ],
    },
    conclusion: "Para la mayoría de personas, Myprotein Impact Whey ofrece la mejor relación calidad-precio y cumple de sobra el objetivo de completar la ingesta proteica diaria. Si compites en federación y necesitas certificación antidopaje, o simplemente valoras el historial y la disolución sin grumos, Optimum Nutrition Gold Standard justifica su precio superior. Lo esencial no cambia con la marca: ningún suplemento sustituye a una dieta equilibrada, y la proteína en polvo solo tiene sentido si no llegas a tu objetivo diario con comida real.",
    faqs: [
      { q: "¿La proteína whey engorda?", a: "No por sí sola. La proteína whey es proteína en polvo: 1 g aporta 4 kcal, igual que la de cualquier alimento. El peso se gana o se pierde según el balance calórico total del día. Integrada en una dieta equilibrada no engorda; si la añades por encima de las calorías que necesitas, sumará como sumaría cualquier otro alimento." },
      { q: "¿La proteína daña los riñones?", a: "En personas sanas, la evidencia acumulada durante décadas no ha encontrado relación entre una ingesta alta de proteína y daño renal. La situación es distinta en personas con enfermedad renal previa, donde sí suele estar indicado limitar la ingesta proteica bajo control médico. Si tienes cualquier patología renal o dudas sobre tu función renal, consulta con tu médico antes de suplementarte." },
      { q: "¿Necesito tomar proteína justo después de entrenar?", a: "La llamada ventana anabólica es bastante más amplia de lo que se creía: se habla de varias horas, no de treinta minutos. Lo que determina la síntesis muscular es la ingesta proteica total del día repartida de forma razonable, no el minuto exacto del batido. Tomarla después de entrenar es cómodo y funciona, pero no es imprescindible si ya alcanzas tu objetivo diario con comida." },
      { q: "¿Cuánta proteína necesito al día si entreno?", a: "La evidencia actual sitúa el rango óptimo entre 1,6 y 2,2 g de proteína por kilo de peso corporal al día para personas que entrenan con el objetivo de ganar o mantener masa muscular. Para alguien de 70 kg son entre 112 y 154 g diarios. Si llegas a esa cifra con comida, no necesitas suplemento; si no llegas, el batido es una forma práctica y económica de completar." },
      { q: "¿Los veganos pueden tomar proteína whey?", a: "No, porque procede del suero de la leche y es de origen animal. Las alternativas vegetales son perfectamente válidas: la proteína de guisante tiene un perfil de aminoácidos notablemente completo, y las mezclas de guisante con arroz cubren muy bien las carencias de cada una por separado. La proteína de soja es otra opción con perfil completo." },
    ],
  },

  "yoga-en-casa-principiantes": {
    intro: "Para empezar a practicar yoga en casa no hacen falta ni un estudio ni una clase presencial: bastan unos dos metros cuadrados de suelo libre, una esterilla y algo de constancia. El yoga combina movimiento, respiración y atención en una misma práctica, y por eso mejora a la vez flexibilidad, fuerza, equilibrio y gestión del estrés. Esta guía explica qué esterilla necesitas realmente, en qué fijarte al comprarla y con qué diez posturas conviene empezar.",
    sections: [
      {
        heading: "¿Qué esterilla necesitas para yoga en casa?",
        body: "Cuatro criterios deciden la compra. El grosor: entre 4 y 6 mm es el rango estándar para yoga, porque amortigua sin comprometer la estabilidad; por encima de 8 mm gana comodidad en trabajo de suelo pero se vuelve inestable en posturas de equilibrio como el árbol. El material: el TPE es ligero, no lleva PVC ni látex y resulta más ecológico que el PVC tradicional, que a cambio dura más y agarra algo mejor con sudor. Las medidas: 183 × 61 cm es el estándar y cubre a la mayoría de personas; si mides más de 1,80 m, comprueba que la longitud te sirva. Y la adherencia: que sea antideslizante por ambas caras importa tanto como el grosor, porque una esterilla que se desplaza sobre el parquet arruina cualquier secuencia.",
      },
      {
        heading: "La Mente Es Maravillosa: la más completa por precio",
        body: "Es una de las más vendidas de su categoría en Amazon España y su argumento es el conjunto, no una característica aislada. Mide 183 × 61 cm en TPE con certificación SGS, que acredita la ausencia de PVC, PER y sustancias tóxicas, un dato relevante si vas a pasar horas con la cara a centímetros del material. Es antideslizante por ambas caras y de alta densidad, lo que reduce el desgarro con el uso continuado. Lo que la distingue es lo que incluye: bolsa de transporte, correa de hombro y un e-book de ejercicios en español, algo poco habitual a este precio. A favor: el paquete completo por 29,99 euros y la certificación del material. En contra: su ficha no especifica el grosor, así que si buscas una amortiguación concreta es un dato que tendrás que confirmar.",
        productSlug: "la-mente-es-maravillosa-esterilla-tpe",
      },
      {
        heading: "TOPLUS 6 mm: la más gruesa y con grosor confirmado",
        body: "La TOPLUS juega la carta contraria: menos accesorios y más especificación técnica. Sus 6 mm de TPE en estructura de doble capa están en el límite superior del rango recomendado para yoga, lo que la hace especialmente cómoda para posturas de rodillas y trabajo de suelo sobre superficies duras sin llegar al exceso de las esterillas de 10 mm. La textura antideslizante es patentada y mantiene el agarre incluso con sudor, algo que importa si practicas estilos dinámicos como vinyasa. Está libre de PVC, látex, ftalatos y químicos tóxicos, e incluye correa de hombro. A favor: 6 mm confirmados, doble capa y buen agarre en práctica intensa. En contra: cuesta prácticamente lo mismo que la anterior sin incluir bolsa ni e-book, y el grosor puede resultar excesivo para quien priorice el equilibrio.",
        productSlug: "toplus-esterilla-yoga-tpe-6mm",
      },
      {
        heading: "Diez posturas básicas para empezar",
        body: "Montaña (mountain / tadasana): la postura de referencia, de pie, para alinear el cuerpo y encontrar la respiración. Guerrero I (warrior I / virabhadrasana I): fuerza de piernas y apertura de cadera y pecho. Árbol (tree / vrksasana): equilibrio y concentración sobre una pierna. Perro boca abajo (downward dog / adho mukha svanasana): estira toda la cadena posterior y fortalece hombros. Cobra (cobra / bhujangasana): extensión suave de columna, ideal tras horas sentado. Postura del niño (child's pose / balasana): descanso activo y alargamiento lumbar, la postura a la que volver siempre que necesites parar. Gato-vaca (cat-cow / marjaryasana-bitilasana): moviliza la columna vértebra a vértebra y es el mejor calentamiento posible. Mariposa (butterfly / baddha konasana): apertura de cadera e ingles sentado. Torsión sentada (seated twist / ardha matsyendrasana): rotación de columna y masaje abdominal. Savasana: tumbado, inmóvil, cinco minutos de cierre; parece la más fácil y es la que más se salta, aunque es donde se integra todo el trabajo anterior.",
      },
    ],
    comparison: {
      headers: ["Criterio", "La Mente Es Maravillosa", "TOPLUS 6 mm", "Qué valorar"],
      rows: [
        ["Precio", "29,99 €", "27,99 €", "Entre 25 y 35 € hay opciones solventes"],
        ["Grosor", "No especificado en ficha", "6 mm", "4-6 mm para yoga; más de 8 resta estabilidad"],
        ["Material", "TPE certificado SGS", "TPE de doble capa", "TPE: ligero, sin PVC ni látex"],
        ["Extras", "Bolsa + correa + e-book", "Correa de hombro", "La bolsa importa si la transportas"],
        ["Mejor para", "Empezar con todo incluido", "Suelo duro y práctica dinámica", "—"],
      ],
    },
    conclusion: "Entre las dos hay dos euros de diferencia y ninguna es mala compra. La de La Mente Es Maravillosa gana si valoras llevarte el conjunto resuelto: bolsa, correa y guía de ejercicios en español por 29,99 euros. La TOPLUS gana si te importa saber exactamente qué grosor estás comprando y vas a practicar sobre suelo duro o con estilos que hacen sudar. Lo que no conviene es empezar sin esterilla: practicar sobre parquet o baldosa hace incómodas justo las posturas de suelo que más benefician a un principiante.",
    faqs: [
      { q: "¿Cuánto dura una sesión de yoga para principiantes?", a: "Entre 20 y 30 minutos es un buen punto de partida: suficiente para trabajar de verdad y lo bastante corto como para no convertirse en una barrera los días de poca motivación. Una estructura que funciona: cinco minutos de respiración y movilidad, quince o veinte de secuencia con las posturas básicas y cinco de savasana. Con el tiempo, las sesiones de 45 a 60 minutos llegan solas." },
      { q: "¿Necesito ser flexible para hacer yoga?", a: "No, y es probablemente el malentendido más extendido. La flexibilidad es un resultado de la práctica, no un requisito para empezar; esperar a ser flexible para hacer yoga es como esperar a estar en forma para empezar a entrenar. Todas las posturas admiten variantes adaptadas, y elementos como un bloque o una correa permiten ejecutar correctamente cualquier postura desde el primer día." },
      { q: "¿Cuántas veces a la semana practicar yoga?", a: "Tres o cuatro sesiones semanales producen mejoras claras en flexibilidad, fuerza y postura en pocas semanas. Dicho eso, el yoga es de las prácticas que mejor toleran la frecuencia diaria si las sesiones son suaves: quince minutos cada mañana rinden más que una sesión larga y aislada el domingo. La regularidad pesa más que la duración." },
      { q: "¿Qué diferencia hay entre yoga y pilates?", a: "Comparten el trabajo cuerpo-mente, la esterilla y la atención a la respiración, pero tienen orígenes y objetivos distintos. El yoga es una práctica milenaria de raíz filosófica, con gran variedad de estilos y más énfasis en flexibilidad, equilibrio y componente meditativo. El pilates es un método del siglo XX centrado en el fortalecimiento del core y la corrección postural. Para ganar flexibilidad y gestionar el estrés, yoga; para reforzar el centro y trabajar la postura, pilates." },
    ],
  },

  "perder-peso-ejercicio-casa": {
    intro: "Perder peso requiere un déficit calórico sostenido y ejercicio regular, y ninguna de las dos cosas exige un gimnasio caro ni dos horas al día. Con el equipamiento adecuado y un plan estructurado se puede perder grasa de forma eficiente desde casa. Este plan de ocho semanas combina cardio y fuerza deliberadamente: el cardio maximiza el gasto durante la sesión y la fuerza preserva la masa muscular, que es lo que evita que el metabolismo se hunda a mitad del proceso.",
    sections: [
      {
        heading: "La ciencia de la pérdida de peso con ejercicio",
        body: "El ejercicio contribuye por dos vías. La directa: quema calorías durante la actividad. La indirecta, y más importante a largo plazo: el entrenamiento de fuerza aumenta la masa muscular, y el músculo consume más energía en reposo que la grasa, de modo que eleva el gasto basal las veinticuatro horas del día. Por eso la combinación de cardio y fuerza supera de forma consistente al cardio aislado en los estudios sobre composición corporal. Un déficit de 300 a 500 kcal diarias produce una pérdida sostenible de entre 0,5 y 1 kg por semana; déficits mayores aceleran la báscula a corto plazo pero sacrifican músculo y son mucho más difíciles de mantener.",
      },
      {
        heading: "Semanas 1-4: base cardiovascular y técnica",
        body: "El primer bloque construye el hábito, no el resultado. Tres sesiones semanales de 30 minutos de cardio a intensidad moderada, entendiendo por moderada aquella en la que aún puedes mantener una conversación, más dos días de fuerza con peso corporal. Una cinta plegable resuelve bien esta fase porque elimina la variable meteorológica y la del horario: la WalkingPad R1 Pro permite caminar a 6 km/h bajo el escritorio o trotar hasta 10 km/h cuando toca sesión, y al no necesitar montaje está operativa desde el primer día. El objetivo de estas cuatro semanas es llegar a la quinta sin molestias articulares y con la rutina ya instalada en el calendario.",
        productSlug: "walkingpad-r1-pro-cinta-plegable",
      },
      {
        heading: "Semanas 5-8: intensificación con HIIT",
        body: "El segundo bloque sube la intensidad. Dos sesiones semanales de HIIT de 20 minutos en formato de intervalos (un minuto fuerte, un minuto de recuperación), una sesión de cardio continuo de 40 minutos y tres días de fuerza. La bicicleta estática es la herramienta ideal para el HIIT doméstico porque permite cambiar de intensidad al instante y sin impacto articular, algo que la carrera no ofrece: una bicicleta con resistencia magnética y seguimiento por app como la MERACH facilita controlar los intervalos y registrar la progresión, que es justo lo que sostiene la motivación en esta fase.",
        productSlug: "merach-bicicleta-estatica-app-136kg",
      },
      {
        heading: "Añadir resistencia sin llenar la casa de hierro",
        body: "A partir de la quinta semana el trabajo de fuerza necesita más estímulo del que da el peso corporal, y no hace falta montar un gimnasio para conseguirlo. Un set de bandas elásticas con varios niveles de resistencia cubre press, remo, sentadilla y trabajo de glúteo, se guarda en un cajón y permite además añadir resistencia a los circuitos de HIIT sin aumentar el impacto sobre las articulaciones, algo especialmente relevante si partes de un peso elevado. Es la forma más económica de introducir carga progresiva en un plan de pérdida de peso doméstico.",
        productSlug: "fokky-bandas-elasticas-set-4-tpe",
      },
    ],
    plan: [
      {
        week: "Semanas 1-4: base",
        description: "5 días de actividad y 2 de descanso. Intensidad moderada, prioridad a la técnica.",
        sessions: [
          "Lunes: cardio 30 min (cinta a 6-9 km/h o bicicleta a nivel medio)",
          "Martes: fuerza — sentadillas, flexiones, zancadas y plancha",
          "Miércoles: cardio 30 min a ritmo constante",
          "Jueves: descanso activo — estiramientos o yoga suave",
          "Viernes: fuerza — circuito de peso corporal",
          "Sábado: cardio 30 min",
          "Domingo: descanso completo",
        ],
      },
      {
        week: "Semanas 5-8: intensificación",
        description: "5-6 días. Se añaden HIIT y resistencia con bandas elásticas.",
        sessions: [
          "Lunes: HIIT 20 min en bicicleta (1 min fuerte / 1 min recuperación)",
          "Martes: fuerza con bandas — press, remo, curl y sentadilla",
          "Miércoles: cardio continuo 40 min a intensidad media",
          "Jueves: fuerza con bandas o kettlebell — swing, goblet squat y press",
          "Viernes: HIIT 20 min",
          "Sábado: cardio ligero 30 min y estiramientos",
          "Domingo: descanso completo",
        ],
      },
    ],
    conclusion: "Ocho semanas con este plan producen resultados visibles si el déficit calórico acompaña, y la clave está en no abandonar la fuerza para hacer solo cardio: es el error más común y el que explica que mucha gente pierda peso y siga viéndose igual. Una cinta plegable o una bicicleta estática resuelven el cardio en casa sin depender del tiempo ni del horario, y unas bandas elásticas cubren la parte de resistencia por poco más de doce euros. El ejercicio, en cualquier caso, solo funciona acompañado de una alimentación adecuada.",
    faqs: [
      { q: "¿Es mejor hacer cardio o pesas para perder peso?", a: "La combinación supera a cualquiera de los dos por separado, y la evidencia es bastante consistente en esto. El cardio quema más calorías durante la sesión; la fuerza aumenta el gasto en reposo al construir músculo y, sobre todo, evita que pierdas masa muscular junto con la grasa. Si haces solo cardio en déficit, una parte de lo que pierdes será músculo, y eso hace más difícil mantener el resultado después." },
      { q: "¿Cuánto tiempo lleva perder 10 kg haciendo ejercicio en casa?", a: "Con un déficit de 400 a 500 kcal diarias combinando ejercicio y ajuste de la dieta, la pérdida sostenible ronda los 0,5-1 kg por semana, de modo que 10 kg suponen entre diez y veinte semanas. El ritmo varía según el punto de partida: quien parte de un peso más alto suele perder más rápido al principio. Desconfía de cualquier plan que prometa esa cifra en cuatro semanas." },
      { q: "¿A qué hora es mejor hacer ejercicio para perder peso?", a: "A la hora en la que vayas a hacerlo de forma consistente. El entrenamiento en ayunas puede aumentar ligeramente la oxidación de grasas durante la sesión, pero la diferencia en pérdida de grasa a medio plazo es prácticamente irrelevante frente al balance calórico total. Elige el hueco que puedas sostener durante meses y olvida la optimización horaria." },
      { q: "¿Necesito seguir una dieta específica con este plan?", a: "No hace falta una dieta restrictiva, pero sí controlar el balance calórico. Un déficit moderado de 300 a 500 kcal sobre tu gasto diario, con prioridad a la proteína (entre 1,6 y 2 g por kilo de peso) para preservar músculo, y con verduras, fruta y carbohidratos complejos como base. Las dietas muy restrictivas producen pérdidas rápidas que se recuperan igual de rápido." },
      { q: "¿Es normal que las primeras semanas no baje el peso en la báscula?", a: "Sí, y es una de las razones más frecuentes de abandono temprano. Al empezar a entrenar, el músculo almacena más glucógeno y el glucógeno retiene agua, así que puedes estar perdiendo grasa mientras la báscula no se mueve o incluso sube. Mide también el contorno de cintura y observa cómo te queda la ropa: son mejores indicadores que el peso durante las primeras semanas." },
    ],
  },

  "creatina-para-que-sirve": {
    intro: "La creatina monohidrato es el suplemento deportivo con más respaldo científico que existe. Con centenares de estudios publicados y décadas de uso documentado, es de los pocos que los organismos científicos del ámbito deportivo recomiendan sin reservas para el rendimiento en esfuerzos de alta intensidad. Aun así, sigue arrastrando mitos que no se sostienen. Esta guía separa lo que dice la evidencia de lo que dice el marketing. Consulta con tu médico antes de incorporar cualquier suplemento, especialmente si tienes alguna patología previa.",
    sections: [
      {
        heading: "Qué es la creatina y cómo funciona",
        body: "La creatina es un compuesto que el propio cuerpo produce en hígado, riñones y páncreas a partir de tres aminoácidos: arginina, glicina y metionina. Se almacena sobre todo en el músculo en forma de fosfocreatina, que actúa como reserva rápida para regenerar ATP, la moneda energética de la célula, durante esfuerzos máximos de entre cinco y treinta segundos. Suplementarse satura esos depósitos por encima del nivel que se alcanza solo con la dieta, y esa saturación se traduce en poder hacer una o dos repeticiones más por serie, o mantener la potencia en el último sprint. No es un efecto espectacular sesión a sesión, pero acumulado en meses de entrenamiento produce una diferencia real en fuerza y masa muscular.",
      },
      {
        heading: "Myprotein Creatina Monohidrato: monohidrato puro sin adornos",
        body: "El monohidrato es la forma más estudiada, la más barata y la más eficaz, y ninguna de las variantes que se venden como avanzadas ha demostrado superarlo. La opción de Myprotein es monohidrato 100 % puro sin sabor, lo que permite mezclarla con agua, leche o el batido de proteína sin alterarlo. El envase de 250 gramos rinde unos 83 servicios de 3 gramos, es decir, cerca de tres meses de uso continuado por 18,99 euros, lo que sitúa el coste mensual en torno a los siete euros. A favor: pureza, precio y que no hay que confiar en ninguna promesa de formulación exótica. En contra: al no tener sabor requiere mezclarla con algo, y conviene remover bien porque no se disuelve del todo en agua fría.",
        productSlug: "myprotein-creatina-monohidrato-250g",
      },
      {
        heading: "Protocolo: carga frente a mantenimiento",
        body: "Existen dos formas de empezar. Con carga: 20 gramos diarios repartidos en cuatro tomas durante cinco a siete días, y después 3-5 gramos diarios de mantenimiento. Sin carga: 3-5 gramos diarios desde el primer día. La diferencia está solo en la velocidad de saturación de los depósitos musculares, una semana frente a tres o cuatro. El nivel final alcanzado es idéntico con ambos protocolos, y la fase de carga es la que concentra las molestias digestivas que algunas personas refieren. Para la inmensa mayoría, el protocolo sin carga es más práctico, mejor tolerado y desperdicia menos producto.",
      },
      {
        heading: "Creatina y proteína: cómo se complementan",
        body: "Son suplementos con funciones distintas que se llevan bien. La creatina mejora el rendimiento durante el entrenamiento, permitiendo un estímulo mayor; la proteína aporta el material con el que el músculo se reconstruye después. Ninguna sustituye a la otra y ninguna sustituye a la comida. En la práctica, mezclar los 3 gramos de creatina en el batido de proteína posterior al entrenamiento resuelve las dos tomas de una vez, y la presencia de carbohidratos y proteína favorece ligeramente el transporte de creatina al músculo por la respuesta de insulina. Si solo vas a tomar uno de los dos y tu dieta ya cubre la proteína, la creatina es el que más rendimiento aporta por euro.",
        productSlug: "optimum-nutrition-gold-standard-whey-226kg",
      },
    ],
    comparison: {
      headers: ["Característica", "Monohidrato", "Creatina HCL", "Buffered (Kre-Alkalyn)"],
      rows: [
        ["Coste mensual aproximado", "~7 € (250 g)", "15-25 €", "15-20 €"],
        ["Evidencia científica", "Muy alta, centenares de estudios", "Limitada", "Limitada"],
        ["Eficacia demostrada", "Sí", "Similar o inferior", "Similar"],
        ["Retención de agua", "Ligera e intramuscular", "Menor", "Menor"],
        ["Requiere fase de carga", "Opcional", "No", "No"],
        ["Veredicto", "La única necesaria", "No justifica el precio", "No justifica el precio"],
      ],
    },
    conclusion: "La creatina monohidrato pura es todo lo que necesitas: cualquier otra forma es más cara sin ofrecer una ventaja demostrada. De 3 a 5 gramos al día, de forma constante y sin ciclar, con la comida o dentro del batido posterior al entrenamiento. Combinada con un plan de fuerza bien estructurado y una ingesta proteica suficiente, es el suplemento con mejor relación entre evidencia científica, seguridad y precio del mercado.",
    faqs: [
      { q: "¿La creatina retiene líquidos y hace parecer hinchado?", a: "La creatina produce retención de agua intramuscular, es decir, dentro de la célula muscular y no bajo la piel. Eso puede suponer uno o dos kilos de peso en agua durante los primeros días, pero el efecto visual es de músculo más lleno, no de hinchazón. La retención subcutánea que da aspecto blando es un efecto de otras causas y no está documentada como consecuencia de la creatina." },
      { q: "¿La creatina es solo para hombres que quieren ganar volumen?", a: "No. Los beneficios están documentados en hombres y mujeres, en jóvenes y en personas mayores. En mujeres, mejora igualmente el rendimiento en esfuerzos de alta intensidad sin producir el aumento de volumen que se teme, porque el perfil hormonal es distinto. En personas mayores, la investigación apunta además a beneficios en el mantenimiento de masa muscular y en función cognitiva." },
      { q: "¿Cuándo veré resultados con creatina?", a: "El efecto de llenado muscular se aprecia en pocos días. Las mejoras de fuerza y potencia empiezan a notarse entre la primera y la segunda semana con protocolo de carga, o hacia la tercera o cuarta sin carga. Los resultados en masa muscular son consecuencia de meses de entrenamiento con ese rendimiento extra, no de la creatina en sí: sin entrenar, no hay efecto." },
      { q: "¿Hay que ciclar la creatina o hacer descansos?", a: "No existe evidencia que respalde la necesidad de ciclarla. Puede tomarse de forma continuada con seguridad, y así lo recogen las revisiones sobre el tema. Interrumpir solo consigue que pierdas la saturación muscular y que tardes varias semanas en recuperarla, sin ningún beneficio a cambio." },
      { q: "¿Con qué tomar la creatina para mejor absorción?", a: "Con agua y, si es posible, junto a una comida o bebida que contenga carbohidratos, porque la respuesta de insulina favorece el transporte de creatina al músculo. La opción más cómoda es mezclarla en el batido posterior al entrenamiento o tomarla con una de las comidas principales. Al no tener sabor, el monohidrato se integra en cualquier bebida sin alterarla." },
    ],
  },

  "walkingpad-r2-vs-r1-pro": {
    intro: "La WalkingPad R2 y la R1 Pro son las dos únicas cintas plegables del mercado español que combinan calidad y precio razonable. La diferencia entre ambas es concreta y decide cuál comprar: 50 euros, 2 km/h y el tipo de motor. Esta guía desmonta cada diferencia para que elijas sin dudas.",
    sections: [
      {
        heading: "Motor brushless frente a motor convencional: qué significa en la práctica",
        body: "La R2 monta un motor brushless, es decir, sin escobillas. La ausencia de esas piezas de fricción se traduce en tres ventajas concretas: menos ruido de funcionamiento, menos mantenimiento a lo largo del tiempo y una vida útil más larga, porque no hay componentes que se desgasten por rozamiento. La R1 Pro usa un motor convencional de 918 W, perfectamente solvente, pero con las escobillas como punto de desgaste habitual. En una casa unifamiliar la diferencia es menor, pero en un piso, donde el ruido se transmite a los vecinos y a las propias paredes, el motor brushless de la R2 marca una diferencia real que se nota desde el primer uso.",
      },
      {
        heading: "12 km/h frente a 10 km/h: ¿importa la diferencia?",
        body: "Sobre el papel son solo 2 km/h, pero el matiz importante es otro: a 10 km/h ya vas al límite de la R1 Pro, y trabajar constantemente en el tope de cualquier máquina acelera su desgaste. La R2, con margen hasta 12 km/h, permite trotar a 9-10 km/h sin exprimir el motor. Si tu plan incluye trotar de forma regular, esa holgura es la compra correcta. Si en cambio vas a caminar o, como mucho, a hacer series cortas de mayor ritmo de forma ocasional, la R1 Pro cubre ese uso sin problema y no tiene sentido pagar por una velocidad que no vas a aprovechar.",
      },
      {
        heading: "Instalación y plegado",
        body: "Aquí la R1 Pro se toma la revancha. La R2 requiere un montaje inicial y, una vez plegada, ocupa unos 0,2 m² gracias a su sistema patentado. La R1 Pro llega lista para usar, sin montaje, se pliega 180° y trae ruedas de transporte incorporadas. Si vas a dejar la cinta fija en un sitio, el montaje de la R2 es un trámite de una sola vez y su plegado compacto gana. Pero si prevés cambiarla de sitio a menudo o guardarla tras cada sesión, la ausencia de montaje y las ruedas de la R1 Pro son una ventaja práctica que se agradece cada día.",
      },
      {
        heading: "Cuándo la R2 es la respuesta correcta",
        body: "La R2 es la elección si el silencio es una prioridad, algo casi inevitable en un piso, o si vas a trotar con cierta regularidad y quieres un motor con margen por encima de tu ritmo habitual. También si valoras la carga máxima declarada de 110 kg, un dato que la R1 Pro no publica. Es la opción más completa de las dos y su precio de 399 euros se justifica precisamente por el motor brushless y los 12 km/h, que son sus dos argumentos diferenciales frente a la hermana pequeña.",
        productSlug: "walkingpad-r2-cinta-plegable",
      },
      {
        heading: "Cuándo la R1 Pro es suficiente",
        body: "La R1 Pro es la respuesta si tu uso principal es caminar, con algún trote suave ocasional, y quieres ahorrarte 50 euros y el montaje inicial. Su doble modo andar/correr, sus ruedas y el plegado 180° sin herramientas la convierten en la opción más cómoda de mover y guardar. Para el perfil mayoritario de comprador de cinta plegable, que la usa para sumar pasos y hacer cardio ligero en casa, la R1 Pro entrega prácticamente la misma experiencia por menos dinero.",
        productSlug: "walkingpad-r1-pro-cinta-plegable",
      },
    ],
    comparison: {
      headers: ["Criterio", "WalkingPad R2", "WalkingPad R1 Pro"],
      rows: [
        ["Precio", "399,00 €", "349,00 €"],
        ["Velocidad máx.", "12 km/h", "10 km/h"],
        ["Motor", "Brushless silencioso", "Convencional 918 W"],
        ["Plegado", "Patentado, 0,2 m²", "180° con ruedas"],
        ["Montaje", "Requiere montaje", "Lista para usar"],
        ["Carga máx.", "110 kg", "No publicada"],
        ["Mejor para", "Trotar regularmente", "Caminar y presupuesto ajustado"],
      ],
    },
    conclusion: "No hay una respuesta universal. La R2 es la compra correcta para quien va a trotar con regularidad o valora el silencio del motor brushless en un piso. La R1 Pro es la respuesta para quien va a usar la cinta principalmente para caminar y quiere ahorrarse 50 euros y el montaje inicial. Identifica cuál de esos dos usos es el tuyo y la elección deja de tener misterio.",
    faqs: [
      { q: "¿La WalkingPad R2 hace mucho ruido?", a: "El motor brushless es notablemente más silencioso que un motor convencional. Conviene recordar, además, que el ruido dominante en cualquier cinta son las pisadas, no el motor. Con una alfombrilla de amortiguación bajo la cinta se reduce la transmisión de vibración al suelo y, con ella, el ruido que llega a los vecinos de abajo." },
      { q: "¿Cuánto pesa la WalkingPad R2?", a: "La R2 pesa aproximadamente 28 kg. Es manejable para una persona, pero conviene tener claro dónde va a quedar instalada antes de desembalarla, porque moverla a menudo de una habitación a otra puede resultar incómodo si no está pensado de antemano." },
      { q: "¿Se puede usar la WalkingPad R1 Pro bajo el escritorio?", a: "Sí. Con la barandilla plegada funciona en modo andar hasta 6 km/h, lo que la hace compatible con el uso bajo un escritorio elevable o uno estándar de altura suficiente para trabajar de pie. Es una de las razones por las que este modelo es tan popular entre quienes teletrabajan." },
      { q: "¿Las WalkingPad funcionan en pisos?", a: "Sí, son las cintas más usadas en pisos precisamente por su perfil bajo y su diseño silencioso. Conviene colocar una alfombrilla de amortiguación para reducir la transmisión de vibración a la estructura del edificio, un detalle que marca la diferencia en la convivencia con los vecinos." },
    ],
  },

  "cinta-correr-plegable-piso-pequeno": {
    intro: "Vivir en un piso pequeño no significa renunciar a entrenar en casa. Significa elegir el equipamiento correcto. Una cinta de correr plegable bien elegida ocupa menos de 1 m² guardada y se puede usar en cualquier habitación con 2 metros de largo libre. Esta guía explica qué mirar antes de comprar para no acabar con un aparato que estorba más de lo que se usa.",
    sections: [
      {
        heading: "Los cuatro criterios que importan en un piso pequeño",
        body: "El primero es el tamaño plegado, que no es lo mismo que el tamaño de uso: lo que decide si la cinta cabe en tu vida es cuánto ocupa guardada, no desplegada. El segundo es el ruido, que llega por dos vías, el motor y las pisadas; las cintas de motor brushless son más silenciosas en la parte que depende del aparato. El tercero es el peso: si vas a moverla con frecuencia, superar los 30 kg se vuelve incómodo rápido. Y el cuarto es el perfil: las WalkingPad tienen un perfil muy bajo que permite guardarlas bajo una cama o un sofá, algo que una cinta convencional plegada, que queda de pie y alta, no ofrece.",
      },
      {
        heading: "Lo que NO hay que mirar",
        body: "Igual de importante es saber qué ignorar. La velocidad máxima es irrelevante si solo vas a caminar: pagar por una cinta de 18 km/h para andar a 5 es tirar el dinero. El número de programas de entrenamiento preinstalados tampoco importa si controlas la cinta desde la app, que es lo habitual en estos modelos. Y las funciones de inclinación motorizada, que encarecen y añaden volumen, sobran para un uso de caminata o trote suave. En un piso pequeño, cada característica que no vas a usar es espacio y dinero desperdiciados.",
      },
      {
        heading: "WalkingPad R2 para pisos: análisis",
        body: "La R2 es la opción más silenciosa de las dos, gracias a su motor brushless, lo que la hace especialmente adecuada para pisos con vecinos sensibles al ruido o para entrenar a última hora. Plegada ocupa unos 0,2 m², alcanza 12 km/h por si en algún momento quieres trotar, y declara una carga máxima de 110 kg. Su perfil bajo permite deslizarla bajo un mueble cuando no se usa. Es la elección si el silencio y la holgura de velocidad pesan más que el precio.",
        productSlug: "walkingpad-r2-cinta-plegable",
      },
      {
        heading: "WalkingPad R1 Pro para pisos: análisis",
        body: "La R1 Pro es la más fácil de mover y guardar: se pliega 180°, trae ruedas de transporte y llega lista para usar sin montaje, así que desde el minuto uno la puedes recolocar según la necesidad de cada día. Alcanza 10 km/h, suficiente para caminar y trotar de forma ligera, y cuesta 50 euros menos que la R2. Para un piso donde la cinta tiene que aparecer y desaparecer constantemente entre sesiones, esa movilidad es su mayor argumento.",
        productSlug: "walkingpad-r1-pro-cinta-plegable",
      },
    ],
    comparison: {
      headers: ["Criterio", "WalkingPad R2", "WalkingPad R1 Pro"],
      rows: [
        ["Tamaño plegado", "≈0,2 m²", "Plegado 180°"],
        ["Ruido motor", "Muy bajo — brushless", "Bajo"],
        ["Peso", "≈28 kg", "Consultar ficha"],
        ["Perfil bajo", "Sí", "Sí"],
        ["Precio", "399,00 €", "349,00 €"],
      ],
    },
    conclusion: "Para un piso pequeño, las dos WalkingPad son buenas opciones. La R1 Pro gana en facilidad de movimiento, con sus ruedas integradas y la ausencia de montaje. La R2 gana en silencio, por el motor brushless, y en carga máxima declarada. Si el ruido es tu preocupación principal, la R2. Si lo son la movilidad y el precio, la R1 Pro.",
    faqs: [
      { q: "¿Cuánto espacio necesito para usar una WalkingPad?", a: "Para usarla necesitas la superficie de la banda más al menos 1 metro libre por detrás por seguridad. El espacio de almacenamiento es mucho menor, pero el espacio de uso no cambia: es un error frecuente fijarse solo en lo compacta que queda guardada y olvidar el hueco que hace falta para caminar con seguridad." },
      { q: "¿Se puede usar una cinta de correr en un piso de alquiler?", a: "Sí, siempre que el suelo lo permita y se use con una alfombrilla de amortiguación que proteja el parquet y reduzca la vibración transmitida a los vecinos de abajo. La alfombrilla es, de hecho, el accesorio que más conflictos de convivencia evita." },
      { q: "¿Las cintas plegables duran menos que las fijas?", a: "No necesariamente. La durabilidad depende más de la calidad del motor y de la banda que del mecanismo de plegado en sí. Las WalkingPad tienen buenas valoraciones de durabilidad en uso doméstico, que es el escenario para el que están diseñadas." },
      { q: "¿Puedo usar la cinta en el balcón?", a: "Técnicamente sí, si el balcón tiene espacio suficiente y aguanta el peso, pero no es recomendable: la exposición a la humedad y a los cambios de temperatura deteriora la banda y los componentes electrónicos con rapidez. Una cinta es un aparato de interior y conviene tratarla como tal." },
    ],
  },

  "cinta-andar-casa-bajo-escritorio": {
    intro: "Trabajar caminando lentamente no afecta a la concentración ni a la calidad del trabajo en tareas cognitivas; varios estudios lo han medido. Y sumar 5.000 pasos diarios sin salir de casa cambia por completo el balance energético de un trabajador sedentario. La cinta bajo el escritorio es la herramienta más práctica para conseguirlo, y esta guía explica cómo empezar sin que el intento acabe en frustración.",
    sections: [
      {
        heading: "A qué velocidad se trabaja en una cinta",
        body: "El rango útil está entre 1 y 3 km/h. A esa velocidad se puede escribir, leer, atender videollamadas y concentrarse sin problema, porque el gesto de caminar despacio es lo bastante automático como para no competir por la atención. Por encima de 4 km/h la cosa cambia: la concentración empieza a resentirse en tareas que requieren precisión manual, como la mecanografía rápida o el trabajo de detalle. La regla práctica es sencilla: si notas que tu escritura se degrada, baja la velocidad. El objetivo no es entrenar, es moverse mientras trabajas.",
      },
      {
        heading: "Qué escritorio necesitas",
        body: "No hace falta un escritorio elevable de 1.000 euros. Cualquier mesa a la altura correcta funciona si la cinta tiene un perfil bajo, y las WalkingPad lo tienen. La clave es la ergonomía: la altura del escritorio debe permitir que tus codos queden a 90 grados mientras caminas, no mientras estás de pie parado, porque al caminar el cuerpo sube unos centímetros con cada paso. Si ya tienes un escritorio elevable, ajústalo a esa posición; si no, una mesa alta o un soporte para el portátil pueden resolver la altura sin una inversión grande.",
      },
      {
        heading: "WalkingPad R1 Pro: el modelo diseñado para esto",
        body: "La R1 Pro es la opción natural para el uso bajo escritorio. Su modo andar, con la barandilla plegada, llega hasta 6 km/h, y todo el rango bajo de esa escala es exactamente la velocidad ideal para trabajar caminando. Llega lista para usar sin montaje, así que puedes colocarla bajo la mesa el mismo día que llega, y sus ruedas permiten retirarla al terminar la jornada. A 349 euros, es la puerta de entrada más económica al escritorio activo.",
        productSlug: "walkingpad-r1-pro-cinta-plegable",
      },
      {
        heading: "WalkingPad R2: la opción si también quieres correr",
        body: "Si además del uso bajo escritorio quieres poder hacer sesiones de trote de verdad, la R2 cubre ambos escenarios. Llega hasta 12 km/h, de modo que sirve tanto para caminar a 2 km/h mientras trabajas como para trotar a 9-10 km/h cuando cierras el portátil. Su motor brushless mantiene el silencio en las velocidades bajas de oficina, que es donde más importa no molestar en una videollamada. Es la elección de quien no quiere dos aparatos, sino uno que valga para las dos cosas.",
        productSlug: "walkingpad-r2-cinta-plegable",
      },
      {
        heading: "Cómo empezar sin que sea incómodo",
        body: "El error más común es empezar demasiado deprisa y demasiado tiempo. Arranca con 20-30 minutos al día a 1,5-2 km/h. El cuerpo tarda unos días en acostumbrarse a la coordinación entre caminar y escribir, y forzar ese periodo solo genera frustración. En una semana, para la mayoría de las personas, la sensación pasa a ser completamente natural y dejas de notar que estás caminando. A partir de ahí puedes ir alargando las sesiones según te pida el cuerpo, alternando con ratos sentado para no cargar las piernas.",
      },
    ],
    comparison: {
      headers: ["Criterio", "R1 Pro (modo andar)", "R2"],
      rows: [
        ["Velocidad modo escritorio", "Hasta 6 km/h", "Hasta 12 km/h"],
        ["Modo exclusivo andar", "Sí — barandilla plegable", "No diferenciado"],
        ["Lista para usar", "Sí, sin montaje", "Requiere montaje"],
        ["Precio", "349,00 €", "399,00 €"],
        ["Mejor uso combinado", "Escritorio + trote suave", "Escritorio + correr"],
      ],
    },
    conclusion: "Para usar exclusivamente bajo el escritorio, la R1 Pro es la elección más práctica y 50 euros más barata. Si quieres también poder hacer sesiones de trote reales sin comprar un segundo aparato, la R2 cubre ambos usos sin comprometer ninguno. La pregunta que decide es si vas a correr de verdad o solo a caminar mientras trabajas.",
    faqs: [
      { q: "¿Afecta caminar a la concentración mientras se trabaja?", a: "Para tareas de lectura, reuniones y trabajo cognitivo general, no. Para tareas que requieren máxima precisión manual, como el diseño de detalle o la edición de vídeo fotograma a fotograma, conviene parar. La mayoría de los trabajos de conocimiento son perfectamente compatibles con caminar a 2 km/h, y la clave es bajar la velocidad en cuanto la tarea lo pida." },
      { q: "¿Cuántos pasos se hacen en una hora caminando a 2 km/h?", a: "Aproximadamente entre 2.000 y 2.500 pasos por hora. En una jornada laboral de 8 horas con 3 o 4 horas de uso de la cinta, se pueden sumar con facilidad entre 7.000 y 9.000 pasos sin salir de casa ni dedicar tiempo extra al ejercicio." },
      { q: "¿Se puede usar una cinta de andar con cualquier silla de escritorio?", a: "La cinta reemplaza a la silla, no se usa sentado: se usa de pie, caminando. Por eso el escritorio debe estar a la altura correcta para trabajar de pie, con los codos a 90 grados. No es un accesorio que se combine con la silla, sino una alternativa a estar sentado." },
      { q: "¿Cuánto tiempo al día es recomendable usar la cinta bajo el escritorio?", a: "Empieza con 30-60 minutos y aumenta progresivamente. Muchas personas llegan a 3 o 4 horas diarias sin molestias, pero lo importante es alternar la caminata con periodos sentado o de pie estático para no sobrecargar las piernas. No se trata de caminar toda la jornada, sino de romper el sedentarismo continuo." },
    ],
  },

  "walkingpad-opiniones-analisis": {
    intro: "WalkingPad es la marca de cintas plegables más vendida en España desde 2022. Sus modelos aparecen constantemente en listas de recomendaciones y acumulan miles de valoraciones en Amazon. Esta guía analiza qué hay detrás de esas valoraciones: qué elogian los usuarios, qué critican y qué expectativas no se cumplen, para que compres sabiendo exactamente lo que vas a recibir.",
    sections: [
      {
        heading: "Lo que más valoran los usuarios de WalkingPad",
        body: "Cuatro elogios se repiten por encima del resto. El primero, y más frecuente, es el espacio que ahorra: para quien vive en un piso, que la cinta desaparezca bajo un mueble es el argumento decisivo. El segundo es el silencio, especialmente en la R2 con su motor brushless, que permite usarla sin molestar. El tercero es la facilidad de uso: no hay configuración compleja, se enciende y funciona, algo que se agradece frente a las cintas domésticas tradicionales llenas de menús. Y el cuarto es el diseño, estéticamente más cuidado que el de una cinta convencional, lo que ayuda a que no desentone en un salón.",
      },
      {
        heading: "Las críticas más repetidas",
        body: "Las quejas también son concretas y conviene conocerlas antes de comprar. La primera es el precio: 349-399 euros no es barato para una cinta sin inclinación motorizada ni programas avanzados. La segunda es la superficie de la banda, más estrecha y corta que la de una cinta de gimnasio, lo que puede resultar limitante para zancadas largas a alta velocidad. La tercera es la app, que funciona pero no es de las más pulidas del mercado. Y la cuarta, específica de la R1 Pro, es que no publica la carga máxima, lo que genera incertidumbre en usuarios de mayor peso que no saben si el aparato es adecuado para ellos.",
      },
      {
        heading: "WalkingPad R2: análisis de valoraciones",
        body: "La R2 recibe valoraciones consistentemente altas, y el patrón es claro: lo que más se elogia es el silencio del motor brushless y la holgura de los 12 km/h. Los usuarios que viven en pisos la destacan de forma especial, precisamente porque el ruido es su mayor preocupación y este modelo lo resuelve mejor que ninguno de su rango. Las críticas que recibe son las generales de la marca, sobre todo el precio, más que defectos propios del modelo.",
        productSlug: "walkingpad-r2-cinta-plegable",
      },
      {
        heading: "WalkingPad R1 Pro: análisis de valoraciones",
        body: "La R1 Pro es muy valorada por la facilidad de instalación, al llegar lista para usar, y por el doble uso andar/correr, que la hace versátil. La crítica más frecuente es previsible: el tope de 10 km/h se queda corto para los usuarios que quieren correr a un ritmo real, no solo trotar. Es una queja justa, pero también una cuestión de expectativas: quien compra la R1 Pro para caminar y trotar suave rara vez la menciona como problema.",
        productSlug: "walkingpad-r1-pro-cinta-plegable",
      },
    ],
    comparison: {
      headers: ["Aspecto", "WalkingPad R2", "WalkingPad R1 Pro"],
      rows: [
        ["Silencio", "★★★★★ Motor brushless", "★★★★ Motor convencional"],
        ["Facilidad instalación", "★★★★ Requiere montaje", "★★★★★ Lista para usar"],
        ["Velocidad", "★★★★★ 12 km/h", "★★★★ 10 km/h"],
        ["Relación calidad-precio", "★★★★ 399 €", "★★★★★ 349 €"],
        ["App", "★★★★", "★★★★"],
      ],
    },
    conclusion: "Las WalkingPad tienen valoraciones altas por razones concretas, no por marketing. Cumplen lo que prometen: plegarse de verdad, hacer poco ruido y funcionar sin complicaciones. Sus limitaciones son reales pero conocidas: no son cintas de gimnasio y no pretenden serlo. Si tus expectativas están bien calibradas, son una compra que no defrauda.",
    faqs: [
      { q: "¿Dónde se compra la WalkingPad en España?", a: "Están disponibles en Amazon España con envío rápido y devolución sin coste durante los primeros 30 días. Es el canal más recomendable por la garantía de compra que ofrece y por la facilidad de gestionar una devolución si el modelo no encaja con lo que esperabas." },
      { q: "¿La garantía de WalkingPad cubre España?", a: "Sí. Los modelos vendidos en Amazon España incluyen la garantía del fabricante. Conviene guardar el comprobante de compra para cualquier reclamación posterior, ya que es el documento que acredita la fecha de inicio de la cobertura." },
      { q: "¿Cuánto tarda en llegar una WalkingPad desde Amazon España?", a: "Con Amazon Prime, normalmente 1 o 2 días laborables. Sin Prime, el plazo depende de la disponibilidad del vendedor, aunque en la práctica suele ser rápido al tratarse de un producto con stock habitual." },
      { q: "¿Merece la pena WalkingPad frente a otras marcas?", a: "Para el segmento de cintas plegables silenciosas para piso, sí. Las alternativas en ese rango de precio suelen tener más ruido o peor calidad de construcción. Para cintas de entrenamiento serio, con inclinación motorizada y programas avanzados, hay opciones más completas, pero también más caras y voluminosas, que juegan en otra categoría." },
    ],
  },

  "entrenar-caminando-casa-beneficios": {
    intro: "Caminar es el ejercicio más infravalorado que existe. A ritmos de 5-6 km/h, el consumo calórico por kilómetro recorrido no es muy diferente al de correr. La diferencia está en el impacto articular, que al caminar es casi nulo, y en la sostenibilidad: casi cualquier persona puede caminar 45 minutos al día indefinidamente, mientras que muy pocas mantienen una rutina de carrera durante años.",
    sections: [
      {
        heading: "Qué dice la evidencia científica sobre caminar",
        body: "Los beneficios documentados de caminar con regularidad son amplios: mejora la salud cardiovascular, reduce la presión arterial, mejora el perfil lipídico, disminuye el riesgo de diabetes tipo 2 y beneficia tanto el estado de ánimo como la función cognitiva. Y lo más relevante para quien empieza: estos efectos aparecen con tan solo 7.000-8.000 pasos diarios, según la evidencia más reciente. El célebre objetivo de los 10.000 pasos no tiene una base científica sólida; nació de una campaña de marketing japonesa de los años sesenta, no de un estudio. La buena noticia es que la meta real es más accesible de lo que se cree.",
      },
      {
        heading: "Caminar en casa frente a caminar al aire libre: diferencias reales",
        body: "El gasto calórico es similar en ambos casos. Al aire libre, el viento y el terreno irregular hacen que se active ligeramente más la musculatura estabilizadora, una diferencia menor. A cambio, la cinta elimina variables que en la práctica son las que hacen abandonar: el clima, el tráfico, la oscuridad del invierno, la contaminación. Para la mayoría de las personas, la regularidad importa mucho más que la modalidad, y la cinta gana justamente porque no depende de que las condiciones acompañen. El mejor paseo es el que das, no el que planeabas dar si no lloviera.",
      },
      {
        heading: "Cuántas calorías se queman caminando en cinta",
        body: "Una persona de 70 kg caminando a 5 km/h durante 45 minutos quema aproximadamente entre 200 y 250 kcal; a 6 km/h, entre 230 y 280 kcal. No es una cifra espectacular por sesión, y ahí está la trampa mental que lleva a menospreciar el caminar. Pero el cálculo interesante es el acumulado: cinco sesiones semanales durante un año suman entre 50.000 y 70.000 kcal, equivalente a quemar entre 6 y 9 kg de grasa, sin cambiar absolutamente nada más. El poder de caminar no está en la sesión, está en la repetición sostenida.",
      },
      {
        heading: "Cómo empezar si llevas tiempo sin hacer ejercicio",
        body: "La progresión evita las lesiones y, sobre todo, el abandono. Semanas 1 y 2: entre 20 y 30 minutos a 4-5 km/h, con el único objetivo de crear el hábito. Semanas 3 y 4: entre 30 y 40 minutos a 5-6 km/h, cuando el cuerpo ya pide algo más. A partir del segundo mes: 40-45 minutos, o bien introducir intervalos cortos de mayor velocidad para añadir intensidad sin alargar la sesión. La clave es no quemar etapas: empezar suave es lo que garantiza llegar a la semana ocho todavía caminando.",
        productSlug: "walkingpad-r1-pro-cinta-plegable",
      },
      {
        heading: "El paso siguiente: combinar caminar con trabajo",
        body: "Si trabajas desde casa, existe una palanca extra que no cuesta tiempo adicional: usar la cinta bajo el escritorio durante 2 o 3 horas al día, caminando a 2 km/h mientras trabajas. Eso suma entre 4.000 y 6.000 pasos adicionales sin dedicar un solo minuto extra al ejercicio, porque el tiempo ya lo estabas gastando trabajando. Es la forma más eficiente de aumentar la actividad diaria para quien tiene una jornada sedentaria, y convierte horas muertas de silla en movimiento.",
        productSlug: "walkingpad-r2-cinta-plegable",
      },
    ],
    comparison: {
      headers: ["Beneficio", "Caminar 30 min/día", "Caminar 45 min/día"],
      rows: [
        ["Calorías aprox.", "150-180 kcal", "220-260 kcal"],
        ["Pasos aprox.", "2.500-3.000", "3.500-4.500"],
        ["Impacto articular", "Mínimo", "Mínimo"],
        ["Sostenibilidad", "Muy alta", "Alta"],
        ["Adecuado para principiantes", "Sí", "Sí"],
      ],
    },
    conclusion: "Caminar en casa en cinta no sustituye al entrenamiento de fuerza ni al cardio intenso, pero es el hábito de actividad física con mayor ratio de beneficio sobre esfuerzo percibido. Para alguien que no hace ejercicio regular, pasar de cero a 30-45 minutos de caminata diaria es el cambio más impactante que puede hacer sin riesgo de lesión ni de abandono en las primeras semanas.",
    faqs: [
      { q: "¿Es suficiente caminar para perder peso?", a: "Caminar crea un déficit calórico real, especialmente si partes de una actividad muy baja. Combinado con una alimentación razonable, sin necesidad de dieta estricta, es perfectamente suficiente para perder peso de forma gradual. Es más lento que el cardio intenso, pero mucho más sostenible, y la sostenibilidad es lo que determina el resultado a largo plazo." },
      { q: "¿Cuántos días a la semana hay que caminar para ver beneficios?", a: "La OMS recomienda entre 150 y 300 minutos de actividad moderada a la semana. Cinco días de 30-45 minutos de caminata a paso rápido cumplen esa recomendación con holgura. Los beneficios cardiovasculares empiezan a aparecer incluso con 3 o 4 días semanales, así que no hace falta la perfección para notar mejoras." },
      { q: "¿Es mejor caminar rápido o despacio?", a: "A mayor velocidad, mayor gasto calórico por minuto, pero la velocidad óptima es la que puedes mantener de forma constante. Para la mayoría de las personas sin forma física de base, caminar a 5-6 km/h durante 40-45 minutos es más efectivo que ir a 7-8 km/h durante 15 minutos, porque permite acumular más volumen sin agotarse ni arriesgar una lesión." },
      { q: "¿Se puede perder barriga caminando?", a: "La pérdida de grasa abdominal depende del déficit calórico total, no del ejercicio localizado: no existe la quema de grasa por zonas. Caminar contribuye a ese déficit y, con tiempo y constancia, sí produce una reducción de la grasa visceral, que es la que rodea los órganos y la más peligrosa para la salud." },
    ],
  },

  "perder-peso-cinta-andar-casa-plan": {
    intro: "Caminar en cinta de forma estructurada y progresiva durante 8 semanas produce resultados visibles sin lesiones, sin abandono y sin necesidad de cambiar radicalmente la dieta. Este plan está diseñado para personas que llevan tiempo sin hacer ejercicio regular y quieren perder entre 3 y 6 kg en dos meses con un enfoque realista, no con promesas imposibles.",
    sections: [
      {
        heading: "Antes de empezar: lo que necesitas saber",
        body: "El déficit calórico que crea este plan ronda las 200-300 kcal al día. Conviene tener presente la aritmética real de la pérdida de grasa: para perder 1 kg hace falta un déficit acumulado de unas 7.700 kcal. Con este plan y sin cambiar nada de la dieta, la pérdida realista es de 0,3-0,5 kg por semana. Si además ajustas ligeramente la alimentación, reduciendo unas 200 kcal diarias, puedes llegar a 0,5-0,8 kg semanales. Son cifras modestas por semana, pero sostenidas ocho semanas suponen un cambio claro, y sobre todo son cifras que no se recuperan a la primera de cambio como ocurre con las dietas agresivas.",
      },
      {
        heading: "Alimentación: lo mínimo que necesitas ajustar",
        body: "No hace falta una dieta. Tres cambios simples producen la mayor parte de la diferencia. El primero: eliminar las bebidas azucaradas, que aportan muchas calorías líquidas sin saciar. El segundo: añadir proteína en cada comida principal, porque sacia, preserva la masa muscular durante el déficit y tiene un coste calórico de digestión mayor. El tercero, y el que más gente pasa por alto: no compensar el ejercicio con comida extra, ese premio mental de \"me lo he ganado\" que borra en cinco minutos el déficit de una sesión entera. Con estos tres ajustes, sin contar calorías, la mayoría de las personas ya nota resultados.",
      },
      {
        heading: "Cómo saber si estás progresando",
        body: "Usa el contorno de cintura además de la báscula, y no dependas solo del peso. Durante las primeras 2 semanas es normal que la báscula no baje, o incluso que suba ligeramente, por la retención de agua asociada a la adaptación muscular al ejercicio. Eso no significa que no estés perdiendo grasa. Si el contorno de cintura baja mientras el peso se mantiene, estás perdiendo grasa y ganando algo de músculo, que es exactamente el resultado que buscas. Mídete una vez por semana, siempre en las mismas condiciones, y fíate de la tendencia de varias semanas, no del dato de un día.",
        productSlug: "walkingpad-r2-cinta-plegable",
      },
    ],
    plan: [
      {
        week: "Semanas 1-2: Base",
        description: "3 días/semana, 25 min a 5 km/h. Objetivo: crear el hábito sin sobrecarga.",
        sessions: [
          "Lunes: 25 min a 5 km/h",
          "Miércoles: 25 min a 5 km/h",
          "Viernes: 25 min a 5 km/h",
          "Resto: descanso activo (estiramientos o caminata suave)",
        ],
      },
      {
        week: "Semanas 3-4: Progresión",
        description: "4 días/semana, 35 min a 5,5 km/h.",
        sessions: [
          "Lunes: 35 min a 5,5 km/h",
          "Martes: descanso",
          "Miércoles: 35 min a 5,5 km/h",
          "Jueves: descanso",
          "Viernes: 35 min a 5,5 km/h",
          "Sábado: 35 min a 5 km/h (ritmo suave)",
          "Domingo: descanso",
        ],
      },
      {
        week: "Semanas 5-6: Intensificación",
        description: "4 días/semana, 40 min. Añadir 5 min de intervalos.",
        sessions: [
          "Lunes: 35 min a 5,5 km/h + 5 min a 7 km/h al final",
          "Miércoles: 40 min a 5,5 km/h",
          "Viernes: 35 min a 5,5 km/h + 5 min a 7 km/h",
          "Sábado: 40 min a 5 km/h",
        ],
      },
      {
        week: "Semanas 7-8: Consolidación",
        description: "5 días/semana, 45 min. Intervalos en todas las sesiones.",
        sessions: [
          "Lunes: 35 min a 5,5 km/h + 10 min intervalos (1 min a 7-8 km/h / 2 min a 5 km/h)",
          "Martes: 45 min a 5 km/h",
          "Miércoles: 35 min a 5,5 km/h + 10 min intervalos",
          "Jueves: 45 min a 5 km/h",
          "Viernes: 35 min a 5,5 km/h + 10 min intervalos",
          "Sábado-domingo: descanso",
        ],
      },
    ],
    comparison: {
      headers: ["Semana", "Días/semana", "Duración", "Velocidad", "Calorías aprox./sesión"],
      rows: [
        ["1-2", "3", "25 min", "5 km/h", "120-140 kcal"],
        ["3-4", "4", "35 min", "5,5 km/h", "175-200 kcal"],
        ["5-6", "4", "40 min", "5,5 + intervalos", "200-240 kcal"],
        ["7-8", "5", "45 min", "5,5 + intervalos", "230-270 kcal"],
      ],
    },
    conclusion: "Este plan funciona porque es progresivo, no porque sea intenso. El mayor error en la pérdida de peso es empezar demasiado fuerte y abandonar en la tercera semana. Con este enfoque llegarás a la semana 8 con el hábito instalado y los primeros resultados visibles, que es justo lo que hace que la semana 9 no necesite un plan: para entonces, caminar ya forma parte de tu rutina.",
    faqs: [
      { q: "¿Cuánto peso puedo perder en 8 semanas caminando?", a: "De forma realista, entre 2 y 5 kg, dependiendo del punto de partida, la consistencia y los ajustes de alimentación. El rango inferior corresponde a hacer solo el ejercicio del plan; el superior, a añadir pequeños ajustes en la dieta. Desconfía de cualquier plan que prometa cifras muy superiores en el mismo tiempo: o son insostenibles o no son solo grasa." },
      { q: "¿Necesito seguir el plan al pie de la letra?", a: "No. Es una guía de progresión, no un protocolo rígido. Si un día fallas, simplemente retomas donde lo dejaste sin dramatizar. Lo único que conviene no hacer es saltarse semanas enteras, porque la progresión se construye sobre la carga de la semana anterior y saltar tramos rompe esa base." },
      { q: "¿Se puede hacer este plan sin cinta, caminando al aire libre?", a: "Sí, los principios son exactamente los mismos. La cinta facilita el control preciso de la velocidad y elimina la dependencia del clima, pero el plan es perfectamente válido caminando al aire libre a los mismos ritmos. Si optas por el exterior, un reloj o el móvil te ayudan a controlar el ritmo para respetar las velocidades de cada fase." },
      { q: "¿Qué pasa después de la semana 8?", a: "El objetivo es que en la semana 8 caminar 45 minutos sea algo completamente normal, no un esfuerzo. A partir de ahí puedes mantener esa base y añadir sesiones de mayor intensidad si buscas seguir progresando, o simplemente mantener el hábito de forma indefinida si tu objetivo es la salud y no el rendimiento deportivo." },
    ],
  },

  "mejor-bicicleta-estatica-casa-2025": {
    intro: "Elegir la bicicleta estática correcta para casa no es cuestión de buscar la más barata ni la más cara: es cuestión de identificar qué problema resuelve cada modelo. Esta guía compara las tres opciones principales del mercado español en 2025, entre 119 y 249 euros, para que identifiques cuál encaja con tu espacio, tu uso y tu presupuesto.",
    sections: [
      {
        heading: "Qué tipo de bicicleta estática necesitas",
        body: "Antes de mirar precios conviene identificar tu perfil, porque cada modelo resuelve un problema distinto y comprar el equivocado es la causa más frecuente de que la bicicleta acabe arrinconada. Hay tres perfiles claros. Si quieres entrenar de verdad y registrar tu progresión, la MERACH con app es tu opción. Si tu limitación es el espacio y necesitas guardarla entre sesiones, el Sportstech X150, un ergómetro plegable, resuelve eso. Y si lo que buscas es moverte sin interrumpir el trabajo, el Sportstech DFX70, una mini bicicleta de escritorio, juega en otra categoría por 119 euros. Identifica el tuyo y la comparativa se simplifica sola.",
      },
      {
        heading: "MERACH — para resultados serios",
        body: "Es la opción más completa del catálogo y la única pensada para entrenar de verdad. Su resistencia magnética es prácticamente silenciosa, lo que permite usarla a cualquier hora, y su app propia registra cada sesión para que veas la progresión semana a semana, uno de los factores que más ayuda a no abandonar en las primeras semanas. El monitor LED muestra velocidad, distancia, tiempo y calorías sin necesidad del teléfono, soporta hasta 136 kg (la carga más alta del catálogo) y el asiento acolchado hace cómodas las sesiones largas. Su única pega frente a las otras es que no se pliega: necesita un sitio fijo.",
        productSlug: "merach-bicicleta-estatica-app-136kg",
      },
      {
        heading: "Sportstech X150 — para espacios pequeños",
        body: "El X150 es un ergómetro plegable, y ahí está toda su razón de ser: se guarda cuando no se usa. Ofrece 8 niveles de resistencia magnética, suficientes para progresar durante bastante tiempo en un uso doméstico, funcionamiento silencioso y el respaldo de una marca alemana con recorrido, lo que aporta cierta garantía de repuestos. Cuesta 35 euros menos que la MERACH y su gran ventaja es precisamente la que la MERACH no tiene: si vives en un piso donde una bicicleta fija permanente no es viable, esta es la categoría que necesitas. A cambio renuncias a la conectividad con app.",
        productSlug: "sportstech-x150-ergometro-plegable",
      },
      {
        heading: "Sportstech X100-C — con cuerdas de fuerza",
        body: "El X100-C es el más original de los tres y el más económico a 199 euros. Es una bicicleta plegable con display LCD, pero su diferencial son las cuerdas de fuerza incluidas, que permiten trabajar el tren superior mientras pedaleas. No sustituyen a unas mancuernas para un trabajo de fuerza serio, pero añaden activación de brazos y hombros durante el cardio, útil para quien quiere aprovechar una sesión corta al máximo. Es la opción con más accesorios por menos dinero: cardio, algo de fuerza y plegado, todo en un solo aparato.",
        productSlug: "sportstech-x100c-bicicleta-cuerdas",
      },
    ],
    comparison: {
      headers: ["Criterio", "MERACH", "X150 Ergómetro", "X100-C"],
      rows: [
        ["Precio", "249,00 €", "214,00 €", "199,00 €"],
        ["Plegable", "No", "Sí", "Sí"],
        ["App", "Sí — app propia", "No", "No"],
        ["Resistencia", "Magnética", "Magnética 8 niveles", "Magnética"],
        ["Carga máx.", "136 kg", "Consultar ficha", "Consultar ficha"],
        ["Cuerdas de fuerza", "No", "No", "Sí"],
        ["Mejor para", "Entrenar con seguimiento", "Espacio limitado", "Cardio + tren superior"],
      ],
    },
    conclusion: "No hay una bicicleta mejor que las demás en absoluto: hay una mejor para cada perfil. Si el espacio no es un problema y vas a entrenar con regularidad, la MERACH es la compra correcta. Si necesitas guardarla, el X150 resuelve eso sin sacrificar demasiado. Y si buscas el precio más bajo con el mayor número de accesorios, el X100-C con cuerdas cubre ambas cosas.",
    faqs: [
      { q: "¿Cuántas calorías quema una bicicleta estática en 30 minutos?", a: "A intensidad moderada, una persona de unos 75 kg quema aproximadamente entre 200 y 250 kcal en 30 minutos. A intensidad alta puede superar las 300 kcal. Conviene tomar estas cifras como orientativas: los contadores de la consola suelen sobreestimar, porque no conocen el peso real ni la frecuencia cardíaca del usuario." },
      { q: "¿Es mejor la bicicleta estática o la cinta de correr para adelgazar?", a: "A igualdad de intensidad, la cinta quema algo más porque implica soportar el peso corporal. Pero la bicicleta tiene menos impacto articular, hace menos ruido y ocupa menos, factores que la hacen más sostenible para mucha gente. El mejor aparato para adelgazar es el que vas a usar de forma constante durante meses, no el que quema más calorías en teoría." },
      { q: "¿Cuánto ruido hace una bicicleta estática magnética?", a: "Muy poco. La resistencia magnética no genera fricción física entre piezas, así que el sonido dominante es el del pedaleo y el de la transmisión. Permite ver la televisión a volumen normal o mantener una conversación mientras pedaleas, y es notablemente más silenciosa que una cinta de correr." },
      { q: "¿Merece la pena la conectividad con app en una bicicleta estática?", a: "Depende de si eres del tipo de persona que mira los datos de entrenamiento. Si el seguimiento de la progresión te motiva, la app marca la diferencia en la constancia, sobre todo al principio. Si sabes que no vas a abrirla, no pagues por ella: un modelo sin app entrena exactamente igual." },
    ],
  },

  "sportstech-x100c-analisis": {
    intro: "La Sportstech X100-C es la bicicleta estática más original del catálogo: incluye cuerdas de fuerza para trabajar el tren superior mientras pedaleas, algo que ninguna otra bicicleta doméstica en su rango de precio ofrece. Esta guía analiza si ese diferencial realmente aporta valor o es solo un reclamo de marketing.",
    sections: [
      {
        heading: "Qué incluye y cómo funciona",
        body: "El X100-C es una bicicleta plegable con resistencia magnética y un display LCD que muestra velocidad, distancia, tiempo y calorías. Incorpora ruedas de transporte para moverla con facilidad y, como elemento diferencial, unas cuerdas de fuerza con asas que permiten trabajar bíceps, hombros y espalda mientras se pedalea. Su propuesta de valor es combinar cardio y algo de trabajo de fuerza en un solo aparato, para quien quiere aprovechar al máximo una sesión corta sin comprar equipamiento adicional.",
      },
      {
        heading: "Las cuerdas de fuerza: ¿realmente funcionan?",
        body: "Con honestidad: para un entrenamiento de fuerza serio, no. Las cuerdas no ofrecen la resistencia progresiva de unas mancuernas ni el rango de movimiento que exige la hipertrofia, así que quien busque construir músculo no lo conseguirá con ellas. Pero para añadir activación del tren superior durante el cardio, o para personas que quieren tocar varios grupos musculares en una única sesión corta, sí aportan valor real. La clave es entender qué son: un complemento del cardio, no un sustituto de las pesas. Con esa expectativa, cumplen; con la de reemplazar un entrenamiento de fuerza, decepcionan.",
      },
      {
        heading: "Para quién es ideal",
        body: "El X100-C encaja con tres perfiles concretos. Primero, quien quiere el máximo de accesorios por el menor precio posible: a 199 euros es la bicicleta más equipada de su rango. Segundo, quien busca una solución completa en un único aparato para sesiones de 30-40 minutos, sin llenar la casa de material. Y tercero, quien tiene poco tiempo y quiere combinar cardio con algo de trabajo de brazos en la misma sesión. Si te reconoces en alguno de los tres, es una compra sensata.",
        productSlug: "sportstech-x100c-bicicleta-cuerdas",
      },
      {
        heading: "Comparativa con el X150 ergómetro",
        body: "El X150 es 15 euros más caro y no incluye cuerdas de fuerza. A cambio, como ergómetro plegable tiene un diseño más orientado al cardio puro y, probablemente, una experiencia de pedaleo más refinada para ese uso concreto. La decisión es sencilla: si solo quieres cardio y valoras la postura del ergómetro, el X150; si quieres el pack completo con cuerdas y el precio más bajo, el X100-C. No es que uno sea mejor, es que responden a prioridades distintas.",
        productSlug: "sportstech-x150-ergometro-plegable",
      },
    ],
    comparison: {
      headers: ["Característica", "Sportstech X100-C", "Sportstech X150"],
      rows: [
        ["Precio", "199,00 €", "214,00 €"],
        ["Tipo", "Bicicleta plegable", "Ergómetro plegable"],
        ["Cuerdas de fuerza", "Sí", "No"],
        ["Display", "LCD", "Consola básica"],
        ["Marca", "Alemana", "Alemana"],
        ["Mejor para", "Cardio + tren superior", "Cardio puro compacto"],
      ],
    },
    conclusion: "La Sportstech X100-C es una compra interesante si valoras el pack completo: cardio, algo de trabajo de brazos y precio contenido en un aparato plegable. Si buscas la bicicleta más efectiva para cardio puro sin extras, el X150 ergómetro es la opción más específica para eso. Y si quieres conectividad con app y el mejor seguimiento, la MERACH es el siguiente escalón.",
    faqs: [
      { q: "¿La Sportstech X100-C aguanta usuarios de mucho peso?", a: "Sportstech no publica la carga máxima del X100-C de forma destacada en su ficha. Conviene consultarlo con el vendedor antes de comprar si superas los 100 kg, ya que usar cualquier bicicleta cerca de su límite de carga acelera el desgaste de la estructura." },
      { q: "¿Las cuerdas de la X100-C son suficientes para tonificar los brazos?", a: "Para una tonificación básica y activación, sí. Para un trabajo de fuerza progresivo y crecimiento muscular real, no: la resistencia no es ajustable con la precisión necesaria. Su función es complementar el cardio, no sustituir un entrenamiento de fuerza con pesas." },
      { q: "¿La Sportstech X100-C es silenciosa?", a: "Sí. La resistencia magnética es inherentemente silenciosa, y el único ruido que genera es el del pedaleo y la transmisión, no el del sistema de resistencia. Es perfectamente compatible con ver la televisión o trabajar en la misma habitación mientras alguien pedalea." },
      { q: "¿Cada cuánto hay que hacer mantenimiento a una bicicleta estática doméstica?", a: "Las bicicletas de resistencia magnética requieren poco mantenimiento: basta con limpiar el sillín y el cuadro con regularidad y verificar que los tornillos estén apretados cada pocas semanas. A diferencia de las de fricción, no tienen cable de tensión ni zapatas que se desgasten con el uso." },
    ],
  },

  "merach-bicicleta-estatica-analisis": {
    intro: "La MERACH es la bicicleta estática más completa del catálogo por precio. Su propuesta es clara: resistencia magnética silenciosa, app con seguimiento de entrenamiento, soporte para tablet y 136 kg de carga máxima. Esta guía analiza qué significa cada característica en la práctica y para quién es la compra correcta.",
    sections: [
      {
        heading: "La app de MERACH: qué ofrece realmente",
        body: "La app registra velocidad, distancia, tiempo, calorías y cadencia, permite seguir la evolución de cada sesión e incluye modos de entrenamiento preconfigurados. Conviene ser honesto: no es de las apps más pulidas del mercado, con interfaces menos refinadas que las de marcas premium. Pero hace bien su función principal, que es registrar la progresión para que veas cómo mejoras semana a semana. Y ese registro no es un adorno: la evidencia sobre adherencia al ejercicio señala que ver el propio avance es uno de los factores que más sostiene la constancia durante las primeras semanas, que es justo cuando más gente abandona.",
      },
      {
        heading: "136 kg de carga máxima: por qué importa",
        body: "La mayoría de las bicicletas domésticas declaran entre 100 y 110 kg de carga máxima. Los 136 kg de la MERACH amplían el rango de usuarios que pueden usarla con seguridad, algo relevante para personas de mayor peso que a menudo se quedan fuera de las especificaciones de los modelos económicos. Pero el dato importa incluso si pesas mucho menos: una carga máxima más alta suele ser indicador de una construcción más robusta en general, con un cuadro y unos apoyos dimensionados con más margen, lo que se traduce en mayor estabilidad y durabilidad.",
      },
      {
        heading: "Silencio y uso en piso",
        body: "La resistencia magnética de la MERACH no genera fricción entre piezas, así que el ruido dominante durante el uso es el de los pedales y el de la transmisión por correa, ambos muy contenidos. En la práctica esto significa que es perfectamente compatible con ver la televisión, atender videollamadas o entrenar a cualquier hora sin molestar a nadie en casa ni a los vecinos. Para quien vive en un piso, este silencio es a menudo la diferencia entre usar la bicicleta con regularidad o dejarla aparcada por no querer generar ruido.",
        productSlug: "merach-bicicleta-estatica-app-136kg",
      },
      {
        heading: "MERACH frente a Sportstech X150: cuál elegir",
        body: "La MERACH tiene app con seguimiento, mayor carga máxima declarada y un asiento pensado para sesiones largas. El X150, en cambio, se pliega, que es exactamente lo que la MERACH no hace. La decisión se reduce al espacio: si tienes un sitio donde dejar la bicicleta fija, la MERACH entrega más prestaciones por 35 euros más. Si necesitas guardarla entre sesiones porque el espacio no da para tenerla siempre montada, el X150 resuelve ese problema y la MERACH deja de ser opción por muy completa que sea.",
        productSlug: "sportstech-x150-ergometro-plegable",
      },
    ],
    comparison: {
      headers: ["Característica", "MERACH", "Sportstech X150"],
      rows: [
        ["Precio", "249,00 €", "214,00 €"],
        ["Plegable", "No", "Sí"],
        ["App con seguimiento", "Sí", "No"],
        ["Carga máxima", "136 kg", "Consultar ficha"],
        ["Silencio", "Magnética silenciosa", "Magnética silenciosa"],
        ["Mejor para", "Entrenar con progresión", "Guardar entre sesiones"],
      ],
    },
    conclusion: "La MERACH es la bicicleta correcta si vas a entrenar con regularidad, quieres registrar tu progresión y tienes espacio para dejarla fija. Si el espacio es tu limitación principal, el X150 resuelve ese problema por 35 euros menos. Y si buscas el precio más bajo posible con algún extra, el X100-C es la tercera opción. Cada una resuelve un problema distinto.",
    faqs: [
      { q: "¿Cuánto espacio ocupa la MERACH bicicleta estática?", a: "La MERACH no es plegable, así que el espacio que ocupa es su huella real de uso permanente. Conviene consultar las dimensiones exactas en la ficha de Amazon antes de comprar y medirlas en tu espacio, asegurándote de dejar hueco para montar y bajar de la bicicleta con comodidad." },
      { q: "¿La MERACH funciona sin la app?", a: "Sí. El monitor LED incorporado muestra velocidad, distancia, tiempo y calorías de forma autónoma, sin necesidad de conectar el teléfono. La app añade el seguimiento histórico y los programas de entrenamiento, pero no es imprescindible para usar la bicicleta con normalidad." },
      { q: "¿Cada cuánto hay que ajustar el sillín de la MERACH?", a: "El sillín se ajusta según el usuario, así que hay que revisarlo antes de cada sesión si la bicicleta la comparten varias personas. La altura correcta es aquella en la que la rodilla queda ligeramente flexionada en el punto más bajo del pedaleo; una altura incorrecta puede generar molestias en las rodillas a medio plazo." },
      { q: "¿La MERACH aguanta sesiones largas de más de una hora?", a: "Sí. Su asiento acolchado y la robustez de la estructura están pensados para ese uso. Las resistencias magnéticas no se calientan ni se degradan con el uso prolongado como las de fricción, así que no hay ninguna limitación técnica para sesiones largas más allá de tu propia resistencia." },
    ],
  },

  "mini-bicicleta-escritorio-trabajar": {
    intro: "La mini bicicleta de escritorio no es una bicicleta estática y no pretende serlo. Es un pedalier: un bloque de pedales que se coloca bajo la mesa para mover las piernas mientras se trabaja sentado o de pie. Su propuesta de valor es concreta, combatir el sedentarismo de horas sentado, y tiene un límite igual de claro: no sustituye a una sesión de cardio.",
    sections: [
      {
        heading: "Para qué sirve realmente una mini bicicleta de escritorio",
        body: "Su función principal es romper el sedentarismo continuo, ese que se acumula en jornadas de ocho horas sin apenas levantarse. Aporta una quema calórica modesta durante las horas de trabajo y ayuda a mejorar la circulación en las piernas, contrarrestando la sensación de piernas cargadas al final del día. Lo que no hace, y conviene tenerlo claro antes de comprar, es servir para perder peso de forma significativa ni para mejorar el rendimiento cardiovascular: para eso hace falta una intensidad que un pedalier bajo la mesa, pensado para pasar desapercibido mientras trabajas, no permite alcanzar.",
      },
      {
        heading: "Sportstech DFX70: análisis",
        body: "El DFX70 ofrece 8 niveles de resistencia magnética, funcionamiento silencioso, asa integrada y ruedas de transporte, con transmisión por correa. Por 119 euros es la opción más económica para empezar a mover las piernas durante la jornada laboral, y su diseño es compatible con una silla estándar y un escritorio normal, sin necesidad de mobiliario especial. Es la puerta de entrada al escritorio activo para quien quiere probar el concepto sin una gran inversión, y su bajo perfil permite guardarlo en cualquier rincón cuando no se usa.",
        productSlug: "sportstech-dfx70-mini-bicicleta-escritorio",
      },
      {
        heading: "¿Se puede usar de pie con un escritorio elevable?",
        body: "Sí, pero hay que tener en cuenta el ángulo de pedaleo. Con el escritorio a la altura de pie estándar, el ángulo de la cadera mientras pedaleas puede resultar incómodo, porque el gesto de pedalear de pie es distinto al de hacerlo sentado. Funciona mejor con escritorios ligeramente más altos, o con la persona de pie y las piernas algo separadas para acomodar el movimiento. Antes de asumir que lo usarás de pie, conviene probar la postura, porque para la mayoría de la gente el pedalier rinde mejor en posición sentada.",
      },
      {
        heading: "Mini bicicleta frente a cinta bajo escritorio: cuál elegir",
        body: "Son dos soluciones al mismo problema con enfoques opuestos. La cinta permite trabajar caminando de pie, lo que es más natural desde el punto de vista ergonómico y más activo, con mayor gasto calórico. El pedalier permite seguir sentado, que para algunas personas y ciertos tipos de trabajo resulta más compatible con la tarea. La cinta genera más actividad pero cuesta más y ocupa más; el pedalier es más discreto, más silencioso y mucho más barato. La elección depende de si tu trabajo y tu cuerpo llevan mejor estar de pie caminando o sentado pedaleando.",
        productSlug: "sportstech-x100c-bicicleta-cuerdas",
      },
    ],
    comparison: {
      headers: ["Criterio", "DFX70 mini bicicleta", "Cinta bajo escritorio"],
      rows: [
        ["Precio", "119,00 €", "349-399 €"],
        ["Posición de uso", "Sentado o de pie", "De pie"],
        ["Gasto calórico", "Bajo-moderado", "Moderado"],
        ["Ruido", "Muy bajo", "Bajo"],
        ["Ergonomía", "Requiere ajuste", "Más natural de pie"],
        ["Ocupa espacio", "Mínimo", "Más"],
      ],
    },
    conclusion: "La mini bicicleta de escritorio es la solución más económica y discreta para romper el sedentarismo durante la jornada laboral. No es un sustituto del ejercicio real, pero si trabajas ocho horas sentado, añadir 2 o 3 horas de pedaleo suave mejora la circulación y suma calorías de forma pasiva. Si quieres más actividad y puedes trabajar de pie, una cinta bajo el escritorio es más efectiva, aunque más cara y más grande.",
    faqs: [
      { q: "¿Sirve realmente la mini bicicleta de escritorio para perder peso?", a: "Contribuye de forma modesta. Pedalear suave durante dos horas quema aproximadamente entre 100 y 150 kcal, según el peso y la resistencia. No es una cifra que cambie la composición corporal por sí sola, pero combinada con una dieta razonable sí suma a lo largo del tiempo, sobre todo si partes de una actividad muy baja." },
      { q: "¿Molesta la mini bicicleta a los compañeros si trabajo en oficina?", a: "La transmisión por correa y la resistencia magnética hacen que el DFX70 sea muy silencioso. En una oficina abierta, el sonido es prácticamente imperceptible a más de un metro de distancia, así que no debería suponer una molestia para quienes trabajan cerca." },
      { q: "¿Se puede usar la mini bicicleta con cualquier silla?", a: "Sí, siempre que la altura de la silla permita un ángulo de rodilla cómodo al pedalear. Las sillas muy bajas pueden generar molestias en las rodillas. La posición ideal es con las rodillas a unos 90 grados cuando los pedales están en el punto medio del recorrido." },
      { q: "¿Cuánto tiempo al día se recomienda usar la mini bicicleta?", a: "No hay un límite establecido. Muchas personas la usan de forma intermitente durante toda la jornada, parando cuando necesitan concentración máxima y reanudando en tareas más rutinarias. Lo razonable es empezar con 30-60 minutos y observar cómo responden tus piernas y caderas antes de aumentar." },
    ],
  },

  "ergometro-vs-bicicleta-estatica": {
    intro: "Ergómetro y bicicleta estática se usan a menudo como sinónimos, pero no son lo mismo. La diferencia no es solo de nombre: afecta a la postura, a los músculos trabajados y a la experiencia de pedaleo. Esta guía explica qué es cada uno y cuándo elegir uno sobre el otro según tu objetivo y tu estado físico.",
    sections: [
      {
        heading: "Qué es un ergómetro",
        body: "El ergómetro, también llamado bicicleta reclinada o semirreclinada, tiene la postura más tumbada de las dos: el respaldo va más hacia atrás y los pedales quedan más adelantados respecto al cuerpo, en lugar de justo debajo. Esa geometría reduce la carga sobre la zona lumbar y el cuello, lo que lo hace especialmente recomendable para personas con dolores de espalda o que buscan una sesión de cardio más relajada y confortable. En cuanto a la musculatura, la potencia se genera más desde los glúteos y algo menos desde los cuádriceps que en una bicicleta vertical.",
      },
      {
        heading: "Qué es una bicicleta estática vertical",
        body: "La bicicleta estática clásica tiene una postura más erguida, similar a la de una bicicleta de carretera, con el sillín encima de los pedales. Esa posición activa más los cuádriceps y el core para mantener la estabilidad, y permite alcanzar mayor intensidad por la propia mecánica del gesto. Por eso la vertical es la opción más adecuada para el entrenamiento cardiovascular serio y para quien quiera acercarse a la experiencia del spinning, donde la inclinación hacia adelante es parte del ejercicio.",
      },
      {
        heading: "Sportstech X150: el ergómetro plegable",
        body: "El X150 es la representación de ergómetro en el catálogo: 8 niveles de resistencia magnética, plegable y con el respaldo de una marca alemana. Es la opción para quien busca hacer cardio con el menor estrés lumbar posible y, además, necesita poder guardar el aparato entre sesiones. Combina las dos ventajas del formato ergómetro (postura cómoda y menor carga en la espalda) con la practicidad del plegado, un conjunto poco habitual en su rango de precio.",
        productSlug: "sportstech-x150-ergometro-plegable",
      },
      {
        heading: "MERACH: la bicicleta estática vertical con app",
        body: "La MERACH representa el formato vertical: postura erguida, app con seguimiento de la progresión y 136 kg de carga máxima. Es la elección para quien busca un cardio más intenso y quiere registrar su evolución sesión a sesión, aprovechando que la postura vertical permite exigirse más. A cambio no se pliega, así que requiere un espacio fijo. Para quien prioriza la intensidad y el seguimiento sobre la comodidad postural, es la opción más completa.",
        productSlug: "merach-bicicleta-estatica-app-136kg",
      },
    ],
    comparison: {
      headers: ["Criterio", "Ergómetro (X150)", "Bicicleta vertical (MERACH)"],
      rows: [
        ["Precio", "214,00 €", "249,00 €"],
        ["Postura", "Semirreclinada", "Erguida"],
        ["Músculos principales", "Glúteos y cuádriceps", "Cuádriceps y core"],
        ["Estrés lumbar", "Bajo", "Moderado"],
        ["Plegable", "Sí", "No"],
        ["App", "No", "Sí"],
        ["Mejor para", "Espalda sensible", "Cardio intenso con seguimiento"],
      ],
    },
    conclusion: "Si tienes la espalda sensible o buscas una sesión de cardio más relajada y confortable, el ergómetro X150 es la elección correcta. Si quieres entrenar con mayor intensidad, registrar tu progresión con app y tienes espacio para una bicicleta fija, la MERACH es la opción más completa.",
    faqs: [
      { q: "¿El ergómetro trabaja lo mismo que la bicicleta estática?", a: "Trabaja los mismos músculos principales, pero con un énfasis diferente. El ergómetro activa más los glúteos por la postura reclinada; la bicicleta vertical activa más los cuádriceps por la postura erguida. El gasto calórico es similar a igual intensidad, así que la elección va más por comodidad y objetivo que por eficacia." },
      { q: "¿Es el ergómetro mejor para personas con problemas de rodilla?", a: "La postura más reclinada reduce algo el ángulo de flexión de la rodilla, lo que puede resultar más cómodo para algunas personas. Pero la recomendación depende del tipo concreto de lesión, así que conviene consultar con tu médico o fisioterapeuta antes de elegir, en lugar de asumir que siempre es la mejor opción." },
      { q: "¿Se puede hacer spinning en un ergómetro?", a: "No en el sentido clásico. El spinning requiere la postura inclinada hacia adelante y la capacidad de ponerse de pie sobre los pedales, algo que un ergómetro, por su geometría reclinada, no permite. Para hacer spinning en casa necesitas una bicicleta vertical o una específica de spinning." },
      { q: "¿El ergómetro Sportstech X150 es fácil de montar?", a: "Los ergómetros plegables suelen requerir un montaje inicial de unos 30-45 minutos siguiendo las instrucciones. Una vez montado, el plegado y desplegado del día a día es rápido. Sportstech incluye las instrucciones y el hardware necesario, así que no hace falta comprar nada aparte para el montaje." },
    ],
  },

  "bicicleta-estatica-adelgazar-resultados": {
    intro: "La bicicleta estática puede ser una herramienta eficaz para adelgazar, pero sus resultados dependen de cómo se use. Esta guía explica qué dice la evidencia sobre las calorías que quema, qué frecuencia e intensidad son necesarias para ver resultados reales, y qué errores comunes bloquean el progreso.",
    sections: [
      {
        heading: "Cuántas calorías quema la bicicleta estática",
        body: "A intensidad moderada, entendida como el 65-75 % de la frecuencia cardíaca máxima, una persona de 75 kg quema entre 400 y 500 kcal por hora. A intensidad alta, en torno al 80-85 %, puede superar las 600 kcal por hora. Traducido a sesiones reales, que rara vez duran una hora completa: en 30 minutos hablamos de 200-300 kcal a intensidad moderada y de 300-400 kcal a intensidad alta. Son cifras que, acumuladas a lo largo de semanas, marcan la diferencia, aunque una sesión aislada no parezca gran cosa.",
      },
      {
        heading: "Cuánto tiempo para ver resultados",
        body: "Con 3 o 4 sesiones semanales de 30-45 minutos a intensidad moderada, las mejoras cardiovasculares se notan en 2-3 semanas: menos fatiga, mejor recuperación, más resistencia. La pérdida de peso visible, acompañada de una alimentación adecuada, suele aparecer entre la cuarta y la sexta semana. Sin ningún ajuste de la dieta, la bicicleta por sí sola produce una pérdida lenta pero real, del orden de 0,2-0,4 kg por semana en la mayoría de los casos. No es espectacular, pero es sostenible, que es lo que importa a medio plazo.",
      },
      {
        heading: "El error más común: solo cardio",
        body: "El fallo más extendido es hacer únicamente bicicleta. El entrenamiento de fuerza preserva la masa muscular durante la pérdida de peso y mantiene elevado el metabolismo basal, de modo que quien hace solo cardio puede adelgazar, pero arriesgándose a que parte de lo que pierde sea músculo, no grasa. Y perder músculo hace más difícil mantener el resultado después. La combinación de bicicleta con algo de trabajo de fuerza, aunque sea con bandas elásticas en casa, produce una composición corporal claramente mejor que el cardio aislado.",
      },
      {
        heading: "MERACH para seguimiento de progresión",
        body: "La app de la MERACH registra calorías, velocidad y distancia sesión a sesión, lo que permite ver la progresión en datos concretos. Esto importa más de lo que parece: ver la evolución reflejada en números es uno de los factores que más impacta en la constancia durante las primeras semanas, que es precisamente cuando se producen la mayoría de los abandonos. Convertir una sensación difusa de \"estoy mejorando\" en un gráfico que lo confirma ayuda a sostener el hábito el tiempo suficiente para que los resultados aparezcan.",
        productSlug: "merach-bicicleta-estatica-app-136kg",
      },
      {
        heading: "Plan de 4 semanas para empezar",
        body: "Para arrancar sin lesiones ni abandono, conviene una progresión suave. Semanas 1 y 2: tres sesiones de 25 minutos a intensidad baja-moderada, con el objetivo de crear el hábito más que de exigirse. Semanas 3 y 4: cuatro sesiones de 35 minutos, añadiendo 5 minutos de mayor intensidad al final de cada sesión para empezar a introducir el estímulo que acelera la quema. A partir de la quinta semana, con la base ya construida, se puede subir la duración o la intensidad según cómo responda el cuerpo.",
        productSlug: "sportstech-x150-ergometro-plegable",
      },
    ],
    comparison: {
      headers: ["Intensidad", "Calorías/hora aprox. (75 kg)", "Sensación de esfuerzo", "Para quién"],
      rows: [
        ["Baja", "250-350 kcal", "Puede mantener una conversación larga", "Principiantes"],
        ["Moderada", "400-500 kcal", "Puede hablar con frases cortas", "Intermedio"],
        ["Alta", "550-650 kcal", "Difícil hablar", "Avanzado"],
      ],
    },
    conclusion: "La bicicleta estática funciona para adelgazar si se usa con regularidad, con suficiente intensidad y combinada con una alimentación razonable. No esperes resultados espectaculares en dos semanas, pero sí resultados reales y sostenibles en 4-8 semanas. El factor decisivo no es el modelo de bicicleta sino la constancia: cualquier bicicleta buena usada regularmente supera a la mejor bicicleta usada dos veces al mes.",
    faqs: [
      { q: "¿Cuánto tiempo en bicicleta estática para perder 1 kg?", a: "Para perder 1 kg de grasa se necesita un déficit acumulado de unas 7.700 kcal. Con sesiones de unas 400 kcal por hora y 4 sesiones semanales, se alcanza ese déficit solo con el ejercicio en 3-4 semanas. Combinado con un pequeño ajuste de la alimentación, el plazo puede reducirse a 2-3 semanas." },
      { q: "¿Es mejor pedalear rápido o con mucha resistencia para adelgazar?", a: "Lo que determina el gasto calórico es la intensidad total, es decir, la combinación de velocidad y resistencia, no una de las dos por separado. Lo importante es mantenerse en la zona de esfuerzo adecuada: suficiente para que cueste, pero no tanto como para no poder sostener la sesión completa. Ese equilibrio es el que maximiza las calorías quemadas." },
      { q: "¿La bicicleta estática adelgaza las piernas?", a: "La pérdida de grasa localizada no existe: el cuerpo pierde grasa de forma general, no en la zona que se trabaja. La bicicleta tonifica la musculatura de las piernas, lo que puede hacer que se vean más definidas, pero la reducción de grasa en esa zona concreta depende del déficit calórico total del cuerpo, no del ejercicio localizado." },
      { q: "¿Cuánto tiempo al día hay que usar la bicicleta para adelgazar?", a: "Entre 30 y 45 minutos de pedaleo a intensidad moderada, 3 o 4 veces por semana, es suficiente para producir resultados. Más tiempo no es necesariamente mejor: la calidad y la consistencia de las sesiones importan más que la cantidad total de minutos, y alargar en exceso cada sesión suele llevar al abandono." },
    ],
  },

  "mancuernas-ajustables-vs-fijas": {
    intro: "La decisión entre mancuernas ajustables y fijas es más sencilla de lo que parece si tienes claros dos datos: cuánto espacio tienes y cuánto tiempo llevas o piensas llevar entrenando. Esta guía responde la pregunta de forma honesta, sin empujarte hacia la opción más cara solo porque lo sea.",
    sections: [
      {
        heading: "Cuándo las fijas son la respuesta correcta",
        body: "Si vas a usar siempre el mismo peso, ya sea para un circuito fijo, para rehabilitación o para ejercicios muy concretos, las fijas son más baratas, más duraderas y más simples. No tienen partes móviles que puedan romperse ni un mecanismo del que fiarse con carga alta sobre la cara. Las ManiBoom hexagonales a 59,99 euros son el ejemplo perfecto: un par de mancuernas sólidas, con forma que evita que rueden por el suelo, que cumplen su función sin complicaciones y sin el sobreprecio de un sistema que quizá no vas a aprovechar.",
      },
      {
        heading: "Cuándo las ajustables justifican el precio",
        body: "Hay tres escenarios donde la inversión tiene sentido. El primero es la progresión a largo plazo: si vas a entrenar durante años, necesitarás pesos cada vez mayores, y comprar pares fijos sucesivos acaba costando más que un ajustable y llenando la casa de hierro. El segundo es el espacio limitado: un par de ajustables ocupa lo mismo que un par fijo y cubre el rango de quince. El tercero es la variedad de ejercicios: si entrenas cuerpo completo con cargas distintas para cada músculo, el cambio de peso en segundos es lo que permite encadenar ejercicios sin romper el ritmo de la sesión.",
        productSlug: "lullax-neo36-mancuernas-ajustables",
      },
      {
        heading: "ManiBoom 15 kg — la entrada equilibrada",
        body: "Las ManiBoom son la puerta de entrada sensata al entrenamiento de fuerza en casa. Su diseño hexagonal evita que rueden, un detalle práctico que se agradece cada sesión, e incluyen una barra que las convierte en barra larga para ampliar el repertorio de ejercicios. A 59,99 euros son la opción para quien empieza y no quiere arriesgar 349 euros en un hábito que todavía no ha consolidado. Cubren la mayoría de los ejercicios de un principiante o intermedio sin que la inversión duela si al final el entrenamiento no cuaja.",
        productSlug: "maniboom-mancuernas-hexagonales-15kg",
      },
      {
        heading: "La alternativa más económica: bandas elásticas",
        body: "Si ni siquiera quieres comprometerte con unas mancuernas, las bandas elásticas son el primer paso más barato posible. Por 12,99 euros, un set de bandas cubre press, remo, sentadilla y trabajo de glúteo, ocupa lo que un puño y no daña nada al usarse. No son lo mismo que unas mancuernas (no replican la sensación de peso libre ni su progresión precisa de carga), pero para arrancar y comprobar si el hábito se te queda son una inversión mínima e inteligente. Muchos home gyms empiezan exactamente aquí.",
        productSlug: "fokky-bandas-elasticas-set-4-tpe",
      },
    ],
    comparison: {
      headers: ["Criterio", "Ajustables (LULLAX)", "Fijas (ManiBoom)", "Bandas (Fokky)"],
      rows: [
        ["Precio", "349,00 €", "59,99 €", "12,99 €"],
        ["Rango de peso", "2,5-36 kg", "15 kg fijo", "4 niveles de resistencia"],
        ["Cambio de peso", "Segundos", "Manual", "Segundos"],
        ["Espacio", "Mínimo", "Mínimo", "Casi nulo"],
        ["Ideal para", "Progresión a años", "Empezar sin gastar", "Primer equipamiento"],
      ],
    },
    conclusion: "Si llevas menos de seis meses entrenando o no sabes si el hábito se te va a quedar, empieza con las ManiBoom o las Fokky. Si ya tienes el hábito consolidado y la progresión te lo pide, las LULLAX NEO36 son la inversión que no repetirás. La pregunta no es cuál es mejor en abstracto, sino en qué punto de tu camino estás.",
    faqs: [
      { q: "¿Qué peso de mancuernas necesito para empezar?", a: "Para el tren superior (curl, press, extensiones), un principiante adulto suele empezar con 4-8 kg. Para el tren inferior y la espalda, entre 8 y 15 kg. Las ManiBoom a 15 kg cubren holgadamente el rango inicial para la mayoría de las personas, y la referencia real no es un número fijo sino la técnica: el peso correcto es el que te permite completar las series con buena forma y algo de margen." },
      { q: "¿Las mancuernas ajustables se rompen más fácilmente?", a: "El mecanismo de selección es su punto débil, y su enemigo número uno es soltarlas contra el suelo: están diseñadas para posarse, no para dejarse caer. Con ese cuidado, duran muchos años en uso doméstico. Conviene revisar de vez en cuando que el sistema de bloqueo encaja con firmeza antes de cada serie, sobre todo en ejercicios por encima de la cabeza." },
      { q: "¿Se puede hacer todo el cuerpo con solo mancuernas?", a: "Sí, prácticamente. Curl, press, remo, sentadilla, zancada, peso muerto rumano y press de hombro se hacen todos con mancuernas. La limitación principal aparece en los ejercicios de tirón vertical, como las dominadas, donde necesitas una barra u otro tipo de equipamiento para colgarte. Para el resto de patrones, las mancuernas bastan." },
      { q: "¿Las bandas elásticas pueden sustituir a las mancuernas?", a: "Parcialmente. Las bandas cubren bien los movimientos de empuje y tracción, pero no replican la sensación del peso libre ni la progresión precisa de carga que ofrecen las mancuernas. Son un complemento excelente y una primera inversión muy sensata, pero para un usuario que progresa acaban quedándose cortas como herramienta única." },
    ],
  },

  "lullax-neo36-analisis-opinion": {
    intro: "Las LULLAX NEO36 son las mancuernas ajustables más completas del catálogo: 36 kg por mancuerna en 14 posiciones, con base de almacenamiento incluida. Esta guía analiza qué significa eso en la práctica, qué las diferencia de otras ajustables del mercado y para quién son realmente la compra correcta.",
    sections: [
      {
        heading: "36 kg por mancuerna: cuánto es eso realmente",
        body: "36 kg por mancuerna cubren prácticamente cualquier ejercicio de fuerza doméstico durante años. Para poner el dato en contexto: el press de banca con mancuernas de un usuario intermedio masculino ronda los 20-30 kg por mano, y el remo con mancuerna puede superar los 30 kg con experiencia. Para mujeres, el rango de trabajo habitual está entre 8 y 20 kg. En ambos casos, 36 kg dan margen para años de progresión antes de tocar techo, lo que significa que no vas a necesitar comprar nada más por mucho que avances.",
      },
      {
        heading: "El mecanismo de selección rápida: cómo funciona",
        body: "Girar el dial selecciona solo los discos que se acoplan al mango, de modo que el cambio de peso lleva entre 2 y 5 segundos, frente a los 30-60 segundos de cambiar discos manualmente. Las NEO36 tienen además una particularidad útil: al seleccionar un peso inferior al máximo, la mancuerna se acorta físicamente, lo que mejora la maniobrabilidad en ejercicios donde una mancuerna larga estorba, como el curl de bíceps o las extensiones de tríceps. Es un detalle que las mancuernas ajustables de longitud fija no resuelven.",
      },
      {
        heading: "Lo que más valoran los usuarios",
        body: "Tres elogios se repiten. El primero es la solidez de la construcción, más robusta que la media de las ajustables económicas, lo que transmite confianza al manejar cargas altas. El segundo es el rango de 36 kg, que da margen real para años y evita la sensación de haber comprado algo que se quedará pequeño pronto. Y el tercero es la base de almacenamiento incluida, que evita tener que buscar por separado una solución para guardarlas ordenadas y accesibles, un problema que muchas ajustables dejan sin resolver.",
      },
      {
        heading: "Lo que hay que saber antes de comprar",
        body: "Con honestidad, tres advertencias. La primera: no se pueden soltar contra el suelo, porque el mecanismo de selección se daña; hay que posarlas con cuidado. La segunda: son más anchas que las mancuernas fijas del mismo peso, algo que se nota en ejercicios de agarre neutro cercano al cuerpo. Y la tercera, la más importante: 349 euros son una barrera de entrada real, y esta compra solo tiene sentido si ya llevas tiempo entrenando y sabes que vas a seguir haciéndolo. Para un hábito sin consolidar, es mucho dinero en juego.",
        productSlug: "lullax-neo36-mancuernas-ajustables",
      },
      {
        heading: "LULLAX frente a ManiBoom: para quién es cada una",
        body: "Si llevas menos de un año entrenando, las ManiBoom a 59,99 euros tienen más sentido: cumplen la misma función básica sin arriesgar 349 euros en algo que quizá no uses. Las LULLAX, en cambio, son para el usuario que ya sabe que el hábito se ha quedado y quiere el equipamiento definitivo, ese que no tendrá que sustituir ni ampliar en años. No compiten en la misma liga: una es la entrada prudente y la otra la inversión de quien ya tiene claro su compromiso.",
        productSlug: "maniboom-mancuernas-hexagonales-15kg",
      },
    ],
    comparison: {
      headers: ["Criterio", "LULLAX NEO36", "ManiBoom 15 kg"],
      rows: [
        ["Precio", "349,00 €", "59,99 €"],
        ["Peso máximo", "36 kg por mancuerna", "15 kg fijo"],
        ["Cambio de peso", "2-5 segundos", "Manual con discos"],
        ["Longitud variable", "Sí — se acorta", "No"],
        ["Base incluida", "Sí", "No"],
        ["Mejor para", "Usuarios consolidados", "Empezar sin gastar de más"],
      ],
    },
    conclusion: "Las LULLAX NEO36 son la mancuerna definitiva para el home gym, el par que no repetirás en años. Su precio se justifica si llevas tiempo entrenando y la progresión lo pide. Si no estás en ese punto, las ManiBoom son la compra más inteligente: mismo objetivo básico, sin arriesgar de más.",
    faqs: [
      { q: "¿Las LULLAX NEO36 son compatibles con cualquier ejercicio?", a: "Sí para la mayoría. La excepción son los ejercicios donde las mancuernas se sueltan al suelo, como los levantamientos olímpicos o el snatch: el mecanismo no está diseñado para ese trato. Para la fuerza clásica y la hipertrofia, que es lo que hace la inmensa mayoría de la gente en casa, cubren absolutamente todo." },
      { q: "¿Cuánto pesan las LULLAX NEO36 en su configuración mínima?", a: "El mango más los discos mínimos pesa aproximadamente 2,5 kg por mancuerna, que es el punto de partida del rango ajustable. Conviene consultar la ficha de Amazon para el dato exacto actualizado, ya que el peso mínimo determina si sirven también para ejercicios de aislamiento ligeros como las elevaciones laterales." },
      { q: "¿Las LULLAX NEO36 caben en un piso pequeño?", a: "Con la base incluida, el par ocupa el equivalente a una caja de zapatos grande. Es probablemente el equipamiento de fuerza con mejor relación entre peso útil y espacio ocupado del mercado: 36 kg de carga por mano en el hueco que ocuparía un solo par de mancuernas fijas ligeras." },
      { q: "¿Merece la pena pagar 349 € por unas mancuernas?", a: "Si las vas a usar durante tres a cinco años, sí. El coste repartido por año es inferior al de la cuota anual de la mayoría de los gimnasios, y el equipamiento es tuyo para siempre, sin desplazamientos ni esperas. Si no tienes claro que el hábito vaya a durar, empieza con algo más económico y da el salto cuando la progresión lo pida." },
    ],
  },

  "kettlebell-para-empezar-peso": {
    intro: "La kettlebell no es una mancuerna con otra forma. Su centro de gravedad, desplazado respecto al asa, activa músculos estabilizadores que las mancuernas no trabajan de la misma manera, y permite movimientos balísticos como los swings o los snatches, que son a la vez ejercicio de fuerza y de cardio. Esta guía explica qué peso elegir para empezar y por qué la kettlebell merece un sitio en tu casa.",
    sections: [
      {
        heading: "Qué peso de kettlebell elegir para empezar",
        body: "Para hombres adultos sin experiencia, el rango estándar de entrada es de 12 a 16 kg: 12 kg si partes de cero o tienes poca base de fuerza, y 16 kg si ya haces algo de ejercicio con regularidad, aunque no sea con pesas. Para mujeres, el rango es de 8 a 12 kg: 8 kg para empezar desde cero y 12 kg si ya entrenas. Puede sorprender que se recomiende un peso relativamente alto para empezar, pero es lógico: el swing, el ejercicio central, es un movimiento de cadera potente que necesita algo de carga para ejecutarse bien. La JOWY a 16 kg es el peso de entrada estándar masculino.",
      },
      {
        heading: "Por qué la kettlebell es diferente a las mancuernas",
        body: "Las mancuernas trabajan patrones de fuerza analíticos, aislados músculo a músculo. La kettlebell trabaja patrones de movimiento funcionales: el swing activa a la vez glúteos, isquiotibiales, core y espalda; el turkish get-up implica prácticamente todo el cuerpo en un solo gesto. El resultado es una mayor eficiencia por tiempo de sesión y un trabajo cardiovascular integrado que las mancuernas, por su naturaleza más estática, no ofrecen del mismo modo. No es que una sea mejor que la otra: hacen cosas distintas y se complementan.",
      },
      {
        heading: "Los cuatro ejercicios básicos para empezar",
        body: "Cuatro movimientos cubren los patrones fundamentales. El swing ruso es el ejercicio insignia de la kettlebell: una bisagra de cadera potente que trabaja glúteos, isquios y core. El goblet squat, sujetando la kettlebell contra el pecho, es una sentadilla frontal ideal para aprender la técnica correcta porque la posición del peso corrige el gesto de forma natural. El press de hombro, vertical y unilateral, trabaja el hombro y el core estabilizador. Y el remo unilateral, un tirón horizontal, trabaja la espalda y el bíceps. Con estos cuatro tienes un entrenamiento de cuerpo completo.",
      },
      {
        heading: "JOWY Kettlebell 16 kg: análisis",
        body: "La JOWY es de PVC relleno de arena de acero, un detalle que importa más de lo que parece en casa: no daña el suelo al apoyarla, algo determinante si entrenas sobre parquet o baldosa sin una plataforma protectora. Su asa es ergonómica y antideslizante para un agarre seguro incluso con las manos sudadas. A 34,99 euros es la opción más asequible del catálogo y corresponde al peso de entrada masculino estándar, lo que la convierte en una forma económica de empezar con la kettlebell sin renunciar a la calidad de construcción.",
        productSlug: "jowy-kettlebell-pvc-16kg",
      },
      {
        heading: "Cuándo pasar a mancuernas ajustables",
        body: "La kettlebell y las mancuernas no compiten: se complementan. La kettlebell brilla en los movimientos funcionales y en el cardio integrado; las mancuernas, en la fuerza y la hipertrofia analítica, donde poder ajustar la carga con precisión para cada ejercicio marca la diferencia. Un home gym completo acaba teniendo las dos cosas. Si empiezas por la kettlebell, el momento de añadir unas mancuernas ajustables llega cuando quieras trabajar músculos concretos con progresión fina, algo que un solo peso fijo no permite.",
        productSlug: "lullax-neo36-mancuernas-ajustables",
      },
    ],
    comparison: {
      headers: ["Perfil", "Peso recomendado", "Por qué"],
      rows: [
        ["Mujer sin base", "8 kg", "Swing y goblet squat con técnica correcta"],
        ["Mujer con base", "12 kg", "Permite progresar en press y remo"],
        ["Hombre sin base", "12 kg", "Rango funcional sin abrumar"],
        ["Hombre con base", "16 kg", "Estándar de entrada para adulto activo"],
        ["Avanzado/a", "20-24 kg", "Progresión tras dominar los básicos"],
      ],
    },
    conclusion: "Para la mayoría de los hombres adultos que empiezan, 16 kg es el peso correcto: suficiente para aprender los movimientos con técnica y con margen para progresar durante meses. Para mujeres, entre 8 y 12 kg según el punto de partida. La JOWY a 34,99 euros es la forma más económica de entrar en el mundo de la kettlebell sin comprometer la calidad.",
    faqs: [
      { q: "¿Es mejor la kettlebell de hierro o la de PVC?", a: "La de hierro es el formato clásico y el preferido para uso intensivo, pero daña el suelo si se apoya sin cuidado. La de PVC con relleno de arena, como la JOWY, es más suave con las superficies del hogar y perfectamente válida para el entrenamiento doméstico. La diferencia de rendimiento entre ambas es nula; la diferencia práctica en casa, con un parquet de por medio, es importante." },
      { q: "¿Se puede entrenar solo con kettlebell?", a: "Sí, perfectamente. Muchos programas de fuerza y acondicionamiento se estructuran enteramente alrededor de la kettlebell: sus movimientos balísticos aportan el cardio y los de fuerza trabajan los patrones fundamentales. La única limitación es la variedad de carga: con un solo peso, la progresión tiene un techo que tarde o temprano pide añadir otra kettlebell más pesada o mancuernas." },
      { q: "¿La kettlebell sirve para perder grasa?", a: "Sí, especialmente los circuitos de swings e intervalos. La densidad de trabajo que permite en poco tiempo genera un gasto calórico similar al de un HIIT, pero con mucho menor impacto articular. Es una de las herramientas más eficientes por minuto de entrenamiento para perder grasa preservando la masa muscular, que es justo lo que interesa en un proceso de definición." },
      { q: "¿Cuánto tiempo al día hay que entrenar con kettlebell para ver resultados?", a: "Sesiones de 20-30 minutos, 3 o 4 veces por semana, bastan para notar mejoras en fuerza y resistencia en 3-4 semanas. La kettlebell permite sesiones cortas e intensas gracias a su carácter funcional, lo que la hace especialmente adecuada para quienes disponen de poco tiempo y necesitan aprovechar cada minuto de entrenamiento." },
    ],
  },

  "bandas-elasticas-musculacion-guia": {
    intro: "Las bandas elásticas son el equipamiento de fuerza con mejor relación entre precio y versatilidad del mercado. Por menos de 15 euros puedes trabajar prácticamente todos los grupos musculares, añadir resistencia a los ejercicios de peso corporal y hacer movilidad y rehabilitación. Esta guía explica cómo elegirlas y cómo usarlas bien para sacarles todo el partido.",
    sections: [
      {
        heading: "Tipos de bandas elásticas",
        body: "Hay tres tipos principales y conviene no confundirlos. Las bandas de loop o bucle son un aro cerrado de distintos grosores, que se usan para sentadillas, hip thrusts, dominadas asistidas y trabajo de glúteo. Las bandas de resistencia con asas, del tipo tubo, incluyen mangos y sirven para imitar los movimientos de máquina, como el curl, el press o el remo; las Fokky son de este tipo. Y las minibands son pequeños aros pensados para la activación de glúteo y cadera, habituales en el calentamiento. Elegir el tipo correcto depende de qué ejercicios quieras priorizar.",
      },
      {
        heading: "Niveles de resistencia: cómo elegir",
        body: "Las Fokky incluyen cuatro niveles diferenciados por color: amarillo (3,6-4,5 kg), rojo (6,8-9 kg), azul (11,3-13,6 kg) y púrpura (13,6-15,9 kg). La lógica de uso es escalonada: el amarillo, para calentamiento y ejercicios de movilidad; el rojo, para curl y press ligero; el azul, para remo y curl pesado; y el púrpura, para añadir resistencia a la sentadilla o al peso muerto. Tener el rango completo permite ajustar la carga a cada ejercicio y a cada grupo muscular, igual que se haría cambiando el peso de una mancuerna.",
      },
      {
        heading: "Fokky bandas elásticas: análisis",
        body: "Las Fokky son de TPE sin látex, lo que las hace aptas para personas con alergia al látex, un argumento que a menudo se pasa por alto hasta que es un problema. Miden 1,8 metros, incluyen los cuatro niveles de resistencia y una bolsa de transporte, y son top 12 en deportes en Amazon España. Por 12,99 euros son el primer paso de equipamiento más económico y razonable que existe: cubren un espectro de trabajo amplio por el precio de un par de cafés, y su material aguanta bien los ciclos de estiramiento del uso doméstico.",
        productSlug: "fokky-bandas-elasticas-set-4-tpe",
      },
      {
        heading: "Ejercicios principales con bandas",
        body: "Cinco ejercicios cubren lo esencial. El curl de bíceps: pisa la banda con un pie y flexiona el brazo. El press de hombro: coloca la banda bajo ambos pies y empuja hacia arriba. El remo de pie: engancha la banda a una superficie fija a la altura del pecho y tira hacia ti. La sentadilla con resistencia: pasa la banda por debajo de los pies y por encima de los hombros para añadir carga al gesto. Y el hip thrust con banda: coloca la banda sobre las caderas con la espalda apoyada en un sofá. Con estos cinco tocas empuje, tracción, pierna y glúteo.",
      },
      {
        heading: "Cuándo añadir kettlebell o mancuernas",
        body: "Las bandas son el primer paso, no el último. La señal de que has llegado a su límite es concreta: cuando el nivel azul o el púrpura ya no te suponen un desafío en los ejercicios principales, has alcanzado el techo de lo que la banda puede darte en ese movimiento. Ese es el momento de añadir una kettlebell o unas mancuernas, que aportan una resistencia mayor y, en el caso de la kettlebell, el componente balístico y de cardio que las bandas no replican. La base que construiste con las bandas sigue siendo válida; simplemente el cuerpo pide más.",
        productSlug: "jowy-kettlebell-pvc-16kg",
      },
    ],
    comparison: {
      headers: ["Nivel banda", "Resistencia aprox.", "Ejercicios ideales"],
      rows: [
        ["Amarillo", "3,6-4,5 kg", "Calentamiento, movilidad, hombro ligero"],
        ["Rojo", "6,8-9 kg", "Curl, press ligero, activación de glúteo"],
        ["Azul", "11,3-13,6 kg", "Remo, curl pesado, face pull"],
        ["Púrpura", "13,6-15,9 kg", "Sentadilla, peso muerto y dominadas asistidas"],
      ],
    },
    conclusion: "Las bandas elásticas son la forma más barata de empezar a entrenar con resistencia en casa. Las Fokky por 12,99 euros cubren todo el espectro inicial y pueden acompañarte durante meses. Cuando las superes, el siguiente paso natural son las mancuernas o la kettlebell, pero la base que construyes con las bandas es completamente válida y no tiempo perdido.",
    faqs: [
      { q: "¿Las bandas elásticas sirven para ganar músculo?", a: "Sí, especialmente al principio. El músculo responde a la tensión mecánica, y la banda la genera perfectamente en todo el recorrido del movimiento. La limitación aparece en usuarios avanzados, donde la resistencia máxima de la banda puede quedarse corta para seguir imponiendo un estímulo suficiente. Para los primeros meses de entrenamiento, sin embargo, son plenamente eficaces." },
      { q: "¿Se pueden romper las bandas elásticas?", a: "Sí, si se deterioran. Las de TPE, como las Fokky, tienen mejor resistencia al desgarro que las de látex y aguantan más ciclos de estiramiento. Para alargar su vida conviene no exponerlas al sol directo, no mantenerlas a tensión máxima de forma constante y sustituirlas en cuanto aparezcan grietas en el material, porque una banda que se rompe en tensión puede provocar un golpe." },
      { q: "¿Las bandas Fokky son aptas para personas con alergia al látex?", a: "Sí. Son de TPE, un elastómero termoplástico sintético que no contiene látex, y ese es precisamente uno de sus argumentos principales frente a las bandas de goma natural. Para quien tiene alergia al látex, es una diferencia que convierte un producto inutilizable en uno perfectamente seguro." },
      { q: "¿Cuántas bandas necesito para empezar?", a: "Con dos bandas ya puedes hacer un entrenamiento completo: una de resistencia ligera para el calentamiento y los ejercicios de hombro, y una de resistencia media-alta para el trabajo principal. El set de cuatro de las Fokky resulta conveniente porque te da la progresión completa desde el principio, sin tener que comprar niveles adicionales a medida que avanzas." },
    ],
  },

  "entrenamiento-fuerza-casa-equipamiento-minimo": {
    intro: "Un home gym eficaz no requiere mucho espacio ni mucho dinero. Requiere elegir bien. Con tres piezas de equipamiento bien seleccionadas, que no superan los 110 euros en total, puedes cubrir todos los patrones de movimiento fundamentales y entrenar durante años sin necesitar nada más. Esta guía explica qué comprar y por qué esa combinación concreta funciona.",
    sections: [
      {
        heading: "Los cinco patrones de movimiento que necesitas cubrir",
        body: "Todo el cuerpo se entrena con cinco patrones. La sentadilla trabaja cuádriceps y glúteos. El empuje horizontal (como las flexiones o el press de banca) trabaja pecho, hombro frontal y tríceps. El empuje vertical (el press de hombro) trabaja hombro y tríceps. El tirón horizontal (el remo) trabaja espalda y bíceps. Y la bisagra de cadera (el peso muerto o el swing) trabaja glúteos e isquiotibiales. Si tu equipamiento te permite ejecutar bien estos cinco patrones, tienes cubierto el cuerpo entero; lo demás son variantes y matices.",
      },
      {
        heading: "El equipamiento mínimo eficaz",
        body: "La combinación que cubre los cinco patrones por menos de 110 euros es concreta: las bandas Fokky (12,99 euros), las mancuernas ManiBoom de 15 kg (59,99 euros) y la kettlebell JOWY de 16 kg (34,99 euros), lo que suma 107,97 euros. Las bandas se encargan de los ejercicios de activación, la movilidad y el trabajo de hombro ligero. Las mancuernas cubren el press, el curl, el remo y todo el trabajo unilateral con progresión. Y la kettlebell aporta los swings, el goblet squat y el cardio integrado. Cada pieza tapa un hueco que las otras dos no cubren bien.",
        productSlug: "maniboom-mancuernas-hexagonales-15kg",
      },
      {
        heading: "Lo que no necesitas",
        body: "Igual de importante es saber en qué no gastar. No necesitas una barra con pesas: las mancuernas cubren los mismos patrones con más versatilidad y menos volumen para el hogar. No necesitas un banco de pesas: el suelo sirve para el press (el press de suelo incluso protege el hombro) y un sofá para el remo inclinado. Y no necesitas máquinas de cables: las bandas elásticas las sustituyen para el trabajo de tracción y de aislamiento. Evitar estas tres compras te ahorra cientos de euros y varios metros cuadrados sin perder nada relevante.",
        productSlug: "fokky-bandas-elasticas-set-4-tpe",
      },
      {
        heading: "Rutina de 3 días con este equipamiento",
        body: "Con las tres piezas se monta una rutina completa de tres días. Día A, empuje y core: press de hombro con mancuernas, flexiones con banda de resistencia, extensión de tríceps con banda y plancha. Día B, tirón y bisagra: remo con mancuerna, curl de bíceps con banda, swing con kettlebell y peso muerto rumano con mancuernas. Día C, pierna y cuerpo completo: goblet squat con kettlebell, zancada con mancuernas, hip thrust con banda y burpees con kettlebell. Tres sesiones que, alternadas con descanso, cubren todo el cuerpo cada semana.",
        productSlug: "jowy-kettlebell-pvc-16kg",
      },
    ],
    comparison: {
      headers: ["Equipamiento", "Coste", "Patrones que cubre", "Imprescindible"],
      rows: [
        ["Fokky bandas", "12,99 €", "Empuje ligero, tirón y activación", "Para empezar"],
        ["ManiBoom 15 kg", "59,99 €", "Empuje, tirón y sentadilla", "Sí"],
        ["JOWY Kettlebell 16 kg", "34,99 €", "Bisagra, cardio y sentadilla", "Complemento clave"],
      ],
    },
    conclusion: "Por menos de 110 euros tienes equipamiento para cubrir los patrones de movimiento fundamentales durante años. El truco no está en tener mucho, sino en elegir tres piezas que se complementen bien. Cuando ese equipamiento se te quede pequeño, será señal de que has avanzado lo suficiente como para justificar una inversión mayor, como unas mancuernas ajustables.",
    faqs: [
      { q: "¿Cuánto espacio necesito para este equipamiento?", a: "Las tres piezas juntas caben en una bolsa mediana y se guardan en cualquier armario. Durante el entrenamiento, con 2 por 2 metros de suelo libre es suficiente para ejecutar todos los ejercicios sin problemas. Es una de las grandes ventajas de esta combinación frente a una máquina o una barra: el espacio de almacenamiento es casi nulo." },
      { q: "¿Puedo ganar músculo con menos de 100 € de equipamiento?", a: "Sí, especialmente en los primeros 6 a 12 meses, cuando el cuerpo responde de forma notable a cualquier estímulo de resistencia nuevo. Las ganancias iniciales de fuerza y masa muscular no requieren pesos máximos, sino progresión constante y buena técnica, y eso se consigue de sobra con bandas, mancuernas y una kettlebell." },
      { q: "¿Hay un orden recomendado para comprar el equipamiento?", a: "Sí: primero las bandas, a 12,99 euros, que cubren bastante por muy poco y permiten empezar de inmediato. Luego las mancuernas, que amplían el rango de ejercicios con peso libre y progresión. Y por último la kettlebell, que añade el componente funcional y el cardio integrado. Ese orden reparte el gasto y prioriza lo que más rendimiento da por euro al principio." },
      { q: "¿Qué pasa cuando este equipamiento se queda pequeño?", a: "Es la señal de que has progresado. El siguiente paso natural son unas mancuernas ajustables, como las LULLAX NEO36, que permiten continuar la progresión de carga sin que el espacio ocupado crezca en proporción al peso disponible. Es la evolución lógica del home gym mínimo hacia uno con más recorrido." },
    ],
  },

  "rutina-mancuernas-casa-semana": {
    intro: "Una rutina bien estructurada con mancuernas puede darte resultados similares a los de un gimnasio, sin desplazamientos y con una inversión mínima en equipamiento. Esta rutina de cuatro días de trabajo cubre todos los grupos musculares con dos días de descanso, y funciona tanto para principiantes como para intermedios ajustando el volumen y la carga.",
    sections: [
      {
        heading: "Principios de la rutina",
        body: "La rutina se organiza con una división empuje/tirón que optimiza la recuperación: los músculos de empuje descansan mientras trabajan los de tirón, y viceversa. La progresión es semanal: añade una o dos repeticiones, o aumenta el peso, cuando completes todas las series al máximo con buena técnica. El descanso entre series es de 60-90 segundos para principiantes y de 45-60 para intermedios. Estos tres principios (división inteligente, progresión y descanso adecuado) son los que convierten una lista de ejercicios en un programa que de verdad produce adaptaciones.",
      },
      {
        heading: "Día 1 — Pecho y tríceps",
        body: "El primer día trabaja el empuje horizontal y la extensión de codo. Press de mancuernas tumbado en el suelo, 4 series de 10; apertura de mancuernas, 3 de 12; press de hombro neutro, 3 de 10; extensión de tríceps, 3 de 12; y fondos en silla, 3 de 10. El press de suelo, además de no requerir banco, protege el hombro al limitar el rango en el punto de mayor tensión, lo que lo hace especialmente adecuado para entrenar en casa sin supervisión.",
        productSlug: "maniboom-mancuernas-hexagonales-15kg",
      },
      {
        heading: "Día 2 — Espalda y bíceps",
        body: "El segundo día trabaja el tirón horizontal y la flexión de codo. Remo con mancuerna unilateral, 4 series de 10 por lado; remo con ambas mancuernas inclinado, 3 de 12; curl de martillo, 3 de 12; curl de bíceps clásico, 3 de 10; y remo con agarre prono, 3 de 12. El trabajo unilateral del remo a una mano permite corregir descompensaciones entre los dos lados del cuerpo, algo que las máquinas de gimnasio con carga bilateral tienden a enmascarar.",
      },
      {
        heading: "Día 3 — Descanso activo",
        body: "El tercer día no es de entrenamiento de fuerza, pero tampoco de sofá. Movilidad articular, estiramientos o entre 20 y 30 minutos de caminata suave mantienen el cuerpo activo y favorecen la recuperación entre las sesiones de tren superior de los primeros dos días y las que vienen después. El descanso activo mejora el flujo sanguíneo a los músculos trabajados sin añadir fatiga, lo que ayuda a llegar al día 4 en mejores condiciones.",
      },
      {
        heading: "Día 4 — Hombros y core",
        body: "El cuarto día se centra en el empuje vertical y el trabajo del centro. Press de hombro bilateral, 4 series de 10; elevaciones laterales, 3 de 15; elevaciones frontales, 3 de 12; press Arnold, 3 de 10; plancha, 3 de 45 segundos; y crunch con mancuerna, 3 de 15. Las elevaciones laterales y frontales, con su alto número de repeticiones y peso ligero, complementan el trabajo pesado de press para desarrollar el hombro de forma completa en sus distintos ángulos.",
      },
      {
        heading: "Día 5 — Piernas y glúteos",
        body: "El quinto día trabaja el tren inferior al completo. Sentadilla goblet, 4 series de 12; zancada alternada, 3 de 10 por pierna; peso muerto rumano, 4 de 10; sentadilla búlgara, 3 de 8 por pierna; y hip thrust con mancuerna, 3 de 15. El tren inferior es donde antes se queda corta una mancuerna de peso fijo, porque las piernas son fuertes: aquí es donde unas mancuernas ajustables como las LULLAX NEO36 muestran su valor, al permitir cargar lo suficiente para que el estímulo siga siendo efectivo.",
        productSlug: "lullax-neo36-mancuernas-ajustables",
      },
      {
        heading: "Días 6 y 7 — Descanso",
        body: "El fin de semana es de recuperación completa. Tras cuatro días de trabajo de fuerza y uno de descanso activo, el cuerpo necesita dos días sin estímulo para completar la adaptación y reponer el sistema nervioso, no solo los músculos. Resistir la tentación de entrenar estos días es parte del programa: el músculo crece durante el descanso, y encadenar sesiones sin pausa produce estancamiento antes que progreso.",
      },
    ],
    plan: [
      {
        week: "Semanas 1-2: Adaptación",
        description: "Aprende la técnica de cada ejercicio. Elige el peso con el que completas las series sin llegar al fallo absoluto.",
        sessions: [
          "Día 1: Pecho y tríceps — press suelo 3×10, apertura 3×12, extensión tríceps 3×12, fondos silla 3×10",
          "Día 2: Espalda y bíceps — remo unilateral 3×10, curl martillo 3×12, curl bíceps 3×10",
          "Día 3: Descanso activo",
          "Día 4: Hombros y core — press hombro 3×10, laterales 3×15, plancha 3×40 s",
          "Día 5: Piernas — goblet squat 3×12, zancada 3×10, peso muerto rumano 3×10",
          "Días 6-7: Descanso",
        ],
      },
      {
        week: "Semanas 3-4: Volumen",
        description: "Añade una serie a cada ejercicio y aumenta el peso si completaste las series de las semanas anteriores.",
        sessions: [
          "Día 1: Pecho y tríceps — press suelo 4×10, apertura 4×12, press Arnold 3×10, fondos silla 4×10",
          "Día 2: Espalda y bíceps — remo unilateral 4×10, remo bilateral 3×12, curl martillo 4×12, curl bíceps 4×10",
          "Día 3: Descanso activo",
          "Día 4: Hombros y core — press hombro 4×10, laterales 3×15, frontales 3×12, plancha 3×45 s, crunch 3×15",
          "Día 5: Piernas — goblet squat 4×12, zancada 4×10, peso muerto rumano 4×10, sentadilla búlgara 3×8, hip thrust 3×15",
          "Días 6-7: Descanso",
        ],
      },
    ],
    conclusion: "Con esta rutina y un par de mancuernas tienes un programa de entrenamiento completo que puede acompañarte durante meses. La clave es la progresión: añadir carga o repeticiones semana a semana es lo que produce las adaptaciones. Sin progresión, el cuerpo se estanca por muy bien diseñada que esté la rutina.",
    faqs: [
      { q: "¿Puedo hacer esta rutina si solo tengo un par de mancuernas de peso fijo?", a: "Sí, con adaptaciones. Si el peso resulta bajo para algunos ejercicios, sobre todo los de pierna, añade repeticiones o reduce el descanso para mantener el estímulo suficiente. Las mancuernas ajustables, como las LULLAX NEO36, resuelven este problema de raíz al permitir cambiar el peso en segundos según lo que pida cada ejercicio." },
      { q: "¿Es necesario un banco de pesas para esta rutina?", a: "No. El press de pecho se hace en el suelo, en la variante llamada press de suelo, que además protege el hombro al limitar el rango en el punto de mayor tensión. El remo inclinado se puede hacer apoyado en el sofá o en una silla. La rutina está diseñada precisamente para no depender de un banco, que ocupa espacio y encarece el equipamiento." },
      { q: "¿Cuánto tiempo dura cada sesión?", a: "Entre 35 y 50 minutos, según los descansos y la velocidad de ejecución. Con descansos de 60 segundos, las sesiones de los días de tren superior rondan los 40 minutos, mientras que las de piernas, con más ejercicios compuestos y descansos algo más largos, pueden llegar a los 50. Es un tiempo perfectamente compatible con una rutina diaria ocupada." },
      { q: "¿Cuándo debo aumentar el peso?", a: "Cuando completas todas las series y repeticiones indicadas con la última repetición limpia pero desafiante, ni fácil ni al fallo. Si terminas las series con claramente más margen, sube el peso. Si no llegas a las repeticiones indicadas con buena técnica, bájalo. Esa autorregulación sesión a sesión es lo que mantiene la progresión sin lesiones." },
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
      logo: { "@type": "ImageObject", url: "https://www.fitnessfacil.es/logo.png", width: 200, height: 200 },
    },
  };

  // NOTA: desde 2023 Google restringe los rich results de FAQPage a webs
  // gubernamentales y del ámbito sanitario, así que en un sitio afiliado como
  // este no generará resultado enriquecido en Google. Se mantiene porque sigue
  // siendo schema válido y lo aprovechan otros buscadores y los motores de IA.
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

            {content.sections.map((section) => {
              const ctaProduct = section.productSlug ? getProductBySlug(section.productSlug) : undefined;
              return (
                <section key={section.heading} className="mb-8">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-3">{section.heading}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.body}</p>
                  {ctaProduct && (
                    <a
                      href={amazonLink(ctaProduct.asin)}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
                    >
                      Ver {ctaProduct.name} en Amazon · {ctaProduct.price}
                    </a>
                  )}
                </section>
              );
            })}

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
