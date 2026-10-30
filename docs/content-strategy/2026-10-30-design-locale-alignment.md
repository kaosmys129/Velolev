# 诊断重构组件：设计统一与多语言修复

日期：2026-10-30。开发基线：`a5bd4c1`，本轮分支：`codex/design-locale-alignment`。

本轮针对 `DIAGNOSIS_REPORT.md` 中已落实的组件进行设计与多语言修复，设计依据为 `design-exports/tokens/design-system-spec.md` 和 `src/styles/procurement.css`。

## 原因与修复

| 问题 | 本地代码中的原因 | 修复 |
| --- | --- | --- |
| 新组件与现有页面割裂 | 法兰工具使用独立的圆角、橙绿状态卡、徽章和长篇推销文案；采购入口使用多层卡片与“转化层级”标签；对比表桌面与移动端重复实现 | 按站内纸色、碳墨黑、明黄、Geologica 字体、工程编号、细分割线与既有间距重做，不修改全站主题 |
| 新首页和产品页夹杂英文 | 原有翻译目录以完整英文文本节点为键，Hero 和说明文案重写后没有同步目录；`translateText()` 找不到词条时返回英文 | 新增 `reconstruction-copy.json`，补齐 124 条文案的西班牙语、法语、葡萄牙语、越南语、泰语、印尼语翻译，保持单位和模板占位符 |
| 法兰工具初始或操作后显示英文 | 浏览器脚本直接把硬编码英文写入 `textContent`；构建时翻译器有意跳过脚本，所以无法替这些运行时字符串翻译 | 构建时生成当前语言的轻量词典，浏览器仅按状态填入对应语言；标注无效输入，保留小数，孔数变化也参与核对 |
| ROI 结果单位恢复英文 | KPI 中的 `Poles`、`Months`、`Project Cost Reduction` 在脚本中直接拼接 | 使用带占位符的译文和当前语言的数字格式，预设按钮补充 `aria-pressed` 状态 |
| 局部图片标签混显 | About 文字来自七语言 JSON，但质检图的字幕、替代文本和额外 OEM 徽章写死英文 | 图片字幕和替代文本使用本语言步骤数据，移除额外英文徽章与重复标签 |
| 操作后跳回英文页或拿到英文资料 | 嵌套组件未接收 `locale`；法兰脚本写死 `/quote/`；通用页面链接本地化有意保留下载文件路径 | 显式传递 `locale`，法兰入口使用当前语言询价路径，下载使用 `localizedDocumentPath()`；法兰尺寸可带入当前语言询盘备注 |
| FAQ 正文已翻译但 JSON-LD 仍为英文 | 布局直接序列化英文 FAQ 数组，脚本节点不经过正文翻译 | 序列化前先翻译问答，与读者看到的页面一致 |
| 相同问题容易再次出现 | 原有校验需要单独执行，静态检查也未覆盖显示属性和新增动态词典 | 普通 `npm run build` 自动校验多语言正文、图片与无障碍属性、词条完整性、占位符和 CSS 体积；失败即返回非零退出码 |

## 设计结果

- **法兰核对器**：双列尺寸工作台，左侧输入，右侧线稿与核对结果；手机按顺序排列。标准范围、M24 配件、图纸审核和无效输入各有对应状态。结果为规格核对，不以“100% 适配”代替实际连接审核。
- **采购入口**：资料下载、底座核对、项目询价三步，沿用站内编号与贯穿分割线，当前重点入口使用黄色按钮。
- **四维对比表**：成本、通行、工序、供电使用单一语义表格；窄屏可在表格区域内横向滚动，页面本身不溢出。保留列标题和行标题关系。
- **ROI**：预设改为简洁选项格，结果回归深色面板，使用黄色强调关键金额，清除输入时同时清除旧结果。
- **场景与质检**：统一图片比例、标题层级、边框和编号，减少独立卡片装饰与重复徽章。

最终首页加载的 CSS 约 **32.3 kB**，低于仓库 **65 kB** 校验上限。翻译仅在构建阶段处理；浏览器没有引入整套翻译目录或 HTML 解析器。

## 验收

最终构建及项目完整测试通过，涵盖 7 项内容策略测试、29 项决策与语言单元测试、13 项询盘服务测试、4 项旧站退休测试，以及既有 D30/D60 检查。

- 六种非英语核心页面：102 页、635 项静态检查通过。
- 新组件七语言浏览器测试：400 项通过；覆盖 1440、820、390、320 px，法兰输入、孔数、M24、异常输入、地区预设、负收益、重置、语言化询盘跳转和 FAQ JSON-LD。
- 全站七语言浏览器验收：1406 项通过；覆盖核心页面、语言切换、资源下载、视频和受控询盘，无浏览器异常或失败资源请求。测试请求使用临时数据库并在结束后删除。
- 初轮西班牙语超时发生在同时重建 `dist` 时；停止并行构建后完整复测通过。最终两份浏览器报告的源码摘要均与最终构建一致。

复测命令（在 `maquin-astro-theme/`）：

```sh
npm test
npm run reconstruction:browser
npm run locales:browser
```

机器报告：

- `maquin-astro-theme/qa-reports/industrial-locales.json`
- `maquin-astro-theme/qa-reports/reconstruction-browser.json`
- `maquin-astro-theme/qa-reports/industrial-locales-browser.json`

## 截图

[全部组件截图索引](qa-reconstruction/index.html)

| 组件 | 桌面 | 手机（法语） |
| --- | --- | --- |
| 法兰尺寸工作台 | [查看](qa-reconstruction/en-compatibility-1440.png) | [查看](qa-reconstruction/fr-compatibility-390.png) |
| 三步采购入口 | [查看](qa-reconstruction/en-home-1440.png) | [查看](qa-reconstruction/fr-home-390.png) |
| 四维对比 | [查看](qa-reconstruction/en-compare-1440.png) | [查看](qa-reconstruction/fr-compare-390.png) |
| 成本计算器 | [查看](qa-reconstruction/en-roi-1440.png) | [查看](qa-reconstruction/fr-roi-390.png) |
| 质检流程 | [查看](qa-reconstruction/en-about-1440.png) | [查看](qa-reconstruction/fr-about-390.png) |

本轮代码与验收文件独立提交；工作区原有未跟踪资料、本地配置和其他项目保持原状。
