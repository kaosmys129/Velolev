# liftpolemachine-web 无服务器/静态优先 CMS 技术方案概念简报 (Concepts Brief)

* **作者 (Author):** EGM Multi-Lens Brainstorm Swarm
* **日期 (Date):** 2026-10-29
* **项目上下文:** `liftpolemachine-web`（基于 Astro 5 SSG，覆盖 7 国语言，121 个静态页面，核心依赖 `content-baseline.json` 与 `verify-content-baseline.mjs`）

---

## 1. 概述与核心假设 (Overview)

针对 `liftpolemachine-web` 出海独立站，本方案旨在构建一套面向研发工程师、完全无服务器/静态优先（Zero-Server & Static-First）、以 Git 为单一可信源（SSOT）的 CMS 架构。

系统以 **Keystatic + Astro 5 Content Collections** 为核心，通过将“核心物理事实基准”与“展示营销文案”进行物理文件拆分，借助 **TypeScript / Zod 字面量强约束** 与 **GitHub CODEOWNERS** 实现核心工程参数的只读防篡改；同时通过字段级版本哈希索引（Hash Tracking）与 **GitHub Actions + LLM API** 建立异步增量翻译与人工审批流，在零服务器运维与零静态构建性能损耗的前提下完成全站 7 国语言的高效协同。

---

## 2. 目标与非目标 (Goals vs. Non-Goals)

### 核心目标 (In-Scope Goals)
1. **零服务器维护成本**：生产与后台管理完全依赖静态分发与 GitHub API（GitHub Mode），彻底规避传统 Headless CMS（Strapi/Directus/WordPress）带来的服务器、数据库运维及安全补丁负担。
2. **工程物理基线强保护**：将额定载荷 300kg、最大杆高 12m、24V 电池、85kg 分体自重等 8 大核心参数强制锁定为只读，任何变更必须经工程团队 PR 审批。
3. **多语言字段级增量联动**：建立 `i18n-manifest.json` 哈希映射表，当英文母本字段发生变化时，精准标记小语种字段为脏状态，并仅对差异字段触发 AI 增量翻译。
4. **无缝兼容现有构建门禁**：不推翻现有的 `verify-content-baseline.mjs`、`contentPolicy.mjs` 及 121 个静态页面的静态构建与 HTML AST 安全清洗管线。

### 非目标 (Out-of-Scope Non-Goals)
1. **不做实时在线构建调用 AI**：严禁在 `npm run build` 构建期动态发起大模型 API 请求，所有翻译结果必须显式存入 Git 仓库以确保构建确定性与离线可重现性。
2. **不做复杂的动态 RBAC 用户系统**：直接复用 GitHub Organization 现有的成员权限、分支保护与 PR 机制，不额外搭建私有账号鉴权中心。
3. **大文件不进入 Git 核心仓库**：产品演示高画质视频、大型 CAD 模型不直接作为 Git 二进制大文件提交，统一托管于对象存储（Cloudflare R2），Git 中仅保存引用 URL。

---

## 3. 六维视角综合分析与技术权衡 (Analysis by Review Lenses)

### 3.1 极简主义与 YAGNI 视角 (`egm-zoom-out`)
* **核心审视**：当前站点仅 121 个页面，且维护者均为研发工程师，为何不直接继续写本地 Markdown/JSON？
* **结论与权衡**：纯本地写文件虽然对单一工程师最轻量，但在维护 7 国语言同步时，工程师需要手动比对 6 份语言文件中的同名字段，极易产生“英文改了而越南语/泰语漏改”的陈旧文案问题。引入 Keystatic 作为只读本地/网页双模界面，辅以自动化哈希标记，能在不破坏 Git 工作流的前提下大幅降低跨语种维护的心智负担。

### 3.2 代码库深度与集成视角 (`egm-codebase-details`)
* **现有技术基座**：站点使用 Astro 5.13.5，现存由 `scripts/build-site.mjs` 调度的静态编译流程，并依赖 `contentPolicy.mjs` 过滤商业违禁词。
* **架构对齐**：Keystatic 深度支持 Astro 5 Content Collections。采用 Astro 原生的 `defineCollection` 与 Zod Schema，可以无缝替换现有的松散 JSON 读取逻辑，将物理基准提升为编译期类型报错。

### 3.3 权限与防篡改架构视角 (`egm-design`)
* **CODEOWNERS 粒度困境**：GitHub 原生 CODEOWNERS 仅支持文件和目录级权限，无法在单个 JSON 内部限制特定键值。
* **物理文件解耦方案**：
  * `src/data/baseline/equipment-facts.json`（物理基准）由 `@engineering-leads` 独占；
  * `src/content/pages/{locale}/*.mdoc`（多语言文案）开放给运营与翻译；
  * Astro 模板直接从 `equipment-facts.json` 取值渲染，小语种文案模板只负责标题与描述，从结构上杜绝篡改可能。

