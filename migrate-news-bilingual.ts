import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Helper to check if a field is already a bilingual map
function isBilingualMap(field: any): boolean {
  return typeof field === 'object' && field !== null && 'vi' in field;
}

async function migrateNews(dryRun: boolean = false) {
  console.log(`\n🚀 Starting Firestore news bilingual migration...`);
  console.log(`   Mode: ${dryRun ? '🔍 DRY RUN (no writes)' : '✏️  LIVE (will write to Firestore)'}\n`);

  const newsRef = db.collection('news');
  const snapshot = await newsRef.get();

  console.log(`📦 Found ${snapshot.size} documents in "news" collection.\n`);

  let migratedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const articleTitle = (typeof data.title === 'object' && data.title?.vi) || data.title || doc.id;
    const updates: Record<string, any> = {};

    try {
      // --- 1. title (string → { vi, en }) ---
      if (typeof data.title === 'string') {
        updates.title = { vi: data.title, en: data.title };
      }

      // --- 2. summary (string → { vi, en }) ---
      if (typeof data.summary === 'string') {
        updates.summary = { vi: data.summary, en: data.summary };
      }

      // --- 3. content (string → { vi, en }) ---
      if (typeof data.content === 'string') {
        updates.content = { vi: data.content, en: data.content };
      }

      // --- 4. slug (string/missing → { vi, en }) ---
      if (typeof data.slug === 'string') {
        updates.slug = { vi: data.slug, en: data.slug };
      } else if (data.slug === undefined || data.slug === null) {
        // Fallback to document ID if slug is missing
        updates.slug = { vi: doc.id, en: doc.id };
      }

      // Apply updates if any
      if (Object.keys(updates).length > 0) {
        const fieldsToUpdate = Object.keys(updates).join(', ');
        if (dryRun) {
          console.log(`  📝 [${articleTitle}] (${doc.id}) would migrate: ${fieldsToUpdate}`);
        } else {
          await newsRef.doc(doc.id).update(updates);
          console.log(`  ✅ [${articleTitle}] (${doc.id}) migrated: ${fieldsToUpdate}`);
        }
        migratedCount++;
      } else {
        console.log(`  ⏭️  [${articleTitle}] (${doc.id}) already bilingual, skipped.`);
        skippedCount++;
      }
    } catch (err) {
      console.error(`  ❌ [${articleTitle}] (${doc.id}) ERROR:`, err);
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
    console.log(`   npx tsx migrate-news-bilingual.ts\n`);
  }

  process.exit(errorCount > 0 ? 1 : 0);
}

// ===== CLI =====
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

migrateNews(isDryRun).catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
