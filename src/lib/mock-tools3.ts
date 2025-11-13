
import type { Tool } from '@/lib/types';

export const mockOpalTool: Tool[] = [
  {
    id: 'opal',
    name: 'Opal',
    context: 'Tự động hóa',
    developer: 'Google',
    description: 'Opal là một công cụ tự động hóa mạnh mẽ của Google, giúp kết nối các ứng dụng và dịch vụ để tạo ra các quy trình làm việc thông minh và hiệu quả.',
    logoUrl: '/image/Logo-google-opal.png',
    link: 'https://opal.google/',
    imageUrl: '/image/Anh-cong-cu-opal.png',
    longDescription: '<p>Opal là nền tảng tự động hóa quy trình làm việc thế hệ mới của Google, được thiết kế để tích hợp sâu vào hệ sinh thái Google Workspace và Google Cloud. Với Opal, người dùng có thể dễ dàng kết nối các ứng dụng như Gmail, Drive, Sheets, và Calendar với hàng trăm dịch vụ khác để tự động hóa các tác vụ lặp đi lặp lại mà không cần kiến thức lập trình.</p><p>Điểm khác biệt của Opal là khả năng sử dụng AI của Google để gợi ý các luồng tự động hóa thông minh, phân tích dữ liệu và đưa ra quyết định dựa trên ngữ cảnh, giúp tối ưu hóa hiệu suất làm việc cho cá nhân và doanh nghiệp.</p>',
    features: [
      "Tích hợp sâu với các ứng dụng Google Workspace.",
      "Giao diện kéo-thả trực quan để xây dựng luồng công việc.",
      "AI gợi ý các quy trình tự động hóa thông minh.",
      "Hỗ trợ logic phức tạp, điều kiện và phân nhánh.",
      "Đồng bộ hóa dữ liệu theo thời gian thực.",
      "Bảo mật cấp doanh nghiệp từ Google Cloud."
    ],
    useCases: [
      'Tự động hóa việc tạo báo cáo từ Google Sheets.',
      'Gửi email thông báo tự động từ Gmail khi có sự kiện mới.',
      'Đồng bộ hóa các sự kiện trên Google Calendar với các ứng dụng quản lý dự án.',
      'Tự động phân loại và lưu trữ tệp trong Google Drive.',
      'Tạo tác vụ trong Google Tasks từ các email quan trọng.'
    ],
    whoIsItFor: [
      'Người dùng Google Workspace',
      'Đội ngũ vận hành kinh doanh',
      'Nhà quản lý dự án',
      'Người làm marketing',
      'Doanh nghiệp nhỏ và vừa'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói Personal (Miễn phí):</strong> 1.000 lượt chạy/tháng, phù hợp cho các tác vụ tự động hóa cá nhân.</li>
            <li><strong>Gói Pro ($25/tháng):</strong> 20.000 lượt chạy/tháng, hỗ trợ các tính năng nâng cao và logic phức tạp.</li>
            <li><strong>Gói Business (Tùy chỉnh):</strong> Dành cho doanh nghiệp với nhu cầu lớn, cung cấp các tính năng quản lý nhóm, bảo mật nâng cao và hỗ trợ chuyên sâu.</li>
        </ul>
    `,
  },
];
