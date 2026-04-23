# Step 3: Metadata & Spell Check

Nhiệm vụ cuối cùng là duyệt lại bài viết HTML, sửa lỗi chính tả và sinh Metadata hoàn chỉnh cho hệ thống 4AIVN.

## Dữ liệu đầu vào
- `write.html`: Nội dung bài viết đã soạn thảo.
- `crawl.json`: Chứa URL nguồn và tiêu đề gốc.

## Quy tắc thực hiện
1. **Tiêu đề**: Tạo tiêu đề bài viết hấp dẫn, chứa từ khóa quan trọng.
2. **Tóm tắt (Summary)**: Viết 1 câu tóm tắt giá trị lớn nhất của bài viết.
3. **Tags**: Lựa chọn 5-8 tag liên quan đến công nghệ, AI, và các công cụ được nhắc đến.
4. **Image Prompt**: Tạo prompt tiếng Anh để sinh ảnh 16:9 cinematic, hyper-detailed, không có chữ.
5. **Kiểm tra chính tả**: Rà soát và sửa các lỗi gõ máy trong file HTML.
6. **Internal Links**: Thêm link `<a href="https://4aivn.com/" target="_blank">tác nhân</a>` hoặc các từ khóa liên quan đến 4AIVN.

## Cấu trúc đầu ra (JSON)
Lưu kết quả vào file `{slug}.json` với cấu trúc:
```json
{
  "title": "Tiêu đề bài viết",
  "summary": "Tóm tắt ngắn gọn",
  "content": "Nội dung HTML đã được chỉnh sửa",
  "tag": ["Tag1", "Tag2"],
  "imagePrompt": "English prompt for cover image",
  "category": [{"id": "xu-huong", "name": "Xu hướng"}],
  "source": "URL nguồn",
  "author": "Nam",
  "authorId": "nam",
  "post": false,
  "imageUrl": "news-data/{slug}/{slug}.webp"
}
```
