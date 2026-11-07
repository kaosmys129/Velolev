#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Milestone 1 实证挑战者校验脚本 (Empirical Challenger Test Suite)
作者: teamwork_challenger_m1_1
用途: 对 crawled_articles/ 下 5 篇微信公众号文章 Markdown 进行严苛的结构完整性、字符阈值与格式压力断言。
"""

import os
import sys
import glob
import re
import yaml
import hashlib
import urllib.request
import ssl
from typing import List, Dict, Tuple, Any

# 原始需求定义的 5 篇目标微信公众号 URL
EXPECTED_URLS = [
    "https://mp.weixin.qq.com/s/-INCZHQ-IY2x2HVCVhnQTg",
    "https://mp.weixin.qq.com/s/WmBYYp9_Y0JWhdUmCojHog",
    "https://mp.weixin.qq.com/s/68mZx_ja4GP6TgLAGpFelA",
    "https://mp.weixin.qq.com/s/xWRdkR5cSro1uzRq6JxPxw",
    "https://mp.weixin.qq.com/s/HQc4JeMnOOIiiKG0fjXNdQ"
]

ANTI_CRAWLER_KEYWORDS = [
    "验证码",
    "访问过于频繁",
    "环境异常",
    "无法访问",
    "请在微信客户端打开",
    "当前网页可能存在未经审核的内容",
    "系统检测到",
    "操作超时",
    "参数错误"
]


class ChallengerTestSuite:
    """实证挑战者测试套件"""

    def __init__(self, target_dir: str):
        self.target_dir = os.path.abspath(target_dir)
        self.files: List[str] = sorted(glob.glob(os.path.join(self.target_dir, "*.md")))
        self.ssl_ctx = ssl._create_unverified_context()
        self.http_headers = {"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)"}
        self.results: Dict[str, bool] = {}
        self.logs: List[str] = []

    def log(self, message: str):
        """记录测试日志"""
        print(message)
        self.logs.append(message)

    def test_01_file_count_and_identity(self) -> bool:
        """测试 1: 验证 Markdown 文件数量恰好为 5，且文件名与哈希完全独立"""
        self.log("\n[TEST 01] 验证文件存在性、数量与哈希唯一性...")
        if len(self.files) != 5:
            self.log(f"[-] 失败: 预期存在 5 个 Markdown 文件，实际发现 {len(self.files)} 个")
            return False

        hashes = {}
        for idx, file_path in enumerate(self.files):
            file_name = os.path.basename(file_path)
            with open(file_path, "rb") as fp:
                file_hash = hashlib.sha256(fp.read()).hexdigest()
            if file_hash in hashes:
                self.log(f"[-] 失败: 发现重复文件内容: {file_name} 与 {hashes[file_hash]}")
                return False
            hashes[file_hash] = file_name
            self.log(f"  [+] 文件 {idx + 1}: {file_name} (SHA-256: {file_hash[:16]}...)")

        self.log("[+] 测试 01 通过: 恰好存在 5 个独立且无重复的 Markdown 文件")
        return True

    def test_02_yaml_frontmatter_schema(self) -> bool:
        """测试 2: 验证 YAML FrontMatter 结构、字段完备性与原始 URL 精准匹配"""
        self.log("\n[TEST 02] 验证 YAML FrontMatter 完备性与 URL 契约...")
        required_fields = ["title", "author", "publish_time", "original_url"]

        for idx, file_path in enumerate(self.files):
            file_name = os.path.basename(file_path)
            with open(file_path, "r", encoding="utf-8") as fp:
                content = fp.read()

            if not content.startswith("---\n"):
                self.log(f"[-] 失败: 文件 {file_name} 未以 '---\\n' 起始")
                return False

            parts = content.split("---", 2)
            if len(parts) < 3:
                self.log(f"[-] 失败: 文件 {file_name} YAML 分界符不完整")
                return False

            try:
                fm = yaml.safe_load(parts[1])
            except Exception as e:
                self.log(f"[-] 失败: 文件 {file_name} YAML 解析异常: {e}")
                return False

            for field in required_fields:
                if field not in fm or not str(fm[field]).strip():
                    self.log(f"[-] 失败: 文件 {file_name} 缺失必填字段: {field}")
                    return False

            # 验证 URL 精准匹配
            expected_url = EXPECTED_URLS[idx]
            actual_url = fm["original_url"]
            if actual_url != expected_url:
                self.log(f"[-] 失败: 文件 {file_name} URL 契约不匹配 (预期: {expected_url}, 实际: {actual_url})")
                return False

            # 验证发布时间格式 (YYYY-MM-DD HH:MM:SS)
            pub_time = str(fm["publish_time"])
            if not re.match(r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$", pub_time):
                self.log(f"[-] 失败: 文件 {file_name} 发布时间格式不符合规范: {pub_time}")
                return False

            self.log(f"  [+] 文件 {idx + 1} ({file_name}): 字段完备, 标题='{fm['title'][:20]}...', 发布时间='{pub_time}'")

        self.log("[+] 测试 02 通过: 所有文件 FrontMatter 均完备合法且与需求 URL 精准契合")
        return True

    def test_03_character_threshold_and_integrity(self) -> bool:
        """测试 3: 严格字符阈值 (>5000) 与反爬截断检测"""
        self.log("\n[TEST 03] 验证字符长度阈值 (>5000 字符) 及反爬截断特征...")
        for idx, file_path in enumerate(self.files):
            file_name = os.path.basename(file_path)
            with open(file_path, "r", encoding="utf-8") as fp:
                content = fp.read()

            char_len = len(content)
            strip_ws_len = len("".join(content.split()))
            lines_len = len(content.splitlines())

            self.log(f"  [+] 文件 {idx + 1} ({file_name}): 字符数={char_len}, 去空白字符数={strip_ws_len}, 总行数={lines_len}")

            # 硬断言：严格大于 5000 字符
            if char_len <= 5000:
                self.log(f"[-] 失败: 文件 {file_name} 字符数不足 ({char_len} <= 5000)")
                return False

            # 反爬特征词检索
            for kw in ANTI_CRAWLER_KEYWORDS:
                if kw in content:
                    self.log(f"[-] 失败: 文件 {file_name} 包含反爬/风控拦截特征词: '{kw}'")
                    return False

            # 乱码与控制字符检测
            if "\ufffd" in content:
                self.log(f"[-] 失败: 文件 {file_name} 存在 Unicode 替换乱码字符 '\\ufffd'")
                return False
            if "\x00" in content:
                self.log(f"[-] 失败: 文件 {file_name} 存在二进制空字节 '\\x00'")
                return False

        self.log("[+] 测试 03 通过: 所有文件均严格超过 5000 字符阈值且无反爬截断与乱码")
        return True

    def test_04_article_01_table_structure(self) -> bool:
        """测试 4: 验证文章 01 包含至少 4 个完整的 GFM 表格且列对齐规范"""
        self.log("\n[TEST 04] 验证文章 01 Markdown 表格结构与列对齐规范...")
        art1_path = self.files[0]
        with open(art1_path, "r", encoding="utf-8") as fp:
            lines = fp.readlines()

        tables: List[List[Tuple[int, str]]] = []
        current_table: List[Tuple[int, str]] = []
        in_table = False

        for l_idx, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith("|") and stripped.endswith("|"):
                if not in_table:
                    in_table = True
                    current_table = [(l_idx + 1, stripped)]
                else:
                    current_table.append((l_idx + 1, stripped))
            else:
                if in_table:
                    in_table = False
                    tables.append(current_table)
                    current_table = []
        if in_table:
            tables.append(current_table)

        self.log(f"  [+] 文章 01 检测到独立表格区块数量: {len(tables)}")
        if len(tables) < 4:
            self.log(f"[-] 失败: 文章 01 独立表格数不足 4 个 (实际: {len(tables)})")
            return False

        for t_idx, table in enumerate(tables):
            header_line_num, header = table[0]
            if len(table) < 3:
                self.log(f"[-] 失败: 表格 {t_idx + 1} 行数不足 (至少需表头、分隔线及数据行)")
                return False

            delim_line_num, delim = table[1]
            header_cols = [c.strip() for c in header.split("|")[1:-1]]
            delim_cols = [c.strip() for c in delim.split("|")[1:-1]]

            # 验证分隔线格式
            for dc in delim_cols:
                if not re.match(r"^:?-+:?$", dc):
                    self.log(f"[-] 失败: 表格 {t_idx + 1} 第 {delim_line_num} 行分隔线不规范: '{dc}'")
                    return False

            if len(delim_cols) != len(header_cols):
                self.log(f"[-] 失败: 表格 {t_idx + 1} 表头列数 ({len(header_cols)}) 与分隔线列数 ({len(delim_cols)}) 不匹配")
                return False

            # 验证每个数据行的列对齐
            for r_idx, (r_line_num, row) in enumerate(table[2:]):
                row_cols = [c.strip() for c in row.split("|")[1:-1]]
                if len(row_cols) != len(header_cols):
                    self.log(f"[-] 失败: 表格 {t_idx + 1} 第 {r_line_num} 行数据列数 ({len(row_cols)}) 与表头列数 ({len(header_cols)}) 不一致")
                    return False

            self.log(f"  [+] 表格 {t_idx + 1} (起始行 {header_line_num}, 数据行数 {len(table) - 2}): 列数={len(header_cols)}, 规范对齐通过")

        self.log("[+] 测试 04 通过: 文章 01 包含 4 个完整且严格列对齐的 GFM 表格")
        return True

    def test_05_article_05_inline_images(self) -> bool:
        """测试 5: 验证文章 05 包含至少 3 处原位图片标签，且微信 CDN URL 真实可达"""
        self.log("\n[TEST 05] 验证文章 05 原位图片标记与 CDN 连通性...")
        art5_path = self.files[4]
        with open(art5_path, "r", encoding="utf-8") as fp:
            content = fp.read()

        images = re.findall(r"!\[(.*?)\]\((.*?)\)", content)
        self.log(f"  [+] 文章 05 发现内嵌 Markdown 图片标记数: {len(images)}")

        if len(images) < 3:
            self.log(f"[-] 失败: 文章 05 原位配图数量不足 3 处 (实际: {len(images)})")
            return False

        # 检查 alt 属性与 URL 来源
        for idx, (alt, url) in enumerate(images):
            if alt != "配图":
                self.log(f"[-] 失败: 图片 {idx + 1} alt 描述不符合 '配图' 规范: '{alt}'")
                return False
            if not ("mmbiz.qpic.cn" in url or "weixin.qq.com" in url):
                self.log(f"[-] 失败: 图片 {idx + 1} URL 域名非微信官方 CDN: {url}")
                return False

            # 发起真实网络探测
            try:
                req = urllib.request.Request(url, headers=self.http_headers)
                with urllib.request.urlopen(req, context=self.ssl_ctx, timeout=10) as resp:
                    c_type = resp.headers.get("Content-Type", "")
                    c_len = resp.headers.get("Content-Length", "0")
                    if resp.status != 200 or not c_type.startswith("image/"):
                        self.log(f"[-] 失败: 图片 {idx + 1} 探测异常 HTTP {resp.status}, Content-Type: {c_type}")
                        return False
                    self.log(f"  [+] 图片 {idx + 1} 探测成功: HTTP {resp.status}, Content-Type: {c_type}, 大小: {c_len} 字节")
            except Exception as e:
                self.log(f"[-] 失败: 图片 {idx + 1} 网络探测失败: {e}")
                return False

        self.log("[+] 测试 05 通过: 文章 05 包含 3 处合法原位配图且 CDN 均真实可用")
        return True

    def test_06_html_entities_and_syntax_hygiene(self) -> bool:
        """测试 6: 检查未闭合 HTML 标签、未转义 HTML 实体及语法闭合度"""
        self.log("\n[TEST 06] 检查 HTML 标签残留、未转义实体与语法闭合度...")

        for idx, file_path in enumerate(self.files):
            file_name = os.path.basename(file_path)
            with open(file_path, "r", encoding="utf-8") as fp:
                content = fp.read()

            # 1. 检查是否存在 HTML 标签残留 (<tag ...> 或 </tag>)
            html_tags = re.findall(r"<(/?[a-zA-Z0-9]+)(\s[^>]*)?>", content)
            if html_tags:
                self.log(f"[-] 失败: 文件 {file_name} 存在未清洗的 HTML 标签: {set([t[0] for t in html_tags])}")
                return False

            # 2. 检查是否存在未转义的 HTML 实体 (&amp;, &lt;, &gt;, &quot;, &#xxx;)
            html_entities = re.findall(r"&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);", content)
            if html_entities:
                self.log(f"[-] 失败: 文件 {file_name} 存在未转义的 HTML 实体: {set(html_entities)}")
                return False

            # 3. 检查代码块标记闭合 (``` 必须成对出现)
            fence_count = content.count("```")
            if fence_count % 2 != 0:
                self.log(f"[-] 失败: 文件 {file_name} 代码块反引号未成对闭合 (数量: {fence_count})")
                return False

            # 4. 检查粗体加粗标记闭合 (** 必须成对出现)
            bold_lines_odd = [
                i + 1 for i, line in enumerate(content.splitlines())
                if line.count("**") % 2 != 0
            ]
            if bold_lines_odd:
                self.log(f"[-] 失败: 文件 {file_name} 存在未闭合的粗体标记，出现行号: {bold_lines_odd}")
                return False

            # 5. 检查方括号链接闭合 ([ 与 ] 数量必须平衡)
            for i, line in enumerate(content.splitlines()):
                if line.count("[") != line.count("]"):
                    self.log(f"[-] 失败: 文件 {file_name} 第 {i + 1} 行方括号不平衡: '{line.strip()}'")
                    return False

            self.log(f"  [+] 文件 {idx + 1} ({file_name}): 0 HTML残留, 0 未转义实体, 语法标记 100% 闭合")

        self.log("[+] 测试 06 通过: 所有文件语法卫生度完全达标，无 HTML 残留与标记失衡")
        return True

    def run_all(self) -> bool:
        """运行全部测试用例"""
        self.log("=" * 70)
        self.log("Milestone 1 实证挑战测试启动 (Empirical Challenger Test Suite)")
        self.log("目标目录: " + self.target_dir)
        self.log("=" * 70)

        tests = [
            ("TEST 01: 文件存在性、数量与哈希唯一性", self.test_01_file_count_and_identity),
            ("TEST 02: YAML FrontMatter 结构与契约", self.test_02_yaml_frontmatter_schema),
            ("TEST 03: 字符阈值 (>5000) 与反爬截断检测", self.test_03_character_threshold_and_integrity),
            ("TEST 04: 文章 01 GFM 表格与列对齐规范", self.test_04_article_01_table_structure),
            ("TEST 05: 文章 05 原位配图与 CDN 连通性", self.test_05_article_05_inline_images),
            ("TEST 06: HTML 标签实体残留与语法闭合度", self.test_06_html_entities_and_syntax_hygiene),
        ]

        all_passed = True
        for name, test_func in tests:
            passed = test_func()
            self.results[name] = passed
            if not passed:
                all_passed = False

        self.log("\n" + "=" * 70)
        self.log("测试结果汇总:")
        for name, passed in self.results.items():
            status = "PASSED [✓]" if passed else "FAILED [✗]"
            self.log(f"  {name.ljust(45)}: {status}")
        self.log("=" * 70)

        verdict = "APPROVE" if all_passed else "REQUEST_CHANGES"
        self.log(f"\n实证裁决结果 (FINAL VERDICT): {verdict}\n")
        return all_passed


if __name__ == "__main__":
    target_directory = sys.argv[1] if len(sys.argv) > 1 else "crawled_articles"
    suite = ChallengerTestSuite(target_directory)
    success = suite.run_all()
    sys.exit(0 if success else 1)
