/**
 * Bước 4: Render ảnh bìa bằng Gemini API (Nano Banana 2)
 * Lưu local vào news-data/
 *
 * Usage: npx tsx .agent/skill/publish-new/scripts/generate_cover.ts --input "news-data/slug.json"
 */
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Parse args
const args = process.argv.slice(2);
const inputIdx = args.indexOf('--input');
const inputPath = inputIdx !== -1 ? args[inputIdx + 1] : '';

if (!inputPath) {
  console.error('❌ Thiếu --input. Usage: npx tsx generate_cover.ts --input "news-data/slug.json"');
  process.exit(1);
}

async function main() {
  const fullPath = path.resolve(process.cwd(), inputPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File không tồn tại: ${fullPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  const imagePrompt = data.imagePrompt;

  if (!imagePrompt) {
    console.error('❌ Không tìm thấy imagePrompt trong file JSON');
    process.exit(1);
  }

  console.log('🎨 Đang tạo ảnh bìa...');
  console.log(`   Prompt: ${imagePrompt.substring(0, 100)}...`);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Thiếu GEMINI_API_KEY trong .env.local');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Sử dụng Gemini 2.0 Flash (hỗ trợ image generation)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['image', 'text'],
    } as any
  });

  try {
    const result = await model.generateContent(
      `Generate a professional blog cover image: ${imagePrompt}. Style: modern, clean, digital art, 16:9 aspect ratio, no text overlay.`
    );

    const response = result.response;
    const parts = response.candidates?.[0]?.content?.parts || [];

    let imageSaved = false;
    for (const part of parts) {
      if ((part as any).inlineData) {
        const inlineData = (part as any).inlineData;
        const buffer = Buffer.from(inlineData.data, 'base64');

        // Lưu ảnh
        const slug = data.slug || path.basename(inputPath, '.json');
        const imgPath = path.resolve(process.cwd(), 'news-data', `${slug}.webp`);
        fs.writeFileSync(imgPath, buffer);

        // Cập nhật imageUrl trong JSON
        data.imageUrl = `news-data/${slug}.webp`;
        fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');

        console.log(`\n✅ Ảnh bìa đã lưu: ${imgPath}`);
        console.log(`   Kích thước: ${(buffer.length / 1024).toFixed(1)} KB`);
        imageSaved = true;
        break;
      }
    }

    if (!imageSaved) {
      console.warn('⚠️  Gemini không trả về ảnh. Giữ nguyên imageUrl mặc định.');
      console.log('   Response parts:', parts.map((p: any) => p.text || '[non-text]').join(', '));
    }
  } catch (err: any) {
    console.error('❌ Lỗi tạo ảnh:', err.message);
    console.log('💡 Tip: Kiểm tra model hỗ trợ image generation và GEMINI_API_KEY hợp lệ.');
    process.exit(1);
  }
}

main();
