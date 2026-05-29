# Step 3: Metadata song ngữ & Spell Check

Nhiệm vụ cuối cùng là duyệt lại bài viết HTML, sửa lỗi chính tả và sinh metadata hoàn chỉnh cho hệ thống 4AIVN theo đúng schema song ngữ hiện có.

## Dữ liệu đầu vào
- `write.html`: nội dung bài viết tiếng Việt đã soạn thảo.
- `crawl.json`: URL nguồn và tiêu đề gốc.

## Quy tắc thực hiện
1. `title`, `summary`, `content` phải là object song ngữ `{ "vi": "...", "en": "..." }`.
2. Không dùng schema `vi: { title, summary, content }` và `en: { title, summary, content }`.
3. Bản tiếng Việt bám theo `write.html`, được sửa chính tả và thêm internal link khi tự nhiên.
4. Bản tiếng Anh là bản biên tập tự nhiên, không dịch máy móc từng chữ.
5. `content.vi` và `content.en` đều là HTML hợp lệ, dùng các thẻ `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`.
6. Nếu có ảnh/video trong bài, dùng cùng placeholder `[IMAGE:url|Alt Text|Caption]` hoặc `[VIDEO:id|Title|Caption]` ở cả hai ngôn ngữ, dịch Alt/Caption tương ứng.
7. Tags dùng chung cho cả bài, gồm 5-8 tag liên quan đến công nghệ, AI và công cụ được nhắc đến.
8. `imagePrompt` viết bằng tiếng Anh cho ảnh bìa 16:9.

## Cấu trúc đầu ra JSON
Lưu kết quả vào file `{slug}.json` với cấu trúc:

```json
{
  "slug": "{slug}",
  "title": {
    "vi": "Tiêu đề tiếng Việt",
    "en": "English title"
  },
  "summary": {
    "vi": "Tóm tắt tiếng Việt",
    "en": "English summary"
  },
  "content": {
    "vi": "Nội dung HTML tiếng Việt",
    "en": "English HTML content"
  },
  "tag": ["Tag1", "Tag2"],
  "imagePrompt": "English prompt for cover image",
  "category": [{ "id": "xu-huong", "name": "Xu hướng" }],
  "source": "URL nguồn",
  "author": "Nam",
  "authorId": "nam",
  "post": false,
  "imageUrl": "news-data/{slug}/{slug}.webp"
}
```
