/**
 * Bước 4: Đăng bài song ngữ lên Firestore và dọn dẹp thư mục.
 * Format song ngữ dùng đúng schema hiện có:
 * slug: { vi, en }, title: { vi, en }, summary: { vi, en }, content: { vi, en }
 *
 * Usage: npx tsx .agent/skills/publish-new/scripts/publish_to_firestore.ts --slug "slug"
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
  console.error('Thiếu --slug. Usage: npx tsx publish_to_firestore.ts --slug "slug"');
  process.exit(1);
}

const dirPath = path.resolve(process.cwd(), `news-data/${slug}`);
const fullPath = path.join(dirPath, `${slug}.json`);

if (!fs.existsSync(fullPath)) {
  console.error(`File không tồn tại: ${fullPath}`);
  process.exit(1);
}

const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('Thiếu file serviceAccountKey.json ở thư mục gốc');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id
});
const db = admin.firestore();

type LocalizedField = string | { vi?: string; en?: string };

function toLocalizedField(field: LocalizedField | undefined, viFallback = '', enFallback = '') {
  if (typeof field === 'object' && field !== null) {
    return {
      vi: field.vi || viFallback,
      en: field.en || enFallback || field.vi || viFallback
    };
  }

  return {
    vi: field || viFallback,
    en: enFallback || field || viFallback
  };
}

type FaqItem = { question?: LocalizedField; answer?: LocalizedField };

function buildFaq(data: any, title: { vi: string; en: string }, summary: { vi: string; en: string }) {
  if (Array.isArray(data.faq) && data.faq.length > 0) {
    return data.faq.map((item: FaqItem) => ({
      question: toLocalizedField(item.question),
      answer: toLocalizedField(item.answer),
    }));
  }

  return [
    {
      question: { vi: `${title.vi} là gì?`, en: `What is ${title.en}?` },
      answer: { vi: summary.vi || `${title.vi} là chủ đề được 4AIVN giới thiệu và phân tích.`, en: summary.en || `${title.en} is a topic covered and analyzed by 4AIVN.` },
    },
    {
      question: { vi: `Vì sao ${title.vi} đáng chú ý?`, en: `Why is ${title.en} notable?` },
      answer: { vi: `Bài viết giải thích những thông tin và điểm đáng chú ý nhất liên quan đến ${title.vi}.`, en: `The article explains the key information and notable points related to ${title.en}.` },
    },
    {
      question: { vi: `Ai nên quan tâm đến ${title.vi}?`, en: `Who should be interested in ${title.en}?` },
      answer: { vi: `Nội dung phù hợp với độc giả quan tâm đến AI, công nghệ và chủ đề được đề cập trong bài viết.`, en: `It is relevant to readers interested in AI, technology, and the subject covered in the article.` },
    },
  ];
}

async function main() {
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  const slugField = toLocalizedField(data.slug, '', '');
  const title = toLocalizedField(data.title, data.titleVi, data.titleEn);
  const summary = toLocalizedField(data.summary, data.summaryVi, data.summaryEn);
  const content = toLocalizedField(data.content, data.contentVi, data.contentEn);
  const faq = buildFaq(data, title, summary);

  // Document ID dùng slug.vi
  const docSlug = slugField.vi || slug;

  console.log('Đăng bài song ngữ lên Firestore...');
  console.log(`   Slug VI: ${slugField.vi}`);
  console.log(`   Slug EN: ${slugField.en}`);
  console.log(`   Title VI: ${title.vi}`);
  console.log(`   Title EN: ${title.en}`);

  const newsDoc = {
    author: data.author || 'Nam',
    authorId: data.authorId || 'nam',
    category: data.category || [{ id: 'xu-huong', name: 'Xu hướng' }],
    charts: data.charts || [],
    content,
    imageUrl: `/image/news%2F${docSlug}.webp`,
    post: false,
    publishedAt: data.publishedAt
      ? admin.firestore.Timestamp.fromDate(new Date(data.publishedAt))
      : admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: data.updatedAt
      ? admin.firestore.Timestamp.fromDate(new Date(data.updatedAt))
      : admin.firestore.FieldValue.serverTimestamp(),
    slug: slugField,
    source: data.source || data.link || 'Tổng hợp',
    summary,
    tag: data.tag || [],
    title,
    viewCount: data.viewCount || 0,
    faq
  };

  try {
    const docRef = db.collection('news').doc(docSlug);
    await docRef.set(newsDoc);

    console.log('\nĐã đăng thành công.');
    console.log(`   Document ID: ${docRef.id}`);
    console.log('   post: false');

    data.firestoreId = docRef.id;
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');

    console.log('Dọn dẹp thư mục:');
    const filesToRemove = ['crawl.json', 'analyze.json', 'outline.json', 'write.html'];
    filesToRemove.forEach(f => {
      const p = path.join(dirPath, f);
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
        console.log(`   Đã xoá: ${f}`);
      }
    });

    console.log(`\nHoàn tất. Thư mục news-data/${slug}/ giờ chỉ còn ${slug}.json và ảnh bìa.`);
    process.exit(0);
  } catch (err: any) {
    console.error('Lỗi Firestore:', err.message);
    process.exit(1);
  }
}

main();
