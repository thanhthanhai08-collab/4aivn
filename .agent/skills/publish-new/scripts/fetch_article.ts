/**
 * Bước 1: Fetch 1 bài từ URL
 * Usage: npx tsx .agent/skill/publish-new/scripts/fetch_article.ts --url "https://..."
 */
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const urlIdx = args.indexOf('--url');
const url = urlIdx !== -1 ? args[urlIdx + 1] : '';

if (!url) {
  console.error('❌ Thiếu --url.');
  process.exit(1);
}

function createSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 80) || 'unknown-article';
}

async function main() {
  console.log(`📡 Fetching: ${url}`);
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    const cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Unknown Title';
    const slug = createSlug(title);

    const outDir = path.resolve(process.cwd(), `news-data/${slug}`);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const crawlData = {
      source: url,
      title,
      rawContent: cleanText.substring(0, 15000),
      crawledAt: new Date().toISOString()
    };

    const outPath = path.join(outDir, 'crawl.json');
    fs.writeFileSync(outPath, JSON.stringify(crawlData, null, 2), 'utf-8');
    
    console.log(`✅ Saved: ${outPath}`);
    console.log(`Tiếp theo: npx tsx .agent/skill/publish-new/scripts/analyze.ts --slug "${slug}"`);
  } catch (e: any) {
    console.error(`❌ Lỗi: ${e.message}`);
    process.exit(1);
  }
}

main();
