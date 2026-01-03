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
    OPENAI: "/image/models%2Flogo-open-ai.webp?alt=media",
    XAI: "/image/models%2Flogo-grok.webp?alt=media&token",
    ALIBABA: "/image/models%2Flogo-qwen.webp?alt=media&token",
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
        else if (devLower === "openai") autoLogoUrl = LOG.OPENAI;
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
            post: false, // Trường mới để kiểm soát hiển thị
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

        // 1. Khởi tạo Genkit
        const ai = genkit({
            plugins: [googleAI({ apiKey: GEMINI_API_KEY.value() })],
        });

        // 2. Định nghĩa Schema để ép kiểu dữ liệu JSON ở Bước 2
        const ToolOutputSchema = z.object({
            description: z.string().describe('Mô tả ngắn gọn khoảng 30 từ.'),
            longDescription: z.string().describe('Mô tả chi tiết bằng định dạng HTML chuyên nghiệp.'),
            features: z.array(z.string()).describe('Mảng gồm 5 tính năng nổi bật nhất.'),
            whoIsItFor: z.array(z.string()).describe('Mảng các đối tượng người dùng phù hợp.'),
            useCases: z.array(z.string()).describe('Mảng các ví dụ thực tế sử dụng công cụ.'),
            pricingPlans: z.array(z.string()).describe('Thông tin các gói giá (Free, Pro, Enterprise...).'),
            context: z.string().describe('Lĩnh vực cốt lõi (ví dụ: Productivity, Design, Coding).'),
            link: z.string().url().describe('URL trang chủ chính thức.')
        });

        try {
            /**
             * BƯỚC 1: RESEARCH PHASE (Giai đoạn nghiên cứu)
             * Mục tiêu: Cho AI đi "quét" web và tìm kiếm thông tin. 
             * KHÔNG dùng output schema ở đây để tránh lỗi 400.
             */
            console.log(`--- Đang nghiên cứu công cụ: ${data.name || event.params.toolId} ---`);
            const researchResponse = await ai.generate({
                model: "googleai/gemini-2.5-flash", // Dùng 2.5 Flash để tối ưu tốc độ và hỗ trợ Tools
                prompt: `Bạn là một chuyên gia phân tích dữ liệu AI tại 4AIVN. 
                Nhiệm vụ: Nghiên cứu kỹ thông tin về công cụ AI có tên là "${data.name || event.params.toolId}".
                
                HƯỚNG DẪN:
                1. Sử dụng "urlContext" để truy cập và đọc nội dung trực tiếp tại: ${data.link}.
                2. Sử dụng "googleSearch" để tìm thêm các thông tin về bảng giá (pricing), các đánh giá từ người dùng và các tính năng thực tế nếu trang chủ không ghi rõ.
                3. Thu thập mọi dữ liệu có thể về: Tính năng, đối tượng sử dụng, ví dụ thực tế và các mức giá chính xác như ở đường link.
                
                Hãy tổng hợp dữ liệu tìm được một cách chi tiết nhất bằng Tiếng Việt.`,
                config: {
                    tools: [
                        { googleSearch: {} }, 
                        { urlContext: {} }
                    ]
                }
            });

            const rawResearchData = researchResponse.text;
            console.log("--- Đã thu thập xong dữ liệu thô ---");

            /**
             * BƯỚC 2: FORMATTING PHASE (Giai đoạn đóng gói dữ liệu)
             * Mục tiêu: Ép dữ liệu thô vào đúng định dạng JSON để lưu Firestore.
             * KHÔNG dùng tools ở đây.
             */
            const { output } = await ai.generate({
                model: "googleai/gemini-2.5-flash",
                prompt: `Dựa vào dữ liệu nghiên cứu dưới đây, hãy viết một bài giới thiệu công cụ AI chuyên nghiệp cho website AI
                
                DỮ LIỆU NGHIÊN CỨU:
                ${rawResearchData}

                YÊU CẦU:
                - Ngôn ngữ: Tiếng Việt.
                - longDescription: Viết dưới dạng HTML (sử dụng thẻ <p>) để hiển thị đẹp trên web.
                - Trả về đúng định dạng JSON theo yêu cầu.`,
                output: { schema: ToolOutputSchema }
            });

            if (!output) {
                console.error("AI không thể format được dữ liệu.");
                return null;
            }

            /**
             * BƯỚC 3: CẬP NHẬT FIRESTORE
             * Ưu tiên giữ lại dữ liệu nếu người dùng đã nhập tay trước đó.
             */
            const updatePayload = {
                description: data.description || output.description,
                longDescription: data.longDescription || output.longDescription,
                whoIsItFor: (data.whoIsItFor && data.whoIsItFor.length > 0) ? data.whoIsItFor : output.whoIsItFor,
                useCases: (data.useCases && data.useCases.length > 0) ? data.useCases : output.useCases,
                features: (data.features && data.features.length > 0) ? data.features : output.features,
                pricingPlans: (data.pricingPlans && data.pricingPlans.length > 0) ? data.pricingPlans : output.pricingPlans,
                context: data.context || output.context,
                name: data.name || event.params.toolId,
                link: data.link || output.link,
                
                // Các trường bổ sung
                developer: data.developer || "Đang cập nhật...",
                logoUrl: data.logoUrl || "",
                imageUrl: data.imageUrl || "",
                averageRating: 0,
                ratingCount: 0,
                post: false,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            };
            
            console.log(`--- Đang lưu dữ liệu vào Firestore cho Tool: ${event.params.toolId} ---`);
            return snapshot.ref.set(updatePayload, { merge: true });

        } catch (error) {
            console.error("Lỗi nghiêm trọng trong initToolStructure:", error);
            // Bạn có thể thêm ghi chú lỗi vào chính document để theo dõi trên Firestore
            return snapshot.ref.set({ aiError: error.message }, { merge: true });
        }
    }
);


