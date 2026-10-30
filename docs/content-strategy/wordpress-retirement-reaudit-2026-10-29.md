# WordPress 遗留代码剥离复核报告

复核日期：2026-10-29。对象为当前本地工作区、重新生成的部署产物、旧链接映射及恢复归档。

**结论：当前网站的运行与部署层已经完成 WordPress 主题剥离；整个仓库仍保留少量旧清洗逻辑、测试记录，以及 GEOFlow 的可选 WordPress 发布功能。另有一处语言切换专项测试预期过期，需要收尾。** 本次结论对应源码摘要 `ad798f5033c1de7e090d566e2cb7893db47f39527fc61e885a75947b40391d77`，资源摘要 `298b5209d8d604ca459034740747e6d4eff55efc8d64ea889cab54c81a8eb01f`；构建与当前源码一致。

## 需要收尾的两项

### 1. 语言切换专项测试仍保留旧版页面回退预期

位置：`maquin-astro-theme/scripts/browser-language-switching.mjs:78–79`。

本轮实际运行 `npm run language:browser`，在完成 2,975 项断言后，于 `/project/` 失败。脚本仍要求旧入口切换西班牙语后进入 `/es/?utm_source=legacy`；当前 `/project/` 已按新路由一跳 301 到太阳能方案页，因此应切换到该方案的西语版本，并保留有效查询参数及锚点。

补充浏览器核验已覆盖这五个退役内容入口、新版错误页与真实不存在的页面，共 35 项通过。例如：

```text
/project/?context=roi&utm_source=legacy#unused
→ /solutions/solar-street-light-installation/?context=roi&utm_source=legacy#unused
→ /es/solutions/solar-street-light-installation/?context=roi&utm_source=legacy#unused
```

页眉与页脚生成的链接一致，点击后西语页面正常加载。错误页仍按现行规则回退到目标语言首页。证据表明该失败来自过期测试预期；完整版专项测试依然记为失败，不能用补充检查替代其通过记录。后续应更新旧入口断言、扩展对当前别名的语言切换覆盖，再完整重跑。

### 2. 内容政策模块中仍有旧模板清洗逻辑

位置：`maquin-astro-theme/src/utils/contentPolicy.mjs:41`。

`enforceContentPolicy()` 仍包含 Elementor 组件、旧片段结构和价格卡片清洗分支。目前调用它的是 `scripts/contentPolicy.test.mjs`；正式布局只使用同模块的 `productSchema()`，因此当前部署页面没有这些旧模板代码或 WordPress 运行依赖。

建议将仍在使用的产品结构化数据和内容基线与旧模板清洗代码拆开，再清理确认没有生产调用的分支，同时保留事实、品牌和商业信息约束的有效检查。这属于源码维护收尾。

## 网站剥离核验结果

| 对象 | 本轮核验结果 |
|---|---|
| WordPress 公共目录 | `public/wp-content`、`public/wp-includes` 及对应构建目录均不存在 |
| 旧模板体系 | BaseLayout、旧 Header/Footer、HTML 片段目录、旧内容编辑器及相关插件已退役 |
| 旧辅助项目 | 旧图片替换服务器、镜像目录和旧生成/翻译工具已归档退出活动项目 |
| 当前页面 | 119 个七语核心页、1 个新版错误页、85 个跳转页、1 个询盘后台页，共 206 个 HTML 文件；旧模板正文页为 0 |
| 旧入口 | 85 条别名通过真实本地 HTTP 检查，一跳 301、目标存在并保留查询参数 |
| 产品图片与字体 | 5 项迁移资源与原文件摘要一致，引用已改为当前图片及字体目录 |
| 更宽的部署产物扫描 | HTML、CSS、JS、JSON、SVG、XML、TXT 中的 `wp-content`、`wp-includes`、`wp-admin`、`wp-json`、`wp-embed`、`wp-emoji`、`elementor`、`jquery` 命中为 0 |
| 根包依赖 | 根 package.json 已移除旧 express/multer 活动依赖；现存安装缓存不参与该站部署 |
| 内容发布流程 | 网站读取经过审核的本地文章快照；旧实时公开文章分支已退役 |
| 防止回流 | 构建结束自动运行 WordPress 退役检查，阻止旧目录和旧资源引用重新进入产物 |

