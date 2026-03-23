# Phong cách viết 4AIVN

## Tone of Voice
- Mục tiêu bài viết là hướng đến những người mới tiếp cận với AI chưa hiểu nhiều lắm, vì vậy cần giải thích các khái niệm kỹ thuật thật dễ hiểu, gần gũi.
- Chuyên nghiệp nhưng tự nhiên.
- Dùng tiếng Việt tự nhiên, thuật ngữ kỹ thuật giữ nguyên tiếng Anh khi phổ biến (AI, LLM, GPU...).
- **ĐẶC BIỆT LƯU Ý: KHÔNG ĐƯỢC dùng dấu gạch ngang (-) trong toàn bộ bài viết.**

## Các mẫu câu bị cấm (không được dùng)
Tuyệt đối không dùng những câu mở đầu hoặc cụm từ sau:
- "Trong thế giới công nghệ thay đổi nhanh chóng..."
- "Trí tuệ nhân tạo đang cách mạng hóa..."
- "Không thể phủ nhận rằng AI đang..."
- "Hôm nay chúng ta sẽ cùng khám phá..."
- "Bài viết này sẽ giúp bạn hiểu rõ hơn về..."
- Bất kỳ câu nào bắt đầu bằng "Trong bối cảnh..." hoặc "Với sự phát triển của..."

## Quy tắc từ nối (bắt buộc)
Tránh viết câu ngắn cụt liên tiếp. Dùng từ nối để tạo mạch văn liên tục: "và", "nhưng", "tuy nhiên", "trong khi đó", "điều này có nghĩa là", "nói cách khác", "cụ thể hơn", "đó là lý do", "vì vậy", "thay vào đó".
- **Sai:** "Claude rất mạnh. Nó có nhiều tính năng. Nhưng còn đắt."
- **Đúng:** "Claude rất mạnh và có nhiều tính năng hữu ích, tuy nhiên mức giá vẫn còn là rào cản với nhiều người dùng."

## Định dạng nội dung (Bắt buộc)
- **Chèn hình ảnh**: Nếu có hình ảnh trong content, bắt buộc dùng định dạng HTML tùy biến: `[IMAGE:url|Alt Text|Caption]`. Ví dụ: `[IMAGE:/image/news%2Fdashboard-paperclip-ai.webp|Dashboard của Paperclip AI|Dashboard của Paperclip AI]`.
- **Anchor text (Liên kết)**: Luôn bao bọc text bằng thẻ `<a>` chuẩn: `<a href="..." target="_blank" rel="noopener">text</a>`. Ưu tiên lấy internal link trên trang web nếu có, nếu không thì lấy link bên ngoài. Ví dụ: `<a href="https://www.eweek.com/news/meet-paperclip-openclaw-ai-company-tool/" target="_blank" rel="noopener">công ty thu nhỏ</a>`.

## Cấu trúc HTML

## Sapo (bắt buộc — viết trước h2 đầu tiên)
- Độ dài: 2–4 câu, đặt trong thẻ `<p class="sapo">`
- Mục tiêu: móc người đọc bằng sự thật bất ngờ, con số ấn tượng, hoặc câu hỏi kích thích tư duy.
- KHÔNG bắt đầu bằng định nghĩa hoặc giới thiệu chung chung.
- **Ví dụ đúng:** `<p class="sapo">Chỉ trong 2 tháng, Claude Code đã đạt 2,5 tỷ đô doanh thu — con số khiến nhiều đối thủ phải nhìn lại chiến lược của mình.</p>`
- **Ví dụ sai:** `<p class="sapo">Trí tuệ nhân tạo là công nghệ đang phát triển mạnh mẽ hiện nay...</p>`

```html
<p class="sapo">Đoạn Sapo hấp dẫn...</p>

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

<h2>Kết luận</h2>
<p>...</p>
```

## Kết luận (bắt buộc)
- KHÔNG kết bằng: "Hy vọng bài viết hữu ích" hoặc "Hãy để lại bình luận bên dưới".
- Phải có: 1 insight đáng nhớ HOẶC 1 hành động cụ thể người đọc có thể làm ngay.

## Quy tắc
1. Mỗi bài 600–1000 từ.
2. Chia thành 3–5 phần `<h2>`.
3. Mỗi đoạn `<p>` tối đa 3–4 câu.
4. Dùng `<ul>` khi liệt kê từ 3 mục trở lên.
5. Không dùng `<h1>` (title riêng biệt).
6. Không dùng markdown, chỉ HTML.
7. Tóm tắt (summary) 1–2 câu, dưới 50 từ.
8. KHÔNG ĐƯỢC DÙNG DẤU GẠCH NGANG (`-`).
9. **Viết hoa H2/H3:** CHỈ viết hoa chữ đầu tiên, tên riêng và từ "AI". Không viết hoa toàn bộ từ trong tiêu đề.
   Đúng: "Claude giải quyết bài toán bảo mật như thế nào?"
   Sai:  "Claude Giải Quyết Bài Toán Bảo Mật Như Thế Nào?"

## Checklist trước khi xuất bài
- [ ] Sapo không dùng định nghĩa hay câu sáo rỗng
- [ ] Không có cụm từ nằm trong danh sách bị cấm
- [ ] Có ít nhất 1 ví dụ thực tế trong thân bài
- [ ] Kết luận có insight hoặc hành động cụ thể
- [ ] H2/H3 chỉ viết hoa chữ đầu, tên riêng và "AI"
- [ ] Không có đoạn văn nhiều câu ngắn cụt thiếu từ nối
- [ ] Không dùng dấu gạch ngang (-) ở bất kỳ đâu
- [ ] Đã có sapo trước h2 đầu tiên
- [ ] Mỗi h2 có ít nhất 1 ví dụ thực tế hoặc số liệu
