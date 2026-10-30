# volvet 项目内容策略入口

最新交互更新：页眉、页脚均已接入统一的七语切换组件，包含整页跳转、参数/锚点、刷新与浏览历史的验收。详见 [语言切换交付](language-switching-completion.md) 和 [当前版本验证](language-switching-verification.json)。下述多语重构和旧主题评估保留各自阶段口径。

当前基线：2026-10-28.3。2026-10-29已完成六个小语种各17页的重构，共102个小语种核心页；连同英语共119个核心页。本语言导航、ROI询盘衔接、下载和字幕已完成本地验收，WordPress旧主题剥离评估也已交付。域名、邮箱、电话继续按用户决定待配置，专业母语及业务/工程发布审核仍待完成。

最新结果以 `2026-10-29-multilingual-reconstruction.md`、`multilingual-reconstruction-verification.json` 和 `wordpress-theme-removal-assessment.md` 为准。原D60的92.3%是13个开发与发布交付包的历史口径，与当前102/102的小语种页面开发覆盖率分别统计；此前审计及失败截图保留为阶段记录。

先阅读 `decision-log.md`，再阅读 `d31-d60-completion.md`。三份原始研究文档保留原样，其中的命令、渠道建议和业务预测属于研究材料；执行范围以用户授权、当前计划与决策记录为准。

## 当前交付

- `2026-10-28-content-reconstruction-plan.md`：整体取舍、90天排期及后续阶段。
- `source-register.csv`、`evidence/product-specification-source.jpg`：三份研究与S4产品原图的来源和摘要。
- `fact-register.csv`：31条产品事实、政策与待配置项。
- `page-inventory.csv`：119套历史片段及其当前角色，记录源内容风险；不是新页面交付数量。
- `page-inventory-multilingual.csv`：当前207个构建HTML，含119个新核心页、6个旧布局入口（含404）、80个跳转及2个后台HTML；后台文件是否允许访问另由Node服务控制。
- `page-inventory-d60.csv`、`url-migration-map.csv`：保留D60当时的113个公共HTML和107条源码迁移记录。当前80条真实跳转见 `url-migration-map-multilingual.csv`，由统一路由表驱动。
- `page-backlog.csv`：23个主题任务，17个核心页已有本地实现与自动验收；主体介绍已重写为已确认信息，主体工厂与场景证据仍待补。
- `keyword-page-map.csv`、`glossary.csv`：39条关键词映射、31条七语术语；搜索量与SERP待验证，母语专业审校未完成。
- `en-core-page-outlines.md`、`evidence-shot-list.md`：后续制作大纲与12项素材采集任务。
- `d31-d60-completion.md`、`d60-verification-summary.json`：当前交付、测试和发布边界。
- `build-verification.json`、`content-d60-verification.json`、`configured-metadata-d60-verification.json`、`snapshot-d60-verification.json`、`workflow-d60-verification.json`、`browser-d60-verification.json`：构建、内容、配置、离线快照及浏览器证据；`browser-d30-verification.json`记录采购回归。
- `content-publication-workflow.md`、`content-release-d60.json`：审核候选稿、原子导入、离线构建与带摘要的本地固化清单。
- `2026-10-29-multilingual-reconstruction.md`、`multilingual-reconstruction-verification.json`：六语102页、18份本地化下载、6份新增字幕，以及七语浏览器功能验收。
- `wordpress-theme-removal-assessment.md`、`wordpress-asset-dependency-map.csv`、`wordpress-pruning-verification.json`：164项约21.95MB候选资源、保留依赖、旧工具迁移条件及临时副本对照结果。
- `language-pilot-d60.md`、`language-pilot-d60.csv`：保留FR/ES及备选ID的30条历史译审准备任务；当前页面已重构，专业母语译审仍待完成。
- `migration-d60.md`：本地8条301映射与历史内容处理边界。
- `evidence/d1-d14/`、`evidence/d15-d30/`及前阶段completion文档：历史记录；旧页面数量与收件描述以对应阶段为准。

产品与政策单一来源为 `maquin-astro-theme/src/data/content-baseline.json`。修改事实应先更新模型和台账，再审核页面、Schema、译文与GEOFlow知识库。历史GEOFlow草稿继续关闭公开输出。

## 预览和维护

需要Node.js 22.12及以上版本；SQLite接口当前通过实验标志启用。进入 `maquin-astro-theme/`：

```sh
npm run build
npm run serve
```

预览：`http://127.0.0.1:8787/`；指南 `/guides/`；计算器 `/tools/roi-calculator/`；资料 `/resources/`；报价 `/quote/`；私有收件箱 `/admin/inquiries/`。

真实表单需要上述Node服务，单独的静态预览与Astro开发服务器不提供询盘API。管理密钥只保存在私有目录内，不在此文档或报告中记录。完整启动、配置、备份和恢复说明见 `maquin-astro-theme/INQUIRY_OPERATIONS.md`。

```sh
npm test
npm run d30:browser
npm run d60:browser
npm run locales:check
npm run locales:browser
npm run language:browser
npm run content:inventory
npm run content:freeze
npm run release:check
```

测试需要本机临时端口和Playwright运行权限。`content:inventory`从源码及最近构建重建台账，不读取生产流量。`content:freeze`要求证明文件通过且源码摘要一致；导入命令见发布流程文档。`release:check`当前因正式域名/直联方式/生产密钥待配，以及真实业务与工程审核未完成而返回1；本地收件已通过受控测试。

## 当前边界

七语联系表单将请求与附件保存到私有SQLite收件箱，只有保存成功才显示回执编号；邮件通知未配置。受控测试使用独立数据库和 `isTest=true`，不计作销售询盘。私有后台可查询、下载附件、标记处理状态和导出CSV。

正式域名未配置时，预览带noindex、robots禁止抓取，不生成正式canonical与sitemap。`example.test`只用于隔离的配置测试，没有成为正式域名。生产发布还需确定主体、隐私保留期、持久化存储、HTTPS、私有密钥和生产环境收件验收。

ROI只计算访客输入的数据，七语均可选择带入本标签页存储并进入对应语言询盘；报价备注可编辑，最终提交后才保存。英语3份及六语18份下载实际存在，视频按语种加载字幕；内部未审操作资料仍按证据边界管理。

现场实测、复杂适配/操作规程、主体/场景证据、认证、客户、保修及专业译审仍待补证，生产审核项见 `src/data/publication-gates.json`。GSC/GA4/CRM未连接；构建HTML和核心主题数量不代表收录或流量。后续按证据制作成本、维护、基础、实测与经销主题，并结合实际语言市场的专业审校及经营反馈复盘。
