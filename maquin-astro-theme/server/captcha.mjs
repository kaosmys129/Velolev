import { randomBytes, createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_SECRET = process.env.CAPTCHA_SECRET || process.env.INQUIRY_HMAC_SECRET || "velolev-inquiry-captcha-secret-salt-2026";
const DEFAULT_MAX_AGE_MS = 10 * 60 * 1000; // 10 分钟有效期

/**
 * 生成动态算术挑战与 HMAC 防伪 Token
 * @param {object} [options]
 * @param {string} [options.secret]
 * @returns {{ question: string, token: string }}
 */
export function generateCaptcha(options = {}) {
  const secret = options.secret || DEFAULT_SECRET;
  
  // 随机生成加法或减法挑战，确保结果为简单正整数
  const isAddition = Math.random() > 0.4;
  let a, b, answer, question;

  if (isAddition) {
    a = Math.floor(Math.random() * 20) + 2; // 2 ~ 21
    b = Math.floor(Math.random() * 15) + 1; // 1 ~ 15
    answer = String(a + b);
    question = `${a} + ${b} = ?`;
  } else {
    a = Math.floor(Math.random() * 20) + 10; // 10 ~ 29
    b = Math.floor(Math.random() * 9) + 1;  // 1 ~ 9
    answer = String(a - b);
    question = `${a} - ${b} = ?`;
  }

  const timestamp = Date.now();
  const nonce = randomBytes(8).toString("hex");
  const payloadToSign = `${timestamp}:${answer}:${nonce}`;
  const hmac = createHmac("sha256", secret).update(payloadToSign).digest("hex");
  const token = `${timestamp}.${nonce}.${hmac}`;

  return { question, token };
}

/**
 * 校验用户提交的验证码答案与防伪 Token
 * @param {string|number} answer
 * @param {string} token
 * @param {object} [options]
 * @param {string} [options.secret]
 * @param {number} [options.maxAgeMs]
 * @returns {boolean}
 */
export function verifyCaptcha(answer, token, options = {}) {
  if (typeof token !== "string" || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [tsStr, nonce, receivedHmac] = parts;
  const timestamp = Number(tsStr);
  if (!Number.isSafeInteger(timestamp)) return false;

  // 时间窗口校验：默认 10 分钟过期，允许最多 60 秒时钟偏差
  const maxAge = options.maxAgeMs ?? DEFAULT_MAX_AGE_MS;
  const now = Date.now();
  if (now - timestamp > maxAge || timestamp > now + 60000) {
    return false;
  }

  // 答案清洗与格式化校验
  if (answer === null || answer === undefined) return false;
  const cleanAnswer = String(answer).trim();
  if (!cleanAnswer) return false;

  const secret = options.secret || DEFAULT_SECRET;
  const payloadToSign = `${timestamp}:${cleanAnswer}:${nonce}`;
  const expectedHmac = createHmac("sha256", secret).update(payloadToSign).digest("hex");

  try {
    const a = Buffer.from(receivedHmac, "hex");
    const b = Buffer.from(expectedHmac, "hex");
    if (a.length !== b.length || a.length !== 32) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
