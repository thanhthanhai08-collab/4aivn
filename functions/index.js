/**
 * @fileoverview Cloud Functions for Firebase (v2).
 */

const { onDocumentWritten, onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { genkit } = require("genkit");
const { googleAI } = require("@genkit-ai/googleai");


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

// --- 4. AI INIT TOOL STRUCTURE (Bổ sung đầy đủ các trường dữ liệu) ---
exports.initToolStructure = onDocumentCreated(
    { 
        document: "tools/{toolId}", // Đổi thành toolId cho rõ ràng
        secrets: [GEMINI_API_KEY], 
        region: "asia-southeast1" 
    },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return null;
        const data = snapshot.data();

        const ai = genkit({
            plugins: [googleAI({ apiKey: GEMINI_API_KEY.value() })],
            model: "googleai/gemini-2.5-flash", 
        });

        try {
            const prompt = `Bạn là chuyên gia với nhiều năm kinh nghiệm phân tích các công cụ AI. Với bối cảnh mình đang tìm các trường dữ liệu của công cụ AI để đăng lên web tổng hợp các công cụ AI của mình. Hãy phân tích công cụ: "${data.name || event.params.toolId}".
            Trả về JSON Tiếng Việt gồm:
            - description: Mô tả ngắn (30 từ).
            - longDescription: Mô tả chi tiết.
            - whoIsItFor: Mảng đối tượng người dùng (đưa ra đối tượng người dùng khớp nhất với công cụ.
            - useCases: Mảng tình huống sử dụng.
            - features: Mảng 5 tính năng chính của công cụ này.
            - link: URL trang chủ chính thức (nếu biết).
            - pricingPlans: Mảng của các gói free và trả phí công cụ
            - context: Công nghệ hoặc bối cảnh.
Đây là một ví dụ để có thể bạn dễ điền các thông tin hơn   
id: 'midjourney',
    name: 'Midjourney',
    context: 'Tạo hình ảnh',
    developer: 'Midjourney',
    description: 'Midjourney là một trong những công cụ AI tạo ảnh từ văn bản (text-to-image) hàng đầu, nổi tiếng với khả năng tạo ra các tác phẩm nghệ thuật độc đáo, chi tiết và có phong cách riêng biệt. Hoạt động chủ yếu trên nền tảng Discord, Midjourney được cộng đồng sáng tạo và thiết kế ưa chuộng nhờ chất lượng hình ảnh vượt trội.',
    longDescription: '<p>Midjourney là một phòng thí nghiệm nghiên cứu độc lập và cũng là tên của công cụ AI tạo ảnh nghệ thuật từ văn bản. Ra mắt vào năm 2022, Midjourney nhanh chóng trở thành một trong những nền tảng AI tạo sinh phổ biến nhất nhờ khả năng tạo ra các hình ảnh phức tạp, chất lượng cao và có tính thẩm mỹ độc đáo.</p><p>Hoạt động hoàn toàn trên nền tảng Discord, người dùng tương tác với Midjourney thông qua các câu lệnh (prompt). Mô hình AI của Midjourney có khả năng diễn giải các mô tả tự nhiên để tạo ra bốn biến thể hình ảnh cho mỗi yêu cầu, cho phép người dùng nâng cấp (upscale) hoặc tạo thêm các biến thể từ kết quả ưng ý nhất. Với một cộng đồng sôi động và liên tục được cập nhật, Midjourney là công cụ không thể thiếu cho các nghệ sĩ, nhà thiết kế và bất kỳ ai muốn biến ý tưởng thành hình ảnh ấn tượng.</p>',
    features: [
      "Tạo ảnh nghệ thuật chất lượng cao từ mô tả văn bản.",
      "Hỗ trợ đa dạng phong cách, từ siêu thực đến tả thực.",
      "Giao diện tương tác độc đáo qua Discord.",
      "Khả năng kết hợp hình ảnh (image blending) và tinh chỉnh prompt.",
      "Tạo ra các biến thể và nâng cấp độ phân giải hình ảnh.",
      "Cộng đồng người dùng lớn và năng động."
    ],
    useCases: [
      'Sáng tạo nghệ thuật kỹ thuật số và tranh minh họa.',
      'Thiết kế concept art cho game và phim ảnh.',
      'Tạo hình ảnh cho các chiến dịch marketing và quảng cáo.',
      'Tạo nguồn cảm hứng và ý tưởng cho các dự án sáng tạo.',
      'Thiết kế bìa sách, poster, và các ấn phẩm đồ họa.'
    ],
    whoIsItFor: [
      'Nghệ sĩ kỹ thuật số',
      'Nhà thiết kế đồ họa',
      'Người làm quảng cáo & marketing',
      'Nhà phát triển game',
      'Người sáng tạo nội dung'
    ],
    pricingPlans: [
      "Gói Basic: $10/tháng, cung cấp khoảng 3.3 giờ GPU nhanh, phù hợp cho người mới bắt đầu.",
      "Gói Standard: $30/tháng, cung cấp 15 giờ GPU nhanh, lựa chọn phổ biến nhất.",
      "Gói Pro: $60/tháng, cung cấp 30 giờ GPU nhanh, dành cho người dùng chuyên nghiệp.",
      "Gói Mega: $120/tháng, cung cấp 60 giờ GPU nhanh, dành cho doanh nghiệp và người dùng có nhu cầu rất cao."
    ],
`;

            const result = await ai.generate({ 
                prompt: prompt, 
                output: { format: 'json' } 
            });
            
            const aiData = result.output;

            return snapshot.ref.set({
                // Ưu tiên dữ liệu bạn nhập thủ công, nếu trống mới dùng AI
                name: data.name || event.params.toolId,
                description: data.description || aiData.description,
                longDescription: data.longDescription || aiData.longDescription,
                whoIsItFor: data.whoIsItFor || aiData.whoIsItFor || [],
                useCases: data.useCases || aiData.useCases || [],
                features: data.features || aiData.features || [],
                link: data.link || aiData.link || "",
                logoUrl: data.logoUrl ||  "",
                imageUrl: data.imageUrl || "", // Thường là ảnh chụp màn hình app, bạn nên up tay
                pricingPlans: data.pricingPlans || aiData.pricingPlans || [],
                context: data.context || aiData.context || "",
                averageRating: 0,
                ratingCount: 0,
                developer: data.developer || "Đang cập nhật...",
            
            }, { merge: true }); // Merge để không mất dữ liệu cũ

        } catch (e) { 
            console.error("Lỗi Init Tool:", e);
        }
    }
);
