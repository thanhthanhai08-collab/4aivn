require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelNames = ["gemini-2.5-flash", "gemini-2.0-flash"];

function getModel(modelName) {
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });
}

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const collectionArg = process.argv.find((arg) => arg.startsWith("--collections="));
const requestedCollections = collectionArg
  ? collectionArg.split("=")[1].split(",").map((item) => item.trim()).filter(Boolean)
  : ["news", "tools", "models", "authors"];

const vietnameseChars = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
const vietnameseWords = /\b(và|của|cho|trong|với|một|những|người|công|nghệ|mô hình|bài viết|tính năng|giá|miễn phí|đang|được)\b/i;

function isMap(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function getVi(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (isMap(value)) return value.vi || value.en || "";
  return "";
}

function getEn(value) {
  if (!value) return "";
  if (typeof value === "string") return "";
  if (isMap(value)) return value.en || "";
  return "";
}

function shouldTranslate(vi, en) {
  if (!vi) return false;
  if (force) return true;
  if (!en) return true;
  if (en.trim() === vi.trim()) return true;
  return vietnameseChars.test(en) || vietnameseWords.test(en);
}

function isArrayMap(value) {
  return isMap(value) && (Array.isArray(value.vi) || Array.isArray(value.en));
}

function getViArray(value) {
  if (Array.isArray(value)) return value;
  if (isArrayMap(value)) return value.vi || value.en || [];
  return [];
}

function getEnArray(value) {
  if (isArrayMap(value)) return value.en || [];
  return [];
}

function shouldTranslateArray(vi, en) {
  if (!vi.length) return false;
  if (force) return true;
  if (!en.length) return true;
  return JSON.stringify(vi) === JSON.stringify(en) || en.some((item) => vietnameseChars.test(item) || vietnameseWords.test(item));
}

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

async function translatePayload(collectionName, docId, payload) {
  const prompt = [
    "Translate the following Vietnamese CMS fields into natural, professional English.",
    "Return JSON only, with the same keys and value shapes.",
    "Preserve HTML tags, URLs, markdown-like placeholders such as [CHART_1], [IMAGE:...], [VIDEO:...], and product/model names.",
    "Do not add explanations.",
    `Collection: ${collectionName}`,
    `Document ID: ${docId}`,
    JSON.stringify(payload),
  ].join("\n\n");

  let lastError;
  for (const modelName of modelNames) {
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const result = await getModel(modelName).generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
      } catch (error) {
        lastError = error;
        const status = error.status || error.statusCode;
        const retryable = status === 429 || status === 500 || status === 503;
        if (!retryable && attempt === 1) break;
        const waitMs = Math.min(30000, 2000 * attempt * attempt);
        console.warn(`  ${modelName} attempt ${attempt} failed (${status || "unknown"}). Retrying in ${waitMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  }
  throw lastError;
}

function addTextField(payload, updates, data, field) {
  const vi = getVi(data[field]);
  const en = getEn(data[field]);
  if (!shouldTranslate(vi, en)) return;
  payload[field] = vi;
  updates[field] = (translated) => ({ vi, en: translated[field] || en || vi });
}

function addArrayField(payload, updates, data, field) {
  const vi = getViArray(data[field]);
  const en = getEnArray(data[field]);
  if (!shouldTranslateArray(vi, en)) return;
  payload[field] = vi;
  updates[field] = (translated) => ({ vi, en: Array.isArray(translated[field]) ? translated[field] : en.length ? en : vi });
}

async function updateDocs(collectionName, buildPayload) {
  if (!requestedCollections.includes(collectionName)) return;

  const snapshot = await db.collection(collectionName).get();
  let changed = 0;
  let processed = 0;

  console.log(`\n${collectionName}: ${snapshot.size} documents`);

  for (const doc of snapshot.docs) {
    if (processed >= limit) break;
    const data = doc.data();
    const { payload, updateBuilders } = buildPayload(data);
    if (!Object.keys(payload).length) continue;

    processed++;
    console.log(`- ${doc.id}: translating ${Object.keys(payload).join(", ")}`);

    try {
      const translated = dryRun ? payload : await translatePayload(collectionName, doc.id, payload);
      const updates = {};
      for (const [field, builder] of Object.entries(updateBuilders)) {
        updates[field] = builder(translated);
      }

      if (collectionName === "news" && data.slug) {
        const viSlug = getVi(data.slug) || doc.id;
        const enSlug = getEn(data.slug);
        const titleForSlug = updates.title?.en || getEn(data.title);
        if (titleForSlug && (!enSlug || enSlug === viSlug)) {
          updates.slug = {
            vi: viSlug,
            en: slugify(titleForSlug) || enSlug || doc.id,
          };
        }
      }

      if (dryRun) {
        console.log(JSON.stringify(updates, null, 2).slice(0, 1200));
      } else {
        await doc.ref.update(updates);
        changed++;
      }
    } catch (error) {
      console.error(`  failed ${collectionName}/${doc.id}:`, error.message || error);
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
  }

  console.log(`${collectionName}: ${dryRun ? "would update" : "updated"} ${dryRun ? processed : changed} documents`);
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in .env.local");
  }

  await updateDocs("news", (data) => {
    const payload = {};
    const updateBuilders = {};
    addTextField(payload, updateBuilders, data, "title");
    addTextField(payload, updateBuilders, data, "summary");
    addTextField(payload, updateBuilders, data, "content");
    return { payload, updateBuilders };
  });

  await updateDocs("tools", (data) => {
    const payload = {};
    const updateBuilders = {};
    addTextField(payload, updateBuilders, data, "context");
    addTextField(payload, updateBuilders, data, "description");
    addTextField(payload, updateBuilders, data, "longDescription");
    addArrayField(payload, updateBuilders, data, "features");
    addArrayField(payload, updateBuilders, data, "pricingPlans");
    addArrayField(payload, updateBuilders, data, "useCases");
    addArrayField(payload, updateBuilders, data, "whoIsItFor");
    return { payload, updateBuilders };
  });

  await updateDocs("models", (data) => {
    const payload = {};
    const updateBuilders = {};
    addTextField(payload, updateBuilders, data, "description");
    return { payload, updateBuilders };
  });

  await updateDocs("authors", (data) => {
    const payload = {};
    const updateBuilders = {};
    addTextField(payload, updateBuilders, data, "bio");
    return { payload, updateBuilders };
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
