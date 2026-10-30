# 页眉方案与工具聚合导航

日期：2026-10-28。当前采购页面共享页眉新增“Solutions & tools”，替换原来的单独Guides入口，并保留产品、适配、About Us、联系和询价入口。

## 分组与目标

| 分组 | 入口 |
|---|---|
| Applications | 太阳能路灯方案、停车场与园区方案 |
| Compare & plan | 立杆器与吊车对比、项目成本/ROI计算器 |
| Resources & guides | 资料中心、指南索引、FAQ |

当前页对应的分组和链接会高亮。七语按钮与说明按页面语言显示；只有英语版本的目标标记EN，FAQ使用真实存在的当前语言路径，不生成缺少译稿的URL。

## 交互与验证

桌面点击展开双栏分组面板；1100px及以下在主菜单内展开。原生details提供Enter/Space操作，ArrowDown/ArrowUp可进入首尾链接，Esc关闭并返回焦点，Tab离开和点击外部关闭。手机第一次Esc收起内层，第二次Esc关闭主菜单。

已修正内部焦点移动造成链接点击前关闭的问题，并实测资料中心与场景页导航。最终45项专门交互检查通过，含320/390/768/1100/1101px、六种其他语言手机菜单、当前页标识与数据不提交检查；另有81项原采购回归和142项D60浏览器回归通过。

构建、现有36项测试及内容检查通过。并行新增的视频回归曾暴露macOS临时目录的符号链接路径差异，已仅归一化静态根目录的真实路径，保留原有文件边界校验；视频及询盘测试13项均通过。

实现：`src/components/procurement/HeaderDiscovery.astro`、共享布局和页眉响应式样式。验证记录：`header-discovery-verification.json`；截图：`qa-navigation/dropdown-desktop.png`及`dropdown-mobile.png`。未变更产品事实、联系方式或正式发布状态。
