# 本地启动与内容维护

需要 Node.js 22.12 或更新版本。项目现已使用独立 Astro 组件和静态翻译，不再依赖 WordPress 或 Elementor。

在项目根目录预览界面：

```sh
npm run dev -- --host 127.0.0.1 --port 4322
```

访问 http://127.0.0.1:4322/。开发服务器仅用于前端预览；测试真实询盘请运行：

```sh
npm run build
npm start
```

访问 http://127.0.0.1:8787/；私有询盘后台为 `/admin/inquiries/`。鉴权和收件配置见 [INQUIRY_OPERATIONS.md](INQUIRY_OPERATIONS.md)。

内容维护：

1. 页面结构在 `src/components/procurement/`，共用页眉页脚在 `src/layouts/ProcurementLayout.astro`。
2. 文案在 `src/data/industrial-copy/`、`about-copy.json`、`inquiry-copy.json`；确认参数继续以 `content-baseline.json` 为准。
3. 产品图在 `public/images/product/`，证据素材在 `public/images/evidence/`。历史图片原文件已归档，不能用模板图充当客户或工厂证据。
4. 审校文章使用 `content:prepare`、`content:import`、`content:freeze`，不恢复旧实时文章接口。
5. 修改后执行 `npm test` 和 `npm run locales:check`；`npm run content:inventory` 生成当前页面盘点。以上细分命令在 `maquin-astro-theme` 目录执行。

旧 `/admin/content/` 片段编辑器和根目录图片替换服务已退役。旧镜像、翻译草稿、片段和工具的恢复方式见 `../archives/README.md`；当前源码不再读取这些输入。
