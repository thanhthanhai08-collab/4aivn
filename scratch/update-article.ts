import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

const targetId = 'anthropic-ra-mat-claude-opus-4-8';

async function updateArticle() {
  console.log(`Updating article with ID: ${targetId}...`);
  
  const docRef = db.collection('news').doc(targetId);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    console.error("Article not found!");
    process.exit(1);
  }

  const data = doc.data()!;
  console.log("Current fields:", Object.keys(data));

  // Migrate to standard bilingual structure
  // vi content from data.vi or data.content/title/summary
  const viTitle = data.vi?.title || data.title;
  const viSummary = data.vi?.summary || data.summary;
  const viContent = data.vi?.content || data.content;

  // en content from data.en
  const enTitle = data.en?.title || '';
  const enSummary = data.en?.summary || '';
  const enContent = data.en?.content || '';

  const updates: any = {
    // Standard bilingual fields
    'title': { vi: viTitle, en: enTitle },
    'summary': { vi: viSummary, en: enSummary },
    'content': { vi: viContent, en: enContent },
    'slug': {
      vi: 'anthropic-ra-mat-claude-opus-4-8',
      en: 'anthropic-launches-claude-opus-4-8'
    },
    // Remove old flat fields
    'language': admin.firestore.FieldValue.delete(),
  };

  // Remove old top-level vi/en map fields
  updates['vi'] = admin.firestore.FieldValue.delete();
  updates['en'] = admin.firestore.FieldValue.delete();

  await docRef.update(updates);
  console.log("Successfully migrated article to standard bilingual structure.");
  process.exit(0);
}

updateArticle().catch(console.error);
