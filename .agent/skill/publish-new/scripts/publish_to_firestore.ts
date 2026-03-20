/**
 * Bước 5: Đăng lên Firestore
 * Tạo document đầy đủ schema trong collection "news"
 *
 * Usage: npx tsx .agent/skill/publish-new/scripts/publish_to_firestore.ts --input "news-data/slug.json"
 */
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Parse args
const args = process.argv.slice(2);
const inputIdx = args.indexOf('--input');
const inputPath = inputIdx !== -1 ? args[inputIdx + 1] : '';

if (!inputPath) {
  console.error('❌ Thiếu --input. Usage: npx tsx publish_to_firestore.ts --input "news-data/slug.json"');
  process.exit(1);
}

// Init Firebase Admin
const serviceAccount = require(path.resolve(process.cwd(), 'serviceAccountKey.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id
});
const db = admin.firestore();

async function main() {
  const fullPath = path.resolve(process.cwd(), inputPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File không tồn tại: ${fullPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

  console.log('🚀 Đăng bài lên Firestore...');
  console.log(`   Tiêu đề: ${data.title}`);

  // Chuẩn bị document theo schema đầy đủ
  const newsDoc = {
    author: data.author || 'Nam',
    category: data.category || [{ id: 'xu-huong', name: 'Xu hướng' }],
    charts: data.charts || [],
    content: data.content || '',
    imageUrl: data.imageUrl || '',
    post: false,
    publishedAt: data.publishedAt
      ? admin.firestore.Timestamp.fromDate(new Date(data.publishedAt))
      : admin.firestore.FieldValue.serverTimestamp(),
    source: data.source || 'Tổng hợp',
    summary: data.summary || '',
    tags: data.tags || [],
    title: data.title || '',
    viewCount: data.viewCount || 0
  };

  try {
    const docRef = await db.collection('news').add(newsDoc);
    console.log(`\n✅ Đã đăng thành công!`);
    console.log(`   Document ID: ${docRef.id}`);
    console.log(`   post: false (cần chuyển true để xuất bản)`);

    // Cập nhật document ID vào file JSON
    data.firestoreId = docRef.id;
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');

    process.exit(0);
  } catch (err: any) {
    console.error('❌ Lỗi Firestore:', err.message);
    process.exit(1);
  }
}

main();
