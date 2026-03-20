/**
 * Bước 1: Crawl RSS & Lọc bài AI
 * Không gọi LLM → 0 token
 */
import * as fs from 'fs';
import * as path from 'path';

interface RssSource {
  name: string;
  rssUrl: string;
  language: string;
}

interface Article {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
}

// Load cấu hình
const configPath = path.resolve(__dirname, '../resources/rss_sources.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const sources: RssSource[] = config.sources;
const keywords: string[] = config.filterKeywords;

/**
 * Parse RSS XML thô — không dùng thư viện nặng
 */
function parseRssItems(xml: string): Array<{title: string; link: string; pubDate: string; description: string}> {
  const items: Array<{title: string; link: string; pubDate: string; description: string}> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag: string) => {
      const m = block.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?<\\/${tag}>`, 's'));
      return m ? m[1].trim() : '';
    };
    items.push({
      title: get('title'),
      link: get('link') || get('guid'),
      pubDate: get('pubDate') || get('dc:date') || '',
      description: get('description')
    });
  }
  return items;
}

/**
 * Parse Atom XML (The Verge dùng Atom)
 */
function parseAtomEntries(xml: string): Array<{title: string; link: string; pubDate: string; description: string}> {
  const items: Array<{title: string; link: string; pubDate: string; description: string}> = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const titleMatch = block.match(/<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s);
    const linkMatch = block.match(/<link[^>]*href="([^"]*)"[^>]*\/?>/) || block.match(/<link[^>]*>([^<]*)<\/link>/);
    const dateMatch = block.match(/<published>([^<]*)<\/published>/) || block.match(/<updated>([^<]*)<\/updated>/);
    const summaryMatch = block.match(/<summary[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/summary>/s)
      || block.match(/<content[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content>/s);

    items.push({
      title: titleMatch ? titleMatch[1].trim() : '',
      link: linkMatch ? linkMatch[1].trim() : '',
      pubDate: dateMatch ? dateMatch[1].trim() : '',
      description: summaryMatch ? summaryMatch[1].trim().replace(/<[^>]*>/g, '') : ''
    });
  }
  return items;
}

/**
 * Lọc bài liên quan AI bằng keyword matching
 */
function isAiRelated(article: {title: string; description: string}): boolean {
  const text = `${article.title} ${article.description}`.toLowerCase();
  return keywords.some(kw => text.includes(kw.toLowerCase()));
}

async function main() {
  console.log('🔍 Bắt đầu crawl RSS...\n');
  const allArticles: Article[] = [];

  for (const src of sources) {
    try {
      console.log(`📡 Fetching: ${src.name} (${src.rssUrl})`);
      const res = await fetch(src.rssUrl);
      const xml = await res.text();

      // Detect Atom vs RSS
      const isAtom = xml.includes('<feed') && xml.includes('<entry');
      const items = isAtom ? parseAtomEntries(xml) : parseRssItems(xml);

      const filtered = items
        .filter(isAiRelated)
        .map(item => ({
          ...item,
          source: src.name
        }));

      allArticles.push(...filtered);
      console.log(`   ✅ ${items.length} bài → ${filtered.length} bài liên quan AI`);
    } catch (err: any) {
      console.error(`   ❌ Lỗi ${src.name}: ${err.message}`);
    }
  }

  // Sắp xếp theo ngày mới nhất
  allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Output
  console.log(`\n📋 Tổng cộng: ${allArticles.length} bài AI\n`);
  console.log('─'.repeat(60));
  allArticles.slice(0, 15).forEach((a, i) => {
    console.log(`${i + 1}. [${a.source}] ${a.title}`);
    console.log(`   ${a.link}`);
    console.log(`   ${a.pubDate}\n`);
  });

  // Lưu kết quả
  const outDir = path.resolve(process.cwd(), 'news-data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, '_crawl_results.json');
  fs.writeFileSync(outPath, JSON.stringify(allArticles, null, 2), 'utf-8');
  console.log(`\n💾 Đã lưu kết quả vào: ${outPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
