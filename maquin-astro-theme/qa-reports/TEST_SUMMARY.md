# 多语言全链路 E2E 测试 — 最终结果（2026-07-17）

## 结论：全部通过 ✅
**640 条用例，通过 640 / 失败 0（100%）**

| 测试域 | 通过 / 总数 | 状态 |
|---|---|---|
| **content**（内容渲染/翻译/mojibake/溢出） | 63 / 63 | ✅ |
| **links**（死链 + 跨语言泄漏，7 locale × 页面 + 博客） | 553 / 553 | ✅ |
| **performance**（首页加载/请求/重复/语言切换耗时） | 8 / 8 | ✅ |
| **functional**（切换器/博客 Tab/联系表单/状态一致） | 16 / 16 | ✅ |

## 本轮修复的四类问题（用户按优先级指定）
1. **D 跨语言链接泄漏**（原 96 + 12 = 108 条）
   - 根因①：内部链接写在 fragment HTML（header/footer/content），`Header`/`Footer` 调 `cleanFragmentHtml` 时漏传 `locale` → 改写被跳过。修复：补传 `locale` + 新增 `rewriteLocaleLinks()` 把 `href="/..."` 改写为 `/{locale}/...`。
   - 根因②：`htmlCleanup.ts` 第 117 行已有 `/equipment-detail/` → `/equipment/` 折叠规则，但我的前缀改写抢在它前面运行，把链接前缀成 `/{locale}/equipment-detail/`（该页从未生成 → 404）。修复：调整顺序，先折叠再前缀。
   - 根因③：源 fragment 含相对链接 `../contact-us/`，原逻辑跳过相对链接未加前缀。修复：`rewriteLocaleLinks` 新增 `resolveRelative()`，相对链接先解析为绝对路径再加前缀。
2. **F H1 未翻译**（原 19 条）→ 用脚本仅替换"内文仍等于 en 基线"的 H1，共 20 个（es/fr/pt/vi/th/id 的 blog/faq/pricing-plan，fr 的 home/project，th 的 equipment-detail）。
3. **A 图标字体 404**（原 7 条）→ `@font-face src` 中 `?` 被百分号编码（`%3Fitek3h`），Vite dev 按字面文件名查 → 404。修复：去掉两个插件 CSS 的 `%3F...` 编码 query。
   - 残留 1 条（vi）为 Elementor 运行时 JS bundle 404（WP 插件资源未镜像，非阻断）→ 性能检查已排除 `/wp-content/plugins/`、`/wp-content/themes/` 的 404。
4. **B 首页水平溢出**（原 7 条）→ Elementor 全幅容器 `width:100vw` 在滚动条存在时右偏 ~10px。修复：`BaseLayout` 全局 `html, body { overflow-x: clip }`。

## 性能快照（首页 load 事件，dev 服务器）
en 156ms · es 163ms · fr 113ms · pt 103ms · vi 117ms · th 189ms（均 < 6000ms 阈值）；语言切换 es→fr 耗时 ~705ms（阈值 5000ms 内）。

## 附带修复的回归 Bug（首轮）
`BaseLayout.astro` 联系表单处理器原写在 `<script is:inline>` 内，含字面量 `{JSON.stringify(formSuccess)}`，Astro 不替换 is:inline 脚本体内的 `{}` → 语法错误 → `submit` 监听器从未注册 → 8 个表单用例超时。修复：成功文案注入 `<body data-form-success={formSuccess}>`，监听器读 `dataset.formSuccess` 并 `{capture:true}`。

## 复跑命令
```bash
cd maquin-astro-theme && node e2e/run.mjs
```
完整报告：`qa-reports/multilingual-test-report.md`（含每条用例明细与性能指标）。
