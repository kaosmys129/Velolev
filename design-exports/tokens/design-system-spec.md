# volvet 全站设计系统与 UI 规范说明书 (Design System Specification)

> **版本**：v1.0.0 (2026-10-28)  
> **适用范围**：volvet 便携式立杆机全球独立站 (Desktop / Tablet / Mobile)  
> **设计基调**：**精密工业美学 (Precision Industrial Aesthetic)**。以工程参数严谨性为主导，米灰纸质感底色融合工业明黄，兼顾高可读性与专业感。

---

## 一、 色彩体系 (Color Palette)

### 1. 核心品牌与强调色
| 语义名称 | 色值 | RGB | 用途说明 |
|---|---|---|---|
| **Brand Yellow (主黄色)** | `#f4cc3d` | rgb(244, 204, 61) | 主操作按钮 (CTA)、品牌首字母徽章背景、高亮色块、重点横幅 |
| **Yellow Hover (悬浮亮黄)** | `#ffdc57` | rgb(255, 220, 87) | 按钮悬停与交互高亮状态 |
| **Focus Ring (聚焦金黄)** | `#947500` | rgb(148, 117, 0) | 全局键盘无障碍 (Focus-Visible) 焦点外轮廓 |

### 2. 界面中性色与背景体系
| 语义名称 | 色值 | RGB | 用途说明 |
|---|---|---|---|
| **Ink (碳墨黑)** | `#1d201e` | rgb(29, 32, 30) | 正文主要文字、所有大标题、重要图标 |
| **Dark Industrial (工业深黑)** | `#202622` | rgb(32, 38, 34) | 页脚背景、深色对比度区块、工业标签背景 |
| **Muted Slate (次要灰绿)** | `#626a63` | rgb(98, 106, 99) | 辅助说明文案、表单帮助说明、版权信息 |
| **Paper Canvas (暖米底色)** | `#f3f2ec` | rgb(243, 242, 236) | 全站主页面底色，营造专业工程纸质图纸质感 |
| **Grid Line (结构分割线)** | `#d5d8cd` | rgb(213, 216, 205) | 规格栏边框、表格分割线、表单卡片边界 |
| **Blueprint Green (展台背板绿)** | `#c6ceba` | rgb(198, 206, 186) | 首页 Hero 机械展示画板背景（内嵌 52px 网格线） |
| **Panel Light (事实便签浅灰)** | `#e6e9de` | rgb(230, 233, 222) | 证据台账面板、工程说明卡片背景色 |

### 3. 交互与校验语义色
| 语义名称 | 色值 | 用途说明 |
|---|---|---|
| **Error / Alert (警告与错误)** | `#a52a20` | 校验错误文字、错误输入框双像素边框 |
| **Success (成功绿)** | `#2e683a` | 询盘凭证成功确认卡片状态标头 |

---

## 二、 排版与字阶系统 (Typography System)

全站字体以现代几何工业无衬线字体 **Geologica** 为核心，辅以等宽字体 **Courier New** 强化机械工程与数据编号属性。

- **主要字体族**：`Geologica, 'Trebuchet MS', system-ui, sans-serif`
- **工程等宽字体**：`'Courier New', SFMono-Regular, monospace`（用于编号、尺寸参数、凭证号）

### 字阶标准 (Type Scale Hierarchy)
| 级别 | 尺寸 (Desktop / Fluid) | 行高 | 字重 | 字母间距 | 典型应用 |
|---|---|---|---|---|---|
| **Hero Title** | `clamp(40px, 5.7vw, 82px)` | 1.08 | 650 (Bold) | -0.045em | 首页 Hero 主标语 |
| **Page H1** | `clamp(36px, 5vw, 64px)` | 1.12 | 650 (Bold) | -0.035em | 产品页、指南页主标题 |
| **Section H2** | `clamp(30px, 3.6vw, 50px)` | 1.15 | 650 (Bold) | -0.03em | 模块二级大标题 |
| **Card H3** | `23px` | 1.25 | 650 (Bold) | -0.025em | 特性卡片标题、步骤说明标题 |
| **Spec Big Num**| `36px` | 1.2 | 650 (Bold) | -0.05em | 规格栏大数字 (12m / 300kg) |
| **Lead Paragraph** | `18px` | 1.7 | 400 (Regular) | 0 | 页面导语与引言段落 |
| **Body (正文)** | `15px` | 1.65 | 400 (Regular) | 0 | 通用正文、参数表格 |
| **UI Small** | `13px / 12px` | 1.5 | 500 / 600 | 0 | 导航菜单、表单标签、错误提示 |
| **Eyebrow / Kicker** | `11px` | 1.4 | 650 | 0.16em | 全大写前导标签（带 24px 实线标识） |

---

## 三、 间距与网格规范 (Layout & Spacing)

- **最大内容宽度 (Max Container Width)**：`1240px`（页面居中，两端自适应）
- **页头最大宽度 (Header Max Width)**：`1440px`
- **桌面内边距 (Desktop Gutter)**：两侧各 `48px`（页面边缘与内容留白）
- **移动端内边距 (Mobile Gutter)**：两侧各 `18px`
- **模块垂直内边距 (Section Spacing)**：
  - 桌面端：`90px 0`
  - 移动端：`55px 0`
- **响应式断点 (Breakpoints)**：
  - `1440px`：超宽屏标准视口
  - `1050px`：导航与双列内容紧凑过渡断点
  - `760px`：移动端汉堡菜单折叠与单列流断点
  - `390px`：移动设备基准测试视口

---

## 四、 核心 UI 组件规范 (Component Specification)

### 1. 按钮系统 (Button Styles)
- **Primary CTA (主行动按钮)**：
  - 高度：`54px`（`padding: 17px 23px`），圆角：`2px`，字重：`600`。
  - 采用 Flex 布局两端对齐，右侧包含指向箭头 `↗`。
  - 悬停动效：`background: #ffdc57; transform: translateY(-2px);`。
- **Small Button (导航与操作小按钮)**：
  - `padding: 12px 17px`，字号 `13px`。
- **Dark Inverted Button (深色反差按钮)**：
  - 背景为碳墨黑 `#1d201e`，文字纯白，用于黄色 CTA 横幅中。

### 2. 表单与输入框 (Form Elements)
- **输入框与下拉选择框**：
  - 最小点击高度：`48px`（保障移动端良好触控体验）。
  - 背景纯白，边框 `1px solid #c8cec3`，微圆角 `2px`。
  - 获得焦点状态：`outline: 2px solid #a08216; outline-offset: 2px;`。
  - 校验失败状态：`border: 2px solid #a52a20;`。
- **附件上传区域 (Dropzone)**：
  - 虚线边框 `1px dashed #a8b29e`，底色 `#e8ebdf`，支持 PDF / PNG / JPG 格式限制说明。

### 3. 参数规格带 (Spec Strip)
- 4 列等分（移动端自适应为 2×2 网格），上下边框贯穿，展示关键硬指标（高度、荷载、动力、操作工数）。

### 4. 品牌标识 (Wordmark)
- 紧凑微排版，首字母 `v` 嵌入明黄色 `32px × 34px` 矩形徽章，字体字重 `800`，字间距 `-2px`。
