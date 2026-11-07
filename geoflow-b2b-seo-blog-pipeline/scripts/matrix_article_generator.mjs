#!/usr/bin/env node
/**
 * matrix_article_generator.mjs
 * 
 * GEOFlow B2B 多语言矩阵文章自动化生成引擎
 * 遵循原则: English First -> 事实冻结 (F001-F031) -> 7+1 语种保真本地化
 * 
 * 目标语言:
 *   - en: 英文基准母版
 *   - es: 西班牙语 (拉美/欧洲工程市场)
 *   - fr: 法语 (西非/欧洲基础设施市场)
 *   - pt: 葡萄牙语 (巴西/南美基建市场)
 *   - vi: 越南语 (东南亚制造业与道路工程)
 *   - th: 泰语 (东南亚市政照明工程)
 *   - id: 印度尼西亚语 (东南亚重工群岛市场)
 *   - zh: 简体中文 (国内备案与对照母厂)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

// 格式化 Slug 为自然英文标题词组
export function slugToTitleWords(slug) {
  return slug
    .replace(/^portable-/, 'Portable ')
    .replace(/-explainer$/, '')
    .split(/[-_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// 7+1 多语种工程本地化生成器
export const LOCALE_GENERATORS = {
  en: {
    langName: 'English',
    title: (topicWords) => `${topicWords}: Engineering Architecture, Flange Compatibility, and Jobsite Selection Guide`,
    metaDesc: (topicWords) => `Engineering analysis and technical selection guide for ${topicWords}. Covers 300kg rated capacity, 85kg split module transport, 180-260mm P.C.D. flange fit, and two-worker field SOP without cranes.`,
    generate: (topicWords, topicSlug) => `# ${topicWords}: Engineering Architecture, Flange Compatibility, and Jobsite Selection Guide

In municipal roadway lighting and off-grid solar illumination infrastructure, pole erection and aerial crane rigging represent major project safety and expenditure bottlenecks. Erecting standard 6m to 12m street light poles traditionally relies on 16-ton mobile cranes or boom trucks to hoist column shafts and align base flanges. However, on congested urban avenues, pedestrian thoroughfares, campus pathways, and unpaved solar facilities, heavy mobile cranes face severe physical constraints, lack of outrigger setup clearances, and prolonged municipal right-of-way permit delays.

The [portable hydraulic pole lifter](/products/light-pole-jack/) represents a next-generation lightweight, in-situ fluid power machine. Engineered with a split two-module architecture and foundation self-anchoring mechanics, a standard two-person crew can complete foundation lock-down, flange bolt alignment, and plumb vertical raising at ground level—entirely eliminating heavy mobile crane dependency.

> ### 📌 Key Takeaways for Project Engineers
> - **Zero-Crane Logistics:** Eliminates 16-ton boom truck dispatch, heavy road closure permits, and narrow access blockades for standard 6m to 12m municipal lighting columns.
> - **Factory-Verified Load Rating:** Strictly 300kg rated vertical lifting capacity calibrated and certified on factory vertical test rigs (F002, F020).
> - **Two-Person Modular Transport:** Split two-module 85kg total package (45kg hydraulic lifter + 40kg 24V power unit) easily transported by two workers in standard utility pickups (F001, F008).
> - **Universal Foundation Fit:** Heavy-duty slotted base plate accommodates 180mm to 260mm bolt circle diameters (P.C.D.) supporting M16 to M24 anchor studs (F015, F016).

---

## 1. Mechanical Architecture & Split Two-Module Engineering

The core design philosophy of the portable light pole lifter centers on substituting heavy aerial hoisting machinery with ground-level modular fluid power. The entire system is built upon a split two-module architecture with a strictly verified total transport weight of **85kg**:
1. **Hydraulic Lifter Rig Assembly:** Overall dimensions 610 × 220 × 220 mm, weighing strictly **45kg**. Houses a high-rigidity structural alloy telescoping column and an 800mm effective vertical stroke cylinder, integrated with secondary mechanical safety lock pins to prevent unexpected pressure loss descent.
2. **24V Electrical Control Cabinet:** Overall dimensions 500 × 300 × 250 mm, weighing strictly **40kg**. Accommodates a high energy density **24V DC** rechargeable battery pack, electric motor-pump assembly, and dual proportional directional valves.
3. **Transport Packaging Dimensions:** Packaged outer dimensions measure 650 × 350 × 500 mm, crated inside an ISPM-15 compliant heavy steel-banded industrial wooden crate.

Because neither modular unit exceeds 45kg, the system complies with international manual handling health and safety standards. Two field workers can easily unload both modules from a standard utility pickup and transport them manually down pedestrian corridors or landscaped parklands.

According to manufacturer-reported specifications, vertical hydraulic stroke extension requires approximately 20 seconds, delivering over 50 complete lifting operations per full battery charge, with a design lifespan exceeding 3,000 operational cycles. These figures represent factory bench testing baselines; real-world cycle pacing adapts dynamically to jobsite wind speeds, ambient temperatures (-20°C to 50°C), and luminaire sail areas.

💡 [Tired of High Crane Rental Bills? Calculate Your Project Savings with the Crane ROI Calculator](/tools/roi-calculator/)

---

## 2. Structural Verification & Overhead Clearance Safety

In construction rigging, engineering safety margins depend upon strict adherence to international industrial codes. Aerial electrical contact is among the most catastrophic hazards in municipal lighting work.

Under traditional boom truck operations, **OSHA 1926 Subpart CC (29 CFR 1926.1408)** mandates maintaining an absolute minimum clearance buffer of 10 to 20 feet (3.05m to 6.1m) when swinging metallic crane booms near energized overhead power lines. In dense urban alleyways, this regulatory constraint frequently forces prolonged street-wide power outages or indefinite project delays. The portable lifter operates directly at the foundation base, raising the column smoothly from horizontal to vertical entirely below overhead utility envelopes. This geometry fully complies with **IEEE 516** live-line maintenance safety separation rules, neutralizing electrocution hazards.

Regarding structural load verification, rated vertical lifting capacity is strictly limited to **300kg**, supporting municipal and highway lighting columns up to a maximum height of **12m** (covering 6m, 8m, 10m, and 12m standard shafts). Every machine undergoes 100% pre-shipment quality assurance, including a 24-hour hydraulic pressure hold test and full-load validation on dedicated vertical test rigs to ensure zero valve block leakage under sustained stress.

In accordance with European lighting column standard **EN 40-3** regarding structural overturning moments, the lifter is equipped with multi-point adjustable outriggers and high-precision visual spirit levels. This enables rapid leveling on asphalt crowns or compacted gravel shoulders, neutralizing lateral wind overturning moments. Project managers can review the [crane alternative for tight spaces](/compare/pole-jack-vs-crane/) for comparative layout and clearance calculations.

---

## 3. Universal Base Flange & Foundation Bolt Circle Compatibility (180mm to 260mm)

A primary challenge in roadway lighting infrastructure is the wide variance in municipal base flange specifications. The lifter features a heavy-duty universal base plate machined with radial slotted bolt paths, providing broad geometric tolerance:
- **Pitch Circle Diameter (P.C.D.):** The universal plate accommodates foundation bolt patterns from **180mm to 260mm**. Whether the footing features a 4-bolt square cage or a circular multi-bolt pattern, the machine locks securely into position.
- **Anchor Stud Capacity:** Supports standard structural anchor studs from **M16, M18, M20, M22, to M24**.
- **Standard Packaging Hardware:** The unit includes four sets of hardened structural clamping washers and nuts for M16, M18, M20, and M22 studs. M24 studs are mechanically accommodated by the slot geometry, but require project drawing verification of thread pitch and projection height prior to mobilization.

In modern civil highway works, foundation anchor cages typically execute **ASTM F1554** (Grade 36, 55, or 105) or **ASTM A325** structural fastener standards. During initial lift-off, the machine transfers reaction compressive loads directly into the footing while engaging rear anchor studs in tension, avoiding foundation concrete edge spalling. Contractors can reference the [flange bolt circle compatibility guide](/guides/pole-jack-compatibility/) to verify base plate geometries.

📐 [Verify Your Flange Bolt Circle: Request Free 24h Factory Engineering Drawing Audit](/quote/)

---

## 4. Standard Two-Worker Field Installation SOP

To ensure disciplined field execution, jobsites follow a standardized three-phase standard operating procedure (SOP) strictly mandating a two-person operation crew:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ Phase 1: Foundation Inspection & Utility Clearances    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Base Plate Self-Anchoring & Column Pinning    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: Ground Wiring, Metered 24V Lift & Flange Lock │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Phase 1: Foundation Survey & Clearance Verification**
   - Confirm that concrete compressive strength has reached design specification; clean M16 to M24 anchor stud threads of debris and mortar.
   - Align fixture aiming axes with roadway geometry according to **ANSI/IES RP-8-18** photometric guidelines.
   - Inspect overhead vertical space to verify adequate clearance buffers from any overhead electrical conductors.

2. **Phase 2: Modular Assembly & Foundation Self-Anchoring**
   - Two technicians slide the 45kg lifter base plate over exposed anchor studs and thread retaining nuts to lock the machine in position.
   - Connect the 40kg 24V power cabinet using quick-disconnect couplers; adjust leveling outriggers until the bubble level is centered.
   - Align the base pivot bracket of the horizontal lighting pole with the lifter carriage and insert the primary alloy safety lock pin.

3. **Phase 3: Ground-Level Pre-Wiring & Metered Hydraulic Raising**
   - Assemble luminaires, pull cables, and set optical aiming angles at ground level, eliminating hazardous ladder climbing.
   - Operator 1 actuates the 24V hydraulic control lever to smoothly raise the column mast.
   - Operator 2 observes pole raising and foundation stud alignment from a 45-degree safety angle.
   - Upon reaching true vertical orientation (90°), the hydraulic counterbalance valve and mechanical safety stop hold the column secure while technicians torque base nuts to engineering specifications.

📄 [Download Complete 12m Lifter Engineering Specs & Field Operation Manual (PDF)](/resources/)

---

## 5. Engineering Boundaries & Critical Misconceptions

In B2B equipment procurement and project planning, engineering decision-makers must distinguish verified boundaries from common industry misconceptions:

| Common Industry Misconception | Verified Engineering Fact | Risk of Non-Compliance |
|---|---|---|
| **Misconception 1: Lightweight gear allows single-worker operation** | Although the 45kg and 40kg modules enable easy transport, jobsite safety regulations **strictly mandate a two-person crew**. One worker controls hydraulics; one guides bolt alignment. | Single-worker operation creates blind spots, cross-threading, and structural instability risks. |
| **Misconception 2: Compact lifters replace all heavy cranes** | Machine capacity is strictly rated at **300kg maximum load** and **12m maximum pole height**. Designed for municipal street lights and solar columns. | Attempting to hoist 15m to 35m high-mast sports towers or heavy structural masts risks catastrophic failure. Heavy cranes remain mandatory. |
| **Misconception 3: Payback period is fixed and guaranteed** | Equipment eliminates crane rental fees, but overall project ROI depends on pole density, local boom truck rates, and labor costs. | Assuming fixed payback leads to budgeting errors. Contractors should use project-specific ROI calculation models. |

---

## 6. Frequently Asked Questions (FAQ)

### Q1: Can a single field technician transport and operate the lifter?
No. While the 45kg and 40kg split packaging allows two workers to load and unload easily from a standard utility pickup, field installation strictly requires a two-person crew (two-worker operation mandatory). One operator controls the 24V hydraulic power unit while the second guides flange alignment and torques foundation nuts.

### Q2: What foundation bolt patterns are supported out of the box?
The universal slotted base plate accommodates Pitch Circle Diameters (P.C.D.) from 180mm to 260mm. The standard shipment includes heavy-duty hardened clamping hardware for M16, M18, M20, and M22 foundation bolts. M24 bolts fit within the slot geometry but require project drawing verification.

### Q3: How is structural stability ensured when erecting a 12m pole in windy conditions?
The lifter is structurally rated for a maximum pole height of 12m and a vertical proof load of 300kg. Each machine incorporates wide adjustable outriggers with precision spirit levels to establish a stable foundation stance, resisting wind overturning moments per EN 40-3 standards.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can a single field technician transport and operate the lifter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Equipment strictly requires a two-person crew. While the 45kg and 40kg split modules allow easy pickup transport, one operator must manage hydraulic valve controls while the second guides base plate alignment."
      }
    },
    {
      "@type": "Question",
      "name": "What foundation bolt patterns are supported out of the box?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The slotted universal base plate supports 180mm to 260mm P.C.D. bolt circle patterns, with factory-supplied clamping hardware for M16, M18, M20, and M22 studs. M24 studs are supported subject to engineering drawing verification."
      }
    },
    {
      "@type": "Question",
      "name": "How is structural stability ensured when erecting a 12m pole in windy conditions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The lifter features a 300kg proof-tested capacity, 12m maximum column height envelope, and multi-point leveling outriggers that neutralize lateral wind moments in accordance with EN 40-3."
      }
    }
  ]
}
</script>
`
  },

  es: {
    langName: 'Spanish',
    title: (topicWords) => `Elevador Hidráulico Portátil para Postes: Arquitectura Técnica, Compatibilidad de Bridas y Guía de Selección`,
    metaDesc: (topicWords) => `Guía técnica y análisis de selección para elevador hidráulico de postes de luz. Carga nominal de 300 kg, transporte modular de 85 kg, bridas P.C.D. 180-260 mm y SOP de dos operarios sin grúas.`,
    generate: (topicWords, topicSlug) => `# Elevador Hidráulico Portátil para Postes de Luz: Arquitectura Técnica, Compatibilidad de Bridas y Guía de Selección

En la infraestructura de alumbrado público municipal y proyectos de iluminación solar autónoma, el izaje y montaje de postes representan importantes cuellos de botella en costos operativos y seguridad laboral. La erección tradicional de postes estándar de 6 m a 12 m depende sistemáticamente del arriendo de grúas móviles telescópicas o camiones pluma de 16 toneladas para izar las columnas y posicionar las bridas de anclaje. Sin embargo, en paseos peatonales estrechos, caminos interiores, medianas con vegetación y plantas fotovoltaicas en terrenos no pavimentados, las grúas pesadas enfrentan severas restricciones de espacio, falta de apoyo para estabilizadores y extensas demoras en permisos municipales de corte de tránsito.

El [elevador hidráulico portátil para postes de luz](/products/light-pole-jack/) representa una solución mecánica de potencia fluídica in situ de nueva generación. Diseñado con una arquitectura modular dividida en dos unidades y un principio de autoanclaje sobre los pernos de cimentación, una cuadrilla estándar de dos técnicos (two-person crew) puede completar el bloqueo mecánico en tierra, la alineación de las bridas y la erección vertical continua, eliminando por completo la dependencia de grúas pesadas.

> ### 📌 Puntos Clave para Ingenieros de Proyecto y Compradores
> - **Logística Cero Grúas (Zero-Crane Logistics):** Elimina el costoso despliegue de camiones pluma de 16 toneladas, permisos viales y bloqueos en accesos estrechos para postes estándar de 6 m a 12 m.
> - **Carga Nominal Verificada en Fábrica:** Capacidad de izaje vertical certificada de 300 kg calibrada en banco de pruebas vertical con ensayo de presión hidráulica sostenida de 24 horas (F002, F020).
> - **Transporte Modular para Dos Operarios:** Conjunto dividido en dos módulos de 85 kg en total (unidad de izaje 45 kg + caja de control 24V de 40 kg), fácilmente transportable por dos trabajadores en camioneta estándar (F001, F008).
> - **Compatibilidad Universal de Bridas:** Placa base reforzada con ranuras radiales para círculos de pernos (P.C.D.) de 180 mm a 260 mm, compatible con pernos de anclaje M16 a M24 (F015, F016).

---

## 1. Arquitectura Mecánica e Ingeniería Modular de Dos Unidades

El principio técnico fundamental del elevador portátil para postes radica en reemplazar la maquinaria pesada de izaje aéreo por cinemática fluídica modular desplegada en tierra. El sistema completo se basa en una arquitectura dividida en dos módulos con un peso de transporte rigurosamente comprobado de **85 kg**:
1. **Unidad de Elevación Hidráulica (Hydraulic Lifter Rig):** Dimensiones exteriores 610 × 220 × 220 mm, peso propio estricto de **45 kg**. Incorpora un mástil telescópico de aleación estructural de alta rigidez y un cilindro hidráulico de carrera vertical útil de 800 mm, equipado con pasadores mecánicos de seguridad anticaída.
2. **Gabinete de Control Eléctrico 24V DC:** Dimensiones exteriores 500 × 300 × 250 mm, peso propio estricto de **40 kg**. Aloja un banco de baterías recargables de alta densidad **24V DC**, unidad motobomba en miniatura y válvulas direccionales proporcionales dobles.
3. **Dimensiones de Embalaje de Envío:** Embalaje exterior de 650 × 350 × 500 mm en caja de madera industrial con flejado de acero bajo norma fitosanitaria ISPM-15.

Al no superar los 45 kg por módulo, el equipo cumple plenamente con los estándares internacionales de salud y seguridad laboral sobre manipulación manual de cargas por dos personas. Dos técnicos pueden descargar fácilmente los módulos de una camioneta de trabajo y transportarlos manualmente por pasajes peatonales o parques.

Según las especificaciones del fabricante, la carrera hidráulica vertical completa se realiza en aproximadamente 20 segundos, ofreciendo más de 50 ciclos de elevación por carga de batería, con una vida útil de diseño superior a 3.000 ciclos de operación (-20°C a +50°C).

💡 [Reduzca Costos de Obra: Calcule su Ahorro Frente al Arriendo de Grúas con la Calculadora de ROI](/tools/roi-calculator/)

---

## 2. Verificación Estructural y Seguridad Bajo Líneas Eléctricas

En la ingeniería de montaje, los márgenes de seguridad dependen del cumplimiento riguroso de normativas industriales internacionales. El contacto accidental con cables eléctricos aéreos representa uno de los mayores peligros mortales en la instalación de postes.

En maniobras convencionales con grúa, la norma **OSHA 1926 Subpart CC (29 CFR 1926.1408)** exige mantener una zona de seguridad estricta de 10 a 20 pies (3.05 m a 6.1 m) respecto a líneas eléctricas energizadas. En pasajes urbanos densos, esto obliga a cortes prolongados de energía o paralizaciones de obra. El elevador portátil opera directamente sobre la cimentación de concreto, levantando el poste de la horizontal a la vertical estricta sin invadir el espacio aéreo superior. Esta geometría cumple con la norma **IEEE 516** de distancias de seguridad en líneas energizadas.

En cuanto a la resistencia estructural, la capacidad de carga vertical admisible está fijada estrictamente en **300 kg**, permitiendo el montaje de postes de alumbrado público y vial hasta una altura máxima de **12 m** (postes estándar de 6 m, 8 m, 10 m y 12 m). Cada unidad pasa por un control de calidad en fábrica del 100%, con prueba de presión hidráulica de 24 horas y banco de carga vertical nominal (F020).

Conforme a la norma europea de postes de alumbrado **EN 40-3** relativa a momentos de vuelco por viento, el equipo cuenta con estabilizadores niveladores multipunto y niveles de burbuja de precisión. Los jefes de obra pueden consultar la [guía de alternativas a grúas en espacios reducidos](/compare/pole-jack-vs-crane/) para verificar cálculos de implantación.

---

## 3. Placa Base Universal y Compatibilidad de Bridas (P.C.D. 180 mm a 260 mm)

Una dificultad recurrente en proyectos viales es la variabilidad en los patrones de pernos de anclaje de las bridas municipales. El elevador incorpora una placa base universal forjada con ranuras radiales alargadas que ofrecen una amplia tolerancia geométrica:
- **Diámetro del Círculo de Pernos (P.C.D.):** La placa base se adapta a patrones de pernos de cimentación de **180 mm a 260 mm**, tanto en bases cuadradas de 4 pernos como en jaulas circulares perimetrales.
- **Rango de Pernos de Anclaje:** Compatible con pernos estructurales estándar de **M16, M18, M20, M22 a M24**.
- **Accesorios Incluidos de Fábrica:** El suministro incluye cuatro juegos de arandelas endurecidas y tuercas de sujeción para pernos M16, M18, M20 y M22. Los anclajes M24 son geométricamente aceptados pero requieren revisión previa de planos de paso y proyección.

En obras viales modernas, las jaulas de cimentación aplican normas **ASTM F1554** (Grado 36, 55 o 105) o pernos estructurales **ASTM A325**. Durante la fase inicial de despegue, la placa transfiere las fuerzas de reacción en compresión sobre el dado de concreto mientras tensiona los pernos posteriores, previniendo desprendimientos. Consulte la [guía de compatibilidad de pernos de brida](/guides/pole-jack-compatibility/) para verificar medidas.

📐 [Compruebe el Diámetro de Pernos de su Brida: Solicite Revisión Gratuita de Planos en 24h](/quote/)

---

## 4. Procedimiento Operativo Estandarizado (SOP) para Dos Operarios

Para garantizar una ejecución disciplinada en obra, los proyectos siguen un procedimiento operativo estandarizado (SOP) de tres fases que exige estrictamente una cuadrilla de dos personas:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ Fase 1: Inspección de Cimentación y Despeje Eléctrico  │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Fase 2: Autoanclaje de Placa Base y Pasador de Giro    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Fase 3: Conexión en Tierra, Izaje 24V y Torque Final   │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Fase 1: Inspección de Base y Verificación de Distancias**
   - Confirmar curado de concreto y resistencia de diseño; limpiar roscas de pernos M16 a M24 de rebabas o mortero.
   - Alinear la orientación óptica de las luminarias según pautas fotométricas **ANSI/IES RP-8-18**.
   - Inspeccionar el espacio aéreo vertical para confirmar distancias de seguridad respecto a conductores eléctricos.

2. **Fase 2: Posicionamiento y Autoanclaje de la Placa Base**
   - Dos técnicos deslizan la placa base del elevador de 45 kg sobre los pernos expuestos y fijan las tuercas de retención.
   - Acoplar la caja de control 24V de 40 kg mediante conectores rápidos; ajustar estabilizadores hasta centrar el nivel de burbuja.
   - Alinear el soporte de giro del poste horizontal con el carro elevador e insertar el pasador de seguridad de aleación de alta resistencia.

3. **Fase 3: Cableado a Nivel de Suelo e Izaje Hidráulico Controlado**
   - Ensamblar luminarias, cablear y ajustar ángulos de inclinación a nivel del suelo, eliminando trabajos en altura sobre escaleras.
   - El Operario 1 acciona la palanca de control de la unidad hidráulica 24V para elevar suavemente la columna.
   - El Operario 2 observa el ascenso del poste y la alineación con los pernos de la base desde un ángulo seguro de 45 grados.
   - Al alcanzar la vertical estricta (90°), la válvula hidráulica de balance y el tope mecánico fijan la posición mientras se aplica torque a las tuercas de anclaje.

📄 [Descargar Especificaciones Técnicas y Manual de Operación de Postes 12m (PDF)](/resources/)

---

## 5. Límites de Ingeniería y Mitos Habituales en Obra

En compras técnicas B2B y planificación de proyectos, es fundamental distinguir los parámetros comprobados de los conceptos erróneos frecuentes en la industria:

| Mito Habitual en la Industria | Realidad de Ingeniería Verificada | Riesgo del Incumplimiento |
|---|---|---|
| **Mito 1: El equipo ligero permite operación por una sola persona** | Aunque los módulos de 45 kg y 40 kg facilitan el transporte, los protocolos de seguridad **exigen estrictamente dos operarios**. Uno controla el sistema hidráulico y otro guía el anclaje. | Trabajar con un solo técnico genera puntos ciegos, daño de roscas e inestabilidad estructural durante el izaje. |
| **Mito 2: El elevador reemplaza todo tipo de grúas pesadas** | La capacidad está calibrada estrictamente para **300 kg de carga máxima** y **12 m de altura máxima de poste**. Diseñado para postes de alumbrado público y solar. | Intentar levantar torres de gran altura (15 m a 35 m) con coronas móviles causa fallas catastróficas. Las grúas de gran tonelaje siguen siendo indispensables. |
| **Mito 3: El tiempo de amortización es fijo e idéntico en todo proyecto** | El equipo elimina el costo de arriendo de grúas, pero el ROI real depende de la densidad de postes por kilómetro, tarifas locales de arriendo y costo de mano de obra. | Asumir retornos fijos genera desvíos presupuestarios. Los contratistas deben modelar sus costos con la calculadora específica. |

---

## 6. Preguntas Frecuentes (FAQ)

### P1: ¿Puede un solo técnico en terreno transportar y operar el elevador?
No. Aunque los módulos separados de 45 kg y 40 kg permiten una fácil carga y descarga en camioneta, la instalación en obra exige estrictamente dos operarios (two-worker operation mandatory). Un técnico controla la válvula hidráulica 24V mientras el segundo guía la alineación de la brida y aprieta las tuercas.

### P2: ¿Qué dimensiones de pernos de anclaje de cimentación admite el equipo?
La placa base ranurada admite patrones de pernos con diámetro de círculo de paso (P.C.D.) de 180 mm a 260 mm. El equipo incluye arandelas y tuercas de apriete para pernos M16, M18, M20 y M22. Los pernos M24 son geométricamente aceptados en las ranuras pero requieren verificación previa de planos.

### P3: ¿Cómo se asegura la estabilidad vertical de un poste de 12 m frente a ráfagas de viento?
El elevador cuenta con una capacidad vertical de prueba de 300 kg y límite de poste de 12 m. Incorpora estabilizadores niveladores multipunto con niveles de precisión para asentar una base rígida, contrarrestando momentos de vuelco por viento según la norma EN 40-3.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Puede un solo técnico en terreno transportar y operar el elevador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. El equipo exige estrictamente una cuadrilla de dos personas. Mientras que los módulos de 45 kg y 40 kg facilitan el transporte, un operario debe maniobrar la palanca hidráulica mientras el otro guía la placa de brida."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué dimensiones de pernos de anclaje de cimentación admite el equipo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La placa base universal admite círculos de pernos P.C.D. de 180 mm a 260 mm, con hardware suministrado para pernos M16 a M22. Los pernos M24 se admiten previa revisión técnica de planos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se asegura la estabilidad vertical de un poste de 12 m frente a ráfagas de viento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Posee una capacidad nominal probada de 300 kg, altura máxima de 12 m y patas niveladoras multipunto que absorben esfuerzos de vuelco conforme a la norma EN 40-3."
      }
    }
  ]
}
</script>
`
  },

  fr: {
    langName: 'French',
    title: (topicWords) => `Élévateur Hydraulique Portable pour Candélabres : Architecture Mécanique, Compatibilité des Brides et Guide de Sélection Chantier`,
    metaDesc: (topicWords) => `Guide technique et d'ingénierie pour l'élévateur hydraulique portable pour candélabres. Charge certifiée 300 kg, ensemble bimodulaire de 85 kg, brides P.C.D. 180-260 mm et SOP à deux personnes sans grue.`,
    generate: (topicWords, topicSlug) => `# Élévateur Hydraulique Portable pour Candélabres : Architecture Mécanique, Compatibilité des Brides et Guide de Sélection Chantier

Dans le domaine de l'éclairage public municipal et des infrastructures solaires autonomes hors réseau, l'érection des candélabres et les opérations de levage constituent des goulots d'étranglement majeurs en matière de sécurité et de coûts de chantier. L'installation traditionnelle de mâts d'éclairage standard de 6 m à 12 m repose systématiquement sur des camions-grues télescopiques de 16 tonnes ou des nacelles pour hisser les fûts et positionner les brides d'assise. Cependant, dans les rues piétonnes étroites, les allées de campus, les terre-pleins centraux végétalisés et les centrales photovoltaïques sur sol non stabilisé, les grues mobiles lourdes se heurtent à de sévères contraintes d'encombrement, à l'absence de zone portante pour leurs stabilisateurs et à de longs délais d'autorisation municipale de voirie.

L'[élévateur hydraulique portable pour candélabres](/products/light-pole-jack/) représente la nouvelle génération d'équipements de levage fluidiques légers in situ. Grâce à son architecture scindée en deux modules et à son principe d'auto-ancrage sur les tiges de fondation, une équipe standard de deux techniciens (two-person crew) peut effectuer le verrouillage au sol, l'alignement des goujons de bride et l'érection verticale parfaite, éliminant totalement la dépendance aux camions-grues lourds.

> ### 📌 Points Clés pour les Ingénieurs et Acheteurs de Projets
> - **Logistique Sans Grue (Zero-Crane Logistics) :** Élimine l'acheminement coûteux de camions-grues de 16 tonnes et les arrêtés de circulation municipaux pour les candélabres de 6 m à 12 m.
> - **Charge Nominale Éprouvée en Usine :** Capacité nominale de levage vertical certifiée à 300 kg sur banc d'essai d'épreuve et contrôle d'étanchéité 24 heures (F002, F020).
> - **Transport Modulaire par Deux Personnes :** Ensemble scindé en deux modules de 85 kg au total (unité de levage 45 kg + coffret électrique 24V de 40 kg), facilement manuportable par deux opérateurs en pick-up standard (F001, F008).
> - **Compatibilité Universelle des Brides :** Platine d'assise renforcée à lumières radiales pour cercles de perçage (P.C.D.) de 180 mm à 260 mm recevant des tiges M16 à M24 (F015, F016).

---

## 1. Architecture Mécanique et Ingénierie Modulaire à Deux Unités

Le principe fondamental de l'élévateur portable pour mâts repose sur la substitution du grutage lourd aérien par une cinématique hydraulique modulaire déployée au sol. L'ensemble du système repose sur une architecture scindée en deux unités pour un poids de transport strictement vérifié de **85 kg** :
1. **Unité de Levage Hydraulique (Hydraulic Lifter Rig) :** Dimensions hors-tout 610 × 220 × 220 mm, pour un poids propre de **45 kg**. Elle intègre un mât télescopique en alliage d'aluminium structural haute résistance et un vérin vertical de course utile 800 mm, complété par des goupilles mécaniques de sécurité anti-chute pour prévenir tout affaissement intempestif en cas de dépressurisation.
2. **Armoire Électrique de Commande 24V DC :** Dimensions hors-tout 500 × 300 × 250 mm, pour un poids propre de **40 kg**. Elle abrite un pack de batteries haute densité rechargeable **24V DC**, un groupe motopompe miniature et un distributeur proportionnel double sens.
3. **Dimensions du Colis d'Expédition :** Emballage maritime 650 × 350 × 500 mm en caisse bois industrielle cerclée d'acier répondant à la norme phytosanitaire ISPM-15.

Chaque module pesant 45 kg ou moins, le matériel est en parfaite conformité avec les directives internationales de santé et sécurité au travail relatives à la manutention manuelle à deux personnes. Deux techniciens peuvent décharger les colis de la benne d'un pick-up standard et les acheminer à pied vers des allées piétonnes ou des zones paysagères inaccessibles aux engins lourds.

Selon les données d'essais constructeur, le déploiement vertical hydraulique complet s'effectue en environ 20 secondes, avec une autonomie supérieure à 50 cycles de levage complets par charge, pour une durée de vie mécanique dépassant 3 000 cycles d'exploitation (-20°C à +50°C).

💡 [Réduisez Vos Frais de Chantier : Calculez Vos Économies grâce au Simulateur ROI Grue](/tools/roi-calculator/)

---

## 2. Vérification Structurale et Sécurité Sous Lignes Électriques

Sur les chantiers d'infrastructure routière, la conformité aux normes industrielles internationales régit les coefficients de sécurité opérationnels. Le contact accidentel avec les lignes électriques aériennes constitue le risque le plus mortel lors du levage de candélabres.

Dans les opérations classiques par camion-grue, la réglementation **OSHA 1926 Subpart CC (29 CFR 1926.1408)** impose une zone tampon de sécurité absolue de 10 à 20 pieds (3.05 m à 6.1 m) par rapport aux conducteurs électriques sous tension. En milieu urbain dense, cette contrainte réglementaire exige fréquemment des coupures de réseau prolongées ou interrompt les chantiers. L'élévateur portable opère directement à l'aplomb du massif béton, hissant le candélabre du plan horizontal à la verticale stricte sans dépasser l'enveloppe supérieure des câbles. Cette géométrie respecte rigoureusement la norme **IEEE 516** relative aux distances de sécurité d'intervention sous tension.

En matière de vérification mécanique, la capacité de charge verticale admissible est strictement fixée à **300 kg**, autorisant le levage de candélabres d'éclairage public jusqu'à une hauteur maximale de **12 m** (mâts de 6 m, 8 m, 10 m et 12 m). Chaque machine fait l'objet d'un contrôle qualité usine à 100 % comprenant une épreuve de maintien en pression hydraulique pendant 24 heures et un banc d'essai sous pleine charge nominale (F020).

Conformément à la norme européenne de conception des candélabres **EN 40-3** concernant les moments de renversement, l'élévateur est doté de stabilisateurs réglables multipoints et de niveaux à bulle de haute précision. Les ingénieurs travaux peuvent consulter le guide comparatif [alternative à la grue en espace restreint](/compare/pole-jack-vs-crane/) pour étudier les calculs d'implantation.

---

## 3. Platine d'Assise Universelle et Compatibilité des Brides (P.C.D. 180 mm à 260 mm)

L'une des difficultés majeures rencontrées par les installateurs d'éclairage réside dans l'hétérogénéité des gabarits de perçage des brides d'assise. L'élévateur intègre une platine universelle forgée usinée avec des lumières radiales étendues, garantissant une large tolérance géométrique :
- **Diamètre du Cercle de Perçage (P.C.D.) :** La platine reçoit des gabarits de goujons d'ancrage compris entre **180 mm et 260 mm**. Qu'il s'agisse d'un massif carré à 4 tiges ou d'une cage circulaire multi-tiges, l'auto-ancrage est immédiat et sécurisé.
- **Plage de Tiges d'Ancrage :** Compatible avec les tiges de fondation structurales de **M16, M18, M20, M22 à M24**.
- **Fourniture Matérielle Standard :** L'équipement est livré avec 4 ensembles de rondelles renforcées et écrous de serrage pour diamètres M16, M18, M20 et M22. Les ancrages M24 sont géométriquement acceptés par les lumières mais nécessitent un contrôle préalable des plans de réservation.

Dans les projets de génie civil autoroutier, les massifs de fondation mettent en œuvre les normes d'ancrage structural **ASTM F1554** (Grade 36, 55 ou 105) ou **ASTM A325**. Lors de la phase initiale de basculement, la platine transmet les charges de réaction en compression sur le massif béton tout en sollicitant en traction les tiges arrière, évitant tout épaufrure du béton. Les équipes techniques peuvent consulter le [guide de compatibilité des brides de fixation](/guides/pole-jack-compatibility/) pour vérifier leurs côtes.

📐 [Vérifiez Vos Gabarits de Fixation : Demandez l'Audit Gratuit de Plans Sous 24h](/quote/)

---

## 4. Procédure Opérationnelle Standard (SOP) pour Équipe de Deux Personnes

Afin de garantir une exécution rigoureuse sur site, les chantiers appliquent une procédure standardisée en trois étapes imposant strictement une équipe de deux opérateurs :

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ Phase 1: Inspection Massif & Distances Électriques     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Auto-Ancrage Platine & Verrouillage Axe       │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: Câblage Sol, Levage Électro-Hydraulique 24V   │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Phase 1 : Examen du Massif et Contrôle des Distances Électriques**
   - Vérifier la résistance du béton et le séchage prescrit ; nettoyer les filetages des tiges M16 à M24 de tout résidu de mortier.
   - Orienter les axes photométriques des lanternes selon la géométrie de voirie selon **ANSI/IES RP-8-18**.
   - Inspecter le volume vertical pour vérifier le respect strict des marges de sécurité sous conducteurs aériens.

2. **Phase 2 : Positionnement et Auto-Ancrage de la Platine**
   - Deux techniciens glissent la platine de l'élévateur de 45 kg sur les tiges en attente et serrent les écrous de maintien.
   - Raccorder le coffret de commande 24V de 40 kg à l'aide des coupleurs rapides hydrauliques ; ajuster les vérins de stabilisation jusqu'au centrage parfait du niveau à bulle.
   - Aligner l'étrier de pivot du candélabre avec le chariot de levage et insérer la goupille de sécurité en alliage haute résistance.

3. **Phase 3 : Pré-Câblage au Sol et Levage Régulé 24V**
   - Monter les luminaires, passer les câbles et régler les angles d'inclinaison à hauteur d'homme, supprimant les risques de chute d'échelle.
   - L'opérateur 1 actionne le levier de commande du groupe 24V pour dresser le mât de manière fluide et cadencée.
   - L'opérateur 2 surveille la cinématique de montée et l'alignement sur les tiges sous un angle de sécurité de 45 degrés.
   - Une fois la verticalité stricte (90°) atteinte, le clapet de sécurité hydraulique et la butée mécanique immobilisent la colonne pendant le serrage au couple des écrous d'assise.

📄 [Télécharger les Spécifications et le Manuel d'Exploitation Candélabres 12m (PDF)](/resources/)

---

## 5. Limites Techniques et Idées Reçues en Chantier

En matière d'approvisionnement B2B et d'ordonnancement de projets, les décideurs techniques doivent distinguer les seuils d'ingénierie vérifiés des idées reçues courantes :

| Idée Reçue Courante en Industrie | Réalité Technique Vérifiée | Risque Lié au Non-Respect |
|---|---|---|
| **Idée Reçue 1 : Un équipement léger permet une opération solitaire** | Bien que les modules de 45 kg et 40 kg facilitent la manutention, la sécurité **impose impérativement deux techniciens**. L'un pilote les commandes hydrauliques, l'autre contrôle l'alignement. | Travailler seul crée des angles morts, fausse les filetages et expose à des instabilités structurales lors du basculement. |
| **Idée Reçue 2 : L'élévateur compact remplace les grues de fort tonnage** | La machine est strictement calibrée pour **300 kg de charge admissible** et **12 m de hauteur maximale de candélabre**. Conçue pour les mâts municipaux et solaires. | Tenter d'ériger des tours d'éclairage de 15 m à 35 m équipées de herses lourdes conduit à une rupture mécanique. Les grues restent indispensables. |
| **Idée Reçue 3 : Le temps de retour sur investissement est fixe et garanti** | L'élévateur élimine les factures de location de grue, mais le ROI réel fluctue selon la densité des mâts par kilomètre, les tarifs locaux d'engins et le coût de main-d'œuvre. | Supposer un amortissement figé fausse les devis. Les entrepreneurs doivent évaluer chaque chantier avec la calculatrice ROI dédiée. |

---

## 6. Foire Aux Questions (FAQ)

### Q1 : Un technicien isolé peut-il transporter et exploiter seul l'élévateur ?
Non. Bien que la répartition en deux colis de 45 kg et 40 kg autorise un chargement aisé en benne de pick-up, le montage sur site exige impérativement une équipe de deux personnes (two-worker operation mandatory). Un opérateur gère la vanne hydraulique 24V pendant que le second guide l'alignement de la platine et assure le serrage des goujons.

### Q2 : Quels gabarits de tiges d'ancrage sont pris en charge d'origine ?
La platine universelle à lumières oblongues s'adapte aux diamètres de perçage (P.C.D.) de 180 mm à 260 mm. L'équipement est fourni avec la visserie de serrage renforcée pour tiges M16, M18, M20 et M22. Les goujons M24 sont compatibles avec les lumières mais requièrent un contrôle préalable des plans de réservation.

### Q3 : Comment la stabilité d'un candélabre de 12 m est-elle garantie face aux rafales de vent ?
L'élévateur est homologué pour une hauteur maximale de mât de 12 m et une charge d'épreuve de 300 kg. Il dispose de béquilles de stabilisation réglables multipoints avec niveaux de précision créant une assise rigide, neutralisant les moments de renversement dus au vent selon la norme EN 40-3.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Un technicien isolé peut-il transporter et exploiter seul l'élévateur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Le matériel exige rigoureusement deux opérateurs. Tandis que les modules de 45 kg et 40 kg permettent un transport aisé, un technicien doit commander le groupe hydraulique tandis que l'autre guide le positionnement des brides."
      }
    },
    {
      "@type": "Question",
      "name": "Quels gabarits de tiges d'ancrage sont pris en charge d'origine ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La platine universelle accueille les cercles de perçage P.C.D. de 180 mm à 260 mm, avec visserie fournie pour goujons M16 à M22. Les tiges M24 sont admises sous réserve de confirmation des plans techniques."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la stabilité d'un candélabre de 12 m est-elle garantie face aux rafales de vent ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il bénéficie d'une capacité éprouvée à 300 kg, d'une limite de mât de 12 m et de stabilisateurs multipoints qui absorbent les moments de renversement conformément à la norme EN 40-3."
      }
    }
  ]
}
</script>
`
  },

  pt: {
    langName: 'Portuguese',
    title: (topicWords) => `Elevador Hidráulico Portátil para Postes: Arquitetura Mecânica, Compatibilidade de Flanges e Guia de Seleção em Obra`,
    metaDesc: (topicWords) => `Análise de engenharia e guia de seleção para elevador hidráulico de postes. Carga nominal de 300kg, estrutura bipartida de 85kg, flanges P.C.D. 180-260mm e SOP de dois operadores sem munck.`,
    generate: (topicWords, topicSlug) => `# Elevador Hidráulico Portátil para Postes: Arquitetura Mecânica, Compatibilidade de Flanges e Guia de Seleção em Obra

Na infraestrutura de iluminação pública municipal e projetos solares fotovoltaicos isolados da rede, a instalação e o içamento de postes representam gargalos críticos de segurança operacional e despesas orçamentárias. A instalação convencional de postes de iluminação de 6m a 12m depende historicamente de caminhões munck ou guindastes móveis de 16 toneladas para içar os fustes e posicionar as flanges de base. Contudo, em calçadões de pedestres, vias estreitas de condomínios, canteiros centrais arborizados e usinas solares com solo não pavimentado, os guindastes pesados enfrentam limitações físicas severas, falta de espaço para abertura de sapatas estabilizadoras e demoradas autorizações municipais de interdição de tráfego.

O [elevador hidráulico portátil para postes](/products/light-pole-jack/) representa a nova geração de equipamentos leves de içamento de potência fluida in situ. Projetado com uma arquitetura dividida em dois módulos e mecânica de autoancoragem nas hastes de fundação, uma equipe padrão de dois operadores (two-person crew) consegue realizar o travamento na base, o alinhamento dos chumbadores e a ereção vertical aprumada diretamente no nível do solo—eliminando por completo a dependência de guindastes pesados.

> ### 📌 Pontos-Chave para Engenheiros e Compradores de Projetos
> - **Logística Sem Guindastes (Zero-Crane Logistics):** Elimina o frete e a contratação de caminhões munck de 16 toneladas e pedidos de corte de trânsito para postes de 6m a 12m.
> - **Carga Nominal Testada em Fábrica:** Capacidade nominal de elevação vertical estritamente aferida em 300kg em bancada de testes verticais e prova de pressão de 24 horas (F002, F020).
> - **Transporte Modular por Dois Operadores:** Conjunto bimodular de 85kg no total (unidade de elevação de 45kg + gabinete elétrico 24V de 40kg), facilmente transportado em caminhonetes por dois técnicos (F001, F008).
> - **Compatibilidade Universal de Flanges:** Placa base com rasgos radiais para diâmetros de furação (P.C.D.) de 180mm a 260mm acomodando chumbadores M16 a M24 (F015, F016).

---

## 1. Arquitetura Mecânica e Engenharia Bimodular Dividida

A premissa fundamental do elevador portátil de postes baseia-se na substituição do içamento aéreo pesado por cinemática hidráulica modular operada no nível do solo. Todo o sistema é construído sobre uma arquitetura de dois módulos com peso total de transporte rigorosamente verificado de **85kg**:
1. **Unidade Hidráulica de Elevação (Hydraulic Lifter Rig):** Dimensões externas de 610 × 220 × 220 mm, com peso próprio de **45kg**. Integra mastro telescópico em liga de alumínio estrutural de alta resistência e cilindro hidráulico vertical de curso útil de 800mm, protegido por pinos mecânicos de segurança contra quedas para evitar despressurização acidental.
2. **Gabinete Elétrico de Controle 24V DC:** Dimensões externas de 500 × 300 × 250 mm, com peso próprio de **40kg**. Abriga conjunto de baterias recarregáveis de alta densidade **24V DC**, unidade motobomba em miniatura e bloco de válvulas direcionais proporcionais de dupla ação.
3. **Dimensões do Embalamento de Exportação:** Volume externo de 650 × 350 × 500 mm em caixa de madeira industrial com cintas de aço atendendo à norma fitossanitária internacional ISPM-15.

Como nenhum dos módulos excede 45kg, o equipamento atende integralmente às normas internacionais de saúde e segurança ocupacional relativas à movimentação manual de cargas por duas pessoas. Dois trabalhadores podem descarregar os módulos da caçamba de uma caminhonete utilitária e transportá-los a pé por calçadões ou parques gramados onde máquinas pesadas não têm acesso.

De acordo com as especificações de ensaios do fabricante, o curso hidráulico vertical completo leva cerca de 20 segundos, oferecendo autonomia superior a 50 operações completas de içamento por recarga, com vida útil mecânica projetada para mais de 3.000 ciclos operacionais (-20°C a +50°C).

💡 [Cansado de Custos Excessivos de Munck? Calcule Suas Economias na Calculadora de ROI de Guindaste](/tools/roi-calculator/)

---

## 2. Verificação Estrutural e Segurança Sob Redes Aéreas

Na engenharia de infraestrutura viária, as margens de segurança dependem da estrita observância de códigos industriais internacionais. O contato elétrico aéreo está entre os riscos mais fatais em obras de iluminação pública.

Em operações com caminhão guindauto tradicional, a norma **OSHA 1926 Subpart CC (29 CFR 1926.1408)** exige a manutenção de uma faixa de segurança mínima de 10 a 20 pés (3.05m a 6.1m) em relação a cabos elétricos de alta tensão energizados. Em vias urbanas densas, essa exigência frequentemente obriga desligamentos prolongados da rede ou paralisa cronogramas. O elevador portátil opera diretamente na base da fundação, erguendo o poste suavemente da horizontal até 90° de verticalidade sem invadir o espaço aéreo dos condutores de utilidade pública. Essa cinemática atende integralmente à norma **IEEE 516** de distâncias seguras de trabalho sob tensão.

Quanto à verificação estrutural, a capacidade de carga vertical de trabalho é estritamente fixada em **300kg**, suportando postes de iluminação viária de até **12m** de altura máxima (abrangendo perfis padrão de 6m, 8m, 10m e 12m). Cada máquina passa por 100% de controle de qualidade antes da expedição, incluindo ensaio de estanqueidade e sustentação de pressão hidráulica por 24 horas em bancada com carga total aferida (F020).

Conforme a norma europeia de postes de iluminação **EN 40-3** relativa a momentos fletores de tombamento, o elevador é equipado com sapatas estabilizadoras reguláveis multiponto e níveis de bolha de precisão. Gerentes de obra podem conferir o guia comparativo [alternativa ao guindaste para espaços confinados](/compare/pole-jack-vs-crane/) para dados técnicos de implantação.

---

## 3. Placa Base Universal e Compatibilidade de Flanges (P.C.D. 180mm a 260mm)

Um dos maiores desafios enfrentados por instaladores de iluminação reside na ampla variação dos padrões de furação das flanges de postes. O elevador possui placa base reforçada usinada com rasgos radiais de curso estendido, oferecendo ampla tolerância geométrica:
- **Diâmetro do Círculo de Furação (P.C.D.):** A base universal aceita círculos de chumbadores de **180mm a 260mm**. Seja a fundação com gaiola quadrada de 4 parafusos ou padrão circular multifuros, o travamento mecânico é imediato e estável.
- **Diâmetro dos Chumbadores de Ancoragem:** Compatível com chumbadores estruturais de **M16, M18, M20, M22 até M24**.
- **Fornecimento Padrão de Fixadores:** O equipamento acompanha quatro conjuntos de arruelas de pressão reforçadas e porcas de fixação para parafusos M16, M18, M20 e M22. Chumbadores M24 são perfeitamente aceitos pelo rasgo, demandando apenas validação prévia de passo de rosca e altura de projeção da barra roscada.

Em obras rodoviárias de engenharia civil, as armaduras de ancoragem empregam as normas **ASTM F1554** (Graus 36, 55 ou 105) ou parafusos estruturais **ASTM A325**. Durante a fase inicial de basculamento de 0° a 30°, a placa base transfere o esforço de reação em compressão direta sobre a sapata de concreto enquanto traciona os chumbadores posteriores, evitando quebras marginais no bloco de fundação. Os técnicos podem consultar o [guia de compatibilidade de flanges](/guides/pole-jack-compatibility/) para averiguar seus gabaritos.

📐 [Valide o Círculo de Furação da Sua Flange: Solicite Auditoria Gratuita de Desenhos em 24h](/quote/)

---

## 4. Procedimento Operacional Padrão (SOP) para Dois Trabalhadores

Para garantir uma execução disciplinada no canteiro, as equipes adotam um procedimento operacional padrão (SOP) em três etapas que exige estritamente dois técnicos:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ Fase 1: Vistoria de Fundação & Desobstrução Elétrica   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Fase 2: Autoancoragem da Placa & Pino Trava da Coluna  │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Fase 3: Conexão em Solo, Elevação 24V & Torque Final   │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Fase 1: Vistoria da Fundação e Verificação de Espaços Aéreos**
   - Confirmar cura e resistência do bloco de concreto; limpar roscas dos chumbadores M16 a M24 contra detritos ou argamassa.
   - Ajustar o alinhamento fotométrico das luminárias conforme diretrizes **ANSI/IES RP-8-18**.
   - Inspecionar a coluna de ar vertical para garantir afastamento de segurança em relação a condutores energizados.

2. **Fase 2: Acoplamento e Autoancoragem da Placa Base**
   - Dois técnicos posicionam a placa base do elevador de 45kg sobre os chumbadores expostos e rosqueiam as porcas de travamento.
   - Conectar o gabinete de comando 24V de 40kg pelos engates rápidos; nivelar as sapatas reguláveis até centralizar o nível de bolha.
   - Alinhar a articulação de base do poste deitado ao suporte móvel do elevador e transpassar o pino trava em liga tratada.

3. **Fase 3: Pré-Fiação no Solo e Elevação Hidráulica 24V**
   - Instalar luminárias, passar cabeamentos e ajustar os ângulos ópticos no solo, extinguindo riscos de queda de escadas.
   - O Operador 1 manobra o comando hidráulico 24V para elevar suavemente o mastro.
   - O Operador 2 acompanha a subida do poste e o alinhamento com a fundação a partir de um ângulo seguro de 45 graus.
   - Ao atingir a vertical absoluta (90°), a válvula hidráulica de retenção e o batente de fim de curso imobilizam o poste enquanto se aplica o aperto final nas porcas.

📄 [Baixar Especificações Técnicas e Manual de Operação para Postes de 12m (PDF)](/resources/)

---

## 5. Limites de Engenharia e Mitos Comuns em Canteiro de Obras

Em compras técnicas B2B e planejamento de projetos, engenheiros e compradores devem distinguir parâmetros atestados de concepções errôneas da indústria:

| Mito Frequente no Setor | Fato Técnico Verificado | Risco do Descumprimento |
|---|---|---|
| **Mito 1: Equipamento leve autoriza operação individual** | Embora os módulos de 45kg e 40kg permitam transporte fácil, normas de segurança **exigem estritamente dois operadores**. Um controla o circuito hidráulico e outro guia a ancoragem. | Trabalho individual gera pontos cegos, espanamento de roscas e perigo de desestabilização durante o içamento. |
| **Mito 2: O elevador substitui qualquer tipo de guindaste** | A capacidade é restrita a **300kg de carga máxima** e **12m de altura máxima de poste**. Projetado para postes viários convencionais e solares. | Tentar içar superpostes de 15m a 35m com coroas móveis pesadas gera colapso mecânico catastrófico. Guindastes pesados continuam mandatórios. |
| **Mito 3: O prazo de retorno do investimento é fixo e garantido** | O equipamento corta o aluguel de munck, mas o ROI real depende da densidade de postes por quilômetro, tarifas regionais de máquinas e custo da mão de obra. | Estimar retornos fixos distorce orçamentos. Empreiteiros devem modelar custos na calculadora de ROI dedicada. |

---

## 6. Perguntas Frequentes (FAQ)

### P1: Um técnico sozinho pode transportar e operar o elevador no canteiro?
Não. Embora a embalagem dividida em módulos de 45kg e 40kg permita carga e descarga prática na caçamba de caminhonetes, a instalação em campo requer rigorosamente dois operadores (two-worker operation mandatory). Um técnico opera a válvula hidráulica 24V enquanto o segundo direciona o encaixe das flanges e aperta as porcas de fixação.

### P2: Quais padrões de chumbadores de fundação são compatíveis de fábrica?
A placa base com rasgos radiais acomoda diâmetros de furação (P.C.D.) de 180mm a 260mm. O equipamento acompanha arruelas temperadas e porcas de fixação para parafusos M16, M18, M20 e M22. Chumbadores M24 são aceitos nos rasgos mas requerem verificação prévia de desenho de projeto.

### P3: Como é assegurada a estabilidade vertical ao erguer um poste de 12m com vento?
O equipamento é dimensionado para postes de até 12m de altura e prova de carga de 300kg. Conta com sapatas estabilizadoras reguláveis multiponto com níveis de bolha de precisão, formando uma base rígida que dissipa momentos de tombamento por vento conforme a norma EN 40-3.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Um técnico sozinho pode transportar e operar o elevador no canteiro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O equipamento exige estritamente dois técnicos. Embora os módulos de 45kg e 40kg facilitem o transporte, um operador deve comandar o sistema hidráulico enquanto o outro orienta o alinhamento da placa base."
      }
    },
    {
      "@type": "Question",
      "name": "Quais padrões de chumbadores de fundação são compatíveis de fábrica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A placa base universal atende círculos de furação P.C.D. de 180mm a 260mm, com fixadores para M16 a M22 inclusos. Chumbadores M24 são suportados sob análise prévia de projeto."
      }
    },
    {
      "@type": "Question",
      "name": "Como é assegurada a estabilidade vertical ao erguer um poste de 12m com vento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Possui capacidade comprovada de 300kg, limite de altura de poste de 12m e sapatas estabilizadoras multiponto que amortecem momentos fletores de vento segundo a norma EN 40-3."
      }
    }
  ]
}
</script>
`
  },

  vi: {
    langName: 'Vietnamese',
    title: (topicWords) => `Máy Dựng Cột Đèn Thủy Lực Di Động: Kiến Trúc Cơ Khí, Độ Tương Thích Mặt Bích và Cẩm Nang Lựa Chọn Thiết Bị`,
    metaDesc: (topicWords) => `Phân tích kỹ thuật và cẩm nang lựa chọn máy dựng cột đèn thủy lực di động. Tải trọng định mức 300kg, cụm máy tách rời 85kg, tương thích mặt bích P.C.D. 180-260mm và quy trình 2 công nhân không dùng cẩu.`,
    generate: (topicWords, topicSlug) => `# Máy Dựng Cột Đèn Thủy Lực Di Động: Kiến Trúc Cơ Khí, Độ Tương Thích Mặt Bích và Cẩm Nang Lựa Chọn Thiết Bị

Trong các dự án chiếu sáng đô thị và hạ tầng đèn đường năng lượng mặt trời độc lập, công tác dựng cột và cẩu lắp trên cao luôn là khâu then chốt ảnh hưởng đến an toàn lao động và chi phí thi công. Phương pháp truyền thống khi dựng các cột đèn chiếu sáng tiêu chuẩn từ 6m đến 12m thường phụ thuộc vào xe cẩu tự hành hoặc xe cẩu thùng 16 tấn để nâng thân cột và căn chỉnh mặt bích móng. Tuy nhiên, tại các tuyến phố đi bộ chật hẹp, đường nội bộ khuôn viên trường học, dải phân cách cây xanh và các dự án điện mặt trời trên nền đất yếu chưa lu lèn, xe cẩu hạng nặng thường đối mặt với trở ngại lớn về không gian, thiếu mặt bằng chống chân cẩu và thủ tục xin cấp phép cấm đường đô thị kéo dài.

[Máy dựng cột đèn thủy lực di động](/products/light-pole-jack/) là thiết bị nâng hạ thủy lực tại chỗ thế hệ mới với trọng lượng nhẹ. Được thiết kế theo cấu trúc tách rời hai mô-đun cùng cơ chế tự neo giữ vào bu lông móng bê tông, một đội thi công chuẩn gồm hai kỹ thuật viên (two-person crew) có thể hoàn tất việc khóa ngàm, căn chỉnh bu lông mặt bích và nâng thẳng đứng ngay tại mặt đất—hoàn toàn không cần đến xe cẩu hạng nặng.

> ### 📌 Điểm Cốt Lõi Dành Cho Kỹ Sư Công Trình & Bộ Phận Mua Hàng
> - **Triệt Tiêu Chi Phí Xe Cẩu (Zero-Crane Logistics):** Xóa bỏ chi phí điều động xe cẩu 16 tấn đắt đỏ và thủ tục xin cấp phép cấm đường phức tạp cho các cột đèn đô thị từ 6m đến 12m.
> - **Tải Trọng Được Kiểm Định Tại Nhà Máy:** Tải trọng nâng phương đứng danh định được hiệu chuẩn và thử nghiệm nghiêm ngặt đạt 300kg trên bàn thử nghiệm chuyên dụng cùng bài kiểm tra giữ áp 24 giờ (F002, F020).
> - **Vận Chuyển Mô-đun Hai Người:** Kết cấu tách rời 2 mô-đun với tổng trọng lượng 85kg (cụm máy nâng 45kg + tủ điều khiển 24V 40kg), hai nhân công dễ dàng chở bằng xe bán tải và bê vác thủ công (F001, F008).
> - **Tương Thích Mặt Bích Toàn Năng:** Tấm đế chịu lực thiết kế rãnh xẻ hướng tâm tương thích đường kính vòng bu lông (P.C.D.) từ 180mm đến 260mm, vừa vặn với bu lông móng M16 đến M24 (F015, F016).

---

## 1. Kiến Trúc Cơ Khí và Giải Pháp Mô-đun Tách Rời

Triết lý cốt lõi của máy dựng cột đèn di động là thay thế máy móc cẩu kéo trên cao cồng kềnh bằng hệ thống thủy lực mô-đun hóa thao tác an toàn trên mặt đất. Toàn bộ thiết bị được phân chia thành cấu trúc hai mô-đun độc lập với tổng trọng lượng vận chuyển được xác nhận chính xác là **85kg**:
1. **Cụm Trụ Nâng Thủy Lực (Hydraulic Lifter Rig):** Kích thước tổng thể 610 × 220 × 220 mm, trọng lượng tịnh **45kg**. Kết cấu gồm trụ nâng dạng ống lồng bằng hợp kim kết cấu độ cứng cao, xi lanh thủy lực hành trình đứng hiệu dụng 800mm, tích hợp chốt khóa cơ học chống rơi thứ cấp nhằm triệt tiêu hoàn toàn rủi ro sụt áp đột ngột.
2. **Tủ Điều Khiển Nguồn Điện 24V DC:** Kích thước tổng thể 500 × 300 × 250 mm, trọng lượng tịnh **40kg**. Tủ tích hợp bộ pin sạc dung lượng cao **24V DC**, cụm động cơ - bơm thủy lực mini và cụm van điều hướng tỉ lệ hai chiều.
3. **Quy Cách Đóng Gói Vận Chuyển:** Kích thước kiện ngoài 650 × 350 × 500 mm, đóng trong thùng gỗ công nghiệp nẹp đai thép đạt tiêu chuẩn kiểm dịch thực vật quốc tế ISPM-15.

Do mỗi kiện hàng đều dưới 45kg, thiết bị đáp ứng trọn vẹn quy chuẩn an toàn vệ sinh lao động quốc tế về giới hạn bê vác của hai người. Hai công nhân có thể dễ dàng bốc dỡ thiết bị từ thùng xe bán tải và chuyển bộ vào các phố đi bộ hẹp hoặc công viên cây xanh nơi xe cơ giới không thể tiếp cận.

Theo số liệu thử nghiệm tiêu chuẩn của nhà sản xuất, chu kỳ nâng thủy lực toàn hành trình diễn ra trong khoảng 20 giây, cung cấp hơn 50 lần dựng cột cho mỗi lần sạc đầy pin, với tuổi thọ thiết kế cơ khí vượt trên 3.000 chu kỳ vận hành (-20°C đến +50°C).

💡 [Cắt Giảm Chi Phí Thuê Xe Cẩu: Tính Toán Tiết Kiệm Dự Án Bằng Công Cụ Tính ROI Xe Cẩu](/tools/roi-calculator/)

---

## 2. Kiểm Tra Kết Cấu & An Toàn Khoảng Cách Lưới Điện Cao Thế

Trong thi công lắp đặt hạ tầng giao thông, an toàn kỹ thuật bắt buộc phải tuân thủ nghiêm ngặt các quy chuẩn công nghiệp quốc tế. Phóng điện lưới điện trên cao là một trong những hiểm họa chết người hàng đầu trong công tác dựng cột chiếu sáng.

Khi sử dụng xe cẩu thùng thông thường, tiêu chuẩn **OSHA 1926 Subpart CC (29 CFR 1926.1408)** bắt buộc phải duy trì vùng đệm cách ly an toàn tối thiểu từ 10 đến 20 feet (3.05m đến 6.1m) khi cần cẩu kim loại xoay gần đường dây điện trần đang mang điện. Trong ngõ phố đô thị chật chội, quy định an toàn này thường buộc phải cắt điện trên diện rộng hoặc đình chỉ tiến độ dự án. Máy dựng cột di động hoạt động ngay tại vị trí móng, nâng thân cột chuyển động êm thuận từ phương ngang lên thẳng đứng 90° hoàn toàn nằm dưới hành lang an toàn điện. Hình học vận hành này tuân thủ trọn vẹn quy chuẩn khoảng cách an toàn thi công điện **IEEE 516**, triệt tiêu nguy cơ điện giật.

Về kiểm định kết cấu chịu tải, tải trọng nâng đứng danh định được giới hạn nghiêm ngặt ở mức **300kg**, đáp ứng dựng các cột đèn chiếu sáng đô thị và đường giao thông có chiều cao tối đa lên tới **12m** (bao gồm các quy cách tiêu chuẩn 6m, 8m, 10m và 12m). Mỗi thiết bị đều trải qua quy trình kiểm soát chất lượng 100% trước khi xuất xưởng, bao gồm thử nghiệm duy trì áp suất thủy lực 24 giờ và thử nghiệm tải trọng tối đa trên bàn thử chuyên dụng (F020).

Theo tiêu chuẩn châu Âu về cột đèn chiếu sáng **EN 40-3** liên quan đến mô-men lật do gió bão, máy được trang bị các chân phụ cân chỉnh đa điểm cùng thước nivo bọt nước độ chính xác cao. Chỉ huy công trường có thể tham khảo bảng [so sánh giải pháp thay thế xe cẩu trong không gian hẹp](/compare/pole-jack-vs-crane/) để nắm rõ phương án bố trí mặt bằng.

---

## 3. Tấm Đế Đa Năng & Độ Tương Thích Vòng Bu Lông Mặt Bích (P.C.D. 180mm - 260mm)

Khó khăn phổ biến mà các nhà thầu chiếu sáng thường gặp là sự sai lệch lớn về kích thước tâm bu lông mặt bích giữa các thiết kế cột. Máy dựng cột sở hữu tấm đế chịu lực chuyên dụng gia công các rãnh xẻ hướng tâm kéo dài, mang lại dung sai hình học rất rộng:
- **Đường Kính Vòng Bu Lông (P.C.D.):** Tấm đế tương thích với các bước bu lông móng từ **180mm đến 260mm**. Dù cụm bu lông móng bố trí theo hình vuông 4 bu lông hay hình tròn nhiều bu lông, máy đều khóa chặt an toàn.
- **Quy Cách Bu Lông Neo Móng:** Tương thích với các kích thước bu lông móng kết cấu từ **M16, M18, M20, M22 đến M24**.
- **Bộ Phụ Kiện Tiêu Chuẩn Kèm Theo:** Máy đi kèm 4 bộ long đen chịu lực và đai ốc hãm dành cho các cỡ bu lông M16, M18, M20 và M22. Bu lông cỡ M24 hoàn toàn vừa vặn trong rãnh trượt nhưng cần gửi bản vẽ móng để kiểm tra trước bước ren và chiều dài đoạn nhô khỏi bê tông.

Trong xây dựng đường bộ hiện đại, hệ lồng bu lông móng thường áp dụng tiêu chuẩn vật liệu **ASTM F1554** (Mác 36, 55 hoặc 105) hoặc bu lông kết cấu **ASTM A325**. Trong giai đoạn đầu khi góc nghiêng nâng từ 0° đến 30°, phản lực nâng tác động tạo lực nén đều xuống bề mặt khối móng bê tông đồng thời kéo giữ chặt các bu lông neo phía sau, ngăn chặn nứt vỡ mép bệ bê tông. Kỹ sư có thể đối chiếu [hướng dẫn tương thích bước bu lông mặt bích](/guides/pole-jack-compatibility/) để xác thực thông số.

📐 [Kiểm Tra Bước Bu Lông Mặt Bích: Yêu Cầu Duyệt Bản Vẽ Kỹ Thuật Miễn Phí Trong 24 Giờ](/quote/)

---

## 4. Quy Trình Vận Hành Tiêu Chuẩn (SOP) Dành Cho Hai Kỹ Thuật Viên

Nhằm đảm bảo tính chuẩn xác và kỷ luật trên công trường, các dự án áp dụng quy trình vận hành tiêu chuẩn (SOP) ba giai đoạn bắt buộc nghiêm ngặt hai nhân công:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ Giai đoạn 1: Khảo Sát Móng & Khoảng Cách An Toàn Điện  │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Giai đoạn 2: Tự Neo Tấm Đế & Cố Định Chốt An Toàn     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Giai đoạn 3: Đấu Dây Mặt Đất, Nâng 24V & Xiết Chặt     │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Giai đoạn 1: Khảo Sát Móng Bê Tông và Kiểm Tra Khoảng Cách An Toàn**
   - Xác nhận bê tông móng đã đạt cường độ thiết kế; vệ sinh sạch sẽ ren bu lông móng M16 đến M24 khỏi vữa thừa.
   - Căn chỉnh hướng chiếu sáng quang học theo tiêu chuẩn chiếu sáng đường giao thông **ANSI/IES RP-8-18**.
   - Kiểm tra khoảng không gian phía trên để đảm bảo tuyệt đối khoảng cách an toàn với đường dây điện.

2. **Giai đoạn 2: Định Vị và Tự Neo Tấm Đế Máy Nâng**
   - Hai kỹ thuật viên đưa tấm đế cụm nâng 45kg lồng qua các bu lông móng nhô lên và vặn đai ốc định vị.
   - Kết nối tủ điều khiển 24V nặng 40kg bằng khớp nối thủy lực nhanh; điều chỉnh chân phụ cân bằng cho đến khi bọt thủy nivo nằm chính giữa.
   - Đưa giá đỡ xoay của thân cột đèn đang nằm ngang vào ngàm trượt của máy nâng và xỏ chốt an toàn hợp kim chịu lực.

3. **Giai đoạn 3: Đấu Nối Điện Tại Mặt Đất và Nâng Cột Thủy Lực 24V**
   - Lắp ráp cần đèn, luồn dây cáp nguồn và cân chỉnh góc chiếu sáng ngay trên mặt đất, loại bỏ hoàn toàn nguy hiểm leo trèo thang giáo.
   - Thao tác viên 1 gạt van điều khiển thủy lực 24V để nâng dần thân cột lên phương thẳng đứng một cách êm ái.
   - Thao tác viên 2 đứng quan sát quá trình dựng cột và căn chỉnh mặt bích ở góc an toàn 45 độ.
   - Khi cột đạt góc thẳng đứng tuyệt đối (90°), van đối trọng thủy lực và ngàm chặn cơ học sẽ giữ chặt cột để kỹ thuật viên siết đai ốc móng đúng lực mô-men xoắn.

📄 [Tải Xuống Bảng Thông Số Kỹ Thuật & Cẩm Nang Vận Hành Cột Đèn 12m (PDF)](/resources/)

---

## 5. Giới Hạn Kỹ Thuật và Những Hiểu Lầm Phổ Biến Tại Công Trường

Trong công tác mua sắm thiết bị B2B và lập kế hoạch dự án, các cấp quản lý kỹ thuật cần phân biệt rõ ranh giới kỹ thuật đã được kiểm định với những hiểu lầm phổ biến:

| Hiểu Lầm Thường Gặp Trong Ngành | Thực Tế Kỹ Thuật Đã Được Kiểm Định | Rủi Ro Khi Làm Trái Quy Chuẩn |
|---|---|---|
| **Hiểu lầm 1: Thiết bị gọn nhẹ cho phép một công nhân thao tác** | Dù cụm máy 45kg và 40kg giúp mang vác dễ dàng, an toàn thi công **bắt buộc nghiêm ngặt hai người**. Một người điều khiển van thủy lực, một người căn chỉnh bu lông. | Làm việc đơn lẻ tạo điểm mù quan sát, làm toét ren bu lông và nguy cơ mất cân bằng cột khi nâng. |
| **Hiểu lầm 2: Máy nâng nhỏ gọn thay thế được mọi loại xe cẩu lớn** | Năng lực máy được thiết kế nghiêm ngặt ở mức **tải trọng tối đa 300kg** và **chiều cao cột tối đa 12m**. Phù hợp với cột đèn đường và cột solar. | Cố tình dựng các trụ tháp cao từ 15m đến 35m với giàn đèn nặng sẽ gây gãy đổ cơ học nguy hiểm. Xe cẩu lớn vẫn là giải pháp bắt buộc. |
| **Hiểu lầm 3: Thời gian hoàn vốn là cố định và bảo đảm cho mọi dự án** | Thiết bị giúp cắt giảm chi phí thuê xe cẩu, nhưng ROI thực tế phụ thuộc vào mật độ cột trên tuyến đường, giá cước xe cẩu địa phương và chi phí nhân công. | Mặc định thời gian hoàn vốn cố định gây sai lệch dự toán. Nhà thầu cần tính toán cụ thể bằng công cụ ROI. |

---

## 6. Các Câu Hỏi Thường Gặp (FAQ)

### C1: Một kỹ thuật viên đơn lẻ có thể tự vận chuyển và thi công máy nâng được không?
Không. Mặc dù việc tách rời thành 2 kiện 45kg và 40kg giúp hai nhân công dễ dàng bốc dỡ lên xe bán tải, quá trình thi công tại hiện trường bắt buộc phải có hai người (two-worker operation mandatory). Một kỹ thuật viên vận hành van thủy lực 24V trong khi người còn lại dẫn hướng mặt bích và siết đai ốc móng.

### C2: Tấm đế máy nâng tương thích với những kích thước bu lông móng nào?
Tấm đế rãnh trượt hướng tâm tương thích với đường kính vòng bu lông (P.C.D.) từ 180mm đến 260mm. Phụ kiện tiêu chuẩn đi kèm máy gồm có vòng đệm cường lực và đai ốc khóa cho các cỡ bu lông M16, M18, M20 và M22. Bu lông cỡ M24 vừa vặn trong rãnh trượt nhưng cần gửi bản vẽ móng để kiểm tra trước.

### C3: Làm thế nào đảm bảo độ ổn định khi dựng cột 12m trong điều kiện có gió?
Máy nâng được thiết kế chịu tải đứng 300kg cho cột cao tới 12m. Thiết bị tích hợp các chân chống cân chỉnh đa điểm cùng thước nivo bọt nước chính xác cao, tạo thế đứng vững chãi kháng lại mô-men lật do gió theo tiêu chuẩn EN 40-3.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Một kỹ thuật viên đơn lẻ có thể tự vận chuyển và thi công máy nâng được không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Không. Thiết bị bắt buộc nghiêm ngặt đội ngũ hai người. Một người điều khiển van thủy lực trong khi người thứ hai dẫn hướng mặt bích và đảm bảo an toàn."
      }
    },
    {
      "@type": "Question",
      "name": "Tấm đế máy nâng tương thích với những kích thước bu lông móng nào?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tấm đế vạn năng đáp ứng vòng bu lông P.C.D. từ 180mm đến 260mm, đi kèm phụ kiện siết cho bu lông M16 đến M22. Bu lông M24 được hỗ trợ sau khi kiểm duyệt bản vẽ."
      }
    },
    {
      "@type": "Question",
      "name": "Làm thế nào đảm bảo độ ổn định khi dựng cột 12m trong điều kiện có gió?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Thiết bị có tải trọng kiểm định 300kg, chiều cao tối đa 12m cùng các chân chống phụ đa điểm giúp hấp thụ mô-men lật do gió theo tiêu chuẩn EN 40-3."
      }
    }
  ]
}
</script>
`
  },

  th: {
    langName: 'Thai',
    title: (topicWords) => `เครื่องยกเสาไฟไฮดรอลิกพกพา: โครงสร้างทางวิศวกรรม ความเข้ากันได้ของหน้าแปลน และคู่มือการเลือกใช้งานหน้างาน`,
    metaDesc: (topicWords) => `คู่มือวิศวกรรมและการเลือกใช้งานเครื่องยกเสาไฟไฮดรอลิกพกพา พิกัดยก 300 กก. โครงสร้างแยกส่วน 85 กก. หน้าแปลน P.C.D. 180-260 มม. และขั้นตอนปฏิบัติงานสองคนโดยไม่ใช้รถเครน`,
    generate: (topicWords, topicSlug) => `# เครื่องยกเสาไฟไฮดรอลิกพกพา: โครงสร้างทางวิศวกรรม ความเข้ากันได้ของหน้าแปลน และคู่มือการเลือกใช้งานหน้างาน

ในโครงการไฟฟ้าแสงสว่างบนทางหลวงเทศบาลและโครงสร้างพื้นฐานเสาไฟถนนพลังงานแสงอาทิตย์แบบออฟกริด การติดตั้งเสาไฟและการยกย้ายชิ้นส่วนโครงสร้างมักเป็นอุปสรรคสำคัญด้านความปลอดภัยของคนงานและค่าใช้จ่ายในงบประมาณโครงการ การติดตั้งเสาไฟถนนขนาดมาตรฐานความสูง 6 ถึง 12 ม. แบบดั้งเดิมมักต้องพึ่งพารถเครนหรือรถเฮี๊ยบขนาด 16 ตันในการยกเสาและจัดตำแหน่งหน้าแปลนฐานราก อย่างไรก็ดี บนทางเท้าคนเดินที่คับแคบ ถนนภายในวิทยาเขต เกาะกลางถนนที่มีต้นไม้หนาแน่น และโครงการโซลาร์เซลล์บนพื้นดินลูกรังที่ยังไม่ได้ลาดยาง รถเครนขนาดใหญ่มักเผชิญกับข้อจำกัดด้านพื้นที่เข้าถึง การไม่มีระนาบดินแข็งสำหรับกางขาค้ำยัน และระยะเวลาการขออนุญาตปิดกั้นการจราจรที่ยาวนาน

[เครื่องยกเสาไฟไฮดรอลิกพกพา](/products/light-pole-jack/) คือเครื่องจักรกลกำลังของไหลน้ำหนักเบารุ่นใหม่สำหรับการติดตั้ง ณ ตำแหน่งฐานรากโดยตรง ด้วยการออกแบบโครงสร้างแบบสองโมดูลแยกชิ้นและการทำงานแบบยึดตัวเองเข้ากับสลักเกลียวแองเคอร์คอนกรีต ทีมช่างเพียงสองคน (two-person crew) สามารถล็อกแผ่นฐาน ปรับระนาบหน้าแปลน และยกรวมถึงตั้งเสาตรงในแนวตั้งฉากได้อย่างราบรื่นจากระดับพื้นดิน—โดยไม่ต้องใช้รถเครนขนาดใหญ่แม้แต่น้อย

> ### 📌 ประเด็นสำคัญสำหรับวิศวกรโครงการและฝ่ายจัดซื้อ
> - **การขนส่งติดตั้งโดยไม่ใช้รถเครน (Zero-Crane Logistics):** ขจัดค่าใช้จ่ายการจ้างรถเครน 16 ตันและขั้นตอนการขออนุญาตปิดกั้นถนนสำหรับเสาไฟมาตรฐาน 6 ถึง 12 ม.
> - **พิกัดยกที่ผ่านการรับรองจากโรงงาน:** พิกัดรับน้ำหนักในแนวตั้งกำหนดไว้อย่างเข้มงวดที่ 300 กก. (300kg) โดยผ่านการทดสอบบนแท่นยกแนวตั้งและทดสอบแรงดันคงที่ 24 ชั่วโมง (F002, F020)
> - **โครงสร้างแยกส่วนขนย้ายด้วยช่างสองคน:** น้ำหนักรวมทั้งระบบ 85 กก. (85kg) แยกเป็นสองโมดูล (ชุดยก 45 กก. + ตู้ควบคุมไฟฟ้า 24V ขนาด 40 กก.) ขนส่งด้วยรถกระบะทั่วไปและยกย้ายด้วยช่าง 2 คนได้อย่างปลอดภัย (F001, F008)
> - **หน้าแปลนอเนกประสงค์เข้ากันได้กับทุกแบบ:** ฐานรองรับงานหนักพร้อมร่องสล็อตแนวรัศมีรองรับระยะพิทช์วงโบลต์ (P.C.D.) 180 มม. ถึง 260 มม. (180mm to 260mm) และสลักเกลียว M16 ถึง M24 (F015, F016)

---

## 1. สถาปัตยกรรมทางกลศาสตร์และโครงสร้างแยกส่วนสองโมดูล

ปรัชญาการออกแบบหลักของเครื่องยกเสาไฟพกพาคือการเปลี่ยนจากการใช้เครื่องจักรยกขนาดใหญ่บนอากาศมาเป็นการใช้ระบบไฮดรอลิกแบบโมดูลาร์ที่ทำงานอย่างปลอดภัยบนพื้นดิน ทั้งระบบถูกสร้างขึ้นบนโครงสร้างสองโมดูลแยกชิ้นโดยมีน้ำหนักรวมขนย้ายที่ได้รับการตรวจสอบอย่างเข้มงวดคือ **85 กก. (85kg)**:
1. **ชุดโครงสร้างเสายกไฮดรอลิก (Hydraulic Lifter Rig):** มิติภายนอก 610 × 220 × 220 มม. น้ำหนักตัวเครื่อง **45 กก. (45kg)** ประกอบด้วยเสาแกนเลื่อนอัลลอยด์ความแข็งแรงสูง กระบอกสูบไฮดรอลิกระยะชักในแนวตั้ง 800 มม. พร้อมสลักล็อกนิรภัยเชิงกลสองชั้นเพื่อป้องกันแรงดันตกหล่นโดยไม่คาดคิด
2. **ตู้ควบคุมระบบไฟฟ้า 24V DC:** มิติภายนอก 500 × 300 × 250 มม. น้ำหนักตัวเครื่อง **40 กก. (40kg)** ภายในบรรจุชุดแบตเตอรี่ชาร์จพลังงานสูง **24V DC** ชุดปั๊มมอเตอร์ไฮดรอลิกขนาดกะทัดรัด และชุดวาล์วควบคุมการไหลแบบสัดส่วนสองทิศทาง
3. **มิติบรรจุภัณฑ์สำหรับการขนส่ง:** บรรจุในลังไม้มาตรฐานอุตสาหกรรมขนาด 650 × 350 × 500 มม. รัดแถบเหล็กหนาแน่นและได้มาตรฐานสุขอนามัยพืชสากล ISPM-15

เนื่องจากแต่ละโมดูลมีน้ำหนักไม่เกิน 45 กก. จึงสอดคล้องตามมาตรฐานความปลอดภัยและอาชีวอนามัยสากลด้านการยกย้ายสิ่งของด้วยแรงงานคนสองคน ทีมช่างสองคนสามารถยกโมดูลลงจากกระบะท้ายรถปิกอัพและเดินเท้าเข้าไปยังทางเดินสาธารณะแคบหรือสวนสาธารณะได้อย่างสะดวก

ตามข้อกำหนดการทดสอบของโรงงาน ระยะชักกระบอกสูบแนวตั้งใช้เวลาในการยกขึ้นเต็มช่วงประมาณ 20 วินาที รองรับการยกติดตั้งได้มากกว่า 50 ครั้งต่อการชาร์จแบตเตอรี่เต็มหนึ่งครั้ง และมีอายุการใช้งานเชิงกลมากกว่า 3,000 รอบการทำงาน (-20°C ถึง +50°C)

💡 [ลดค่าใช้จ่ายการเช่ารถเครน: คำนวณความคุ้มค่าโครงการของคุณด้วยเครื่องคำนวณ ROI ของรถเครน](/tools/roi-calculator/)

---

## 2. การตรวจสอบความแข็งแรงโครงสร้างและความปลอดภัยจากสายไฟฟ้าแรงสูง

ในงานวิศวกรรมการก่อสร้างถนน ค่าเผื่อความปลอดภัยขึ้นอยู่กับการปฏิบัติตามมาตรฐานอุตสาหกรรมระหว่างประเทศอย่างเคร่งครัด การสัมผัสสายไฟฟ้าด้านบนนับเป็นอันตรายร้ายแรงที่สุดในการติดตั้งเสาไฟ

ในการปฏิบัติงานด้วยรถเครนแบบดั้งเดิม ข้อกำหนด **OSHA 1926 Subpart CC (29 CFR 1926.1408)** บังคับให้ต้องเว้นระยะห่างปลอดภัยอย่างน้อย 10 ถึง 20 ฟุต (3.05 ถึง 6.1 ม.) เมื่อบูมเครนโลหะทำงานใกล้กับสายไฟฟ้าแรงสูง ในพื้นที่ชุมชนเมืองที่คับแคบ ข้อกำหนดนี้มักทำให้ต้องตัดกระแสไฟฟ้าเป็นบริเวณกว้างหรือส่งผลให้งานล่าช้า เครื่องยกเสาไฟพกพาทำงานบนระดับฐานรากโดยตรง ดันเสาไฟขึ้นจากแนวราบสู่แนวตั้งฉาก 90° ภายใต้แนวสายไฟฟ้าอย่างปลอดภัย การทำงานในลักษณะนี้เป็นไปตามมาตรฐานการรักษาระยะห่างสายไฟฟ้าแรงสูง **IEEE 516** อย่างสมบูรณ์ ขจัดความเสี่ยงต่อการเกิดไฟฟ้าดูด

ในแง่ของความแข็งแรงทางโครงสร้าง พิกัดน้ำหนักยกแนวตั้งถูกจำกัดไว้อย่างเคร่งครัดที่ **300 กก. (300kg)** รองรับเสาไฟถนนความสูงสูงสุดถึง **12 ม. (12m)** (ครอบคลุมเสามาตรฐาน 6 ม., 8 ม., 10 ม. และ 12 ม.) เครื่องทุกเครื่องผ่านการทดสอบคุณภาพ 100% ก่อนส่งมอบ รวมถึงการทดสอบรักษาแรงดันไฮดรอลิกนาน 24 ชั่วโมง และการทดสอบรับน้ำหนักเต็มพิกัดบนแท่นยกแนวตั้ง (F020)

ตามมาตรฐานยุโรปด้านโครงสร้างเสาไฟ **EN 40-3** ในส่วนของโมเมนต์การล้ม เครื่องยกติดตั้งขาค้ำยันแบบปรับระดับได้หลายจุดพร้อมระดับลูกน้ำความแม่นยำสูง ช่วยให้ปรับระนาบได้อย่างรวดเร็วบนไหล่ทางที่ลาดเอียงหรือพื้นดินนิ่ม วิศวกรโครงการสามารถดู [การเปรียบเทียบการใช้เครื่องยกแทนรถเครนในพื้นที่แคบ](/compare/pole-jack-vs-crane/) เพื่อศึกษาระยะติดตั้งเพิ่มเติม

---

## 3. แผ่นฐานอเนกประสงค์และความเข้ากันได้ของหน้าแปลน (P.C.D. 180 มม. ถึง 260 มม.)

ความท้าทายทั่วไปที่ผู้รับเหมาติดตั้งระบบไฟถนนต้องเผชิญคือขนาดระยะรูโบลต์หน้าแปลนฐานเสาที่มีความหลากหลาย เครื่องยกเสาไฟได้รับการออกแบบด้วยแผ่นฐานหนาพิเศษพร้อมร่องสล็อตแนวรัศมีที่ให้ระยะเผื่อทางเรขาคณิตกว้างขวาง:
- **เส้นผ่านศูนย์กลางวงโบลต์ (P.C.D.):** แผ่นฐานรองรับระยะกึ่งกลางโบลต์ตั้งแต่ **180 มม. ถึง 260 มม. (180mm to 260mm)** ไม่ว่าฐานรากจะเป็นแบบสี่เหลี่ยม 4 โบลต์หรือแบบวงกลมหลายโบลต์ ก็สามารถล็อกเข้าตำแหน่งได้อย่างมั่นคง
- **ขนาดสลักเกลียวแองเคอร์ที่รองรับ:** รองรับสลักเกลียวแองเคอร์โครงสร้างขนาด **M16, M18, M20, M22 จนถึง M24**
- **อุปกรณ์มาตรฐานที่จัดส่งให้:** ตัวเครื่องมาพร้อมชุดแหวนรองหนาพิเศษและน็อตล็อก 4 ชุดสำหรับขนาด M16, M18, M20 และ M22 สำหรับโบลต์ขนาด M24 ร่องสล็อตสามารถรองรับได้ในเชิงกล แต่แนะนำให้ส่งแบบก่อสร้างเพื่อตรวจสอบความสูงของเกลียวก่อนเริ่มงาน

ในงานวิศวกรรมทางหลวง ฐานรากมักใช้เหล็กแองเคอร์ตามมาตรฐาน **ASTM F1554** (เกรด 36, 55 หรือ 105) หรือสลักเกลียวโครงสร้าง **ASTM A325** ในช่วงแรกของการยกที่มุม 0° ถึง 30° แรงสะท้อนจะกระจายแรงกดลงบนฐานรากคอนกรีตโดยตรง พร้อมดึงรั้งโบลต์ด้านหลังไว้ ช่วยป้องกันขอบคอนกรีตแตกหักเสียหาย ผู้รับเหมาสามารถตรวจสอบ [คู่มือความเข้ากันได้ของหน้าแปลนฐานเสา](/guides/pole-jack-compatibility/) เพื่อยืนยันขนาดที่ถูกต้อง

📐 [ตรวจสอบวงโบลต์หน้าแปลนของคุณ: ขอรับบริการตรวจสอบแบบทางวิศวกรรมฟรีภายใน 24 ชม.](/quote/)

---

## 4. ขั้นตอนการปฏิบัติงานมาตรฐาน (SOP) สำหรับช่างสองคน

เพื่อให้มั่นใจในระเบียบวินัยและความปลอดภัยในการปฏิบัติงาน โครงการต้องปฏิบัติตามขั้นตอนการปฏิบัติงานมาตรฐาน (SOP) สามขั้นตอนที่กำหนดให้มีทีมช่างสองคนอย่างเคร่งครัด:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ ขั้นตอนที่ 1: ตรวจสอบฐานราก & ระยะห่างสายไฟฟ้า         │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ ขั้นตอนที่ 2: ล็อกแผ่นฐาน & สวมสลักแกนหมุน             │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ ขั้นตอนที่ 3: เดินสายระดับพื้น, ยกไฮดรอลิก 24V & ล็อกน็อต│
└────────────────────────────────────────────────────────┘
\`\`\`

1. **ขั้นตอนที่ 1: ตรวจสอบฐานคอนกรีตและตรวจสอบระยะห่างจากสายไฟฟ้า**
   - ตรวจสอบว่าคอนกรีตบ่มได้กำลังตามแบบ ทำความสะอาดเกลียวโบลต์ M16 ถึง M24 จากเศษปูนซีเมนต์
   - จัดตำแหน่งแกนโคมไฟตามแนวถนนให้ตรงตามเกณฑ์ **ANSI/IES RP-8-18**
   - ตรวจสอบพื้นที่แนวดิ่งด้านบนเพื่อให้แน่ใจว่ามีระยะปลอดภัยจากสายไฟ

2. **ขั้นตอนที่ 2: การจัดวางตำแหน่งและยึดล็อกแผ่นฐานเครื่องยก**
   - ทีมช่างสองคนยกแผ่นฐานของชุดยก 45 กก. สวมลงบนสลักเกลียวแองเคอร์และขันน็อตยึด
   - เชื่อมต่อตู้ควบคุม 24V ขนาด 40 กก. ด้วยข้อต่อสวมเร็วไฮดรอลิก ปรับขาค้ำยันจนกระทั่งระดับลูกน้ำอยู่ตรงกลาง
   - จัดขาหมุนของเสาไฟในท่านอนให้ตรงกับชุดเลื่อนของเครื่องยก แล้วสอดสลักล็อกนิรภัยอัลลอยด์ความแข็งแรงสูง

3. **ขั้นตอนที่ 3: การเดินสายไฟฟ้าที่ระดับพื้นดินและการยกขึ้นด้วยไฮดรอลิก 24V**
   - ประกอบโคมไฟ ร้อยสายไฟ และปรับมุมส่องสว่างที่ระดับพื้นดิน ขจัดความเสี่ยงจากการปีนบันไดทำงานบนที่สูง
   - ช่างคนที่ 1 โยกคันโยกควบคุมไฮดรอลิก 24V เพื่อยกเสาไฟขึ้นอย่างนุ่มนวลและสม่ำเสมอ
   - ช่างคนที่ 2 ยืนสังเกตการณ์การยกเสาและการจัดตำแหน่งรูโบลต์ที่มุมปลอดภัย 45 องศา
   - เมื่อเสาตั้งตรงในแนวดิ่ง 90 องศา วาล์วปรับสมดุลไฮดรอลิกและกลไกล็อกจะยึดเสาไว้อย่างมั่นคง ขณะที่ทีมช่างขันน็อตฐานรากด้วยประแจปอนด์ตามสเปก

📄 [ดาวน์โหลดข้อมูลจำเพาะและคู่มือการปฏิบัติงานเสาไฟ 12 ม. (PDF)](/resources/)

---

## 5. ขอบเขตทางวิศวกรรมและความเข้าใจผิดที่พบบ่อยในหน้างาน

ในการจัดซื้ออุปกรณ์ระดับ B2B และการวางแผนโครงการ ผู้มีอำนาจตัดสินใจต้องแยกแยะระหว่างเกณฑ์ทางวิศวกรรมที่ผ่านการรับรองกับความเข้าใจผิดทั่วไปในอุตสาหกรรม:

| ความเข้าใจผิดที่พบบ่อย | ความจริงทางวิศวกรรมที่ผ่านการรับรอง | ความเสี่ยงจากการไม่ปฏิบัติตาม |
|---|---|---|
| **ความเข้าใจผิด 1: อุปกรณ์ขนาดกะทัดรัดทำงานได้ด้วยคนเพียงคนเดียว** | แม้ว่าชิ้นส่วน 45 กก. และ 40 กก. จะช่วยให้ยกย้ายสะดวก แต่ระเบียบความปลอดภัย **บังคับให้ใช้ช่างสองคนอย่างเข้มงวด** คนหนึ่งควบคุมระบบไฮดรอลิก อีกคนช่วยจัดแนวโบลต์ | การทำงานคนเดียวสร้างจุดบอด ทำเกลียวหวาน และเสี่ยงต่อการเสียสมดุลขณะยกเสา |
| **ความเข้าใจผิด 2: เครื่องยกขนาดกะทัดรัดสามารถทดแทนรถเครนได้ทุกประเภท** | พิกัดของเครื่องถูกกำหนดไว้อย่างเข้มงวดที่ **น้ำหนักยกสูงสุด 300 กก.** และ **ความสูงเสาสูงสุด 12 ม.** ออกแบบมาสำหรับเสาไฟถนนและเสาไฟโซลาร์เซลล์ | การนำไปใช้ยกเสาไฟสูง 15 ถึง 35 ม. ที่มีชุดโคมไฟขนาดใหญ่จะทำให้โครงสร้างพังทลาย รถเครนขนาดใหญ่ยังคงจำเป็นสำหรับงานดังกล่าว |
| **ความเข้าใจผิด 3: ระยะเวลาคืนทุนคงที่และเหมือนกันในทุกโครงการ** | เครื่องยกช่วยขจัดค่าเช่ารถเครน แต่ผลตอบแทนจากการลงทุน (ROI) ที่แท้จริงขึ้นอยู่กับจำนวนเสาต่อกิโลเมตร อัตราค่าเช่ารถเครนในท้องถิ่น และค่าแรงงาน | การสมมติระยะเวลาคืนทุนที่แน่นอนทำให้งบประมาณคลาดเคลื่อน ผู้รับเหมาควรคำนวณตามโมเดลเฉพาะของโครงการ |

---

## 6. คำถามที่พบบ่อย (FAQ)

### คำถาม 1: ช่างเทคนิคเพียงคนเดียวสามารถขนส่งและใช้งานเครื่องยกได้หรือไม่?
ไม่ได้ แม้ว่าการแยกบรรจุภัณฑ์เป็นสองส่วนขนาด 45 กก. และ 40 กก. จะช่วยให้ช่างสองคนยกขึ้นลงท้ายรถกระบะได้ง่าย แต่การติดตั้งหน้างานต้องใช้ช่างสองคนอย่างเคร่งครัด (two-worker operation mandatory) ช่างคนหนึ่งควบคุมวาล์วไฮดรอลิก 24V ในขณะที่ช่างอีกคนช่วยจัดแนวหน้าแปลนและขันล็อกน็อต

### คำถาม 2: แผ่นฐานรองรับระยะรูโบลต์ฐานรากขนาดใดบ้าง?
แผ่นฐานแบบร่องสล็อตอเนกประสงค์รองรับระยะพิทช์กึ่งกลางรูโบลต์ (P.C.D.) ตั้งแต่ 180 มม. ถึง 260 มม. มีอุปกรณ์แหวนรองหนาพิเศษและน็อตล็อกสำหรับขนาด M16, M18, M20 และ M22 มาให้พร้อมใช้งาน โบลต์ขนาด M24 ร่องสล็อตสามารถรองรับได้แต่ต้องตรวจสอบแบบก่อสร้างก่อนเริ่มงาน

### คำถาม 3: มีการรับประกันความมั่นคงอย่างไรเมื่อยกเสาสูง 12 ม. ท่ามกลางกระแสลม?
เครื่องยกผ่านการรับรองสำหรับการยกเสาสูงสุด 12 ม. และพิกัดน้ำหนักทดสอบ 300 กก. มีขาค้ำยันปรับระดับได้หลายจุดพร้อมระดับลูกน้ำความแม่นยำสูง เพื่อสร้างฐานรองรับที่มั่นคง ต้านทานโมเมนต์การล้มจากลมตามมาตรฐาน EN 40-3

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ช่างเทคนิคเพียงคนเดียวสามารถขนส่งและใช้งานเครื่องยกได้หรือไม่?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ไม่ได้ อุปกรณ์กำหนดให้ใช้ทีมงานสองคนอย่างเคร่งครัด แม้ว่าชิ้นส่วน 45 กก. และ 40 กก. จะช่วยให้ขนย้ายสะดวก แต่ต้องมีช่างคนหนึ่งควบคุมวาล์วไฮดรอลิกและอีกคนช่วยจัดตำแหน่งหน้าแปลน"
      }
    },
    {
      "@type": "Question",
      "name": "แผ่นฐานรองรับระยะรูโบลต์ฐานรากขนาดใดบ้าง?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "แผ่นฐานอเนกประสงค์รองรับวงโบลต์ P.C.D. 180 มม. ถึง 260 มม. มีอุปกรณ์ติดตั้งสำหรับ M16 ถึง M22 ครบชุด โบลต์ M24 รองรับได้โดยต้องตรวจสอบแบบก่อน"
      }
    },
    {
      "@type": "Question",
      "name": "มีการรับประกันความมั่นคงอย่างไรเมื่อยกเสาสูง 12 ม. ท่ามกลางกระแสลม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ผ่านการทดสอบพิกัด 300 กก. รองรับเสาสูงสุด 12 ม. พร้อมขาค้ำยันปรับระดับรอบทิศทางที่ช่วยซับแรงลมกระโชกตามมาตรฐาน EN 40-3"
      }
    }
  ]
}
</script>
`
  },

  id: {
    langName: 'Indonesian',
    title: (topicWords) => `Alat Pendiri Tiang Lampu Portabel Hidrolik: Arsitektur Teknik, Kompatibilitas Flensa, dan Panduan Pemilihan di Lapangan`,
    metaDesc: (topicWords) => `Panduan teknis dan analisis pemilihan alat pendiri tiang hidrolik portabel. Kapasitas nominal 300kg, transportasi modular 85kg, flensa P.C.D. 180-260mm, dan SOP dua teknisi tanpa mobil derek.`,
    generate: (topicWords, topicSlug) => `# Alat Pendiri Tiang Lampu Portabel Hidrolik: Arsitektur Teknik, Kompatibilitas Flensa, dan Panduan Pemilihan di Lapangan

Dalam infrastruktur penerangan jalan umum (PJU) kota dan penerangan solar cell pedesaan, pendirian tiang serta manuver pengangkatan udara merupakan titik kritis keselamatan kerja dan pembengkakan anggaran proyek. Secara tradisional, mendirikan tiang lampu jalan setinggi 6m hingga 12m bergantung pada truk derek (boom truck) atau mobile crane berkapasitas 16 ton untuk mengangkat tiang dan menyelaraskan pelat dasar flensa. Namun, pada koridor perkotaan yang sempit, jalur pejalan kaki, area universitas, dan proyek panel surya di medan tanpa akses jalan aspal, crane besar menghadapi kendala ruang fisik, ketiadaan landasan outrigger yang memadai, serta izin penutupan jalan umum yang memakan waktu berhari-hari.

Penggunaan [portable hydraulic pole lifter](/products/light-pole-jack/) menghadirkan solusi mesin hidrolik modular di lokasi kerja. Dirancang dengan arsitektur dua modul terpisah dan sistem penguncian mandiri pada angkur fondasi beton, regu kerja dua orang dapat menyelesaikan penguncian dasar, penyelarasan baut flensa, dan pendirian tegak lurus langsung dari permukaan tanah tanpa ketergantungan pada alat berat crane.

> ### 📌 Poin Kunci untuk Manajer & Teknisi Proyek (Key Takeaways)
> - **Nol Ketergantungan Mobil Derek:** Mengeliminasi mobilisasi mobile crane 16 ton serta izin pemblokiran lalu lintas untuk tiang penerangan standar 6m hingga 12m.
> - **Kapasitas Beban Teruji Pabrik:** Kapasitas angkat vertikal terukur strictly 300kg yang dikalibrasi pada rig uji vertikal pabrik dengan pengujian retensi tekanan hidrolik 24 jam (F002, F020).
> - **Transportasi Modular Dua Orang:** Paket terpisah berbobot total 85kg (unit pengangkat 45kg + kabinet kontrol daya 24V seberat 40kg) yang mudah diangkut mobil pickup standar oleh dua teknisi (F001, F008).
> - **Kesesuaian Fondasi Universal:** Pelat dasar berlubang radial mendukung diameter lingkaran baut (P.C.D.) 180mm hingga 260mm untuk angkur M16 hingga M24 (F015, F016).

---

## 1. Arsitektur Mekis dan Rekayasa Dua Modul Terpisah

Prinsip dasar alat pendiri tiang portabel berfokus pada penggantian alat angkat udara berukuran besar dengan daya hidrolik modular di permukaan tanah. Seluruh sistem dirancang dalam dua modul mandiri dengan total bobot transportasi terverifikasi seberat **85kg**:
1. **Unit Mekanikal Pengangkat Hidrolik:** Dimensi terpasang 610 × 220 × 220 mm dengan berat strictly **45kg**. Memiliki tiang teleskopik baja struktural berkekuatan tinggi dan silinder hidrolik dengan langkah efektif 800mm, dilengkapi pin pengunci pengaman mekanis sekunder guna mencegah tiang turun saat terjadi penurunan tekanan fluida.
2. **Kabinet Kontrol Daya Listrik 24V:** Dimensi 500 × 300 × 250 mm dengan berat strictly **40kg**. Mengintegrasikan baterai isi ulang **24V DC** densitas energi tinggi, unit pompa motor listrik, dan katup proporsional dengan kontrol presisi.
3. **Dimensi Kemasan Ekspor:** Dimensi peti luar 650 × 350 × 500 mm menggunakan peti kayu industri berpita baja yang memenuhi standar internasional perlakuan fitosanitari ISPM-15.

Karena tidak ada modul tunggal yang melebihi 45kg, peralatan ini memenuhi pedoman keselamatan penanganan beban manual internasional. Dua teknisi lapangan dapat menurunkan kedua unit dari bak mobil pickup dan membawanya melalui trotoar sempit maupun taman lanskap tanpa merusak permukaan rumput atau paving.

Berdasarkan parameter pengujian pabrik, siklus pendirian hidrolik berlangsung sekitar 20 detik, menghasilkan lebih dari 50 siklus pengangkatan per pengisian daya baterai penuh, dengan perkiraan usia desain melebihi 3.000 siklus operasi (-20°C hingga 50°C).

💡 [Menghitung Penghematan Anggaran Proyek PJU dengan Kalkulator ROI Derek](/tools/roi-calculator/)

---

## 2. Verifikasi Struktural dan Keselamatan Jarak Bebas Kabel Udara

Dalam pekerjaan instalasi dan rigging, margin keselamatan bergantung pada kepatuhan terhadap regulasi teknik sipil dan ketenagakerjaan. Kontak listrik dengan jaringan tegangan tinggi di udara merupakan salah satu risiko fatal terbesar dalam proyek penerangan kota.

Pada metode konvensional memakai mobil derek, regulasi **OSHA 1926 Subpart CC (29 CFR 1926.1408)** mewajibkan jarak aman bebas minimal antara 10 hingga 20 kaki (3.05m hingga 6.1m) dari konduktor listrik aktif saat boom baja diayunkan. Di lorong permukiman padat, aturan ini sering kali memaksa pemadaman listrik total seluruh area atau penundaan jadwal proyek. Alat pendiri portabel beroperasi tepat di atas fondasi beton dan menegakkan tiang dari sudut rebah horizontal ke vertikal sepenuhnya di bawah ketinggian kabel listrik. Geometri ini memenuhi ketentuan jarak kerja aman **IEEE 516** untuk lingkungan bertegangan, memitigasi bahaya sengatan listrik.

Mengenai verifikasi beban struktural, kapasitas angkat vertikal maksimum dirancang strictly **300kg**, melayani tiang jalan dan jalan tol hingga tinggi maksimum **12m** (mencakup tiang standar 6m, 8m, 10m, dan 12m). Setiap unit melewati inspeksi mutu komprehensif sebelum pengiriman, termasuk penahanan tekanan sirkuit hidrolik selama 24 jam serta verifikasi beban kerja pada rig uji vertikal (F020).

Berdasarkan standar tiang pencahayaan Eropa **EN 40-3** terkait momen gulingan akibat terpaan angin, alat ini dilengkapi penyangga perata (outrigger) multi-titik dan indikator waterpas mata sapi presisi tinggi. Kontraktor dapat membaca panduan komparatif [crane alternative for tight spaces](/compare/pole-jack-vs-crane/) untuk analisis radius kerja dan jarak aman di lapangan.

---

## 3. Kompatibilitas Flensa Universal dan Diameter Lingkaran Baut (P.C.D. 180mm hingga 260mm)

Tantangan utama dalam pemasangan tiang jalan perkotaan adalah variasi spesifikasi pelat flensa dasar dari berbagai pabrikan tiang. Alat pengangkat ini menggunakan pelat dasar universal tebal dengan alur radial yang memberikan toleransi geometri luas:
- **Pitch Circle Diameter (P.C.D.):** Pelat dasar universal dapat dikunci pada diameter lingkaran baut fondasi antara **180mm hingga 260mm**. Baik fondasi menggunakan konfigurasi 4 baut bujur sangkar maupun pola lingkaran simetris, unit dapat terikat kokoh.
- **Diameter Baut Angkur:** Mampu menampung baut angkur baja struktural ukuran **M16, M18, M20, M22, hingga M24**.
- **Perlengkapan Standar:** Paket mesin mencakup set ring penjepit baja tahan aus serta mur pengunci untuk angkur ukuran M16, M18, M20, dan M22. Angkur M24 dapat diakomodasi melalui dimensi alur radial, namun memerlukan verifikasi gambar teknik terkait panjang ulir dan proyeksi baut sebelum mobilisasi ke lokasi.

Dalam pekerjaan jalan raya modern, angkur fondasi beton umumnya merujuk pada standar baut struktural **ASTM F1554** (Grade 36, 55, atau 105) atau **ASTM A325**. Saat proses awal pengangkatan, alat menyalurkan gaya reaksi tekan langsung ke fondasi beton sekaligus mengunci angkur belakang dalam posisi tarik, mencegah keretakan pada tepi beton fondasi. Kontraktor dapat memeriksa panduan teknis [flange bolt circle compatibility](/guides/pole-jack-compatibility/) untuk memverifikasi kesesuaian gambar tapak fondasi.

📐 [Verifikasi Diameter Flensa Tiang Anda: Konsultasikan Gambar Fondasi 24 Jam](/quote/)

---

## 4. Standar Prosedur Operasional (SOP) Lapangan Dua Pekerja

Guna menjamin kedisiplinan dan keselamatan kerja di lapangan, pelaksanaan proyek wajib mengikuti tiga fase prosedur operasional standar (SOP) dengan regu kerja strictly dua orang:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ Fase 1: Inspeksi Fondasi & Pembersihan Jarak Udara     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Fase 2: Penguncian Pelat Dasar & Pin Poros Tiang       │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Fase 3: Pengkabelan Tanah, Angkat 24V & Penguncian Mur │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Fase 1: Pemeriksaan Kondisi Fondasi Beton dan Jarak Bebas Udara**
   - Pastikan mutu beton fondasi telah mencapai umur dan kekuatan rencana; bersihkan ulir baut angkur M16 hingga M24 dari sisa mortar semen.
   - Posisikan orientasi pencahayaan lampu jalan sesuai perhitungan fotometrik standar jalan raya **ANSI/IES RP-8-18**.
   - Periksa ruang vertikal di atas tiang untuk memastikan jarak aman dari kabel jaringan listrik terbuka.

2. **Fase 2: Pemasangan dan Penguncian Mandiri Pelat Dasar**
   - Dua teknisi mengangkat dan memasang pelat dasar unit pengangkat 45kg melewati baut angkur, lalu mengencangkan mur penahan.
   - Pasang kabinet daya 24V seberat 40kg menggunakan kopler hidrolik cepat; putar penyangga perata hingga gelembung waterpas berada tepat di tengah.
   - Posisikan braket engsel tiang lampu yang rebah pada dudukan carriage pengangkat, lalu masukkan pin pengaman baja paduan.

3. **Fase 3: Pengkabelan di Atas Tanah dan Pengangkatan Hidrolik 24V**
   - Rakit rumah lampu, tarik kabel instalasi, dan atur sudut kemiringan lampu langsung dari permukaan tanah tanpa menggunakan tangga tinggi.
   - Operator 1 mengoperasikan tuas hidrolik daya baterai 24V untuk menegakkan tiang secara bertahap dan halus.
   - Operator 2 memantau lintasan tiang serta posisi baut fondasi dari sudut aman 45 derajat di samping area kerja.
   - Setelah tiang tegak sempurna pada posisi 90°, katup penyeimbang hidrolik dan penahan mekanis mengunci tiang dengan stabil sementara teknisi mengencangkan mur pengikat fondasi dengan kunci torsi.

📄 [Unduh Spesifikasi Teknis Lengkap & Panduan Operasi Tiang 12m (PDF)](/resources/)

---

## 5. Batasan Teknis dan Miskonsepsi Umum di Lapangan

Dalam pengadaan peralatan B2B dan manajemen proyek, para pemangku kepentingan teknis harus membedakan fakta teknis teruji dari kekeliruan umum di industri:

| Miskonsepsi Umum di Industri | Fakta Rekayasa Terverifikasi | Risiko Pelanggaran Prosedur |
|---|---|---|
| **Miskonsepsi 1: Bobot alat yang ringkas membolehkan kerja mandiri 1 orang** | Meski modul 45kg dan 40kg mempermudah mobilisasi, standar keselamatan **wajib dikerjakan dua orang**. Satu operator mengatur hidrolik, satu memandu baut fondasi. | Bekerja sendirian menimbulkan titik buta penglihatan, kerusakan ulir baut, dan bahaya ketidakstabilan tiang saat diangkat. |
| **Miskonsepsi 2: Alat pendiri portabel dapat menggantikan semua crane besar** | Kapasitas mesin dirancang strictly untuk **beban maksimal 300kg** dan **tinggi tiang maksimal 12m**. Dirancang untuk tiang lampu jalan dan tiang panel surya. | Memaksakan alat untuk mengangkat tiang high-mast 15m hingga 35m dengan mahkota lampu berat akan memicu kegagalan mekanikal fatal. Truk derek besar tetap dibutuhkan. |
| **Miskonsepsi 3: Masa pengembalian modal (payback period) bersifat pasti dan seragam** | Alat ini memotong biaya sewa mobil derek, namun ROI proyek sangat bergantung pada kerapatan tiang per kilometer, tarif sewa derek lokal, dan upah tenaga kerja. | Menetapkan angka pengembalian modal yang kaku dapat menimbulkan kesalahan anggaran. Kontraktor disarankan menggunakan kalkulator ROI proyek khusus. |

---

## 6. Pertanyaan yang Sering Diajukan (FAQ)

### T1: Apakah teknisi lapangan dapat mengangkut dan mengoperasikan alat ini seorang diri?
Tidak. Meskipun pemisahan menjadi dua modul 45kg dan 40kg memudahkan bongkar muat dari bak mobil pickup, pekerjaan instalasi di lapangan strictly wajib dilakukan oleh dua orang (two-worker operation mandatory). Satu teknisi mengoperasikan tuas hidrolik 24V sementara teknisi kedua memandu penyelarasan flensa dan mengencangkan baut fondasi.

### T2: Konfigurasi baut fondasi apa saja yang didukung oleh pelat dasar mesin?
Pelat dasar dengan alur radial universal dapat disesuaikan pada diameter lingkaran baut (P.C.D.) antara 180mm hingga 260mm. Paket mesin sudah dilengkapi ring pelat dan mur pengunci untuk baut angkur M16, M18, M20, dan M22. Baut M24 dapat dipasang pada alur pelat namun memerlukan pengecekan gambar proyek terlebih dahulu.

### T3: Bagaimana stabilitas struktur terjamin saat mendirikan tiang 12m pada kondisi berangin?
Mesin ini dirancang untuk tinggi tiang maksimal 12m dengan beban uji vertikal 300kg. Dilengkapi kaki penyangga perata multi-titik dan waterpas presisi tinggi yang membentuk tumpuan kokoh guna menahan momen guling akibat tiupan angin sesuai standar EN 40-3.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah teknisi lapangan dapat mengangkut dan mengoperasikan alat ini seorang diri?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tidak. Pengoperasian alat wajib dilaksanakan oleh dua orang pekerja. Satu teknisi mengontrol unit hidrolik dan teknisi kedua memandu perakitan baut fondasi."
      }
    },
    {
      "@type": "Question",
      "name": "Konfigurasi baut fondasi apa saja yang didukung oleh pelat dasar mesin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pelat dasar universal mendukung diameter lingkaran baut P.C.D. 180mm hingga 260mm, lengkap dengan perlengkapan pengikat untuk angkur M16 hingga M22. Angkur M24 didukung setelah verifikasi gambar."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana stabilitas struktur terjamin saat mendirikan tiang 12m pada kondisi berangin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mesin memiliki kapasitas uji beban 300kg, batas tinggi tiang 12m, dan penyangga perata multi-titik yang meredam momen gulingan angin sesuai regulasi EN 40-3."
      }
    }
  ]
}
</script>
`
  },

  zh: {
    langName: 'Simplified Chinese',
    title: (topicWords) => `便携式路灯升杆机工程技术解析、法兰适配与选型指南`,
    metaDesc: (topicWords) => `便携式路灯升杆机工程技术解析与选型指南。涵盖 300kg 垂直试验台核定载荷、85kg 双模组分体搬运、180-260mm P.C.D. 底板法兰适配及免吊车双人地面安装 SOP。`,
    generate: (topicWords, topicSlug) => `# 便携式路灯升杆机工程技术解析、法兰适配与选型指南 (Portable Hydraulic Light Pole Lifter: Engineering Architecture, Flange Compatibility, and Jobsite Selection Guide)

在市政道路照明工程与离网太阳能路灯基础设施建设中，灯杆起竖与高空吊装作业始终是施工安全与项目成本的核心瓶颈。传统安装 6m 至 12m 标准路灯立杆，高度依赖 16 吨随车吊或汽车起重机进行整杆吊运和底座法兰对孔。然而，在城市狭窄人行道、背街小巷、校园园区通道、绿化隔离带以及未铺装地面的荒野光伏场地，重型吊车面临严重的进场通行受限、无支腿施展空间以及冗长的市政封路报批程序。

便携式路灯升杆机（[portable hydraulic pole lifter](/products/light-pole-jack/)）作为新一代轻量化原位液压起重装备，采用分体双模块设计与地脚锚栓自锚固原理，由标准双人作业团队（two-person crew）即可在地面完成机械自锁、法兰对齐与垂直举升，彻底摆脱对重型机械吊装的依赖。

> ### 📌 工程采购与项目经理核心决策要点 (Key Takeaways)
> - **零吊车物流与原位作业 (Zero-Crane Logistics)：** 彻底消除 16 吨起重机租赁费用、封路审批等待及狭窄狭长通道进场阻碍，全面适配 6m 至 12m 市政灯杆。
> - **工厂物理载荷实测标定：** 额定垂直举升载荷严格标定为 300kg，每台出厂设备均通过垂直试验台超载测试与 24 小时液压保压质检 (F002, F020)。
> - **双人分体快速转运与 10 分钟组装 (Two-Person Modular Transport)：** 85kg 分体双模块设计（45kg 液压升降总成 + 40kg 24V 电池动力箱），两名工人使用标准皮卡即可轻松转运至狭窄步行街并迅速就位 (two-person crew, F001, F008)。
> - **通用底板超宽容差适配：** 放射状长腰槽底板全面适配 180mm 至 260mm 地脚螺栓分布圆直径（P.C.D.），出厂标配兼容 M16 至 M24 锚栓 (F015, F016)。

---

## 1. 机械工程架构与双模组分体设计 (Mechanical Architecture)

便携式路灯立杆机的核心设计理念是“以模块化地面液压机构替代重型高空吊车”。整套系统采用分体双模块架构（two-module split architecture），总运输重量严格控制为 **85kg**：
1. **液压顶升立柱与主机总成 (Hydraulic Lifter Rig)：** 展开尺寸 610 × 220 × 220 mm，净重严格标定为 **45kg**。内置高刚性结构合金伸缩立柱与 800mm 有效垂直行程液压缸，配备两级机械防坠自锁销，彻底消除意外失压下坠风险。
2. **24V 电气动力与控制箱 (24V Power & Control Unit)：** 外形尺寸 500 × 300 × 250 mm，净重严格标定为 **40kg**。内置高能量密度 **24V DC** 充电机电动力总成、微型高压液压泵站及双向微调比例液压阀组。
3. **包装与出厂尺寸：** 外包装为 650 × 350 × 500 mm 钢带加固工业木箱，符合国际植物检疫 ISPM-15 出口标准。

单件模块重量均控制在 45kg 以内，严格符合国际职业安全关于双人协同搬运的标准。两名作业人员即可将其从皮卡后斗卸下，人工搬抬穿行于人行道台阶或泥泞的绿化带。

出厂测试数据显示，设备单次全行程垂直升举耗时约 20 秒，单次满电支持连续起升 50 次以上，机械设计寿命超过 3,000 次起升循环。上述数据基于出厂测试台基准环境；实际工况下的操作节奏需根据现场风速、环境温度（-20°C 至 +50°C）及灯具迎风面积动态调整。

💡 [告别高昂吊车账单：立即使用吊车替代方案 ROI 测算工具评估节省空间](/tools/roi-calculator/)

---

## 2. 结构载荷核验与临电安全净距 (Structural & Electrical Safety)

在市政基建施工中，安全冗余建立在对国际行业规范的严格遵循之上。架空输电线路触电是路灯吊装作业中最致命的伤亡事故源。

在传统汽车起重机作业中，美国 **OSHA 1926 Subpart CC (29 CFR 1926.1408)** 规范强制要求：起重机长臂在接近架空带电导线作业时，必须保持 10 至 20 英尺（3.05m 至 6.1m）的绝对安全缓冲区。在狭窄道路施工时，该红线经常迫使供电部门大范围拉闸停电，引发工程延期。便携式升杆机直接坐落于基础底座，灯杆在带电线路下方从 0° 匀速顶升至 90° 垂直状态，长臂无回转摆动盲区，完全符合 **IEEE 516** 带电作业安全净距标准。

在机械力学验证方面，设备标称额定垂直载荷严格限制为 **300kg**，最大适配杆高 **12m**（覆盖常规 6m、8m、10m 及 12m 市政与景观灯杆）。每台设备出厂前均执行 100% 满负荷承重与 24 小时保压测试，确保多路换向阀与液压油路零渗漏。

依据欧洲道路照明灯杆标准 **EN 40-3** 结构倾覆力矩规范，设备底座配备了多点微调水平支腿与高精度双轴水平仪，可在倾斜路肩或松软地坪快速找平，消除大风环境下的横向倾覆力矩。工程人员可查阅[狭窄通道立杆机与汽车吊对比技术白皮书](/compare/pole-jack-vs-crane/)核算通行与支腿作业面。

---

## 3. 通用底板法兰适配与螺栓分布圆直径 (P.C.D. 180-260mm)

路灯基础施工的一大痛点在于不同制造商的法兰开孔尺寸参差不齐。便携式立杆机配备了高强度通用锻造底板，加工有 4 向 90° 对称放射状长腰槽，具备极大的几何容差能力：
- **螺栓分布圆直径（P.C.D. 范围）：** 底板支持 **180mm 至 260mm** 的地脚螺栓圆心孔距。无论是 4 螺栓方形基础笼还是圆形多螺栓基础，均可直接滑入底座自锚固。
- **锚栓规格适配：** 标配兼容 **M16、M18、M20、M22 至 M24** 各类规格的地脚螺栓。
- **出厂标配附件包：** 设备附赠 4 套高强度调平垫片与双重防松螺母（适配 M16/M18/M20/M22）。对于 M24 超大规格锚栓，底板腰槽完全可容纳，但需在进场前复核螺纹外露长度。

在现代道路土建工程中，基础地脚螺栓通常执行 **ASTM F1554**（36/55/105 级）或 **ASTM A325** 紧固标准。在升杆机起升初段（0° 至 30°），底盘将举升反力转化为对混凝土立柱正面的向下垂直压应力，并均匀拉紧后侧受力锚栓，有效防止基础边缘受剪崩裂。施工团队可参考[法兰孔距工程兼容性指南](/guides/pole-jack-compatibility/)核对现场参数。

📐 [担心法兰孔距不匹配？提交参数申请工厂 24 小时免费图纸审核](/quote/)

---

## 4. 标准双人立杆工程作业流程 (Step-by-Step Two-Person Installation Workflow)

为规范现场作业安全，施工团队必须严格执行三阶段双人作业规程（two-person crew mandatory）：

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ 第一阶段：基座勘验、清渣与上空架空电线净距核查        │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 第二阶段：底板自锚固卡装、双向调平与立柱机械安全销锁定│
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 第三阶段：地面预接线、24V 伺服平稳举升与法兰终拧紧固   │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **第一阶段：基座勘验与净空排查**
   - 确认混凝土基础养护期已满并达到设计标号；清除 M16-M24 预埋地脚螺栓表面的水泥残渣与毛刺。
   - 依据 **ANSI/IES RP-8-18** 道路照明投光规范，确认灯具照射角度与朝向。
   - 观察立杆上空，核查作业路径与架空高压输电线保持安全距离。

2. **第二阶段：底盘自锚固与机械销锁定**
   - 两名作业人员将 45kg 举升机底板对准预埋地脚螺栓滑入就位，旋入初拧螺母实现自锚固。
   - 使用液压快换接头连接 40kg 24V 控制箱；调节多点支腿使高精度双轴水平泡居中。
   - 将地面平放的灯杆底部耳板对准举升机承重滑台，插入高强合金机械防坠销并锁定。

3. **第三阶段：地面预接线与匀速起竖**
   - 在地面完成全部灯具组装、电缆穿线与配光调校，避免传统高空攀爬登高作业的安全风险。
   - 操作员 A 推动 24V 液压控制阀手柄，驱动液压柱匀速起升（约 20 秒动作）。
   - 操作员 B 位于侧方 45° 安全观测角，观察起立姿态并引导灯杆底部法兰精准落入地脚螺栓。
   - 达到 90° 垂直极限位后，双向液压自锁阀与机械止挡同步生效，两人配合紧固全部防松螺母。

📄 [下载 12m 路灯立杆机全套工程规格书与现场施工手册 (PDF)](/resources/)

---

## 5. 机械工程边界与行业常见误区 (Engineering Boundaries)

在 B2B 工业采购与技术选型过程中，工程决策人必须明确设备的硬性边界，杜绝行业误区：

| 行业常见误区 | 经核验的工程事实 | 违规操作潜在风险 |
|---|---|---|
| **误区 1：轻量化设计意味着单人可以独立施工** | 虽然 45kg 与 40kg 模块便于搬运，但现场**严格禁止单人作业**。必须两名持证技术人员协同作业。 | 单人操作存在视野盲区，易导致地脚螺栓螺纹碰伤或在起立初段发生失控晃动。 |
| **误区 2：便携式立杆机可以替代所有大型吊车** | 设备设计指标严格限定为**额定垂直载荷 300kg**、**最大杆高 12m**，专为常规市政路灯与太阳能路灯打造。 | 超限用于 15m 至 35m 高杆灯或重型桁架立柱会导致设备机械过载，该类重型结构仍必须调度大吨位汽车吊。 |
| **误区 3：设备投资回报周期是固定且百分之百承诺的** | 设备能省去单杆吊车租赁费，但实际回本周期取决于灯杆安装密集度、当地吊车租金及人工成本。 | 盲目承诺固定回本周期脱离施工实际。工程方应结合自身工况在项目测算表中核算综合成本。 |

---

## 6. 常见技术问答 (FAQ)

### 问：现场单名工人能否独立完成设备搬运与立杆作业？
不可以。工程安全规范严格禁止单人作业（two-person operation strictly required）。设备虽然采用 45kg 与 40kg 双分体包装便于两名工人搬迁，但在现场起立立杆过程中，必须由一人负责 24V 液压动力单元的操作与安全监控，另一人配合引导灯杆底部法兰对准预埋地脚螺栓并安装防松螺母。

### 问：通用底板支持哪些地脚螺栓间距？
通用底板加工有长腰形滑孔，适配的地脚螺栓分布圆直径（P.C.D.）范围为 180mm 至 260mm。出厂标配附带适配 M16、M18、M20 及 M22 的紧固配件。若为 M24 规格，滑孔尺寸能够容纳，但需在下单前核验图纸螺栓伸出高度。

### 问：大风天气下立 12 米高杆如何保证抗风稳定性？
设备标称额定承载能力为 300kg，最大适配杆高 12m。底座配置了多点可调重载机械支腿与双向精密水平仪，能构建宽距支撑面，有效抵御突发阵风产生的倾覆力矩，符合 EN 40-3 规范要求。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "现场单名工人能否独立完成设备搬运与立杆作业？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "不可以。设备现场操作严格执行双人编制。一人操控液压控制单元，另一人负责观察对孔与紧固螺母，杜绝单人盲区风险。"
      }
    },
    {
      "@type": "Question",
      "name": "通用底板支持哪些地脚螺栓间距？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "通用底板支持 180mm 至 260mm P.C.D. 螺栓孔距，出厂标配 M16 至 M22 紧固件，M24 需核对图纸。"
      }
    },
    {
      "@type": "Question",
      "name": "大风天气下立 12 米高杆如何保证抗风稳定性？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "标称承载 300kg，适配 12m 灯杆，配备多点微调支腿与水平找平机构，符合 EN 40-3 结构抗倾覆标准。"
      }
    }
  ]
}
</script>
`
  }
};

/**
 * 确保多语言矩阵文章全部就绪
 * 规则:
 *   1. 优先读取已有草稿 (若未开启 --force)
 *   2. 若草稿缺失，以 English First 为基准，自动生成高保真、多语言本地化长文
 *   3. 严格冻结 300kg/12m/85kg/24V 物理事实与合规门禁
 */
