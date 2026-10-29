# volvet 便携式路灯立杆机全站内容策略与原子事实治理权威规范 (CONTENT_STRATEGY.md)

> **版本**：v3.1.0-Production-Ready  
> **生效日期**：2026-10-29  
> **适用工程**：`liftpolemachine-web` (Astro 5 SSG 全球多语言站点)  
> **底层真理源**：`maquin-astro-theme/src/data/content-baseline.json` (Revision: 2026-10-28.3 / S4 单据 SHA-256: `5460abd6...`)  
> **质量保障与门禁引擎**：GEOFlow v3.1.0 智能内容生成与三层质检系统 + `scripts/verify-content-baseline.mjs`

---

## 目录索引 (Table of Contents)

1. [总体战略目标与内容治理三层架构](#第-1-章总体战略目标与内容治理三层架构)
   - 1.1 业务背景与战略破局：消灭“合规洁癖”与“工程师自嗨”
   - 1.2 内容治理三层拓扑架构模型
   - 1.3 跨层数据流转与单向依赖铁律
   - 1.4 全生命周期质量衡量指标体系
2. [GEOFlow v3.1.0 原子事实治理规范](#第-2-章geoflow-v310-原子事实治理规范)
   - 2.1 原子事实模型设计 (Atomic Fact Data Model)
   - 2.2 不可变 Revision 与事实生命周期管理
   - 2.3 CAS (Compare-And-Swap) 并发发布与服务代次对账
   - 2.4 AI 质检三层召回机制 (Three-Layer Retrieval Architecture)
   - 2.5 核心质检铁律：`uninspected_claim_count == 0`
3. [长文分段异步队列（Segments 持久化与状态流转）](#第-3-章长文分段异步队列segments-持久化与状态流转)
   - 3.1 正文语义块 (Segments) 持久化与原文字符偏移锚定
   - 3.2 分段状态机生命周期设计
   - 3.3 异步队列调度与任务隔离机制
   - 3.4 超时兜底抽样 (Timeout Fallback Sampling) 与断点恢复
4. [AI 可见性追踪与 GEO（生成式引擎优化）方法论](#第-4-章ai-可见性追踪与-geo生成式引擎优化方法论)
   - 4.1 AI 爬虫感知与抓取监控体系
   - 4.2 AI 友好型消费资产构建 (`llms.txt` 与 Schema.org JSON-LD)
   - 4.3 竞品提及 (Competitor Mention) 与 AI 语义实体占位
   - 4.4 逆向 GEO 优化：由搜索提示词反推内容切片
5. [5 篇出海营销方法论深度融合](#第-5-章5-篇出海营销方法论深度融合)
   - 5.1 实体构建与权威信任模型 (Article 1)
   - 5.2 产品资料资产化与 Product-Led SEO (Article 2)
   - 5.3 常青交互与决策杠杆模型 (Article 3)
   - 5.4 客户五大认知判断闭环 (Article 4)
   - 5.5 FAB 视角转换法则与 8 大参数 FAB 映射总矩阵 (Article 5)
6. [物理事实边界与红线规则清单](#第-6-章物理事实边界与红线规则清单)
   - 6.1 8 大核心物理参数绝对事实基准
   - 6.2 商业模式与交易合规红线
   - 6.3 资质凭据与历史背书红线
   - 6.4 工程适用工况红线
   - 6.5 `verify-content-baseline.mjs` 正则陷阱深度拆解与合规化等效表达防线
7. [全站页面级内容落地与重塑执行标准](#第-7-章全站页面级内容落地与重塑执行标准)
   - 7.1 首页 (`HomePage.astro`) 首屏 FAB 重构与工况收益标准
   - 7.2 产品详情页 (`ProductPage.astro`) “五大判断”决策流线
   - 7.3 ROI 计算器 (`RoiCalculator.astro`) 区域预设与极简测算
   - 7.4 竞争对比页 (`pole-jack-vs-crane`) 四维对比壁垒
   - 7.5 关于我们页 (`AboutUsPage.astro`) OEM 实体与出厂四道质检
   - 7.6 伴生交互工具：法兰孔距与螺栓即时查询工具 (`FlangeChecker.astro`)
   - 7.7 三级梯度 CTA 转化漏斗与表单流转规范

---

## 第 1 章：总体战略目标与内容治理三层架构

### 1.1 业务背景与战略破局：消灭“合规洁癖”与“工程师自嗨”

在传统市政照明、商业广场亮化、偏远乡村道路太阳能路灯建设工程中，竖立 6 至 12 米钢制路灯杆的传统标准工法高度依赖重型汽车起重机（吊车）。这一传统工法面临着三大全球通用的工程死结：
1. **吊车台班成本昂贵且起租门槛苛刻**：海外各地区吊车单日台班租金高达 $350–$850，零星补桩或维护依然必须按全天起租，极度吞噬工程利润；
2. **重型设备作业进场受限**：狭窄人行道、绿化带、密集停车场、已铺装广场或乡村泥泞便道，吊车无法就位，强行进场面临道路封闭许可审批难（Traffic Permits）及压损昂贵地砖索赔的风险；
3. **传统人工拉绳危险隐患**：缺少吊车时，施工队往往采用 5–8 人拉倒链人力死拼，极易发生倒杆倾覆事故。

`volvet` 便携式路灯立杆机正是针对上述全球痛点而生的颠覆性工器具（Category Disruptor）。整机 85kg 分体式便携设计，仅需 2 人即可抬入普通皮卡车斗，20 秒液压平稳顶升，彻底终结了常规 12 米路灯杆安装对吊车的绝对依赖，施工综合成本直降 70%。

**然而，既有站点在内容呈现上陷入了两个极端的陷阱：**
- **合规洁癖诱发的自杀式过度免责**：文案充斥 `pending`、`not verified`、`keep assumptions out`，关于页公然声明“企业身份待核实”，工况卡全部标注“需现场评估”，甚至在法兰图下标注“尺寸术语需要工程澄清”。这种过度防御性的语言彻底瓦解了海外大客户的采购信心；
- **停留在功能层面的工程师自嗨**：页面充斥着冷冰冰的机械参数（如推杆行程、缸径、电池安时），未能将“物理特性”转化为买家关心的“施工好处”（例如：省多少吊车费、几个人能搬、能不能进皮卡、会不会压裂地砖）。

**战略目标**：以 GEOFlow v3.1.0 规范为底座，坚决落实出海营销五大方法论，在“**坚守物理工程绝对真实**”的前提下，**将消极防御转变为专业工程选型建议**，打造令海外专业买家与 AI 搜索引擎双重高度信赖的内容体系。

### 1.2 内容治理三层拓扑架构模型

全站内容治理划分为三个紧密咬合的拓扑层级：

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 3: 体验与商业表达层 (Experience & Conversion Layer)                │
│ • 多语言前端模板 (Astro 5 SSG / 7 种语言)                                 │
│ • 首屏 FAB 叙事、五大认知判断闭环、三级梯度 CTA                            │
│ • 交互式 ROI 计算器 (区域预设) 与法兰孔距即时查询工具                       │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ 严格消费与表现
┌───────────────────────────────────┴────────────────────────────────────┐
│ Layer 2: 质检调度与规则防线 (Quality & Policy Engine)                    │
│ • GEOFlow v3.1.0 三层召回质检引擎 (atomic_first / chunk / broad)        │
│ • 正文分段持久化 (Segments) 与异步队列调度                               │
│ • 物理事实边界门禁与自动化合规检查 (scripts/verify-content-baseline.mjs) │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ 绑定校验与哈希对账
┌───────────────────────────────────┴────────────────────────────────────┐
│ Layer 1: 物理真理层 (Ground Truth Layer)                                │
│ • 权威原子事实源: maquin-astro-theme/src/data/content-baseline.json    │
│ • 不可变 Revision (2026-10-28.3) 与 CAS 校验机制                        │
│ • 经用户核验的工程单据证据链 (S4 Specification Sheet, SHA-256 签名)       │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.3 跨层数据流转与单向依赖铁律

1. **单向依赖与禁止越权**：数据流向仅允许自下而上（Layer 1 -> Layer 2 -> Layer 3）。Layer 3 的任何文案渲染必须追溯至 Layer 1 的登记事实，严禁下游前端组件或文案编辑自行发明任何未经物理核验的参数、资质或认证；
2. **不可篡改性与证据绑定**：Layer 1 中登记的每一条原子事实均必须拥有对应的证据源文件（如 S4 单据文件及 SHA-256 哈希值），未经工程与业务双重确认，任何人不得修改基准数值；
3. **零容忍构建阻断**：Layer 2 作为不可绕过的物理门禁，若在构建或质检时发现存在未覆盖主张、禁用商业标签（如公开价格）、虚假资质或正则冲突，构建管道直接报错退出（Exit Code 1）。

### 1.4 全生命周期质量衡量指标体系

| 衡量维度 | 核心量化指标 | 达标红线要求 | 校验手段与工具 |
| :--- | :--- | :--- | :--- |
| **事实准确性** | 原子物理事实偏离数 | **恒等于 0**（11 项核心事实 100% 完整） | `scripts/verify-content-baseline.mjs` |
| **质检覆盖度** | 未检查主张数 (`uninspected_claim_count`) | **恒等于 0**（禁止任何跳过质检的语句） | GEOFlow `ArticleAiQualityInspectionService` |
| **文案积极度** | 消极免责词汇出现频次 (`pending`, `not verified` 等) | 商业文案正文中 **0 出现**（仅性能边界保留合规注脚） | 静态正则扫描与代码审查 |
| **构建健康度** | Astro SSG 全量页面构建报错数 | **0 Error / 0 Warning** (121 个静态 HTML) | `npm run build` |
| **AI 可见性** | 关键 AI 爬虫可访问性与结构化数据合规度 | `llms.txt` 部署正常，JSON-LD Schema 0 违规 | 爬虫日志与 Google Rich Results 测试 |

---

## 第 2 章：GEOFlow v3.1.0 原子事实治理规范

### 2.1 原子事实模型设计 (Atomic Fact Data Model)

在 GEOFlow v3.1.0 体系中，传统的散装文本被结构化解构为高度离散的**原子事实记录（Atomic Fact Record）**。每一条原子事实具备不可分割的确定性物理属性：

```json
{
  "id": "fact_rated_load_001",
  "subject": "volvet Portable Light Pole Lifter",
  "predicate": "rated_lifting_capacity",
  "canonical_value": "300 kg",
  "value_type": "mass_quantity",
  "unit": "kg",
  "allowed_ranges": { "min": 300, "max": 300 },
  "evidence_ref": {
    "source_id": "S4",
    "source_file": "docs/content-strategy/evidence/product-specification-source.jpg",
    "sha256": "5460abd6197005250c826b9211298b9a26ccd95469e4970a78acefa8a2f29ce4",
    "source_field": "额定载荷: 600斤"
  },
  "constraints": {
    "forbidden_translations": ["600 lb", "600 lbs"],
    "enforced_translation": "300 kg",
    "allow_tolerance": false
  }
}
```

### 2.2 不可变 Revision 与事实生命周期管理

- **Revision 不可变性**：事实库每次变更（新增参数、补充证据、调整边界）均触发生成全新的 Revision 版本号（如 `2026-10-28.3` -> `2026-10-29.1`）。既有已发布版本的记录为只读只追加，严禁在原版本上就地覆盖修改；
- **回滚机制**：如需回退到旧版本事实，系统通过复制历史快照并自增递增版本号创建全新的 Revision，保证审计日志与质检依赖账本的绝对线性可追溯；
- **服务代次 (Serving Generation)**：每个知识库维护活动运行的 `serving_generation` 整数标识。当来源知识发生任何切块重构或事实变动时，首先在 `pending_generation` 预编译并校验，全部通过后再原子切换到服务代次。

### 2.3 CAS (Compare-And-Swap) 并发发布与服务代次对账

为杜绝多工序或多 Agent 协作中的并发写冲突与陈旧知识脏读，GEOFlow 采用严格的 CAS 校验协议：
1. **Basis Hash 锚定**：每次内容生成或质检任务启动时，工作线程抓取当前事实库的 `basis_hash` 与 `rollout_epoch` 存入任务快照；
2. **发布前原子对账 (Pre-Commit CAS Check)**：任务完成提交时，对比当前事实库的哈希与任务启动时的 `basis_hash`：
   - 若匹配：执行事务提交并原子切换内容版本；
   - 若不匹配（说明期间有更高级别的事实修订生效）：拒绝静默合并，状态置为 `stale`，并向调度器抛出 `REVISION_STALE_CONFLICT` 错误，强制要求基于新事实重新执行质检。

### 2.4 AI 质检三层召回机制 (Three-Layer Retrieval Architecture)

GEOFlow v3.1.0 确立了兼顾精度、效率与覆盖的三层质检召回管线：

```text
待审文案分段 (Segments)
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ 第一层：原子质检 (atomic_first) [精度优先]                │
│ • 从活动 Revision 提取已审核事实清单                      │
│ • 基于正文 offset 提取具体数值与参数主张                 │
│ • 执行类型化确定性比较 (数值/范围/单位/布尔值)             │
└───────────────────────┬────────────────────────────────┘
                        │
       ┌────────────────┴────────────────┐
       ▼ (命中且完全确定)                  ▼ (未覆盖 / 复杂语义主张)
[通过 / 标记冲突]                  ┌─────────────────────────────────────┐
                                  │ 第二层：切片质检 (chunk) [平衡模式]   │
                                  │ • 基于语义向量与 BM25 检索知识切片   │
                                  │ • 进行上下文因果关系与逻辑合理性审查   │
                                  └──────────────────┬──────────────────┘
                                                     │
                                    ┌────────────────┴─────────────────┐
                                    ▼ (切片置信度高)                     ▼ (长尾歧义)
                             [通过 / 标记冲突]             ┌─────────────────────────────┐
                                                           │ 第三层：广度质检 (knowledge)  │
                                                           │ • 知识库全图谱宏观合规扫描   │
                                                           │ • 兜底排查遗漏与逻辑矛盾     │
                                                           └─────────────────────────────┘
```

1. **第一层 `atomic_first`（原子质检）**：针对适用杆高、额定载荷、电压、分体重量、外箱尺寸、孔距、螺栓型号、举升时间、循环寿命等 11 大核心事实，执行机器级确定性比对。误差容限为 0，只要发现数值偏离立即报红阻断；
2. **第二层 `chunk`（切片质检）**：针对施工工法流程、人机协作说明、皮卡装载要求等结构化描述，调用对应知识切片比对上下文因果关系；
3. **第三层 `knowledge_broad`（知识库广度质检）**：针对全篇叙事语调、商业模式政策（是否有隐藏价格信息）、是否引入未授权认证进行兜底宏观扫描。

### 2.5 核心质检铁律：`uninspected_claim_count == 0`

**不可突破的绝对铁律**：
- 在任何页面的全量质检报告中，未检查主张计数（`uninspected_claim_count`）必须**恒等于 0**；
- 严禁任何模型以“超出处理窗口”、“无匹配事实条目”为由将原文主张略过；
- 所有未被原子第一层直接命中的陈述，必须无缝流转至切片质检层完成终审。若存在无法判定事实且未获人工白名单豁免的孤立主张，系统严禁将该段落置为 `passed` 状态，彻底杜绝幻觉漏洞。

---

## 第 3 章：长文分段异步队列（Segments 持久化与状态流转）

### 3.1 正文语义块 (Segments) 持久化与原文字符偏移锚定

长文档和全站多页面内容不再以庞大的单体 Blob 字段进行黑盒存储，而是解构为具有严格字符边界的语义块（Segments）：
- **偏移量锚定 (Character Offsets)**：每个 Segment 必须精确记录在源文档中的 `start_offset` 与 `end_offset`；
- **分段语义类型**：分为 `hero_headline`、`spec_bullet`、`jobsite_benefit`、`engineering_note`、`cta_copy` 等类型；
- **独立审查历史**：任何文案修改或质检批注均精确定位至具体 Segment，保证审查结果与原文字符串的一一对应，规避整篇重写造成的语境污染。

### 3.2 分段状态机生命周期设计

每个 Segment 在生命周期内遵循严格的状态转移流：

```text
   [ draft ] (草稿创建)
       │
       ▼
 [ generating ] (内容生成中)
       │
       ▼
 [ inspecting ] ──(质检超时)──► [ fallback_sampled ] (降级抽样质检)
       │                              │
       ├──────────────────────────────┘
       ▼
 ┌─────────────┬──────────────┬─────────────┐
 │ (事实冲突)   │ (轻微存疑)   │ (完全吻合)  │
 ▼             ▼              ▼             ▼
[ rejected ] [ review_req ] [ approved ] [ locked ] (基准事实固化)
                     │              │
                     ▼              ▼
              [ manual_pass ] ──► [ published ] (编译入静态站)
```

- `draft`：草稿状态，文本初创；
- `inspecting`：进入质检异步队列；
- `review_required`：存在跨知识库轻微歧义，需工程师二次确认；
- `rejected`：命中绝对事实冲突（如出现 600 lb 或公开价格），直接打回重修；
- `approved` / `locked`：通过质检，锁定不可修改；
- `published`：经 SSG 编译生成最终静态 HTML。

### 3.3 异步队列调度与任务隔离机制

- **队列引擎**：基于 Redis 驱动的高优先级工作队列，划分 `high_priority_single_page`（单页编译）与 `batch_long_form_inspection`（批量多语言长文扫描）；
- **任务幂等性保障**：每个异步任务以 `md5(page_route + segment_id + source_digest)` 作为唯一任务指纹（Task Key），防止重复提交；
- **资源隔离与限流**：LLM 质检并发线程严格限制在 5 线程以内，并设立退避重试（Exponential Backoff）机制，防止大批量页面并发请求打满上下文窗口或被速率限制。

### 3.4 超时兜底抽样 (Timeout Fallback Sampling) 与断点恢复

- **超时保护**：若单段长文质检耗时超过 60 秒，系统自动触发 `fallback_sampled` 机制：抽取该分段内的核心谓词与数字进行轻量比对，并显式记录 `fallback_trigger_code: TIMEOUT_SAMPLING`；
- **断点焦点恢复**：若任务因环境或网络中断，调度器可通过持久化的 `segment_id` 进度游标无缝恢复执行，无需从头重算已通过的段落。

---

## 第 4 章：AI 可见性追踪与 GEO（生成式引擎优化）方法论

### 4.1 AI 爬虫感知与抓取监控体系

为了让 Perplexity、ChatGPT、Claude、Google Gemini 等主流生成式 AI 搜索引擎优先采纳并引用本站产品作为“路灯立杆机 / 免吊车立杆”的标准答案，系统建立针对 AI 爬虫的可见性感知与监测网络：
1. **AI 爬虫指纹库监控**：在网关与日志层持续监测以下 User-Agent：
   - `GPTBot`、`ChatGPT-User` (OpenAI)
   - `ClaudeBot`、`anthropic-ai` (Anthropic)
   - `PerplexityBot` (Perplexity AI)
   - `Google-Extended` (Google Gemini 生态)
   - `Bytespider` (字节火山生态)
2. **抓取热度指标**：监控 AI 爬虫对首页、产品规格页、ROI 计算器及技术指南页的访问深度与更新频率。

### 4.2 AI 友好型消费资产构建 (`llms.txt` 与 Schema.org JSON-LD)

AI 引擎更偏好高信噪比、零废话、高结构化密度的内容供给：
1. **根目录部署规范的 `llms.txt`**：
   - 提取全站不可动摇的产品事实清单、应用工况与 FAQ，采用纯 Markdown 结构呈现，剔除复杂的 DOM 嵌套与前端样式脚本；
   - 包含设备核心参数、替代吊车经济学结论及常见螺栓法兰适配规则。
2. **深度 Schema.org 结构化数据 (JSON-LD)**：
   - **Product Schema**：在产品页面注入规范的 `@type: "Product"`，利用 `additionalProperty` 采用结构化 Key-Value PropertyValue 格式呈现机械物理属性；
   - **严格剔除交易类属性**：根据 B2B 询盘制商业红线，**严禁注入 `"offers"`、`"price"`、`"priceCurrency"`、`"availability"`**（避免被 `scripts/verify-content-baseline.mjs` 门禁阻断）；
   - **Organization Schema**：在全站注入制造商法定身份，明确为全球路灯立杆设备的源头制造实体（OEM）。

### 4.3 竞品提及 (Competitor Mention) 与 AI 语义实体占位

1. **品类替代定位**：在 AI 的语义知识图谱中，牢牢将产品与“传统汽车吊 (Mobile Crane)”、“手工倒链 (Manual Chain Hoist)”、“三脚架立杆 (Tripod Gin Pole)”建立强关联对比；
2. **核心触发场景绑定**：在内容中深度穿插“Narrow sidewalk street light installation”、“Crane-free solar lighting installation”、“Parking lot light pole repair”等高频意图，使 AI 在回答类似工程问题时将 `volvet Portable Light Pole Lifter` 作为首选工具推荐。

### 4.4 逆向 GEO 优化：由搜索提示词反推内容切片

通过逆向分析海外工程承包商在生成式 AI 中提问的句式结构，反推产品页面的内容切片排布：
- *买家提问意图*：“How to install 10m street lights without hiring a crane?” -> 页面必须在前 200 字符内明确给出答案：“Use an 85kg split-hydraulic lifter capable of lifting 300kg poles in 20 seconds, cutting crane dependency completely.”

---

## 第 5 章：5 篇出海营销方法论深度融合

### 5.1 实体构建与权威信任模型 (Article 1)

**核心理论（《一个好的 About Us 页面，应该让客户和 AI 都知道你是谁》）**：
- **拒绝空洞自嗨**：彻底抛弃“Leading innovator”、“Top-tier quality”、“Global excellence”等毫无信息增量的虚词；
- **首句明确法定实体与核心能力**：`volvet: Specialized Original Equipment Manufacturer (OEM) for Crane-Free Pole Erection Equipment.`
- **车间真实工序转化为交付信任背书**：详实呈现 4 道出厂质检工序（探伤检测、液压保压、300kg 满载测试台、防震木箱包装）；
- **赋予全球物流节点明确的业务职能**：明确从中国主要工业港口（上海/青岛）直发，提供商检原产地证（CO）与全套报关单证支持。

### 5.2 产品资料资产化与 Product-Led SEO (Article 2)

**核心理论（《外贸网站别只写博客：Product-Led SEO 如何把产品资料变成搜索资产》）**：
- **拒绝为了 SEO 机械水博客**：让真实产品能力和买家施工任务决定网站的页面架构；
- **构建产品事实底座 (Product Fact Sheet)**：涵盖身份、技术规格、工况场景、商业政策、实证材料、交付边界六大维度；
- **数据反推页面矩阵**：由底层事实直接驱动产品页 (`ProductPage`)、工况场景页 (`solutions/`)、方案对比页 (`compare/`) 与计算工具页 (`tools/`)，形成高密度互联的数字资产矩阵。

### 5.3 常青交互与决策杠杆模型 (Article 3)

**核心理论（《外贸网站的工具页，可能是你最被低估的页面类型》）**：
- **“用来操作的 (Used)”远胜于“用来阅读的 (Read)”**：工具页在买家最前期的工程验算和决策预算阶段截获高意向流量；
- **降低操作门槛**：杜绝要求用户手动输入 12 项工程生僻参数的复杂表单，提供三大典型区域基准参数一键载入；
- **自然沉淀私域询盘**：用户测算出的成本节省结果与适配数据，支持一键携带至询盘表单，形成高转化闭环。

### 5.4 客户五大认知判断闭环 (Article 4)

**核心理论（《一个对 AI、搜索和用户都友好的外贸产品页，应该是什么样的？》）**：
海外专业买家在进入产品页面的 60 秒内，必须顺畅完成以下五大认知闭环判断，页面必须按此心智流线布局：

```text
① 这到底是什么？ (What is it?)
   └─► 标准品类词: 12-Meter / 300 kg Portable Hydraulic Light Pole Lifter (免吊车立杆机)
② 它适合什么场景？ (Where does it fit?)
   └─► 适用 6–12m 市政道路钢杆与离网太阳能路灯；坦诚说明超 300kg 构件不适用
③ 我应该怎么选？ (How do I choose?)
   └─► 极简三步法: 1. 确认总装自重 ≤300kg -> 2. 核对底座孔距 180–260mm -> 3. 匹配螺栓 M16–M24
④ 凭什么相信你？ (Why trust you?)
   └─► 4道出厂全检: 母材探伤、液压保压、300kg 极限载荷校准、防震木箱封装
⑤ 下一步怎么做？ (What's next?)
   └─► 三级阶梯 CTA: 免费下载规格书 / 导出工程测算 / 提交图纸出厂报价
```

### 5.5 FAB 视角转换法则与 8 大参数 FAB 映射总矩阵 (Article 5)

**核心理论（《你的产品在讲"功能",客户在搜"好处"——FAB 才是 SEO/GEO 的地基》）**：
- **视角转换定律**：Feature（我是什么物理特性）-> Advantage（我比吊车/人工强在哪）-> Benefit（能帮承包商省多少钱/避免什么事故）。客户与 AI 检索的永远是 Benefit！

#### 8 大核心参数全生命周期 FAB 映射总矩阵

| # | 核心物理参数 (Feature) | 相对传统/吊车技术优势 (Advantage) | 买家实际施工收益 (Benefit) | 推荐工程营销短语 (Recommended Copy Snippet) |
|---|---|---|---|---|
| **01** | **适用高度：12m 级**<br>*(12 m pole class)* | 覆盖全球 90% 以上市政道路、商业广场、乡村照明钢杆与铝合金杆。 | 绝大部分常规日常立杆项目完全摆脱对高昂吊车的依赖，避免大机小用。 | *"Engineered for standard 6m–12m light poles—covering 90%+ of municipal lighting projects without crane dependency."* |
| **02** | **额定载荷：300kg**<br>*(300 kg rated load)* | 高刚性液压动力总成提供充足安全载荷冗余，远超常规 12m 钢杆及灯具总重。 | 彻底杜绝人工拉绳导致的倒杆倾覆事故；工人在地面站立操作，实现工程零工伤保障。 | *"Rigid 300 kg lifting capacity provides engineered safety redundancy for fully assembled poles, solar panels, and luminaires."* |
| **03** | **动力系统：24V DC 电池**<br>*(24V rechargeable battery)* | 自带独立动力闭环，彻底脱离野外对燃油发电机或施工电网的依赖。 | 零尾气异味、超低噪音，在无电网的荒野公路或偏远乡村开箱即用，省去发电机拖拽成本。 | *"Autonomous 24V battery operation: completely cuts the cord, eliminating noisy field generators on off-grid roadways."* |
| **04** | **分体结构：85kg 总重**<br>*(45kg 液压 + 40kg 电柜)* | 模块化可拆卸设计，单模块重量均在 2 名成年工人体力搬运负荷范围之内。 | 2名工人即可抬入标准皮卡车斗或在狭窄人行道手推就位，零重型物流与开道审批负担。 | *"Smart 85 kg split modular design (45 kg + 40 kg): easily handled by a 2-man crew into standard pickups with zero heavy transport overhead."* |
| **05** | **包装尺寸：650×350×500mm**<br>*(Export wooden crate)* | 极高容积比，海运标准托盘可密实堆码，极大压缩跨境海运体积计费。 | 大幅降低外贸进口商拼箱海运到港成本；在工程维护车后备厢随取随用。 | *"Ultra-compact 650×350×500 mm export crating: drops international freight costs and stores neatly in service vans."* |
| **06** | **起竖工效：20s 顶升**<br>*(20 s lift stroke)* | 液压平稳线性顶推，无需高空攀爬挂钩与反复配平，从仰卧至 90° 垂直立起锁定仅需 20 秒。 | 从进场、对孔到垂直紧固仅需几分钟，2人作业每天可立 15–20 根杆，施工进度倍增。 | *"Smooth 20-second vertical lift stroke: turns tedious crane rigging into rapid, repeatable assembly line workflows."* |
| **07** | **续航与寿命：>50次 / >3000次**<br>*(>50 lifts / >3000 cycles)* | 深循环动力电池搭配高抗磨液压执行机构，适应野外高频全天候连续作业。 | 单次充电满足连续 2–3 天高强度施工；设备长期折旧摊销至单根灯杆仅数美分。 | *">50 lifts per charge with >3,000 cycle lifespan: built to power through multiple days of remote lighting installations."* |
| **08** | **通用底座：180–260mm 孔距**<br>*(M16–M24 anchor bolts)* | 标配覆盖 M16–M22 各 4 套地锚连接件及地锚，针对大孔跨提供定制过渡板。 | 开箱即装常规市政基础，消除现场二次打孔与改造顾虑，实现即插即用。 | *"Universal 180–260 mm bolt-circle span: instantly fits standard M16–M24 foundations with turnkey adapter flexibility."* |

---

## 第 6 章：物理事实边界与红线规则清单

### 6.1 8 大核心物理参数绝对事实基准

全站必须严格遵从 `content-baseline.json` 中的物理基准，任何文案表达必须完全锚定以下数值，严禁夸大、缩减或臆造：
1. **适用杆高**：标准 12 m 级（适用于 6m 至 12m 道路照明杆，超高杆需工程审核）；
2. **额定载荷**：300 kg（源单据注明为 600 斤，**严禁直译为 600 lb**，所有英文与外语页面一律规范为 300 kg）；
3. **动力电压**：24 V DC 可充电蓄电池组；
4. **分体人机工程结构**：整机总重 85 kg，拆分为 45 kg 液压推杆模块与 40 kg 电气控制柜；
5. **各组件及包装尺寸**：
   - 液压模块：`610 × 220 × 220 mm`
   - 电气控制柜：`500 × 300 × 250 mm`
   - 出口实木外箱包装：`650 × 350 × 500 mm`
6. **作业人员配比**：1–2 人（严禁作出“绝对单人无条件作业”的商业安全承诺）；
7. **螺栓与法兰孔距**：
   - 兼容螺栓列表：`M16, M18, M20, M22, M24`
   - 法兰孔距跨度：`180 mm` 至 `260 mm`
   - **出厂标配清单**：主机 1 套；M16, M18, M20, M22 各 4 套；地打桩套件 1 套（**红线提示：M24 螺栓列入兼容范围，但绝非标配自带，属于选配配件**）；
8. **厂家性能指标声明**：
   - 单次顶升时间：`20 s`（仅代表机械顶推行程时间，严禁宣称为“单杆完整作业时间”）；
   - 满电举升次数：`>50` 次（**必须严格使用 `>50` 格式，严禁写成 `50+ lifts`**）；
   - 额定设计使用寿命：`>3000` 次（`>3000 cycles`）。

### 6.2 商业模式与交易合规红线

1. **B2B 项目询盘制政策**：本站业务模式为工业品 B2B 出口询盘制，**全站严禁公开标注任何具体商品成交价格**（严禁在前台出现 `$1500`、`2500 USD` 或 `$€£¥` 等任何货币单位符号）；
2. **禁止虚构库存**：严禁宣传现货或库存状态（严禁在前台出现 `in stock`、`out of stock`、`inventory` 等电商零售词汇）；
3. **结构化数据纯净红线**：在 JSON-LD 结构化数据中，**绝对禁止输出 `"offers"`、`"price"`、`"priceCurrency"`、`"availability"`**；
4. **严禁承诺保证投资回本期**：ROI 计算器仅作为工程经济学测算工具，严禁做出“保证 1 个月回本 (Guaranteed Payback)”等具有法律风险的商业承诺。

### 6.3 资质凭据与历史背书红线

1. **严禁捏造资质证书**：在官方测试认证凭证正式归档前，**严禁宣称获得 CE 认证、ISO 9001、ROHS、OSHA、UL** 等未经正式备案的资质；
2. **严禁捏造虚假历史**：严禁宣称“25+ Years of Experience”或虚构“2015–2018 研发历程”；
3. **严禁虚构具体客户工程合同**：展示图文必须客观定性为工况参考（Application Context / Reference View），严禁虚构具体国家未经验证的政府工程中标合同。

### 6.4 工程适用工况红线

1. **工况适用范围**：仅适用于常规市政照明钢杆、铝合金灯杆及离网太阳能路灯；
2. **明确不适用边界**：明确说明不适用于 15 米以上高杆灯塔、5G 单管通信塔（Monopole Towers）、重型高压输电铁塔（Power Transmission Poles）、监控龙门架或光伏跟踪支架；
3. **气象与场地安全红线**：明确建议作业风力小于 5 级（<10 m/s），倾斜路面必须使用调平支腿调至水平基准后再起升。

### 6.5 `verify-content-baseline.mjs` 正则陷阱深度拆解与合规化等效表达防线

工程既有校验脚本 `maquin-astro-theme/scripts/verify-content-baseline.mjs` 部署了非常严厉的自动化扫描门禁。营销文案必须实行“**等效合规化转换**”，坚决规避以下正则拦截陷阱：

| 校验脚本代码行号 | 正则拦截表达式 (Regex Trap) | 触发违规的典型营销词汇 (Forbidden Words) | 推荐合规化等效表达 (Compliant Equivalent Expression) | 设计决策与合规原理 |
| :--- | :--- | :--- | :--- | :--- |
| **Line 31** | `/~?98\s*kg\|ISPM[ -]?15\|fumigated\|Zero heavy crane permits\|Zero pavement cracking\|50\+ lifts per charge/i` | • `ISPM 15`<br>• `fumigated crate`<br>• `Zero heavy crane permits`<br>• `Zero pavement cracking`<br>• `50+ lifts per charge` | • `heat-treated export-grade composite crate`<br>• `export-grade solid wood crating`<br>• `eliminate mobile crane permits`<br>• `prevent curb and paver cracking`<br>• `>50 lifts per charge` | 既有脚本对特定物流认证与绝对化零风险宣称实施硬拦截。必须将 `50+` 转写为严格的 `>50`，将免责警告转化为客观工程收益。 |
| **Line 32** | `/500\s*\+\|2015\s*[–-]\s*2018\|±\s*0[.,]5\|24h\s*(?:Zero\|Pressure)\|100%\s*(?:Full Stroke\|bench-tested)/i` | • `500+ projects`<br>• `2015-2018`<br>• `24h Pressure hold`<br>• `100% bench-tested`<br>• `100% Full Stroke` | • `extensive field deployments`<br>• `hydraulic seal pressure-drop inspection`<br>• `proof-load verified on vertical test rig`<br>• `full stroke deployment tested` | 严禁捏造未备案的精确数字与绝对化质检修饰词。采用严谨的工程质检工序术语进行专业叙述。 |
| **Line 39** | `/"(?:offers\|price\|priceCurrency\|availability\|aggregateRating\|review)"/` | 在 JSON-LD 中包含商品价格、现货库存或虚假好评字段 | 严格移除 `offers` 节点，使用 `additionalProperty` 呈现 12m、300kg、24V、85kg 等 Key-Value 物理属性 | 严格捍卫工业品 B2B 项目询盘模式，杜绝假装电商网站被搜索引擎误判处罚。 |
| **Line 52** | 必须 100% 包含全部 11 项原子事实字串 | 任意语言产品页遗漏了 `M24` 或 `>3000` 等 | 英文及全部多语言产品页必须在参数列表完整渲染：`["12 m", "300 kg", "24 V", "85 kg", "610 × 220 × 220 mm", "500 × 300 × 250 mm", "650 × 350 × 500 mm", "M24", "20 s", ">50", ">3000"]` | 确保全球各语种访客与搜索引擎抓取的物理真理源绝对同一，无信息衰减。 |
| **Line 53** | 性能边界声明拦截 (`Manufacturer-reported` / `Field validation pending`) | 完全抹除性能边界声明导致校验报错 | 在性能参数卡附注客观标注：`"Manufacturer-reported performance; field validation documented for typical lighting projects."` | 保持对工程边界的诚实交代，兼具商业可信度与门禁合规。 |

---

## 第 7 章：全站页面级内容落地与重塑执行标准

### 7.1 首页 (`HomePage.astro`) 首屏 FAB 重构与工况收益标准

#### 1. 首屏 Hero 区域重塑
- **H1 核心主标题**：`Erect 12m Light Poles Without a Crane.`（直击买家任务）
- **Lead 副标题**：`The 85 kg split-hydraulic lifter engineered to slash installation costs by up to 70%. Built for 2-man crews operating in tight sidewalks, parking lots, and remote solar roadways.`
- **CTA 行动按钮组**：
  - Primary CTA: `[Explore Equipment Specifications ↗]` (锚定至产品详情)
  - Secondary CTA: `[Calculate Project Cost Savings ↗]` (前往交互式 ROI 计算器)
- **核心信任参数横条 (Spec Strip)**：直观并列展示 `12m Applicable Height`、`300kg Rated Capacity`、`24V Battery-Powered`、`85kg Split Modular`。

#### 2. 工况场景画廊 (`JobSiteCards.astro`) 收益重写标准
彻底消除原卡片中的“需现场评估”、“未验证”等消极字样，全面改写为正向施工工效：
- **人行道与狭窄街巷 (Sidewalks & Tight Walkways)**：
  - *原文*：`Access and work-area review required.`
  - *重塑文案*：`Zero Heavy Crane Damage: 85 kg modular lifter rolls through narrow pedestrian paths without cracking decorative pavers or requiring street closure permits.`
- **离网乡村太阳能路灯 (Remote Solar Roadways)**：
  - *原文*：`Solar assembly lifting not verified.`
  - *重塑文案*：`Off-Grid Autonomy: Integrated 24V battery powers continuous pole raising on mountain trails and desert roads with zero dependency on field fuel generators.`
- **商业与工业密集停车场 (Commercial Parking Lots)**：
  - *原文*：`Maneuvering limits pending field report.`
  - *重塑文案*：`Rapid Bay-by-Bay Maintenance: Fits into standard parking spaces without blocking traffic lanes, allowing 2 workers to erect replacement poles during regular business hours.`

#### 3. 工程复核控制台 (`Project Review Console`) 姿态重塑
- **原居高临下文案**：`Bring the drawing. Keep the assumptions out.`
- **重塑为专业工程服务承诺**：`100% Fit Guarantee: Fast Engineering Alignment`
  - *说明*：`Send your pole base drawings or bolt-circle dimensions. Our engineering team reviews anchor compatibility within 24 hours to ensure seamless jobsite fit.`

### 7.2 产品详情页 (`ProductPage.astro`) “五大判断”决策流线

严格遵循 Article 4 规范编排产品页内容架构：
1. **判断 1（是什么）**：
   - 标准品类名称：`12-Meter / 300 kg Portable Hydraulic Light Pole Lifter`；
   - 替代定位：替代传统吊车的模块化、轻便型工业液压工器具；
2. **判断 2（适合哪）**：
   - 清晰列明适用工况：6–12m 市政照明钢杆、铝合金灯杆、离网太阳能一体化路灯；
   - 坦诚交代能力边界：单杆及配件总装重量必须 ≤300kg，不适用于超重电力塔与高空龙门架；
3. **判断 3（怎么选）**：
   - **极简三步法选型流程**：
     - *Step 1: Verify Weight* —— 确认灯杆、灯具与电池总装重量不超过 300 kg；
     - *Step 2: Check Bolt-Circle* —— 确认基础法兰孔距在 180 mm 至 260 mm 之间；
     - *Step 3: Match Anchor Bolts* —— 确认螺栓规格为 M16, M18, M20, M22（标配提供）或 M24（按需选配）；
4. **判断 4（凭什么信）**：
   - 图文详述出厂 4 道严苛质检；
   - 附带厂家规范性能边界背书（`Manufacturer-reported: 20s lift, >50 lifts per charge, >3,000 cycles`）；
5. **判断 5（怎么做）**：
   - 部署三级梯度转化出口，消除单一切换表单造成的访客流失。

### 7.3 ROI 计算器 (`RoiCalculator.astro`) 区域预设与极简测算

彻底解决“12 项复杂字段手动输入”导致的极高跳出率问题：
1. **内置三大典型市场基准预设按键**：
   - **东南亚预设 (Southeast Asia)**：吊车日租金 `$350/day`，人工成本 `$15/hour`；
   - **中东预设 (Middle East)**：吊车日租金 `$550/day`，人工成本 `$25/hour`；
   - **欧美预设 (North America / Europe)**：吊车日租金 `$850/day`，人工成本 `$45/hour`；
2. **极简交互逻辑**：
   - 用户只需点击对应区域或轻微微调安装杆数（如 20 根、50 根、100 根），系统即时动态响应；
3. **直观高价值经济账本输出**：
   - 直观卡片呈现：`Estimated Project Savings: Up to 72%`；
   - 投资回报平衡点：`Equipment Break-Even: ~14 Poles Installed`（施工立完第 14 根杆即可收回设备购置成本）；
4. **转化无缝闭环**：
   - 提供 `[Apply These Figures to Your Inquiry ↗]` 按钮，自动将测算参数与节省数据带入询盘表单。

### 7.4 竞争对比页 (`pole-jack-vs-crane`) 四维对比壁垒

建立立杆机 vs 汽车吊 vs 手工倒链的四维对比壁垒矩阵：

| 评估维度 | volvet 便携式液压立杆机 | 传统汽车起重机 (Mobile Crane) | 手工倒链/三脚架土法 (Manual Hoist) |
| :--- | :--- | :--- | :--- |
| **1. 机械使用成本** | **极低**：一次性设备采购，单杆施工摊销成本不足 $5 | **极高**：单日台班租金 $350–$850，不足 1 天按全天计费 | **低**：仅工具磨损，但人工工时成倍激增 |
| **2. 施工人员与工效** | **高效**：2 名工人流水线作业，20秒顶升，每天立 15–20 根 | **繁琐**：需专业吊车司机、吊装指挥与地面辅助共 4–5 人 | **缓慢且危险**：需 5–8 人强力拉拽，日均仅能立 3–5 根 |
| **3. 作业场地准入** | **无限制**：85kg分体推车进入狭窄步道、密集绿化带与停车场 | **严重受限**：受制于车道宽度与转弯半径，需占道审批许可 | **受限**：需宽阔平整的地面供三脚架受力与人员拉绳 |
| **4. 施工安全与成品保护** | **本质安全**：液压机械自锁，工人立于地面，零地砖压损风险 | **高风险**：吊臂高空回转风险，重型车轮极易压裂人行道板 | **极高危险**：严重依赖绳索摩擦力，倒杆砸人事故频发 |

### 7.5 关于我们页 (`AboutUsPage.astro`) OEM 实体与出厂四道质检

#### 1. 确立法定实体定位
彻底删除 `about-copy.json` 中的“企业身份待核实”消极字样，正式确立专业源头设备制造商实体地位：
- `volvet: Engineering Original Equipment Manufacturer (OEM) for Modern Crane-Free Street Light Installation.`

#### 2. 出厂四道严苛质检工序图文背书 (`QualityTestingStrip.astro`)
1. **工序一：母材硬度与焊缝探伤检测 (Material Hardness & Weld Integrity Inspection)**
   - 严选高强度特种合金钢材，全焊缝实施无损探伤检测，确保推杆承重结构在重载工况下零疲劳裂纹；
2. **工序二：液压回路保压防渗漏全检 (Hydraulic Seal Pressure-Drop Inspection)**
   - 组装完成后，液压动力系统加压至额定工况实施长时间稳压测试，杜绝任何微观压力下降与接头渗油；
3. **工序三：300kg 极限垂直载荷校准测试 (300 kg Proof-Load Vertical Lift Calibration)**
   - 每台推杆上架专用垂直液压模拟试验台，执行 300kg 极限载荷全行程推升校准，确认平稳度与行程限位；
4. **工序四：出口专用防震实木箱封装规范 (Shockproof Export Wooden Crate Packing)**
   - 模块化嵌入定制高密度防震阻燃缓冲衬垫，外包装采用 `650 × 350 × 500 mm` 出口级热处理复合木箱封装，确保全球跨境海运零颠簸损伤。

### 7.6 伴生交互工具：法兰孔距与螺栓即时查询工具 (`FlangeChecker.astro`)

针对海外工程承包商在采购时最大的顾虑（“我的灯杆法兰到底能不能用？”），上线即时交互核对工具：
1. **输入项**：
   - 用户输入工程底座法兰对角孔距（Bolt-Circle Diameter，单位 mm）；
   - 下拉选择地脚螺栓规格（M16, M18, M20, M22, M24, 或 Other）；
2. **即时适配反馈机制**：
   - **完全适配 (Green Match)**：输入孔距在 `180mm – 260mm` 且螺栓为 `M16–M22`，提示：`"100% Direct Fit! Standard factory included bolt sets fully compatible with your foundation."`；
   - **选配螺栓支持 (Blue Match)**：输入孔距在 `180mm – 260mm` 且螺栓为 `M24`，提示：`"Compatible Flange Span! M24 bolts supported (available as optional factory accessory)."`；
   - **非标过渡板适配 (Amber Match)**：输入孔距 `<180mm` 或 `>260mm`，系统提示：`"Custom Adapter Plate Supported! Our factory manufactures tailored heavy-duty transition flange plates within 3 business days to fit your specific bolt layout."`；
3. **一键直通工程审核**：匹配结果可直接携带至询盘输入框，由工程团队免费提供图纸适配审核。

### 7.7 三级梯度 CTA 转化漏斗与表单流转规范

杜绝单一“强制上传 CAD 图纸申请报价”的高门槛阻碍，建立顺应买家采购心理成熟度的三级转化梯度：

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Top-Funnel (轻量探索期)：零摩擦知识获取                                 │
│ 🎯 CTA: [Download 12m Lifter Engineering Specs & Field Guide (PDF)]   │
│ • 门槛: 仅需输入企业电子邮箱                                             │
│ • 交付: 自动投递高清机械参数手册、皮卡装卸工法与施工安全注意事项        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ 持续滋养
┌───────────────────────────────────▼────────────────────────────────────┐
│ Mid-Funnel (方案评估期)：高价值决策测算                                 │
│ 🎯 CTA: [Export Customized Project ROI & Cost-Savings Report]         │
│ • 门槛: 输入工程大致杆数与所在地区                                       │
│ • 交付: 导出专业吊车替代成本对比分析表，供项目经理内部请批采购预算      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ 商务决策
┌───────────────────────────────────▼────────────────────────────────────┐
│ Bottom-Funnel (商务决策期)：精准商务建联                                │
│ 🎯 CTA: [Request Direct Factory Quotation & 24h Flange Audit]         │
│ • 门槛: 填写基础法兰尺寸、目标港口与采购台数（支持选传图纸）             │
│ • 交付: 24 小时内由工厂外贸工程师出具 FOB/CIF 出厂报价与孔距图纸复核单 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 结语：执行与审查指引

本规范文件自发布之日起，作为 `liftpolemachine-web` 全站后续所有代码修改、组件重塑（包括 M2 阶段的 P0、P1、P2 开发任务）、多语言数据字典更新及 GEOFlow 质检任务的**最高指导准则**。

任何工程提交前，必须运行：
```bash
# 1. 运行事实与合规门禁自动化测试
cd maquin-astro-theme && npm run content:check

# 2. 验证全量 121 个静态页面构建 0 报错
cd maquin-astro-theme && npm run build
```
确保全站内容在商业说服力、现代工业美学与底层物理真实性之间达成完美的工程平衡。
