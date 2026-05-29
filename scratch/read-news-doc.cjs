const admin = require("firebase-admin");

const id = process.argv[2];
if (!id) {
  console.error("Usage: node scratch/read-news-doc.cjs <news-id>");
  process.exit(1);
}

const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id,
});

admin.firestore().collection("news").doc(id).get().then((snap) => {
  if (!snap.exists) {
    console.log(JSON.stringify({ exists: false }, null, 2));
    return;
  }

  const data = snap.data();
  console.log(JSON.stringify({
    exists: true,
    id: snap.id,
    keys: Object.keys(data).sort(),
    title: data.title,
    summary: data.summary,
    contentStart: typeof data.content === "string" ? data.content.slice(0, 1200) : data.content,
    contentIncludesEnglish: typeof data.content === "string" ? /English|Tiếng Anh|<h2>English|<h2>Tiếng Anh|<h2>English version/i.test(data.content) : false,
    contentLength: typeof data.content === "string" ? data.content.length : null,
    imageUrl: data.imageUrl,
    post: data.post,
    tag: data.tag,
    language: data.language,
    languages: data.languages,
    vi: data.vi,
    en: data.en
  }, null, 2));
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
