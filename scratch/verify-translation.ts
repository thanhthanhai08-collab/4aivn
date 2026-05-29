import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function verify() {
  console.log('--- Inspecting models/openai-o3 ---');
  const modelDoc = await db.collection('models').doc('openai-o3').get();
  if (modelDoc.exists) {
    const data = modelDoc.data()!;
    console.log('vi:', data.description.vi);
    console.log('en:', data.description.en);
  } else {
    console.log('Document openai-o3 not found.');
  }
  process.exit(0);
}

verify().catch(console.error);
