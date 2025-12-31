/**
 * @fileoverview Cloud Functions for Firebase (v2).
 */

const { onDocumentWritten, onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { genkit } = require("genkit");
const { googleAI } = require("@genkit-ai/googleai");
const { z } = require("zod");


admin.initializeApp();
const db = getFirestore();

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

// --- HÀM TÍNH RATING ---
async function aggregateRatings(collectionName, docId) {
    const parentRef = db.collection(collectionName).doc(docId);
    const ratingsRef = parentRef.collection("ratings");

    try {
        await db.runTransaction(async (transaction) => {
            const ratingsSnapshot = await transaction.get(ratingsRef);
            let totalStars = 0;
            let ratingCount = 0;

            ratingsSnapshot.forEach((doc) => {
                const data = doc.data();
                if (typeof data.starRating === 'number') {
                    totalStars += data.starRating;
                    ratingCount++;
                }
            });

            const averageRating = ratingCount > 0 ? (totalStars / ratingCount) : 0;

            transaction.update(parentRef, {
                averageRating: parseFloat(averageRating.toFixed(2)),
                ratingCount: ratingCount,
                totalStars: totalStars,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        });
        console.log(`Updated Rating for ${collectionName}/${docId}`);
    } catch (error) {
        console.error(`Rating Aggregation Error for ${collectionName}/${docId}:`, error);
    }
}

// --- HÀM MỚI: TÍNH INTELLIGENCE SCORE TỪ BENCHMARKS ---
async function aggregateIntelligence(modelId) {
    const modelRef = db.collection("models").doc(modelId);
    const benchmarksRef = modelRef.collection("benchmarks");

    try {
        await db.runTransaction(async (transaction) => {
            const snapshot = await transaction.get(benchmarksRef);
            
            let totalScore = 0;
            let benchmarkCount = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                // Find a 'score' or 'value' field of type number
                let scoreFound = false;
                if (data.score && typeof data.score === 'number') {
                    totalScore += data.score;
                    benchmarkCount++;
                    scoreFound = true;
                } else if (data.value && typeof data.value === 'number') {
                    totalScore += data.value;
                    benchmarkCount++;
                    scoreFound = true;
                }
                
                if (!scoreFound) {
                    // Fallback to scan all numeric fields if specific ones aren't found
                    Object.values(data).forEach(val => {
                        if (typeof val === 'number') {
                            totalScore += val;
                            benchmarkCount++;
                        }
                    });
                }
            });

            const intelligenceScore = benchmarkCount > 0 ? (totalScore / benchmarkCount) : 0;

            // Cập nhật lên trường intelligenceScore trong collection models
            transaction.update(modelRef, {
                intelligenceScore: Math.round(intelligenceScore)
            });
        });
        console.log(`Updated intelligenceScore for model ${modelId}`);
    } catch (error) {
        console.error(`Intelligence Aggregation Error for ${modelId}:`, error);
    }
}

/**
 * Trigger cho RATINGS (Models)
 */
exports.aggregateModelRating = onDocumentWritten(
    {
        document: "models/{modelId}/ratings/{ratingId}",
        secrets: [GEMINI_API_KEY],
        region: 'asia-southeast1',
    },
    async (event) => {
        if (!event.data) return null;
        return aggregateRatings("models", event.params.modelId);
    }
);

/**
 * Trigger MỚI cho BENCHMARKS
 * Chạy mỗi khi bạn thêm/sửa điểm số trong sub-collection benchmarks
 */
exports.aggregateModelIntelligence = onDocumentWritten(
    {
        document: "models/{modelId}/benchmarks/{benchmarkId}",
        secrets: [GEMINI_API_KEY],
        region: 'asia-southeast1',
        
    },
    async (event) => {
        if (!event.data) return null;
        return aggregateIntelligence(event.params.modelId);
    }
);

/**
 * Trigger cho RATINGS (Tools)
 * Lưu ý: Logic này giả định collection 'tools' có cấu trúc tương tự 'models'
 * với sub-collection 'ratings'.
 */
exports.aggregateToolRating = onDocumentWritten(
    {
        document: "tools/{toolId}/ratings/{ratingId}",
        secrets: [GEMINI_API_KEY],
        region: 'asia-southeast1',
    },
    async (event) => {
        if (!event.data) return null;
        // This function does not exist yet. We need to implement it based on aggregateRatings
        // For now, let's assume a similar structure and call a generic handler.
        // Re-using aggregateRatings for tools assuming the schema is the same.
        return aggregateRatings("tools", event.params.toolId);
    }
);

// Định nghĩa danh sách các Logo dựa trên nhà phát triển
const LOGOS = {
    GOOGLE: "/image/models%2Flogo-gemini.webp?alt=media",
    OPENAI: "/image/models%2Flogo-open-ai.webp?alt=media&token=21377081-d120-4680-b793-4224d7977ba6",
    XAI: "/image/models%2Flogo-grok.webp?alt=media&token=5d4df9ba-abf0-4b58-84a7-d77d48e453fb",
    ALIBABA: "/image/models%2Flogo-qwen.webp?alt=media&token=879e5e94-ecd1-44b9-9eea-65c8140ad86f",
    ANTHROPIC: "/image/models%2Flogo-claude-ai.webp?alt=media&token=340c61e7-bfcc-4eac-855a-90c0957f9143"
};

// --- FUNCTION CHO MODELS ---
exports.initModelStructure = onDocumentCreated(
    { document: "models/{id}", region: "asia-southeast1" },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return null;

        const resRef = snapshot.ref;
        const data = snapshot.data();
        const dev = data.developer || "";
        const devLower = dev.toLowerCase();

        // Logic tự động gán Logo dựa trên Developer (Thêm Anthropic)
        let autoLogoUrl = data.logoUrl || "";
        if (devLower === "google") autoLogoUrl = LOGOS.GOOGLE;
        else if (devLower === "openai") autoLogoUrl = LOGOS.OPENAI;
        else if (devLower === "xai") autoLogoUrl = LOGOS.XAI;
        else if (devLower === "alibaba") autoLogoUrl = LOGOS.ALIBABA;
        else if (devLower === "anthropic") autoLogoUrl = LOGOS.ANTHROPIC;

        const modelFields = {
            averageRating: 0,
            ratingCount: 0,
            intelligenceScore: 0,
            contextLengthToken: 0,
            latencyFirstChunkSeconds: 0,
            pricePerMillionTokens: 0,
            speedTokensPerSecond: 0,
            description: data.description || "Đang cập nhật...",
            developer: dev || "Đang cập nhật...",
            logoUrl: autoLogoUrl,
            name: data.name || event.params.id,
            type: data.type || "LLM",
            multimodal: data.multimodal || false,
            releaseDate: data.releaseDate || admin.firestore.FieldValue.serverTimestamp(),
        };

        await resRef.set(modelFields, { merge: true });

        // Khởi tạo Sub-collection 'benchmarks'
        const benchmarks = [
            { id: "aa-lcr", name: "AA-LCR" },
            { id: "agentic-coding", name: "Agentic Coding" },
            { id: "agentic-tool-use", name: "Agentic Tool Use" },
            { id: "aime-2025", name: "AIME 2025" },
            { id: "gpqa-diamond", name: "GPQA Diamond" },
            { id: "humanitys-last-exam", name: "Humanity's Last Exam" },
            { id: "ifbench", name: "IFBench" },
            { id: "livecodebench", name: "LiveCodeBench" },
            { id: "mmlu-pro", name: "MMLU Pro" },
            { id: "scicode", name: "SciCode" }
        ];

        const batch = db.batch();
        benchmarks.forEach((bm) => {
            const bmRef = resRef.collection("benchmarks").doc(bm.id);
            batch.set(bmRef, {
                name: bm.name,
                score: 0
            });
        });

        return batch.commit();
    }
);


