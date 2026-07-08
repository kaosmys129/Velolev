import { readdirSync, statSync, renameSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(here);
const publicDir = join(projectRoot, 'public');
const fragmentsDir = join(projectRoot, 'src', 'fragments');

// 1. 递归清洗 public 目录下的文件名
function renameFilesRecursively(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      renameFilesRecursively(fullPath);
    } else {
      if (entry.includes('?') || entry.includes('%3F')) {
        const newName = entry.split(/\?|%3F/)[0];
        const newPath = join(dir, newName);
        console.log(`Renaming: ${entry} -> ${newName}`);
        try {
          renameSync(fullPath, newPath);
        } catch (err) {
          console.error(`Failed to rename ${fullPath}:`, err.message);
        }
      }
    }
  }
}

// 2. 递归清洗 HTML 片段内容
function sanitizeHtmlFiles(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      sanitizeHtmlFiles(fullPath);
    } else if (entry.endsWith('.html')) {
      let content = readFileSync(fullPath, 'utf-8');
      const original = content;
      
      content = content.replace(
        /(\.(?:css|js|png|jpg|jpeg|gif|woff|woff2|svg))(%3F|\?)[^"'()\s>]+/g,
        '$1'
      );
      
      if (content !== original) {
        console.log(`Sanitized links in: ${fullPath}`);
        writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }
}

console.log('Starting assets and links sanitation...');
renameFilesRecursively(publicDir);
sanitizeHtmlFiles(fragmentsDir);
console.log('Sanitation completed successfully!');
