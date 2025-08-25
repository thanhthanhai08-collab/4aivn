
import type { Tool } from '@/lib/types';

export const mockLovableTool: Tool[] = [
  {
    id: 'lovable',
    name: 'Lovable',
    context: 'Code cho Web app',
    developer: 'Lovable',
    imageUrl: '/image/Ảnh công cụ Lovable.png',
    description: 'Lovable là một nền tảng phát triển ứng dụng dựa trên AI, cho phép bạn xây dựng và triển khai các ứng dụng SaaS hoàn chỉnh chỉ bằng cách sử dụng các câu lệnh (prompt), tự động hóa từ việc tạo tính năng, giao diện người dùng cho đến tích hợp thanh toán.',
    longDescription: '<p>Lovable là một nền tảng AI tiên tiến giúp biến ý tưởng thành các ứng dụng web (SaaS) hoạt động đầy đủ. Thay vì viết code theo cách truyền thống, bạn chỉ cần cung cấp các mô tả chi tiết bằng ngôn ngữ tự nhiên. Lovable sẽ tự động diễn giải các yêu cầu của bạn để tạo ra luồng người dùng, lược đồ dữ liệu, hệ thống xác thực, giao diện người dùng và thậm chí tích hợp các cổng thanh toán như Stripe.</p><p>Nền tảng này được thiết kế để tăng tốc đáng kể quá trình phát triển, cho phép các nhà phát triển, chủ doanh nghiệp và những người có ý tưởng nhanh chóng tạo ra các sản phẩm mẫu (prototype) hoặc các ứng dụng hoàn chỉnh mà không cần chuyên môn sâu về lập trình. Lovable là công cụ lý tưởng để kiểm thử ý tưởng kinh doanh và xây dựng các giải pháp tùy chỉnh một cách hiệu quả.</p>',
    logoUrl: '/image/Logo Lovable.png',
    link: 'https://lovable.dev/',
    features: [
      "Phát triển ứng dụng dựa trên prompt.",
      "Tự động tạo luồng người dùng và lược đồ dữ liệu.",
      "Tích hợp sẵn hệ thống xác thực người dùng.",
      "Hỗ trợ tạo giao diện người dùng (UI) từ mẫu.",
      "Tích hợp thanh toán với Stripe Checkout.",
      "Môi trường phát triển trực quan, dễ sử dụng.",
      "Tăng tốc quá trình tạo sản phẩm mẫu (prototyping)."
    ],
    useCases: [
        'Xây dựng ứng dụng SaaS từ ý tưởng.',
        'Tạo nhanh các sản phẩm khả thi tối thiểu (MVP).',
        'Tự động hóa việc tạo các tính năng cơ bản.',
        'Kiểm thử các ý tưởng kinh doanh một cách nhanh chóng.',
        'Xây dựng các công cụ nội bộ cho doanh nghiệp.'
    ],
    whoIsItFor: [
        'Nhà phát triển Full-stack',
        'Startup công nghệ',
        'Chủ doanh nghiệp',
        'Người phát triển sản phẩm (Product Manager)',
        'Bất kỳ ai muốn biến ý tưởng thành ứng dụng'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói Free ($0/tháng):</strong> Miễn phí mãi mãi, cung cấp 5 credit hàng ngày, phù hợp để khám phá và thực hiện các dự án công khai.</li>
            <li><strong>Gói Pro ($25/tháng):</strong> Dành cho các nhóm làm việc nhanh, bao gồm mọi thứ trong gói Free, cộng thêm 100 credit hàng tháng, dự án riêng tư, và nhiều tính năng chuyên nghiệp khác.</li>
            <li><strong>Gói Business ($50/tháng):</strong> Dành cho các bộ phận đang phát triển, bao gồm mọi thứ trong gói Pro, cộng thêm các tính năng kiểm soát nâng cao như SSO, dự án cá nhân, và mẫu thiết kế.</li>
            <li><strong>Gói Enterprise (Tùy chỉnh):</strong> Dành cho các tổ chức lớn, cung cấp hỗ trợ chuyên biệt, tích hợp tùy chỉnh, và các hệ thống thiết kế riêng.</li>
        </ul>
    `,
  }
];
