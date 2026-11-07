# 海外 SERP 意图雷达与 LSI 语义拓词规范

## 1. 意图分级与买家行为映射

在工业 B2B 出海领域，搜索词的商业价值具有极强的梯度分层：

| 意图分类 | 典型搜索词模式 | 目标受众 | 转化目标 |
|---|---|---|---|
| **商业调查 (Commercial Investigation)** | `portable light pole lifter vs crane rental`<br>`cost to install street light without boom truck` | 市政工程承包商采购经理、机电设备租赁商 | 引导使用 ROI 计算器对比支出，促发设备选型咨询 |
| **技术规格 (Technical Specification)** | `light pole flange bolt circle PCD 200mm`<br>`10m street pole lifting capacity requirements` | 结构工程师、现场施工技术负责人 | 引导下载工程规格书与申请底板图纸审核 |
| **现场避坑/故障排查 (Informational / Problem Solving)** | `install light pole in narrow alley limited access`<br>`how to erect street light pole without crane access` | 现场施工工长、电力工程团队 | 引导了解双人分体无电施工工法，建立专业信任 |

---

## 2. 竞品 SERP 逆向聚类方法论

1. **Top 10 SERP 结构拆解**：
   - 抓取海外目标市场（US, AU, SA）Google 首页前 10 名文章的 H1、H2、H3 标题体系；
   - 提取各竞品高频讨论的痛点（如：吊车调机进场费最低收费标准、道路封路审批周期、高压线临电安全净距）；
   - 寻找竞品未充分解答的“信息真空区”（如：缺乏真实载荷试验机数据、缺乏多孔距法兰的实际适配方案）。

2. **People Also Ask (PAA) 买家真实提问挖掘**：
   Google SERP 中展示的 PAA 代表了真实客户在决策链中最关切的问题。生产内容时必须将 PAA 的前 3–4 个问题直接转化为文章后置的 FAQ 模块：
   - *How many people does it take to erect a street light?* $\rightarrow$ 对应回答：`F001` 双人分体工法；
   - *What is the maximum weight a light pole lifter can lift?* $\rightarrow$ 对应回答：`F002` 严格标称 300kg；
   - *Can this tool handle solar street light poles?* $\rightarrow$ 对应回答：`F004` 24V 电池动力无需现场交流电。

3. **LSI (Latent Semantic Indexing) 语义共现拓词**：
   杜绝机械堆砌同一主关键词，要求自然分布共现语义词群：
   - 起重与物流相关：`boom truck dispatch`, `crane rental rates`, `bed of a standard pickup truck`, `overhead clearance`;
   - 结构与基础相关：`anchor bolt pitch circle diameter (P.C.D.)`, `base flange plate`, `foundation cage`, `M16 to M24 studs`;
   - 动力与电气相关：`24V DC battery-powered`, `hydraulic positive mechanical lock`, `zero diesel exhaust`.