## 本轮重新运行的验证

| 检查 | 结果 |
|---|---|
| `npm test`（重新构建、内容、决策与语言、询盘及退役检查） | 退出成功；49 项单元/集成测试通过 |
| 多语言静态检查 | 533 项通过，覆盖 6 个非英语版本的 102 个核心页 |
| 剥离静态检查 | 631 项通过 |
| 剥离真实本地 HTTP 检查 | 1,172 项通过 |
| 七语浏览器综合检查 | 1,406 项通过；无记录到的页面脚本错误或 HTTP 错误 |
| 语言切换完整专项 | 失败；2,975 项已通过断言后遇到上述旧入口预期问题，后续流程未完整执行 |
| 旧入口及错误页语言切换补充检查 | 35 项通过；只读导航，没有提交询盘或发送邮件 |

各套检查的覆盖存在重叠，不将断言数相加视为独立测试数量。浏览器综合测试使用临时测试收件数据。

## 归档与体积

主归档的 1,870 个清单文件、补充工具归档的 4 个文件均逐文件校验大小与 SHA-256，一致。1,751 个退役文件当前均已离开原路径，全部具有可恢复来源；单独保存的旧 favicon 摘要也一致。主归档另含 2,193 个 macOS AppleDouble 元数据文件，清单之外没有发现其他普通业务文件。

归档位于 `archives/`，不进入网站的 `public` 或 `dist`。恢复方式见 [归档说明](../../archives/README.md)，应先解压到独立目录核对。

| 未压缩文件字节 | 剥离前 | 当前 |
|---|---:|---:|
| public | 38,343,778 | 6,980,669 |
| dist 部署产物 | 44,186,735 | 11,847,850 |

部署产物减少 **32,338,885 字节，约 73.2%**。这反映文件体积，不能换算为页面访问速度提升比例。

## 全仓库中仍出现 WordPress 的合理来源

- **GEOFlow 可选发布功能**：`geoflow/app/Services/GeoFlow/DistributionPublisherManager.php:20` 仍可按 `wordpress_rest` 渠道调用发布器，相关媒体、分类、后台表单和测试也存在。它是该子项目的通用对外发布能力，当前采购站构建及询盘服务不依赖它。本轮未检查实际渠道数据库配置，也未触发外部发布。若目标进一步定义为“仓库中不再包含任何 WordPress 功能”，这部分仍需单独处理。
- **防回归检查与历史资料**：退役校验器、旧路径映射、归档清单及历史报告中的 WordPress 字符串用于验证和追溯，不代表浏览器仍加载旧主题。
- **本地依赖缓存**：旧根 node_modules 的缓存与已移除的依赖声明应分别判断。

## 验收范围与记录

本报告是本地复核结论；正式域名、询盘邮箱和联系电话继续按用户决定标记为待配置，公网部署与正式收件不在本轮验证范围。归档可恢复性通过逐文件校验和移除清单核对确认，未把整个历史站点恢复后另行启动。

本轮产出为复核报告及验收记录，业务源码保持本次被审计版本。

- [机器可读复核结果](wordpress-retirement-reaudit-2026-10-29.json)
- [旧入口语言切换补充证据](wordpress-retirement-legacy-language-reaudit.json)
- [静态检查记录](wordpress-retirement-static-verification.json)
- [HTTP 检查记录](wordpress-retirement-http-verification.json)
- [七语浏览器检查](../../maquin-astro-theme/qa-reports/industrial-locales-browser.json)
- [完整语言专项失败记录](../../maquin-astro-theme/qa-reports/language-switching-browser.json)
- [此前剥离执行记录](wordpress-retirement-completion.md)
