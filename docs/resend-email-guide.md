# volvet 工业机械 - Resend 邮件服务全系统配置与运营指南

本文档详细说明了在本项目中如何配置与使用 **Resend Email** 作为核心邮件基础设施，全面覆盖**询盘提交**、**订阅提交**与 **EDM 营销推广**三大核心场景。

---

## 目录
1. [系统架构总览](#1-系统架构总览)
2. [环境配置与快速启动](#2-环境配置与快速启动)
3. [场景一：询盘提交 (Inquiry Submission)](#3-场景一询盘提交-inquiry-submission)
4. [场景二：邮件订阅 (Newsletter Subscription)](#4-场景二邮件订阅-newsletter-subscription)
5. [场景三：EDM 营销与技术简报群发 (Industrial EDM)](#5-场景三edm-营销与技术简报群发-industrial-edm)
6. [管理员私有接口与数据导出](#6-管理员私有接口与数据导出)
7. [Resend 生产域名解析配置建议](#7-resend-生产域名解析配置建议)
8. [自动化测试与验证](#8-自动化测试与验证)

---

## 1. 系统架构总览

项目采用模块化、分层架构设计，实现了高可靠性、防抖与优雅降级机制：

```
[前端客户端 / 询盘表单 / 订阅模块]
       │ (POST /api/inquiries, POST /api/subscribe)
       ▼
[Inquiry Server (Node.js 运行时)]
       ├─► [InquiryStore & SubscriptionStore (SQLite 本地私有数据库)]
       │     └─ 幂等持久化、防重机制、私有安全权限保护 (0o600 / 0o700)
       ▼
[EmailService (Resend 核心邮件服务)]
       ├─► 优雅降级 (无 API Key 时自动转为 Mock 模式，日志追踪)
       ├─► 模板引擎 (email-templates.mjs - 纯文本 + 工业风格响应式 HTML)
       └─► 官方 Resend API (单封发送 / 批量限速发送 / Audience 联系人同步)
```

### 核心代码清单
- **邮件服务核心**：[`server/email-service.mjs`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/server/email-service.mjs)
- **邮件精美模板**：[`server/email-templates.mjs`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/server/email-templates.mjs)
- **订阅者数据存储**：[`server/subscription-store.mjs`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/server/subscription-store.mjs)
- **询盘与服务运行时**：[`server/inquiry-server.mjs`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/server/inquiry-server.mjs)
- **EDM 营销调度脚本**：[`scripts/send-edm.mjs`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/scripts/send-edm.mjs)
- **前端订阅组件**：[`src/components/procurement/NewsletterSubscription.astro`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/src/components/procurement/NewsletterSubscription.astro)
- **综合自动化测试**：[`server/email.test.mjs`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/server/email.test.mjs)

---

## 2. 环境配置与快速启动

### 2.1 环境变量配置 (`.env`)
复制 `.env.example` 为 `.env`：
```bash
cp .env.example .env
```

核心配置项说明：

| 环境变量名 | 说明 | 示例值 |
|---|---|---|
| `RESEND_API_KEY` | Resend API 密钥 (在 resend.com 获取) | `re_123456789_abcdef` |
| `RESEND_FROM_EMAIL` | 默认发件人地址 (生产环境须在 Resend 验证域名) | `volvet <notifications@velolev.org>` |
| `ADMIN_NOTIFICATION_EMAIL` | 业务/销售团队接收询盘通知的邮箱 | `sales@velolev.org` |
| `RESEND_REPLY_TO` | 客户回复邮件时的目标邮箱 | `support@velolev.org` |
| `RESEND_AUDIENCE_ID` | (可选) Resend 受众 Audience ID | `78261eea-8f8b-4381-83c6-79fa7120f1cf` |
| `PUBLIC_ORIGIN` | 站点公网域名 (用于生成退订与回跳链接) | `https://www.velolev.org` |
| `INQUIRY_ADMIN_TOKEN` | 管理员访问收件箱与订阅者名单的私钥 | 32+ 位随机安全字符串 |

> [!NOTE]
> **Mock 模拟模式**：如果未配置 `RESEND_API_KEY`，系统将自动进入 Mock 模拟模式，在控制台打印发信详情，不会向外部发送邮件，保证本地开发和 CI/CD 测试顺畅运行。

---

## 3. 场景一：询盘提交 (Inquiry Submission)

当采购方或工程客户在网站提交询盘（如 `/quote` 或 `/contact-us`）时，后端服务将自动触发双向邮件流：

### 3.1 销售团队通知邮件 (Admin Notification)
- **收件人**：`ADMIN_NOTIFICATION_EMAIL` (例如 `sales@velolev.org`)
- **主题**：`[New Inquiry] {reference} - {company/name} ({country})`
- **邮件内容**：
  - 专属询盘唯一追踪号（如 `VOL-20261030-ABCD1234`）
  - 客户全套基本信息（姓名、公司、邮箱、电话、目的地国家）
  - 工程选型技术参数（杆高、总重、法兰规格、应用场景、采购数量）
  - 客户留下的项目详细需求留言
  - 自动挂载客户上传的工程图纸或规格书附件（PDF/JPG/PNG）
  - 一键跳转至私有管理后台的直达按钮

### 3.2 客户收件确认回执 (Customer Confirmation)
- **收件人**：客户填写的邮箱（`inquiry.email`）
- **主题**：`Inquiry Receipt Confirmation: {reference} | volvet`
- **邮件内容**：
  - 致谢并提供专属工单追踪编号
  - 项目关键参数回执表格
  - 说明接下来的工程复核与商务流程（24 小时内参数核对、非标法兰适配确认、专人跟进）
  - 支持客户直接回复本邮件追加 CAD 图纸或现场照片

---

## 4. 场景二：邮件订阅 (Newsletter Subscription)

### 4.1 前端订阅组件
网站在 `/resources/`（资源下载页）及相关技术页面中内置了高保真工业设计组件 `<NewsletterSubscription />`：
- 支持 7 种语言无缝本地化（en, es, fr, pt, vi, th, id）
- 内置防机器人蜜罐机制（Honeypot Trap）
- 异步交互，无页面重载，提供加载中与成功状态

### 4.2 订阅提交流程
1. 客户端提交到 `/api/subscribe` 端点。
2. 数据安全存入本地私有 SQLite 数据库 `subscriptions.sqlite`（字段：`email`, `locale`, `country`, `source_page`, `status`, `created_at`）。
3. 自动向订阅者邮箱发送**欢迎与技术简报确认邮件**。
4. 若环境变量配置了 `RESEND_AUDIENCE_ID`，自动调用 Resend Contacts API 将其同步至 Resend 云端受众池中。
5. 邮件内附带合规的**一键退订链接**，点击后访问 `/api/unsubscribe` 可完成退订。

---

## 5. 场景三：EDM 营销与技术简报群发 (Industrial EDM)

为方便定期向工程客户、设备租赁商和订阅者推送白皮书、产品案例与技术更新，项目提供了专用的 EDM 群发工具 [`scripts/send-edm.mjs`](file:///Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme/scripts/send-edm.mjs)。

### 5.1 常用命令

#### 1) 预览群发 (Dry-Run 模式，不实际发信)
```bash
npm run edm:preview
```
输出示例：
```
====================================================
volvet Industrial EDM Campaign Dispatch Tool
====================================================
Service Provider : RESEND (API Key Present)
Sender Address   : volvet Procurement <notifications@velolev.org>
Campaign ID      : tech-brief-zero-crane-2026
Subject Line     : "Field Engineering Report: Zero-Crane Light Pole Installation"
Execution Mode   : DRY-RUN (No emails will actually be dispatched)
----------------------------------------------------
Active Subscribers Found: 120
[EmailService:EDM] Starting EDM campaign ... (DryRun: true)
[EmailService:EDM] Campaign finished. Sent: 120, Failed: 0
```

#### 2) 向指定测试邮箱发送单封预览 (Test-Email 模式)
在正式群发前，先发给自己验证排版与显示效果：
```bash
node scripts/send-edm.mjs --test-email=your-email@example.com
```

#### 3) 自定义营销内容与正式群发
编写自定义营销内容 JSON 文件（如 `my-campaign.json`）：
```json
{
  "id": "solar-lighting-launch-2026",
  "title": "New Engineering Telemetry: Solar Street Light Installation",
  "headline": "Zero-Crane Solar Pole Deployment in High-Wind Regions",
  "lead": "Analysis of two-module hydraulic lifter efficiency across 50-pole utility projects.",
  "bodyHtml": "<p>Dear Procurement Team,</p><p>We have updated the technical field study...</p>",
  "ctaText": "Download Specification Summary →",
  "ctaUrl": "https://www.velolev.org/resources/",
  "secondaryHighlights": [
    "Battery-powered 24V DC hydraulic operation with no grid requirement",
    "Flange bolt pattern standardization for M16–M24 foundation circles"
  ]
}
```

执行群发命令：
```bash
node scripts/send-edm.mjs --campaign=my-campaign.json
```
可选参数：
- `--limit=50`: 仅发送给前 50 位订阅者
- `--subject="Custom Subject"`: 临时覆盖邮件主题

---

## 6. 管理员私有接口与数据导出

所有管理接口均受到 Bearer Token 保护（`Authorization: Bearer <INQUIRY_ADMIN_TOKEN>`）：

### 6.1 询盘数据
- **获取询盘列表**：`GET /api/admin/inquiries?offset=0&limit=30`
- **导出询盘 CSV**：`GET /api/admin/inquiries.csv`
- **下载询盘图纸附件**：`GET /api/admin/inquiries/{id}/attachment`

### 6.2 订阅者数据
- **获取活跃订阅者**：`GET /api/admin/subscribers?offset=0&limit=50`
- **导出订阅者 CSV**：`GET /api/admin/subscribers.csv`（可直接导入到 CRM、ERP 或其他邮件营销平台）
- **触发 EDM 营销**：`POST /api/admin/send-edm`（支持通过 API 远程下发 EDM 营销任务）

---

## 7. Resend 生产域名解析配置建议

在生产环境中，为确保邮件送达率（inbox deliverability）并避免进入垃圾箱，请在域名 DNS 管理平台（Cloudflare、GoDaddy、阿里云等）添加 Resend 要求的解析记录：

1. **DKIM 记录** (TXT 或 CNAME): 由 Resend 控制台提供，用于数字签名防伪造。
2. **SPF 记录** (TXT):
   ```
   v=spf1 include:resend.com ~all
   ```
3. **DMARC 记录** (TXT):
   在 `_dmarc.velolev.org` 添加：
   ```
   v=DMARC1; p=none; rua=mailto:dmarc-reports@velolev.org;
   ```
配置完成后在 Resend 控制台点击 **Verify Domain** 即可激活生产发送权限。

---

## 8. 自动化测试与验证

本项目具备严格的自动化测试保障，确保代码修改不会破坏任何既有功能：

### 运行专门的邮件测试套件
```bash
npm run email:test
```
覆盖用例：
- 邮件模板工业排版与安全转义验证
- 订阅校验与防机器人蜜罐拦截
- SQLite 订阅者去重、退订与重新激活状态机
- EmailService 在 Mock 与生产模式下的表现
- 询盘服务 `/api/subscribe` 与 `/api/unsubscribe` 端点验证

### 运行全站全量测试
```bash
npm test
```
执行包括静态站点构建、内容策略审计、多语言一致性、询盘存储、邮件系统在内的全套端到端校验。
