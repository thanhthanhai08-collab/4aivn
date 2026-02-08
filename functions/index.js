/**
 * @fileoverview Cloud Functions for Firebase (v2).
 */

const { onDocumentWritten, onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const { genkit } = require("genkit");
const { googleAI } = require("@genkit-ai/googleai");
const { z } = require("zod");
const { Index } = require("flexsearch");
const mammoth = require("mammoth");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const os = require("os");
const fs = require("fs").promises;
const path = require("path");


admin.initializeApp();
const db = getFirestore();
const storage = getStorage();

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

// --- HÀM TÍNH INTELLIGENCE SCORE THEO CÔNG THỨC TRỌNG SỐ ---
async function aggregateIntelligence(modelId) {
    const modelRef = db.collection("models").doc(modelId);
    const benchmarksRef = modelRef.collection("benchmarks");

    // 1. Định nghĩa bảng trọng số (Tổng = 100%)
    const WEIGHTS = {
        'gdpval-aa': 16.7,
        'agentic-tool-use': 8.3,
        'agentic-coding': 16.7,
        'scicode': 8.3,
        'aa-lcr': 6.25,
        'aa-omniscience': 12.5,
        'ifbench': 6.25,
        'humanitys-last-exam': 12.5,
        'gpqa-diamond': 6.25,
        'critpt': 6.25
    };

    try {
        await db.runTransaction(async (transaction) => {
            const snapshot = await transaction.get(benchmarksRef);
            
            let weightedScore = 0;
            let foundBenchmarks = []; // Để log xem đã tìm thấy những bài test nào

            snapshot.forEach((doc) => {
                const data = doc.data();
                const docId = doc.id; // Giả sử Document ID là tên benchmark (ví dụ: 'gdpval-AA')
                
                // Chuẩn hóa key để tránh lỗi chữ hoa/thường (nếu cần)
                // Hoặc kiểm tra thêm trường 'slug' nếu Document ID là random
                const benchmarkKey = Object.keys(WEIGHTS).find(key => 
                    key === docId || key === data.slug
                );

                // Chỉ tính nếu benchmark này nằm trong danh sách trọng số VÀ có điểm số hợp lệ
                if (benchmarkKey && typeof data.score === 'number') {
                    const weight = WEIGHTS[benchmarkKey];
                    
                    // Công thức: Điểm * (Phần trăm / 100)
                    const contribution = data.score * (weight / 100);
                    
                    weightedScore += contribution;
                    foundBenchmarks.push(`${benchmarkKey} (${data.score})`);
                }
            });

            // Làm tròn thành số nguyên
            const finalScore = Math.round(weightedScore);

            // Cập nhật kết quả vào model
            transaction.update(modelRef, {
                intelligenceScore: finalScore
            });
        });
        
        console.log(`Updated Intelligence for ${modelId}: ${weightedScore}`);
        
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
    GOOGLE: "/image/models%2Flogo-gemini.webp",
    OPENAI: "/image/models%2Flogo-open-ai.webp",
    XAI: "/image/models%2Flogo-grok.webp",
    ALIBABA: "/image/models%2Flogo-qwen.webp",
    ANTHROPIC: "/image/models%2Flogo-claude-ai.webp"
};

// --- FUNCTION CHO MODELS ---
exports.initModelStructure = onDocumentCreated(
    { 
        document: "models/{modelId}", 
        secrets: ["GEMINI_API_KEY"], 
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

        // 2. Định nghĩa Schema rút gọn (Chỉ lấy Description, Date, Context)
        const SimpleModelOutputSchema = z.object({
            description: z.string().describe('Mô tả về model khoảng 3-5 dòng, tập trung vào khả năng nổi bật.'),
            contextLengthToken: z.number().describe('Độ dài ngữ cảnh (Context Window) tính bằng Token. Nếu không tìm thấy trả về 0.'),
            releaseDateString: z.string().describe('Ngày ra mắt định dạng "YYYY-MM-DD". Nếu không tìm thấy trả về rỗng.')
        });

        try {
            /**
             * BƯỚC 1: RESEARCH PHASE (Chỉ tìm thông tin cơ bản)
             */
            console.log(`--- Đang tìm thông tin cơ bản cho Model: ${data.name || event.params.modelId} ---`);
            const researchResponse = await ai.generate({
                model: "googleai/gemini-2.5-flash", 
                prompt: `Bạn là chuyên gia AI. Hãy tìm thông tin cơ bản cho model "${data.name || event.params.modelId}".
                
                HƯỚNG DẪN:
                1. Truy cập link nguồn: ${data.source} nếu không có thông tin hãy tìm bên ngoài link.
                2. Tìm 2 thông tin duy nhất: 
                   - Mô tả ngắn (3-5 dòng).
                   - Context Window (bao nhiêu tokens) để dạng số nguyên không có dấu chấm phẩy.
                3. KHÔNG cần tìm điểm benchmarks hay giá tiền.
                4. Thông tin về ngày ra mắt (Release Date) tìm ở bên ngoài không được tìm ở link nguồn.
                Trả lời tất cả bằng tiếng Việt.`,
                config: {
                    tools: [
                        { googleSearch: {} }, 
                        { urlContext: {} }
                    ]
                }
            });

            const rawResearchData = researchResponse.text;
	        console.log("---------- DEBUG: DỮ LIỆU THÔ TỪ GEMINI ----------"); 
            console.log(rawResearchData); 

            /**
             * BƯỚC 2: FORMATTING PHASE
             */
            const { output } = await ai.generate({
                model: "googleai/gemini-2.5-flash",
                prompt: `Trích xuất thông tin từ dữ liệu sau: ${rawResearchData}`,
                output: { schema: SimpleModelOutputSchema }
            });

            if (!output) throw new Error("AI không thể định dạng dữ liệu.");

            /**
             * BƯỚC 3: XỬ LÝ DỮ LIỆU VÀ CẬP NHẬT FIRESTORE
             */
            
            // Xử lý Ngày ra mắt (Chuyển String sang Firestore Timestamp)
            let releaseDateTimestamp = admin.firestore.FieldValue.serverTimestamp();
            if (output.releaseDateString) {
                const parsedDate = new Date(output.releaseDateString);
                if (!isNaN(parsedDate)) {
                    releaseDateTimestamp = admin.firestore.Timestamp.fromDate(parsedDate);
                }
            }

            // Xử lý Logo
            const dev = data.developer || "";
            let autoLogoUrl = data.logoUrl || "";
            if (LOGOS[dev.toUpperCase()]) autoLogoUrl = LOGOS[dev.toUpperCase()];

            // Chuẩn bị dữ liệu Update (Các số liệu kỹ thuật khác auto = 0)
            const modelUpdate = {
                name: data.name || event.params.modelId,
                developer: data.developer || "Đang cập nhật...",
                type: data.type || "Mô hình ngôn ngữ lớn",
                multimodal: data.multimodal || true,
                post: false, // Luôn bắt đầu với false
                
                // Dữ liệu từ AI
                description: output.description || "Đang cập nhật...",
                contextLengthToken: output.contextLengthToken || 0,
                releaseDate: releaseDateTimestamp,

                // Các chỉ số kỹ thuật mặc định là 0
                intelligenceScore: 0,
                latencyFirstChunkSeconds: 0,
                pricePerMillionTokens: 0,
                speedTokensPerSecond: 0,
                averageRating: 0,
                ratingCount: 0,
                totalStars: 0,
                
                logoUrl: autoLogoUrl,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
                
            };

            const batch = db.batch();
            
            // Cập nhật Main Document
            batch.set(snapshot.ref, modelUpdate, { merge: true });

            // Danh sách Benchmarks (Chỉ tạo khung, điểm số = 0)
            const benchmarkList = [
                { id: "aa-lcr", name: "AA-LCR" },
                { id: "agentic-coding", name: "Agentic Coding" },
                { id: "agentic-tool-use", name: "Agentic Tool Use" },
                { id: "aa-omniscience", name: "AA-Omniscience" },
                { id: "gpqa-diamond", name: "GPQA Diamond" },
                { id: "humanitys-last-exam", name: "Humanity's Last Exam" },
                { id: "ifbench", name: "IFBench" },
                { id: "gdpval-aa", name: "GDPval-AA" },
                { id: "critpt", name: "CritPt" },
                { id: "scicode", name: "SciCode" }
            ];

            // Vòng lặp tạo Sub-collection với score = 0
            benchmarkList.forEach((bm) => {
                const bmRef = snapshot.ref.collection("benchmarks").doc(bm.id);
                batch.set(bmRef, {
                    name: bm.name,
                    score: 0 // Mặc định là 0 theo yêu cầu
                });
            });

            console.log(`--- Hoàn tất khởi tạo (Basic Info Only) cho Model: ${event.params.modelId} ---`);
            return batch.commit();

        } catch (error) {
            console.error("Lỗi initModelStructure:", error);
            // Ghi lỗi vào document để debug
            return snapshot.ref.set({ 
                aiError: error.message,
                description: "Lỗi khi lấy dữ liệu tự động." 
            }, { merge: true });
        }
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
        });

        // 1. Schemas (Giữ nguyên)
        const ChartDataItemSchema = z.object({
            name: z.string()
        }).catchall(z.number());

        const ChartConfigSchema = z.object({
            title: z.string(),
            type: z.enum(['bar', 'pie', 'line', 'radar']),
            unit: z.string(),
            source: z.string(),
            colors: z.array(z.string()),
            data: z.array(ChartDataItemSchema)
        });

        const NewsOutputSchema = z.object({
            title: z.string(),
            content: z.string(),
            summary: z.string(),
            tag: z.array(z.string()),
            charts: z.array(ChartConfigSchema).optional()
        });

        try {
            /**
             * BƯỚC 1: RESEARCH & STYLE ANALYSIS
             */
            console.log(`--- Đang nghiên cứu tin tức và phân tích phong cách ---`);
            
            const researchResponse = await ai.generate({
                model: "googleai/gemini-2.5-flash",
                prompt: `Nhiệm vụ của bạn gồm 2 phần:
                1. Đọc nội dung tin tức từ các nguồn: ${data.source}, ${data.source1 || ''}, ${data.source2 || ''}. 
                   Nếu thiếu thông tin hãy tìm thêm trên Google Search về: "${data.dataAiHint}".
                
                2. Truy cập URL: https://4aivn.com/tin-tuc
                   Hãy phân tích 3 bài viết đầu tiên để học tập: 
                   - Cách đặt tiêu đề (Tone of voice).
                   - Cách trình bày HTML (Style).
                   - Độ dài và cách dùng từ ngữ.

                Hãy trả về một bản tổng hợp gồm nội dung tin tức thô và các đặc điểm phong cách viết mà bạn đã học được.`,
                config: {
                    tools: [{ googleSearch: {} }, { urlContext: {} }]
                }
            });

            const rawContext = researchResponse.text;

            /**
             * BƯỚC 2: WRITING (JSON MODE)
             */
            const { output } = await ai.generate({
                model: "googleai/gemini-2.5-flash",
                prompt: `Dựa trên dữ liệu và phong cách viết bạn vừa phân tích được:
                
                DỮ LIỆU: 
                ${rawContext}
                
                YÊU CẦU:
                - Viết một bài báo mới hoàn chỉnh về "${data.dataAiHint}".
                - Phải bắt chước hoàn toàn Tone of Voice và cách trình bày HTML của 4AIVN mà bạn đã thấy ở bước 1.
                - Tiêu đề phải giật gân nhưng chuyên nghiệp.
                - Phần content phải trả về đúng dịnh dạng HTML với thẻ <h2>,<h3>,...<p>, <ul>.
                - Nếu có biểu đồ thì thêm thẻ [CHART_1,[CHART_2] cho đúng thứ tự.
                - Trả về đúng cấu trúc JSON.`,
                output: { schema: NewsOutputSchema }
            });

            if (!output) return null;

            // 3. Update Firestore
            const defaultCategory = [{ 
                id: "xu-huong", 
                name: "Xu hướng" 
            }];
            
            const updatePayload = {
                title: data.title || output.title,
                content: data.content || output.content,
                summary: data.summary || output.summary,
                tag: (data.tag?.length > 0) ? data.tag : output.tag,
                category: data.category || defaultCategory,
                charts: data.charts || output.charts || [],
                author: data.author || "Nam",
                imageUrl: data.imageUrl || "/image/news%2Fnano-banana-pro-ra-mat.webp",
                source: data.source || "Tổng hợp",
                publishedAt: data.publishedAt || admin.firestore.FieldValue.serverTimestamp(),
                post: false
            };
            
            return snapshot.ref.set(updatePayload, { merge: true });

        } catch (error) {
            console.error("Lỗi initNews:", error);
            return snapshot.ref.set({ aiError: error.message }, { merge: true });
        }
    }
);

