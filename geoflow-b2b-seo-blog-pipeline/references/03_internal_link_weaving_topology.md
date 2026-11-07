# On-Page SEO 站内内链织网拓扑与锚文本规范

## 1. 核心目标：消除孤岛页面，盘活站内权重与转化动线

Google 算法与生成式 AI（Perplexity / SearchGPT）极度重视网站的**信息架构关联性（Topic Clustering）**。
独立的一篇博客如果没有任何指向主站转化页面或工具页面的内部链接，便沦为**孤岛页面（Orphan Page）**。
孤岛页面不仅无法传递权重，即便获得搜索流量，访客也无法跳转到商业决策页面。

---

## 2. 官网核心路由与自然锚文本映射表

| 目标核心路由 | 页面功能定位 | 自然语义锚文本清单 (English) |
|---|---|---|
| `/tools/roi-calculator/` | 吊车租赁对比与投资回报测算工具 | • `crane rental cost savings`<br>• `calculate lifting equipment roi`<br>• `crane rental versus purchase`<br>• `calculate your project savings`<br>• `crane roi calculator` |
| `/guides/pole-jack-compatibility/` | 法兰孔距、灯杆规格与基础适配权威指南 | • `flange bolt circle compatibility`<br>• `base plate engineering review`<br>• `verify flange bolt pattern`<br>• `pitch circle diameters`<br>• `flange compatibility guide` |
| `/compare/pole-jack-vs-crane/` | 便携立杆机 vs 16吨吊车四维工程对比 | • `crane alternative for tight spaces`<br>• `boom truck comparison`<br>• `pole jack vs crane`<br>• `portable pole jacks to cranes` |
| `/products/light-pole-jack/` | 12m 便携立杆机产品详情与工业规格 | • `12m portable light pole lifter`<br>• `portable hydraulic pole lifter`<br>• `portable light pole machine`<br>• `heavy-duty mechanical pole lifter` |
| `/quote/` | 提交法兰工程图纸与获取出厂私密报价 | • `request factory quotation`<br>• `factory engineering drawing audit`<br>• `custom base flange audit`<br>• `request a formal procurement quote` |
| `/resources/` | 规格书下载、工程参数表与现场工单中心 | • `technical datasheets and project worksheets`<br>• `engineering resource center`<br>• `download specifications and worksheets` |
| `/guides/install-light-pole-without-crane/` | 无吊车路灯立杆现场实操方法与极限条件 | • `install street light poles without a crane`<br>• `two-person street light pole installation`<br>• `field installation procedure without crane` |

---

## 3. 站内内链注入安全守则 (Anti-Over-Optimization)

1. **绝对不在标题中植入链接**：
   - 严禁在 `# H1`、`## H2`、`### H3` 等章节标题中添加超链接；
   - 必须在正文长句的段落（Paragraphs）中自然出现。

2. **频次严格受控**：
   - 同一目标 URL 在同一篇文章中**最多出现 1 次**（极特殊长篇不超过 2 次）；
   - 全文站内内部链接总量控制在 **2 至 4 个**，保持适度。

3. **语法纯净与避免嵌套**：
   - 不修改已有的外部引用链接或既有 Markdown 链接；
   - 不在代码块（`...`）、图片说明或引用块中强制插入链接；
   - 锚文本必须具备完整的语法意义，严禁出现 “Click here” 或 “Read more” 等空洞文本。
