# volvet 内容基线决策记录

生效日期：2026-10-28。用户本轮确认优先于三份研究报告、历史网页和历史生成稿。

| 编号 | 决策 | 代码/台账对应 | 状态 |
|---|---|---|---|
| D01 | 对外品牌准确写作小写 `volvet`；Velolev、PoleLift 作为历史品牌引用，不再用于新发布内容 | content-baseline.json；渲染策略；文字标识；Meta/Schema | 已落实 |
| D02 | 产品资料以用户确认的规格图片 S4 为当前事实来源 | evidence 原图及 SHA-256；fact-register.csv | 已落实 |
| D03 | “20秒、每次充电>50次、使用>3000次”是图片中的厂家标称数据；现场实测尚未完善 | 独立标称数据区；fieldValidation=pending；移除宣传段中的无条件实测表达 | 已落实 |
| D04 | B2B 外贸询价；不公开设备价格、库存、起价、固定回本承诺 | commercialPolicy；价格页改询价；JSON-LD无Offer及availability | 已落实 |
| D05 | 域名、邮箱、电话暂时标记待配置，不推测 volvet.com，不沿用旧品牌收件信息 | deployment/contact为空；预览noindex；release:check | 用户明确确认，已落实 |
| D06 | 适配表M24不等于标准配置包含M24；标准配置为M16/M18/M20/M22各4套 | 产品模型与规格区分别展示 | 已落实 |
| D07 | 基础/法兰/孔径、锚固深度、操作位置等歧义保留原文证据，待工程审核后形成可发布规程 | fact-register F020/F021；旧操作章节不作为规程展示 | 工程审核待后续补证 |
| D08 | 保留英语根目录和当前六个语言前缀；D30仅激活已完成的英语采购目标，其他迁移继续按页审核 | url-migration-map.csv；EN equipment/equipment-detail→产品、pricing-plan→quote、en→根的本地301 | 本地已落实，生产未发布 |
| D09 | GEOFlow历史草稿和占位文章未经新基线审核，不生成公开占位URL；后续接入审核导出 | GEOFLOW_PUBLIC_ENABLED=false；取消fallback slug生成 | 已落实，后续适配待D15+ |
| D10 | 只有真实持久化收件后才显示成功；D30采用站内私有收件箱，不把数据库回执说成邮件已发 | /api/inquiries；SQLite；七语真实受控提交、丢失响应重试及重启验证 | 本地已验证；外部邮件仍待配 |
| D11 | 无型号编号、认证、客户、保修和现场证据时不补造；不得从图上的设备标牌推定品牌联系方式 | 产品事实模型；知识库；待补证列表 | 已登记 |
| D12 | 关键词搜索量、难度和流量留空或标未实测；现有GSC/GA4/CRM未连接不记为0 | keyword-page-map.csv；inventory-summary.json | 已落实 |
| D13 | D30完成首页、产品、适配、报价、联系、隐私、条款、编辑政策8个英语核心页；六语联系表单接入同一服务 | ProcurementLayout；src/components/procurement/；page-inventory-d30.csv | 已完成本地内容与功能验收；译审待后续 |
| D14 | canonical以实际页面路径计算；语言对应只使用真实存在的页面；无正式域名时保持预览索引控制 | site-config.mjs；BaseLayout；配置夹具example.test仅供测试 | 本地预览与配置测试通过 |
| D15 | 原始研究建议不自动成为执行授权；未证实的主体、团队、案例、认证和性能不补造 | C11等证据依赖；实测待完善；历史草稿公开输出保持关闭 | 持续执行 |
| D16 | 测试询盘与经营线索区分；私有附件和管理密钥不进入静态目录或Git | 独立测试库；isTest；.gitignore；管理接口鉴权 | 已验证；未对外发信或部署 |
| D17 | D60补齐9个英语页，累计17个核心页；主体与场景证据仍待补 | decision-content；FAQ；资源与指南索引；publication-gates.json | 本地开发/自动QA完成；生产审核待补 |
| D18 | ROI只使用访客自主输入，按共同工序核算；只在访客选择时带入可编辑询价备注 | roi.mjs；RoiCalculator；InquiryForm；隐私说明 | 手算、浏览器与真实收件验证通过 |
| D19 | GEOFlow导出只作待审候选，官网读取审核快照；正文摘要变更须复审 | prepare/import-reviewed-content；published-content.json；冻结清单 | 隔离离线构建通过；真实历史草稿未发布 |
| D20 | 语言试点先准备FR/ES，ID按实际线索及审校条件备选，不自动复制新深页 | language-pilot-d60.csv，30条任务 | 专业母语及技术审核待安排 |
| D21 | 后续源码变化使旧固化证据失效；当前有手机产品页回归与新增企业/质检事实待核验 | current-code-audit；当前浏览器报告；publication-gates.json | 11/13交付包实现，综合验收与发布审核未闭合 |
| D22 | 修复手机产品页并重构七语关于内容；未核实企业/测试断言不再渲染，参数从模型派生 | remainder-completion；35项测试；223项浏览器检查 | 开发整改与自动验收完成；12/13包，发布审核仍待资料 |
| D23 | 构建、检查与固化绑定同一源码及参考媒体版本，执行期间变化会使验证失败 | build-site；source-fingerprint；verification与release manifest | 当前版本通过 |

执行顺序为：用户确认 → 结构化产品事实 → 图像原文证据 → 经核实外部资料 → 研究建议 → 历史稿件。事实变更先改模型和台账，再更新页面、知识库与译文。

运行时内容策略是旧模板到D15+逐页重写之间的过渡边界。原始片段仍保留，以便核对和迁移；策略处理不表示所有旧文章已完成编辑审校。