### 3.4 工业出海合规与防幻觉视角 (`egm-comprehension`)
* **工业安全法律边界**：立杆机属于特种起重作业工具，参数虚标会引发人身伤亡事故和海外诉讼。
* **占位符硬隔离防幻觉**：AI 自动翻译提示词中严禁直接输入包含物理参数的整段文案，必须采用 `{{specs.ratedLoadKg}}` 占位符隔离法，或仅翻译纯语义文本，数值部分由前端组件直接绑定。

### 3.5 交付与 CI/CD 落地视角 (`egm-implementation-readiness`)
* **GitHub Actions 三阶流水线**：
  1. `verify-baseline-integrity`：比对 PR 是否变动了 `src/data/baseline/`，若有未授权修改则直接阻断；
  2. `ai-i18n-sync`：检测英文变更 diff，自动调用 LLM API 生成多语种补丁 commit；
  3. `verify-content-baseline`：执行全站 121 个页面的端到端构建与现存 631 项合规性断言。

### 3.6 内容建模与结构演进视角 (`egm-structural`)
* **星型数据映射模型**：以 English 为中心，小语种各字段附带 `source_hash`，实现“英文母本变动 -> 小语种自动标黄提示 -> AI 辅助初翻 -> 工程师/运营合规确认”的标准化流转闭环。

---

## 4. 关键决策与系统蓝图 (Key Decisions & Technical Blueprint)

### 4.1 核心技术选型一览
* **CMS 操作层**：Keystatic（本地 `astro dev` 直开 + 线上基于 GitHub OAuth 的 Web 后台）
* **数据存储与版本控制**：GitHub Repository（单一可信源，物理拆分目录）
* **数据契约层**：Astro 5 Content Collections + Zod Literal 强校验
* **国际化联动引擎**：字段级哈希索引表 (`i18n-manifest.json`) + GitHub Actions
* **静态渲染与合规网关**：Astro 5 SSG + 现存 `contentPolicy.mjs`

### 4.2 架构拓扑关系

```
[ 研发工程师 (VS Code / Git) ]       [ 运营/审校人员 (Keystatic Web UI) ]
             │                                       │
             ▼                                       ▼
    ┌─────────────────────────────────────────────────────────┐
    │                GitHub Repository (SSOT)                 │
    │  ├─ src/data/baseline/       (CODEOWNERS: @engineering) │
    │  ├─ src/content/pages/       (CODEOWNERS: @content)     │
    │  └─ src/data/i18n-manifest/  (Hash-indexed status)      │
    └────────────────────────────┬────────────────────────────┘
                                 │
                         GitHub Actions
                                 │
      ┌──────────────────────────┼──────────────────────────┐
      ▼                          ▼                          ▼
 [1. 防篡改检查]          [2. AI 增量翻译]          [3. 内容政策校验]
(Zod 字面量对比)          (调用 LLM 生成 diff)       (现有 631 项规则)
                                 │
                                 ▼
                     [ Astro 5 静态构建 (SSG) ]
                                 │
                                 ▼
                    [ 121 个纯静态 HTML 分发 ]
```

---

## 5. 分阶段落地路线图 (Staging for Next Steps)

1. **第一阶段：物理事实隔离与防篡改门禁 (P0)**
   - 从现有配置中将 8 大物理参数拆分至独立文件 `src/data/baseline/equipment-facts.json`；
   - 编写严格的 Zod Schema，引入 `z.literal()` 锁定参数值；
   - 配置 `.github/CODEOWNERS`，将基线文件权限仅归属技术负责人。

2. **第二阶段：Keystatic 接入与 Astro 数据层升级 (P1)**
   - 安装 `@keystatic/astro` 并配置 `keystatic.config.ts`；
   - 打通本地开发模式与线上 GitHub Mode（OAuth 登录）；
   - 将现有 7 国语言页面的元数据与正文接入 Content Collections。

3. **第三阶段：多语言哈希索引与 AI 自动翻译流水线 (P2)**
   - 开发轻量级脚本维护 `i18n-manifest.json`；
   - 编写 GitHub Action：监听英文页面修改，自动化调用大模型翻译为其他 6 种语言并创建 PR；
   - 整合占位符保护机制，杜绝参数幻觉。

4. **第四阶段：全量迁移与全自动回归测试 (P3)**
   - 迁移全站 121 个静态页面至新体系；
   - 执行 `npm run build` 与 `verify-content-baseline.mjs`，确保构建耗时维持在 1.5 秒以内且零报错。
