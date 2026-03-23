/**
 * Bước 3: Metadata, Check chính tả & Chèn Link
 * Khác với bản cũ, bản này đọc HTML đã viết sẵn, KIÊN QUYẾT KHÔNG ĐỔI NỘI DUNG
 * Usage: npx tsx .agent/skill/publish-new/scripts/rewrite_article.ts --slug "slug"
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
  console.error('❌ Thiếu --slug. Usage: npx tsx rewrite_article.ts --slug "slug"');
  process.exit(1);
}

const dirPath = path.resolve(process.cwd(), `news-data/${slug}`);
const htmlPath = path.join(dirPath, 'write.html');

if (!fs.existsSync(htmlPath)) {
  console.error(`❌ File write.html không tồn tại ở: ${htmlPath}`);
  process.exit(1);
}

const OUTPUT_SCHEMA = {
  type: "object" as const,
  properties: {
    title: { type: "string" as const, description: "Tiêu đề bài viết tiếng Việt (giật tít chuyên nghiệp)" },
    summary: { type: "string" as const, description: "Tóm tắt 1-2 câu ngắn gọn" },
    content: { type: "string" as const, description: "HTML y hệt bản gốc, chỉ sửa chính tả và chèn <a>" },
    tags: {
      type: "array" as const,
      items: { type: "string" as const },
      description: "5-8 từ khóa liên quan"
    },
    imagePrompt: { type: "string" as const, description: "Prompt tiếng Anh sinh ảnh bìa tỷ lệ 16:9" }
  },
  required: ["title", "summary", "content", "tags", "imagePrompt"]
};

async function main() {
  console.log(`🧩 Đang chạy Metadata & Spell Check cho: ${slug}`);
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

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

  const prompt = `Nhiệm vụ: Duyệt lại bài viết HTML và sinh Metadata.
Nội dung bài gốc (HTML format):
${htmlContent}

Yêu cầu BẮT BUỘC:
1. Sinh tiêu đề (title), tóm tắt (summary), từ khoá (tags), và image prompt (chi tiết, tiếng Anh, không chứa text).
2. TRẢ LẠI 100% nội dung HTML ở trường \`content\`. TUYỆT ĐỐI KHÔNG ĐƯỢC THAY ĐỔI câu chữ của bài viết gốc đã viết ở bước trước.
3. Trong trường \`content\`, bạn CHỈ ĐƯỢC PHÉP:
   - Chữa lỗi chính tả (nếu có).
   - Chèn thêm anchor text (thẻ <a>) nếu thấy từ khóa phù hợp. Ưu tiên internal link về trang https://4aivn.com/ (nếu liên quan khóa học/kiến thức AI) hoặc link ngoài tham khảo.
   
Nếu bạn thay đổi nội dung (văn phong, cấu trúc câu), bài viết sẽ bị từ chối!`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const output = JSON.parse(text);

    // Bổ sung metadata
    const fullOutput = {
      ...output,
      category: [{ id: "xu-huong", name: "Xu hướng" }], // mặc định
      id: slug,
      slug,
      source: '', // Sẽ bỏ trống hoặc tự bổ sung sau
      author: 'Nam',
      post: false,
      viewCount: 0,
      charts: [],
      imageUrl: `news-data/${slug}.webp`,
      publishedAt: new Date().toISOString()
    };

    const outPath = path.join(dirPath, `${slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(fullOutput, null, 2), 'utf-8');

    console.log('✅ Hoàn tất Metadata!');
    console.log(`   Tiêu đề: ${output.title}`);
    console.log(`   Image prompt: ${output.imagePrompt}`);
    console.log(`\n💾 Đã lưu: ${outPath}`);
    console.log(`\n=> HÃY COPY IMAGE PROMPT ĐỂ SINH ẢNH BÌA, LƯU VÀO news-data/${slug}/${slug}.webp, SAU ĐÓ CHẠY BƯỚC 4.`);
  } catch (err: any) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

main();
