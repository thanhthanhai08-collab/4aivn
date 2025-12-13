/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/oncall");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { defineSecret } = require("firebase-functions/params");

// Khởi tạo Admin SDK để tương tác với các dịch vụ Firebase khác
admin.initializeApp();
const db = admin.firestore();

// 1. Định nghĩa khóa bí mật (Secret Key)
// Tên 'GEMINI_API_KEY' phải trùng với tên bạn đã đặt khi cấu hình secret trong Firebase.
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

// 2. Thiết lập cấu hình thời gian chạy cho function v1
const runtimeOpts = {
  maxInstances: 10,
  // Thêm secret đã định nghĩa vào danh sách các secret mà function cần truy cập
  secrets: [GEMINI_API_KEY], 
};

/**
 * Cloud Function này được kích hoạt khi có bất kỳ sự thay đổi nào (tạo, sửa, xóa)
 * trên một document trong sub-collection 'ratings' của bất kỳ document nào trong collection 'models'.
 * Ví dụ: /models/{modelId}/ratings/{ratingId}
 */
exports.aggregateModelRating = functions.runWith(runtimeOpts)
    .firestore.document('models/{modelId}/ratings/{ratingId}')
    .onWrite(async (change, context) => {
        
        const modelId = context.params.modelId;
        const modelRef = db.collection('models').doc(modelId);

        // Lấy dữ liệu của đánh giá trước và sau khi thay đổi
        const ratingBefore = change.before.data();
        const ratingAfter = change.after.data();

        // Lấy giá trị điểm sao (star)
        const newStars = ratingAfter ? (ratingAfter.starRating || 0) : 0; 
        const oldStars = ratingBefore ? (ratingBefore.starRating || 0) : 0;
        
        const difference = newStars - oldStars;

        // Nếu chỉ cập nhật nội dung văn bản của đánh giá mà không thay đổi điểm sao, thì không cần tính toán lại.
        if (difference === 0 && change.before.exists && change.after.exists) {
            console.log(`Rating updated for model ${modelId}, but starRating is unchanged.`);
            return null;
        }

        // Sử dụng một transaction để đảm bảo tính toàn vẹn dữ liệu khi đọc và ghi
        try {
            await db.runTransaction(async (transaction) => {
                const modelDoc = await transaction.get(modelRef);

                if (!modelDoc.exists) {
                    console.error(`Model document ${modelId} does not exist!`);
                    return; 
                }
                
                // Lấy các giá trị tổng hợp hiện tại từ document của model
                const currentCount = modelDoc.data().ratingCount || 0;
                const currentTotalStars = modelDoc.data().totalStars || 0;

                let updatedCount;
                let updatedTotalStars;

                if (!change.after.exists) {
                    // Kịch bản XÓA đánh giá: Giảm số lượng và tổng điểm
                    updatedCount = currentCount - 1;
                    updatedTotalStars = currentTotalStars - oldStars;
                } else if (!change.before.exists) {
                    // Kịch bản TẠO MỚI đánh giá: Tăng số lượng và tổng điểm
                    updatedCount = currentCount + 1;
                    updatedTotalStars = currentTotalStars + newStars;
                } else {
                    // Kịch bản CẬP NHẬT đánh giá: Giữ nguyên số lượng, chỉ cập nhật tổng điểm
                    updatedCount = currentCount;
                    updatedTotalStars = currentTotalStars + difference;
                }
                
                // Đảm bảo các giá trị không bị âm
                updatedCount = updatedCount < 0 ? 0 : updatedCount;
                updatedTotalStars = updatedTotalStars < 0 ? 0 : updatedTotalStars;

                const averageRating = updatedCount > 0 
                    ? (updatedTotalStars / updatedCount) 
                    : 0;

                // Cập nhật các trường tổng hợp vào document của model
                transaction.update(modelRef, {
                    ratingCount: updatedCount, 
                    totalStars: updatedTotalStars, 
                    averageRating: parseFloat(averageRating.toFixed(2)), // Làm tròn đến 2 chữ số thập phân
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
            });

            console.log(`Successfully aggregated ratings for model: ${modelId}`);
            return null;
        } catch (error) {
            console.error(`Failed to aggregate ratings for model ${modelId}:`, error);
            // Bạn có thể thêm logic xử lý lỗi ở đây, ví dụ như gửi thông báo lỗi
            return null;
        }
    });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
