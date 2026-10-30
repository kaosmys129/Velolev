# D60 内容快照与发布流程

日期：2026-10-28。事实基线：2026-10-28.3。本流程支持离线、可重复构建；不会自动对外发布、通知客户或继承原稿中的操作命令。

## 当前结构

英语17个核心页使用独立采购组件。后续深度文章使用 `maquin-astro-theme/src/data/published-content.json` 的审核快照，生成 `/guides/<slug>/` 并进入指南索引。当前真实快照为空，没有把历史生成稿自动标记为已审核。

旧GEOFlow直连公开开关继续关闭。构建不需要本机18080服务，不生成兜底slug，不把缺少正文的文章发布为空页面，也不把同一英语文章复制成六个未经审核的语言页面。

## 从GEOFlow导出到候选稿

先在GEOFlow取得JSON导出，包含文章数组或 `data` 数组，以及原始slug、title、content_html、meta_description或excerpt。转换命令从本地文件读取，不访问接口：

```sh
cd /Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme
npm run content:prepare -- --input=/private/path/geoflow-export.json --output=/private/path/review-candidates.json
```

输出文件必须尚不存在，使用私有文件权限。转换保留来源状态作追溯，但新候选稿一律是draft/pending；原系统的published/approved不构成本网站的审核记录。脚本提取纯文本章节，忽略脚本/样式；复杂排版需要编辑重新整理，不能据此假定内容已经安全或准确。

## 编辑与审核

| 字段 | 审核要求 |
|---|---|
| slug | 稳定、唯一、只使用允许字符，不覆盖现有核心指南，不生成随机兜底值 |
| locale | 首轮只接收en；其他语言须经过单独母语与技术审核后扩展流程 |
| title / description / sections | 有实际内容，章节与段落使用纯文本；页面由Astro转义，不接收任意HTML |
| relatedPaths | 必须指向当前核心路由；没有正文的规划页不加链接 |
| evidenceRefs | 引用当前事实台账F001–F031；审核人逐条确认其是否真正支持正文 |
| review | 当前基线、真实审核人、日期、approved状态及对应正文SHA-256 |

产品/工程负责人确认事实、适配边界和操作内容；内容负责人检查页面意图、来源、措辞与内链；业务负责人确认主体、联系及商务信息。没有资料时改写为明确的限制或保留待补，不补造客户、工厂、认证、保修和实测。

正文摘要由 `articleContentHash(article)` 对slug、标题、描述、章节、相关链接及证据引用计算。人工完成内容审核后记录实际审核信息与摘要。修改这些内容后，原摘要失效，需重新审核。不要为了通过脚本而填入虚构审核人或自动批准记录。

自动校验覆盖结构、当前版本、摘要、路由、常见旧品牌/公开金额/未核实联系信息等问题；它不替代工程审查、逐条事实核验或真实审核人的判断。

## 校验、导入与本地验收

```sh
npm run content:import -- --input=/private/path/reviewed-export.json
npm run content:import -- --input=/private/path/reviewed-export.json --apply
npm test
npm run d30:browser
npm run d60:browser
npm run content:inventory
```

第一条仅校验；`--apply`才替换本地发布快照。完整包必须全部通过，失败不部分导入，原快照保留；写入采用临时文件后原子替换。测试夹具不能覆盖真实发布快照。导入本地快照不等于部署生产站。

隔离测试已验证：来源系统即使标记published/approved，转换后仍为待审稿，不能导入；真实快照保持不变。另用testOnly夹具在临时目录构建了实际文章，验证正文和索引链接静态存在，不依赖实时接口。测试文章没有进入正常dist或真实快照。

## 固化、发布与回滚

```sh
npm run content:freeze
npm run release:check
```

`content:freeze`要求构建、核心页、域名夹具、快照夹具、D30及D60浏览器证据通过，且与当前源码摘要一致。输出 `content-release-d60.json`，包含17个核心页、3份下载资料、URL别名、内容快照和证明文件摘要。证据过期时拒绝固化，不能拿旧的通过报告批准改过的代码。

D60收尾更新：`npm run build`会记录构建源码与参考媒体摘要。验证先核对构建版本，执行期间源码或媒体变化也会判失败；固化同时核对两类摘要，并记录参考媒体逐文件摘要。新增企业/测试内容必须先有证据，不能绕过事实台账硬编码到组件。七语关于页现只呈现来源规格、图片参考与待确认事项。

当前固化状态是本地QA完成、生产审核待补。正式域名/直联方式、主体与数据保留期、工程资料及场景证据、最终英语人工审校、部署存储/HTTPS/密钥和生产收件验证仍需完成。人工发布审核状态登记在 `src/data/publication-gates.json`；有真实审核人与证据后才变更状态。

保留上一版已验证快照、别名清单与构建包。回滚时恢复相互对应的快照、别名和构建版本，重建并核对页面/301；询盘数据库单独备份与维护，内容回滚不清空询盘。本轮未执行外部部署、邮件通知或客户联系。
