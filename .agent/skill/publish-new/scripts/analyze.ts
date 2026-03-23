/**
 * Bước 2a: Deep Research, phân tích bài và fact check.
 * Usage: npx tsx .agent/skill/publish-new/scripts/analyze.ts --slug "slug"
 */
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const args = process.argv.slice(2);
const slugIdx = args.indexOf('--slug');
const slug = slugIdx !== -1 ? args[slugIdx + 1] : '';

if (!slug) {
  console.error('❌ Thiếu --slug.');
  process.exit(1);
}

const dirPath = path.resolve(process.cwd(), `news-data/${slug}`);
const crawlPath = path.join(dirPath, 'crawl.json');

if (!fs.existsSync(crawlPath)) {
  console.error(`❌ File crawl.json không tồn tại ở: ${crawlPath}`);
  process.exit(1);
}

const analyzeGuidePath = path.resolve(__dirname, '../resources/analyze.md');
const analyzeGuide = fs.existsSync(analyzeGuidePath) ? fs.readFileSync(analyzeGuidePath, 'utf-8') : 'Phân tích đa chiều.';

const OUTPUT_SCHEMA = {
  type: "object" as const,
  properties: {
    coreMessage: { type: "string" as const, description: "Thông điệp cốt lõi của bài báo" },
    perspectives: { type: "array" as const, items: { type: "string" as const }, description: "Các góc nhìn/insight sâu sắc" },
    facts: { type: "array" as const, items: { type: "string" as const }, description: "Sự kiện được kiểm chứng, số liệu" },
    keywords: { type: "array" as const, items: { type: "string" as const }, description: "Từ khóa chính nổi bật" }
  },
  required: ["coreMessage", "perspectives", "facts", "keywords"]
};

async function main() {
  console.log(`🧠 Đang phân tích deep research cho: ${slug}`);
  const crawlData = JSON.parse(fs.readFileSync(crawlPath, 'utf-8'));

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Thiếu GEMINI_API_KEY');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: OUTPUT_SCHEMA
    } as any
  });

  const prompt = `Yêu cầu Deep Research:
Nguồn: ${crawlData.source || 'RSS/Text'}
Nội dung thô: ${crawlData.rawContent || crawlData.description || 'Không có text, vui lòng trích thông điệp từ Title.'}

Hướng dẫn Phân tích: 
${analyzeGuide}

Nhiệm vụ:
1. Đọc và hiểu kỹ bài báo.
2. Kiểm tra các fact, luồng thông tin và xuất ra các sự kiện thực tế (facts).
3. Đưa ra các góc nhìn (perspectives) mới, đa chiều, khách quan.
4. Trích các từ khoá (keywords) chính.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const output = JSON.parse(text);

    const analyzeData = { ...output, source: crawlData.source };
    const outPath = path.join(dirPath, 'analyze.json');
    fs.writeFileSync(outPath, JSON.stringify(analyzeData, null, 2), 'utf-8');
    
    console.log(`✅ Đã lập analyze.json: ${outPath}`);
  } catch (e: any) {
    console.error(`❌ Lỗi: ${e.message}`);
    process.exit(1);
  }
}

main();
