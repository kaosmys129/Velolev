// Vercel Serverless Function: /api/captcha
// 动态生成算术安全验证码与防伪 Token

import { generateCaptcha } from "../maquin-astro-theme/server/captcha.mjs";

export default function handler(req, res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      error: { code: "method_not_allowed", message: "Only GET requests are supported." }
    });
  }

  try {
    const challenge = generateCaptcha();
    return res.status(200).json(challenge);
  } catch (err) {
    console.error("Captcha generation error:", err);
    return res.status(500).json({
      error: { code: "internal_error", message: "Failed to generate captcha." }
    });
  }
}
