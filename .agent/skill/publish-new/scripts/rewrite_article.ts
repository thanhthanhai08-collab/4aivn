/**
 * Bước 2+3: Sắp xếp keyword + Viết lại bài theo phong cách 4AIVN + Tạo image prompt
 * Gộp 1 lần gọi Gemini duy nhất → tiết kiệm token
 *
 * Usage: npx tsx .agent/skill/publish-new/scripts/rewrite_article.ts --url "https://..." --hint "mô tả ngắn"
 */
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Parse args
const args = process.argv.slice(2);
const urlIdx = args.indexOf('--url');
const hintIdx = args.indexOf('--hint');
const sourceUrl = urlIdx !== -1 ? args[urlIdx + 1] : '';
const hint = hintIdx !== -1 ? args[hintIdx + 1] : '';

if (!sourceUrl) {
  console.error('❌ Thiếu --url. Usage: npx tsx rewrite_article.ts --url "https://..." --hint "mô tả"');
  process.exit(1);
}

// Load style guide
const styleGuide = fs.readFileSync(
  path.resolve(__dirname, '../resources/writing_style_guide.md'), 'utf-8'
);

const OUTPUT_SCHEMA = {
  type: "object" as const,
  properties: {
    title: { type: "string" as const, description: "Tiêu đề bài viết tiếng Việt" },
    summary: { type: "string" as const, description: "Tóm tắt 1-2 câu, dưới 50 từ" },
    content: { type: "string" as const, description: "Nội dung HTML với h2, h3, p, ul" },
    tags: {
      type: "array" as const,
      items: { type: "string" as const },
      description: "5-8 từ khóa liên quan"
    },
    category: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          name: { type: "string" as const }
        },
        required: ["id", "name"]
      },
      description: "Danh mục bài viết"
    },
    imagePrompt: { type: "string" as const, description: "Prompt tiếng Anh để sinh ảnh bìa" }
  },
  required: ["title", "summary", "content", "tags", "category", "imagePrompt"]
};

async function main() {
  console.log('📝 Bắt đầu viết lại bài...');
  console.log(`   URL: ${sourceUrl}`);
  console.log(`   Hint: ${hint || '(không có)'}\n`);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Thiếu GEMINI_API_KEY trong .env.local');
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

  // Gộp tất cả vào 1 prompt duy nhất
  const prompt = `Bạn là nhà báo công nghệ AI tại 4AIVN.

NHIỆM VỤ (thực hiện tuần tự, trả về 1 JSON duy nhất):
1. Đọc bài gốc tại: ${sourceUrl}
2. Trích xuất từ khóa chính, sắp xếp theo độ quan trọng
3. Viết dàn ý 3-5 phần chính
4. Viết bài hoàn chỉnh theo phong cách dưới đây
5. Tạo image prompt (tiếng Anh) cho ảnh bìa

${hint ? `GỢI Ý NỘI DUNG: ${hint}` : ''}

PHONG CÁCH VIẾT:
${styleGuide}

YÊU CẦU:
- Tiêu đề giật gân nhưng chuyên nghiệp
- Content là HTML thuần (h2, h3, p, ul, li)
- 600-1000 từ
- Danh mục mặc định: [{id: "xu-huong", name: "Xu hướng"}]
- Tags: 5-8 từ khóa
- Image prompt: mô tả scene chi tiết, digital art style, không có text`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const output = JSON.parse(text);

    // Tạo slug từ title
    const slug = output.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 60);

    // Thêm metadata
    const fullOutput = {
      ...output,
      slug,
      source: sourceUrl,
      author: 'Nam',
      post: false,
      viewCount: 0,
      charts: [],
      imageUrl: `news-data/${slug}.webp`,
      publishedAt: new Date().toISOString()
    };

    // Lưu file
    const outDir = path.resolve(process.cwd(), 'news-data');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outPath = path.join(outDir, `${slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(fullOutput, null, 2), 'utf-8');

    console.log('✅ Hoàn tất!');
    console.log(`   Tiêu đề: ${output.title}`);
    console.log(`   Tags: ${output.tags.join(', ')}`);
    console.log(`   Image prompt: ${output.imagePrompt.substring(0, 80)}...`);
    console.log(`\n💾 Đã lưu: ${outPath}`);
  } catch (err: any) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

main();
