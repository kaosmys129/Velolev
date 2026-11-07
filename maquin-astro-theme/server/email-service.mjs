/**
 * volvet 工业机械 - Resend 邮件服务核心管理器
 * 统一处理询盘通知、客户确认、订阅欢迎、EDM 营销群发
 */

import { Resend } from "resend";
import {
  renderInquiryAdminEmail,
  renderInquiryCustomerEmail,
  renderSubscriptionWelcomeEmail,
  renderEdmEmail
} from "./email-templates.mjs";

export class EmailService {
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.RESEND_API_KEY || null;
    this.fromEmail = options.fromEmail || process.env.RESEND_FROM_EMAIL || "volvet <notifications@volvet.com>";
    this.adminEmail = options.adminEmail || process.env.ADMIN_NOTIFICATION_EMAIL || "sales@volvet.com";
    this.audienceId = options.audienceId || process.env.RESEND_AUDIENCE_ID || null;
    this.replyTo = options.replyTo || process.env.RESEND_REPLY_TO || "support@volvet.com";
    this.publicOrigin = options.publicOrigin || process.env.PUBLIC_ORIGIN || "https://volvet.com";
    this.logger = options.logger || console;
    this.isTestMode = options.testMode ?? (process.env.NODE_ENV === "test" || !this.apiKey);

