import baseline from "./content-baseline.json" with {type:"json"};

const specs = baseline.product.specifications;
const std = baseline.product.standardConfiguration;
const perf = baseline.product.manufacturerReportedPerformance;

/**
 * 5 个基于 S4 规格基准的英文配置与工况变体着陆页定义。
 * 严格约束：全站仅存在单一物理主机（modelNumber: null），各配置页通过 isVariantOf 关联母产品，
 * 不得出现任何价格、币种、库存状态或未证实的工程承诺。
 */
export const configurationVariants = [
  {
    slug: "m16-m22-anchor-bolt-pole-lifter",
    path: "/configurations/m16-m22-anchor-bolt-pole-lifter/",
    shortTitle: "M16–M22 4-Bolt Kit",
    eyebrow: "Configuration / Standard 4-Bolt Kit",
    title: "M16–M22 Pole Lifter Config (180–260mm Span) | velolev",
    h1: "M16–M22 4-Bolt Flange Configuration",
    description:
      "Specs for the included 4-bolt anchor kit (M16–M22, 4 sets each) within 180–260 mm flange hole span for 12m poles up to 300kg. Request a review.",
    lead:
      "Review the standard included anchor bolt configuration for 4-hole base plates within the listed 180–260 mm flange hole span, and confirm your drawing measurement definition before ordering.",
    directAnswer:
      `The standard velolev Portable Light Pole Lifter delivery includes 1 equipment set, 1 set of ground stakes, and 4 sets each of ${std.anchorBoltSizesIncluded.join(", ")} anchor bolts for 4-bolt pole bases within the listed ${specs.flangeHoleSpanMm[0]}–${specs.flangeHoleSpanMm[1]} mm flange hole span. It is rated for ${specs.applicablePoleHeightM} m class light poles up to ${specs.ratedLoadKg} kg total assembled weight. Because the source flange diagram includes dimension terminology that still requires engineering clarification, confirm how your drawing defines the span and submit a dimensioned drawing for any non-standard base.`,
    highlights: [
      `${std.anchorBoltSizesIncluded.join(" / ")} · ${std.anchorBoltSetsPerSize} sets each included`,
      `${specs.flangeHoleSpanMm[0]}–${specs.flangeHoleSpanMm[1]} mm listed flange hole span`,
      `${specs.applicablePoleHeightM} m pole class · ${specs.ratedLoadKg} kg rated load`,
      "4-hole pattern listed in quick check",
    ],
    tableHeading: "Standard 4-Bolt Configuration & Scope Matrix",
    tableIntro:
      "Values below come directly from the current S4 specification sheet and distinguish included hardware from project verification items.",
    rows: [
      ["Included anchor bolt sizes", `${std.anchorBoltSizesIncluded.join(", ")} (${std.anchorBoltSetsPerSize} sets per size)`, "Included in standard delivery"],
      ["Additional listed bolt size", "M24 (listed in compatibility table)", "Not included by default; confirm separately"],
      ["Flange hole span shown", `${specs.flangeHoleSpanMm[0]}–${specs.flangeHoleSpanMm[1]} mm`, "Verify measurement definition against project drawing"],
      ["Default quick-check hole pattern", "4 holes", "6-hole or 8-hole bases require dimensioned drawing review"],
      ["Applicable pole class & load", `${specs.applicablePoleHeightM} m class · ${specs.ratedLoadKg} kg rated load`, "Check total assembled weight including luminaire and bracket"],
      ["Non-standard base plates", "Outside 180–260 mm or non-4-hole", "Non-standard bases require a dimensioned drawing review"],
    ],
    checker: {
      enabled: true,
      id: "config-m16-m22-checker",
      defaultSpan: 220,
      defaultBolt: "M20",
      defaultHoles: "4",
    },
    quoteHref: "/quote/?context=config-m16-m22&span=220&bolt=M20&holes=4",
    quoteLabel: "Request M16–M22 configuration review",
    faqs: [
      [
        "Which anchor bolt sizes are included in the standard M16–M22 delivery?",
        "Standard delivery includes 1 equipment set, 1 set of ground stakes, and 4 sets each of M16, M18, M20, and M22 anchor bolts.",
      ],
      [
        "Does a 180–260 mm flange hole span automatically guarantee fitment?",
        "No. The source flange diagram contains dimension terminology that still requires engineering clarification, so you should verify how your drawing defines the span and submit the base drawing for review.",
      ],
      [
        "What if my 4-bolt base uses M24 anchor studs instead of M16–M22?",
        "M24 is listed in the compatibility table, but M24 hardware is not included in the standard kit. Flag M24 in your inquiry so supply options can be confirmed separately.",
      ],
    ],
    relatedLinks: [
      { href: "/products/light-pole-jack/", label: "Portable Light Pole Lifter: Full Specifications" },
      { href: "/configurations/m24-non-standard-flange-pole-lifter-review/", label: "M24 & Non-Standard Flange Review" },
      { href: "/guides/m24-anchor-bolts-180-260mm-flange-compatibility/", label: "Guide: M24 & 180–260 mm Flange Compatibility" },
      { href: "/guides/pole-jack-compatibility/", label: "Guide: Pole, Flange & Foundation Compatibility" },
    ],
    evidenceRefs: ["F001", "F002", "F003", "F012", "F013", "F014", "F015", "F016", "F020"],
  },
  {
    slug: "m24-non-standard-flange-pole-lifter-review",
    path: "/configurations/m24-non-standard-flange-pole-lifter-review/",
    shortTitle: "M24 & Non-Standard Flange Review",
    eyebrow: "Configuration / M24 & Drawing Review",
    title: "M24 Bolt & Non-Standard Flange Review | velolev",
    h1: "M24 & Non-Standard Flange Review",
    description:
      "Engineering review boundary for M24 anchor studs, 6-hole or 8-hole base plates, and flange spans outside 180–260 mm on the velolev portable light pole lifter.",
    lead:
      "Check how M24 studs, 6-hole or 8-hole patterns, and flange spans below 180 mm or above 260 mm are handled before committing equipment to your project.",
    directAnswer:
      "M24 is listed in the velolev Portable Light Pole Lifter compatibility table alongside M16, M18, M20, and M22, but M24 hardware is not included in the standard kit. In addition, 6-hole or 8-hole flanges and base plates outside the listed 180–260 mm flange hole span are not approved by default. Non-standard bases require a dimensioned drawing review before confirming fitment, and no custom adapter plates or default M24 bolt kits are promised without project review.",
    highlights: [
      "M24 listed in compatibility table (not in standard kit)",
      "6-hole & 8-hole bases require drawing review",
      "Spans < 180 mm or > 260 mm require drawing review",
      "No unreviewed adapter plate promises",
    ],
    tableHeading: "M24 & Non-Standard Base Plate Decision Boundary",
    tableIntro:
      "Use this table to separate listed M24 stud compatibility from base geometries that require a dimensioned engineering drawing.",
    rows: [
      ["M24 anchor bolt diameter", "Listed in S4 compatibility table (M16–M24)", "Not included in standard M16–M22 delivery; confirm separately"],
      ["4-hole base within 180–260 mm", "Within listed span range", "Verify drawing measurement definition and M24 hardware scope"],
      ["6-hole or 8-hole bolt pattern", "Outside default 4-hole pattern", "Non-standard bases require a dimensioned drawing review"],
      ["Span below 180 mm or above 260 mm", "Outside listed 180–260 mm range", "Non-standard bases require a dimensioned drawing review"],
      ["Anchor bolts above M24 (M27, M30, Other)", "Outside listed M16–M24 table", "Non-standard bases require a dimensioned drawing review"],
      ["Required submission package", "Dimensioned base-plate & stud layout", "Include bolt diameter, hole count, span definition, and projection"],
    ],
    checker: {
      enabled: true,
      id: "config-m24-checker",
      defaultSpan: 240,
      defaultBolt: "M24",
      defaultHoles: "4",
    },
    quoteHref: "/quote/?context=flange&span=240&bolt=M24&holes=4",
    quoteLabel: "Submit M24 or non-standard flange drawing",
    faqs: [
      [
        "Is M24 compatible with the velolev portable light pole lifter?",
        "M24 is listed in the specification sheet compatibility table (M16–M24), but it is not included in the standard M16–M22 bolt kit and requires project confirmation.",
      ],
      [
        "Can a 6-hole or 8-hole flange be used without a drawing review?",
        "No. Only 4-hole bases within 180–260 mm appear in the default listed check. Non-standard bases require a dimensioned drawing review before confirming compatibility.",
      ],
      [
        "Does velolev supply custom adapter plates off the shelf for non-standard flanges?",
        "No off-the-shelf custom adapter plates are promised. Non-standard bases require a dimensioned drawing review to evaluate actual connection feasibility.",
      ],
    ],
    relatedLinks: [
      { href: "/products/light-pole-jack/", label: "Portable Light Pole Lifter: Full Specifications" },
      { href: "/configurations/m16-m22-anchor-bolt-pole-lifter/", label: "M16–M22 Standard 4-Bolt Kit" },
      { href: "/guides/m24-anchor-bolts-180-260mm-flange-compatibility/", label: "Guide: M24 & 180–260 mm Flange Compatibility" },
      { href: "/guides/pole-jack-compatibility/", label: "Guide: Pole, Flange & Foundation Compatibility" },
    ],
    evidenceRefs: ["F001", "F012", "F013", "F014", "F020"],
  },
  {
    slug: "12m-300kg-street-light-pole-lifter",
    path: "/configurations/12m-300kg-street-light-pole-lifter/",
    shortTitle: "12 m / 300 kg Load Envelope",
    eyebrow: "Configuration / Height & Load Envelope",
    title: "12m Pole & 300kg Rated Load Pole Lifter | velolev",
    h1: "12 m Pole Class / 300 kg Load Envelope",
    description:
      "Review boundary for 12m class street light poles up to 300kg total assembled load using the 24V hydraulic lifter. Submit drawing for review.",
    lead:
      "Evaluate whether your roadway lighting column fits within the 12 m applicable pole class and 300 kg rated load ceiling when all top attachments are included.",
    directAnswer:
      `The velolev Portable Light Pole Lifter is specified for ${specs.applicablePoleHeightM} m class light poles with a ${specs.ratedLoadKg} kg maximum rated load and a ${specs.batteryVoltageV} V rechargeable battery. Project engineers must verify the complete assembled weight—combining the bare pole, bracket arm, luminaire, wiring, and any attached accessories—rather than bare column weight alone. Source-sheet figures of ${perf.liftTimeSeconds} s lift time, ${perf.liftsPerFullCharge} lifts per charge, and ${perf.usageCycles} usage cycles are manufacturer-reported with field validation pending; poles exceeding ${specs.applicablePoleHeightM} m or ${specs.ratedLoadKg} kg require a crane.`,
    highlights: [
      `${specs.applicablePoleHeightM} m applicable light pole height class`,
      `${specs.ratedLoadKg} kg maximum rated assembled load`,
      `${perf.liftTimeSeconds} s lift time (manufacturer-reported; validation pending)`,
      "Columns > 12 m or > 300 kg require a crane",
    ],
    tableHeading: "12 m / 300 kg Capacity & Evidence Verification Table",
    tableIntro:
      "Separate confirmed specification ceilings from manufacturer-reported performance metrics that remain under field validation.",
    rows: [
      ["Applicable light pole height", `${specs.applicablePoleHeightM} m pole class`, "Confirmed S4 specification ceiling"],
      ["Rated load", `${specs.ratedLoadKg} kg`, "Must include bare pole + bracket + luminaire + attachments"],
      ["Power supply", `${specs.batteryVoltageV} V rechargeable battery`, "No external grid supply needed during lift stroke"],
      ["Reported lift time", `${perf.liftTimeSeconds} s`, "Manufacturer-reported; field validation pending (not total install time)"],
      ["Lifts per full charge", `${perf.liftsPerFullCharge}`, "Manufacturer-reported; field validation pending"],
      ["Reported usage cycles", `${perf.usageCycles}`, "Manufacturer-reported; field validation pending"],
    ],
    checker: {
      enabled: false,
    },
    checklistHeading: "Pre-Selection Load & Scope Checks for 12 m Class Poles",
    checklistItems: [
      "Sum bare column weight, outreach bracket arm, luminaire head(s), and internal cabling to verify total weight stays at or below 300 kg.",
      "Confirm overall column height does not exceed the 12 m class and check center-of-gravity offset for long outreach arms.",
      "Verify base flange span (180–260 mm), anchor bolt size (M16–M24), and concrete foundation approval.",
      "Keep a mobile crane in scope for any multi-arm, decorative, direct-burial, or high-mast poles above 12 m or 300 kg.",
    ],
    quoteHref: "/quote/?context=config-12m-300kg",
    quoteLabel: "Send 12 m pole weight & drawing for review",
    faqs: [
      [
        "Does the 300 kg rated load apply to the bare pole or the assembled pole?",
        "It applies to the complete assembled load being lifted—bare pole plus bracket arm, luminaire, and any attached hardware.",
      ],
      [
        "Does a 20 s reported lift time mean a 12 m pole is fully installed in 20 seconds?",
        "No. The 20 s figure is a manufacturer-reported hydraulic lift stroke metric with field validation pending. Total installation time also includes transport, staging, wiring, alignment, and anchor tightening.",
      ],
      [
        "Can this equipment lift 14 m poles or 350 kg columns?",
        "No. Poles taller than 12 m or heavier than 300 kg exceed the specification sheet limits and require a mobile crane or alternative approved lifting method.",
      ],
    ],
    relatedLinks: [
      { href: "/products/light-pole-jack/", label: "Portable Light Pole Lifter: Full Specifications" },
      { href: "/compare/pole-jack-vs-crane/", label: "Compare: Pole Lifter vs Mobile Crane" },
      { href: "/tools/roi-calculator/", label: "Cost Scenario Calculator (Your Own Inputs)" },
      { href: "/guides/when-mobile-cranes-still-required-over-300kg-12m-direct-burial/", label: "Guide: When Mobile Cranes Are Still Required" },
    ],
    evidenceRefs: ["F001", "F002", "F003", "F004", "F017", "F018", "F019"],
  },
  {
    slug: "85kg-split-portable-pole-lifter-narrow-access",
    path: "/configurations/85kg-split-portable-pole-lifter-narrow-access/",
    shortTitle: "85 kg Two-Module Narrow Access",
    eyebrow: "Configuration / Modular Transport & Access",
    title: "85kg Split Two-Module Narrow Access Lifter | velolev",
    h1: "85 kg Two-Module Narrow-Access Setup",
    description:
      "Modular transport and site access overview for the 85 kg split light pole lifter: 45 kg hydraulic unit (610×220×220 mm) and 40 kg 24 V cabinet (500×300×250 mm).",
    lead:
      "Plan logistics and crew allocation for sidewalks, pedestrian zones, medians, and parking decks where a truck-mounted crane cannot enter.",
    directAnswer:
      `The velolev Portable Light Pole Lifter has a total equipment weight of ${specs.totalWeightKg} kg divided into two separate modules: a ${specs.hydraulicModuleWeightKg} kg hydraulic lifting module (${specs.hydraulicModuleDimensionsMm.join(" × ")} mm) and a ${specs.electricalCabinetWeightKg} kg ${specs.batteryVoltageV} V electrical cabinet (${specs.electricalCabinetDimensionsMm.join(" × ")} mm), with source-sheet packaging dimensions of ${specs.packagingDimensionsMm.join(" × ")} mm. The specification sheet lists ${specs.operators} operators; actual crew size, manual-handling equipment, and ground-bearing checks must follow your project safety plan.`,
    highlights: [
      `${specs.totalWeightKg} kg total equipment weight (${specs.hydraulicModuleWeightKg} kg + ${specs.electricalCabinetWeightKg} kg)`,
      `Hydraulic unit: ${specs.hydraulicModuleDimensionsMm.join(" × ")} mm`,
      `Electrical cabinet: ${specs.electricalCabinetDimensionsMm.join(" × ")} mm`,
      `${specs.operators} operators listed on specification sheet`,
    ],
    tableHeading: "Two-Module Physical Dimensions & Transport Breakdown",
    tableIntro:
      "Every mass and dimension figure below matches S4 specification sheet entries for vehicle loading and site-access planning.",
    rows: [
      ["Hydraulic lifting module", `${specs.hydraulicModuleDimensionsMm.join(" × ")} mm · ${specs.hydraulicModuleWeightKg} kg`, "Hydraulic cylinder, valve, oil pump, pressure gauge"],
      ["Electrical cabinet", `${specs.electricalCabinetDimensionsMm.join(" × ")} mm · ${specs.electricalCabinetWeightKg} kg`, "Control system, hydraulic pump, 24 V battery, meters, lift buttons"],
      ["Total equipment weight", `${specs.totalWeightKg} kg`, "Combined mass of hydraulic module and electrical cabinet"],
      ["Packaging dimensions", `${specs.packagingDimensionsMm.join(" × ")} mm`, "Source-sheet dimensions; packaging material & gross weight confirmed per order"],
      ["Operators listed in sheet", `${specs.operators} operators`, "Crew size must satisfy site manual-handling & lifting safety rules"],
      ["Applicable pole envelope", `${specs.applicablePoleHeightM} m pole class · ${specs.ratedLoadKg} kg rated load`, "Requires compatible flange & approved foundation"],
    ],
    checker: {
      enabled: false,
    },
    checklistHeading: "Narrow-Access & Modular Logistics Review Items",
    checklistItems: [
      "Check pedestrian path width, curb steps, gate clearances, and surface bearing capacity along the route from vehicle drop-off to each foundation.",
      "Plan manual-handling aids or two-person carry procedures for the 45 kg hydraulic unit and 40 kg electrical cabinet in line with site safety rules.",
      "Verify overhead clearances along the full pole swing arc even when ground corridors are narrow.",
      "Confirm packaging material, gross shipping weight, and destination freight terms when requesting a quotation.",
    ],
    quoteHref: "/quote/?context=config-85kg-access",
    quoteLabel: "Review narrow-access project scope",
    faqs: [
      [
        "What are the individual weights and dimensions of the two modules?",
        "The hydraulic lifting module weighs 45 kg and measures 610 × 220 × 220 mm. The 24 V electrical cabinet weighs 40 kg and measures 500 × 300 × 250 mm, giving an 85 kg total equipment weight.",
      ],
      [
        "Does the 85 kg split design mean one worker can operate the system unconditionally?",
        "No. The specification sheet parameter table specifies 1–2 operators, and single-person operation is conditional. Site staffing must follow project safety and manual-handling requirements.",
      ],
      [
        "Are shipping crate materials and gross weight fixed in the specification sheet?",
        "The specification sheet lists 650 × 350 × 500 mm packaging dimensions and 85 kg equipment weight. Packaging material and gross shipping weight are confirmed per actual order.",
      ],
    ],
    relatedLinks: [
      { href: "/products/light-pole-jack/", label: "Portable Light Pole Lifter: Full Specifications" },
      { href: "/solutions/parking-lot-lighting/", label: "Application: Parking Lot & Campus Lighting" },
      { href: "/guides/modular-85kg-pole-lifter-operator-planning-boundaries/", label: "Guide: 85 kg Modular Transport & 1–2 Operator Limits" },
      { href: "/faq/", label: "Frequently Asked Questions" },
    ],
    evidenceRefs: ["F001", "F002", "F003", "F005", "F006", "F007", "F008", "F009", "F010", "F011", "F021"],
  },
  {
    slug: "24v-off-grid-solar-pole-lifter",
    path: "/configurations/24v-off-grid-solar-pole-lifter/",
    shortTitle: "24 V Off-Grid Solar Pole Review",
    eyebrow: "Configuration / 24 V Off-Grid Solar Review",
    title: "24V Off-Grid Battery Solar Pole Lifter Review | velolev",
    h1: "24 V Off-Grid Battery Solar Pole Review",
    description:
      "Project review guide for off-grid solar street light poles using the 24V battery lifter, covering total solar assembly weight and drawing checks.",
    lead:
      "Prepare total solar assembly weight, top-mounted component layout, and flange drawings for an engineering review before selecting crane-free erection.",
    directAnswer:
      `The velolev Portable Light Pole Lifter runs on a ${specs.batteryVoltageV} V rechargeable battery housed in the ${specs.electricalCabinetWeightKg} kg electrical cabinet (manufacturer-reported ${perf.liftsPerFullCharge} lifts per full charge, with field validation pending), avoiding external grid power on remote corridors. However, the current source sheet describes standard light pole equipment and lifting a complete solar assembly (pole, solar panel, mounting frame, battery enclosure, and luminaire) has not been validated as a standard configuration. Submit the complete assembled weight (must stay within ${specs.ratedLoadKg} kg), pole height (${specs.applicablePoleHeightM} m class), and dimensioned base drawings for review.`,
    highlights: [
      `${specs.batteryVoltageV} V rechargeable battery (no site mains required)`,
      `${perf.liftsPerFullCharge} lifts per full charge (manufacturer-reported; validation pending)`,
      "Complete solar assembly validation: pending project review",
      `Total solar assembly must remain <= ${specs.ratedLoadKg} kg & <= ${specs.applicablePoleHeightM} m`,
    ],
    tableHeading: "Off-Grid Solar Pole Project Review Matrix",
    tableIntro:
      "Distinguish confirmed 24 V equipment parameters from solar-specific assembly inputs that must be verified per project.",
    rows: [
      ["Equipment power source", `${specs.batteryVoltageV} V rechargeable battery in electrical cabinet`, "Confirmed S4 specification"],
      ["Reported lifts per full charge", `${perf.liftsPerFullCharge}`, "Manufacturer-reported; field validation pending"],
      ["Complete solar assembly status", "Not validated as a standard configuration", "Requires project-specific assembly weight & geometry review"],
      ["Assembled weight ceiling", `${specs.ratedLoadKg} kg maximum rated load`, "Sum pole + panel + bracket + battery box + luminaire"],
      ["Pole height class", `${specs.applicablePoleHeightM} m class`, "Confirm overall height including top solar mounting frame"],
      ["Base connection & bolts", `${specs.flangeHoleSpanMm[0]}–${specs.flangeHoleSpanMm[1]} mm span · M16–M24 listed`, "M16–M22 included; M24 & non-standard bases require review"],
    ],
    checker: {
      enabled: false,
    },
    checklistHeading: "Information Required Before Reviewing a Solar Street Light Project",
    checklistItems: [
      "Provide the total assembled weight of the pole, solar panel(s), top bracket, battery box, luminaire, and cabling.",
      "Attach an elevation drawing showing panel/battery mounting positions and center-of-gravity offset.",
      "Include the dimensioned pole-base flange drawing, anchor bolt diameter (M16–M24), and concrete foundation approval.",
      "Specify daily pole count, corridor access conditions, and charging logistics for the 24 V electrical cabinet.",
    ],
    quoteHref: "/quote/?context=solar-assembly",
    quoteLabel: "Submit solar pole assembly for review",
    faqs: [
      [
        "Is a complete solar street light pole validated as a standard configuration?",
        "No. The current specification sheet covers light pole lifting equipment, and lifting a complete solar assembly with panels and battery enclosures has not been validated as a standard configuration. Each solar project requires an assembly and drawing review.",
      ],
      [
        "How is the lifter powered on off-grid rural solar roads?",
        "The electrical cabinet includes a 24 V rechargeable battery, so no external grid power is needed during lifting. The sheet lists a manufacturer-reported figure of over 50 lifts per full charge with field validation pending.",
      ],
      [
        "What weight limit applies to a solar street light assembly?",
        "The total assembled weight—including the pole, solar panel, mounting frame, battery box, and luminaire—must not exceed the 300 kg rated load, and height must remain within the 12 m class.",
      ],
    ],
    relatedLinks: [
      { href: "/solutions/solar-street-light-installation/", label: "Application: Solar Street Light Installation Planning" },
      { href: "/products/light-pole-jack/", label: "Portable Light Pole Lifter: Full Specifications" },
      { href: "/guides/solar-street-light-pole-weight-limits-panel-battery-erection/", label: "Guide: Solar Pole Weight Limits (Panel & Battery)" },
      { href: "/resources/", label: "Resources: Specification Sheet & Project Worksheet" },
    ],
    evidenceRefs: ["F001", "F002", "F003", "F004", "F006", "F012", "F013", "F014", "F018", "F020"],
  },
];

export function getConfigurationBySlug(slug) {
  return configurationVariants.find((item) => item.slug === slug) ?? null;
}