// --- CẤU HÌNH SEARCH ---
const FRESH_DURATION = 1000 * 60 * 30; // 30 phút
const WEBHOOK_KEY = "key_bi_mat_4aivn"; // Thay đổi mã này để bảo mật

// --- BIẾN TOÀN CỤC (Lưu trên RAM) ---
let cache = {
  data: [],
  index: null,
  timestamp: 0
};
let refreshPromise = null;

/**
 * Helper: Cập nhật dữ liệu từ Firestore vào RAM
 */
async function refreshData() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      console.log("FIRESTORE: Đang lấy dữ liệu tin tức mới nhất...");
      
      // 1. CHỈNH SỬA QUERY: Thêm field 'publishedAt' và 'imageUrl'
      const snapshot = await db.collection("news")
        .where("post", "==", true)
        .select("title", "summary", "publishedAt", "imageUrl") 
        .get();

      const newData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title,
            summary: data.summary,
            imageUrl: data.imageUrl || null, // Nếu không có ảnh thì trả về null
            // 2. XỬ LÝ NGÀY THÁNG AN TOÀN (Fix lỗi Invalid Date)
            publishedAt: data.publishedAt 
                ? data.publishedAt.toDate().toISOString() 
                : new Date().toISOString() // Fallback nếu quên nhập ngày
        };
      });

      const newIndex = new Index({ tokenize: "full", resolution: 9 });
      newData.forEach(item => {
        // Chỉ index Title và Summary để tìm kiếm (không index URL ảnh)
        newIndex.add(item.id, `${item.title} ${item.summary}`);
      });

      cache = {
        data: newData,
        index: newIndex,
        timestamp: Date.now()
      };
      console.log("CACHE: Đã làm mới chỉ mục tìm kiếm.");
    } catch (e) {
      console.error("Lỗi refreshData:", e);
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * 1. API SEARCH NEWS (Có tích hợp Webhook Refresh)
 */
exports.searchNews = onRequest({ 
  region: "asia-southeast1",
  maxInstances: 5 
}, async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }

  const queryParam = (req.query.q || "").trim();
  // Kiểm tra nếu có lệnh ép làm mới từ Trigger
  const isForceRefresh = req.query.refresh_key === WEBHOOK_KEY;

  try {
    const now = Date.now();
    const needsInitialLoad = !cache.index;
    const isExpired = now - cache.timestamp > FRESH_DURATION;

    // Nếu ép làm mới hoặc lần đầu tiên: Đợi lấy dữ liệu xong mới chạy tiếp
    if (isForceRefresh || needsInitialLoad) {
      await refreshData();
      if (isForceRefresh && !queryParam) {
        return res.status(200).json({ message: "Dữ liệu đã được cập nhật đồng bộ!" });
      }
    } 
    // Nếu chỉ hết hạn 30 phút: Cập nhật ngầm, trả kết quả cũ trước
    else if (isExpired) {
      refreshData(); 
    }

    if (!queryParam) {
      return res.status(200).json({ results: [] });
    }

    if (cache.index) {
      const resultsIds = cache.index.search(queryParam, { limit: 12 });
      const results = cache.data.filter(item => resultsIds.includes(item.id));
      
      res.status(200).json({ 
        results,
        total: results.length,
        cachedAt: new Date(cache.timestamp).toISOString() 
      });
    } else {
      res.status(500).json({ error: "Search Index chưa sẵn sàng" });
    }
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
});


