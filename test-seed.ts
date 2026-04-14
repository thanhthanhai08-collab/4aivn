import { db } from './src/lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

async function seedTestArticle() {
  const articleRef = doc(db, 'news', 'test-bilingual-article');
  await setDoc(articleRef, {
    "id": "test-bilingual-article",
    "title": {
      "vi": "Bài viết test song ngữ: AI đang thay đổi thế giới",
      "en": "Test bilingual article: AI is changing the world"
    },
    "slug": {
      "vi": "bai-viet-test-song-ngu-ai-dang-thay-doi-the-gioi",
      "en": "test-bilingual-article-ai-is-changing-the-world"
    },
    "content": {
      "vi": "<p class=\"sapo\">Đây là một đoạn sapo test. AI đang phát triển mạnh mẽ và ảnh hưởng ngày càng sâu sắc đến chúng ta.</p><p>Trí tuệ nhân tạo (AI) không còn là khái niệm xa lạ. Từ những tác vụ đơn giản đến các quyết định quan trọng, AI đều có mặt và hỗ trợ con người.</p><h3>Tương lai của AI</h3><p>Rất nhiều dự đoán cho thấy AI sẽ tiếp tục tạo ra nhiều kỷ nguyên mới, và chúng ta cần chuẩn bị cho nó.</p>",
      "en": "<p class=\"sapo\">This is a test sapo. AI is developing rapidly and profoundly affecting us.</p><p>Artificial intelligence (AI) is no longer a strange concept. From simple tasks to critical decisions, AI is present and supporting humans.</p><h3>The Future of AI</h3><p>Many predictions show that AI will continue to create new eras, and we need to prepare for it.</p>"
    },
    "summary": {
      "vi": "Bài viết test tính năng song ngữ trên 4AIVN.",
      "en": "Test article for bilingual feature on 4AIVN."
    },
    "author": "4AIVN",
    "source": "4AIVN",
    "imageUrl": "https://placehold.co/800x450/4B0082/FFFFFF/png?text=Test+Bilingual",
    "post": false, // To avoid affecting production feeds
    "publishedAt": Timestamp.now(),
    "tag": ["test", "bilingual"],
    "category": [{"id": "xu-huong", "name": "Xu hướng"}],
    "viewCount": 0
  }, { merge: true });
  console.log("Test article inserted!");
  process.exit();
}

seedTestArticle().catch(console.error);
