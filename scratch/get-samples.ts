import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function inspect() {
  console.log('--- Inspecting models/qwen3-max ---');
  const modelDoc = await db.collection('models').doc('qwen3-max').get();
  if (modelDoc.exists) {
    console.log(JSON.stringify(modelDoc.data(), null, 2));
  } else {
    console.log('Document qwen3-max not found in models collection.');
  }

  console.log('\n--- Inspecting news/claude-1-trieu-token-context-window-khong-ton-them-tien ---');
  const newsDoc = await db.collection('news').doc('claude-1-trieu-token-context-window-khong-ton-them-tien').get();
  if (newsDoc.exists) {
    console.log(JSON.stringify(newsDoc.data(), null, 2));
  } else {
    console.log('Document claude-1-trieu-token-context-window-khong-ton-them-tien not found in news collection.');
  }
  process.exit(0);
}

inspect().catch(console.error);
