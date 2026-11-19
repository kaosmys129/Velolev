import fs from "node:fs";

const localesPath = "maquin-astro-theme/src/data/published-content-locales.json";
const localesData = JSON.parse(fs.readFileSync(localesPath, "utf8"));

// ES Batch B & C (8 articles: 6 to 13)
const esArticles = {
  "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost": {
    locale: "es",
    slug: "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    title: "Instalación de alumbrado en aparcamientos de 40 postes: grúa vs elevador portátil | velolev",
    h1: "Instalación de alumbrado en aparcamientos de 40 postes: comparación de costes y alcance entre grúa y elevador portátil",
    description: "Guía de planificación económica para aparcamientos y parques comerciales: comparación entre alquiler de camión grúa y elevador portátil velolev bajo alcances de trabajo idénticos.",
    imageFolder: "/images/guides/40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    sections: [
      {
        heading: "Por qué la comparación con alcance idéntico es vital en proyectos con múltiples postes",
        paragraphs: [
          "Los aparcamientos de centros comerciales, centros logísticos y campus suelen requerir la instalación de 20 a 60 postes de iluminación en una única fase. Al comparar una grúa móvil o camión pluma con el elevador hidráulico portátil velolev, un presupuesto fiable depende de definir un paquete de trabajo exactamente idéntico, y no solo comparar tarifas horarias de alquiler.",
          "Dado que velolev opera bajo un modelo de presupuesto privado B2B sin precios públicos de maquinaria ni monedas prefijadas, los contratistas introducen sus propias tarifas de alquiler de grúa, costes de personal y volumen del proyecto en la Calculadora de ROI velolev para evaluar la viabilidad operativa con total transparencia."
        ]
      },
      {
        heading: "1. Matriz de comparación de alcance de trabajo para 40 postes",
        paragraphs: [
          "Una grúa móvil requiere espacio de estabilizadores, permisos de corte de tráfico y traslados continuos entre alcorques y bordillos. Con el elevador portátil velolev de 85 kg (dividido en módulo hidráulico de 45 kg y caja de control de 40 kg), 1 o 2 operarios pueden mover el equipo manualmente entre postes sin bloquear carriles de circulación.",
          "El tiempo de montaje sobre la brida de 180–260 mm y el apriete de pernos M16–M24 se realiza a nivel de suelo antes del izado, eliminando esperas y tiempos muertos del operador de grúa."
        ]
      },
      {
        heading: "2. Sensibilidad de costes y reducción de tiempos improductivos",
        paragraphs: [
          "En obras urbanas y comerciales, las grúas suelen facturar por medias jornadas o jornadas completas de 8 horas con costes mínimos de desplazamiento. Si la cimentación o el cableado sufren demoras, el contratista asume sobrecostes de espera considerables.",
          "Con un elevador propio accionado por batería de 24 V, el ritmo de izado se adapta al avance real de la obra civil sin penalizaciones por parada imprevista."
        ]
      },
      {
        heading: "3. Lista de comprobación previa para proyectos de aparcamiento",
        paragraphs: [
          "Antes de iniciar los trabajos, confirme que el peso total del poste con luminarias no supere los 300 kg nominales y que la altura de columna no exceda los 12 m. Para bases de 6 u 8 pernos o fuera de 180–260 mm, envíe el plano acotado para revisión técnica previa."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre proyectos de aparcamientos",
        paragraphs: [
          "¿Puede el equipo operar sobre pavimento terminado sin dañarlo?\nSí, con un peso total de 85 kg distribuido entre sus apoyos, no requiere estabilizadores hidráulicos pesados que agrieten el aglomerado asfáltico.",
          "¿Qué cuadrilla se requiere para completar 40 postes?\nLa ficha técnica contempla de 1 a 2 operarios para el transporte, acople y accionamiento del equipo, liberando al resto del equipo para conexionado eléctrico y cimentación."
        ]
      }
    ]
  },
  "24v-battery-off-grid-rural-road-pole-lifting-planning": {
    locale: "es",
    slug: "24v-battery-off-grid-rural-road-pole-lifting-planning",
    title: "Elevador portátil con batería de 24 V para caminos rurales aislados | velolev",
    h1: "Elevador de postes portátil a batería de 24 V para vías rurales sin red: autonomía y logística de obra",
    description: "Planificación de instalación de postes de alumbrado solar en caminos rurales aislados con elevador portátil de 24 V: ciclos por carga, transporte y gestión logística.",
    imageFolder: "/images/guides/24v-battery-off-grid-rural-road-pole-lifting-planning",
    sections: [
      {
        heading: "Planificación de energía en obras rurales sin suministro eléctrico",
        paragraphs: [
          "La electrificación rural y los proyectos de alumbrado solar en caminos de montaña a menudo se ejecutan en zonas alejadas de la red de baja tensión. El uso de generadores pesados o camiones grúa encarece la logística y dificulta el tránsito en pistas no pavimentadas.",
          "El elevador hidráulico velolev integra un gabinete de alimentación por batería de 24 V (40 kg) que permite realizar múltiples ciclos de izado de forma 100% autónoma, eliminando mangueras de aire comprimido o cables de alimentación externa."
        ]
      },
      {
        heading: "1. Ciclos de elevación por carga y factor de seguridad en campo",
        paragraphs: [
          "Los datos del fabricante indican una autonomía de más de 50 elevaciones por carga completa bajo condiciones nominales (sujeto a temperatura ambiente y peso del conjunto poste-panel). En la planificación de obra, los ingenieros calculan de forma conservadora 25 a 35 postes diarios por cuadrilla para absorber pendientes y pausas de montaje.",
          "Se recomienda disponer de un inversor a bordo del vehículo de transporte o una segunda batería intercambiable para garantizar jornadas continuas en áreas remotas."
        ]
      },
      {
        heading: "2. Logística en caminos no pavimentados y senderos estrechos",
        paragraphs: [
          "Gracias a la división modular en dos bultos de 45 kg y 40 kg, el equipo puede cargarse en la caja de una camioneta 4x4 o transportarse en carretilla de obra hasta puntos donde un camión de 12 toneladas no puede acceder sin riesgo de vuelco o hundimiento.",
          "En suelos blandos, el uso de placas de apoyo temporales bajo las patas de fijación garantiza un reparto de presiones adecuado antes del izado vertical."
        ]
      },
      {
        heading: "3. Protocolo de recarga y verificación de batería en obra",
        paragraphs: [
          "Compruebe el indicador de tensión de la batería antes de comenzar la jornada. No inicie el ciclo si la tensión baja del umbral recomendado para asegurar la retención de la válvula antirretorno en caso de parada de emergencia."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre alimentación a batería en zonas aisladas",
        paragraphs: [
          "¿Afecta el frío extremo a la autonomía de la batería de 24 V?\nSí, como en cualquier acumulador químico, temperaturas bajo cero reducen la capacidad útil; mantenga la batería en la cabina del vehículo hasta el momento del izado.",
          "¿Se puede recargar desde la toma de 12 V / 24 V de la camioneta?\nSí, mediante cargadores o inversores compatibles con las especificaciones de carga de la batería de 24 V."
        ]
      }
    ]
  },
  "pickup-truck-transport-modular-pole-jack-dimensions": {
    locale: "es",
    slug: "pickup-truck-transport-modular-pole-jack-dimensions",
    title: "Transporte en camioneta y furgoneta del elevador modular de postes | velolev",
    h1: "Transporte en camioneta y furgoneta del elevador modular de postes: embalaje de 650 × 350 × 500 mm y dimensiones de módulos",
    description: "Requisitos de estiba y transporte del elevador de postes velolev en cajas de camioneta y furgones ligeros: medidas de 650 × 350 × 500 mm y pesos de 45 kg y 40 kg.",
    imageFolder: "/images/guides/pickup-truck-transport-modular-pole-jack-dimensions",
    sections: [
      {
        heading: "Optimización del transporte sin remolques pesados",
        paragraphs: [
          "Uno de los mayores costes ocultos en el montaje de columnas de alumbrado es el desplazamiento de maquinaria pesada. El elevador de postes velolev fue concebido específicamente para caber en vehículos de servicio ligero estándar (camionetas tipo pick-up de 1 tonelada o furgonetas tipo furgón).",
          "Con un volumen de embalaje de 650 × 350 × 500 mm y un peso descompuesto en dos unidades independientes de 45 kg y 40 kg, dos técnicos pueden cargar y descargar el equipo sin necesidad de carretilla elevadora ni rampa hidráulica."
        ]
      },
      {
        heading: "1. Distribución de carga en la caja de la camioneta",
        paragraphs: [
          "El módulo hidráulico (45 kg) debe amarrarse contra el mamparo delantero de la caja para evitar desplazamientos longitudinales durante frenadas bruscas. El gabinete de control de 24 V (40 kg) se fija en un lateral accesible para facilitar su descarga inmediata en el primer punto de trabajo.",
          "El espacio restante en la caja de carga queda disponible para transportar postes despiezados, luminarias LED, soportes fotovoltaicos y herramientas de mano."
        ]
      },
      {
        heading: "2. Acceso a cascos históricos y pasos subterráneos con gálibo limitado",
        paragraphs: [
          "En calles peatonales con bolardos, accesos a parques o zonas con gálibo inferior a 2,5 m, las camionetas ligeras acceden sin restricciones municipales de circulación de transporte pesado.",
          "Una vez en el lugar de colocación, las asas integradas permiten transportar los dos módulos hasta el alcorque a través de puertas peatonales de más de 80 cm de ancho."
        ]
      },
      {
        heading: "3. Normas de trincaje y seguridad durante el transporte",
        paragraphs: [
          "Utilice eslingas de trinquete homologadas para amarrar ambos módulos a los puntos de anclaje del vehículo. Asegúrese de que las válvulas de purga hidráulica estén cerradas y el conector de alimentación desconectado durante el viaje."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre transporte y manipulación",
        paragraphs: [
          "¿Cabe el equipo en un turismo familiar o SUV con asientos abatidos?\nSí, las dimensiones compactas de 650 × 350 × 500 mm permiten su transporte en el maletero de un SUV o vehículo mixto adaptable.",
          "¿Requiere carretilla elevadora para descarga en almacén?\nNo, el peso máximo por módulo de 45 kg permite la manipulación manual ergonómica entre 2 operarios cumpliendo las normativas de seguridad laboral."
        ]
      }
    ]
  },
  "overhead-power-lines-narrow-alley-pole-erection-planning": {
    locale: "es",
    slug: "overhead-power-lines-narrow-alley-pole-erection-planning",
    title: "Izado de postes cerca de líneas eléctricas aéreas y callejones | velolev",
    h1: "Planificación del izado de postes de 10 m y 12 m cerca de tendidos eléctricos aéreos y callejones estrechos",
    description: "Evaluación de distancias de seguridad y prevención de contacto eléctrico al levantar columnas de 10 m y 12 m en calles estrechas y bajo tendidos aéreos con elevador hidráulico de suelo.",
    imageFolder: "/images/guides/overhead-power-lines-narrow-alley-pole-erection-planning",
    sections: [
      {
        heading: "Riesgos críticos de contacto eléctrico con plumas telescópicas de grúa",
        paragraphs: [
          "El despliegue de brazos telescópicos de grúa en cercanías de líneas eléctricas aéreas de media y baja tensión representa uno de los mayores peligros de accidente mortal en el sector de la construcción. Las normativas de seguridad laboral exigen distancias de aproximación mínimas que a menudo impiden el giro de la pluma en calles de menos de 6 metros de anchura.",
          "El elevador portátil velolev realiza el izado pivotando directamente desde la placa de anclaje del suelo con un ángulo controlado, manteniendo el poste dentro de su envolvente vertical sin proyectar elementos móviles hacia los cables aéreos adyacentes."
        ]
      },
      {
        heading: "1. Distancias de seguridad y límites de arco eléctrico",
        paragraphs: [
          "En presencia de tendidos eléctricos sin aislamiento, los técnicos deben calcular la trayectoria angular del poste durante el ascenso de 0° a 90°. La altura de 12 m requiere asegurar que en ningún punto de la trayectoria el extremo superior del poste o el brazo de la luminaria se acerque a menos de la distancia reglamentaria.",
          "En pasajes estrechos donde una grúa no puede extender estabilizadores sin invadir fachadas, el anclaje directo a los pernos M16–M24 del basamento elimina los riesgos de balanceo libre de carga suspendida."
        ]
      },
      {
        heading: "2. Procedimiento de izado controlado en callejones históricos",
        paragraphs: [
          "El sistema hidráulico de accionamiento progresivo permite detener y bloquear el poste en cualquier ángulo intermedio mediante su válvula de retención mecánica, facilitando la inspección visual continua de cables cruzados de telefonía o alumbrado secundario.",
          "La coordinación entre los dos operarios es directa y a nivel de suelo, sin ruidos de motor diésel de camión que dificulten la comunicación de seguridad."
        ]
      },
      {
        heading: "3. Comprobaciones obligatorias antes de autorizar el izado",
        paragraphs: [
          "Verifique la ausencia de cables en la vertical inmediata de la placa de asiento y confirme la resistencia del hormigón de la cimentación. El izado está limitado a 300 kg y columnas clase 12 m."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre seguridad cerca de tendidos aéreos",
        paragraphs: [
          "¿El equipo proporciona aislamiento galvánico contra descargas eléctricas?\nNo. El equipo es metálico y no debe entrar en contacto con cables bajo tensión bajo ninguna circunstancia; la seguridad radica en el estricto control de la trayectoria y el mantenimiento de las distancias reglamentarias.",
          "¿Puede utilizarse bajo lluvia cerca de tendidos eléctricos?\nSe deben suspender los trabajos si existe riesgo de tormenta eléctrica o si las condiciones de visibilidad impiden comprobar la distancia a los cables."
        ]
      }
    ]
  },
  "20-second-lift-stroke-vs-total-light-pole-installation-time": {
    locale: "es",
    slug: "20-second-lift-stroke-vs-total-light-pole-installation-time",
    title: "Carrera de elevación de 20 s vs tiempo total de instalación de postes | velolev",
    h1: "Carrera hidráulica de 20 s según fabricante vs tiempo total de instalación de postes de luz: desglose de fases",
    description: "Desglose técnico entre la carrera de elevación hidráulica de 20 s declarada por el fabricante y las horas completas de ciclo de montaje en obra de alumbrado público.",
    imageFolder: "/images/guides/20-second-lift-stroke-vs-total-light-pole-installation-time",
    sections: [
      {
        heading: "Diferencia entre el tiempo de carrera hidráulica y el ciclo completo de obra",
        paragraphs: [
          "Las especificaciones técnicas de fábrica señalan una carrera de elevación hidráulica de aproximadamente 20 segundos para el cilindro principal de velolev. En licitaciones y planificaciones operativas, es imprescindible distinguir este tiempo de accionamiento mecánico del ciclo completo de instalación por columna.",
          "El ciclo total de obra incluye el posicionamiento del equipo sobre la cimentación, la conexión de cables, el ensamblaje de luminarias y paneles, la alineación vertical y el apriete con dinamométrica de las tuercas M16–M24."
        ]
      },
      {
        heading: "1. Desglose temporal de actividades en la instalación de un poste",
        paragraphs: [
          "En una cuadrilla entrenada de 2 operarios, las fases típicas se distribuyen en: 10–15 minutos de preparación previa (luminaria, cableado y anclaje al cilindro), 20–30 segundos de elevación hidráulica motorizada, y 5–10 minutos de nivelación con tuercas de nivelación, apriete y retirada del equipo modular.",
          "El tiempo total por poste oscila habitualmente entre 20 y 35 minutos, lo que permite a una brigada ligera completar de 10 a 16 postes en una jornada de trabajo ordinaria."
        ]
      },
      {
        heading: "2. Cómo utilizar los datos de rendimiento en cronogramas y modelos de coste",
        paragraphs: [
          "Para confeccionar pliegos de licitación realistas, no se debe multiplicar 20 segundos por el número de postes. Los modelos de avance deben incorporar factores de dispersión geográfica entre postes, tiempos de fraguado de cimentaciones y comprobaciones de aislamiento eléctrico.",
          "La ventaja competitiva de velolev radica en eliminar los tiempos muertos de espera de la grúa y la agilidad de transporte del conjunto de 85 kg."
        ]
      },
      {
        heading: "3. Verificaciones que debe incluir en su consulta de proyecto",
        paragraphs: [
          "Indique el tipo de luminaria, peso total en punta y características de la base para validar si el ciclo previsto se ajusta a los límites de 300 kg y 12 m de columna."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre velocidad y rendimiento",
        paragraphs: [
          "¿La velocidad de elevación se puede regular?\nLa velocidad del actuador hidráulico está calibrada de fábrica para mantener la estabilidad del centro de gravedad y evitar oscilaciones dinámicas durante el izado.",
          "¿Se acelera el trabajo con 3 personas en lugar de 2?\nUna tercera persona puede encargarse del tendido de cables y apriete final mientras 2 operarios trasladan el equipo al siguiente poste, aumentando el rendimiento diario."
        ]
      }
    ]
  },
  "foundation-inspection-before-self-anchoring-pole-erection": {
    locale: "es",
    slug: "foundation-inspection-before-self-anchoring-pole-erection",
    title: "Inspección de cimentación y pernos antes del izado de postes | velolev",
    h1: "Lista de verificación de cimentación y pernos de anclaje antes de la revisión del elevador de postes",
    description: "Guía de medidas de basamento, longitud de rosca, profundidad de empotramiento y fotos de obra necesarias para la revisión técnica de compatibilidad de postes con velolev.",
    imageFolder: "/images/guides/foundation-inspection-before-self-anchoring-pole-erection",
    sections: [
      {
        heading: "Por qué el estado de la cimentación condiciona el izado anclado en base",
        paragraphs: [
          "A diferencia de una grúa que suspende la carga desde el aire, el elevador velolev utiliza la propia cimentación y los pernos preinstalados como punto de apoyo y reacción durante el izado. Por este motivo, la solidez del macizo de hormigón y el estado de los pernos de anclaje son determinantes para la seguridad estructural.",
          "Cimentaciones con hormigón verde sin curar, pernos desalineados o roscas dañadas pueden comprometer el apriete y la estabilidad del equipo."
        ]
      },
      {
        heading: "1. Parámetros geométricos y tabla de datos de comprobación",
        paragraphs: [
          "Antes de movilizar el equipo, mida con calibre y cinta métrica: diámetro nominal del perno (de M16 a M24), saliente de rosca sobre el hormigón (mínimo 50–70 mm para tuerca, contratuerca y placa base) y distancia entre centros de orificios (debe situarse dentro del rango de 180 a 260 mm).",
          "Compruebe también la planicidad del hormigón. Un desnivel excesivo requerirá mortero autonivelante sin retracción para asegurar un apoyo uniforme de la placa."
        ]
      },
      {
        heading: "2. Distinción entre comprobaciones previas e instrucciones de ingeniería",
        paragraphs: [
          "La lista de comprobación de velolev permite verificar la compatibilidad geométrica del equipo con la base. No sustituye el cálculo geotécnico ni el diseño de armaduras de la cimentación, que corresponden a la dirección facultativa del proyecto según la normativa local del suelo.",
          "Si la base cuenta con pernos empotrados directamente sin plantilla de acero previa, verifique la ortogonalidad para evitar tensiones de cizalla durante el acople."
        ]
      },
      {
        heading: "3. Paquete documental de 4 elementos para revisión técnica rápida",
        paragraphs: [
          "Para que nuestro equipo de ingeniería revise su proyecto en menos de 2 horas, envíe: 1) plano acotado de la placa base, 2) fotografía frontal del basamento con cinta métrica, 3) diámetro de pernos y 4) ficha técnica del poste y luminaria."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre cimentaciones y anclajes",
        paragraphs: [
          "¿Se puede utilizar en postes de empotramiento directo en tierra (sin placa de brida)?\nNo. El equipo requiere obligatoriamente una base de hormigón con pernos de anclaje para fijar el apoyo de reacción.",
          "¿Qué hacer si los pernos están doblados o fuera de alineación?\nDeben enderezarse bajo supervisión del calculista estructural o rectificarse con casquillos excéntricos antes de acoplar el elevador."
        ]
      }
    ]
  },
  "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders": {
    locale: "es",
    slug: "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    title: "Evaluación técnica de elevadores de postes en licitaciones B2B | velolev",
    h1: "Evaluación de documentación técnica del elevador portátil en licitaciones B2B: datos S4 vs pendientes",
    description: "Guía de licitación y compras transparentes que distingue entre especificaciones confirmadas S4, métricas declaradas de fábrica y documentos en trámite para ofertas B2B.",
    imageFolder: "/images/guides/evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    sections: [
      {
        heading: "Transparencia documental en licitaciones municipales y ofertas EPC",
        paragraphs: [
          "En contratos públicos y licitaciones EPC internacionales de alumbrado, la inclusión de maquinaria innovadora requiere una delimitación rigurosa de los datos técnicos certificados frente a estimaciones comerciales. Una memoria técnica ambigua puede generar descalificaciones en mesa de contratación o retrasos en la aprobación del plan de seguridad.",
          "velolev estructura su documentación técnica clasificando de forma transparente los parámetros certificados de fábrica (S4) frente a los datos en validación de campo."
        ]
      },
      {
        heading: "1. Matriz de clasificación de evidencias técnicas para licitaciones",
        paragraphs: [
          "Nivel A (Confirmado): Capacidad de carga nominal de 300 kg, altura máxima de columna clase 12 m, peso en dos módulos de 85 kg (45 kg + 40 kg), rango de brida 180–260 mm y tornillería incluida M16–M22.",
          "Nivel D (Declarado por fabricante / validación en curso): Carrera de elevación en 20 segundos y autonomía de más de 50 ciclos por carga de batería de 24 V, los cuales deben considerarse como valores de referencia sujetos a condiciones de obra."
        ]
      },
      {
        heading: "2. Integración en el Plan de Seguridad y Salud (PSS)",
        paragraphs: [
          "Al redactar la propuesta técnica, resaltar la eliminación de riesgos de aplastamiento por vuelco de pluma telescópica y la supresión de trabajos en altura para el engrille de postes. El operario permanece en el suelo durante todo el ciclo de elevación.",
          "Asimismo, certifique la reducción de la huella de carbono al sustituir motores diésel de grúas de 8 toneladas por un actuador electrohidráulico de 24 V."
        ]
      },
      {
        heading: "3. Resumen de límites infranqueables del equipo",
        paragraphs: [
          "Recuerde indicar expresamente en su oferta que postes de más de 300 kg o con alturas superiores a 12 m deberán ejecutarse mediante grúa móvil convencional."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre licitaciones y justificación técnica",
        paragraphs: [
          "¿Proporciona velolev fichas de datos de seguridad y marcado CE?\nSí, se facilitan las directivas aplicables de máquinas y compatibilidad electromagnética previa solicitud formal de proyecto.",
          "¿Cómo se justifica en pliegos que exigen 'camión pluma para izado'?\nSe presenta como variante técnica justificada por menor impacto ambiental, nula ocupación de calzada y mayor seguridad laboral en calles estrechas."
        ]
      }
    ]
  },
  "solar-wind-sail-area-site-assessment-pole-lifting": {
    locale: "es",
    slug: "solar-wind-sail-area-site-assessment-pole-lifting",
    title: "Superficie de paneles solares y viento en izado de postes | velolev",
    h1: "Superficie vélica del panel solar y exposición del terreno para la revisión técnica previa al izado",
    description: "Cómo documentar superficie de módulos fotovoltaicos, altura de montaje, exposición al viento y peso total bajo 300 kg para la revisión técnica previa de postes solares.",
    imageFolder: "/images/guides/solar-wind-sail-area-site-assessment-pole-lifting",
    sections: [
      {
        heading: "Por qué la superficie del panel fotovoltaico condiciona el izado",
        paragraphs: [
          "En farolas solares autónomas 'todo en uno' (All-in-One) o con panel separado en punta de poste, la superficie expuesta del módulo fotovoltaico actúa como una vela frente al viento. Durante el proceso de izado de horizontal a vertical, las ráfagas laterales generan fuerzas de torsión sobre el brazo del elevador.",
          "Para garantizar un izado seguro dentro de la capacidad de 300 kg de velolev, es fundamental calcular tanto el peso estático de la luminaria y batería como el momento flector generado por el viento sobre el panel."
        ]
      },
      {
        heading: "1. Datos requeridos de superficie vélica y orientación en campo",
        paragraphs: [
          "El técnico de obra debe registrar: dimensiones de los paneles solares (superficie en m²), ángulo de inclinación respecto al mástil, altura de montaje y orografía del entorno (campo abierto, costa o entorno urbano protegido).",
          "Paneles con superficie superior a 1,5 m² en cabezal de poste requieren especial atención y no deben izarse con velocidades de viento sostenidas superiores a 25–30 km/h."
        ]
      },
      {
        heading: "2. Protocolo de seguridad meteorológica sin umbrales arbitrarios",
        paragraphs: [
          "La seguridad no se basa en conjeturas. Los responsables de obra deben disponer de anemómetro portátil en el punto de trabajo. Si las rachas superan el límite de confort operativo de la brigada, los trabajos de izado deben aplazarse.",
          "El cilindro hidráulico de velolev cuenta con válvula de bloqueo anticaída que inmoviliza la carga si se interrumpe el ciclo por una ráfaga imprevista."
        ]
      },
      {
        heading: "3. Preparación paso a paso de la solicitud de revisión técnica",
        paragraphs: [
          "Recopile la ficha del panel fotovoltaico, plano del soporte superior y peso total de los elementos fijados al fuste antes de tramitar la consulta técnica con nuestros ingenieros."
        ]
      },
      {
        heading: "Preguntas frecuentes sobre farolas solares y viento",
        paragraphs: [
          "¿Es preferible instalar el panel fotovoltaico después de levantar el poste?\nLa gran ventaja de velolev es instalar luminaria y paneles a cota cero en el suelo, evitando cestas elevadoras. Sin embargo, en días de viento racheado, puede convenir montar paneles tras la erección si la seguridad lo aconseja.",
          "¿Influye la forma cilíndrica o cónica del poste en el viento?\nLos postes cónicos o poligonales presentan coeficientes de resistencia aerodinámica distintos; indíquelo en el formulario de consulta."
        ]
      }
    ]
  }
};

// FR Batch B & C (8 articles: 6 to 13)
const frArticles = {
  "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost": {
    locale: "fr",
    slug: "40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    title: "Éclairage de parking 40 candélabres : grue vs lève-mât portable | velolev",
    h1: "Installation d'éclairage de parking 40 candélabres : comparaison grue mobile vs lève-mât portable et coûts réels",
    description: "Guide d'arbitrage économique pour parkings et zones d'activité : comparaison chiffrée entre location de camion-grue et lève-mât portable velolev sur périmètre identique.",
    imageFolder: "/images/guides/40-pole-parking-lot-lighting-crane-vs-lifter-scope-cost",
    sections: [
      {
        heading: "Pourquoi la comparaison à périmètre égal est essentielle sur les projets multi-mâts",
        paragraphs: [
          "Les parkings commerciaux, plateformes logistiques et sites industriels exigent couramment le levage de 20 à 60 mâts d'éclairage en une seule phase de travaux. Pour évaluer la rentabilité d'un camion-grue par rapport au lève-mât hydraulique portable velolev, l'analyse doit porter sur un lot d'exécution rigoureusement équivalent, et non sur le seul tarif horaire de l'engin.",
          "velolev fonctionnant sur devis B2B privé sans tarifs affichés ni devises imposées, les acheteurs renseignent leurs propres coûts de grue et de main-d'œuvre dans le simulateur de coût velolev pour tester leurs scénarios opérationnels en toute clarté."
        ]
      },
      {
        heading: "1. Matrice de périmètre opérationnel pour 40 candélabres",
        paragraphs: [
          "Une grue mobile nécessite le déploiement de stabilisateurs, des autorisations de voirie et des manœuvres répétées entre chaque fosse de candélabre. Avec le lève-mât velolev de 85 kg (fractionné en module vérin de 45 kg et coffret de commande de 40 kg), 1 à 2 opérateurs déplacent l'appareil à bras sans bloquer les voies de circulation.",
          "La pose sur platine d'entraxe 180–260 mm et le pré-serrage des tiges M16–M24 s'effectuent au sol avant levage, sans immobiliser un chauffeur de grue rémunéré à l'heure."
        ]
      },
      {
        heading: "2. Analyse de sensibilité et élimination des heures d'attente",
        paragraphs: [
          "Les loueurs de grues appliquent des forfaits minimum d'une demi-journée ou d'une journée complète avec frais de route. Si un problème d'accès ou de réseau retarde le chantier, les heures d'attente de la grue pèsent lourdement sur la marge du projet.",
          "Disposer d'un équipement autonome alimenté sur batterie 24 V permet de rythmer les levages au gré de l'avancement effectif sans aucune pénalité de chômage d'engin."
        ]
      },
      {
        heading: "3. Check-list chantier pour projets de parkings",
        paragraphs: [
          "Vérifiez que la masse assemblée mât-luminaire ne dépasse pas 300 kg et que la hauteur reste dans la classe 12 m. Pour les platines spéciales à 6 ou 8 trous ou hors plage 180–260 mm, transmettez le plan côté pour contrôle."
        ]
      },
      {
        heading: "Foire aux questions sur les chantiers de parkings",
        paragraphs: [
          "L'équipement peut-il circuler sur enrobé frais sans dégradation ?\nOui, avec 85 kg répartis sur ses patins, il n'exerce aucune pression excessive susceptible de poinçonner les enrobés bitumineux de voirie.",
          "Quelle équipe pour réaliser 40 mâts ?\nLa fiche technique prévoit 1 à 2 opérateurs pour manutentionner et manœuvrer l'appareil, libérant le reste de l'équipe pour les raccordements et le scellement."
        ]
      }
    ]
  },
  "24v-battery-off-grid-rural-road-pole-lifting-planning": {
    locale: "fr",
    slug: "24v-battery-off-grid-rural-road-pole-lifting-planning",
    title: "Lève-mât portable à batterie 24 V pour pistes rurales isolées | velolev",
    h1: "Lève-mât portable à batterie 24 V pour pistes rurales isolées : autonomie par charge et organisation chantier",
    description: "Organisation de levage de candélabres solaires en zones rurales isolées avec le lève-mât portable 24 V : cycles par charge, franchissement et logistique.",
    imageFolder: "/images/guides/24v-battery-off-grid-rural-road-pole-lifting-planning",
    sections: [
      {
        heading: "Planification énergétique pour chantiers hors réseau électrique",
        paragraphs: [
          "L'éclairage solaire rural et les micro-réseaux en site isolé s'implantent fréquemment le long de pistes d'accès difficiles d'accès, dépourvues de distribution électrique. Le recours à des groupes électrogènes ou camions-grues 6x4 complexifie la logistique sur terrains instables.",
          "Le lève-mât hydraulique velolev embarque un coffret électrique autonome sur batterie 24 V (40 kg), assurant des dizaines de cycles de levage sans dépendre de compresseur thermique ou de groupe de chantier."
        ]
      },
      {
        heading: "1. Cycles de levage par charge et marge de sécurité terrain",
        paragraphs: [
          "Les données constructeur mentionnent plus de 50 levages par charge complète en conditions nominales (sujet à la température et au poids du mât). En planification de chantier, les chefs de projet retiennent prudemment 25 à 35 mâts par jour pour intégrer les temps de déplacement et de fixation.",
          "L'emport d'un convertisseur de charge dans le véhicule de liaison ou d'un second pack d'accumulateurs sécurise la continuité des opérations en brousse ou en montagne."
        ]
      },
      {
        heading: "2. Franchissement de pistes non carrossables et voies étroites",
        paragraphs: [
          "La séparation modulaire en deux charges de 45 kg et 40 kg autorise le chargement dans un pick-up 4x4 ou le portage sur brouette tout-terrain vers des fosses inaccessibles aux poids lourds sans risque d'enlisement.",
          "Sur sols meubles ou remblais non tassés, la mise en place de madriers de calage sous les vérins de réaction assure une répartition de portance idéale avant érection."
        ]
      },
      {
        heading: "3. Procédure de recharge et vérification d'état batterie",
        paragraphs: [
          "Contrôlez l'afficheur de tension avant le premier levage du matin. Ne jamais démarrer de manœuvre si la tension franchit le seuil critique afin de préserver la réactivité du clapet de sécurité."
        ]
      },
      {
        heading: "Foire aux questions sur les travaux en milieu isolé",
        paragraphs: [
          "Le froid ou la chaleur affectent-ils la batterie 24 V ?\nLes températures extrêmes influent sur la densité énergétique ; veillez à abriter le coffret accumulateur du rayonnement direct ou des gels nocturnes.",
          "Peut-on recharger sur prise 12 V / 24 V de pick-up ?\nOui, via des chargeurs ou onduleurs adaptés respectant les tolérances de charge des batteries industrielles 24 V."
        ]
      }
    ]
  },
  "pickup-truck-transport-modular-pole-jack-dimensions": {
    locale: "fr",
    slug: "pickup-truck-transport-modular-pole-jack-dimensions",
    title: "Transport en pick-up et fourgon du lève-mât modulaire | velolev",
    h1: "Transport en pick-up et fourgon du lève-mât modulaire : colisage 650 × 350 × 500 mm et dimensions des modules",
    description: "Directives de calage et d'arrimage du lève-mât d'éclairage velolev dans les bennes de pick-up et utilitaires légers : encombrement 650 × 350 × 500 mm et modules 45 kg / 40 kg.",
    imageFolder: "/images/guides/pickup-truck-transport-modular-pole-jack-dimensions",
    sections: [
      {
        heading: "Optimiser la mobilité sans remorque porte-engin",
        paragraphs: [
          "La mobilisation de remorques spécifiques pour chaque candélabre grève lourdement les marges d'un installateur. Le lève-mât velolev a été dimensionné pour s'intégrer directement dans les véhicules utilitaires de service (fourgonnettes ou bennes de pick-up de charge utile 1 t).",
          "Avec un encombrement d'emballage de 650 × 350 × 500 mm et deux colis maniables de 45 kg et 40 kg, deux monteurs assurent le chargement et déchargement sans engin de manutention motorisé."
        ]
      },
      {
        heading: "1. Répartition et arrimage dans la benne de pick-up",
        paragraphs: [
          "Le bloc hydraulique principal (45 kg) s'arrime contre le tablier avant de la benne pour parer aux transferts de masse lors des freinages. Le coffret batterie 24 V (40 kg) se place sur le côté à portée immédiate de l'ouvrant pour une préemption facile sur site.",
          "Le reste de la surface de benne demeure libre pour transporter fûts sectionnels, crosses lumineuses et outillage de serrage."
        ]
      },
      {
        heading: "2. Circulation dans les centres anciens et parkings souterrains",
        paragraphs: [
          "Dans les rues piétonnes ceinturées de bornes escamotables ou les passages sous gabarit de 2,3 m, les camionnettes standard passent là où les porteurs grue de 19 t sont formellement refoulés par arrêté municipal.",
          "Sur le point d'implantation, les poignées ergonomiques permettent d'acheminer les modules à pied à travers des passages de plus de 80 cm de largeur utile."
        ]
      },
      {
        heading: "3. Règles de trincage et sécurité routière",
        paragraphs: [
          "Utilisez des sangles à cliquet homologuées pour sangler les caissons aux anneaux d'arrimage du véhicule. Vérifiez la fermeture des molettes hydrauliques et débranchez les coupleurs rapides pendant le transport."
        ]
      },
      {
        heading: "Foire aux questions sur le transport",
        paragraphs: [
          "L'équipement rentre-t-il dans un break ou SUV professionnel ?\nOui, les dimensions de 650 × 350 × 500 mm s'insèrent sans encombre dans le coffre d'un véhicule de société utilitaire.",
          "Faut-il une formation cariste pour le décharger au dépôt ?\nNon, chaque sous-ensemble restant sous 45 kg, il relève de la manutention manuelle à deux personnes conforme aux exigences de santé au travail."
        ]
      }
    ]
  },
  "overhead-power-lines-narrow-alley-pole-erection-planning": {
    locale: "fr",
    slug: "overhead-power-lines-narrow-alley-pole-erection-planning",
    title: "Levage de mâts sous lignes électriques aériennes et ruelles | velolev",
    h1: "Implantation de mâts de 10 m et 12 m sous lignes électriques aériennes et dans ruelles étroites : sécurité et cotes",
    description: "Respect des distances de garde électrique et prévention des contacts accidentels lors de l'érection de mâts de 10 m et 12 m en ruelles avec lève-mât hydraulique au sol.",
    imageFolder: "/images/guides/overhead-power-lines-narrow-alley-pole-erection-planning",
    sections: [
      {
        heading: "Dangers d'amorçage électrique avec les flèches de grue conventionnelles",
        paragraphs: [
          "Le déploiement de flèches métalliques télescopiques à proximité de conducteurs aériens nus ou isolés de HTA/BT constitue l'une des causes majeures d'électrocution fatale en voirie. Les prescriptions de sécurité imposent des distances minimales d'approche souvent incompatibles avec l'amplitude d'une grue dans des voies de moins de 6 mètres.",
          "Le système velolev relève le candélabre par pivotement direct depuis sa platine d'ancrage avec une cinématique guidée, maintenant le fût dans son emprise verticale stricte sans projection vers les câbles aériens situés en surplomb."
        ]
      },
      {
        heading: "1. Distances de garde et zones d'exclusion réglementaires",
        paragraphs: [
          "Avant toute levée, les chefs de chantier tracent l'arc de pivotement du candélabre de 0° à 90°. Pour un mât de 12 m, il convient de garantir qu'aucun point de la crosse ou de la tête de candélabre ne viole la distance de voisinage réglementaire.",
          "Dans les venelles où aucun calage de grue n'est possible sans toucher les façades, la prise mécanique sur les goujons M16–M24 du massif neutralise le ballant incontrôlé d'une charge suspendue."
        ]
      },
      {
        heading: "2. Manœuvre progressive et communication claire au sol",
        paragraphs: [
          "Le distributeur hydraulique assure une mise en station continue avec possibilité d'arrêt d'urgence instantané par clapet anti-retour, facilitant le guidage visuel permanent des faisceaux de télécommunication ou câbles torsadés traversants.",
          "L'absence de moteur thermique bruyant au poste de levage garantit une communication limpide et immédiate entre les deux monteurs à tout instant."
        ]
      },
      {
        heading: "3. Points de contrôle avant mise en tension du vérin",
        paragraphs: [
          "Assurez-vous de l'absence de réseau aérien dans l'axe de basculement et inspectez le béton du massif. Le levage reste cantonné à la limite stricte de 300 kg et 12 m de hauteur."
        ]
      },
      {
        heading: "Foire aux questions sur les lignes aériennes",
        paragraphs: [
          "Le bâti du lève-mât isole-t-il électriquement l'opérateur ?\nNon. L'appareil est métallique ; la sécurité repose sur le strict respect des distances de dégagement et l'interdiction absolue de tout contact avec des câbles sous tension.",
          "Peut-on opérer par temps d'orage ou pluie battante ?\nTout travail sous conducteurs aériens doit être interrompu dès l'apparition d'intempéries dégradant la visibilité ou augmentant les risques d'arc."
        ]
      }
    ]
  },
  "20-second-lift-stroke-vs-total-light-pole-installation-time": {
    locale: "fr",
    slug: "20-second-lift-stroke-vs-total-light-pole-installation-time",
    title: "Course de vérin de 20 s vs temps total d'installation candélabre | velolev",
    h1: "Course de levage hydraulique de 20 s déclarée vs temps global d'installation d'un candélabre : décomposition du cycle",
    description: "Clarification technique entre la course hydraulique de 20 s déclarée par le constructeur et la durée complète de montage et scellement d'un candélabre sur chantier.",
    imageFolder: "/images/guides/20-second-lift-stroke-vs-total-light-pole-installation-time",
    sections: [
      {
        heading: "Distinguer le temps de détente du vérin du cycle complet de pose",
        paragraphs: [
          "La documentation technique fait état d'un déploiement du vérin principal d'environ 20 secondes sur l'appareil velolev. Lors de la rédaction d'un mémoire technique d'appel d'offres, il est impératif de ne pas confondre cette course mécanique brute avec le cycle complet de pose par candélabre.",
          "L'érection complète inclut la mise en place de l'outil sur le massif, l'engagement des câbles, la fixation de la crosse et du luminaire au sol, l'érection proprement dite, le réglage d'aplomb et le serrage au couple des écrous M16–M24."
        ]
      },
      {
        heading: "1. Décomposition type du cycle de pose par candélabre",
        paragraphs: [
          "Pour un binôme rodé de 2 techniciens, la séquence se répartit couramment ainsi : 10 à 15 minutes d'équipement du candélabre au sol (câblage, luminaire et bridage au vérin), 20 à 30 secondes d'élévation motorisée, puis 5 à 10 minutes d'ajustement de verticalité et de desserrage de l'appareil.",
          "Le temps moyen total s'établit entre 20 et 35 minutes par point lumineux, permettant à une équipe légère de poser 10 à 16 candélabres par journée sans fatigue excessive."
        ]
      },
      {
        heading: "2. Utilisation responsable des chiffres dans les plannings de travaux",
        paragraphs: [
          "Ne multipliez pas 20 secondes par le nombre de candélabres pour caler votre planning de chantier. Prévoyez les temps de déplacement d'un massif à l'autre, les vérifications d'isolement électrique et les pauses réglementaires.",
          "L'économie réelle provient de la suppression totale des files d'attente liées au déplacement d'une grue lourde et de la simplicité de manipulation du système de 85 kg."
        ]
      },
      {
        heading: "3. Informations à préciser dans vos demandes de projet",
        paragraphs: [
          "Communiquez le poids total du luminaire, le type de crosse et les cotes de platine pour confirmer que le cycle prévu respecte la limite de 300 kg et 12 m de hauteur."
        ]
      },
      {
        heading: "Foire aux questions sur les cadences",
        paragraphs: [
          "La vitesse d'ascension est-elle paramétrable ?\nNon, le débit du groupe électrohydraulique est étalonné d'usine pour préserver la stabilité du centre de gravité et éliminer les à-coups dynamiques.",
          "Une équipe de 3 personnes améliore-t-elle la cadence ?\nOui, une troisième personne peut anticiper le tirage de câbles et le vissage des lanternes au sol pendant que les deux autres assurent le levage et le calage."
        ]
      }
    ]
  },
  "foundation-inspection-before-self-anchoring-pole-erection": {
    locale: "fr",
    slug: "foundation-inspection-before-self-anchoring-pole-erection",
    title: "Contrôle de fondation et tiges d'ancrage avant levage de candélabre | velolev",
    h1: "Contrôle préalable du massif de fondation et des tiges d'ancrage avant levage sur platine",
    description: "Liste des cotes de massif, dépassements de filetage, profondeurs d'ancrage et relevés photo indispensables à la revue de compatibilité de levage velolev.",
    imageFolder: "/images/guides/foundation-inspection-before-self-anchoring-pole-erection",
    sections: [
      {
        heading: "Pourquoi l'état du massif de fondation conditionne le levage sur platine",
        paragraphs: [
          "À la différence d'une grue qui reprend les efforts dans sa structure propre, le système velolev prend appui directement sur les tiges d'ancrage et le béton du massif pour lever le candélabre. La conformité mécanique du massif et l'intégrité des goujons sont donc primordiales pour la sécurité de la manœuvre.",
          "Des bétons n'ayant pas atteint leur cure réglementaire, des tiges désaxées ou des filetages abîmés peuvent compromettre l'effort d'appui et la stabilité du vérin."
        ]
      },
      {
        heading: "1. Paramètres géométriques et tableau de contrôle",
        paragraphs: [
          "Avant de démarrer le chantier, relevez au pied à coulisse : le diamètre nominal des tiges (de M16 à M24), la hauteur de filetage émergent (minimum 50–70 mm pour écrou, contre-écrou et platine de base) et l'entraxe entre trous (qui doit être compris entre 180 et 260 mm).",
          "Vérifiez l'horizontalité de l'arase de béton. Des faux niveaux excessifs requièrent un calage sous platine ou un mortier de scellement sans retrait pour assurer un contact parfait."
        ]
      },
      {
        heading: "2. Frontière entre vérification préalable et note de calcul de sol",
        paragraphs: [
          "La grille de contrôle velolev permet de valider la compatibilité géométrique et mécanique de l'outil avec l'embase. Elle ne remplace en aucun cas la note de calcul de stabilité au vent ni l'étude de sol géotechnique, qui incombent au bureau d'études de l'opération.",
          "Si les tiges ont été coulées sans gabarit acier d'alignement, vérifiez l'orthogonalité pour éviter tout effort de cisaillement au montage."
        ]
      },
      {
        heading: "3. Dossier de 4 éléments pour revue technique express",
        paragraphs: [
          "Pour une validation technique sous 2 heures par notre bureau d'études, rassemblez : 1) plan côté de la platine, 2) photo nette du massif avec mètre ruban, 3) diamètre des tiges et 4) fiche fabricant du candélabre."
        ]
      },
      {
        heading: "Foire aux questions sur les massifs de candélabres",
        paragraphs: [
          "Peut-on utiliser le système sur des fûts à enfouissement direct dans le sol ?\nNon. L'appareil exige impérativement un massif béton pourvu de tiges d'ancrage pour reprendre les efforts de poussée au levage.",
          "Que faire si une tige est faussée ou trop courte ?\nLe problème doit être soumis à l'ingénieur structure pour pose de manchon fileté homologué ou réalignement sous contrôle avant érection."
        ]
      }
    ]
  },
  "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders": {
    locale: "fr",
    slug: "evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    title: "Évaluation technique d'un lève-mât portable en appel d'offres B2B | velolev",
    h1: "Évaluation des preuves techniques d'un lève-mât portable en appels d'offres B2B : données S4 vs essais",
    description: "Guide pour acheteurs publics et entreprises EPC distinguant les spécifications certifiées S4, les performances d'usine et les justificatifs de conformité en appels d'offres.",
    imageFolder: "/images/guides/evaluating-portable-pole-lifter-technical-evidence-b2b-tenders",
    sections: [
      {
        heading: "Rigueur documentaire dans les marchés publics et dossiers EPC",
        paragraphs: [
          "Dans les appels d'offres d'éclairage public et de voirie, intégrer un mode opératoire innovant sans camion-grue requiert une distinction rigoureuse des données techniques certifiées face aux allégations commerciales. Un mémoire technique imprécis peut être retoqué lors de l'ouverture des offres ou bloqué par le coordonnateur SPS.",
          "velolev met à disposition une documentation d'ingénierie classant clairement les spécifications d'usine confirmées (S4) et les données issues d'essais terrain."
        ]
      },
      {
        heading: "1. Grille de classification des preuves techniques pour commission d'appel d'offres",
        paragraphs: [
          "Données de Rang A (Certifiées conformes) : Charge nominale de 300 kg, classe de candélabre 12 m max, masse en 2 modules de 85 kg (45 kg + 40 kg), plage d'entraxe 180–260 mm et goujons fournis M16–M22.",
          "Données de Rang D (Déclarées constructeur / en cours d'évaluation) : Course hydraulique en 20 secondes et autonomie de plus de 50 cycles par batterie 24 V, à présenter comme valeurs de référence soumises aux aléas de chantier."
        ]
      },
      {
        heading: "2. Valorisation dans le Plan Particulier de Sécurité et de Protection de la Santé (PPSPS)",
        paragraphs: [
          "Mettez en avant dans votre mémoire la suppression radicale du risque de basculement d'engin lourd et l'élimination des travaux en hauteur pour l'élingage du mât. Le monteur opère en permanence les pieds au sol.",
          "Valorisez également le gain environnemental découlant de la neutralisation des rejets diesel d'un camion porteur 19 t au profit d'un groupe électrohydraulique 24 V."
        ]
      },
      {
        heading: "3. Rappel des limites techniques d'emploi",
        paragraphs: [
          "Mentionnez expressément dans votre offre que les fûts de plus de 300 kg ou excédant 12 m de haut relèvent du recours obligatoire à une grue mobile classique."
        ]
      },
      {
        heading: "Foire aux questions sur les marchés publics",
        paragraphs: [
          "velolev fournit-il une déclaration de conformité CE ?\nOui, la déclaration CE de conformité aux directives machines et compatibilité électromagnétique est remise sur demande d'affaire.",
          "Comment répondre aux CCTP exigeant 'un camion grue avec panier' ?\nEn proposant une variante technique justifiée par une sécurité accrue (zéro travail en hauteur pour levage), l'absence d'empreinte sur voirie et un bilan carbone réduit."
        ]
      }
    ]
  },
  "solar-wind-sail-area-site-assessment-pole-lifting": {
    locale: "fr",
    slug: "solar-wind-sail-area-site-assessment-pole-lifting",
    title: "Surface des panneaux solaires et vent lors du levage de candélabre | velolev",
    h1: "Prise au vent des panneaux solaires et exposition du site : données préalables à la validation de levage",
    description: "Relevé des surfaces photovoltaïques, hauteur de fixation, rugosité du terrain et poids total sous 300 kg pour la revue technique avant érection de candélabres solaires.",
    imageFolder: "/images/guides/solar-wind-sail-area-site-assessment-pole-lifting",
    sections: [
      {
        heading: "Influence de la surface des modules photovoltaïques sur le levage",
        paragraphs: [
          "Sur les candélabres solaires autonomes 'tout-en-un' ou à panneau déporté en tête de mât, la surface du module photovoltaïque génère une prise au vent non négligeable. Lors du pivotement de l'horizontale vers la verticale, les rafales transversales induisent des moments de torsion sur les bras du vérin.",
          "Pour lever en toute sécurité sous la capacité de 300 kg de velolev, il convient d'additionner le poids statique de la lanterne et de la batterie au moment de renversement provoqué par le vent sur le capteur."
        ]
      },
      {
        heading: "1. Paramètres de surface vélique et d'implantation sur site",
        paragraphs: [
          "Le technicien doit consigner : la surface unitaire des modules solaires (en m²), l'angle d'inclinaison par rapport au fût, la hauteur en tête et la classe de rugosité du terrain (rase campagne, front de mer ou tissu urbain dense).",
          "Les panneaux excédant 1,5 m² en tête de candélabre exigent une attention renforcée et ne doivent pas être manœuvrés lorsque les rafales de vent dépassent 25 à 30 km/h."
        ]
      },
      {
        heading: "2. Mesures anémométriques sans seuils forfaitaires",
        paragraphs: [
          "La sécurité ne repose pas sur des estimations subjectives. Les équipes doivent utiliser un anémomètre digital portatif sur le lieu d'implantation. Dès que les rafales excèdent la tolérance opérationnelle de l'équipe, le levage doit être différé.",
          "Le vérin hydraulique velolev dispose d'un clapet de blocage hydraulique qui fige la charge en position intermédiaire en cas de coup de vent imprévu."
        ]
      },
      {
        heading: "3. Préparation de votre dossier de validation solaire",
        paragraphs: [
          "Transmettez la fiche technique du panneau photovoltaïque, le plan du support de crosse et la masse globale de l'équipement fixé au fût avant toute commande ferme."
        ]
      },
      {
        heading: "Foire aux questions sur les candélabres solaires",
        paragraphs: [
          "Vaut-il mieux poser le panneau solaire une fois le mât levé ?\nLe principal atout de velolev est de monter la lanterne et le panneau à hauteur d'homme au sol. Toutefois, par vent turbulent, assembler le panneau en hauteur depuis une nacelle peut être préféré si la sécurité l'impose.",
          "La forme du fût (conique ou octogonale) modifie-t-elle la prise au vent ?\nOui, les profils aérodynamiques diffèrent ; signalez la géométrie exacte du fût lors de votre soumission de plan."
        ]
      }
    ]
  }
};

// Merge into localesData
localesData.es = { ...localesData.es, ...esArticles };
localesData.fr = { ...localesData.fr, ...frArticles };

fs.writeFileSync(localesPath, JSON.stringify(localesData, null, 2), "utf8");
console.log("Successfully updated ES and FR articles in published-content-locales.json");
console.log("ES total count:", Object.keys(localesData.es).length);
console.log("FR total count:", Object.keys(localesData.fr).length);
