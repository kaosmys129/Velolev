// Vercel Serverless Function: /api/inquiry-status
export default function handler(req, res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-cache");
  return res.status(200).json({
    receiving: true,
    delivery: "serverless_inbox",
    emailNotification: Boolean(process.env.RESEND_API_KEY) ? "resend" : "not_configured",
    testMode: false
  });
}
