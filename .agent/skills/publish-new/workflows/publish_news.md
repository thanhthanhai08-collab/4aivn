---
description: Pipeline đăng tin tức AI song ngữ (Crawl -> Phân tích -> Dàn ý -> Viết VI -> Metadata EN/VI -> Publish)
---

# Quy trình tự động hóa xuất bản tin tức AI song ngữ

Quy trình này tạo bài tiếng Việt và tiếng Anh trong cùng một document Firestore. Field `title`, `summary`, `content` ở root luôn là tiếng Việt để tương thích với giao diện và dữ liệu cũ; bản song ngữ nằm trong object `vi` và `en`.

### Bước 1 - Lấy dữ liệu
Có URL cụ thể:
```bash
npx tsx .agent/skills/publish-new/scripts/fetch_article.ts --url "https://..."
```

Output: `news-data/{slug}/crawl.json`

### Bước 2a - Phân tích chuyên sâu
Đọc thông tin đã crawl và phân tích dựa trên `analyze.md`.
```bash
npx tsx .agent/skills/publish-new/scripts/analyze.ts --slug "{slug}"
```

Output: `news-data/{slug}/analyze.json`

### Bước 2b - Lập dàn ý
Tạo dàn ý H2/H3 và sapo dựa trên `scripts/outline.md`.

Output: `news-data/{slug}/outline.json`

### Bước 2c - Viết bài tiếng Việt
Viết HTML hoàn chỉnh theo `scripts/write.md`.

Output: `news-data/{slug}/write.html`

### Bước 3 - Metadata song ngữ
Tạo JSON cuối cùng theo `scripts/rewrite_article.md`, gồm:
- Root fields tiếng Việt: `title`, `summary`, `content`
- Object `vi`: title, summary, content tiếng Việt
- Object `en`: title, summary, content tiếng Anh
- Metadata chung: tags, category, source, imagePrompt, author
- FAQ song ngữ: tối thiểu 3 câu hỏi và câu trả lời bám sát nội dung bài
- `updatedAt`: thời điểm cập nhật bài, được publish script ghi dưới dạng Firestore Timestamp

Output: `news-data/{slug}/{slug}.json`

### Bước 4 - Ảnh bìa
Tạo ảnh bìa 16:9 và lưu tại:
```text
news-data/{slug}/{slug}.webp
```

Ảnh khi publish sẽ được đọc từ Storage path:
```text
/image/news%2F{slug}.webp
```

### Bước 5 - Đăng Firestore và dọn dẹp
Publish document với `post: false` để duyệt trước.
```bash
npx tsx .agent/skills/publish-new/scripts/publish_to_firestore.ts --slug "{slug}"
```

Firestore sẽ nhận các field song ngữ `vi`, `en`, `language`, `languages` và các field tương thích cũ.
