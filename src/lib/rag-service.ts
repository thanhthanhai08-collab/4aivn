'use server';

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';

// =================================================================================
// IMPORTANT: Document Content
// =================================================================================
// Since I cannot access external Google Docs directly for security reasons,
// I've added this placeholder content.
//
// PLEASE REPLACE THE ENTIRE CONTENT of this `documentContent` variable with the
// text from your Google Doc (ID: 1D2Qha-X4kIdq9BwOGIGU3ZCFJcrssFdT56AwAFM7_yM).
const documentContent = `GPT Image 1 là mô hình tạo, chỉnh sửa hình ảnh do OpenAI phát triển nội bộ, chính thức được ra mắt vào tháng 5 năm 2024 được tích hợp sẵn vào model GPT-4o không giống như DALL·E là một model riêng, GPT Image 1 được xây dựng hoàn toàn mới, với mục tiêu tạo ra hình ảnh thực tế, logic và mạch lạc với văn bản đầu vào(prompt).
+ Vì được tích hợp sâu với GPT 4o cho nên GPT Image 1 hoàn toàn có thể hiểu ngữ cảnh hội thoại đưa ra hình ảnh phù hợp với yêu cầu chi tiết. Hoặc mọi người có thể sử dụng tùy chỉnh GPT Image 1 thông qua API.
+ Hỗ trợ tất cả các kiểu tạo hình ảnh đó là tạo hình ảnh từ hình ảnh, tạo hình ảnh từ mô tả, chỉnh sửa hình ảnh từ hình ảnh, chỉnh sửa hình ảnh từ mô tả
+ Đặc biệt là có thể tạo nhân vật và hành động nhất quán với mô tả và một điểm cộng nữa là chữ trên hình ảnh tiếng Anh thì cực kì chính xác còn tiếng Việt thì độ chuẩn xác chỉ tầm 50%.
+ Đến hiện tại thì GPT Image chỉ hỗ trợ 3 loại kích thước ảnh giống như ở phần chi phí. Còn về chi phí tạo ảnh là: 
• Chất lượng LOW thì ảnh 1024x1024 (0.011 USD/1 ảnh) ảnh 1024x1536 (0.016 USD/1 ảnh) ảnh 1536x1024 (0.016 USD/1 ảnh).
• Chất lượng Medium thì ảnh 1024x1024 (0.042 USD/1 ảnh) ảnh 1024x1536 (0.063 USD/1 ảnh) ảnh 1536x1024 (0.063 USD/1 ảnh).
• Chất lượng High thì ảnh 1024x1024 (0.167 USD/1 ảnh) ảnh 1024x1536 (0.25 USD/1 ảnh) ảnh 1536x1024 (0.25 USD/1 ảnh).
Sau đó chi phí chỉnh sửa ảnh là:
• Chi phí phân tích ảnh đầu vào 10 USD/ 1M token.
• Nếu đã có ảnh lưu bộ nhớ  2.5 USD/ 1M token.
• Chi phí tạo ảnh đầu ra  40 USD/ 1M token
Mô hình tạo hình ảnh từ văn bản thế hệ mới nhất của Google, nổi tiếng với khả năng tạo ra hình ảnh quang học giống y như thật mà lại còn có tùy chọn 2k tất cả từ kết cấu vải, giọt nước, lông thú,.. đều đủ chi tiết và chiều sâu. Imagen 4 còn có tùy chọn tốc độ nhanh hơn 10 lần Imagen 3 thật là khủng khiếp.
+ Đặc biệt Imagen 4 có khả năng hiển thị chữ viết trên ảnh cực kì chính xác, rõ ràng hoàn toàn có thể so với GPT Image 1 tốt hơn hẳn Imagen 3 với tiếng Anh còn tiếng Việt theo như mình đánh giá mới chỉ mức 60%
+ Hỗ trợ tất cả các kiểu tạo hình ảnh đó là tạo hình ảnh từ hình ảnh, tạo hình ảnh từ mô tả, chỉnh sửa hình ảnh từ hình ảnh, chỉnh sửa hình ảnh từ mô tả.
+ Người dùng có thể tạo ảnh với nhiều khung hình khác nhau như 16:9 hoặc 9:16 hoặc 1:1 hoặc 2:3 và nhiều phong cách khác nhau từ siêu thực đến trừu tượng.
+ Giá thì hiện tại có 2 phiên bản của Imagen 4 là 
• Imagen 4: Phiên bản tiêu chuẩn phù hợp hầu hết các tác vụ tạo ảnh thông thường(0.04 USD/1 ảnh)nhưng ở phiên bản này độ chính xác giống prompt mô tả ở mức thấp.
• Imagen 4 Ultra: Phiên bản cao cấp tập trung trung vào độ chính xác so với prompt mô tả và tạo ảnh chất lượng vượt trội hơn so với Imagen 4 có giá 0.06 USD/1 ảnh.
Flowith là nền tảng AI Agent thế hệ mới với Agent Neo được thiết kế làm việc thông qua giao diện canvas cho phép người dùng quản lý thực hiện các tác vụ phức tạp qua các bước.
+ Flowith không giống với các nền tảng AI truyền thống như Gemini, Chagpt, Claude dựa trên chat mà nó tạo ra một không gian làm việc khác người dùng có thể xem trực tiếp nó làm việc theo các bước dựa trên ý tưởng đưa vào canvas.
+ Nền tảng này tích hợp AI Oracle có thể là Gemini hoàn toàn có thể thực hiện liên tục trên 1000 bước hoặc có thể cài đặt thời gian thực hiện các bước chỉ qua câu prompt yêu cầu thực sự vượt trội so với Manus và Genspark chỉ thực hiện được vài chục bước
+ Flowith tất nhiên vẫn có đầy đủ các ứng dụng thông minh của Manus hay Genspark như:
• Tự động lập kế hoạch: Tự động lập kế hoạch làm việc trên không gian ảo canvas khi người dùng không cần prompt chi tiết đặc biệt người dùng có thể can thiệp prompt ngay cả khi Agent Neo đang hoạt động.
• Hệ thống tự phối hợp các AI Agent: Có thể tạo ra một đội AI Agent tự phối hợp với nhau làm việc như một Agent để viêt, Agent để tạo ảnh, Agent để review,.. 
• Hỗ trợ làm việc nhóm: Tất nhiên cái này là cần thiết cho một dự án có nhiều người tham gia, họ có thể chỉnh sửa trực tiếp thông qua phân quyền nhưng có lẽ tính năng chỉ có ở bản trả phí.
• Tìm kiếm và phản hồi trực tiếp: Có thể tìm kiếm thông tin theo thời gian thực và trả lời trực tiếp thông qua Agent Neo.
• Tạo tri thức tự động thông qua Knowledge Garden: Agent Neo tự động phân tích thông tin và kết nối tài liệu tải lên thành tri thức có thể sử dụng.
• Quản lý tác vụ linh hoạt: Người dùng có thể điều chỉnh lập kế hoạch theo thời gian thực thậm chỉ có thể can thiệp khi thấy Agent Neo đang thực hiện các bước không theo ý người dùng. 
• Chi phí với các gói 
Gói Free có thể dùng miễn phí với 1000 credit / 1 tháng.
Gói Professional (19.9 USD/ 1 tháng) có thể tạo video với 20000 credit /1 tháng.
Gói Ultimate(49.9 USD/ 1 tháng) có thể tạo video với 50000 credit /1 tháng
`;
/*PASTE YOUR GOOGLE DOC CONTENT HERE.

This content will be used as the knowledge base for the RAG chatbot.
For example, if your document contains information about company policies,
the chatbot will be able to answer questions about those policies.

Example content:
---
Welcome to the Clean AI Hub knowledge base.

**Our Mission**
Our mission is to provide the most accurate and up-to-date information about AI tools and models.

**Contact Us**
You can reach us at info@cleanai.vn.
---
*/
// =================================================================================

