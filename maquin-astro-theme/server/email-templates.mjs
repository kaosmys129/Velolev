/**
 * volvet 工业机械 - Resend 邮件服务 HTML 与纯文本模板
 * 遵循 B2B 工业采购设计语言 (Warm Sand, Carbon Ink, Industrial Yellow)
 */

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 基础邮件框架 (表格布局兼容各种邮件客户端)
 */
function baseLayout({ title, previewText, content, unsubscribeUrl = null }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f3ef;
      color: #1d201e;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f4f3ef;
      padding-top: 30px;
      padding-bottom: 40px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #dcdfd5;
      border-radius: 2px;
    }
    .header-bar {
      background-color: #1d201e;
      padding: 20px 32px;
      border-bottom: 4px solid #f4cc3d;
    }
    .logo-text {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
      text-decoration: none;
    }
    .logo-badge {
      display: inline-block;
      background-color: #f4cc3d;
      color: #1d201e;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 2px;
      margin-left: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .content-cell {
      padding: 36px 32px;
    }
    h1 {
      margin: 0 0 16px 0;
      font-size: 22px;
      line-height: 1.3;
      color: #1d201e;
      font-weight: 700;
    }
    h2 {
      margin: 24px 0 12px 0;
      font-size: 16px;
      color: #1d201e;
      border-bottom: 1px solid #e3e6dc;
      padding-bottom: 6px;
    }
    p {
      margin: 0 0 16px 0;
      font-size: 14px;
      line-height: 1.6;
      color: #3b423d;
    }
    .field-table {
      width: 100%;
      margin: 20px 0;
      border: 1px solid #e5e8de;
      border-collapse: collapse;
    }
    .field-table td {
      padding: 10px 14px;
      font-size: 13px;
      border-bottom: 1px solid #e5e8de;
      vertical-align: top;
    }
    .field-label {
      width: 32%;
      background-color: #f8f9f5;
      font-weight: 600;
      color: #555e56;
    }
    .field-value {
      color: #1d201e;
    }
    .reference-box {
      background-color: #f3f6ec;
      border-left: 4px solid #f4cc3d;
      padding: 16px;
      margin: 20px 0;
    }
    .reference-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 17px;
      font-weight: 700;
      color: #1d201e;
    }
    .btn {
      display: inline-block;
      background-color: #f4cc3d;
      color: #1d201e;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 2px;
      margin-top: 10px;
    }
    .footer-cell {
      background-color: #202622;
      color: #a4aca1;
      padding: 24px 32px;
      font-size: 12px;
      line-height: 1.6;
    }
    .footer-cell a {
      color: #d1d7cc;
      text-decoration: underline;
    }
    .test-badge {
      background-color: #d9534f;
      color: #ffffff;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: bold;
      border-radius: 2px;
      display: inline-block;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${escapeHtml(previewText || title)}
  </div>
  <table role="presentation" class="wrapper">
    <tr>
      <td align="center">
        <table role="presentation" class="container">
          <tr>
            <td class="header-bar">
              <a href="https://www.velolev.org" class="logo-text">volvet</a>
              <span class="logo-badge">Engineering & Procurement</span>
            </td>
          </tr>
          <tr>
            <td class="content-cell">
              ${content}
            </td>
          </tr>
          <tr>
            <td class="footer-cell">
              <p style="margin:0 0 8px 0;color:#e1e5dc;font-weight:600;">volvet | Portable Pole Lifter & Heavy Jacking Systems</p>
              <p style="margin:0 0 8px 0;">This email was sent by the volvet B2B project notification system.</p>
              ${unsubscribeUrl ? `<p style="margin:8px 0 0 0;"><a href="${escapeHtml(unsubscribeUrl)}">Unsubscribe from these emails</a> | <a href="https://www.velolev.org/privacy/">Privacy Policy</a></p>` : `<p style="margin:8px 0 0 0;"><a href="https://www.velolev.org/privacy/">Privacy Policy</a> | <a href="https://www.velolev.org/terms/">Terms of Service</a></p>`}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. 询盘管理员通知邮件模板 (Inquiry Admin Notification)
 */
export function renderInquiryAdminEmail(inquiry, { publicOrigin = "https://www.velolev.org" } = {}) {
  const isTest = Boolean(inquiry.isTest);
  const title = `${isTest ? "[TEST] " : ""}[New Inquiry] ${inquiry.reference} - ${inquiry.company || inquiry.name} (${inquiry.country || "Global"})`;
  const previewText = `New project inquiry received from ${inquiry.name} (${inquiry.company || "Independent"}). Reference: ${inquiry.reference}`;

  const adminUrl = `${publicOrigin.replace(/\/$/, "")}/admin/inquiries/`;

  const rows = [
    ["Reference No.", inquiry.reference],
    ["Received At", inquiry.createdAt || new Date().toISOString()],
    ["Status", inquiry.status || "new"],
    ["Contact Name", inquiry.name],
    ["Company", inquiry.company || "—"],
    ["Email", inquiry.email ? `<a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a>` : "—"],
    ["Phone", inquiry.phone || "—"],
    ["Destination / Country", inquiry.country],
    ["Inquiry Type", inquiry.inquiryType || "project"],
    ["Application", inquiry.application || "not-sure"],
    ["Quantity", inquiry.quantity ? `${inquiry.quantity} unit(s)` : "—"],
    ["Pole Height", inquiry.poleHeight ? `${inquiry.poleHeight} m` : "—"],
    ["Pole Weight", inquiry.poleWeight ? `${inquiry.poleWeight} kg` : "—"],
    ["Foundation / Base Flange", inquiry.foundation || "—"],
    ["Source Page", inquiry.sourcePage || "/quote/"],
    ["Language / Locale", inquiry.locale || "en"]
  ];

  if (inquiry.attachment) {
    rows.push(["Attachment", `${escapeHtml(inquiry.attachment.name)} (${Math.round((inquiry.attachment.size || 0) / 1024)} KB)`]);
  }

  const tableHtml = `
    <table class="field-table" role="presentation">
      ${rows.map(([label, val]) => `
        <tr>
          <td class="field-label">${escapeHtml(label)}</td>
          <td class="field-value">${val && String(val).startsWith("<") ? val : escapeHtml(val)}</td>
        </tr>
      `).join("")}
    </table>
  `;

  const content = `
    ${isTest ? '<div class="test-badge">SANDBOX TEST INQUIRY - NOT A PRODUCTION LEAD</div>' : ""}
    <h1>New Project Inquiry Recorded</h1>
    <p>A new customer inquiry has been logged into the private inbox. Please inspect project parameters and arrange technical verification:</p>
    
    <div class="reference-box">
      <div style="font-size:12px;color:#5c665d;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Inquiry Reference</div>
      <div class="reference-code">${escapeHtml(inquiry.reference)}</div>
    </div>

    ${tableHtml}

    <h2>Project Message & Scope</h2>
    <div style="background-color:#fbfcf9;border:1px solid #e2e5dc;padding:16px;border-radius:2px;margin-bottom:24px;">
      <p style="margin:0;white-space:pre-wrap;font-size:13px;line-height:1.7;">${escapeHtml(inquiry.message || "No additional project notes provided.")}</p>
    </div>

    <p style="margin-top:24px;">
      <a href="${escapeHtml(adminUrl)}" class="btn">Open Private Admin Inbox →</a>
    </p>
  `;

  const html = baseLayout({
    title,
    previewText,
    content
  });

  const text = `[NEW INQUIRY] ${inquiry.reference}
======================================================
Reference: ${inquiry.reference}
Received: ${inquiry.createdAt || new Date().toISOString()}
Customer: ${inquiry.name} (${inquiry.company || "Independent"})
Email: ${inquiry.email || "N/A"}
Phone: ${inquiry.phone || "N/A"}
Country: ${inquiry.country}
Inquiry Type: ${inquiry.inquiryType}
Application: ${inquiry.application}
Quantity: ${inquiry.quantity || "N/A"}
Pole Specs: ${inquiry.poleHeight ? inquiry.poleHeight + 'm' : 'N/A'} / ${inquiry.poleWeight ? inquiry.poleWeight + 'kg' : 'N/A'}
Foundation: ${inquiry.foundation || "N/A"}
Source: ${inquiry.sourcePage || "/quote/"}

Message:
${inquiry.message || "No notes."}

Admin Inbox: ${adminUrl}
`;

  return { subject: title, html, text };
}

/**
 * 2. 客户询盘确认回执邮件模板 (Inquiry Customer Confirmation)
 */
export function renderInquiryCustomerEmail(inquiry, { publicOrigin = "https://www.velolev.org" } = {}) {
  const reference = inquiry.reference;
  const isTest = Boolean(inquiry.isTest);
  const title = `Inquiry Receipt Confirmation: ${reference} | volvet`;
  const previewText = `We have received your project inquiry (${reference}). Our engineering team will review the parameters shortly.`;

  const content = `
    ${isTest ? '<div class="test-badge">TEST MODE RECEIPT</div>' : ""}
    <h1>Thank you for contacting volvet.</h1>
    <p>Dear ${escapeHtml(inquiry.name || "Customer")},</p>
    <p>We have successfully recorded your project inquiry for review. A dedicated reference code has been generated for your technical specification:</p>

    <div class="reference-box">
      <div style="font-size:12px;color:#5c665d;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Your Technical Reference Number</div>
      <div class="reference-code">${escapeHtml(reference)}</div>
    </div>

    <h2>Recorded Specifications Summary</h2>
    <table class="field-table" role="presentation">
      <tr>
        <td class="field-label">Reference</td>
        <td class="field-value">${escapeHtml(reference)}</td>
      </tr>
      <tr>
        <td class="field-label">Application</td>
        <td class="field-value">${escapeHtml(inquiry.application || "General Lifting")}</td>
      </tr>
      <tr>
        <td class="field-label">Destination</td>
        <td class="field-value">${escapeHtml(inquiry.country)}</td>
      </tr>
      ${inquiry.quantity ? `<tr><td class="field-label">Estimated Quantity</td><td class="field-value">${escapeHtml(inquiry.quantity)} units</td></tr>` : ""}
      ${inquiry.poleHeight ? `<tr><td class="field-label">Pole Height</td><td class="field-value">${escapeHtml(inquiry.poleHeight)} m</td></tr>` : ""}
      ${inquiry.poleWeight ? `<tr><td class="field-label">Pole Weight</td><td class="field-value">${escapeHtml(inquiry.poleWeight)} kg</td></tr>` : ""}
    </table>

    <h2>What Happens Next</h2>
    <p>1. <strong>Compatibility & Flange Check</strong>: Our engineering support team reviews your pole specs, foundation requirements, and flange bolt circle dimensions.</p>
    <p>2. <strong>Private Technical Follow-up</strong>: A representative will contact you at <code>${escapeHtml(inquiry.email || inquiry.phone)}</code> with configuration suitability notes, export packing weights, and formal quotations.</p>
    <p>3. <strong>Additional Drawings</strong>: If you have CAD or foundation anchor bolt drawings to verify, you can directly reply to this email.</p>

    <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e6e9df;">
      <p style="font-size:12px;color:#6d776e;line-height:1.6;margin:0;">
        <em>Notice: This confirmation indicates receipt of your project parameters for engineering evaluation. It does not constitute a sales confirmation or purchase commitment until commercial terms are verified.</em>
      </p>
    </div>
  `;

  const html = baseLayout({
    title,
    previewText,
    content
  });

  const text = `Inquiry Receipt Confirmation: ${reference}
======================================================
Dear ${inquiry.name || "Customer"},

Thank you for your project inquiry. We have recorded your submission under reference: ${reference}

Application: ${inquiry.application || "General Lifting"}
Destination: ${inquiry.country}
${inquiry.quantity ? `Quantity: ${inquiry.quantity}\n` : ""}${inquiry.poleHeight ? `Pole Height: ${inquiry.poleHeight}m\n` : ""}${inquiry.poleWeight ? `Pole Weight: ${inquiry.poleWeight}kg\n` : ""}

What happens next:
1. Our engineering support reviews your specifications and base flange parameters.
2. A technical representative will follow up via email or phone with formal review notes.
3. If you have site drawings or foundation photos, you can reply directly to this email.

volvet | Engineering & Procurement Support
https://www.velolev.org
`;

  return { subject: title, html, text };
}

/**
 * 3. 订阅欢迎与确认邮件模板 (Subscription Welcome / Double Opt-in)
 */
export function renderSubscriptionWelcomeEmail(subscriber, { unsubscribeUrl = null, publicOrigin = "https://www.velolev.org" } = {}) {
  const title = "Welcome to volvet Engineering & Equipment Digest";
  const previewText = "You are now subscribed to volvet technical bulletins, equipment benchmarks, and installation guides.";

  const content = `
    <h1>Welcome to volvet Technical Digest</h1>
    <p>Thank you for subscribing with <strong>${escapeHtml(subscriber.email)}</strong>.</p>
    <p>You will receive periodic engineering updates from our heavy equipment team, focused on:</p>

    <div style="background-color:#f7f9f3;border:1px solid #dce1d5;padding:18px 20px;border-radius:2px;margin:20px 0;">
      <ul style="margin:0;padding-left:18px;color:#2c332e;font-size:14px;line-height:1.8;">
        <li><strong>Installation Cost Studies</strong>: Project cost comparisons between crane hire and portable hydraulic lifting across municipal and solar deployments.</li>
        <li><strong>Base Flange Compatibility</strong>: Checklist guidance for 180–260 mm flange hole spans, M16–M24 anchor bolts, and dimensioned drawing review for non-standard bases.</li>
        <li><strong>Jobsite Planning Notes</strong>: Two-module handling (45 kg + 40 kg), 24 V battery preparation, and project-specific site assessment workflows.</li>
        <li><strong>Specification & Validation Updates</strong>: Source-derived specification notes, configuration boundaries, and field-validation progress updates.</li>
      </ul>
    </div>

    <p>You can explore our interactive engineering tools and technical documentation at any time:</p>
    <p>
      <a href="${escapeHtml(publicOrigin)}/tools/roi-calculator/" class="btn">Launch Equipment Cost Calculator →</a>
    </p>

    <p style="font-size:13px;color:#6b756c;margin-top:24px;">
      If you did not request this subscription, you can easily unsubscribe at any time using the link below.
    </p>
  `;

  const html = baseLayout({
    title,
    previewText,
    content,
    unsubscribeUrl
  });

  const text = `Welcome to volvet Technical Digest
======================================================
Thank you for subscribing with ${subscriber.email}.

You will receive periodic engineering bulletins regarding:
- Crane vs. portable lifter cost scenario comparisons
- Base flange compatibility checklists and dimensioned drawing review notes
- Two-module transport (45 kg + 40 kg) and 24 V battery planning notes
- Technical documentation and field validation progress updates

Interactive Cost Calculator: ${publicOrigin}/tools/roi-calculator/

To unsubscribe: ${unsubscribeUrl || `${publicOrigin}/api/unsubscribe?email=${encodeURIComponent(subscriber.email)}`}
`;

  return { subject: title, html, text };
}

/**
 * 4. EDM 营销/技术简报模版 (Industrial EDM Marketing / Technical Bulletin)
 */
export function renderEdmEmail({
  title,
  previewText,
  headline,
  lead,
  bodyHtml,
  ctaText = "Read Technical Whitepaper →",
  ctaUrl = "https://www.velolev.org",
  secondaryHighlights = []
}, recipient, { unsubscribeUrl = null } = {}) {
  const content = `
    <div style="font-size:11px;font-weight:700;color:#859083;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
      volvet Engineering Briefing
    </div>
    <h1>${escapeHtml(headline || title)}</h1>
    ${lead ? `<p style="font-size:15px;line-height:1.6;color:#202521;font-weight:500;margin-bottom:20px;">${escapeHtml(lead)}</p>` : ""}

    <div style="font-size:14px;line-height:1.7;color:#333a35;">
      ${bodyHtml}
    </div>

    ${secondaryHighlights.length > 0 ? `
      <div style="margin:24px 0;border-top:1px solid #e0e4da;padding-top:18px;">
        <h2 style="font-size:15px;color:#1d201e;margin-bottom:12px;">Key Project Takeaways:</h2>
        <ul style="padding-left:20px;margin:0;font-size:13px;line-height:1.8;color:#454f46;">
          ${secondaryHighlights.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    ` : ""}

    ${ctaUrl && ctaText ? `
      <div style="margin:28px 0;">
        <a href="${escapeHtml(ctaUrl)}" class="btn">${escapeHtml(ctaText)}</a>
      </div>
    ` : ""}

    <p style="font-size:12px;color:#7a847b;margin-top:24px;border-top:1px solid #e5e8de;padding-top:14px;">
      This technical bulletin is delivered to verified procurement contacts, engineers, and subscribers (recipient: ${escapeHtml(recipient.email)}).
    </p>
  `;

  const html = baseLayout({
    title,
    previewText: previewText || headline || title,
    content,
    unsubscribeUrl
  });

  const text = `${title}
======================================================
${lead || ""}

${bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}

${ctaText}: ${ctaUrl}

Unsubscribe: ${unsubscribeUrl || "https://www.velolev.org"}
`;

  return { subject: title, html, text };
}
