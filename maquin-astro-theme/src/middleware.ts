import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (context.url.pathname === "/404/" || context.url.pathname === "/404") {
    return new Response(response.body, {
      status: 200,
      statusText: "OK",
      headers: response.headers,
    });
  }
  return response;
});
