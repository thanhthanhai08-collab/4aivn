import { db } from './src/lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

async function seedTestArticle() {
  const articleId = "ai-news-" + Date.now();
  const articleRef = doc(db, 'news', articleId);
  await setDoc(articleRef, {
    "id": articleId,
    "title": {
      "vi": "Cập nhật mới: Việt Nam đẩy mạnh chiến lược phát triển AI quốc gia 2026",
      "en": "New Update: Vietnam accelerates national AI development strategy in 2026"
    },
    "slug": {
      "vi": "viet-nam-day-manh-chien-luoc-phat-trien-ai-2026",
      "en": "vietnam-accelerates-ai-development-strategy-2026"
    },
    "content": {
      "vi": "<p class=\"sapo\">Chính phủ Việt Nam vừa công bố các khoản đầu tư vào cơ sở hạ tầng siêu máy tính để phát triển mô hình ngôn ngữ lớn (LLM) quốc gia.</p><p>Sự đầu tư này sẽ thúc đẩy các doanh nghiệp và viện nghiên cứu hợp tác sâu rộng hơn, từ đó nâng cao thứ hạng công nghệ của Việt Nam trên bản đồ AI khu vực. (Đây là bài viết thử nghiệm tính năng đa ngôn ngữ).</p><h3>Tầm nhìn 2030</h3><p>Đến năm 2030, AI sẽ trở thành lĩnh vực công nghệ mũi nhọn.</p>",
      "en": "<p class=\"sapo\">The Vietnamese government has just announced investments in supercomputing infrastructure to develop a national large language model (LLM).</p><p>This investment will encourage businesses and research institutes to cooperate more deeply, thereby improving Vietnam's technological ranking on the regional AI map. (This is a test article for the bilingual feature).</p><h3>Vision for 2030</h3><p>By 2030, AI will become a spearhead technology sector.</p>"
    },
    "summary": {
      "vi": "Chiến lược AI quốc gia của Việt Nam tập trung vào sự phát triển hạ tầng tính toán lớn.",
      "en": "Vietnam's national AI strategy focuses on the development of massive computing infrastructure."
    },
    "author": "4AIVN Admin",
    "source": "4AIVN",
    "imageUrl": "https://placehold.co/800x450/1E3A8A/FFFFFF/png?text=AI+Vietnam+2026",
    "post": false,
    "publishedAt": Timestamp.now(),
    "tag": ["vietnam", "ai strategy", "test"],
    "category": [{"id": "tin-tuc", "name": "Tin trong nước"}],
    "viewCount": 0
  }, { merge: true });
  console.log("Bài viết thử nghiệm đa ngôn ngữ đã được tạo!");
  console.log("Document ID:", articleId);
  console.log("Slug Tiếng Việt:", "viet-nam-day-manh-chien-luoc-phat-trien-ai-2026");
  console.log("Slug Tiếng Anh:", "vietnam-accelerates-ai-development-strategy-2026");
  console.log("Trạng thái Post (hiển thị public):", false);
  process.exit();
}

seedTestArticle().catch(console.error);
