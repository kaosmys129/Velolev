import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { defaultLocale, locales } from "./src/i18n/config";
import { publicOrigin as resolvePublicOrigin,siteRedirects as aliases } from "./src/lib/site-config.mjs";

const publicOrigin = resolvePublicOrigin();

export default defineConfig({
  output: "static",
  // The real volvet domain is pending confirmation. .invalid is preview-only;
  // no sitemap/canonical is published until an approved origin is configured.
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
    })] : []),
  ],
  server: {
    host: "0.0.0.0",
  },
});