export async function ensureArticleMatrix(topic, options = {}) {
  const { projectRoot, force = false, targetLangs = ['en', 'es', 'fr', 'pt', 'vi', 'th', 'id', 'zh'] } = options;
  const articlesDir = path.resolve(projectRoot, 'geo-drafts/articles');
  await fs.mkdir(articlesDir, { recursive: true });

  const topicWords = slugToTitleWords(topic);
  const results = [];

  console.log(`\n📋 [Matrix Generator] 检查并生成多语言文章矩阵 (${targetLangs.length} 个目标语种)...`);

  for (const lang of targetLangs) {
    let fileName = `${topic}-${lang}.md`;
    if (lang === 'zh') {
      // 检查 `${topic}.md` 或 `${topic}-zh.md`
      const cand1 = path.join(articlesDir, `${topic}.md`);
      const cand2 = path.join(articlesDir, `${topic}-zh.md`);
      let found = false;
      try {
        await fs.access(cand1);
        fileName = `${topic}.md`;
        found = true;
      } catch {
        try {
          await fs.access(cand2);
          fileName = `${topic}-zh.md`;
          found = true;
        } catch {}
      }
      if (!found) {
        fileName = `${topic}-zh.md`;
      }
    }

    const filePath = path.join(articlesDir, fileName);
    let exists = false;
    try {
      await fs.access(filePath);
      exists = true;
    } catch {
      exists = false;
    }

    if (exists && !force) {
      console.log(`  ✓ [${lang.toUpperCase()}] 已存在就绪草稿: ${fileName}`);
      results.push({ lang, filePath, fileName, isNew: false });
      continue;
    }

    // 动态生成缺失语种的文章
    console.log(`  ✨ [${lang.toUpperCase()}] 正在生成高质量工程矩阵草稿: ${fileName}...`);
    const gen = LOCALE_GENERATORS[lang] || LOCALE_GENERATORS.en;
    const content = gen.generate(topicWords, topic);

    await fs.writeFile(filePath, content, 'utf8');
    console.log(`  ✓ [${lang.toUpperCase()}] 矩阵草稿已生成写入: ${fileName} (${content.length} 字节)`);
    results.push({ lang, filePath, fileName, isNew: true });
  }

  return results;
}
