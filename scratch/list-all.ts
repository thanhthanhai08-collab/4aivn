import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function inspectCollections() {
  console.log('=== Models Collection ===');
  const modelsSnap = await db.collection('models').get();
  console.log(`Total models: ${modelsSnap.size}`);
  for (const doc of modelsSnap.docs) {
    const data = doc.data();
    const isDescriptionBilingual = typeof data.description === 'object' && data.description !== null && 'vi' in data.description;
    console.log(`- [${doc.id}] Description Bilingual: ${isDescriptionBilingual} (${typeof data.description})`);
  }

  console.log('\n=== News Collection ===');
  const newsSnap = await db.collection('news').get();
  console.log(`Total news: ${newsSnap.size}`);
  for (const doc of newsSnap.docs) {
    const data = doc.data();
    const isTitleBilingual = typeof data.title === 'object' && data.title !== null && 'vi' in data.title;
    const isSummaryBilingual = typeof data.summary === 'object' && data.summary !== null && 'vi' in data.summary;
    const isContentBilingual = typeof data.content === 'object' && data.content !== null && 'vi' in data.content;
    const hasSlug = 'slug' in data;
    const isSlugBilingual = hasSlug && typeof data.slug === 'object' && data.slug !== null && 'vi' in data.slug;
    
    console.log(`- [${doc.id}]:`);
    console.log(`  Title Bilingual:   ${isTitleBilingual} (${typeof data.title})`);
    console.log(`  Summary Bilingual: ${isSummaryBilingual} (${typeof data.summary})`);
    console.log(`  Content Bilingual: ${isContentBilingual} (${typeof data.content})`);
    console.log(`  Slug:              ${hasSlug ? (isSlugBilingual ? 'Bilingual Map' : typeof data.slug) : 'MISSING'}`);
  }
  process.exit(0);
}

inspectCollections().catch(console.error);
