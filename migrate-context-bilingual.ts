import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function migrateContextBilingual(toolId: string) {
  console.log(`🚀 Migrating context field for "${toolId}"...\n`);

  const docRef = db.collection('tools').doc(toolId);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    console.error(`❌ Document "${toolId}" not found.`);
    process.exit(1);
  }

  const data = docSnap.data()!;
  const toolName = data.name || toolId;

  // Check if context is already a Map
  if (typeof data.context === 'object' && data.context !== null && 'vi' in data.context) {
    console.log(`⏭️  [${toolName}] context is already bilingual.`);
    process.exit(0);
  }

  if (typeof data.context !== 'string') {
    console.log(`⚠️  [${toolName}] context is not a string, skipping.`);
    process.exit(0);
  }

  // Map Vietnamese context to English
  const contextMap: Record<string, string> = {
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
  };

  const viContext = data.context;
  const enContext = contextMap[viContext] || viContext; // fallback to Vietnamese if no mapping

  await docRef.update({
    context: { vi: viContext, en: enContext }
  });

  console.log(`✅ [${toolName}] context migrated:`);
  console.log(`   vi: "${viContext}"`);
  console.log(`   en: "${enContext}"`);
  console.log('\n✨ Done!');

  process.exit(0);
}

const toolId = process.argv[2];
if (!toolId) {
  console.error('❌ Usage: npx tsx migrate-context-bilingual.ts <tool-id>');
  process.exit(1);
}

migrateContextBilingual(toolId).catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