// 1. Định nghĩa Output Schema chuẩn như Flow Frontend của bạn
const ToolOutputSchema = z.object({
    description: z.string().describe('Mô tả ngắn gọn 30 từ về công cụ.'),
    longDescription: z.string().describe('Mô tả chi tiết bằng HTML, lôi cuốn người dùng.'),
    features: z.array(z.string()).describe('Danh sách 5 tính năng nổi bật.'),
    whoIsItFor: z.array(z.string()).describe('Những ai nên dùng công cụ này.'),
    useCases: z.array(z.string()).describe('Ví dụ thực tế khi sử dụng.'),
    pricingPlans: z.array(z.string()).describe('Các gói giá (Free, Pro, v.v.).'),
    context: z.string().describe('Lĩnh vực cốt lõi (ví dụ: Coding, Art, Marketing).'),
    link: z.string().url().describe('Đảm bảo link trang chủ chính xác.')
});

// 3. Cloud Function
exports.initToolStructure = onDocumentCreated(
    { 
        document: "tools/{toolId}", 
        secrets: ["GEMINI_API_KEY"], 
        region: "asia-southeast1" 
    },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return null;
        const data = snapshot.data();

        const ai = genkit({
            plugins: [googleAI({ apiKey: GEMINI_API_KEY.value() })],
            model: "googleai/gemini-3-flash-preview", 
        });

        // 2. Định nghĩa Prompt chuyên sâu (Dùng kỹ thuật Few-shot hoặc Contextual Prompting)
        const toolPrompt = ai.definePrompt({
            name: 'generateAiToolDescriptionPrompt',
            input: { schema: z.object({ name: z.string(), context: z.string(), link: z.string() }) },
            output: { schema: ToolOutputSchema },
            prompt: `Bạn là một chuyên gia phân tích phần mềm AI.
Nhiệm vụ: Phân tích và viết nội dung cho công cụ AI sau:
- Tên: {{name}}
- Lĩnh vực: {{context}}
- URL tham khảo: {{link}}

Yêu cầu:
1. Nếu bạn biết về công cụ này, hãy viết dựa trên dữ liệu thật.
2. Nếu công cụ mới, hãy suy luận từ URL và Tên để đưa ra mô tả hợp lý nhất.
3. Trả về nội dung hoàn toàn bằng Tiếng Việt, chuyên nghiệp.
4. Link phải được giữ nguyên hoặc sửa lại cho đúng domain chính thức.`
        });

        try {
            // Chạy Prompt với Schema Validation
            const { output } = await toolPrompt({
                name: data.name || event.params.toolId,
                context: data.context || "Công cụ AI mới",
                link: data.link || ""
            });

            if (!output) {
                console.error("AI did not return a valid output.");
                return;
            }

            // Cập nhật Firestore
            const updatePayload = {
                // Các trường được AI điền
                description: data.description || output.description,
                longDescription: data.longDescription || output.longDescription,
                whoIsItFor: data.whoIsItFor && data.whoIsItFor.length > 0 ? data.whoIsItFor : output.whoIsItFor,
                useCases: data.useCases && data.useCases.length > 0 ? data.useCases : output.useCases,
                features: data.features && data.features.length > 0 ? data.features : output.features,
                pricingPlans: data.pricingPlans && data.pricingPlans.length > 0 ? data.pricingPlans : output.pricingPlans,
                context: data.context || output.context,
                
                // Các trường ưu tiên dữ liệu nhập tay hoặc mặc định
                name: data.name || event.params.toolId,
                link: data.link || output.link,
                developer: data.developer || "Đang cập nhật...",
                logoUrl: data.logoUrl || "",
                imageUrl: data.imageUrl || "",

                // Các trường khởi tạo
                averageRating: 0,
                ratingCount: 0,
            };
            
            return snapshot.ref.set(updatePayload, { merge: true });

        } catch (error) {
            console.error("Lỗi thực thi Genkit Flow:", error);
        }
    }
);