// Simple chunking function
function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {
  const chunks: string[] = [];
  if (!text) return chunks;
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length);
    chunks.push(text.slice(i, end));
    i += chunkSize - overlap;
  }
  return chunks;
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) {
    return 0;
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// In-memory store for document chunks and embeddings
let documentStore: { chunk: string; embedding: number[] }[] = [];
let isStoreInitialized = false;

// Initialize the document store with embeddings
async function initializeDocumentStore() {
  if (isStoreInitialized) return;

  // Ensure document content is not empty
  if (!documentContent || documentContent.trim().length < 10) {
    console.warn("documentContent is empty or too short. RAG functionality will be disabled.");
    isStoreInitialized = true;
    return;
  }

  try {
    const chunks = chunkText(documentContent);
    if (!chunks.length) {
        console.warn("Chunking the document resulted in 0 chunks. RAG functionality will be disabled.");
        isStoreInitialized = true;
        return;
    }
    
    const embedResult = await ai.embed({
      model: googleAI.model('text-embedding-004'),
      content: chunks,
    });

    if (!embedResult || !embedResult.embeddings || embedResult.embeddings.length === 0) {
        throw new Error("Failed to generate embeddings. The result was empty.");
    }
    const { embeddings } = embedResult;

    documentStore = chunks.map((chunk, i) => ({
      chunk,
      embedding: embeddings[i],
    }));

    console.log(`Document store initialized with ${documentStore.length} chunks.`);

  } catch (error) {
    console.error("CRITICAL: Error initializing document store. RAG will be disabled. This is likely due to an API key or configuration issue.", error);
    documentStore = []; // Ensure store is empty on failure
  } finally {
    isStoreInitialized = true;
  }
}

// Find relevant context from the document
export async function findRelevantContext(query: string, topK = 3): Promise<string[]> {
  await initializeDocumentStore();

  if (!documentStore.length) {
    console.warn("RAG document store is not initialized or empty. Returning no context.");
    return [];
  }

  try {
    const embedResult = await ai.embed({
      model: googleAI.model('text-embedding-004'),
      content: query,
    });
  
    if (!embedResult || !embedResult.embedding) {
      throw new Error("Failed to generate query embedding. The result was empty.");
    }
    const { embedding: queryEmbedding } = embedResult;
  
    const similarities = documentStore.map(item => ({
      chunk: item.chunk,
      similarity: cosineSimilarity(queryEmbedding, item.embedding),
    }));
  
    similarities.sort((a, b) => b.similarity - a.similarity);
  
    // Filter out results with low similarity to avoid irrelevant context
    const relevantChunks = similarities.filter(item => item.similarity > 0.5);

    return relevantChunks.slice(0, topK).map(item => item.chunk);
  } catch (error) {
    console.error("Error finding relevant context:", error);
    return []; // Return empty context on error
  }
}
