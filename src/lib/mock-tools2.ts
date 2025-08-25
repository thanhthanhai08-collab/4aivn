
import type { Tool } from '@/lib/types';

export const mockLovableTool: Tool[] = [
  {
    id: 'lovable',
    name: 'Lovable',
    context: 'Tự động hóa',
    developer: 'n8n',
    imageUrl: '/image/Ảnh công cụ Lovable.png',
    description: 'Lovable là một nền tảng tự động hóa quy trình làm việc (workflow automation) mã nguồn mở, cho phép người dùng kết nối và tích hợp nhiều ứng dụng, dịch vụ khác nhau để tự động hóa các tác vụ phức tạp.',
    longDescription: '<p>Lovable là một nền tảng tự động hóa quy trình làm việc (workflow automation) mã nguồn mở, cho phép người dùng kết nối và tích hợp nhiều ứng dụng, dịch vụ khác nhau (đã tích hợp được hơn 400 ứng dụng , dịch vụ) để tự động hóa các tác vụ phức tạp thông qua giao diện kéo-thả trực quan, mà không cần hoặc ít cần viết code.</p><p>Lovable phù hợp cho cả người không chuyên và lập trình viên.</p>',
    logoUrl: '/image/Logo Lovable.png',
    link: 'https://n8n.io/',
    features: [
      "Giao diện kéo thả trực quan",
      "Hỗ trợ nhiều loại code và tùy chỉnh",
      "Tích hợp hơn 400 ứng dụng",
      "Quản lý và kết hợp nhiều AI Agent",
      "Triển khai linh hoạt",
      "Quản lý phiên bản và bảo mật",
      "Cộng đồng người dùng lớn mạnh",
    ],
    useCases: [
        'Tự động hóa quy trình làm việc',
        'Tích hợp các ứng dụng khác nhau',
        'Xử lý dữ liệu và ETL',
        'Tạo chatbot và trợ lý ảo',
        'Quản lý và điều phối các AI Agent'
    ],
    whoIsItFor: [
        'Nhà phát triển',
        'Học sinh, sinh viên',
        'Tiếp thị',
        'Bán hàng',
        'Vận hành'
    ],
    pricingPlans: `
        <h3>Cloud</h3>
        <ul>
            <li><strong>Free Trial:</strong> Dùng thử miễn phí trong 14 ngày.</li>
            <li><strong>Starter:</strong> €20-€24/tháng - 2.500 lần chạy workflow, giới hạn 5 workflow.</li>
            <li><strong>Pro:</strong> €50-€60/tháng - 10.000 lần chạy workflow, giới hạn 20 workflow.</li>
        </ul>
        <h3>Self-hosted</h3>
        <ul>
            <li><strong>Miễn phí phần mềm:</strong> Bạn chỉ phải trả chi phí cho hạ tầng (như VPS, tên miền, và các chi phí vận hành khác) để tự lưu trữ và quản lý.</li>
        </ul>
    `,
    userRating: 4.5,
    totalStars: 360,
    ratingCount: 80,
  }
];
