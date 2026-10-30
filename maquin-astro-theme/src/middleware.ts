import { defineMiddleware } from "astro:middleware";
import {siteRedirects} from "./lib/site-config.mjs";

// Astro dev and the inquiry server share the same terminal redirect registry.
export const onRequest = defineMiddleware(async (context, next) => {
  const path=context.url.pathname.endsWith("/")?context.url.pathname:context.url.pathname+"/";
  const target=siteRedirects[path];
  if(target)return context.redirect(target+context.url.search,301);
  return next();
});
