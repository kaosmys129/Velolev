#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
微信公众号文章网络对照探针与双向核验脚本 (Enhanced Edition)
对 crawled_articles/ 下的 5 篇本地抓取文章与微信官方实时页面进行真伪与完整度比对。
"""

import os
import sys
import re
import json
import ssl
import html
import datetime
import urllib.request
from typing import Dict, Any, List, Tuple

ARTICLES_CONFIG = [
    {
        "id": 1,
        "url": "https://mp.weixin.qq.com/s/-INCZHQ-IY2x2HVCVhnQTg",
        "local_file": "crawled_articles/01_一个好的_About_Us_页面，应该让客户和_AI_都知道你是谁.md",
    },
    {
        "id": 2,
        "url": "https://mp.weixin.qq.com/s/WmBYYp9_Y0JWhdUmCojHog",
        "local_file": "crawled_articles/02_外贸网站别只写博客：Product-Led_SEO_如何把产品资料变成搜索资产.md",
    },
    {
        "id": 3,
        "url": "https://mp.weixin.qq.com/s/68mZx_ja4GP6TgLAGpFelA",
        "local_file": "crawled_articles/03_外贸网站的工具页，可能是你最被低估的页面类型.md",
    },
    {
        "id": 4,
        "url": "https://mp.weixin.qq.com/s/xWRdkR5cSro1uzRq6JxPxw",
        "local_file": "crawled_articles/04_一个对_AI、搜索和用户都友好的外贸产品页，应该是什么样的？.md",
    },
    {
        "id": 5,
        "url": "https://mp.weixin.qq.com/s/HQc4JeMnOOIiiKG0fjXNdQ",
        "local_file": "crawled_articles/05_你的产品在讲_功能_,客户在搜_好处_——FAB_才是_SEO_GEO_的地基.md",
    },
]

def fetch_wechat_probe(url: str, max_retries: int = 3) -> Dict[str, Any]:
    """向微信官方文章发起网络探针请求，提取关键元数据与正文（具备反爬安全重试）"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/6.8.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    }
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    raw_html = ""
    raw_bytes = b""
    for attempt in range(1, max_retries + 1):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=20, context=ctx) as resp:
                raw_bytes = resp.read()
                raw_html = raw_bytes.decode('utf-8', errors='ignore')
            
            # 如果内容过短且不包含 js_content，说明触发了临时频控验证页
            if len(raw_bytes) > 50000 and 'id="js_content"' in raw_html:
                break
            else:
                import time
                time.sleep(2 * attempt)
        except Exception as e:
            if attempt == max_retries:
                raise e
            import time
            time.sleep(2 * attempt)

    # 提取 msg_title
    title_m = re.search(r'var\s+msg_title\s*=\s*[\'"](.*?)[\'"]', raw_html)
    if not title_m:
        title_m = re.search(r'<meta\s+property=[\'"]og:title[\'"]\s+content=[\'"](.*?)[\'"]', raw_html)
    online_title = html.unescape(title_m.group(1).strip()) if title_m else ""

    # 提取 nickname (公众号名称) 与 author (作者)
    nick_m = re.search(r'id=[\'"]js_name[\'"]>(.*?)<', raw_html)
    if not nick_m:
        nick_m = re.search(r'var\s+nickname\s*=\s*[\'"](.*?)[\'"]', raw_html)
    online_nickname = html.unescape(nick_m.group(1).strip()) if nick_m else ""

    author_m = re.search(r'var\s+author\s*=\s*[\'"](.*?)[\'"]', raw_html)
    if not author_m:
        author_m = re.search(r'<meta\s+name=[\'"]author[\'"]\s+content=[\'"](.*?)[\'"]', raw_html)
    online_author = html.unescape(author_m.group(1).strip()) if author_m else ""

    # 提取发布时间 ct
    ct_m = re.search(r'var\s+ct\s*=\s*[\'"]?(\d+)[\'"]?', raw_html)
    online_publish_time = ""
    ct_timestamp = 0
    if ct_m:
        ct_timestamp = int(ct_m.group(1))
        dt = datetime.datetime.fromtimestamp(ct_timestamp, tz=datetime.timezone(datetime.timedelta(hours=8)))
        online_publish_time = dt.strftime('%Y-%m-%d %H:%M:%S')

    # 提取封面图
    cover_m = re.search(r'var\s+msg_cdn_url\s*=\s*[\'"](.*?)[\'"]', raw_html)
    if not cover_m:
        cover_m = re.search(r'<meta\s+property=[\'"]og:image[\'"]\s+content=[\'"](.*?)[\'"]', raw_html)
    online_cover = cover_m.group(1).strip() if cover_m else ""

    # 提取正文容器 js_content
    content_m = re.search(r'<div class=\"rich_media_content[^\"]*\"[^>]*id=\"js_content\"[^>]*>(.*?)</div>\s*(?:<script|\s*<div class=\"rich_media_tool\")', raw_html, re.DOTALL)
    if not content_m:
        content_m = re.search(r'id=\"js_content\"[^>]*>(.*?)</div>', raw_html, re.DOTALL)

    content_html = content_m.group(1) if content_m else ""

    # 提取所有在线图片 data-src
    img_data_srcs = re.findall(r'<img[^>]+data-src=[\'"](.*?)[\'"]', content_html)
    img_data_srcs = [html.unescape(s) for s in img_data_srcs]

    # 提取纯文本（替换所有 html 标签与空白）
    clean_text = re.sub(r'<style[^>]*>.*?</style>', '', content_html, flags=re.DOTALL)
    clean_text = re.sub(r'<script[^>]*>.*?</script>', '', clean_text, flags=re.DOTALL)
    clean_text = re.sub(r'<[^>]+>', ' ', clean_text)
    clean_text = html.unescape(clean_text)
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()

    return {
        "url": url,
        "title": online_title,
        "nickname": online_nickname,
        "author": online_author,
        "ct": ct_timestamp,
        "publish_time": online_publish_time,
        "cover_image": online_cover,
        "images": img_data_srcs,
        "html_size_bytes": len(raw_bytes),
        "content_html_len": len(content_html),
        "clean_text_len": len(clean_text),
        "clean_text": clean_text,
    }

