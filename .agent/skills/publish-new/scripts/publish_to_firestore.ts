/**
 * Bước 4: Đăng lên Firestore và dọn dẹp thư mục
 * Usage: npx tsx .agent/skill/publish-new/scripts/publish_to_firestore.ts --slug "slug"
 */
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const args = process.argv.slice(2);
const slugIdx = args.indexOf('--slug');
const slug = slugIdx !== -1 ? args[slugIdx + 1] : '';

if (!slug) {
  console.error('❌ Thiếu --slug. Usage: npx tsx publish_to_firestore.ts --slug "slug"');
  process.exit(1);
}

const dirPath = path.resolve(process.cwd(), `news-data/${slug}`);
const fullPath = path.join(dirPath, `${slug}.json`);

if (!fs.existsSync(fullPath)) {
  console.error(`❌ File không tồn tại: ${fullPath}`);
  process.exit(1);
}

const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Thiếu file serviceAccountKey.json ở thư mục gốc');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id
});
const db = admin.firestore();

async function main() {
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

  console.log('🚀 Đăng bài lên Firestore...');
  console.log(`   Tiêu đề: ${data.title}`);

  const newsDoc = {
    author: data.author || 'Nam',
    authorId: data.authorId || 'nam',
    category: data.category || [{ id: 'xu-huong', name: 'Xu hướng' }],
    charts: data.charts || [],
    content: data.content || '',
    // Lấy ảnh bìa 16:9 từ storage
    imageUrl: `/image/news%2F${slug}.webp`,
    post: false, // Để rà soát duyệt nội dung
    publishedAt: data.publishedAt
      ? admin.firestore.Timestamp.fromDate(new Date(data.publishedAt))
      : admin.firestore.FieldValue.serverTimestamp(),
    source: data.source || 'Tổng hợp',
    summary: data.summary || '',
    tag: data.tag || [],
    title: data.title || '',
    viewCount: data.viewCount || 0
  };

  try {
    const docSlug = data.slug || slug;
    const docRef = db.collection('news').doc(docSlug);
    await docRef.set(newsDoc);

    console.log(`\n✅ Đã đăng thành công!`);
    console.log(`   Document ID: ${docRef.id}`);
    console.log(`   post: false`);

    // Ghi nhận firestoreId
    data.firestoreId = docRef.id;
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');

    // Dọn dẹp các file JSON không cần thiết
    console.log('🧹 Dọn dẹp thư mục:');
    const filesToRemove = ['crawl.json', 'analyze.json', 'outline.json', 'write.html'];
    filesToRemove.forEach(f => {
      const p = path.join(dirPath, f);
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
        console.log(`   Đã xoá: ${f}`);
      }
    });

    console.log(`\n🎉 Hoàn tất quy trình! Thư mục news-data/${slug}/ giờ chỉ còn ${slug}.json và ảnh bìa.`);
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Lỗi Firestore:', err.message);
    process.exit(1);
  }
}

main();
