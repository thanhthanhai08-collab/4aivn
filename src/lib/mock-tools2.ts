
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
    imageUrl: '/image/Ảnh công cụ AI ElevenLabs.png',
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
    imageUrl: '/image/Ảnh công cụ AI Vbee.png',
    description: 'Vbee AI là nền tảng chuyển đổi văn bản thành giọng nói (Text-to-Speech) hàng đầu tại Việt Nam, cung cấp các giải pháp giọng nói AI tự nhiên, đa dạng và có cảm xúc, được ứng dụng rộng rãi trong nhiều lĩnh vực.',
    longDescription: '<p>Vbee là một công ty công nghệ tiên phong tại Việt Nam, chuyên sâu về các giải pháp xử lý giọng nói và ngôn ngữ tự nhiên bằng trí tuệ nhân tạo. Nền tảng Text-to-Speech của Vbee nổi bật với khả năng tạo ra giọng đọc có ngữ điệu tự nhiên, chân thực như người thật, hỗ trợ đa dạng giọng đọc theo vùng miền (Bắc, Trung, Nam) và giới tính.</p><p>Công nghệ của Vbee được ứng dụng rộng rãi để tạo ra các sản phẩm âm thanh chất lượng cao như sách nói, báo nói, lồng tiếng cho video, hệ thống tổng đài tự động và các giải pháp cho nhà thông minh. Với khả năng tùy chỉnh linh hoạt, Vbee giúp các doanh nghiệp và nhà sáng tạo nội dung tiết kiệm chi phí và thời gian sản xuất, đồng thời nâng cao trải nghiệm của người dùng cuối.</p>',
    logoUrl: '/image/Logo Vbee.png',
    link: 'https://vbee.vn/?aff=clean-ai-hub',
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
            <li><strong>Miễn phí:</strong> 3.000 ký tự/ngày, chỉ sử dụng được 1 thiết bị cho 1 tài khoản, 3 giọng nhân bản nhanh.</li>
            <li><strong>Tiêu chuẩn:</strong> 149.000đ/tháng (hoặc 339.000đ/năm) cho 125k ký tự, sử dụng được 2 thiết bị cho 1 tài khoản, 5 giọng nhân bản nhanh. Mua thêm 12.000đ/50k ký tự.</li>
            <li><strong>Đặc biệt:</strong> 199.000đ/tháng (hoặc 399.000đ/năm) cho 250k ký tự, sử dụng được 5 thiết bị cho 1 tài khoản, 3 giọng nhân bản chuyên nghiệp, 10 giọng nhân bản nhanh. Mua thêm 10.000đ/50k ký tự.</li>
            <li><strong>VIP:</strong> 299.000đ/tháng (hoặc 899.000đ/năm) cho 500k ký tự, sử dụng được 5 thiết bị cho 1 tài khoản, 6 giọng nhân bản chuyên nghiệp, 15 giọng nhân bản nhanh. Mua thêm 10.000đ/50k ký tự.</li>
            <li><strong>Tùy chỉnh:</strong> Tùy chỉnh linh hoạt tối ưu theo nhu cầu sử dụng.</li>
        </ul>
        <h3>Gói API</h3>
        <ul>
            <li><strong>Trải nghiệm:</strong> 49.000đ cho 120k ký tự, sử dụng 1 tháng với 5 luồng xử lý đồng thời.</li>
            <li><strong>Nâng cao:</strong> 999.000đ cho 2.7 triệu ký tự, sử dụng 6 tháng với 20 luồng xử lý đồng thời.</li>
            <li><strong>Cao cấp:</strong> 4.899.000đ cho 14 triệu ký tự, sử dụng 9 tháng với 50 luồng xử lý đồng thời.</li>
            <li><strong>Doanh nghiệp:</strong> Tùy chỉnh theo nhu cầu.</li>
        </ul>
    `,
  },
  {
    id: 'preny',
    name: 'Preny',
    context: 'AI Agent',
    developer: 'Preny',
    imageUrl: '/image/Ảnh công cụ AI Preny.png',
    description: 'Preny là một nền tảng no-code cho phép bạn xây dựng và triển khai các trợ lý AI tùy chỉnh cho trang web của mình, giúp tự động hóa việc hỗ trợ khách hàng, tạo khách hàng tiềm năng và tăng cường tương tác của người dùng.',
    longDescription: '<p>Preny là một nền tảng no-code mạnh mẽ cho phép bất kỳ ai, từ cá nhân đến doanh nghiệp, có thể dễ dàng xây dựng và triển khai các trợ lý AI tùy chỉnh cho trang web của mình. Bằng cách kết nối các nguồn dữ liệu của bạn như trang web, tài liệu, hoặc các cơ sở kiến thức, Preny giúp tạo ra các chatbot thông minh có khả năng trả lời câu hỏi, hỗ trợ khách hàng, và thu thập thông tin một cách tự động.</p><p>Nền tảng này được thiết kế để đơn giản hóa quá trình tạo ra các AI Agent mà không yêu cầu kiến thức lập trình. Với giao diện trực quan, bạn có thể tùy chỉnh giao diện, hành vi và tích hợp trợ lý ảo vào trang web của mình chỉ trong vài phút, giúp cải thiện trải nghiệm người dùng và tối ưu hóa quy trình kinh doanh.</p>',
    logoUrl: '/image/Logo Preny.png',
    link: 'https://preny.ai/affiliates?referralCode=zqmo0pa',
    features: [
      "Xây dựng trợ lý AI tùy chỉnh không cần code.",
      "Huấn luyện AI từ nhiều nguồn dữ liệu (website, tài liệu).",
      "Giao diện chatbot có thể tùy chỉnh để phù hợp với thương hiệu.",
      "Phân tích và báo cáo chi tiết về tương tác của người dùng.",
      "Tích hợp dễ dàng vào bất kỳ trang web nào.",
      "Hỗ trợ đa ngôn ngữ.",
      "Thu thập thông tin khách hàng tiềm năng."
    ],
    useCases: [
        'Tự động hóa hỗ trợ khách hàng 24/7.',
        'Tạo khách hàng tiềm năng (lead generation).',
        'Cung cấp thông tin và trả lời câu hỏi thường gặp (FAQ).',
        'Tăng cường tương tác và giữ chân người dùng trên web.',
        'Đào tạo và giới thiệu sản phẩm cho người dùng mới.'
    ],
    whoIsItFor: [
        'Chủ doanh nghiệp nhỏ và vừa',
        'Đội ngũ marketing và bán hàng',
        'Nhà phát triển web',
        'Người làm giáo dục và đào tạo',
        'Bất kỳ ai muốn có một trợ lý ảo trên trang web'
    ],
    pricingPlans: `
      <ul>
          <li><strong>Gói dùng thử:</strong> Miễn phí trong 7 ngày, giới hạn 1 page, 1 web, 2.000 tin nhắn, 20 nội dung training, và 1 thành viên.</li>
          <li><strong>Gói cơ bản:</strong> 499.000đ/tháng, giới hạn 5 page, 5 website, 5.000 tin nhắn, 100 tài liệu training, và 5 thành viên.</li>
          <li><strong>Gói nâng cao:</strong> 999.000đ/tháng, giới hạn 20 page, 20 website, 15.000 tin nhắn, không giới hạn tài liệu training, và không giới hạn thành viên.</li>
          <li><strong>Gói doanh nghiệp:</strong> 1.999.000đ/tháng, giới hạn 100 page, 100 website, 30.000 tin nhắn, và đầy đủ các tính năng hỗ trợ cao cấp nhất.</li>
      </ul>
    `,
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    context: 'AI tìm kiếm',
    developer: 'Perplexity',
    imageUrl: '/image/Ảnh công cụ AI Perplexity.png',
    description: 'Perplexity AI là một công cụ tìm kiếm và nghiên cứu đối thoại, cung cấp câu trả lời trực tiếp, chính xác và có trích dẫn nguồn từ web, giúp người dùng tìm kiếm thông tin nhanh chóng và đáng tin cậy.',
    longDescription: '<p>Perplexity AI hoạt động như một công cụ tìm kiếm đối thoại, kết hợp sức mạnh của các mô hình ngôn ngữ lớn (LLM) với khả năng truy cập thông tin thời gian thực từ web. Thay vì chỉ trả về một danh sách các liên kết, Perplexity tổng hợp thông tin từ nhiều nguồn để cung cấp một câu trả lời trực tiếp, súc tích và luôn kèm theo trích dẫn nguồn, giúp người dùng dễ dàng xác minh thông tin.</p><p>Công cụ này hỗ trợ nhiều chế độ tìm kiếm, từ "Focus" để tìm kiếm chuyên sâu trong các lĩnh vực cụ thể như học thuật, lập trình, đến "Pro Search" để thực hiện các nghiên cứu phức tạp hơn. Với khả năng tải lên tệp và tương tác một cách tự nhiên, Perplexity là một trợ lý nghiên cứu mạnh mẽ cho cả người dùng cá nhân và chuyên gia.</p>',
    logoUrl: '/image/Logo Perplexity.png',
    link: 'https://www.perplexity.ai/',
    features: [
      "Trả lời trực tiếp với trích dẫn nguồn đáng tin cậy.",
      "Hỗ trợ tìm kiếm chuyên sâu trong các lĩnh vực cụ thể.",
      "Tải lên tệp (PDF, TXT, Code) để phân tích và hỏi đáp.",
      "Tạo 'Collections' để tổ chức các luồng nghiên cứu.",
      "Chế độ 'Pro Search' cho các truy vấn phức tạp.",
      "Tích hợp các mô hình AI hàng đầu như GPT-4, Claude 3, và Llama 3.",
      "Giao diện thân thiện và dễ sử dụng."
    ],
    useCases: [
        'Nghiên cứu học thuật và khoa học.',
        'Tìm kiếm thông tin nhanh chóng và đáng tin cậy.',
        'Hỗ trợ viết lách và tạo nội dung.',
        'Giải đáp các câu hỏi về lập trình và kỹ thuật.',
        'Phân tích và tóm tắt tài liệu.'
    ],
    whoIsItFor: [
        'Nhà nghiên cứu, học thuật',
        'Học sinh, sinh viên',
        'Người viết nội dung, nhà báo',
        'Lập trình viên, kỹ sư',
        'Bất kỳ ai cần một công cụ tìm kiếm thông minh'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói Free:</strong> Cung cấp các tìm kiếm nhanh cơ bản, 5 lượt Pro Search mỗi 4 giờ.</li>
            <li><strong>Gói Pro ($20/tháng):</strong> Cung cấp hơn 300 lượt Pro Search mỗi ngày, lựa chọn mô hình AI, tải tệp không giới hạn, và nhiều tính năng nâng cao khác.</li>
            <li><strong>Gói Enterprise (Tùy chỉnh):</strong> Dành cho doanh nghiệp với các tính năng bảo mật và quản lý nâng cao.</li>
        </ul>
    `,
  },
  {
    id: 'gemini-2.5-flash-image',
    name: 'Gemini 2.5 Flash Image',
    context: 'Tạo hình ảnh',
    developer: 'Google',
    description: 'Gemini 2.5 Flash Image là mô hình tạo và chỉnh sửa ảnh nhanh, mạnh mẽ từ Google. Nó nổi bật với khả năng chỉnh sửa chi tiết, duy trì sự nhất quán của nhân vật và xử lý các yêu cầu phức tạp trong một lần prompt.',
    logoUrl: '/image/Logo Gemini cho bảng xếp hạng.png',
    link: 'https://deepmind.google/technologies/gemini/',
    imageUrl: '/image/Ảnh công cụ Gemini 2.5 Flash Image.png',
    longDescription: '<p>Gemini 2.5 Flash Image là một mô hình AI đa năng của Google, được thiết kế để tạo và chỉnh sửa hình ảnh với tốc độ và chất lượng cao. Nó không chỉ tạo ra hình ảnh từ văn bản mà còn cho phép người dùng chỉnh sửa các chi tiết nhỏ trong ảnh, thay đổi phong cách mà vẫn giữ nguyên bố cục. Một trong những điểm mạnh nhất của mô hình này là khả năng duy trì sự nhất quán của nhân vật qua nhiều lần tạo, một thách thức lớn đối với nhiều công cụ AI khác.</p><p>Với khả năng hiểu các prompt đa bước, Gemini 2.5 Flash Image có thể xử lý các yêu cầu phức tạp như thay đổi nguồn sáng và vật liệu trong cùng một lệnh, mang lại sự linh hoạt và kiểm soát sáng tạo cho người dùng. Đây là công cụ lý tưởng cho các nhà thiết kế, nghệ sĩ và người sáng tạo nội dung muốn tạo ra các sản phẩm hình ảnh độc đáo và chuyên nghiệp.</p>',
    features: [
      "Chỉnh sửa chi tiết hình ảnh mà vẫn giữ bố cục.",
      "Duy trì sự nhất quán của nhân vật qua nhiều lần tạo.",
      "Xử lý các yêu cầu chỉnh sửa đa bước trong một prompt.",
      "Hiểu biết tốt về các mối quan hệ vật lý và ánh sáng.",
      "Tạo ảnh chất lượng cao và chân thực.",
      "Giá cả cạnh tranh, tối ưu chi phí."
    ],
    useCases: [
        'Tạo hình ảnh minh họa cho truyện và sách.',
        'Thiết kế nhân vật cho game và phim hoạt hình.',
        'Chỉnh sửa và cải thiện ảnh sản phẩm, quảng cáo.',
        'Sáng tạo nghệ thuật số với các yêu cầu phức tạp.',
        'Tạo nội dung hình ảnh nhất quán cho các chiến dịch thương hiệu.'
    ],
    whoIsItFor: [
        'Nhà thiết kế đồ họa',
        'Nghệ sĩ kỹ thuật số',
        'Người sáng tạo nội dung',
        'Nhà phát triển game',
        'Người làm marketing'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Miễn phí:</strong> Người dùng miễn phí có thể thực hiện tối đa 100 chỉnh sửa mỗi ngày trên Google AI Studio hoặc ứng dụng Gemini.</li>
            <li><strong>API:</strong> Chi phí khoảng $0.039/hình ảnh, phù hợp cho các nhà phát triển và doanh nghiệp muốn tích hợp vào ứng dụng riêng.</li>
        </ul>
    `,
  },
  {
    id: 'bolt',
    name: 'Bolt',
    context: 'Code cho Web app',
    developer: 'Bolt',
    imageUrl: '/image/Anh-cong-cu-bolt.png',
    description: 'Bolt là một nền tảng phát triển AI thế hệ mới giúp bạn xây dựng, triển khai và quản lý các ứng dụng web một cách nhanh chóng và hiệu quả, tích hợp sâu với các mô hình ngôn ngữ lớn để tự động hóa quy trình.',
    longDescription: '<p>Bolt là một nền tảng phát triển ứng dụng web được hỗ trợ bởi AI, được thiết kế để đơn giản hóa quá trình tạo ra các sản phẩm phần mềm phức tạp. Nền tảng này cung cấp một môi trường tích hợp, nơi bạn có thể mô tả các yêu cầu của mình bằng ngôn ngữ tự nhiên và xem AI xây dựng các thành phần tương ứng, từ giao diện người dùng đến logic backend.</p><p>Với Bolt, các nhà phát triển có thể tăng tốc độ làm việc, giảm thiểu các tác vụ lặp đi lặp lại và tập trung vào việc tạo ra các tính năng sáng tạo. Nền tảng này cũng hỗ trợ triển khai liền mạch và quản lý vòng đời ứng dụng, làm cho nó trở thành một giải pháp toàn diện cho các nhóm phát triển hiện đại.</p>',
    logoUrl: '/image/Logo-bolt.png',
    link: 'https://bolt.new',
    features: [
      "Phát triển ứng dụng bằng ngôn ngữ tự nhiên.",
      "Tự động hóa việc tạo mã cho frontend và backend.",
      "Tích hợp sẵn các mô hình AI hàng đầu.",
      "Giao diện trực quan để quản lý và tùy chỉnh.",
      "Hỗ trợ triển khai nhanh chóng lên đám mây.",
      "Cung cấp các mẫu dựng sẵn để bắt đầu nhanh."
    ],
    useCases: [
        'Xây dựng nhanh các ứng dụng web và API.',
        'Tạo sản phẩm mẫu và MVP trong thời gian ngắn.',
        'Tự động hóa các tác vụ phát triển phần mềm.',
        'Tích hợp các tính năng AI vào ứng dụng hiện có.',
        'Phát triển các công cụ nội bộ cho doanh nghiệp.'
    ],
    whoIsItFor: [
        'Nhà phát triển web',
        'Startup công nghệ',
        'Doanh nghiệp vừa và nhỏ',
        'Kỹ sư phần mềm'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói Free:</strong> Bao gồm các tính năng cơ bản để xây dựng và thử nghiệm các ứng dụng nhỏ.</li>
            <li><strong>Gói Pro:</strong> Cung cấp thêm tài nguyên, hỗ trợ ưu tiên và các tính năng nâng cao cho các dự án chuyên nghiệp.</li>
            <li><strong>Gói Enterprise:</strong> Giải pháp tùy chỉnh cho các doanh nghiệp lớn với các yêu cầu về bảo mật và quy mô riêng.</li>
        </ul>
    `,
  },
  {
    id: 'comet-browser',
    name: 'Comet',
    context: 'Trình duyệt AI',
    developer: 'Perplexity',
    imageUrl: '/image/Anh-cong-cu-comet.png',
    description: 'Comet là một trình duyệt AI thế hệ mới từ Perplexity, được thiết kế để biến việc duyệt web thành một trải nghiệm tương tác và thông minh hơn, tập trung vào nghiên cứu và cung cấp thông tin chính xác.',
    longDescription: '<p>Comet là một trình duyệt AI của Perplexity, được xây dựng để trở thành một "không gian làm việc tri thức". Nó tập trung vào việc cung cấp các câu trả lời chính xác, đáng tin cậy với các trích dẫn rõ ràng, giúp người dùng nghiên cứu và khám phá thông tin một cách hiệu quả.</p><p>Thay vì chỉ là một công cụ hiển thị, Comet hoạt động như một trợ lý nghiên cứu thông minh, tổng hợp thông tin từ nhiều nguồn và cho phép người dùng tổ chức các dự án của họ một cách khoa học.</p>',
    logoUrl: '/image/Logo-comet-brower.png',
    link: 'https://www.perplexity.ai/comet',
    features: [
      "Tích hợp công cụ tìm kiếm đối thoại của Perplexity.",
      "Tự động tổng hợp và trích dẫn nguồn thông tin.",
      "Tạo 'Spaces' để tổ chức các phiên nghiên cứu.",
      "Hỗ trợ tìm kiếm chuyên sâu trong các lĩnh vực cụ thể.",
      "Giao diện tối giản và tập trung vào nội dung."
    ],
    useCases: [
      'Nghiên cứu học thuật và khoa học.',
      'Phân tích thị trường và đối thủ cạnh tranh.',
      'Tổng hợp thông tin cho việc viết báo hoặc blog.',
      'Học tập và khám phá các chủ đề mới.'
    ],
    whoIsItFor: [
      'Nhà nghiên cứu',
      'Học sinh, sinh viên',
      'Nhà báo',
      'Nhà phân tích',
      'Người dùng tò mò muốn có câu trả lời chính xác'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói Miễn phí:</strong> Cung cấp các tính năng tìm kiếm và tổ chức cơ bản.</li>
            <li><strong>Gói Pro ($20/tháng):</strong> Mở khóa các mô hình AI mạnh mẽ hơn, tìm kiếm chuyên sâu không giới hạn và các tính năng nâng cao khác.</li>
        </ul>
    `,
  },
  {
    id: 'atlas-browser',
    name: 'Atlas',
    context: 'Trình duyệt AI',
    developer: 'OpenAI',
    imageUrl: '/image/Anh-cong-cu-atlas.png',
    description: 'Atlas là trình duyệt AI của OpenAI, được thiết kế để biến việc duyệt web thành một trải nghiệm thông minh và chủ động, tập trung vào việc tự động hóa các tác vụ và cung cấp câu trả lời thông minh.',
    longDescription: '<p>Atlas là trình duyệt web do OpenAI phát triển, tích hợp sâu các khả năng của mô hình ngôn ngữ lớn để tạo ra một trải nghiệm duyệt web thông minh và hiệu quả. Thay vì chỉ hiển thị các trang web, Atlas hoạt động như một trợ lý chủ động, có khả năng tự động hóa các tác vụ phức tạp, tóm tắt nội dung và cung cấp câu trả lời trực tiếp từ web.</p><p>Với "Chế độ Tác tử" (Agent Mode), Atlas có thể thực hiện các chuỗi hành động như đặt vé máy bay hoặc mua sắm trực tuyến thay cho người dùng. Đây là công cụ mạnh mẽ dành cho những ai muốn tối ưu hóa năng suất và biến trình duyệt thành một đối tác làm việc thực thụ.</p>',
    logoUrl: '/image/Logo-chatgpt-atlas.png',
    link: 'https://chatgpt.com/vi-VN/atlas/get-started/',
    features: [
      "Chế độ Tác tử (Agent Mode) để tự động hóa các tác vụ phức tạp.",
      "Tích hợp sâu với các mô hình AI của OpenAI.",
      "Tóm tắt trang web và nội dung video.",
      "Hỗ trợ viết lách và chỉnh sửa trực tiếp trên trang.",
      "Bộ nhớ trình duyệt để cá nhân hóa trải nghiệm."
    ],
    useCases: [
      'Tự động hóa các quy trình làm việc trực tuyến.',
      'Nghiên cứu và tổng hợp thông tin nhanh chóng.',
      'Hỗ trợ viết email, báo cáo và các tài liệu khác.',
      'Tối ưu hóa năng suất cá nhân và công việc.'
    ],
    whoIsItFor: [
      'Người dùng chuyên nghiệp',
      'Nhà phát triển',
      'Nhà nghiên cứu',
      'Bất kỳ ai muốn tăng năng suất duyệt web'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói Miễn phí:</strong> Cung cấp các tính năng duyệt web và tóm tắt cơ bản.</li>
            <li><strong>Gói Plus/Pro:</strong> Mở khóa Chế độ Tác tử (Agent Mode) và các tính năng nâng cao khác với một khoản phí hàng tháng.</li>
        </ul>
    `,
  },
  {
    id: 'skywork',
    name: 'Skywork',
    context: 'AI Agent',
    developer: 'Skywork AI',
    imageUrl: '/image/Anh-cong-cu-skywork.png',
    description: 'Skywork là một nền tảng AI Agent giúp tự động hóa các tác vụ phức tạp, từ nghiên cứu, phân tích dữ liệu đến quản lý dự án, tối ưu hóa quy trình làm việc của bạn.',
    longDescription: '<p>Skywork là một nền tảng AI Agent tiên tiến, được thiết kế để hoạt động như một trợ lý ảo thông minh, có khả năng tự động hóa các quy trình công việc phức tạp. Bằng cách hiểu các yêu cầu bằng ngôn ngữ tự nhiên, Skywork có thể tự lập kế hoạch, thực thi các tác vụ như nghiên cứu thị trường, phân tích dữ liệu, tạo báo cáo và tương tác với các ứng dụng khác.</p><p>Nền tảng này nhằm mục đích giải phóng người dùng khỏi các công việc lặp đi lặp lại, cho phép họ tập trung vào các nhiệm vụ chiến lược và sáng tạo hơn. Với Skywork, bạn có thể xây dựng các luồng công việc tùy chỉnh để phù hợp với nhu cầu cụ thể của doanh nghiệp mình.</p>',
    logoUrl: '/image/Logo-skywork.png',
    link: 'https://skywork.ai',
    features: [
      "Tự động hóa các tác vụ nghiên cứu và thu thập dữ liệu.",
      "Phân tích dữ liệu và tạo báo cáo tự động bằng Doc, Slides, Sheets, Code",
      "Có hỗ trợ tạo Podcasts bằng nhiều ngôn ngữ",
      "Hỗ trợ tải file lên làm cơ sở dữ liệu cho Agent",
      "Giao diện trực quan đặc biệt hỗ trợ hẹn giờ xử lý công việc",
      "Hỗ trợ tự động thu thập và phân tích dữ liệu với cả link youtube"
    ],
    useCases: [
        'Tự động hóa nghiên cứu thị trường.',
        'Phân tích dữ liệu bán hàng và tạo báo cáo.',
        'Quản lý dự án và theo dõi tiến độ công việc.',
        'Tạo nội dung marketing tự động.',
        'Tự động hóa các tác vụ hỗ trợ khách hàng.'
    ],
    whoIsItFor: [
        'Nhà phân tích kinh doanh',
        'Quản lý dự án',
        'Người làm marketing',
        'Chủ doanh nghiệp'
    ],
    pricingPlans: `
        <ul>
            <li><strong>Gói tháng:</strong> $14.99 cho tháng đầu tiên, sau đó là $16.99/tháng.</li>
            <li><strong>Gói quý:</strong> $39.99/quý (tương đương $13.33/tháng).</li>
            <li><strong>Gói năm (Khuyên dùng):</strong> $149.99/năm (tương đương $12.50/tháng).</li>
        </ul>
    `,
  }
];
    
    



    

    



    



    

    




