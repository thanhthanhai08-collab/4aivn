
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
        <p>Lovable cung cấp các gói dịch vụ linh hoạt dựa trên nhu cầu sử dụng, phù hợp cho cả cá nhân và doanh nghiệp. Vui lòng truy cập trang web chính thức để biết thông tin giá chi tiết và các gói hiện có.</p>
    `,
    userRating: 4.5,
    totalStars: 360,
    ratingCount: 80,
  }
];
