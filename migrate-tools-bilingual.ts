import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// ===== MAPPING CONTEXT: Vietnamese → English =====
const contextMap: Record<string, string> = {
  // Original mappings
  'Tạo video AI': 'AI Video Generation',
  'Chatbot': 'Chatbot',
  'Tạo ảnh AI': 'AI Image Generation',
  'Tự động hóa': 'Automation',
  'Nghiên cứu': 'Research',
  'Phát triển ứng dụng': 'App Development',
  'Chuyển văn bản thành giọng nói': 'Text-to-Speech',
  'Thiết kế': 'Design',
  'Tạo nhạc AI': 'AI Music Generation',
  'Thu thập dữ liệu': 'Data Collection',
  'Ghi chú & Nghiên cứu': 'Notes & Research',
  'Năng suất': 'Productivity',
  'Trình duyệt AI': 'AI Browser',
  'AI Agent': 'AI Agent',
  'Viết nội dung': 'Content Writing',
  'Chỉnh sửa video': 'Video Editing',
  'Chỉnh sửa ảnh': 'Photo Editing',
  'Phân tích dữ liệu': 'Data Analysis',
  'Marketing': 'Marketing',
  'Giáo dục': 'Education',
  'Lập trình': 'Programming',
  'Dịch thuật': 'Translation',
  'Âm thanh': 'Audio',
  'Trợ lý AI': 'AI Assistant',
  // Additional mappings discovered from dry-run
  'Code cho web app': 'Web App Development',
  'Tạo hình ảnh AI': 'AI Image Generation',
  'Coding': 'Coding',
  'Tạo giọng nói AI': 'AI Voice Generation',
  'AI hỗ trợ viết': 'AI Writing Assistant',
  'Ghi chú AI': 'AI Note-taking',
  'AI tìm kiếm': 'AI Search',
  'API truy xuất dữ liệu web': 'Web Data Extraction API',
  'Design': 'Design',
};

// ===== HELPER: Check if a field is already bilingual =====
function isBilingualMap(field: any): boolean {
  return typeof field === 'object' && field !== null && 'vi' in field;
}

function isBilingualArrayMap(field: any): boolean {
  return typeof field === 'object' && field !== null && !Array.isArray(field) && 'vi' in field;
}

// ===== MAIN MIGRATION =====
async function migrateAllTools(dryRun: boolean = false) {
  console.log(`\n🚀 Starting Firestore tools bilingual migration...`);
  console.log(`   Mode: ${dryRun ? '🔍 DRY RUN (no writes)' : '✏️  LIVE (will write to Firestore)'}\n`);

  const toolsRef = db.collection('tools');
  const snapshot = await toolsRef.get();

  console.log(`📦 Found ${snapshot.size} documents in "tools" collection.\n`);

  let migratedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const toolName = data.name || doc.id;
    const updates: Record<string, any> = {};

    try {
      // --- 1. context (string → { vi, en }) ---
      if (typeof data.context === 'string') {
        const viContext = data.context;
        const enContext = contextMap[viContext] || viContext;
        updates.context = { vi: viContext, en: enContext };
      } else if (!isBilingualMap(data.context) && data.context !== undefined) {
        console.log(`  ⚠️  [${toolName}] context has unexpected type: ${typeof data.context}`);
      }

      // --- 2. description (string → { vi, en }) ---
      if (typeof data.description === 'string') {
        updates.description = { vi: data.description, en: data.description };
      }

      // --- 3. longDescription (string → { vi, en }) ---
      if (typeof data.longDescription === 'string') {
        updates.longDescription = { vi: data.longDescription, en: data.longDescription };
      }

      // --- 4. features (string[] → { vi: string[], en: string[] }) ---
      if (Array.isArray(data.features)) {
        updates.features = { vi: data.features, en: data.features };
      }

      // --- 5. pricingPlans (string[] → { vi: string[], en: string[] }) ---
      if (Array.isArray(data.pricingPlans)) {
        updates.pricingPlans = { vi: data.pricingPlans, en: data.pricingPlans };
      }

      // --- 6. useCases (string[] → { vi: string[], en: string[] }) ---
      if (Array.isArray(data.useCases)) {
        updates.useCases = { vi: data.useCases, en: data.useCases };
      }

      // --- 7. whoIsItFor (string[] → { vi: string[], en: string[] }) ---
      if (Array.isArray(data.whoIsItFor)) {
        updates.whoIsItFor = { vi: data.whoIsItFor, en: data.whoIsItFor };
      }

      // --- Apply updates ---
      if (Object.keys(updates).length > 0) {
        const fieldNames = Object.keys(updates).join(', ');

        if (dryRun) {
          console.log(`  📝 [${toolName}] (${doc.id}) would migrate: ${fieldNames}`);
          // Show context mapping if context is being migrated
          if (updates.context) {
            console.log(`      context: "${updates.context.vi}" → en: "${updates.context.en}"`);
          }
        } else {
          await toolsRef.doc(doc.id).update(updates);
          console.log(`  ✅ [${toolName}] (${doc.id}) migrated: ${fieldNames}`);
          if (updates.context) {
            console.log(`      context: "${updates.context.vi}" → en: "${updates.context.en}"`);
          }
        }
        migratedCount++;
      } else {
        console.log(`  ⏭️  [${toolName}] (${doc.id}) already bilingual, skipped.`);
        skippedCount++;
      }
    } catch (err) {
      console.error(`  ❌ [${toolName}] (${doc.id}) ERROR:`, err);
      errorCount++;
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Migration Summary:`);
  console.log(`   Total documents: ${snapshot.size}`);
  console.log(`   Migrated:        ${migratedCount}`);
  console.log(`   Skipped:         ${skippedCount}`);
  console.log(`   Errors:          ${errorCount}`);
  console.log(`   Mode:            ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`${'='.repeat(50)}\n`);

  if (dryRun && migratedCount > 0) {
    console.log(`💡 To apply changes, run again without --dry-run flag:\n`);
    console.log(`   npx tsx migrate-tools-bilingual.ts\n`);
  }

  process.exit(errorCount > 0 ? 1 : 0);
}

// ===== CLI =====
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

migrateAllTools(isDryRun).catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
