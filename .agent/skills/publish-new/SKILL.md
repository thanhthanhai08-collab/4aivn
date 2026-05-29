---
name: publish-new
description: Vận hành quy trình tự động đăng tin tức AI song ngữ và báo cáo kết quả
---

# Publish News - Agent Skill

Bạn là biên tập viên cao cấp của 4AIVN. Nhiệm vụ là vận hành pipeline đăng bài tin tức AI song ngữ Việt Anh, sau đó báo cáo kết quả cho người dùng.

## Yêu cầu

- Node.js 22+
- File `serviceAccountKey.json` ở root project
- File `.env.local` chứa `GEMINI_API_KEY`
- Đã cài dependencies: `npm install`

## Quy trình

Thực hiện theo `workflows/publish_news.md`:

- Bước 1: fetch dữ liệu từ URL nguồn.
- Bước 2a: phân tích và fact check.
- Bước 2b: lập dàn ý.
- Bước 2c: viết bài tiếng Việt trong `write.html`.
- Bước 3: tạo JSON song ngữ với root fields tiếng Việt và object `vi`, `en`.
- Bước 4: tạo ảnh bìa 16:9.
- Bước 5: publish lên Firestore bằng `scripts/publish_to_firestore.ts`.

## Schema Firestore collection `news`

```json
{
  "author": "Nam",
  "authorId": "nam",
  "category": [{ "id": "xu-huong", "name": "Xu hướng" }],
  "charts": [],
  "content": "<p>Nội dung tiếng Việt...</p>",
  "vi": {
    "title": "Tiêu đề tiếng Việt",
    "summary": "Tóm tắt tiếng Việt",
    "content": "<p>Nội dung tiếng Việt...</p>"
  },
  "en": {
    "title": "English title",
    "summary": "English summary",
    "content": "<p>English content...</p>"
  },
  "imageUrl": "/image/news%2Fslug.webp",
  "language": "vi",
  "languages": ["vi", "en"],
  "link": "https://...",
  "post": false,
  "publishedAt": "Timestamp",
  "source": "https://...",
  "summary": "Tóm tắt tiếng Việt",
  "tag": ["AI", "keyword2"],
  "title": "Tiêu đề tiếng Việt",
  "viewCount": 0
}
```

## Báo cáo sau khi hoàn tất

Luôn báo lại:
- Tiêu đề tiếng Việt và tiếng Anh
- Document ID
- Trạng thái `post`
- Đường dẫn ảnh bìa
- Xác nhận Firestore đã có `vi` và `en`
