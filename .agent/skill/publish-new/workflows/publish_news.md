---
description: Pipeline đăng tin tức AI (Crawl -> Phân tích -> Dàn ý -> Viết -> Metadata -> Publish)
---

# Quy trình tự động hóa xuất bản tin tức AI

Quy trình này chia việc viết báo thành 5 bước tuần tự để tối ưu chất lượng nội dung và token, đảm bảo AI tập trung vào từng bước nhỏ một cách chính xác. 

### Bước 1 — Lấy dữ liệu (0 token)
Có 2 cách lấy bài:
1. **Có URL cụ thể:** Chạy lệnh sau để fetch 1 bài.
   ```bash
   npx tsx .agent/skill/publish-new/scripts/fetch_article.ts --url "https://..."
   ```
2. **Không có URL:** Chạy lệnh sau để crawl RSS và lấy top 3 bài AI.
   ```bash
   npx tsx .agent/skill/publish-new/scripts/crawl_rss.ts
   ```
*Output: `news-data/{slug}/crawl.json`*

### Bước 2a — Phân tích chuyên sâu (1 token check fact & góc nhìn)
Đọc thông tin đã crawl và phân tích dựa trên `analyze.md`
```bash
npx tsx .agent/skill/publish-new/scripts/analyze.ts --slug "{slug}"
```
*Output: `news-data/{slug}/analyze.json`*

### Bước 2b — Lập dàn ý (1 token)
Tạo dàn ý H2/H3 và đoạn sapo (mở bài).
```bash
npx tsx .agent/skill/publish-new/scripts/outline.ts --slug "{slug}"
```
*Output: `news-data/{slug}/outline.json`*

### Bước 2c — Viết bài (1 token)
Viết HTML hoàn chỉnh theo văn phong `writing_style_guide.md`.
```bash
npx tsx .agent/skill/publish-new/scripts/write.ts --slug "{slug}"
```
*Output: `news-data/{slug}/write.html`*

### Bước 3 — Metadata & Link (1 token)
Tạo title, tags, summary, và image prompt. Sửa lỗi chính tả và thêm internal link (không thay đổi nội dung).
```bash
npx tsx .agent/skill/publish-new/scripts/rewrite_article.ts --slug "{slug}"
```
*Output: `news-data/{slug}/{slug}.json`*

> **Lưu ý Ảnh bìa:** Sau bước 3, bạn sẽ có `imagePrompt`. Hãy copy prompt đó và dùng AI sinh ảnh trực tiếp ngay trong khung chat Antigravity với tỷ lệ 16:9, sau đó lưu ảnh vào `news-data/{slug}/{slug}.webp` (hoặc upload trực tiếp lên Storage).

### Bước 4 — Đăng Firestore & Dọn dẹp (0 token)
Đăng lên Firestore với trạng thái `post: false` và cấp link ảnh bài viết. Các file json trung gian sẽ bị xoá đi, chỉ giữ lại `{slug}.json` và `{slug}.webp`.
```bash
npx tsx .agent/skill/publish-new/scripts/publish_to_firestore.ts --slug "{slug}"
```
