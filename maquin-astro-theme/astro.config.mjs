import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { defaultLocale, locales } from "./src/i18n/config";
import {
  publicOrigin as resolvePublicOrigin,
  siteRedirects as aliases,
  pageKeyForPath,
  coreAlternates,
  articleAlternates,
} from "./src/lib/site-config.mjs";

const publicOrigin = resolvePublicOrigin();

export default defineConfig({
  output: "static",
  // 优先使用已配置的正式域名；若在预览环境显式清空 PUBLIC_SITE_URL，则回落到 .invalid 仅预览模式
  site: publicOrigin || "https://volvet.invalid",
  trailingSlash: "always",
  // i18n: 英文默认站位于根路径（无前缀），其余语言使用 /es/ /fr/ ... 前缀。
  // 语言切换与 hreflang 交叉链接由 ProcurementLayout 注入；sitemap 仍逐语言列出独立 URL。
  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: { prefixDefaultLocale: false },
  },
  redirects: Object.fromEntries(Object.entries(aliases).map(([from,to])=>[from.replace(/\/$/,""),to])),
  integrations: [
    ...(publicOrigin ? [sitemap({
      // 排除：本地内容后台、404、旧重定向页、/en 别名——这些不应进入 sitemap
      filter: (page) =>
        !page.includes("/admin/") &&
        !page.includes("/404") &&
        !page.includes("/equipment-detail/") &&
        !Object.hasOwn(aliases,new URL(page).pathname) &&
        !page.includes("/en/"),
      serialize(item) {
        const urlObj = new URL(item.url);
        const pathname = urlObj.pathname;
        const origin = urlObj.origin;
        const key = pageKeyForPath(pathname);
        let links = [];
        if (key) {
          const alts = coreAlternates(key);
          const enAlt = alts.find((a) => a.lang === "en");
          links = [
            ...alts.map((a) => ({ lang: a.lang, url: `${origin}${a.path}` })),
            ...(enAlt ? [{ lang: "x-default", url: `${origin}${enAlt.path}` }] : []),
          ];
        } else if (pathname.includes("/guides/")) {
          const slug = pathname.split("/guides/")[1]?.replace(/\/$/, "");
          if (slug) {
            const alts = articleAlternates(slug);
            const enAlt = alts.find((a) => a.lang === "en");
            links = [
              ...alts.map((a) => ({ lang: a.lang, url: `${origin}${a.path}` })),
              ...(enAlt ? [{ lang: "x-default", url: `${origin}${enAlt.path}` }] : []),
            ];
          }
        }
        return {
          ...item,
          lastmod: new Date("2026-10-28T00:00:00.000Z").toISOString(),
          ...(links.length ? { links } : {}),
        };
      },
    })] : []),
  ],
  server: {
    host: "0.0.0.0",
  },
});
