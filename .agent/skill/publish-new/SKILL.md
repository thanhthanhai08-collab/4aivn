---
name: publish-new
description: Crawl RSS, lọc bài AI, viết lại theo phong cách 4AIVN, render ảnh bìa, đăng Firestore
---

# Publish News — Agent Skill

Pipeline 5 bước tự động hoá quy trình đăng tin tức AI cho 4AIVN.

## Yêu cầu

- Node.js 22+
- File `serviceAccountKey.json` ở root project
- File `.env.local` chứa `GEMINI_API_KEY`
- Đã cài dependencies: `npm install`

## Pipeline

### Bước 1 — Crawl RSS & Lọc bài AI

Chạy `scripts/crawl_rss.ts` để:
1. Fetch RSS từ 4 nguồn (xem `resources/rss_sources.json`)
2. Lọc bài liên quan AI bằng keyword matching (không gọi LLM)
3. Agent chọn bài phù hợp nhất từ danh sách kết quả

**Lệnh:** 
```bash
npx tsx .agent/skill/publish-new/scripts/crawl_rss.ts
```

### Bước 2+3 — Viết lại bài (gộp 1 lần gọi Gemini)

Chạy `scripts/rewrite_article.ts` với URL bài gốc:
1. Đọc nội dung bài gốc
2. Sắp xếp từ khóa + viết dàn ý
3. Viết bài HTML theo phong cách 4AIVN (xem `resources/writing_style_guide.md`)
4. Tạo image prompt cho ảnh bìa
5. Output lưu vào `news-data/<slug>.json`

**Lệnh:**
```bash
npx tsx .agent/skill/publish-new/scripts/rewrite_article.ts --url "https://..." --hint "mô tả ngắn"
```

### Bước 4 — Render ảnh bìa

Chạy `scripts/generate_cover.ts`:
1. Đọc image prompt từ file JSON ở bước trước
2. Gọi Gemini API (Nano Banana 2) sinh ảnh
3. Lưu ảnh vào `news-data/<slug>.webp`

**Lệnh:**
```bash
npx tsx .agent/skill/publish-new/scripts/generate_cover.ts --input "news-data/<slug>.json"
```

### Bước 5 — Đăng lên Firestore

Chạy `scripts/publish_to_firestore.ts`:
1. Đọc JSON + ảnh từ `news-data/`
2. Tạo document trong Firestore collection `news` với schema đầy đủ

**Lệnh:**
```bash
npx tsx .agent/skill/publish-new/scripts/publish_to_firestore.ts --input "news-data/<slug>.json"
```

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

- Bước 1: 0 token (keyword matching thuần)
- Bước 2+3: 1 lần gọi duy nhất (gộp outline + rewrite + image prompt)
- Bước 4: 1 lần gọi image generation
- Bước 5: 0 token (chỉ ghi Firestore)
- **Tổng: 2 lần gọi Gemini API / bài viết**
