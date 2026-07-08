import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(here);
const workspaceRoot = dirname(projectRoot);
const sourceRoot = join(workspaceRoot, "maquin-static-html");
const fragmentRoot = join(projectRoot, "src", "fragments");
const dataFile = join(projectRoot, "src", "data", "routes.ts");

const routeKinds = new Map([
  ["", "page"],
  ["about-us", "page"],
  ["project", "page"],
  ["equipment", "page"],
  ["equipment-detail", "page"],
  ["pricing-plan", "page"],
  ["team", "page"],
  ["faq", "page"],
  ["contact-us", "page"],
  ["blog", "template"],
  ["404", "template"],
  ["eco-friendly-heavy-equipment-maintaining-machines-in-a-sustainable-way", "post"],
  ["essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency-2", "post"],
  ["flexible-project-management-how-renting-equipment-boosts-productivity", "post"],
  ["the-importance-of-regular-inspections-for-heavy-machinery", "post"],
  ["maximizing-roi-through-proper-care-and-rental-management-of-heavy-machines", "post"],
  ["essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency", "post"],
]);

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function listRouteFiles() {
  const files = [join(sourceRoot, "index.html")];
  for (const entry of readdirSync(sourceRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const file = join(sourceRoot, slug, "index.html");
    if (routeKinds.has(slug)) files.push(file);
  }
  return files;
}

function slugFromFile(file) {
  const rel = relative(sourceRoot, file);
  return rel === "index.html" ? "" : rel.replace(/\/index\.html$/, "");
}

function extractBetween(source, startPattern, endPattern, label) {
  const start = source.search(startPattern);
  const end = source.search(endPattern);
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Unable to extract ${label}`);
  }
  return source.slice(start, end);
}

function findMatchingDiv(source, start) {
  let cursor = start;
  let depth = 0;
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = start;
  while (true) {
    const match = tagPattern.exec(source);
    if (!match) throw new Error("Unable to find matching div");
    if (match[0].startsWith("</")) {
      depth -= 1;
      if (depth === 0) return tagPattern.lastIndex;
    } else {
      depth += 1;
    }
    cursor = tagPattern.lastIndex;
  }
}

function extractPageParts(source) {
  const head = extractBetween(source, /<head[^>]*>/i, /<\/head>/i, "head")
    .replace(/^<head[^>]*>/i, "");
  const bodyMatch = source.match(/<body([^>]*)>/i);
  if (!bodyMatch) throw new Error("Missing body tag");
  const bodyClass = (bodyMatch[1].match(/\bclass="([^"]*)"/) || [])[1] || "";
  const bodyStart = source.indexOf(bodyMatch[0]) + bodyMatch[0].length;
  const bodyEnd = source.search(/<\/body>/i);
  const body = source.slice(bodyStart, bodyEnd);

  const headerStart = body.indexOf('<div data-elementor-type="header"');
  const footerStart = body.indexOf('<div data-elementor-type="footer"');
  if (headerStart === -1 || footerStart === -1) {
    throw new Error("Missing Elementor header or footer");
  }
  const headerEnd = findMatchingDiv(body, headerStart);
  const footerEnd = findMatchingDiv(body, footerStart);

  return {
    head,
    bodyClass,
    preHeader: body.slice(0, headerStart),
    header: body.slice(headerStart, headerEnd),
    content: body.slice(headerEnd, footerStart),
    footer: body.slice(footerStart, footerEnd),
    scripts: body.slice(footerEnd),
  };
}

function activeNavForSlug(slug) {
  if (slug === "") return "home";
  if (slug === "about-us" || slug === "team") return "about";
  if (slug === "equipment" || slug === "equipment-detail" || slug === "pricing-plan") return "equipment";
  if (slug === "contact-us") return "contact";
  if (slug === "project" || slug === "faq" || slug === "blog" || slug === "404" || routeKinds.get(slug) === "post") return "pages";
  return "none";
}

function safeName(slug, suffix) {
  const base = slug === "" ? "home" : slug;
  return `${base}/${suffix}.html`;
}

function cleanStaticUrls(html) {
  return html.replace(
    /(\.(?:css|js|png|jpg|jpeg|gif|woff|woff2|svg))(%3F|\?)[^"'()\s>]+/g,
    '$1'
  );
}

function writeFragment(name, html) {
  const target = join(fragmentRoot, name);
  ensureDir(dirname(target));
  writeFileSync(target, cleanStaticUrls(html));
}

function jsString(value) {
  return JSON.stringify(value);
}

ensureDir(fragmentRoot);

const routes = [];
for (const file of listRouteFiles()) {
  const slug = slugFromFile(file);
  const source = readFileSync(file, "utf-8");
  const parts = extractPageParts(source);
  const title = (parts.head.match(/<title>(.*?)<\/title>/is) || [])[1]?.trim() || "maquin";

  const fragments = {
    headFragment: safeName(slug, "head"),
    preHeaderFragment: safeName(slug, "pre-header"),
    headerFragment: safeName(slug, "header"),
    contentFragment: safeName(slug, "content"),
    footerFragment: safeName(slug, "footer"),
    scriptsFragment: safeName(slug, "scripts"),
  };

  writeFragment(fragments.headFragment, parts.head);
  writeFragment(fragments.preHeaderFragment, parts.preHeader);
  writeFragment(fragments.headerFragment, parts.header);
  writeFragment(fragments.contentFragment, parts.content);
  writeFragment(fragments.footerFragment, parts.footer);
  writeFragment(fragments.scriptsFragment, parts.scripts);

  routes.push({
    slug,
    title,
    bodyClass: parts.bodyClass,
    kind: routeKinds.get(slug) || "page",
    activeNav: activeNavForSlug(slug),
    ...fragments,
  });
}

routes.sort((a, b) => {
  if (a.slug === "") return -1;
  if (b.slug === "") return 1;
  return a.slug.localeCompare(b.slug);
});

const routeLiteral = routes
  .map((route) => `  {
    slug: ${jsString(route.slug)},
    title: ${jsString(route.title)},
    bodyClass: ${jsString(route.bodyClass)},
    kind: ${jsString(route.kind)},
    activeNav: ${jsString(route.activeNav)},
    headFragment: ${jsString(route.headFragment)},
    preHeaderFragment: ${jsString(route.preHeaderFragment)},
    headerFragment: ${jsString(route.headerFragment)},
    contentFragment: ${jsString(route.contentFragment)},
    footerFragment: ${jsString(route.footerFragment)},
    scriptsFragment: ${jsString(route.scriptsFragment)},
  }`)
  .join(",\n");

writeFileSync(
  dataFile,
  `export type ThemeRoute = {
  slug: string;
  title: string;
  bodyClass: string;
  kind: "page" | "post" | "template";
  activeNav: "home" | "about" | "equipment" | "contact" | "pages" | "none";
  headFragment: string;
  preHeaderFragment: string;
  headerFragment: string;
  contentFragment: string;
  footerFragment: string;
  scriptsFragment: string;
};

export const routes: ThemeRoute[] = [
${routeLiteral}
];

export function getRoute(slug = ""): ThemeRoute {
  const normalized = slug.replace(/^\\/+|\\/+$/g, "");
  const route = routes.find((item) => item.slug === normalized);
  if (!route) {
    throw new Error(\`Unknown route: \${slug}\`);
  }
  return route;
}
`
);

console.log(`Generated ${routes.length} Astro routes from ${sourceRoot}`);