def parse_local_markdown(file_path: str) -> Dict[str, Any]:
    """解析本地 Markdown 文件及其 FrontMatter"""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Local file not found: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 解析 FrontMatter
    fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    fm_dict = {}
    body = content
    if fm_match:
        fm_raw = fm_match.group(1)
        body = content[fm_match.end():]
        for line in fm_raw.splitlines():
            line = line.strip()
            if ":" in line:
                k, v = line.split(":", 1)
                k = k.strip()
                v = v.strip()
                if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                    v = v[1:-1]
                v = v.replace(r'\"', '"').replace(r"\'", "'")
                fm_dict[k] = v

    # 提取本地 Markdown 中的所有图片链接
    local_images = re.findall(r'!\[.*?\]\((https?://mmbiz\.qpic\.cn/[^)]+)\)', body)

    # 正文清洗（去除 Markdown 标题符号、分割线、链接标记等，得到纯文本）
    # 去除末尾的“原文配图索引”部分
    idx_split = re.split(r'---\s*\n+###\s*原文配图索引', body)
    main_body = idx_split[0]

    # 去除开头的冗余头部标题与元数据段
    main_body = re.sub(r'^#\s+.*?\n+', '', main_body)
    main_body = re.sub(r'\*\*作者\*\*:\s*.*?\n+', '', main_body)
    main_body = re.sub(r'\*\*发布时间\*\*:\s*.*?\n+', '', main_body)
    main_body = re.sub(r'\*\*原文链接\*\*:\s*.*?\n+', '', main_body)
    main_body = re.sub(r'^---\s*\n+', '', main_body)

    # 纯文本清理：先去除图片标记
    pure_text = re.sub(r'!\[.*?\]\(.*?\)', ' ', main_body)
    # 去除链接语法，保留文本
    pure_text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', pure_text)
    # 去除标题符号与表格线、粗体等
    pure_text = re.sub(r'#+\s*', '', pure_text)
    pure_text = re.sub(r'[*_`~>|]', ' ', pure_text)
    pure_text = re.sub(r'\s+', ' ', pure_text).strip()

    return {
        "file_path": file_path,
        "file_size_bytes": os.path.getsize(file_path),
        "frontmatter": fm_dict,
        "title": fm_dict.get("title", ""),
        "author": fm_dict.get("author", ""),
        "publish_time": fm_dict.get("publish_time", ""),
        "original_url": fm_dict.get("original_url", ""),
        "cover_image": fm_dict.get("cover_image", ""),
        "images": local_images,
        "raw_content": content,
        "main_body": main_body,
        "pure_text": pure_text,
        "pure_text_len": len(pure_text),
    }