exports.initNews = onDocumentCreated(
    { 
        document: "news/{newsId}", 
        secrets: [GEMINI_API_KEY], 
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

        // 1. Định nghĩa cấu trúc cho từng phần tử trong mảng data của một biểu đồ
        const ChartDataItemSchema = z.object({
            name: z.string().describe('Tên hạng mục chính trên trục X (ví dụ: "Phân tích", "Tư duy").'),
        }).catchall(z.number().describe('Các giá trị số của các đối tượng so sánh (ví dụ: "GPT-4": 85).'));

        // 2. Định nghĩa cấu trúc cho một biểu đồ đơn lẻ
        const ChartConfigSchema = z.object({
            title: z.string().describe('Tiêu đề của biểu đồ.'),
            type: z.enum(['bar', 'pie', 'line', 'radar']).describe('Loại biểu đồ: bar, pie, line, hoặc radar.'),
            unit: z.string().describe('Đơn vị đo lường (ví dụ: %, điểm, ms).'),
            source: z.string().describe('Nguồn dữ liệu của biểu đồ.'),
            colors: z.array(z.string()).describe('Mảng mã màu Hex cho các cột/phần (ví dụ: ["#5b7ce0", "#90cd97"]).'),
            data: z.array(ChartDataItemSchema).describe('Mảng dữ liệu biểu đồ, mỗi phần tử là một object có trường "name" và các trường số liệu.')
        });

        // 3. Áp dụng vào NewsOutputSchema: `charts` là một mảng các biểu đồ
        const NewsOutputSchema = z.object({
            title: z.string().describe('Tiêu đề bài viết hấp dẫn, chuẩn SEO.'),
            content: z.string().describe('Nội dung bài viết chi tiết, định dạng HTML. Nếu cần chèn biểu đồ, hãy dùng placeholder như [CHART_1], [CHART_2] trong nội dung.'),
            summary: z.string().describe('Tóm tắt ngắn gọn bài viết (khoảng 50 từ).'),
            tag: z.array(z.string()).describe('Mảng các từ khóa liên quan đến nội dung.'),
            charts: z.array(ChartConfigSchema).optional().describe('Một mảng chứa cấu hình cho các biểu đồ sẽ được hiển thị trong bài viết.')
        });


        // 4. Định nghĩa Prompt viết bài
        const newsPrompt = ai.definePrompt({
            name: 'initNewsPrompt',
            input: { schema: z.object({ dataAiHint: z.string(), source: z.string() }) },
            output: { schema: NewsOutputSchema },
            prompt: `Bạn là một biên tập viên tin tức công nghệ tại 4AIVN. 
            Nhiệm vụ: Viết một bài báo chuyên sâu dựa trên thông tin sau:
            - Gợi ý nội dung: {{dataAiHint}}
            - Nguồn tham khảo: {{source}}
            
            Yêu cầu quan trọng:
            1. Văn phong chuyên nghiệp, lôi cuốn.
            2. Nếu nội dung có số liệu so sánh, hãy tạo dữ liệu cho một hoặc nhiều biểu đồ trong mảng "charts" để vẽ bằng Recharts.
            3. Trong phần "content", hãy đặt các placeholder như [CHART_1], [CHART_2] vào vị trí bạn muốn biểu đồ tương ứng xuất hiện. Index của biểu đồ trong mảng "charts" (bắt đầu từ 0) tương ứng với số trong placeholder (ví dụ: charts[0] tương ứng với [CHART_1]).
            4. Trả về định dạng JSON Tiếng Việt.`
        });

        try {
            const { output } = await newsPrompt({
                dataAiHint: data.dataAiHint || "Tin tức AI mới nhất",
                source: data.source || "Internet"
            });

            // 5. Ghi dữ liệu vào Firestore
            const updatePayload = {
                title: data.title || output.title,
                content: data.content || output.content,
                summary: data.summary || output.summary,
                tag: (data.tag && data.tag.length > 0) ? data.tag : output.tag,
                
                charts: data.charts || output.charts || [],

                author: data.author || "Nam",
                imageUrl: data.imageUrl || "/image/news%2Fnano-banana-pro-ra-mat.webp",
                source: data.source || "Tổng hợp",
                publishedAt: data.publishedAt || admin.firestore.FieldValue.serverTimestamp(),
                post: data.post || false
            };
            
            return snapshot.ref.set(updatePayload, { merge: true });

        } catch (error) {
            console.error("Lỗi initNews:", error);
        }
    }
);

    
