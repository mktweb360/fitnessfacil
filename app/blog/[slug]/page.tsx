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
      logo: { "@type": "ImageObject", url: "https://www.fitnessfacil.es/favicon.ico" },
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
