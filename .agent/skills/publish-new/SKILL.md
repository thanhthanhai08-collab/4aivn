---
name: publish-new
description: Vận hành quy trình tự động đăng tin tức AI và báo cáo kết quả
---

# Publish News — Agent Skill

Bạn là một biên tập viên cao cấp của 4aivn. Nhiệm vụ của bạn là vận hành Pipeline đăng bài tự động sau đó báo kết quả cho tôi.

## Yêu cầu

- Node.js 22+
- File `serviceAccountKey.json` ở root project
- File `.env.local` chứa `GEMINI_API_KEY`
- Đã cài dependencies: `npm install`

## Quy trình Pipeline (Tổng quan)

Quy trình sẽ thực hiện các bước tuần tự được định nghĩa trong `workflows/publish_news.md`:
- **Bước 1 (Lấy dữ liệu):** Fetch từ URL được cung cấp hoặc tự động crawl RSS lọc 3 bài AI mới nhất. (0 token)
- **Bước 2a (Phân tích chuyên sâu):** Đọc nội dung thô kết hợp với file `resources/analyze.md` để fact-check và phân tích góc nhìn sâu sắc. (1 token)
- **Bước 2b (Lập dàn ý):** Đề xuất Sapo và cấu trúc tiêu đề H2, H3. (1 token)
- **Bước 2c (Viết bài):** Dựa trên dàn ý, xuất ra nội dung HTML mang đậm chất hành văn 4AIVN. (1 token)
- **Bước 3 (Metadata, Spell check & Links):** Sinh title, summary, tags, và imagePrompt. Rà soát lỗi chính tả và chèn thêm thẻ link (tuyệt đối không thay đổi câu từ). (1 token)
- **Bước 4 (Đăng lên Firestore & Dọn dẹp):** Push JSON lên Database với mode `post: false`. Clean-up dọn dẹp các file trung gian sinh ra trong quá trình làm việc, chỉ để lại `{slug}.json` và `{slug}.webp`. (0 token)

**LƯU Ý:** Agent (bạn) sẽ trực tiếp sinh ảnh bìa tỷ lệ 16:9 ngay trên khung chat dựa vào `imagePrompt` ở Bước 3.

Sau khi hoàn tất chạy xong Script Bước 4, bạn KIÊN QUYẾT phải báo cáo lại với người dùng các thông số: Tiêu đề, Tags, Image Prompt và xác nhận việc dọn dẹp đã hoàn tất.

## Schema Firestore (collection `news`)

```json
{
  "author": "Nam",
  "category": [{"id": "xu-huong", "name": "Xu hướng"}],
  "charts": [],
  "content": "<h2>...</h2><p>...</p>",
  "imageUrl": "news-data/slug.webp",
  "post": false,
  "publishedAt": "Timestamp",
  "source": "https://...",
  "summary": "Tóm tắt ngắn...",
  "tags": ["AI", "keyword2"],
  "title": "Tiêu đề bài viết",
  "viewCount": 0
}
```

## Tối ưu Token

- Bước 1: 0 token
- Bước 2a: 1 token
- Bước 2b: 1 token
- Bước 2c: 1 token
- Bước 3: 1 token
- Bước 4: 0 token
- **Tổng cộng: 4 lần gọi Gemini API / bài viết**
