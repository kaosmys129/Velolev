# 页眉页脚语言切换与刷新验收

日期：2026-10-29。范围：七语119个核心页、5个旧英语主题页、旧404页，以及隔离夹具中的单语文章。当前代码和构建摘要见 [验收记录](language-switching-verification.json)。

## 页面入口

页眉、页脚均使用同一个语言组件，提供English、Español、Français、Português、Tiếng Việt、ไทย、Bahasa Indonesia七项选择。页眉位于主导航旁；手机端位于Menu外，显示地球图标与当前语言代码。页脚有带边框、当前语言和“语言”标签的独立入口，菜单向上展开。

两个实例使用独立ID，当前语种高亮。原生details与普通链接支持键盘和关闭JavaScript的环境；Esc关闭并归还焦点，Tab离开或点击外部关闭。桌面与手机保持现有工业黄、深绿和纸白样式。旧布局页面也已在真正的header/footer区域加入相同组件，替换原来的固定悬浮入口。

## 切换与刷新规则

1. **网址决定语言。** 选择语言后通过真实链接加载整份对应HTML，正文、页眉、页脚、标题和lang一起更新。语言偏好存储只记录显式选择，不触发自动跳转。
2. **按真实主题映射。** 例如英语产品页 `/products/light-pole-jack/` 切法语为 `/fr/equipment/`，法语报价切英语为 `/quote/`，不直接拼接语言前缀。
3. **有对应页时保留查询参数和锚点。** UTM、应用、数量及共享章节定位随链接带入。当前URL通过history或hash更新后，点击时重新计算目标，避免读取过期地址。
4. **刷新、后退、前进遵从地址栏。** 已保存的语言偏好不会覆盖显式网址。缓存恢复时同步链接并关闭展开的语言菜单，避免旧菜单状态残留。
5. **缺少译页时进入目标语言真实首页。** 菜单会标明首页；保留UTM，移除不适用于首页的页面参数与锚点。404和没有译稿的文章不生成虚构对应页。
6. **依靠原生导航完成切换。** 不拦截链接进行局部文本替换。浏览器存储不可用时仍可切换；无JavaScript时，原生下拉及实际页面链接可用。

旧布局的hreflang同步收敛到真实页面关系。HTML在本地Node服务使用no-cache，刷新会重新验证页面；构建产物使用带摘要的CSS和JS。

## 验收证据

| 验收 | 结果 |
|---|---|
| 语言专项浏览器检查 | 2992项通过；含119页的双入口与链接矩阵、84次实际跨语言整页跳转 |
| 站内连续导航与回退 | 49项通过；含切换后关于页、首页、资料、报价、刷新缓存、实际404及单语文章 |
| 六语静态检查 | 533项通过 |
| 原七语页面与功能回归 | 1406项通过 |
| D30 / D60浏览器回归 | 81 / 142项通过 |
| 内容、决策、本地化、语言URL、询盘单测 | 45项通过 |
| 配置域名夹具及文章快照 | 检查通过，未替换正常站点或正式域名 |

覆盖宽度1440、1280、1100、768、390、320px。正常核心流程没有脚本错误或本地资源错误。旧布局原有的Elementor分包错误属于上一份主题评估记录；本次语言组件的真实跳转已单独验收。

主要证据：

- `maquin-astro-theme/qa-reports/language-switching-browser.json`
- `maquin-astro-theme/qa-reports/language-continuity.json`
- `maquin-astro-theme/qa-reports/industrial-locales.json`
- `maquin-astro-theme/qa-reports/industrial-locales-browser.json`
- `docs/content-strategy/qa-language-switching/`：桌面、手机页眉和页脚展开截图。

复验命令（进入 `maquin-astro-theme`）：

```sh
npm test
npm run locales:check
npm run language:browser
npm run locales:browser
```

本地预览：`http://127.0.0.1:8787/products/light-pole-jack/`。当前已打开的旧预览需要刷新一次以取得新HTML；随后每次切换都会正常加载目标语言页面。
