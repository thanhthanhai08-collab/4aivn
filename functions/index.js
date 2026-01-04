/**
 * @fileoverview Cloud Functions for Firebase (v2).
 */

const { onDocumentWritten, onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { genkit } = require("genkit");
const { googleAI } = require("@genkit-ai/googleai");
const { z } = require("zod");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const fs = require("fs");
const path = require("path");
const os = require("os");


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

            const rawResearchData = researchResponse.text();
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
                
                2. Truy cập URL: https://studio--clean-ai-hub.us-central1.hosted.app/tin-tuc
                   Hãy phân tích 3 bài viết đầu tiên để học tập: 
                   - Cách đặt tiêu đề (Tone of voice).
                   - Cách trình bày HTML (Style).
                   - Độ dài và cách dùng từ ngữ.

                Hãy trả về một bản tổng hợp gồm nội dung tin tức thô và các đặc điểm phong cách viết mà bạn đã học được.`,
                config: {
                    tools: [{ googleSearch: {} }, { urlContext: {} }]
                }
            });

            const rawContext = researchResponse.text();

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
                - Trả về đúng cấu trúc JSON.`,
                output: { schema: NewsOutputSchema }
            });

            if (!output) return null;

            // 3. Update Firestore
            const updatePayload = {
                title: data.title || output.title,
                content: data.content || output.content,
                summary: data.summary || output.summary,
                tag: (data.tag?.length > 0) ? data.tag : output.tag,
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

const TARGET_URL = "https://studio--clean-ai-hub.us-central1.hosted.app";

exports.chatbot = onRequest(
    { 
        secrets: [GEMINI_API_KEY], 
        region: "asia-southeast1",
        timeoutSeconds: 300 
    }, 
    async (req, res) => {
        // 1. XỬ LÝ CORS THỦ CÔNG
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.status(204).send('');
            return;
        }

        // 2. THIẾT LẬP HEADER SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        let tempFilePath = null;

        try {
            const { message, userId, imageBase64, mimeType } = req.body;
            if (!message) {
                res.write(`data: ${JSON.stringify({ error: "No message" })}\n\n`);
                res.end();
                return;
            }

            const apiKey = GEMINI_API_KEY.value();

            // 3. XỬ LÝ UPLOAD ẢNH LÊN GOOGLE FILE API (Nếu có)
            let imagePart = null;
            if (imageBase64) {
                const fileManager = new GoogleAIFileManager(apiKey);
                
                // Lưu tạm file vào thư mục /tmp của Cloud Function (RAM Disk)
                const fileName = `upload_${Date.now()}`;
                tempFilePath = path.join(os.tmpdir(), fileName);
                
                // Giải mã base64 và ghi file
                const buffer = Buffer.from(imageBase64, 'base64');
                fs.writeFileSync(tempFilePath, buffer);

                // Upload lên Google server (Tồn tại 48h miễn phí)
                const uploadResult = await fileManager.uploadFile(tempFilePath, {
                    mimeType: mimeType || "image/jpeg",
                    displayName: fileName,
                });

                imagePart = {
                    media: {
                        url: uploadResult.file.uri,
                        contentType: uploadResult.file.mimeType
                    }
                };
            }

            // 4. KHỞI TẠO GENKIT
            const ai = genkit({
                plugins: [googleAI({ apiKey: apiKey })],
            });

            // 5. LẤY LỊCH SỬ CHAT
            const historyRef = db.collection("chatbot")
                                 .doc(userId || "anonymous")
                                 .collection("messages")
                                 .orderBy("createdAt", "asc")
                                 .limitToLast(10);
            
            const historySnap = await historyRef.get();
            let historyContext = [];
            historySnap.forEach(doc => {
                const d = doc.data();
                historyContext.push({
                    role: d.role === 'user' ? 'user' : 'model',
                    content: [{ text: d.content }]
                });
            });

            // 6. CẤU TRÚC PROMPT
            let promptParts = [];
            if (imagePart) promptParts.push(imagePart);
            promptParts.push({ text: message });

            // 7. STREAMING PHẢN HỒI
            const response = await ai.generateStream({
                model: "googleai/gemini-2.0-flash",
                history: historyContext,
                prompt: promptParts,
                config: {
                    systemInstruction: `Bạn là trợ lý AI của Clean AI Hub. 
                    NHIỆM VỤ: Trả lời dựa trên thông tin tại ${TARGET_URL}.
                    QUY TẮC: Sử dụng 'urlContext'. Nếu không có thông tin, báo không tìm thấy. Không bịa đặt.`,
                    tools: [{ urlContext: {} }]
                }
            });

            let fullAIResponse = "";
            for await (const chunk of response.stream) {
                const chunkText = chunk.text();
                if (chunkText) {
                    fullAIResponse += chunkText;
                    res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
                }
            }

            // 8. LƯU LỊCH SỬ
            const msgRef = db.collection("chatbot").doc(userId || "anonymous").collection("messages");
            const batch = db.batch();
            batch.set(msgRef.doc(), {
                role: "user",
                content: message,
                hasImage: !!imagePart,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            batch.set(msgRef.doc(), {
                role: "model",
                content: fullAIResponse,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            await batch.commit();

            res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            res.end();

        } catch (error) {
            console.error("Chatbot SSE Error:", error);
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        } finally {
            // DỌN DẸP: Xóa file tạm để giải phóng RAM của Cloud Function
            if (tempFilePath && fs.existsSync(tempFilePath)) {
                try {
                    fs.unlinkSync(tempFilePath);
                } catch (e) {
                    console.error("Lỗi khi xóa file tạm:", e);
                }
            }
        }
    }
);
    

    


```>
  </change>
  <change>
    <file>/functions/package.json</file>
    <content><![CDATA[{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "lint": "eslint .",
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "22"
  },
  "main": "index.js",
  "dependencies": {
    "@genkit-ai/googleai": "^1.27.0",
    "@google/generative-ai": "^0.15.0",
    "firebase-admin": "^13.6.0",
    "firebase-functions": "^7.0.2",
    "genkit": "^1.27.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.5.0",
    "eslint": "^9.5.0",
    "eslint-config-google": "^0.14.0",
    "firebase-functions-test": "^3.3.0",
    "globals": "^15.6.0"
  },
  "private": true
}
