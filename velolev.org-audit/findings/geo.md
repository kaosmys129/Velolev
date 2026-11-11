# AI 搜索与 GEO 就绪度专项审计 (GEO & AI Search Findings)

## 1. 优势表现 (得分 92/100)
- **双层 `llms.txt` 规范**：
  - `/llms.txt` (6.8 KB) 提供核心规格基准；
  - `/llms-full.txt` (59.3 KB) 提供完整事实与安装工法语料库；
  - 均返回 HTTP 200，内容充实。
- **爬虫协议对 AI 全面放行**：
  - `robots.txt` 明确放行 `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Bytespider`, `OAI-SearchBot`, `ChatGPT-User`。
- **无 JS 服务端可读性**：
  - 首页无 JS 纯文本内容达 911 词，纯文本爬虫无需执行无头浏览器即可读取全部核心参数。
- **物理事实底座 (F001–F031)**：
  - 为 AI 生成式检索（SearchGPT、Perplexity）提供极其抗幻觉的精准数据支持。

## 2. 改进建议
1. **`llms.txt` 格式轻微告警**：
   - 依据 llmstxt.org proposal v2 提案，H2 标题下应为 `[名称](链接)` 列表，而目前 H2 下包含了普通参数列表项（触发 11 个 `item-without-link` 提示）。建议将参数置于首个 H2 之前的摘要段落，H2 仅收录链接清单。
2. **AI 发现目录补齐**：
   - 补充 `/.well-known/ai-catalog.json` 与 `/.well-known/agent-card.json`。