/**
 * 2. TRIGGER: Tự động phát hiện khi bài viết được chuyển từ false -> true
 */
exports.onNewsPublished = onDocumentUpdated("news/{postId}", async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
  
    // Kiểm tra điều kiện: trước đó false/không có, sau đó là true
    if (before?.post !== true && after?.post === true) {
      console.log(`Phát hiện bài viết mới xuất bản: ${event.params.postId}`);
      
      // Gọi Webhook đến chính hàm searchNews để ép nạp lại cache
      const functionUrl = `https://asia-southeast1-clean-ai-hub.cloudfunctions.net/searchNews?refresh_key=${WEBHOOK_KEY}`;
      
      try {
        const response = await fetch(functionUrl);
        if (response.ok) {
          console.log("Kích hoạt làm mới cache tìm kiếm thành công.");
        } else {
            const errorText = await response.text();
            console.error(`Lỗi khi kích hoạt Webhook: ${response.status}`, errorText);
        }
      } catch (err) {
        console.error("Lỗi mạng khi gọi Webhook:", err);
      }
    }
});


const TARGET_URLS = [
    "https://4aivn.com/cong-cu",
    "https://4aivn.com/bang-xep-hang",
    "https://4aivn.com/tin-tuc"
];
const GREETINGS = ['chào', 'hi', 'hello', 'chào bạn', 'xin chào'];

