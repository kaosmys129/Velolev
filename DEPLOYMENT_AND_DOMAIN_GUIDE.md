# www.velolev.org 生产上线部署与 Namecheap 域名解析完整配置指南

> **适用范围**：LiftPoleMachine (Velolev) 工业升降杆与抱杆机海外独立站  
> **生产主域名**：`https://www.velolev.org`  
> **跳转根域名**：`https://velolev.org` （308 Permanent Redirect 至 www）  
> **技术架构**：Astro 5.13.5 (SSG 纯静态模式) + Vercel Edge Network 全球边缘托管  
> **文档版本**：v1.0.0 (生产就绪版)  

---

## 目录
- [第 1 章：项目架构与上线拓扑概述](#第-1-章项目架构与上线拓扑概述)
  - [1.1 前端核心技术架构](#11-前端核心技术架构)
  - [1.2 Vercel Edge Network 托管拓扑与双保配置](#12-vercel-edge-network-托管拓扑与双保配置)
  - [1.3 域名角色分工与主域名（www）技术选型论证](#13-域名角色分工与主域名www技术选型论证)
- [第 2 章：Namecheap DNS 解析配置标准与冲突清理](#第-2-章namecheap-dns-解析配置标准与冲突清理)
  - [2.1 控制台进入路径](#21-控制台进入路径)
  - [2.2 前置确认 Nameservers 托管类型](#22-前置确认-nameservers-托管类型)
  - [2.3 关键步骤：彻底清理 Namecheap 预置冲突记录 (P0 避坑)](#23-关键步骤彻底清理-namecheap-预置冲突记录-p0-避坑)
  - [2.4 标准 DNS 解析记录配置表](#24-标准-dns-解析记录配置表)
- [第 3 章：Vercel 项目导入与生产部署完整流程](#第-3-章vercel-项目导入与生产部署完整流程)
  - [3.1 GitHub 仓库关联与项目导入](#31-github-仓库关联与项目导入)
  - [3.2 生产构建参数关键配置 (P0 门禁规范)](#32-生产构建参数关键配置-p0-门禁规范)
  - [3.3 生产核心环境变量配置](#33-生产核心环境变量配置)
  - [3.4 一键生产构建与日志验收](#34-一键生产构建与日志验收)
- [第 4 章：Vercel 自定义域名绑定与 308 强制跳转配置](#第-4-章vercel-自定义域名绑定与-308-强制跳转配置)
  - [4.1 添加主域名 www.velolev.org (Primary Domain)](#41-添加主域名-wwwvelolevorg-primary-domain)
  - [4.2 添加根域名 velolev.org 并配置 308 永久重定向](#42-添加根域名-velolevorg-并配置-308-永久重定向)
  - [4.3 DNS 验证与 Let's Encrypt SSL/TLS 证书自动签发](#43-dns-验证与-lets-encrypt-ssltls-证书自动签发)
- [第 5 章：全网即用验证命令集与故障排查 (FAQ)](#第-5-章全网即用验证命令集与故障排查-faq)
  - [5.1 终端即用快速验证命令集](#51-终端即用快速验证命令集)
  - [5.2 常见故障排查手册 (FAQ & Troubleshooting)](#52-常见故障排查手册-faq--troubleshooting)

---

## 第 1 章：项目架构与上线拓扑概述

### 1.1 前端核心技术架构
本项目为面向全球海外 B2B 工业工程客户打造的高性能出海独立站，前端采用现代 **Astro 5.13.5** 纯静态站点生成（SSG，`output: "static"`）架构：
- **静态构建产物**：构建产物位于 `maquin-astro-theme/dist/`，包含 128 个纯静态现代公开页面，覆盖英文主站及 6 种工业多语言（西班牙语 `es`、法语 `fr`、葡萄牙语 `pt`、越南语 `vi`、泰语 `th`、印尼语 `id`），以及 85 个兼容历史 WordPress 路径的静态 308 重定向别名。
- **自动化质量门禁**：项目在构建过程中集成了完整的自检验机制（资产指纹校验、退役别名校验、多语言完整性校验），确保上线的每一批产物 100% 具备生产可用性。
- **SEO 完备性**：所有静态页面均具备精准的 `<title>`、`<meta name="description">`、`<link rel="canonical">`、OpenGraph 元标签与工业结构化数据（JSON-LD），并自动生成符合 Google 规范的多语言站点地图（`sitemap-index.xml`、`sitemap-0.xml`）与 `robots.txt`。

### 1.2 Vercel Edge Network 托管拓扑与双保配置
本项目选择部署于 **Vercel Global Edge Network（全球边缘网络 CDN）**。Vercel Edge 具备超低延迟的全球 Anycast 路由与边缘节点缓存能力，能够为全球各区域的工程采购客户提供毫秒级响应。

为了消除仓库组织形式（根目录包装器 + `maquin-astro-theme/` 子目录）导致的构建失配风险，项目落地了“双保险” `vercel.json` 架构：
1. **子目录配置** (`maquin-astro-theme/vercel.json`)：标准导入模式，由 Vercel 直接驱动子目录工程；
2. **根目录配置** (`vercel.json`)：容错导入模式，即便直接在根目录导入，也能通过统一的配置契约执行构建。

```
                    【全球用户访问请求】
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
   https://velolev.org (根域名)       https://www.velolev.org (主域名)
            │                                   │
     [Anycast A 记录]                   [Anycast CNAME 记录]
       76.76.21.21                      cname.vercel-dns.com
            │                                   │
            ▼                                   ▼
    Vercel 边缘重定向引擎              Vercel Global Edge Network
  (HTTP 308 Permanent Redirect)                 │
            └───────────────────────────────────┤
                                                ▼
                                   【不可变静态资产缓存层】
                                   • /_astro/*  (强缓存 1 年)
                                   • /fonts/*   (强缓存 1 年)
                                   • /images/*  (缓存 1 天，SWR 7 天)
                                                ▼
                                    【企业级安全响应头】
                                   • Strict-Transport-Security (HSTS)
                                   • X-Content-Type-Options: nosniff
                                   • X-Frame-Options: SAMEORIGIN
                                   • Referrer-Policy
```

### 1.3 域名角色分工与主域名（www）技术选型论证

在上线的域名规划中，确立如下角色分工：
- **主域名 (Primary Domain)**：`https://www.velolev.org`（承载全站实际流量与搜索索引）
- **根域名 (Apex Domain)**：`https://velolev.org`（通过 Vercel 边缘 308 强制重定向至主域名）

#### 为什么首选 `www.velolev.org` 作为主域名？（技术深度论证）
1. **DNS 协议兼容性与 Anycast 动态调度优势**：
   - 根据国际互联网工程任务组 RFC 1034 规范，根域名（Apex / Zone Apex）不允许设置 `CNAME` 记录，只能绑定固定的 `A` 记录 IP 地址（`76.76.21.21`）。
   - 子域名 `www` 则天然支持 `CNAME` 记录并指向 `cname.vercel-dns.com`。使用 CNAME 解析，Vercel 边缘能够根据全球访问者的地理位置、骨干网拥堵情况和 DDoS 攻击流量，实现动态智能 DNS Anycast 调度与多集群平滑切换，容灾能力远优于静态单 IP。
2. **Cookie 作用域隔离与安全防护**：
   - 根据浏览器 Cookie 规范，如果在根域名（`velolev.org`）下写入 Cookie，该 Cookie 会默认向下广播传递给所有子域名（例如未来扩展的客户门户 `portal.velolev.org`、邮件系统 `mail.velolev.org`、API 网关 `api.velolev.org`）。
   - 将主站收敛在 `www.velolev.org`，可以严格将 Cookie 限制在 `www` 子域之内，彻底防止静态资源（图片、CSS、JS）请求附带无用 Cookie（减少请求带宽），并杜绝跨子域 Cookie 污染与会话劫持风险。
3. **HTTP 308 永久重定向保障表单与 SEO 权重**：
   - 相比传统的 HTTP 301 重定向，HTTP 308（Permanent Redirect，RFC 7538）规范了**客户端重定向时必须保留原有的 HTTP 请求方法与请求体（Payload）**。
   - 当用户或外部爬虫通过 `http://velolev.org` 发起 POST 表单请求（如工业询盘提交）时，308 重定向可确保请求体不被篡改或丢失，同时在 Google 等搜索引擎中能够 100% 完整继承根域名的 PageRank 权重。

---

## 第 2 章：Namecheap DNS 解析配置标准与冲突清理

目标域名 `velolev.org` 目前权威托管于 Namecheap。为确保域名能够快速、稳定地解析至 Vercel 边缘节点，必须严格按照以下标准进行配置与冲突清理。

### 2.1 控制台进入路径
1. 登录 [Namecheap 控制台](https://ap.www.namecheap.com/)。
2. 在左侧主导航菜单中，点击 **Domain List**。
3. 在域名列表中找到 **`velolev.org`**，点击该行右侧的 **Manage** 按钮进入管理面板。
4. 在页面顶部的二级标签栏中，点击切换至 **Advanced DNS**（高级 DNS）标签页。

### 2.2 前置确认 Nameservers 托管类型
在配置高级解析之前，必须确认域名当前使用的 DNS 服务器：
1. 在当前页点击返回 **Domain** 基础标签页。
2. 找到 **NAMESERVERS** 区域，确认下拉框选择的是 **Namecheap BasicDNS**：
   - 权威服务器应为：`dns1.registrar-servers.com` 与 `dns2.registrar-servers.com`。
3. ⚠️ **红线警示**：如果当前误设置为 *Custom DNS*，在 *Advanced DNS* 中配置的任何解析记录均**不会生效**！若非 BasicDNS，请切换回 *Namecheap BasicDNS* 并点击右侧绿色的勾号保存。

### 2.3 关键步骤：彻底清理 Namecheap 预置冲突记录 (P0 避坑)
在 Namecheap 注册新域名或默认状态下，系统会在 **HOST RECORDS** 列表中自动预置所谓的“停靠页（Parking Page）”和默认重定向。这些记录是导致解析失败、证书无法签发、以及控制台报错的最常见根源！

在添加新记录前，**必须先在 HOST RECORDS 列表中将以下冲突项全部删除**（点击对应记录最右侧的红色垃圾桶图标）：

| 待删除冲突项类型 | 典型 Host 标识 | 典型 Value / Target | 危害说明 |
|---|---|---|---|
| **CNAME Record (Parking)** | `www` | `parkingpage.namecheap.com.` | 严重冲突：会阻断 Vercel 的 CNAME 配置并导致冲突报错 |
| **A Record (Parking)** | `@` | `198.18.0.71` 或类似停靠 IP | 严重冲突：会导致根域名无法指向 Vercel Anycast IP |
| **URL Redirect Record** | `@` 或 `www` | `http://www.velolev.org` | 严重冲突：Namecheap 自带的 HTTP 重定向会截断流量并破坏 SSL 证书验证 |

> 💡 **检查准则**：删除后，`HOST RECORDS` 列表中不应存在任何 Host 为 `@` 或 `www` 的旧记录。

### 2.4 标准 DNS 解析记录配置表
在清空冲突项后，点击 HOST RECORDS 下方的 **Add New Record** 按钮，逐一添加以下两条标准解析记录：

| 序号 | Record Type (记录类型) | Host (主机记录) | Value (记录值/指向目标) | TTL (生存时间) | 用途说明 |
|:---:|---|---|---|---|---|
| **1** | **A Record** | `@` | `76.76.21.21` | `Automatic` (或 `30 min`) | 将根域名 `velolev.org` 精确解析到 Vercel 官方全球 Anycast IP |
| **2** | **CNAME Record** | `www` | `cname.vercel-dns.com` | `Automatic` (或 `30 min`) | 将主域名 `www.velolev.org` 指向 Vercel 动态 CNAME 边缘调度节点 |

#### ⚠️ 重大实操格式红线（严禁在末尾加点）：
- 在 Namecheap 的 CNAME Value 输入框中输入 `cname.vercel-dns.com` 时，**绝对不要在末尾输入点号 `.`**！
- **错误写法**：`cname.vercel-dns.com.`（Namecheap 会将其错误识别为相对主机名，自动补全为 `cname.vercel-dns.com.velolev.org`，导致全球解析彻底失效）。
- **正确写法**：`cname.vercel-dns.com`。
- 每添加一行，点击该行右侧绿色的 **Save Changes**（勾号图标）确认保存。

---

## 第 3 章：Vercel 项目导入与生产部署完整流程

完成 DNS 配置后，登录 Vercel 控制台执行项目导入与生产构建配置。

### 3.1 GitHub 仓库关联与项目导入
1. 确保项目的最新源代码已推送到 GitHub 远程仓库（例如 `main` 分支）。
2. 登录 [Vercel 控制台仪表盘](https://vercel.com/dashboard)。
3. 点击页面右上角或中部的 **"Add New..."** 按钮，在下拉菜单中选择 **"Project"**。
4. 在 **Import Git Repository** 列表中找到包含本项目代码的仓库（例如 `Velolev`），点击右侧的 **"Import"** 按钮。

### 3.2 生产构建参数关键配置 (P0 门禁规范)
在进入的 **Configure Project** 配置页面中，必须核对并设定以下核心参数：

```
                    【Vercel Configure Project 关键界面参数】
  ┌────────────────────────────────────────────────────────────────────────┐
  │ Project Name:          velolev                                         │
  │ Framework Preset:      Astro (自动检测)                                │
  │ Root Directory:        maquin-astro-theme                 [Edit 设定]  │
  ├────────────────────────────────────────────────────────────────────────┤
  │ Build and Output Settings:                                             │
  │   Build Command:       npm run build                      (vercel.json)│
  │   Output Directory:    dist                               (vercel.json)│
  │   Install Command:     npm install                        (默认)       │
  ├────────────────────────────────────────────────────────────────────────┤
  │ Node.js Version:       22.x                               [必选]       │
  └────────────────────────────────────────────────────────────────────────┘
```

1. **Root Directory (根目录设定)**：
   - 界面默认可能指向仓库根目录 `./`。
   - **推荐方案**：点击 **Root Directory** 右侧的 **"Edit"** 按钮，在选择框中选定子目录：**`maquin-astro-theme`**，点击 **"Continue"** 保存。核心 Astro 工程直接就地构建。
   - **双保容错方案**：若未修改 Root Directory 保持默认根目录 `./`，根目录 `vercel.json` 与 `package.json` 已内建 `"installCommand": "npm --prefix maquin-astro-theme install"` 与 `postinstall` 自动安装钩子，构建完成后自动同步至根目录 `dist/`，双向保证云端 100% 顺畅构建上线。
2. **Framework Preset (框架预设)**：
   - 确认识别为 **Astro**。
3. **Node.js Version (运行时版本约束)**：
   - 项目 `package.json` 强约束 Node 运行时版本必须 `>=22.12.0`。
   - 在项目设置（Settings -> General -> Node.js Version）中，确保选定为 **22.x**。
4. **Build and Output Settings**：
   - 项目内置的 `vercel.json` 已显式锁定 `buildCommand: "npm run build"` 与 `outputDirectory: "dist"`，此处无需覆盖，保持默认即可。

### 3.3 生产核心环境变量配置
在配置界面的 **Environment Variables** 折叠面板中，配置如下关键环境变量：

| Variable Key (变量名) | Variable Value (变量值) | Environments (生效环境) | 核心技术影响与作用 |
|---|---|---|---|
| **`PUBLIC_SITE_URL`** | `https://www.velolev.org` | 勾选 **Production**, **Preview**, **Development** | **全站生产 SEO 总控开关**。决定 `@astrojs/sitemap` 插件是否启用、全站 128 个页面的 `<link rel="canonical">`、OpenGraph URL 与多语言 `hreflang` 标签的绝对域名生成。若不配置，站点将降级为 `https://volvet.invalid` 且不生成 sitemap。 |

*(可选业务变量)*：
- `INQUIRY_ADMIN_TOKEN`：若生产环境启用了在线后台查询，可在此配置管理员安全 Token；
- 邮件发送 API 凭证：若后续对接第三方 SMTP/Resend 发信服务，可在此注入对应的 API Key。

### 3.4 一键生产构建与日志验收
1. 点击底部的 **"Deploy"** 按钮启动生产部署。
2. 观察实时构建日志窗口，验证以下核心输出里程碑：
   - ✅ `[@astrojs/sitemap] sitemap-index.xml created at dist`（证实 sitemap 成功生成）
   - ✅ `[build] 128 page(s) built in ~1.5s`（证实全量静态页面构建完成）
   - ✅ 质量门禁自动运行无异常：
     - `wordpressFiles: 0, modernPublicHtml: 127, redirects: 85, checks: 656, failures: []`
     - `locales: ["es", "fr", "pt", "vi", "th", "id"], checks: 635, failures: []`
3. 构建成功后，页面会展示庆祝礼花，并生成一个形如 `velolev-xxx.vercel.app` 的 Vercel 预览地址，表明静态产物已成功同步至 Vercel 边缘网络。

---

## 第 4 章：Vercel 自定义域名绑定与 308 强制跳转配置

现在需要将 Namecheap 上的域名与刚刚部署成功的 Vercel 项目完成双向绑定，并建立 308 永久重定向闭环。

### 4.1 添加主域名 www.velolev.org (Primary Domain)
1. 进入 Vercel 控制台，点击刚刚创建的项目 **velolev**。
2. 点击顶部导航栏的 **Settings**（项目设置）。
3. 在左侧菜单栏中点击 **Domains**。
4. 在右上方的 "Add Domain" 输入框中，输入主域名：
   ```text
   www.velolev.org
   ```
5. 点击 **Add** 按钮。
6. 在弹出窗口中，环境选择 **Production**。
7. 添加完成后，确认在域名列表中，`www.velolev.org` 显示为生产主域名。

### 4.2 添加根域名 velolev.org 并配置 308 永久重定向
1. 再次在 "Add Domain" 输入框中输入根域名：
   ```text
   velolev.org
   ```
2. 点击 **Add** 按钮。
3. 此时 Vercel 系统会自动识别到该项目已配置了 `www.velolev.org`，并弹出重定向配置弹窗：
   - 勾选选项：**"Redirect to www.velolev.org"**；
   - 状态码选择：**`308 Permanent Redirect`**。
4. 点击 **Add** 确认。
5. 此时域名配置列表将清晰呈现如下拓扑关系：
   - **`www.velolev.org`**：`Production`（主域名，对外提供站点全部内容）
   - **`velolev.org`**：`Redirects to www.velolev.org`（重定向节点，自动执行 HTTP 308 强制跳转）

### 4.3 DNS 验证与 Let's Encrypt SSL/TLS 证书自动签发
添加完成后，Vercel 边缘后台会自动发起针对 `www.velolev.org` 与 `velolev.org` 的验证流程：

1. **DNS Validated (DNS 校验)**：
   - Vercel 会向全球权威 DNS 查询该域名的解析记录。
   - 若第 2 章的 Namecheap 解析已生效，域名卡片旁边的状态图标会在 1~10 分钟内由蓝色（Pending）变为绿色勾号（**Valid Configuration**）。
2. **Generating SSL Certificate (SSL 证书自动签发)**：
   - 验证通过后，Vercel 自动化证书管线会无缝调用 **Let's Encrypt**，基于 HTTP-01 / DNS-01 自动化完成证书请求、鉴权与颁发；
   - **全流程无需任何人工介入**，无需用户手动生成 CSR、无需手动上传证书私钥或链文件；
   - 证书签发完毕后，域名卡片将显示 **Valid SSL**（支持 TLS 1.2 / TLS 1.3 现代加密协议）；
   - 该证书由 Vercel 全自动维护，在到期前 30 天内自动静默轮换续签，永不过期。

---

## 第 5 章：全网即用验证命令集与故障排查 (FAQ)

### 5.1 终端即用快速验证命令集
运维人员或技术评审人员可直接在本地 macOS / Linux 终端中复制以下命令，对全站的 DNS 解析、重定向逻辑、HTTPS 安全性与响应头进行全自动化检验：

```bash
# ==============================================================================
# 阶段 1：权威 DNS 解析验证
# ==============================================================================

# 1. 验证根域名 A 记录是否精确指向 Vercel Anycast IP (预期输出：76.76.21.21)
dig +short A velolev.org

# 2. 强制使用 Google 8.8.8.8 公共 DNS 直查（排除本地运营商 ISP 缓存干扰）
dig @8.8.8.8 +short A velolev.org

# 3. 验证 www 子域名 CNAME 是否精确指向 Vercel 边缘 (预期输出：cname.vercel-dns.com.)
dig +short CNAME www.velolev.org

# 4. 强制使用 Google 8.8.8.8 验证 CNAME
dig @8.8.8.8 +short CNAME www.velolev.org

# 5. 验证权威 NS 服务器保持为 Namecheap BasicDNS (预期包含 registrar-servers.com)
dig +short NS velolev.org


# ==============================================================================
# 阶段 2：HTTP 308 强制跳转与 SSL/TLS 链路验证
# ==============================================================================

# 6. 验证根域名 HTTP 请求强制 308 跳转至 https://www.velolev.org/
# 预期状态行：HTTP/1.1 308 Permanent Redirect，Location: https://www.velolev.org/
curl -sI http://velolev.org | grep -iE '^HTTP|^Location:'

# 7. 验证根域名 HTTPS 请求强制 308 跳转至 https://www.velolev.org/
# 预期状态行：HTTP/2 308，Location: https://www.velolev.org/
curl -sI https://velolev.org | grep -iE '^HTTP|^Location:'

# 8. 验证主域名 HTTPS 正常响应
# 预期状态行：HTTP/2 200，server: Vercel
curl -sI https://www.velolev.org/ | grep -iE '^HTTP|^Server:'

# 9. 验证尾随斜杠规范重定向（Astro 路由规范）
# 预期状态行：HTTP/2 308，Location: https://www.velolev.org/about-us/
curl -sI https://www.velolev.org/about-us | grep -iE '^HTTP|^Location:'


# ==============================================================================
# 阶段 3：企业级安全响应头与静态资源强缓存验证
# ==============================================================================

# 10. 验证全站安全防护响应头 (HSTS, nosniff, SAMEORIGIN, Referrer-Policy)
curl -sI https://www.velolev.org/ | grep -iE 'strict-transport-security|x-content-type-options|x-frame-options|referrer-policy'

# 11. 验证不可变静态资产 1 年强缓存头
# 获取首页中的首个 _astro 静态资源并检验其 Cache-Control
ASSET_URL=$(curl -sL https://www.velolev.org/ | grep -oE '/_astro/[a-zA-Z0-9_.-]+' | head -n 1)
if [ -n "$ASSET_URL" ]; then
  echo "正在验证静态资产: https://www.velolev.org${ASSET_URL}"
  curl -sI "https://www.velolev.org${ASSET_URL}" | grep -iE '^HTTP|^cache-control:'
  # 预期输出：HTTP/2 200，cache-control: public, max-age=31536000, immutable
fi


# ==============================================================================
# 阶段 4：SEO 核心元文件与爬虫索引可访问性验证
# ==============================================================================

# 12. 验证 robots.txt 可正常访问，且包含正确的 Sitemap 指针
curl -sL https://www.velolev.org/robots.txt

# 13. 验证多语言站点地图索引文件可正常访问
curl -sI https://www.velolev.org/sitemap-index.xml | grep -iE '^HTTP|^Content-Type:'

# 14. 验证首分子站点地图 sitemap-0.xml 包含正式生产域名
curl -sL https://www.velolev.org/sitemap-0.xml | grep -oE '<loc>[^<]+</loc>' | head -n 5
# 预期输出前缀均为：<loc>https://www.velolev.org/...
```

---

### 5.2 常见故障排查手册 (FAQ & Troubleshooting)

#### Q1: Namecheap 解析记录已添加，但 Vercel 控制台一直显示 "Invalid Configuration" 怎么办？
- **排查步骤 1（DNS 传播延迟）**：
  Namecheap 保存后，内部服务器刷新较快，但全球各地的递归 DNS（如电信、联通、海外 ISP）刷新缓存通常需要 5 ~ 30 分钟。请在终端执行 `dig @8.8.8.8 +short CNAME www.velolev.org`。如果该命令已返回 `cname.vercel-dns.com.`，说明全球骨干 DNS 已生效，点击 Vercel 控制台对应域名旁的 **"Refresh"** 按钮即可立即变绿。
- **排查步骤 2（检查是否遗留 Namecheap Parking 冲突记录）**：
  返回 Namecheap 控制台的 Advanced DNS 页面，仔细核对 HOST RECORDS。若仍然存在默认生成的 `parkingpage.namecheap.com.` 或 `URL Redirect Record`，必须果断删除。
- **排查步骤 3（检查 CNAME 末尾是否多输了点）**：
  核对 Namecheap 中 `www` 记录的 Target 值，必须是 `cname.vercel-dns.com`，严禁为 `cname.vercel-dns.com.`。

#### Q2: Vercel 提示 SSL 证书生成失败（Error generating SSL certificate）或卡在 "Generating"？
- **排查步骤 1（CAA 记录排查）**：
  如果域名的 DNS 中配置了解析认证授权记录（CAA Record），但未授权 Let's Encrypt，证书颁发机构将无法签发证书。
  运行检查：
  ```bash
  dig CAA velolev.org +short
  ```
  如果输出不为空且未包含 `letsencrypt.org`，必须在 Namecheap 中添加一条 CAA 记录：
  - Type: `CAA Record`
  - Host: `@`
  - Value: `0 issue "letsencrypt.org"`
- **排查步骤 2（DNSSEC 状态排查）**：
  如果域名此前开启了 DNSSEC 但未正确同步签名公钥，会导致 CA 校验 DNS 时报 SERVFAIL 错误。在 Namecheap 的 Advanced DNS 页面下方，确保 **DNSSEC** 状态处于 **OFF**（关闭）。

#### Q3: 访问网站时提示 "ERR_TOO_MANY_REDIRECTS"（重定向循环）？
- **排查步骤**：
  1. 检查 Namecheap 控制台是否错误配置了 URL Redirect 转发。若有，请立即删除。
  2. 检查 Vercel Domains 设置：必须是 `velolev.org` 重定向到 `www.velolev.org`，绝不能配置成反向互指（例如两边都互相 Redirect），主域名 `www.velolev.org` 必须无任何重定向配置，直连 Production。

#### Q4: 网站部署成功后，发现 sitemap 报 404 或链接前缀变成了 `https://volvet.invalid`？
- **原因**：Vercel 项目环境变量中未配置 `PUBLIC_SITE_URL`。Astro 站点配置在缺少该环境变量时，为防止非法脏数据蔓延，会主动关闭站点地图生成插件。
- **修复方案**：
  1. 打开 Vercel 项目 -> **Settings** -> **Environment Variables**；
  2. 添加变量：`PUBLIC_SITE_URL`，值为 `https://www.velolev.org`；
  3. 切换至 **Deployments** 标签页，点击最新一次部署右侧的 `...` 菜单，点击 **"Redeploy"** 重新触发构建即可恢复正常。

#### Q5: 构建日志中出现 "Node.js engine incompatibility" 错误？
- **原因**：项目 `package.json` 严格限制了 Node 运行环境 `>=22.12.0`，而 Vercel 项目默认使用了旧版 Node 运行时。
- **修复方案**：
  1. 打开 Vercel 项目 -> **Settings** -> **General**；
  2. 向下滚动至 **Node.js Version**；
  3. 将版本从 18.x 或 20.x 切换为 **22.x** 并保存；
  4. 重新触发部署即可顺利通过。

---

> **结语**：按照本指南执行完毕后，`www.velolev.org` 将正式接入 Vercel 全球边缘网络，享受全球毫秒级静态内容加速、企业级安全防护与 100% 自动化的 HTTPS 证书维护保障！
