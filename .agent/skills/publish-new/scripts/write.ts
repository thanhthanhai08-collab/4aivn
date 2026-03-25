/**
 * Bước 2c: Viết bài hoàn chỉnh ra file HTML
 * Usage: npx tsx .agent/skill/publish-new/scripts/write.ts --slug "slug"
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
const outlinePath = path.join(dirPath, 'outline.json');

if (!fs.existsSync(analyzePath) || !fs.existsSync(outlinePath)) {
  console.error(`❌ File analyze.json hoặc outline.json không tồn tại ở: ${dirPath}`);
  process.exit(1);
}

const styleGuidePath = path.resolve(__dirname, '../resources/writing_style_guide.md');
const styleGuide = fs.existsSync(styleGuidePath) ? fs.readFileSync(styleGuidePath, 'utf-8') : '';

async function main() {
  console.log(`✍️ Đang viết bài cho: ${slug}`);
  const analyzeData = JSON.parse(fs.readFileSync(analyzePath, 'utf-8'));
  const outlineData = JSON.parse(fs.readFileSync(outlinePath, 'utf-8'));

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Thiếu GEMINI_API_KEY');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
  });

  const prompt = `Bạn là nhà báo công nghệ AI cao cấp (4AIVN), chuyên viết bài phân tích chuyên sâu nhưng dễ hiểu.

CHI TIẾT DỮ LIỆU:
- Core message: ${analyzeData.coreMessage}
- Facts: ${JSON.stringify(analyzeData.facts)}

DÀN Ý ĐÃ CHỐT VÀ KẾ HOẠCH:
Sapo dự định (phải biến thành thẻ <p class="sapo"> ấn tượng): ${outlineData.sapo}
Cấu trúc H2/H3 (giữ nguyên TEXT của các Heading này, không làm sai lệch viết hoa):
${outlineData.headings.map((h: any) => `- L${h.level}: ${h.text} (${h.intent})`).join('\n')}
Insight Kết luận: ${outlineData.conclusionInsight}

TUYỆT ĐỐI TUÂN THỦ STYLE GUIDE:
${styleGuide}

ĐẶC BIỆT KIỂM TRA MỘT LẦN NỮA CHECKLIST SAU TRƯỚC KHI TRẢ VỀ:
1. Sapo được kẹp trong <p class="sapo"> sinh ra ngay đầu tiên, trước <h2> đầu tiên.
2. KHÔNG BAO GIỜ dùng các câu cấm như: "Trong thế giới công nghệ thay đổi nhanh...", "Trí tuệ nhân tạo đang cách mạng hóa...", "Bài viết này sẽ...". 
3. TUYỆT ĐỐI BẮT BUỘC: Sử dụng dồi dào các từ nối ("và", "nhưng", "tuy nhiên", "mặt khác", "vì vậy", "đó là lý do") để tránh tình trạng câu quá ngắn, cụt ngủn hoặc thiếu liên kết.
4. KHÔNG dùng dấu gạch ngang (-) ở bất kỳ đâu trong toàn bộ HTML.
5. Mỗi H2 phải chứa ít nhất 1 ví dụ thực tế hoặc số liệu (lấy từ Facts hoặc tự viết logic theo bài).
6. Kết luận không lấy câu cảm thán "Hy vọng...". Phải ghi rõ insight hoặc hành động cụ thể.

YÊU CẦU ĐẦU RA:
- Trả về mã HTML thuần tuý (kết hợp các thẻ h2, h3, p, ul). Không bọc trong \`\`\`html. 
- Chỉ điền nội dung vào chứ không thay đổi các Heading H2/H3 đã chốt.`;

  try {
    const result = await model.generateContent(prompt);
    let htmlContent = result.response.text();
    htmlContent = htmlContent.replace(/^```html\n?/g, '').replace(/```$/g, '').trim();

    const outPath = path.join(dirPath, 'write.html');
    fs.writeFileSync(outPath, htmlContent, 'utf-8');
    
    console.log(`✅ Đã viết xong HTML: ${outPath}`);
  } catch (e: any) {
    console.error(`❌ Lỗi: ${e.message}`);
    process.exit(1);
  }
}

main();
