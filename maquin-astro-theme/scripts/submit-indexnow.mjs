import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { publicOrigin } from "../src/lib/site-config.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const KEY_PATTERN = /^[a-f0-9]{32}$/;

/**
 * 解析命令行参数，支持 `--dry-run`、`--key=<32位十六进制>`、`--urls=<逗号分隔>` 与 `--dist=<目录>`。
 */
function parseArgs(argv) {
  const dryRun = argv.includes("--dry-run");
  const keyArg = argv.find((arg) => arg.startsWith("--key="))?.slice(6)?.trim() || "";
  const urlsArg = argv.find((arg) => arg.startsWith("--urls="))?.slice(7)?.trim() || "";
  const distArg = argv.find((arg) => arg.startsWith("--dist="))?.slice(7)?.trim() || "";
  return {
    dryRun,
    keyArg,
    urlsArg,
    distDir: distArg ? resolve(distArg) : join(root, "dist"),
  };
}

/**
 * 在 public 目录查找或校验 32 位小写十六进制 IndexNow 密钥文件，确保密钥文件真实可公开访问。
 */
function resolveIndexNowKey(publicDir, explicitKey) {
  if (explicitKey) {
    if (!KEY_PATTERN.test(explicitKey)) {
      throw new Error(`无效的 IndexNow 密钥格式（需为 32 位小写十六进制字符）：${explicitKey}`);
    }
    const keyFile = join(publicDir, `${explicitKey}.txt`);
    if (!existsSync(keyFile)) {
      throw new Error(`缺少对应的密钥验证文件：${keyFile}`);
    }
    const fileContent = readFileSync(keyFile, "utf8").trim();
    if (fileContent !== explicitKey) {
      throw new Error(`密钥文件内容与文件名不一致：${keyFile}`);
    }
    return explicitKey;
  }

  const candidates = readdirSync(publicDir).filter((name) => /^([a-f0-9]{32})\.txt$/.test(name));
  if (candidates.length === 0) {
    throw new Error(`未在 ${publicDir} 找到 IndexNow 密钥文件（<32位十六进制>.txt）。`);
  }
  if (candidates.length > 1) {
    throw new Error(`找到多个 IndexNow 密钥文件，请通过 --key= 显式指定：${candidates.join(", ")}`);
  }
  const key = candidates[0].replace(/\.txt$/, "");
  const fileContent = readFileSync(join(publicDir, candidates[0]), "utf8").trim();
  if (fileContent !== key) {
    throw new Error(`密钥文件内容与文件名不一致：${candidates[0]}`);
  }
  return key;
}

/**
 * 从命令行 `--urls` 参数或已构建的 `dist/sitemap-*.xml` 提取待提交的规范 URL 列表。
 */
function collectUrls(origin, distDir, urlsArg) {
  let rawUrls = [];
  if (urlsArg) {
    rawUrls = urlsArg
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  } else {
    if (!existsSync(distDir)) {
      throw new Error(`构建目录不存在，请先执行 npm run build 或传入 --urls：${distDir}`);
    }
    const sitemaps = readdirSync(distDir)
      .filter((name) => /^sitemap-\d+\.xml$/.test(name))
      .sort();
    if (sitemaps.length === 0) {
      throw new Error(`在 ${distDir} 未找到 sitemap-0.xml 等站点地图分片，请先以已配置正式域名完成构建。`);
    }
    for (const file of sitemaps) {
      const xml = readFileSync(join(distDir, file), "utf8");
      for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
        const loc = match[1]?.trim();
        if (loc) rawUrls.push(loc);
      }
    }
  }

  const originHost = new URL(origin).host;
  const uniqueUrls = [...new Set(rawUrls)];
  if (uniqueUrls.length === 0) {
    throw new Error("未收集到任何可提交的 URL。");
  }
  for (const url of uniqueUrls) {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.host !== originHost) {
      throw new Error(`URL 与目标站点域名 ${origin} 不匹配：${url}`);
    }
  }
  return uniqueUrls;
}

/**
 * 主执行入口：校验配置、组装 IndexNow Payload，并在非演练模式下批量 POST 至 IndexNow 官方接口。
 */
async function main() {
  const { dryRun, keyArg, urlsArg, distDir } = parseArgs(process.argv.slice(2));
  const origin = publicOrigin();
  if (!origin) {
    throw new Error("正式站点域名尚未配置（content-baseline.json / PUBLIC_SITE_URL），无法提交 IndexNow。");
  }
  const host = new URL(origin).host;
  const key = resolveIndexNowKey(join(root, "public"), keyArg);
  const keyLocation = `${origin}/${key}.txt`;
  const urlList = collectUrls(origin, distDir, urlsArg);

  // IndexNow 单次请求上限为 10,000 条 URL，按上限切片提交
  const batchSize = 10000;
  const batches = [];
  for (let i = 0; i < urlList.length; i += batchSize) {
    batches.push(urlList.slice(i, i + batchSize));
  }

  if (dryRun) {
    console.log(
      JSON.stringify(
        {
          mode: "dry-run",
          endpoint: "https://api.indexnow.org/indexnow",
          host,
          key,
          keyLocation,
          totalUrls: urlList.length,
          batches: batches.length,
          sampleUrls: urlList.slice(0, 10),
        },
        null,
        2,
      ),
    );
    return;
  }

  for (let index = 0; index < batches.length; index++) {
    const payload = {
      host,
      key,
      keyLocation,
      urlList: batches[index],
    };
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`IndexNow 提交失败（批次 ${index + 1}/${batches.length}，HTTP ${response.status}）：${text}`);
    }
    console.log(
      JSON.stringify({
        batch: index + 1,
        totalBatches: batches.length,
        submittedUrls: batches[index].length,
        status: response.status,
      }),
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
