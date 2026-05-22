import * as admin from 'firebase-admin';

// Make sure to have your service account key file in the root directory
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function seedTestArticle() {
  const articleId = "preview-test-" + Date.now();
  const articleRef = db.collection('news').doc(articleId);
  
  await articleRef.set({
    id: articleId,
    title: {
      vi: "[Test Cực Ngắn] Hỗ trợ song ngữ",
      en: "[Ultra Short Test] Bilingual Support"
    },
    slug: {
      vi: "test-cuc-ngan-ho-tro-song-ngu",
      en: "ultra-short-test-bilingual-support"
    },
    content: {
      vi: "<p>Đây là bài viết test siêu ngắn tiếng Việt đăng qua Admin SDK để đảm bảo Admin Preview xem được mà không bị ảnh hưởng bài cũ.</p>",
      en: "<p>This is an ultra-short test article published via Admin SDK to ensure Admin Preview works flawlessly without affecting old posts.</p>"
    },
    summary: {
      vi: "Test tóm tắt tiếng Việt cực ngắn qua service account",
      en: "Ultra short English summary test via service account"
    },
    author: "4AIVN Admin",
    source: "4AIVN",
    imageUrl: "https://placehold.co/800x450/4ade80/FFFFFF/png?text=Test+Admin+Preview",
    post: false, // Ensures it doesn't appear on public news feed
    publishedAt: admin.firestore.Timestamp.now(),
    tag: ["test"],
    category: [{ id: "tin-tuc", name: "Tin tức" }],
    viewCount: 0
  }, { merge: true });

  console.log("✅ Bài viết thử nghiệm siêu ngắn đã được tạo qua Admin SDK!");
  console.log("Document ID:", articleId);
  console.log("Trạng thái Post:", false);
  process.exit(0);
}

seedTestArticle().catch(console.error);
