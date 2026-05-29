import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

async function getLongDesc() {
  const snapshot = await db.collection('tools').where('post', '==', true).get();
  const docs = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));

  docs.sort((a, b) => {
    const aR = a.data.averageRating || 0, bR = b.data.averageRating || 0;
    if (bR !== aR) return bR - aR;
    const aC = a.data.ratingCount || 0, bC = b.data.ratingCount || 0;
    if (bC !== aC) return bC - aC;
    return a.id.localeCompare(b.id);
  });

  const slice = docs.slice(15, 45); // Rank 16-45

  for (let i = 0; i < slice.length; i++) {
    const { id, data: d } = slice[i];
    console.log(`\n=== [Rank ${i + 16}] ID: ${id} | Name: ${d.name} ===`);
    console.log('longDescription.vi:', d.longDescription?.vi || '(empty)');
    console.log('longDescription.en:', d.longDescription?.en || '(empty)');
  }
  process.exit(0);
}

getLongDesc().catch(err => { console.error(err); process.exit(1); });
