/**
 * @fileoverview Cloud Functions for Firebase (v2).
 */

const { onDocumentWritten, onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { genkit } = require("genkit");
const { googleAI } = require("@genkit-ai/google-genai");


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
        return aggregateRatings("tools", event.params.toolId);
    }
);

// Định nghĩa danh sách các Logo dựa trên nhà phát triển
const LOGOS = {
    GOOGLE: "/image/models%2Flogo-gemini.webp?alt=media&token=aa09e48b-fb33-4688-b285-d9e8901f19a7",
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
            releaseDate: data.releaseDate || admin.firestore.Timestamp.now(),
        };

        await resRef.set(modelFields, { merge: true });

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

// --- FUNCTION CHO TOOLS (Sử dụng AI) ---
exports.initToolStructure = onDocumentCreated(
    { 
        document: "tools/{toolId}",
        secrets: [GEMINI_API_KEY], 
        region: "asia-southeast1" 
    },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return null;
        const data = snapshot.data();

        // Initialize Genkit AI within the function
        const ai = genkit({
            plugins: [googleAI({ apiKey: GEMINI_API_KEY.value() })],
            model: "googleai/gemini-2.5-flash",
        });

        try {
            const prompt = `Bạn là chuyên gia với nhiều năm kinh nghiệm phân tích các công cụ AI. Với bối cảnh mình đang tìm các trường dữ liệu của công cụ AI để đăng lên web tổng hợp các công cụ AI của mình. Hãy phân tích công cụ: "${data.name || event.params.toolId}".
            Trả về JSON Tiếng Việt gồm:
            - description: Mô tả ngắn (tối đa 30 từ).
            - longDescription: Mô tả chi tiết, có thể dùng thẻ <p> và <ul><li>.
            - whoIsItFor: Mảng đối tượng người dùng (ví dụ: ['Nhà phát triển', 'Người làm marketing']).
            - useCases: Mảng các trường hợp sử dụng thực tế.
            - features: Mảng 5 tính năng chính của công cụ này.
            - link: URL trang chủ chính thức (nếu tìm thấy).
            - pricingPlans: Mảng các gói giá (free và trả phí).
            - context: Danh mục công nghệ hoặc lĩnh vực chính (ví dụ: 'Tạo hình ảnh', 'AI Agent').
            - developer: Tên công ty/tổ chức phát triển.
            
            Đây là một ví dụ để bạn tham khảo cấu trúc:
            {
              "description": "Midjourney là công cụ AI tạo ảnh từ văn bản hàng đầu, nổi tiếng với khả năng tạo ra các tác phẩm nghệ thuật độc đáo và chi tiết.",
              "longDescription": "<p>Midjourney là một phòng thí nghiệm nghiên cứu độc lập...[chi tiết hơn]</p>",
              "whoIsItFor": ["Nghệ sĩ kỹ thuật số", "Nhà thiết kế đồ họa"],
              "useCases": ["Sáng tạo nghệ thuật số", "Thiết kế concept art"],
              "features": ["Tạo ảnh nghệ thuật chất lượng cao", "Hỗ trợ đa dạng phong cách"],
              "link": "https://www.midjourney.com",
              "pricingPlans": ["Gói Basic: $10/tháng", "Gói Standard: $30/tháng"],
              "context": "Tạo hình ảnh",
              "developer": "Midjourney, Inc."
            }`;

            const { output } = await ai.generate({ 
                prompt: prompt, 
                output: { format: 'json' } 
            });
            
            const aiData = output || {};

            // Merge AI data with existing data, prioritizing user-provided data
            return snapshot.ref.set({
                name: data.name || event.params.toolId,
                description: data.description || aiData.description || "Đang cập nhật...",
                longDescription: data.longDescription || aiData.longDescription || "",
                whoIsItFor: data.whoIsItFor || aiData.whoIsItFor || [],
                useCases: data.useCases || aiData.useCases || [],
                features: data.features || aiData.features || [],
                link: data.link || aiData.link || "",
                logoUrl: data.logoUrl || "", // User must upload
                imageUrl: data.imageUrl || "", // User must upload
                pricingPlans: data.pricingPlans || aiData.pricingPlans || [],
                context: data.context || aiData.context || "Chưa phân loại",
                developer: data.developer || aiData.developer || "Đang cập nhật...",
                averageRating: 0,
                ratingCount: 0,
            }, { merge: true });

        } catch (e) { 
            console.error(`Error initializing tool ${event.params.toolId} with AI:`, e);
            // Fallback to basic initialization if AI fails
            return snapshot.ref.set({
                name: data.name || event.params.toolId,
                description: data.description || "Đang cập nhật...",
                averageRating: 0,
                ratingCount: 0,
            }, { merge: true });
        }
    }
);