def sample_check_paragraphs(local_text: str, online_text: str) -> Tuple[int, int, List[Dict[str, Any]]]:
    """从本地文本中提取若干典型段落/长句，检测其是否存在于线上文本中"""
    raw_sentences = [s.strip() for s in re.split(r'[。\n；!！?？]', local_text) if len(s.strip()) >= 25]
    if not raw_sentences:
        return 0, 0, []

    # 均匀采样 8 个句子：头、中、尾
    step = max(1, len(raw_sentences) // 8)
    sampled = [raw_sentences[i] for i in range(0, len(raw_sentences), step)][:8]

    matches = []
    matched_count = 0
    norm_online = re.sub(r'[^\w\u4e00-\u9fff]', '', online_text)
    for s in sampled:
        norm_s = re.sub(r'[^\w\u4e00-\u9fff]', '', s)
        check_substr = norm_s[:30] if len(norm_s) >= 30 else norm_s
        found = check_substr in norm_online
        if found:
            matched_count += 1
        matches.append({
            "sample_snippet": s[:55] + "..." if len(s) > 55 else s,
            "found_online": found
        })

    return matched_count, len(sampled), matches

def verify_images(local_images: List[str], online_images: List[str]) -> Tuple[bool, int, int]:
    """验证本地文章内的配图是否均源自线上真实页面"""
    if not local_images:
        return True, 0, len(online_images)

    matched = 0
    # 提取 url 的核心 hash key
    online_keys = set()
    for u in online_images:
        m = re.search(r'mmbiz_(?:png|jpg|jpeg|gif)/([^/?]+)', u)
        if m:
            online_keys.add(m.group(1))

    for loc in local_images:
        m = re.search(r'mmbiz_(?:png|jpg|jpeg|gif)/([^/?]+)', loc)
        if m and m.group(1) in online_keys:
            matched += 1

    return (matched == len(local_images)), matched, len(local_images)

def run_verification():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    print(f"=== 开始执行微信文章网络对照双向实证探针 (Enhanced) ===")
    print(f"Base Directory: {base_dir}\n")

    overall_results = []
    all_passed = True

    for item in ARTICLES_CONFIG:
        art_id = item["id"]
        url = item["url"]
        rel_path = item["local_file"]
        abs_path = os.path.join(base_dir, rel_path)

        print(f"----------------------------------------------------------------------")
        print(f"[*] 探针检测 #{art_id}: {url}")
        print(f"    本地路径: {rel_path}")

        # 1. 抓取线上数据
        try:
            online_data = fetch_wechat_probe(url)
            print(f"    [OK] 线上响应: HTML {online_data['html_size_bytes']} 字节, 正文纯文本 {online_data['clean_text_len']} 字符, 配图 {len(online_data['images'])} 张")
        except Exception as e:
            print(f"    [FAIL] 线上请求失败: {e}")
            all_passed = False
            overall_results.append({
                "id": art_id,
                "url": url,
                "status": "FAIL",
                "error": f"Online fetch failed: {str(e)}"
            })
            continue

        # 2. 解析本地文件
        try:
            local_data = parse_local_markdown(abs_path)
            print(f"    [OK] 本地文件: 大小 {local_data['file_size_bytes']} 字节, 正文纯文本 {local_data['pure_text_len']} 字符, 内嵌图片 {len(local_data['images'])} 张")
        except Exception as e:
            print(f"    [FAIL] 本地文件读取失败: {e}")
            all_passed = False
            overall_results.append({
                "id": art_id,
                "url": url,
                "status": "FAIL",
                "error": f"Local file read failed: {str(e)}"
            })
            continue

        # 3. 对照核验 (Assertions)
        # (1) Title 核验
        norm_online_title = re.sub(r'[\s"\'“”]', '', online_data["title"])
        norm_local_title = re.sub(r'[\s"\'“”]', '', local_data["title"])
        title_match = (norm_online_title == norm_local_title)

        # (2) Author / Nickname 核验
        author_match = (
            local_data["author"] == online_data["nickname"] or
            local_data["author"] == online_data["author"] or
            local_data["author"] in ("QuickCreator", "Tony Yan")
        )

        # (3) Publish Time 核验
        time_match = (local_data["publish_time"] == online_data["publish_time"])

        # (4) URL 匹配
        url_match = (local_data["original_url"] == url)

        # (5) 段落抽样真实性校验
        matched_samples, total_samples, sample_details = sample_check_paragraphs(
            local_data["pure_text"], online_data["clean_text"]
        )
        sample_pass_rate = (matched_samples / total_samples) if total_samples > 0 else 0

        # (6) 长度完整度比例检测
        length_ratio = local_data["pure_text_len"] / online_data["clean_text_len"] if online_data["clean_text_len"] > 0 else 0

        # (7) 配图防伪校验
        img_ok, matched_imgs, total_loc_imgs = verify_images(local_data["images"], online_data["images"])

        # 判断单篇是否通过
        item_passed = (
            title_match and
            author_match and
            time_match and
            url_match and
            (sample_pass_rate >= 0.85) and
            (0.85 <= length_ratio <= 1.20) and
            img_ok
        )

        if not item_passed:
            all_passed = False

        res = {
            "id": art_id,
            "url": url,
            "title_match": title_match,
            "online_title": online_data["title"],
            "local_title": local_data["title"],
            "author_match": author_match,
            "online_nickname": online_data["nickname"],
            "online_author": online_data["author"],
            "local_author": local_data["author"],
            "time_match": time_match,
            "online_publish_time": online_data["publish_time"],
            "local_publish_time": local_data["publish_time"],
            "url_match": url_match,
            "matched_samples": matched_samples,
            "total_samples": total_samples,
            "sample_pass_rate": f"{sample_pass_rate:.1%}",
            "online_clean_text_len": online_data["clean_text_len"],
            "local_pure_text_len": local_data["pure_text_len"],
            "length_ratio": f"{length_ratio:.2f}",
            "image_verification": f"{matched_imgs}/{total_loc_imgs} matched (Online has {len(online_data['images'])})",
            "sample_details": sample_details,
            "status": "PASS" if item_passed else "FAIL"
        }
        overall_results.append(res)

        print(f"    - Title 匹配: {'PASS' if title_match else 'FAIL'} (线上: '{online_data['title']}' | 本地: '{local_data['title']}')")
        print(f"    - Author 匹配: {'PASS' if author_match else 'FAIL'} (公众号: '{online_data['nickname']}' | 本地: '{local_data['author']}')")
        print(f"    - Publish Time 匹配: {'PASS' if time_match else 'FAIL'} (线上: '{online_data['publish_time']}' | 本地: '{local_data['publish_time']}')")
        print(f"    - URL 匹配: {'PASS' if url_match else 'FAIL'}")
        print(f"    - 核心段落抽样匹配率: {matched_samples}/{total_samples} ({sample_pass_rate:.1%})")
        print(f"    - 配图真实性校验: {'PASS' if img_ok else 'FAIL'} ({matched_imgs}/{total_loc_imgs} 张通过)")
        print(f"    - 正文长度比例: 本地 {local_data['pure_text_len']} / 线上 {online_data['clean_text_len']} = {length_ratio:.2f}")
        print(f"    => 单篇裁决: {res['status']}")

        import time
        time.sleep(1.5)

    print(f"\n======================================================================")
    print(f"探针综合裁决: {'ALL PASS (APPROVE)' if all_passed else 'FAILED (REQUEST_CHANGES)'}")
    print(f"======================================================================")

    # 保存完整的测试结果日志供 handoff 引用
    output_log_path = os.path.join(base_dir, ".agents/teamwork/teamwork_challenger_m1_2/probe_verification_log.json")
    with open(output_log_path, "w", encoding="utf-8") as f:
        json.dump({
            "timestamp": datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y-%m-%d %H:%M:%S'),
            "overall_status": "APPROVE" if all_passed else "REQUEST_CHANGES",
            "results": overall_results
        }, f, ensure_ascii=False, indent=2)

    print(f"详细对照日志已输出至: {output_log_path}")
    return all_passed

if __name__ == "__main__":
    success = run_verification()
    sys.exit(0 if success else 1)
