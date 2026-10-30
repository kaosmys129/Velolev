# WordPress 旧主题剥离与删除评估

> 此文件为剥离前评估记录。该方案已于2026-10-29执行；当前结果与新验证命令见 [剥离完成报告](wordpress-retirement-completion.md)。以下旧脚本和路径仅用于历史追溯，已归档退役。

日期：2026-10-29。依据当前源码、重新构建的产物、资源依赖图及既有临时剥离对照记录。项目内原有主题和图片文件尚未删除。

## 本次复核证据

本次重新构建成功，并重新生成依赖清单。267个WordPress资源的大小与SHA-256逐一核对通过；164个候选资源未发现当前静态依赖图和应用源码中的有效引用。

浏览器对照脚本本次在启动Chromium时受macOS沙箱权限阻止（MachPortRendezvousServer / Permission denied），未运行页面对照。既有浏览器剥离报告的源码指纹与当前构建不同，不能作为本次已通过的浏览器验收。下方保留其历史试验范围供参考；正式删除仍须按当前版本重跑。

- [本次复核记录](wordpress-assessment-recheck.json)

## 结论与体积

七语119个核心页面已使用采购站组件。当前构建另有5个旧英语主题页和1个旧404页使用 WordPress/Elementor 布局，以及80个跳转页、2个后台HTML。页面数量不包含下载文件。

`maquin-astro-theme/public/wp-content` 与 `wp-includes` 内共有267个文件，合计33,903,368字节。按当前引用分类如下；体积为未压缩十进制MB。

| 分类 | 文件 | 体积 | 处理条件 |
|---|---:|---:|---|
| 未发现有效源码或页面依赖的候选资源 | 164 | 21.95 MB | 可进入分批剥离验证；逐文件清单已生成，删除前保留可恢复副本 |
| 旧布局仍使用 | 93 | 8.60 MB | 先迁移5个旧英语主题页和404，再重算依赖 |
| 仅维护脚本引用 | 7 | 3.09 MB | 先处理旧SEO脚本与设计导出脚本的引用，部分文件为产品资料，应保留或迁移 |
| 新版直接使用 | 3 | 0.26 MB | 搬迁引用后才能清理原路径 |

164个候选主要包含18个CSS、4个JS、1个SVG及140张JPG/PNG图片。文件名包含工程机械、店员、旧模板图片等内容，也有同一图片的多种尺寸。判断依据是依赖关系与试验结果；原文件名本身不作为无用证明。

新版仍使用的3项为：

- `/wp-content/uploads/sites/3/2025/01/portable-pole-lifter-hero-cutout.png`
- `/wp-content/uploads/sites/3/2025/01/portable-pole-lifter-hero-cutout-300x211.png`
- `/wp-content/uploads/sites/3/elementor/google-fonts/fonts/geologica-oy1l8evir7j9p3tn9ywnadyjzuydkkkdagojh1ulcduihaidhczon1flsig7jfvccphzckuwe1le.woff2`

可将上述产品图搬到 `/images/product/`，字体搬到 `/fonts/`，同步正文、srcset、海报、预加载、CSS与媒体摘要。新版核心页没有加载Elementor或jQuery运行脚本。

## 既有对照试验的证据与范围（本次未复跑）

既有报告记载：在临时目录复制当时的构建产物，仅从副本移除164个候选资源；原构建和副本各检查127个非跳转HTML，视口390px。页面HTTP状态、标题、主标题和文档宽度一致，没有新增HTTP资源错误或浏览器脚本错误。试验完成后临时副本已清理。

既有试验中的原构建和副本均存在4个旧Elementor动态分包404及对应加载错误；当时Node服务均对旧 `/admin/content/` 返回404。这些是本来存在的旧功能边界。七语核心页的独立交互验收没有资源或脚本错误。该历史剥离试验没有认证旧插件的所有交互或外部托管资源，清单仍应按批应用并做回归。

- [临时剥离对照结果](wordpress-pruning-verification.json)
- [逐文件依赖、大小与摘要](wordpress-asset-dependency-map.csv)
- [完整机器评估](wordpress-theme-removal-assessment.json)

## 仍需迁移的旧布局入口

| 入口 | 后续处理 |
|---|---|
| `/essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency/` | 核对现有维护内容与目标主题，迁移后再设置相关301 |
| `/essential-tips-for-maintaining-heavy-machinery-prolonging-lifespan-and-efficiency-2/` | 核对与太阳能方案的内容关系，决定合并或重写 |
| `/maximizing-roi-through-proper-care-and-rental-management-of-heavy-machines/` | 核对与ROI工具及维护主题的关系，避免只按旧slug跳转 |
| `/project/` | 先明确综合应用索引的内容归属，再合并或建立新索引 |
| `/the-importance-of-regular-inspections-for-heavy-machinery/` | 与维护及资料内容核对后合并或重写 |
| `/404.html` | 换为采购站的轻量404模板，并保持真实404响应 |

