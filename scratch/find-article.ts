import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

const targetSlug = 'anthropic-ra-mat-claude-opus-4-8';

async function findArticle() {
  console.log(`Searching for article with slug/id '${targetSlug}'...`);
  
  // Try direct doc ID first
  let docRef = db.collection('news').doc(targetSlug);
  let doc = await docRef.get();
  
  if (doc.exists) {
    console.log("Found by document ID:", doc.id);
    console.log(JSON.stringify(doc.data(), null, 2));
    process.exit(0);
  }
  
  // If not found by ID, query by slug.vi or slug.en or slug
  console.log("Not found by ID. Querying by slug...");
  const newsRef = db.collection('news');
  
  // Try slug equals
  let snapshot = await newsRef.where('slug', '==', targetSlug).get();
  if (snapshot.empty) {
    // Try slug.vi
    snapshot = await newsRef.where('slug.vi', '==', targetSlug).get();
  }
  if (snapshot.empty) {
    // Try slug.en
    snapshot = await newsRef.where('slug.en', '==', targetSlug).get();
  }
  
  if (!snapshot.empty) {
    console.log(`Found ${snapshot.size} matching documents:`);
    for (const d of snapshot.docs) {
      console.log("Document ID:", d.id);
      console.log(JSON.stringify(d.data(), null, 2));
    }
  } else {
    console.log("No matching article found in Firestore.");
  }
  
  process.exit(0);
}

findArticle().catch(console.error);
