import {publicOrigin} from "../lib/site-config.mjs";
export function GET() {
  const origin = publicOrigin();
  const body = origin
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /404.html\nSitemap: ${origin.replace(/\/$/, "")}/sitemap-index.xml\n`
    : "User-agent: *\nDisallow: /\n# Preview only: the approved volvet domain is pending configuration.\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
