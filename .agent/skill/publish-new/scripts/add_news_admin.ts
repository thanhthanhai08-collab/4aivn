import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id
});
const db = admin.firestore();

async function main() {
  const newsRef = db.collection('news');
  const docRef = await newsRef.add({
    title: "FBI thu giữ các trang web của nhóm hacker ủng hộ Iran sau vụ tấn công phá hoại Stryker",
    content: "FBI và Bộ Tư pháp Mỹ đã thu giữ hai trang web liên quan đến nhóm hacker ủng hộ Iran có tên là Handala. Nhóm này tuần trước đã nhận trách nhiệm về một cuộc tấn công mạng phá hoại nhằm vào tập đoàn công nghệ y tế khổng lồ của Mỹ, Stryker. Các trang web này trước đây được nhóm sử dụng để công bố các vụ hack và tiết lộ thông tin cá nhân. Handala đã hoạt động từ ít nhất tháng 10 năm 2023 và cho biết vụ tấn công Stryker là để trả đũa một cuộc không kích. Vụ hack đã giúp chúng truy cập vào hệ thống quản lý thiết bị nội bộ của Stryker và xóa dữ liệu trên các thiết bị của công ty và nhân viên. Stryker hiện vẫn đang trong quá trình khôi phục hệ thống mạng nội bộ. Việc thu giữ trang web bước đầu gây gián đoạn hoạt động của nhóm.",
    source: "https://techcrunch.com/2026/03/19/fbi-seizes-pro-iranian-hacking-groups-websites-after-destructive-stryker-hack/",
    publishedAt: new Date().toISOString()
  });
  console.log("Document written with ID: ", docRef.id);
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
