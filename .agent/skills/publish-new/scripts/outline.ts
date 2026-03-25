/**
 * Bước 2b: Lập dàn ý bài viết (H2, H3, Sapo)
 * Usage: npx tsx .agent/skill/publish-new/scripts/outline.ts --slug "slug"
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
const analyzePath = path.join(dirPath, 'analyze.json');
const crawlPath = path.join(dirPath, 'crawl.json');

if (!fs.existsSync(analyzePath) || !fs.existsSync(crawlPath)) {
  console.error(`❌ File analyze.json hoặc crawl.json không tồn tại ở: ${dirPath}`);
  process.exit(1);
}

const OUTPUT_SCHEMA = {
  type: "object" as const,
  properties: {
    sapo: { type: "string" as const, description: "Đoạn Sapo hấp dẫn bằng fact/số liệu, KHÔNG CÓ định nghĩa sáo rỗng" },
    headings: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          level: { type: "number" as const, description: "2 (cho h2) hoặc 3 (cho h3)" },
          text: { type: "string" as const, description: "Nội dung tiêu đề (CHỈ viết hoa chữ đầu, tên riêng và chữ AI)" },
          intent: { type: "string" as const, description: "Mục đích hoặc ví dụ/số liệu cụ thể sẽ đưa vào phần này" }
        },
        required: ["level", "text", "intent"]
      },
      description: "Danh sách HTML Headings cho bài viết, bao gồm luôn cả tiêu đề Kết luận"
    },
    conclusionInsight: { type: "string" as const, description: "Insight đắt giá hoặc hành động thiết thực cho phần kết luận" }
  },
  required: ["sapo", "headings", "conclusionInsight"]
};

async function main() {
  console.log(`📝 Đang lập dàn ý cho: ${slug}`);
  const crawlData = JSON.parse(fs.readFileSync(crawlPath, 'utf-8'));
  const analyzeData = JSON.parse(fs.readFileSync(analyzePath, 'utf-8'));

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

  const prompt = `Yêu cầu lập dàn bài theo RULE 4AIVN:
Từ các phân tích (deep research), lập dàn ý chi tiết bài báo tiếng Việt.

Phân tích (Analyze):
- Core message: ${analyzeData.coreMessage}
- Perspectives: ${JSON.stringify(analyzeData.perspectives)}
- Facts: ${JSON.stringify(analyzeData.facts)}

Nội dung thô gốc: ${crawlData.rawContent.substring(0, 5000)}

NHIỆM VỤ VÀ QUY TẮC BẮT BUỘC:
1. Viết đoạn "sapo" cực kỳ hấp dẫn. Phải bằng sự thật bất ngờ, con số ấn tượng. TUYỆT ĐỐI KHÔNG bắt đầu bằng "Trí tuệ nhân tạo là gì..." hay những định nghĩa phổ thông.
2. Trình bày dàn ý H2/H3.
3. QUY TẮC VIẾT HOA H2/H3: CHỈ viết hoa chữ cái đầu tiên, tên riêng và từ "AI". Tuyệt đối không viết hoa từng từ. (Đúng: "Claude ra mắt tính năng mới". Sai: "Claude Ra Mắt Tính Năng Mới").
4. KẾT LUẬN: Đảm bảo phần Kết luận (Heading cuối cùng) được lên kế hoạch gửi gắm 1 insight đáng nhớ hoặc 1 action rõ ràng (sẽ trả qua trường conclusionInsight). Không dùng kiểu "Hy vọng bài viết hữu ích".`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const output = JSON.parse(text);

    const outPath = path.join(dirPath, 'outline.json');
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
    
    console.log(`✅ Đã lập outline.json: ${outPath}`);
  } catch (e: any) {
    console.error(`❌ Lỗi: ${e.message}`);
    process.exit(1);
  }
}

main();
