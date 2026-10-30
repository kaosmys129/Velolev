import { createHash } from "node:crypto";

export class InquiryError extends Error {
  constructor(status, code, message, fields = {}) { super(message); this.status = status; this.code = code; this.fields = fields; }
}
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_BODY_BYTES = 6 * 1024 * 1024;
export const LOCALES = ["en", "es", "fr", "pt", "vi", "th", "id"];
export const TYPES = ["project", "distributor", "support", "privacy"];
export const APPLICATIONS = ["street-lighting", "solar-lighting", "parking-campus", "other", "not-sure"];

function field(value, max = 200) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").slice(0, max + 1);
}

export function validateInquiry(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new InquiryError(400,"invalid_payload","Invalid request.");
  if (field(input.website)) throw new InquiryError(422,"invalid_submission","Please review your submission.");
  const errors = {};
  const data = {
    name: field(input.name, 100), company: field(input.company, 160), email: field(input.email, 254),
    phone: field(input.phone, 50), country: field(input.country, 80),
    inquiryType: TYPES.includes(input.inquiryType) ? input.inquiryType : "project",
    application: APPLICATIONS.includes(input.application) ? input.application : "not-sure",
    quantity: field(input.quantity, 10), poleHeight: field(input.poleHeight, 40), poleWeight: field(input.poleWeight, 40),
    foundation: field(input.foundation, 1000), message: field(input.message, 4000),
    locale: LOCALES.includes(input.locale) ? input.locale : "en",
    sourcePage: field(input.sourcePage, 300), consent: input.consent === true || input.consent === "true",
    attribution: {}
  };
  if (data.name.length < 2 || data.name.length > 100) errors.name = "Enter your name (2–100 characters).";
  if (data.company.length > 160) errors.company = "Keep the company name within 160 characters.";
  if (!data.email && !data.phone) errors.email = "Provide an email address or phone number.";
  if (data.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)) errors.email = "Enter a valid email address.";
  if (data.phone && (!/^[+\d\s().-]{6,50}$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 6)) errors.phone = "Enter a valid phone number.";
  if (data.country.length < 2 || data.country.length > 80) errors.country = "Enter your country or delivery destination.";
  if (data.quantity && (!/^\d{1,6}$/.test(data.quantity) || Number(data.quantity) < 1)) errors.quantity = "Use a positive whole number or leave this blank.";
  for (const k of ["poleHeight","poleWeight"]) if (data[k] && (!/^\d{1,5}(?:\.\d{1,2})?$/.test(data[k]) || Number(data[k]) <= 0)) errors[k] = "Use a positive number or leave this blank if unknown.";
  if (data.foundation.length > 1000) errors.foundation = "Keep foundation notes within 1,000 characters.";
  if (data.message.length > 4000) errors.message = "Keep project notes within 4,000 characters.";
  if (!data.consent) errors.consent = "Confirm that we may use these details to handle your request.";
  if (!data.sourcePage.startsWith("/") || data.sourcePage.startsWith("//")) data.sourcePage = "/quote/";
  data.sourcePage = data.sourcePage.split(/[?#]/)[0];
  if (input.attribution && typeof input.attribution === "object") {
    for (const k of ["utm_source","utm_medium","utm_campaign"]) {
      const value = field(input.attribution[k], 100);
      if (value && !/@|https?:|[\r\n]/i.test(value)) data.attribution[k] = value;
    }
  }
  if (Object.keys(errors).length) throw new InquiryError(422,"validation_failed","Please check the highlighted fields.",errors);
  return data;
}

export function validateAttachment(file) {
  if (!file || !file.name || !file.bytes?.length) return null;
  const bytes = Buffer.from(file.bytes);
  if (bytes.length > MAX_FILE_BYTES) throw new InquiryError(413,"file_too_large","The attachment must be 5 MB or smaller.",{attachment:"Choose a file of 5 MB or less."});
  const name = String(file.name).replace(/[\x00-\x1f\x7f/\\]/g,"_").slice(0,160);
  const ext = name.split(".").pop().toLowerCase();
  const pdf = bytes.subarray(0,5).toString() === "%PDF-";
  const png = bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const type = pdf && ext === "pdf" ? "application/pdf" : png && ext === "png" ? "image/png" : jpg && ["jpg","jpeg"].includes(ext) ? "image/jpeg" : null;
  if (!type || (file.type && file.type !== type)) throw new InquiryError(422,"invalid_file","Use a PDF, JPG or PNG attachment.",{attachment:"The file type or content is not supported."});
  return {name,type,bytes,size:bytes.length,sha256:createHash("sha256").update(bytes).digest("hex")};
}

export function validateIdempotencyKey(key) {
  if (typeof key !== "string" || !/^[a-zA-Z0-9_-]{16,100}$/.test(key)) throw new InquiryError(400,"invalid_idempotency_key","A request identifier is required.");
  return key;
}
