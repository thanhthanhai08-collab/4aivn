
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
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    context: 'Tạo giọng nói',
    developer: 'ElevenLabs',
    imageUrl: '/image/Ảnh công cụ ElevenLabs.png',
    description: 'ElevenLabs là nền tảng AI tạo giọng nói hàng đầu, cho phép tạo ra các giọng đọc tự nhiên, biểu cảm và chân thực từ văn bản với nhiều ngôn ngữ khác nhau.',
    longDescription: '<p>ElevenLabs là một công ty công nghệ chuyên về phát triển phần mềm tổng hợp giọng nói và chuyển văn bản thành giọng nói (text-to-speech) bằng trí tuệ nhân tạo. Nền tảng của họ nổi tiếng với khả năng tạo ra các giọng đọc có chất lượng cao, tự nhiên và biểu cảm, hỗ trợ nhiều ngôn ngữ và cho phép người dùng nhân bản giọng nói (voice cloning) một cách dễ dàng.</p><p>Công cụ này được sử dụng rộng rãi bởi các nhà sáng tạo nội dung, nhà phát triển game, và các doanh nghiệp muốn tạo ra các sản phẩm âm thanh chuyên nghiệp như sách nói, podcast, lồng tiếng cho video, và các ứng dụng tương tác bằng giọng nói.</p>',
    logoUrl: '/image/Logo ElevenLabs.png',
    link: 'https://elevenlabs.io/',
    features: [
      "Tạo giọng nói tự nhiên và biểu cảm từ văn bản.",
      "Nhân bản giọng nói (Voice Cloning) từ một đoạn âm thanh ngắn.",
      "Hỗ trợ đa ngôn ngữ, bao gồm cả tiếng Việt.",
      "Thư viện giọng nói đa dạng có sẵn.",
      "API mạnh mẽ để tích hợp vào các ứng dụng khác.",
      "Tùy chỉnh cao độ, tốc độ và cảm xúc của giọng nói."
    ],
    useCases: [
        'Sản xuất sách nói và podcast.',
        'Lồng tiếng cho video, phim và game.',
        'Tạo trợ lý ảo với giọng nói tùy chỉnh.',
        'Phát triển các ứng dụng học ngoại ngữ.',
        'Tạo thông báo bằng giọng nói cho hệ thống công cộng.'
    ],
    whoIsItFor: [
        'Nhà sáng tạo nội dung',
        'Nhà phát triển game',
        'Tác giả và nhà xuất bản',
        'Doanh nghiệp',
        'Nhà phát triển ứng dụng'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói Free:</strong> 10.000 ký tự/tháng, tạo được 3 giọng nói tùy chỉnh.</li>
            <li><strong>Gói Starter ($5/tháng):</strong> 30.000 ký tự/tháng, tạo được 10 giọng nói tùy chỉnh.</li>
            <li><strong>Gói Creator ($22/tháng):</strong> 100.000 ký tự/tháng, tạo được 30 giọng nói tùy chỉnh.</li>
            <li><strong>Gói Pro ($99/tháng):</strong> 500.000 ký tự/tháng, tạo được 160 giọng nói tùy chỉnh.</li>
            <li><strong>Gói Enterprise:</strong> Gói tùy chỉnh theo nhu cầu của doanh nghiệp lớn.</li>
        </ul>
    `,
  },
  {
    id: 'vbee-ai',
    name: 'Vbee AI',
    context: 'Tạo giọng nói',
    developer: 'Vbee',
    description: 'Vbee AI là nền tảng chuyển đổi văn bản thành giọng nói (Text-to-Speech) hàng đầu tại Việt Nam, cung cấp các giải pháp giọng nói AI tự nhiên, đa dạng và có cảm xúc, được ứng dụng rộng rãi trong nhiều lĩnh vực.',
    logoUrl: '/image/Logo Vbee.png',
    link: 'https://vbee.vn/?aff=clean-ai-hub',
    imageUrl: '/image/Ảnh công cụ AI Vbee.png',
    longDescription: '<p>Vbee là một công ty công nghệ tiên phong tại Việt Nam, chuyên sâu về các giải pháp xử lý giọng nói và ngôn ngữ tự nhiên bằng trí tuệ nhân tạo. Nền tảng Text-to-Speech của Vbee nổi bật với khả năng tạo ra giọng đọc có ngữ điệu tự nhiên, chân thực như người thật, hỗ trợ đa dạng giọng đọc theo vùng miền (Bắc, Trung, Nam) và giới tính.</p><p>Công nghệ của Vbee được ứng dụng rộng rãi để tạo ra các sản phẩm âm thanh chất lượng cao như sách nói, báo nói, lồng tiếng cho video, hệ thống tổng đài tự động và các giải pháp cho nhà thông minh. Với khả năng tùy chỉnh linh hoạt, Vbee giúp các doanh nghiệp và nhà sáng tạo nội dung tiết kiệm chi phí và thời gian sản xuất, đồng thời nâng cao trải nghiệm của người dùng cuối.</p>',
    features: [
        "Chuyển đổi văn bản thành giọng nói tiếng Việt tự nhiên, có cảm xúc.",
        "Hỗ trợ đa dạng giọng đọc theo vùng miền và giới tính.",
        "Giao diện trực quan, dễ dàng sử dụng.",
        "API mạnh mẽ cho phép tích hợp vào các hệ thống khác nhau.",
        "Tùy chỉnh tốc độ, cao độ và ngữ điệu của giọng đọc.",
        "Ứng dụng trong báo nói, sách nói, tổng đài tự động."
    ],
    useCases: [
        'Tự động hóa sản xuất báo nói và sách nói.',
        'Xây dựng hệ thống tổng đài trả lời tự động (IVR).',
        'Lồng tiếng cho video quảng cáo, E-learning.',
        'Tạo thông báo bằng giọng nói cho các thiết bị thông minh.',
        'Phát triển ứng dụng cho người khiếm thị.'
    ],
    whoIsItFor: [
        'Đài truyền hình, báo chí',
        'Nhà xuất bản sách',
        'Doanh nghiệp',
        'Nhà phát triển phần mềm',
        'Nhà sáng tạo nội dung'
    ],
    pricingPlans: `
        <h3>Gói Studio</h3>
        <ul>
            <li><strong>Miễn phí:</strong> 4.000 ký tự/tháng, 1 giờ tải xuống.</li>
            <li><strong>Tiêu chuẩn:</strong> 29.000đ/tháng (290.000đ/năm) cho 300.000 ký tự.</li>
            <li><strong>Đặc biệt:</strong> 34.000đ/tháng (340.000đ/năm) cho 200.000 ký tự (Gói phổ biến nhất).</li>
            <li><strong>VIP:</strong> 75.000đ/tháng (750.000đ/năm) cho 200.000 ký tự.</li>
            <li><strong>Tùy chỉnh:</strong> 175.000đ/tháng (1.750.000đ/năm) cho 2.000.000 ký tự.</li>
        </ul>
        <h3>Gói API</h3>
        <ul>
            <li><strong>Trải nghiệm:</strong> 250.000đ cho 1.000.000 ký tự, thời gian sử dụng 1 tháng.</li>
            <li><strong>Nâng cao:</strong> 2.000.000đ cho 10.000.000 ký tự, thời gian sử dụng 6 tháng.</li>
            <li><strong>Cao cấp:</strong> 4.000.000đ cho 25.000.000 ký tự, thời gian sử dụng 12 tháng.</li>
            <li><strong>Doanh nghiệp:</strong> Tùy chỉnh theo nhu cầu.</li>
        </ul>
    `,
  }
];
