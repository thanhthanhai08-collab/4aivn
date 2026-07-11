# Step 3: Metadata song ngữ & Spell Check

Nhiệm vụ cuối cùng là duyệt lại bài viết HTML, sửa lỗi chính tả và sinh metadata hoàn chỉnh cho hệ thống 4AIVN theo đúng schema song ngữ hiện có.

## Dữ liệu đầu vào
- `write.html`: nội dung bài viết tiếng Việt đã soạn thảo.
- `crawl.json`: URL nguồn và tiêu đề gốc.

## Quy tắc thực hiện
1. `slug`, `title`, `summary`, `content` phải là object song ngữ `{ "vi": "...", "en": "..." }`.
2. `title` (cho cả "vi" và "en") phải ngắn gọn và dưới 60 ký tự.
3. `slug` là dạng map, ví dụ: `"slug": { "vi": "tieng-viet-slug", "en": "english-slug" }`.
4. `summary` (cho cả "vi" và "en") phải viết sâu sắc, tóm tắt đủ ý chính và dài khoảng 6-7 dòng văn bản (khoảng 100-150 từ cho mỗi ngôn ngữ).
5. Không dùng schema cũ như `vi: { title, summary, content }` hay `en: { title, summary, content }`.
6. Bản tiếng Việt bám theo `write.html`, được sửa chính tả và thêm internal link khi tự nhiên.
7. Bản tiếng Anh là bản biên tập tự nhiên, không dịch máy móc từng chữ.
8. `content.vi` và `content.en` đều là HTML hợp lệ, dùng các thẻ `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`.
9. Nếu có ảnh/video trong bài, dùng cùng placeholder `[IMAGE:url|Alt Text|Caption]` hoặc `[VIDEO:id|Title|Caption]` ở cả hai ngôn ngữ, dịch Alt/Caption tương ứng.
10. Tags dùng chung cho cả bài, gồm 5-8 tag liên quan đến công nghệ, AI và công cụ được nhắc đến.
11. `imagePrompt` viết bằng tiếng Anh cho ảnh bìa 16:9.
12. `faq` phải có ít nhất 3 câu hỏi/trả lời song ngữ, bám sát nội dung bài.

## Cấu trúc đầu ra JSON
Lưu kết quả vào file `{slug}.json` với cấu trúc:

```json
{
  "slug": {
    "vi": "slug-tieng-viet-ngan",
    "en": "slug-english-short"
  },
  "title": {
    "vi": "Tiêu đề tiếng Việt dưới 60 ký tự",
    "en": "English title under 60 characters"
  },
  "summary": {
    "vi": "Tóm tắt tiếng Việt có chiều sâu, tóm gọn ý chính và có độ dài khoảng 6-7 dòng (khoảng 100-150 từ).",
    "en": "English summary containing main ideas, detailed and about 6-7 lines long (approx 100-150 words)."
  },
  "content": {
    "vi": "Nội dung HTML tiếng Việt",
    "en": "English HTML content"
  },
  "faq": [
    {
      "question": { "vi": "Câu hỏi tiếng Việt", "en": "English question" },
      "answer": { "vi": "Câu trả lời tiếng Việt", "en": "English answer" }
    }
  ],
  "tag": ["Tag1", "Tag2"],
  "imagePrompt": "English prompt for cover image",
  "category": [{ "id": "xu-huong", "name": "Xu hướng" }],
  "source": "URL nguồn",
  "author": "Nam",
  "authorId": "nam",
  "post": false,
  "imageUrl": "news-data/{slug-vi}/{slug-vi}.webp"
}
```
