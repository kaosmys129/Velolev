# B2B 工业品独立站信息架构 (IA) 规划矩阵模板

> 使用说明：建站前明确每个页面的 URL 路径、页面类型、目标受众意图、页面核心任务与核心转化出口，杜绝盲目生成无意义页面。

---

## 一、标准 5 级信息架构全景树

```text
/ (首页 HomePage)
├── /products/ (产品中心 Hub)
│   ├── /products/[main-product-slug]/ (核心单品详情页)
│   └── /products/[accessory-slug]/ (标配与选配件详情页)
├── /solutions/ (细分工况应用场景 Hub)
│   ├── /solutions/[scenario-1-slug]/ (场景一：如狭窄绿化带太阳能路灯安装)
│   ├── /solutions/[scenario-2-slug]/ (场景二：如商场地库与密集停车场免压砖安装)
│   └── /solutions/[scenario-3-slug]/ (场景三：如乡村偏远道路无吊车立杆)
├── /compare/ (竞品与替代方案对比 Hub)
│   └── /compare/[product-vs-traditional-slug]/ (如便携升杆机 vs 25吨汽车起重机全生命周期对比)
├── /tools/ (交互决策与计算工具 Hub)
│   ├── /tools/roi-calculator/ (起重机替代成本与投资回报测算器)
│   └── /tools/compatibility-checker/ (法兰孔距与地脚螺栓即时匹配核对器)
├── /guides/ (深度技术选型与施工指南 Hub)
│   ├── /guides/[how-to-install-without-crane]/ (免吊车立杆标准作业程序 SOP)
│   └── /guides/[flange-bolt-sizing-guide]/ (法兰受力与地脚螺栓选型工程手册)
├── /about-us/ (关于我们与工厂制造实体)
│   ├── /about-us/manufacturing-quality/ (出厂四道质检与 300kg 试验台实证)
│   └── /about-us/export-logistics/ (出口木箱包装与全球港口直发规范)
└── /contact-us/ (商务建联与 24h 图纸审核闭环)
```

---

## 二、页面职责分工与转化出口矩阵

| 页面 URL 路径 | 页面类型 | 目标搜索词类型 (Search Intent) | 页面第一使命 (Primary Objective) | 核心内容组件 (Key Components) | 转化出口 (Primary CTA) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/`** | 品牌首页 | 品牌词 / 通用设备大词 | 建立专业品类定位，完成痛点共鸣与全站导航分流 | FAB 首屏、4 核心指标带、车间实拍、场景入口、ROI 引流 | 测算投资回报 / 探索产品 |
| **`/products/[slug]/`** | 产品详情页 | 交易型长尾词 / 具体品类词 | 回答“五大认知判断”，证明为什么该产品适合客户 | 标准品类名、原子参数表、工况边界、质检证明链、选型逻辑 | 申请出厂报价 & 免费图纸核对 |
| **`/solutions/[slug]/`** | 细分场景应用 | 工况意图词 (Problem-Aware) | 深度拆解特定工程工况下的痛点与该方案的完美适配 | 施工现场实拍、吊车作业痛点对比、工效数据、真实工程参数 | 下载工法指南 / 咨询项目适配 |
| **`/compare/[slug]/`** | 方案对比页 | 决策对比词 (Solution-Aware) | 客观数据量化传统方案（如租吊车）的隐形成本，建立压倒性替代优势 | 租赁费/人工/许可/工期对比表、全生命周期 TCO 模型 | 导出成本对比分析报告 |
| **`/tools/roi-calculator/`** | 交互工具页 | 高价值计算词 (Calculation-Intent) | 零阻力提供即时项目成本节约测算，捕获早期采购心智 | 交互滑块（杆数、当地吊车费率）、动态数字跳动、平衡点输出 | 导出项目定制测算 PDF 报告 |
| **`/tools/checker/`** | 交互工具页 | 物理兼容性查询词 (Fitment-Intent) | 消除对法兰孔距不匹配的顾虑，建立 100% 适配信心 | 孔距滑块、螺栓规格选择、红绿灯即时匹配状态、非标定制提示 | 一键携带孔距发起工程师审核 |
| **`/about-us/`** | 实体信任中枢 | 品牌背景调查 (Entity Verification) | 确立 OEM 实体法定身份，展示车间制造与出厂质检实证 | 工厂全景实拍、4 步质检拆解、技术团队背书、港口直发网络 | 索取工厂出厂质检规范 |
