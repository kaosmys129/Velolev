import { parseFragment, serialize } from "parse5";
import baseline from "../data/content-baseline.json" with { type: "json" };
import copies from "../data/public-copy.json" with { type: "json" };

export { baseline };
export const copyFor = (locale = "en") => copies[locale] ?? copies.en;
const oldBrand = /\b(?:Velolev|PoleLift)\b/gi;
const money = /[$€£¥]|\b(?:USD|EUR|CNY|IDR|BRL)\b|\bRp\s*\d|ดอลลาร์|đô\s*la/i;
const bareLegacyPrice = /^\s*(?:1[,.\s]500|2[,.\s]500)\s*$/;
const inventory = /\b(?:in\s*stock|out\s*of\s*stock|inventory|stock\s*(?:level|status)|instock|outofstock)\b|en stock|en existencia|em estoque|tồn kho|stok tersedia|สินค้าคงคลัง/i;
const performance = /\d+\s*%|20\s*[-–]?\s*(?:seconds?|secondes?|segundos?|giây|วินาที|detik|s\b)|3[,.\s]?000\+?\s*(?:lift|cycle|ciclo|chu|รอบ|siklus)|(?:more than|over)\s*50\s*(?:times|lifts|cycles)|50\+\s*(?:lifts|cycles)/i;
const unverifiedClaim = /CE[-\s]*(?:certified|certifi[eé]|certificad)|ISO\s*9001|\bROHS\b|25\s*\+?\s*(?:years|ans|a[nñ]os|anos|năm|ปี|tahun)|\b(?:pays? for itself|payback in|highest ROI|under \d+ minutes|OSHA safety advantage|tested)\b/i;
const unsupportedUse = /5G|CCTV|security poles|monopoles?|power distribution poles|solar tracker|electric(?:al)? utility poles/i;
const legacyContact = /[\w.+-]+@(?:polelift|velolev)\.[\w.-]+|\+86\s*21\s*1234\s*567[89]|Shanghai Pilot Free Trade Zone|123 Main Street/i;

export function normalizeBrand(text = "") {
  return text.replace(oldBrand, baseline.brand.name);
}

export function publicText(text = "", locale = "en") {
  const copy = copyFor(locale);
  if (money.test(text) || bareLegacyPrice.test(text) || inventory.test(text)) return copy.commercial;
  if (legacyContact.test(text)) return copy.contactPending;
  if (performance.test(text) || unverifiedClaim.test(text)) return text.trim().length < 120 ? copy.pending : copy.summary;
  if (unsupportedUse.test(text)) return copy.compatibility;
  return normalizeBrand(text).replace(/\b600\s*(?:lbs?|pounds?)\b/gi, "300 kg")
    .replace(/volvet\s+(?:Technical\s+)?Engineering Team/gi, "volvet");
}

function attr(node, name) { return node.attrs?.find((a) => a.name === name)?.value ?? ""; }
function textOf(node) { return node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(textOf).join(" "); }
function classes(node) { return attr(node, "class"); }
function replaceText(node, value) {
  node.childNodes = [{ nodeName: "#text", value, parentNode: node }];
}

/** A server-side policy boundary, applied AFTER editorial overrides and to API HTML.
 * Keep legacy layout/assets while preventing old brand, commercial claims and
 * unvalidated performance from resurfacing during the D15+ editorial rebuild.
 */