还应检查 `src/pages/blog/[slug].astro` 和 `[lang]/blog/[slug].astro` 的旧GEOFlow分支。当前未产生公开文章页，但可选分支仍导入 `BaseLayout`；不能只看当前零输出便删除其依赖。已经使用新采购布局的审核快照指南流程应保留。

## 源码、镜像与工具的剥离条件

| 范围 | 当前作用 | 评估 |
|---|---|---|
| `src/layouts/BaseLayout.astro`、旧Header/Footer/RawFragment/AssetLinks/RuntimeScripts | 服务上述旧布局及可选文章分支 | 完成入口迁移后可一起退役 |
| 六个小语种的 `src/fragments/{es,fr,pt,vi,th,id}` | 核心页已不用这些片段，旧编辑器、库存和生成脚本仍读取 | 先迁移或退役辅助工具，再归档删除 |
| `src/fragments/en` | 旧布局读入路由片段及首页页眉/页脚；RawFragment会先读取文件再选择替代正文 | 保留当前所需部分，随旧布局退役；不要只删除正文文件 |
| `scripts/content-admin-plugin.mjs`、`src/pages/admin/content.astro`、`content-overrides.json` | Vite开发期旧片段编辑器 | 目前不能编辑新组件和新词库；改用当前内容流程或迁移编辑能力后退役 |
| `generate-from-static.mjs`、`translate-fragments.mjs`、`update-seo-content.mjs`、`sanitize-assets.mjs` | 旧镜像、片段、翻译与批量修改管线 | 停用对应命令与调用后可归档；避免旧管线继续修改历史文件 |
| `src/i18n/config.ts` | 仍驱动Astro语种配置和路由 | 保留 |
| `src/i18n/messages`、旧i18n辅助函数 | 旧布局和可选GEOFlow仍用 | 调用者迁移后再评估，不整目录删除 |
| `InquiryPage.astro` 内 `.legacy-inquiry-page` 样式 | 七语均已进入现代分支，该旧样式在现有语种中不会启用 | 可在后续代码清理时移除，并复验七语表单布局 |
| 根目录 `server.js`、旧 `public` 图片替换界面、根包express/multer依赖 | 原图片编辑器操作 `maquin-static-html` 镜像；当前npm启动入口已转向Astro采购站 | 确认停用此旧工具后可一组归档，并同步更新根package及锁文件 |

当前六语共用的新采购组件、`industrial-copy`、事实基线、审核快照、询盘服务、真实产品图片和S4证据属于保留范围。

工作区另有以下历史资产。这些数字表示工作区文件体积，不能再叠加到21.95MB部署包节省量中：

| 目录 | 文件数 | 体积 | 条件 |
|---|---:|---:|---|
| `maquin-site` | 276 | 32.23 MB | 历史镜像，确认原图与追溯材料归档后可移出工作区 |
| `maquin-static` | 42 | 2.01 MB | 另一份历史抓取目录；核对独有素材与维护脚本后归档 |
| `maquin-static-html` | 281 | 32.36 MB | 仍是旧生成器与图片编辑器输入；连同旧工具退役 |
| `maquin-astro-theme/src/fragments` | 716 | 11.55 MB | 包含全部语种，按上表分阶段处理 |
| `maquin-astro-theme/.i18n-cache` | 108 | 10.76 MB | 旧翻译缓存，运行时不使用；保留需要的草稿后可清理 |

## 执行顺序与完成条件

1. 保存当前代码、图片与配置的可恢复副本，按CSV清单先剥离164个候选资源。重新构建并重跑核心页、下载、字幕、图库及旧入口对照。
2. 将字体及两张产品图迁到新资源目录，修改所有引用与媒体摘要。检查所有图片尺寸变体、视频海报、meta图片、CSS及预加载链接。
3. 迁移5个旧英语主题页、404和可选文章分支；只为内容相关的旧URL配置一跳301，核对最终200、查询参数、canonical、hreflang和sitemap。
4. 迁移或退役旧内容/图片编辑器与片段生成管线，再归档旧布局、六语旧片段、英文旧片段与镜像。保留当前七语配置、事实来源和新内容审核流程。
5. 重算依赖；确认公开核心页和错误页都不请求旧插件/主题资源、所有80个现有跳转仍有效，再删除剩余未引用文件并刷新构建清单。

每批保留回滚映射。正式站域名及搜索数据仍待配置，不能从本地试验推断线上搜索表现或已有外链是否受影响。

复现命令（在项目根目录）：

```sh
node scripts/assess-wordpress-theme.mjs
node --experimental-sqlite scripts/verify-wordpress-pruning.mjs
```