// Khởi tạo một lần để tái sử dụng
let chatbotAI;
let fileManager;

exports.chatbot = onRequest(
    { 
        secrets: [GEMINI_API_KEY], 
        region: "asia-southeast1",
        timeoutSeconds: 300,
        memory: "512MiB",
        maxInstances: 6
    }, 
    async (req, res) => {
        // --- CẤU HÌNH HEADER & SSE ---
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
        
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        try {
            const { message, userId, messagesId, attachment } = req.body;
            
            if (!message && !attachment) {
                res.write(`data: ${JSON.stringify({ error: "Thiếu thông tin đầu vào" })}\n\n`);
                res.end();
                return;
            }
            const userMessage = message || "Mô tả tệp đính kèm này.";

            // --- LỌC CHÀO HỎI ---
            if (GREETINGS.includes(userMessage.toLowerCase().trim()) && !attachment) {
                 res.write(`data: ${JSON.stringify({ text: "Chào bạn, tôi có thể giúp gì cho bạn?" })}\n\n`);
                 res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
                 res.end();
                 return;
            }

            const apiKey = GEMINI_API_KEY.value();

            // --- KHỞI TẠO API (CACHE) ---
            if (!chatbotAI) {
                chatbotAI = genkit({ plugins: [googleAI({ apiKey })] });
            }
            if (!fileManager) {
                fileManager = new GoogleAIFileManager(apiKey);
            }

            // --- LẤY LỊCH SỬ CHAT ---
            const historyRef = db.collection("chatbot").doc(userId).collection("messages").doc(messagesId).collection("history");
            const historySnapshot = await historyRef.orderBy("timestamp", "asc").limit(10).get();
            const historyContext = historySnapshot.docs.map(doc => ({
                role: doc.data().role,
                parts: doc.data().parts
            }));

            // --- XỬ LÝ FILE ---
            let attachmentForFirestore = null;
            const promptParts = [{ text: userMessage }];
            const bucket = storage.bucket("gs://clean-ai-hub.firebasestorage.app");

            if (attachment && attachment.path && attachment.mimeType) {
                const file = bucket.file(attachment.path);
                const [fileBuffer] = await file.download();

                if (attachment.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    // Xử lý DOCX với mammoth
                    const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
                    promptParts[0].text += `\n\n--- Nội dung từ tài liệu ---\n${value}`;
                } else {
                    // Xử lý Ảnh/PDF với Gemini File API
                    const tempFilePath = path.join(os.tmpdir(), attachment.fileName || 'upload');
                    await fs.writeFile(tempFilePath, fileBuffer);
                    
                    const uploadResult = await fileManager.uploadFile(tempFilePath, {
                        mimeType: attachment.mimeType,
                        displayName: attachment.fileName,
                    });

                    await fs.unlink(tempFilePath); // Dọn dẹp file tạm

                    // Đính kèm file đã upload vào prompt
                    promptParts.push({ 
                        media: { 
                            url: uploadResult.file.uri, 
                            contentType: attachment.mimeType 
                        } 
                    });
                }
                
                attachmentForFirestore = {
                    name: attachment.fileName || 'upload',
                    mimeType: attachment.mimeType,
                    path: attachment.path,
                };
            }
            
            // --- GỌI AI ---
            const response = await chatbotAI.generateStream({
                model: "googleai/gemini-2.5-flash",
                history: historyContext,
                prompt: promptParts,
                systemInstruction: `Bạn là trợ lý AI của Clean AI Hub. 
                  Nhiệm vụ:
                  1. Ưu tiên tra cứu và trả lời dựa trên thông tin từ các liên kết nội bộ sau: ${TARGET_URLS.join(', ')}.
                  2. Nếu câu hỏi không liên quan đến AI, công nghệ, hoặc nội dung trên các trang web đó, hãy lịch sự trả lời "Câu hỏi này không liên quan đến chuyên môn của tôi." và không sử dụng các công cụ khác.
                  3. Với các câu hỏi khác, sử dụng Google Search để tìm thông tin bổ sung. Luôn trích dẫn nguồn nếu dùng Google Search.
                  4. Luôn trả lời bằng tiếng Việt.`,
                config: { tools: [{ urlContext: {} }, { googleSearch: {} }] }
            });

            // --- STREAMING & LƯU TRỮ ---
            let fullAIResponse = "";
            for await (const chunk of response.stream) {
                const text = chunk.text || "";
                if (text) {
                    fullAIResponse += text;
                    res.write(`data: ${JSON.stringify({ text })}\n\n`);
                }
            }

            const finalResponse = await response.response;
            const groundingMetadata = finalResponse.custom?.groundingMetadata || finalResponse.candidates?.[0]?.groundingMetadata;
            let urlMetadataStructured = null;
             if (groundingMetadata && groundingMetadata.groundingChunks) {
                const mappedUrls = groundingMetadata.groundingChunks
                    .filter(chunk => chunk.web && chunk.web.uri)
                    .map(chunk => ({
                        retrieved_url: chunk.web.uri,
                        url_retrieval_status: "URL_RETRIEVAL_STATUS_SUCCESS",
                        title: chunk.web.title || ""
                    }));
                if (mappedUrls.length > 0) urlMetadataStructured = { url_metadata: mappedUrls };
            }

            // Lưu vào sub-collection
            try {
                const now = Date.now();
                const userHistoryDoc = {
                    role: 'user',
                    parts: promptParts.filter(p => p.text), // Chỉ lưu phần text, loại bỏ object media không thể tuần tự hóa
                    timestamp: admin.firestore.Timestamp.fromMillis(now),
                };
    
                if (attachmentForFirestore) {
                    const bucketName = "clean-ai-hub.firebasestorage.app";
                    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(attachmentForFirestore.path)}?alt=media`;
                    attachmentForFirestore.url = publicUrl;
                    userHistoryDoc.attachments = [attachmentForFirestore];
                }
    
                 const modelHistoryDoc = {
                    role: 'model',
                    parts: [{ text: fullAIResponse }],
                    url_context_metadata: urlMetadataStructured || null,
                    timestamp: admin.firestore.Timestamp.fromMillis(now + 100),
                };
    
                const messagesDocRef = db.collection("chatbot").doc(userId).collection("messages").doc(messagesId);
                const batch = db.batch();

                // Sử dụng ID tự tạo dựa trên thời gian để Firestore sắp xếp mặc định theo ID luôn
                batch.set(historyRef.doc(`${now}_user`), userHistoryDoc);
                batch.set(historyRef.doc(`${now + 100}_model`), modelHistoryDoc);

                // Cập nhật Document cha (cái này vẫn dùng serverTimestamp để biết lần cuối tương tác)
                batch.set(messagesDocRef, { 
                    updatedAt: admin.firestore.FieldValue.serverTimestamp() 
                }, { merge: true });

                await batch.commit();

            } catch (dbError) {
                console.error("Firestore batch commit failed:", dbError);
                // Không cần gửi lỗi lại cho client vì họ đã nhận được phản hồi AI
            }

            res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            res.end();

        } catch (error) {
            console.error("Chatbot Error:", error);
            const errorMessage = (error.status === 429 || (error.message && error.message.includes('429')))
                ? { error: "QUOTA_EXCEEDED", message: "Hệ thống đang quá tải. Vui lòng thử lại sau 1 phút.", status: 429 }
                : { error: "GENERAL_ERROR", message: "Có lỗi xảy ra khi kết nối với AI." };
            res.write(`data: ${JSON.stringify(errorMessage)}\n\n`);
            res.end();
        }
    }
);
    


    




    

    



    

    

    
