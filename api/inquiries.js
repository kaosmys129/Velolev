// Vercel Serverless Function: /api/inquiries
// 用于线上处理海外 B2B 询盘提交，生成收据凭证，并支持邮件通知

import { randomBytes } from "node:crypto";

export const config = {
  api: {
    bodyParser: false // 支持解析 multipart/form-data
  }
};

export default async function handler(req, res) {
  // 设置安全响应头
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Idempotency-Key");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: { code: "method_not_allowed", message: "Only POST requests are supported." }
    });
  }

  try {
    // 读取原始请求体
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBuffer = Buffer.concat(chunks);
    const contentType = req.headers["content-type"] || "";

    let name = "";
    let email = "";
    let phone = "";
    let country = "";
    let message = "";
    let locale = "en";
    let isTest = false;

    if (contentType.includes("application/json")) {
      const data = JSON.parse(rawBuffer.toString("utf8"));
      name = data.name || "";
      email = data.email || "";
      phone = data.phone || "";
      country = data.country || "";
      message = data.message || "";
      locale = data.locale || "en";
      isTest = Boolean(data.isTest || name.includes("TEST") || message.includes("TEST ONLY"));
    } else {
      // 兼容解析 multipart 或 urlencoded
      const text = rawBuffer.toString("latin1");
      const extract = (key) => {
        const regex = new RegExp(`name="${key}"(?:\\r?\\n)+([^\\r\\n-]+)`, "i");
        const match = text.match(regex);
        return match ? match[1].trim() : "";
      };
      name = extract("name");
      email = extract("email");
      phone = extract("phone");
      country = extract("country");
      message = extract("message");
      locale = extract("locale") || "en";
      isTest = Boolean(name.includes("TEST") || message.includes("TEST ONLY"));
    }

    // 校验必填联系方式（至少提供 email 或 phone 之一）
    if (!email && !phone) {
      return res.status(400).json({
        error: {
          code: "validation_failed",
          message: "Please provide an email or phone number.",
          fields: { email: "Provide an email address or phone number." }
        }
      });
    }

    // 生成业务唯一凭证
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = randomBytes(3).toString("hex").toUpperCase();
    const reference = `INQ-${dateStr}-${randomSuffix}`;

    const receipt = {
      status: "received",
      reference,
      receivedAt: now.toISOString(),
      destination: country || "unspecified",
      locale,
      isTest
    };

    // 如果配置了 Resend，异步发送邮件通知给管理员
    if (process.env.RESEND_API_KEY && process.env.ADMIN_NOTIFICATION_EMAIL && !isTest) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "velolev <inquiries@velolev.org>",
          to: [process.env.ADMIN_NOTIFICATION_EMAIL],
          subject: `[velolev] New B2B Inquiry: ${reference} (${country || "Global"})`,
          text: `A new inquiry has been received:\n\nReference: ${reference}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\nMessage: ${message}\nLocale: ${locale}\nTime: ${now.toISOString()}`
        })
      }).catch(err => console.error("Resend notify error:", err));
    }

    return res.status(201).json({ receipt });
  } catch (err) {
    console.error("Inquiry handler error:", err);
    return res.status(500).json({
      error: { code: "internal_error", message: "Failed to process inquiry." }
    });
  }
}
