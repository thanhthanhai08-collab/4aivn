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

async function migrateModels(dryRun: boolean = false) {
  console.log(`\n🚀 Starting Firestore models bilingual migration...`);
  console.log(`   Mode: ${dryRun ? '🔍 DRY RUN (no writes)' : '✏️  LIVE (will write to Firestore)'}\n`);

  const modelsRef = db.collection('models');
  const snapshot = await modelsRef.get();

  console.log(`📦 Found ${snapshot.size} documents in "models" collection.\n`);

  let migratedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const modelName = data.name || doc.id;
    const updates: Record<string, any> = {};

    try {
      // --- 1. description (string → { vi, en }) ---
      if (typeof data.description === 'string') {
        updates.description = { vi: data.description, en: data.description };
      } else if (!isBilingualMap(data.description) && data.description !== undefined) {
        console.log(`  ⚠️  [${modelName}] description has unexpected type: ${typeof data.description}`);
      }

      // Apply updates if any
      if (Object.keys(updates).length > 0) {
        if (dryRun) {
          console.log(`  📝 [${modelName}] (${doc.id}) would migrate: description`);
        } else {
          await modelsRef.doc(doc.id).update(updates);
          console.log(`  ✅ [${modelName}] (${doc.id}) migrated: description`);
        }
        migratedCount++;
      } else {
        console.log(`  ⏭️  [${modelName}] (${doc.id}) description already bilingual or empty, skipped.`);
        skippedCount++;
      }
    } catch (err) {
      console.error(`  ❌ [${modelName}] (${doc.id}) ERROR:`, err);
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
    console.log(`   npx tsx migrate-models-bilingual.ts\n`);
  }

  process.exit(errorCount > 0 ? 1 : 0);
}

// ===== CLI =====
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

migrateModels(isDryRun).catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