    if (this.apiKey) {
      this.resend = new Resend(this.apiKey);
    } else {
      this.resend = null;
    }
  }

  /**
   * 检查邮件服务配置状态
   */
  getStatus() {
    return {
      configured: Boolean(this.apiKey),
      provider: this.apiKey ? "resend" : "mock",
      isTestMode: this.isTestMode,
      fromEmail: this.fromEmail,
      adminEmail: this.adminEmail,
      hasAudience: Boolean(this.audienceId)
    };
  }

  /**
   * 底层单封邮件发送 (支持真实发送与 Mock 降级)
   */
  async sendEmail({ to, subject, html, text, from = null, replyTo = null, attachments = [], tags = [] }) {
    const recipients = Array.isArray(to) ? to : [to];
    const sender = from || this.fromEmail;
    const reply = replyTo || this.replyTo;

    // 如果未配置 API Key 或处于明确的模拟/测试模式，安全走 Mock 记录
    if (!this.resend || this.isTestMode) {
      const mockId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      this.logger.info?.(`[EmailService:Mock] Email sent to: ${recipients.join(", ")}, Subject: "${subject}", ID: ${mockId}`);
      return { success: true, data: { id: mockId }, mock: true };
    }

    try {
      const payload = {
        from: sender,
        to: recipients,
        subject,
        html,
        text,
        reply_to: reply
      };

      if (attachments && attachments.length > 0) {
        payload.attachments = attachments;
      }
      if (tags && tags.length > 0) {
        payload.tags = tags;
      }

      const response = await this.resend.emails.send(payload);

      if (response.error) {
        this.logger.error?.(`[EmailService:Error] Resend API error:`, response.error);
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data, mock: false };
    } catch (err) {
      this.logger.error?.(`[EmailService:Exception] Failed to send email via Resend:`, err);
      return { success: false, error: err };
    }
  }

  /**
   * 1. 询盘提交流程邮件触发
   * - 给管理员销售团队发送详细项目通知
   * - 给客户发送收件与工单确认
   */
  async sendInquiryNotifications(inquiry, { attachment = null } = {}) {
    const results = { admin: null, customer: null };

    // 1.1 发送管理员通知
    try {
      const adminMail = renderInquiryAdminEmail(
        { ...inquiry, attachment },
        { publicOrigin: this.publicOrigin }
      );

      const emailAttachments = [];
      if (attachment && attachment.bytes && attachment.name) {
        emailAttachments.push({
          filename: attachment.name,
          content: Buffer.from(attachment.bytes).toString("base64")
        });
      }

      results.admin = await this.sendEmail({
        to: this.adminEmail,
        subject: adminMail.subject,
        html: adminMail.html,
        text: adminMail.text,
        attachments: emailAttachments,
        tags: [
          { name: "category", value: "inquiry_admin" },
          { name: "reference", value: inquiry.reference }
        ]
      });
    } catch (e) {
      this.logger.error?.(`[EmailService] Failed rendering or sending admin inquiry email:`, e);
      results.admin = { success: false, error: e };
    }

    // 1.2 发送客户确认回执邮件 (若有有效邮箱)
    if (inquiry.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
      try {
        const customerMail = renderInquiryCustomerEmail(inquiry, { publicOrigin: this.publicOrigin });
        results.customer = await this.sendEmail({
          to: inquiry.email,
          subject: customerMail.subject,
          html: customerMail.html,
          text: customerMail.text,
          tags: [
            { name: "category", value: "inquiry_receipt" },
            { name: "reference", value: inquiry.reference }
          ]
        });
      } catch (e) {
        this.logger.error?.(`[EmailService] Failed rendering or sending customer confirmation email:`, e);
        results.customer = { success: false, error: e };
      }
    }

    return results;
  }

  /**
   * 2. 订阅提交流程邮件触发
   * - 发送欢迎与确认邮件
   * - 同步创建 Resend Audience Contact (若配置了 audienceId)
   */
  async sendSubscriptionWelcome(subscriber) {
    const unsubscribeUrl = `${this.publicOrigin.replace(/\/$/, "")}/api/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
    const welcomeMail = renderSubscriptionWelcomeEmail(subscriber, {
      unsubscribeUrl,
      publicOrigin: this.publicOrigin
    });

    const sendResult = await this.sendEmail({
      to: subscriber.email,
      subject: welcomeMail.subject,
      html: welcomeMail.html,
      text: welcomeMail.text,
      tags: [
        { name: "category", value: "subscription_welcome" }
      ]
    });

    // 如果配置了 Resend Audience，同步添加联系人
    let contactSyncResult = null;
    if (this.resend && this.audienceId && !this.isTestMode) {
      try {
        const res = await this.resend.contacts.create({
          email: subscriber.email,
          audienceId: this.audienceId,
          unsubscribed: false
        });
        contactSyncResult = res.data;
      } catch (err) {
        this.logger.warn?.(`[EmailService] Could not sync subscriber to Resend Audience:`, err);
      }
    }

    return {
      emailResult: sendResult,
      contactSync: contactSyncResult
    };
  }

  /**
   * 3. EDM 营销/技术简报群发服务
   */
  async sendEdmCampaign({
    campaign,
    recipients,
    batchSize = 25,
    delayBetweenBatchesMs = 1000,
    dryRun = false
  }) {
    const summary = {
      total: recipients.length,
      sent: 0,
      failed: 0,
      errors: [],
      dryRun
    };

    this.logger.info?.(`[EmailService:EDM] Starting EDM campaign "${campaign.title}" for ${recipients.length} recipients. (DryRun: ${dryRun})`);

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (recipient) => {
          const unsubscribeUrl = `${this.publicOrigin.replace(/\/$/, "")}/api/unsubscribe?email=${encodeURIComponent(recipient.email)}`;
          const edmMail = renderEdmEmail(campaign, recipient, { unsubscribeUrl });

          if (dryRun) {
            summary.sent++;
            return;
          }

          const res = await this.sendEmail({
            to: recipient.email,
            subject: edmMail.subject,
            html: edmMail.html,
            text: edmMail.text,
            tags: [
              { name: "category", value: "edm_campaign" },
              { name: "campaign", value: campaign.id || "technical_brief" }
            ]
          });

          if (res.success) {
            summary.sent++;
          } else {
            summary.failed++;
            summary.errors.push({ email: recipient.email, error: res.error });
          }
        })
      );

      // 避免超过 API 限频，批次之间适当休眠
      if (i + batchSize < recipients.length && delayBetweenBatchesMs > 0 && !dryRun) {
        await new Promise((resolve) => setTimeout(resolve, delayBetweenBatchesMs));
      }
    }

    this.logger.info?.(`[EmailService:EDM] Campaign finished. Sent: ${summary.sent}, Failed: ${summary.failed}`);
    return summary;
  }
}
