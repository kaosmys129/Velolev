import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EmailService } from "./email-service.mjs";
import { SubscriptionStore } from "./subscription-store.mjs";
import {
  renderInquiryAdminEmail,
  renderInquiryCustomerEmail,
  renderSubscriptionWelcomeEmail,
  renderEdmEmail
} from "./email-templates.mjs";
import { createInquiryServer } from "./inquiry-server.mjs";
import { validateSubscription } from "./inquiry-validation.mjs";

function tempWorkspace(t) {
  const dir = mkdtempSync(join(tmpdir(), "velolev-email-test-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test("email templates render valid industrial layout with escaped parameters", () => {
  const dummyInquiry = {
    reference: "VOL-20261030-TEST1234",
    name: "John & Sons <Engineering>",
    company: "Road Infra Ltd",
    email: "john@example.com",
    phone: "+1 555 123 4567",
    country: "Australia",
    inquiryType: "project",
    application: "street-lighting",
    quantity: "25",
    poleHeight: "10",
    poleWeight: "180",
    foundation: "4-hole bolt circle 220mm",
    message: "Need project quotation for 25 poles in Melbourne.",
    sourcePage: "/quote/",
    attachment: { name: "specs.pdf", size: 102400 }
  };

  // 1. 管理员通知邮件
  const adminMail = renderInquiryAdminEmail(dummyInquiry);
  assert.match(adminMail.subject, /VOL-20261030-TEST1234/);
  assert.match(adminMail.html, /John &amp; Sons &lt;Engineering&gt;/);
  assert.match(adminMail.html, /specs\.pdf/);
  assert.match(adminMail.text, /Melbourne/);

  // 2. 客户确认邮件
  const customerMail = renderInquiryCustomerEmail(dummyInquiry);
  assert.match(customerMail.subject, /Inquiry Receipt Confirmation/);
  assert.match(customerMail.html, /VOL-20261030-TEST1234/);
  assert.match(customerMail.html, /Australia/);
  assert.match(customerMail.text, /What happens next/);

  // 3. 订阅欢迎邮件
  const welcomeMail = renderSubscriptionWelcomeEmail(
    { email: "contractor@example.com" },
    { unsubscribeUrl: "https://www.velolev.org/api/unsubscribe?email=contractor@example.com" }
  );
  assert.match(welcomeMail.subject, /Welcome to velolev/);
  assert.match(welcomeMail.html, /contractor@example\.com/);
  assert.match(welcomeMail.html, /api\/unsubscribe/);

  // 4. EDM 邮件
  const edmMail = renderEdmEmail(
    {
      title: "Zero-Crane Lifting Bulletin",
      lead: "Key benchmarks for municipal street lighting.",
      bodyHtml: "<p>Comprehensive test telemetry.</p>",
      ctaText: "Download Whitepaper",
      ctaUrl: "https://www.velolev.org/guides/"
    },
    { email: "buyer@example.com" },
    { unsubscribeUrl: "https://www.velolev.org/api/unsubscribe" }
  );
  assert.equal(edmMail.subject, "Zero-Crane Lifting Bulletin");
  assert.match(edmMail.html, /Zero-Crane Lifting Bulletin/);
  assert.match(edmMail.html, /Download Whitepaper/);
  assert.match(edmMail.html, /api\/unsubscribe/);
});

test("subscription validation ensures strict format and honey-pot security", () => {
  // 合法邮箱
  const valid = validateSubscription({ email: "buyer@project.com", locale: "en", sourcePage: "/resources/" });
  assert.equal(valid.email, "buyer@project.com");
  assert.equal(valid.locale, "en");
  assert.equal(valid.sourcePage, "/resources/");

  // 格式错误
  assert.throws(() => validateSubscription({ email: "invalid-email" }), (err) => err.code === "validation_failed");

  // 蜜罐拦截
  assert.throws(() => validateSubscription({ email: "bot@test.com", website: "https://spam.com" }), (err) => err.code === "invalid_submission");
});

test("subscription store persists subscribers, prevents duplicates and handles unsubscribe", (t) => {
  const dir = tempWorkspace(t);
  const store = new SubscriptionStore(dir);

  // 1. 新订阅
  const r1 = store.subscribe({ email: "procurement@epc.com", locale: "en", country: "Canada" });
  assert.equal(r1.status, "active");
  assert.equal(r1.isNew, true);
  assert.equal(store.isSubscribed("procurement@epc.com"), true);
  assert.equal(store.totalActive(), 1);

  // 2. 重复订阅 (幂等)
  const r2 = store.subscribe({ email: "procurement@epc.com" });
  assert.equal(r2.status, "active");
  assert.equal(r2.isNew, false);
  assert.equal(store.totalActive(), 1);

  // 3. 退订
  const un = store.unsubscribe("procurement@epc.com");
  assert.equal(un.changed, true);
  assert.equal(store.isSubscribed("procurement@epc.com"), false);
  assert.equal(store.totalActive(), 0);

  // 4. 再次订阅 (激活恢复)
  const r3 = store.subscribe({ email: "procurement@epc.com" });
  assert.equal(r3.status, "resubscribed");
  assert.equal(store.isSubscribed("procurement@epc.com"), true);
  assert.equal(store.totalActive(), 1);

  store.close();
});

test("email service operates in mock mode without api key and triggers inquiry notifications", async (t) => {
  const logs = [];
  const service = new EmailService({
    apiKey: null,
    testMode: true,
    logger: { info: (msg) => logs.push(msg), error: () => {}, warn: () => {} }
  });

  const status = service.getStatus();
  assert.equal(status.configured, false);
  assert.equal(status.provider, "mock");

  // 发送询盘邮件
  const result = await service.sendInquiryNotifications({
    reference: "VOL-20261030-MOCK0001",
    name: "Alex",
    company: "Lighting Corp",
    email: "alex@example.com",
    country: "Singapore",
    inquiryType: "project"
  });

  assert.equal(result.admin.success, true);
  assert.equal(result.admin.mock, true);
  assert.equal(result.customer.success, true);
  assert.equal(result.customer.mock, true);
  assert(logs.some(l => l.includes("VOL-20261030-MOCK0001")));
});

test("inquiry server handles subscribe, unsubscribe and admin subscriber queries", async (t) => {
  const dir = tempWorkspace(t);
  const token = "a".repeat(40);
  const { server, store, subscriptionStore } = createInquiryServer({
    directory: dir,
    adminToken: token,
    testMode: true
  });

  t.after(() => {
    store.close();
    subscriptionStore.close();
  });

  const port = await new Promise((res) => server.listen(0, "127.0.0.1", () => res(server.address().port)));
  t.after(() => new Promise((res) => server.close(res)));

  const base = `http://127.0.0.1:${port}`;

  // 1. 订阅 API
  const subRes = await fetch(`${base}/api/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test-user@example.com", locale: "en", country: "US" })
  });
  assert.equal(subRes.status, 200);
  const subJson = await subRes.json();
  assert.equal(subJson.status, "subscribed");
  assert.equal(subJson.email, "test-user@example.com");

  // 2. 检查订阅状态已写入
  assert.equal(subscriptionStore.isSubscribed("test-user@example.com"), true);

  // 3. 管理员读取订阅列表
  const adminRes = await fetch(`${base}/api/admin/subscribers`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  assert.equal(adminRes.status, 200);
  const adminData = await adminRes.json();
  assert.equal(adminData.total, 1);
  assert.equal(adminData.items[0].email, "test-user@example.com");

  // 4. 管理员导出订阅 CSV
  const csvRes = await fetch(`${base}/api/admin/subscribers.csv`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  assert.equal(csvRes.status, 200);
  const csvText = await csvRes.text();
  assert.match(csvText, /test-user@example\.com/);

  // 5. 退订 API (POST)
  const unsubRes = await fetch(`${base}/api/unsubscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test-user@example.com" })
  });
  assert.equal(unsubRes.status, 200);
  assert.equal(subscriptionStore.isSubscribed("test-user@example.com"), false);

  // 6. 退订页面 (GET)
  const unsubPageRes = await fetch(`${base}/api/unsubscribe?email=test-user@example.com`, {
    headers: { Accept: "text/html" }
  });
  assert.equal(unsubPageRes.status, 200);
  const unsubHtml = await unsubPageRes.text();
  assert.match(unsubHtml, /Unsubscribed Successfully/);
});
