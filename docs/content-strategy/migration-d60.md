# D60 URL与历史内容处理

> 2026-10-29更新：当前六语各17个核心主题已实际落地，共72条小语种别名与原8条英语别名由统一路由表驱动，合计80条。当前语言链接、元数据与HTTP跳转见 [六语重构交付](2026-10-29-multilingual-reconstruction.md)。下文保留D60阶段的8条英语映射说明。

日期：2026-10-28。以下为本地Node服务已实现并通过浏览器/HTTP检查的映射，尚未部署到正式域名。

| 原英语URL | 当前目标 | 处理 |
|---|---|---|
| `/en/` | `/` | 保留英语根路径，301 |
| `/equipment/`、`/equipment-detail/` | `/products/light-pole-jack/` | 产品内容合并，一跳301 |
| `/pricing-plan/` | `/quote/` | 私下项目询价，一跳301 |
| `/blog/` | `/guides/` | 以实际已完成的指南/工具组织索引，301 |
| `/eco-friendly-heavy-equipment-maintaining-machines-in-a-sustainable-way/` | `/compare/pole-jack-vs-crane/` | 原方案比较主题改为范围、适配和成本输入，301 |
| `/flexible-project-management-how-renting-equipment-boosts-productivity/` | `/guides/install-light-pole-without-crane/` | 方法与限制指南，301；不恢复未审操作步骤 |
| `/team/` | `/about-us/` | 合并到已确认品牌信息；不补造团队资历，301 |

首页、FAQ、关于与联系保留原路径并重写。两个场景分别有明确目标页；原project索引主题较宽，未强行全部迁往太阳能场景。其他深度旧文章继续保留事实基线约束与后续待办，未执行全站路径搬迁。

六个其他语言的产品、原价格、博客和其他历史路径保留。只有真实存在的语言对应页参与互链，新增英语深页不自动拼接六语URL。配置测试origin验证了17个英语页及其真实语言对应关系，未将任何别名加入sitemap。

当前没有GSC/反链/线上抓取数据，不能声称这些映射已经改善流量或完整保住搜索表现。上线前在目标主机重新验证HTTP 301与最终200、查询参数、canonical、hreflang和sitemap；纯静态托管需另配HTTP重定向，Astro静态跳转文件不能充当已实现的HTTP 301证明。

完整107条源码迁移台账见 `url-migration-map.csv`。原始片段及前阶段报告保留，构建库存另见 `page-inventory-d60.csv`；历史片段数、构建路由数和新编写页面数分开统计。
