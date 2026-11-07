/**
 * 轻量安全 Markdown AST / HTML 渲染工具
 * 专为工程指南与技术文章设计，支持链接、表格、列表、子标题与加粗语义化解析
 */

export function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 解析行内 Markdown 元素（加粗、斜体、代码、链接）
 */
export function renderInlineMarkdown(text) {
  if (typeof text !== "string") return "";

  // 1. 转义原始 HTML 标签防止注入，但保护我们将要生成的 HTML 标记
  let s = text;

  // 2. 匹配 Markdown 链接 [text](url)
  // 支持内部相对链接 /... 以及外部安全链接 https://
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, href) => {
    const cleanHref = href.trim();
    const isExternal = /^https?:\/\//i.test(cleanHref);
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${cleanHref}"${targetAttr}>${linkText}</a>`;
  });

  // 3. 匹配行内代码 `code`
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 4. 匹配粗体 **text**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 5. 匹配斜体 *text* 或 _text_（排除已有标签）
  s = s.replace(/(^|[^\*])\*([^*]+)\*([^\*]|$)/g, '$1<em>$2</em>$3');

  return s;
}

/**
 * 检查一行是否是 Markdown 表格行
 */
function isTableRow(line) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|");
}

/**
 * 检查一行是否是表格分隔线 |---|---|
 */
function isTableSeparator(line) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|") && /^\|[\s-:]+(\|[\s-:]+)+\|$/.test(trimmed);
}

/**
 * 解析表格单元格
 */
function parseTableCells(rowStr) {
  return rowStr
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(c => c.trim());
}

/**
 * 解析 Markdown 文本块为语义化 HTML
 * 支持：
 * - 标题 (###, ####)
 * - 原生表格 (| ... |)
 * - 引用块 (> ...)
 * - 无序列表 (- , * )
 * - 有序列表 (1. , 2. )
 * - 普通段落 (<p>)
 */
export function renderMarkdownBlock(content) {
  if (!content) return "";
  if (typeof content !== "string") return String(content);

  // 规范化换行并按行拆分
  const rawLines = content.replace(/\r\n/g, "\n").split("\n");
  const htmlOut = [];

  let inList = false;
  let listType = "ul"; // 'ul' | 'ol'
  let listItems = [];

  let inTable = false;
  let tableHeader = null;
  let tableRows = [];

  let inBlockquote = false;
  let blockquoteLines = [];

  function flushList() {
    if (inList && listItems.length > 0) {
      const tag = listType;
      const inner = listItems.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join("");
      htmlOut.push(`<${tag} class="semantic-${listType === "ol" ? "ordered" : "bullet"}-list">${inner}</${tag}>`);
      inList = false;
      listItems = [];
    }
  }

  function flushTable() {
    if (inTable) {
      let tHtml = '<div class="table-responsive-container"><table class="engineering-data-table">';
      if (tableHeader && tableHeader.length > 0) {
        tHtml += '<thead><tr>';
        tableHeader.forEach((th, idx) => {
          tHtml += `<th scope="col">${renderInlineMarkdown(th)}</th>`;
        });
        tHtml += '</tr></thead>';
      }
      if (tableRows.length > 0) {
        tHtml += '<tbody>';
        tableRows.forEach(row => {
          tHtml += '<tr>';
          row.forEach((td, idx) => {
            if (idx === 0) {
              tHtml += `<th scope="row">${renderInlineMarkdown(td)}</th>`;
            } else {
              tHtml += `<td>${renderInlineMarkdown(td)}</td>`;
            }
          });
          tHtml += '</tr>';
        });
        tHtml += '</tbody>';
      }
      tHtml += '</table></div>';
      htmlOut.push(tHtml);
      inTable = false;
      tableHeader = null;
      tableRows = [];
    }
  }

  function flushBlockquote() {
    if (inBlockquote && blockquoteLines.length > 0) {
      const innerContent = blockquoteLines.join("\n");
      // 递归解析引用块内部 Markdown
      const parsedInner = renderMarkdownBlock(innerContent);
      htmlOut.push(`<blockquote class="engineering-callout">${parsedInner}</blockquote>`);
      inBlockquote = false;
      blockquoteLines = [];
    }
  }

  function flushAll() {
    flushList();
    flushTable();
    flushBlockquote();
  }

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      // 空行刷新未完成的列表与引用
      flushList();
      flushBlockquote();
      continue;
    }

    // 1. 检查表格行
    if (isTableRow(line)) {
      flushList();
      flushBlockquote();

      if (!inTable) {
        inTable = true;
        tableHeader = parseTableCells(line);
      } else if (isTableSeparator(line)) {
        // 分隔线，略过
        continue;
      } else {
        tableRows.push(parseTableCells(line));
      }
      continue;
    } else {
      flushTable();
    }

    // 2. 检查引用块 (> ...)
    if (line.startsWith(">")) {
      flushList();
      flushTable();
      inBlockquote = true;
      blockquoteLines.push(line.replace(/^>\s?/, ""));
      continue;
    } else {
      flushBlockquote();
    }

    // 3. 检查三级/四级标题 (###, ####)
    if (line.startsWith("#### ")) {
      flushAll();
      const hText = line.replace(/^####\s+/, "");
      htmlOut.push(`<h4>${renderInlineMarkdown(hText)}</h4>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushAll();
      const hText = line.replace(/^###\s+/, "");
      htmlOut.push(`<h3>${renderInlineMarkdown(hText)}</h3>`);
      continue;
    }

    // 4. 检查无序列表 (- , * )
    if (/^[-*•]\s+/.test(line)) {
      flushTable();
      flushBlockquote();
      if (inList && listType !== "ul") {
        flushList();
      }
      inList = true;
      listType = "ul";
      listItems.push(line.replace(/^[-*•]\s+/, ""));
      continue;
    }

    // 5. 检查有序列表 (1. , 2. )
    if (/^\d+\.\s+/.test(line)) {
      flushTable();
      flushBlockquote();
      if (inList && listType !== "ol") {
        flushList();
      }
      inList = true;
      listType = "ol";
      listItems.push(line.replace(/^\d+\.\s+/, ""));
      continue;
    }

    // 6. 普通段落
    flushAll();
    htmlOut.push(`<p>${renderInlineMarkdown(line)}</p>`);
  }

  flushAll();
  return htmlOut.join("\n");
}
