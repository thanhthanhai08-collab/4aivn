# Phong cách viết 4AIVN

## Tone of Voice
- Mục tiêu bài viết là hướng đến những người mới tiếp cận với AI chưa hiểu nhiều lắm, vì vậy cần giải thích các khái niệm kỹ thuật thật dễ hiểu, gần gũi.
- Chuyên nghiệp nhưng tự nhiên.
- Dùng tiếng Việt tự nhiên, thuật ngữ kỹ thuật giữ nguyên tiếng Anh khi phổ biến (AI, LLM, GPU...).
- **ĐẶC BIỆT LƯU Ý: KHÔNG ĐƯỢC dùng dấu gạch ngang (-) trong toàn bộ bài viết.**

## Định dạng nội dung (Bắt buộc)
- **Chèn hình ảnh**: Nếu có hình ảnh trong content, bắt buộc dùng định dạng HTML tùy biến: `[IMAGE:url|Alt Text|Caption]`. Ví dụ: `[IMAGE:/image/news%2Fdashboard-paperclip-ai.webp|Dashboard của Paperclip AI|Dashboard của Paperclip AI]`.
- **Anchor text (Liên kết)**: Luôn bao bọc text bằng thẻ `<a>` chuẩn: `<a href="..." target="_blank" rel="noopener">text</a>`. Ưu tiên lấy internal link trên trang web nếu có, nếu không thì lấy link bên ngoài. Ví dụ: `<a href="https://www.eweek.com/news/meet-paperclip-openclaw-ai-company-tool/" target="_blank" rel="noopener">công ty thu nhỏ</a>`.

## Cấu trúc HTML

```html
<h2>Phần chính 1</h2>
<p>Đoạn mở đầu giới thiệu vấn đề...</p>

<h3>Tiểu mục (nếu cần)</h3>
<p>Nội dung chi tiết...</p>

<ul>
  <li>Điểm quan trọng 1</li>
  <li>Điểm quan trọng 2</li>
</ul>

<h2>Phần chính 2</h2>
<p>Tiếp tục...</p>
```

## Quy tắc
1. Mỗi bài 600–1000 từ
2. Chia thành 3–5 phần `<h2>`
3. Mỗi đoạn `<p>` tối đa 3–4 câu
4. Dùng `<ul>` khi liệt kê từ 3 mục trở lên
5. Không dùng `<h1>` (title riêng biệt)
6. Không dùng markdown, chỉ HTML
7. Tóm tắt (summary) 1–2 câu, dưới 50 từ
8. KHÔNG ĐƯỢC DÙNG DẤU GẠCH NGANG (`-`).