export function enforceContentPolicy(html, locale = "en") {
  const copy = copyFor(locale);
  const tree = parseFragment(html);
  let productSectionIndex = 0;
  function walk(node) {
    if (!node.childNodes) return;
    node.childNodes = node.childNodes.filter((child) => {
      // Old structured data must not bypass the authoritative page schema.
      if (child.tagName === "script" && attr(child, "type") === "application/ld+json") return false;
      // No confirmed field video or customer testimonial evidence is available.
      if (child.tagName === "iframe" && /youtube|vimeo|google.*maps|maps\.google/i.test(attr(child, "src"))) return false;
      if (/elementor-widget-(?:video|google_maps)|elementor-background-video-container/.test(classes(child))) return false;
      if (/elementor-(?:testimonial|widget-testimonial)/.test(classes(child))) return false;
      if (/elementor-widget-(?:nested-accordion|elementskit-accordion|accordion|toggle)/.test(classes(child))) return false;
      if (textOf(child).length < 100 && /25\s*\+?[\s\S]*(?:Years of Experience|Años|Ans|Anos|năm|ปี|tahun)/i.test(textOf(child))) return false;
      const label = child.childNodes?.find((n) => n.tagName === "a");
      if (child.tagName === "li" && label && unsupportedUse.test(textOf(label))) return false;
      if (/elementor-widget-counter/.test(classes(child)) && /25|Years of Experience/i.test(textOf(child))) return false;
      return true;
    });
    for (const child of node.childNodes) {
      if (child.nodeName === "#text") {
        child.value = publicText(child.value, locale);
        continue;
      }
      if (["script", "style"].includes(child.tagName)) continue;
      if (child.tagName === "section" && /\bpolelifter-section\b/.test(classes(child))) {
        const sectionIndex = productSectionIndex++;
        // The seven localized product fragments share this section structure:
        // dimensions/operating instructions at 2, 5, 6 await engineering review.
        if ([2, 5, 6].includes(sectionIndex)) {
          replaceText(child, copy.compatibility);
          continue;
        }
      }
      if (child.tagName === "img" && /(?:velolev|polelift|maquin)[-_]logo/i.test(attr(child, "src"))) {
        child.attrs = child.attrs.filter((a) => !["src", "srcset", "alt", "title", "width", "height"].includes(a.name));
        child.attrs.push({ name: "src", value: "/brand/volvet-wordmark.svg" }, { name: "alt", value: "volvet" }, { name: "width", value: "220" }, { name: "height", value: "64" });
      }
      for (const a of child.attrs ?? []) {
        if (["alt", "title", "aria-label", "content"].includes(a.name)) a.value = publicText(a.value, locale);
        if (a.name === "href") {
          if (/^(?:mailto:|tel:)|wa\.me|api\.whatsapp/i.test(a.value)) a.value = locale === "en" ? "/contact-us/" : `/${locale}/contact-us/`;
          else if (/^https?:\/\/(?:www\.)?(?:velolev|polelift)\.[^/]+/i.test(a.value)) {
            try { const u = new URL(a.value); a.value = u.pathname + u.search + u.hash; } catch { a.value = "/"; }
          }
        }
      }
      if (child.tagName === "a" && /\/pricing-plan\/?$/.test(attr(child, "href"))) {
        replaceText(child, copy.quote);
        continue;
      }
      // Counters must not restore suppressed performance claims after hydration.
      const count = attr(child, "data-count");
      const toValue = attr(child, "data-to-value");
      if (["20", "25", "50", "3000"].includes(count) || ["20", "25", "50", "3000"].includes(toValue)) {
        child.attrs = child.attrs.filter((a) => !["data-count", "data-to-value", "data-suffix"].includes(a.name));
        replaceText(child, "—");
      }
      // Confirmed specifications remain readable before animation/hydration.
      if (count) child.attrs = child.attrs.filter((a) => a.name !== "data-count");
      // Elementor price cards split the currency and amount into distinct spans.
      if (/elementor-price-table__price/.test(classes(child))) {
        replaceText(child, copy.quote);
        continue;
      }
      // Ambiguous translated safety instructions need a reviewed manual first.
      if (/(?:Operation Guidance|Usage Precautions)/i.test(textOf(child)) && /polelifter-section/.test(classes(child))) {
        replaceText(child, copy.compatibility);
        continue;
      }
      walk(child);
    }
  }
  walk(tree);
  return serialize(tree);
}

export function organizationSchema(origin) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: baseline.brand.name,
    legalName: "volvet Engineering & Equipment Co., Ltd.",
    description: "Specialized original equipment manufacturer (OEM) of portable hydraulic light pole lifting equipment, engineered to eliminate crane dependency across global infrastructure projects.",
    ...(origin ? {
      url: origin,
      logo: `${origin}/brand/volvet-wordmark.svg`
    } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "technical support & export inquiries",
      availableLanguage: ["English", "Spanish", "French", "Portuguese", "Vietnamese", "Thai", "Indonesian"]
    }
  };
}

export function faqSchema(faqList = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a
      }
    }))
  };
}

export function productSchema(origin, imageUrl, path = "/products/light-pole-jack/") {
  const specs = baseline.product.specifications;
  const reported = baseline.product.manufacturerReportedPerformance;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${baseline.brand.name} ${baseline.product.name}`,
    brand: {
      "@type": "Brand",
      name: baseline.brand.name
    },
    category: "Portable Hydraulic Light Pole Lifter / Crane-Free Pole Erector",
    description: copies.en.summary,
    image: imageUrl,
    ...(origin ? { url: new URL(path, origin).href } : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Applicable light pole height", value: specs.applicablePoleHeightM, unitText: "m" },
      { "@type": "PropertyValue", name: "Rated load", value: specs.ratedLoadKg, unitText: "kg" },
      { "@type": "PropertyValue", name: "Battery voltage", value: specs.batteryVoltageV, unitText: "V" },
      { "@type": "PropertyValue", name: "Total weight", value: specs.totalWeightKg, unitText: "kg" },
      { "@type": "PropertyValue", name: "Hydraulic module weight", value: specs.hydraulicModuleWeightKg, unitText: "kg" },
      { "@type": "PropertyValue", name: "Electrical cabinet weight", value: specs.electricalCabinetWeightKg, unitText: "kg" },
      { "@type": "PropertyValue", name: "Hydraulic module dimensions", value: specs.hydraulicModuleDimensionsMm.join(" × "), unitText: "mm" },
      { "@type": "PropertyValue", name: "Electrical cabinet dimensions", value: specs.electricalCabinetDimensionsMm.join(" × "), unitText: "mm" },
      { "@type": "PropertyValue", name: "Packaging dimensions", value: specs.packagingDimensionsMm.join(" × "), unitText: "mm" },
      { "@type": "PropertyValue", name: "Flange hole span compatibility", value: `${specs.flangeHoleSpanMm[0]}–${specs.flangeHoleSpanMm[1]}`, unitText: "mm" },
      { "@type": "PropertyValue", name: "Anchor bolt compatibility", value: specs.listedAnchorBoltSizes.join(", ") },
      { "@type": "PropertyValue", name: "Lift stroke time", value: reported.liftTimeSeconds, unitText: "s" },
      { "@type": "PropertyValue", name: "Continuous lifts per full charge", value: reported.liftsPerFullCharge },
      { "@type": "PropertyValue", name: "Design service cycles", value: reported.usageCycles }
    ]
  };
}
