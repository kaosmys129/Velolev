# volvet · 独立 GEOFlow 内容工作流

2026-10-31：本项目使用独立实例，原18080混合实例仅保留为迁移备份。本文件替代旧版共用实例工作流。

## 入口与启动

- 项目：`liftpolemachine-web`；当前品牌：volvet；历史PoleLift名称只用于旧资料识别。
- 后台：http://127.0.0.1:18082/geo_admin/articles
- 项目映射：`content/geoflow-project.json`。
- 客户端私密配置：项目根 `.env.geoflow`；部署私密配置：`ops/geoflow/private/`。
- 不再从旧 `geoflow/.env` 读取生产API令牌，不重新指向18080。

在项目根目录执行只读检查：

```bash
node ops/geoflow/runtime/manage.mjs doctor
node ops/geoflow/runtime/manage.mjs articles
```

启动后台与独立基础设施：

```bash
cd ops/geoflow
docker compose --env-file private/runtime.env -f compose.yaml up -d
```

默认不启动生成worker、调度、向量化或分发。管理员初始沿用本次刚重置的凭据；后续改密在本实例独立生效。

## 知识、栏目、模板与策略

内容策略以 `ops/geoflow/strategy.md` 为准。事实以 `maquin-astro-theme/src/data/content-baseline.json` 和 `geoflow/polelift-knowledge/product-knowledge.md` 为准，不能沿用旧营销稿中未经证实的承诺。

| 内容支柱 | 固定栏目ID | 专属模板ID | 权威知识库ID |
| --- | --- | --- | --- |
| 设备采购选型 | 1 | 11 | 11 |
| 工况法兰适配 | 2 | 12 | 12 |
| 项目规划成本 | 3 | 13 | 13 |
| 证据核验交付 | 4 | 14 | 14 |

知识库10标识项目和品牌边界，15存放策略与审核规则。作者为“volvet 内容团队”。生产计划10–13分别绑定上述四支柱，全部暂停。ID1、2、3三篇历史文章归入栏目9“历史文章｜需按当前基准复审”，统一为待审草稿。演示和测试文章保留在旧备份。

先完成英语事实审核，再按资源安排es/fr/pt/vi/th/id本地化。不编造价格、库存、认证、案例、质保、联系方式或正式域名；厂家标称与现场验证必须区分。

## 生成与审核

生成前核对项目标识、作者、固定栏目、专属模板及知识库。任务必须固定栏目并要求人工审核，不使用智能分栏。模型发送需具备针对本项目内容的授权；本次拆分没有新增模型调用。

生成后逐项核实事实、品牌、适配边界、语言和来源。历史文章不继承旧版审核结论。GEOFlow后台状态与Astro官网上线是两个步骤，不把GEOFlow本地文章地址当作官网公开地址。

## 独立发布渠道

“volvet官网草稿审核收件箱”为本项目独立渠道，当前暂停，健康检查通过。只接受本项目密钥和栏目，接收端强制保存为 `draft/pending`，输出到 `geo-drafts/publishing-inbox/`，不能直接公开上线。网站发布仍走 `maquin-astro-theme` 的内容审核、构建和部署流程。

正式公共域名尚未确认；不得填写猜测地址。启用渠道、启动任务与公开发布必须分别按当次授权执行。

## 备份

旧18080数据库及文件完整保留；共享文章worker已停止。迁移记录、完整数据库备份和旧工作流副本保存在 `newautomachine-web/output/content/project-separation/`，其中部分文件含密钥，禁止公开。不要重新启动旧共用生产栈。
