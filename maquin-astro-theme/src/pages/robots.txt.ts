import { publicOrigin } from "../lib/site-config.mjs";

/**
 * 生成站点 robots.txt：配置正式域名后放行主流搜索与 AI 检索爬虫，并附带规范站点地图入口。
 */
export function GET() {
  const origin = publicOrigin();
  const cleanOrigin = origin ? origin.replace(/\/$/, "") : null;
  const allowedAgents = ["*", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "GPTBot"];
  const body = cleanOrigin
    ? `${allowedAgents
        .map((agent) => `User-agent: ${agent}\nAllow: /\nDisallow: /admin/\nDisallow: /404.html`)
        .join("\n\n")}\n\nSitemap: ${cleanOrigin}/sitemap-index.xml\n`
    : "User-agent: *\nDisallow: /\n# Preview only: the approved volvet domain is pending configuration.\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
