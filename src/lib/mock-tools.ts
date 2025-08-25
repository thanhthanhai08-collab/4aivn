
import type { Tool } from '@/lib/types';

export const mockTools: Tool[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    context: 'Tạo hình ảnh',
    developer: 'Midjourney',
    description: 'Midjourney là một trong những công cụ AI tạo ảnh từ văn bản (text-to-image) hàng đầu, nổi tiếng với khả năng tạo ra các tác phẩm nghệ thuật độc đáo, chi tiết và có phong cách riêng biệt. Hoạt động chủ yếu trên nền tảng Discord, Midjourney được cộng đồng sáng tạo và thiết kế ưa chuộng nhờ chất lượng hình ảnh vượt trội.',
    logoUrl: '/image/Logo Midjourney.png',
    link: 'https://www.midjourney.com',
    imageUrl: '/image/Ảnh công cụ AI Midjourney.png',
    longDescription: '<p>Midjourney là một phòng thí nghiệm nghiên cứu độc lập và cũng là tên của công cụ AI tạo ảnh nghệ thuật từ văn bản. Ra mắt vào năm 2022, Midjourney nhanh chóng trở thành một trong những nền tảng AI tạo sinh phổ biến nhất nhờ khả năng tạo ra các hình ảnh phức tạp, chất lượng cao và có tính thẩm mỹ độc đáo.</p><p>Hoạt động hoàn toàn trên nền tảng Discord, người dùng tương tác với Midjourney thông qua các câu lệnh (prompt). Mô hình AI của Midjourney có khả năng diễn giải các mô tả tự nhiên để tạo ra bốn biến thể hình ảnh cho mỗi yêu cầu, cho phép người dùng nâng cấp (upscale) hoặc tạo thêm các biến thể từ kết quả ưng ý nhất. Với một cộng đồng sôi động và liên tục được cập nhật, Midjourney là công cụ không thể thiếu cho các nghệ sĩ, nhà thiết kế và bất kỳ ai muốn biến ý tưởng thành hình ảnh ấn tượng.</p>',
    features: [
      "Tạo ảnh nghệ thuật chất lượng cao từ mô tả văn bản.",
      "Hỗ trợ đa dạng phong cách, từ siêu thực đến tả thực.",
      "Giao diện tương tác độc đáo qua Discord.",
      "Khả năng kết hợp hình ảnh (image blending) và tinh chỉnh prompt.",
      "Tạo ra các biến thể và nâng cấp độ phân giải hình ảnh.",
      "Cộng đồng người dùng lớn và năng động."
    ],
    useCases: [
      'Sáng tạo nghệ thuật kỹ thuật số và tranh minh họa.',
      'Thiết kế concept art cho game và phim ảnh.',
      'Tạo hình ảnh cho các chiến dịch marketing và quảng cáo.',
      'Tạo nguồn cảm hứng và ý tưởng cho các dự án sáng tạo.',
      'Thiết kế bìa sách, poster, và các ấn phẩm đồ họa.'
    ],
    whoIsItFor: [
      'Nghệ sĩ kỹ thuật số',
      'Nhà thiết kế đồ họa',
      'Người làm quảng cáo & marketing',
      'Nhà phát triển game',
      'Người sáng tạo nội dung'
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <p>Midjourney cung cấp các gói đăng ký theo tháng với các giới hạn sử dụng GPU nhanh khác nhau. Chế độ "Relax Mode" cho phép tạo ảnh không giới hạn nhưng với thời gian chờ đợi lâu hơn.</p>
        <ul>
            <li><strong>Gói Basic:</strong> $10/tháng, cung cấp khoảng 3.3 giờ GPU nhanh, phù hợp cho người mới bắt đầu.</li>
            <li><strong>Gói Standard:</strong> $30/tháng, cung cấp 15 giờ GPU nhanh, lựa chọn phổ biến nhất.</li>
            <li><strong>Gói Pro:</strong> $60/tháng, cung cấp 30 giờ GPU nhanh, dành cho người dùng chuyên nghiệp.</li>
            <li><strong>Gói Mega:</strong> $120/tháng, cung cấp 60 giờ GPU nhanh, dành cho doanh nghiệp và người dùng có nhu cầu rất cao.</li>
        </ul>
    `,
    userRating: 4.9,
    totalStars: 980,
    ratingCount: 200,
    isFavorite: true,
  },
  {
    id: 'gpt-image-1',
    name: 'GPT Image 1',
    context: 'Tạo hình ảnh',
    developer: 'OpenAI',
    description: 'GPT Image 1 là mô hình tạo, chỉnh sửa hình ảnh do OpenAI phát triển nội bộ, chính thức được ra mắt vào tháng 5 năm 2024 được tích hợp sẵn vào model GPT-4o không giống như DALL·E là một model riêng, GPT Image 1 được xây dựng hoàn toàn mới, với mục tiêu tạo ra hình ảnh thực tế, logic và mạch lạc với văn bản đầu vào(prompt).\n+ Vì được tích hợp sâu với GPT 4o cho nên GPT Image 1 hoàn toàn có thể hiểu ngữ cảnh hội thoại đưa ra hình ảnh phù hợp với yêu cầu chi tiết. Hoặc mọi người có thể sử dụng tùy chỉnh GPT Image 1 thông qua API.\n+ Hỗ trợ tất cả các kiểu tạo hình ảnh đó là tạo hình ảnh từ hình ảnh, tạo hình ảnh từ mô tả, chỉnh sửa hình ảnh từ hình ảnh, chỉnh sửa hình ảnh từ mô tả\n+ Đặc biệt là có thể tạo nhân vật và hành động nhất quán với mô tả và một điểm cộng nữa là chữ trên hình ảnh tiếng Anh thì cực kì chính xác còn tiếng Việt thì độ chuẩn xác chỉ tầm 50%.',
    logoUrl: '/image/Logo Open AI cho bảng xếp hạng.png',
    link: 'https://chat.openai.com',
    imageUrl: '/image/Ảnh công cụ AI GPT Image 1.png',
    longDescription: '<p>GPT Image 1 là mô hình tạo và chỉnh sửa hình ảnh do OpenAI phát triển, được tích hợp sâu vào GPT-4o. Không giống như DALL·E, GPT Image 1 được xây dựng để tạo ra các hình ảnh thực tế, logic và mạch lạc hơn với văn bản đầu vào. Với khả năng hiểu ngữ cảnh hội thoại, nó có thể tạo ra hình ảnh phù hợp với các yêu cầu chi tiết và phức tạp.</p><p>Mô hình này hỗ trợ nhiều kiểu tạo hình ảnh, bao gồm cả việc tạo từ văn bản và từ hình ảnh khác, cũng như chỉnh sửa ảnh hiện có. Một trong những điểm mạnh của GPT Image 1 là khả năng tạo ra các nhân vật và hành động nhất quán qua nhiều lần tạo, cùng với khả năng hiển thị văn bản tiếng Anh chính xác trên ảnh.</p>',
    features: [
      "Tích hợp sẵn vào Gpt 4o cực kì tiện lợi chỉ việc sử dụng không phải chuyển trang như Dall E và Sora.",
      "Hỗ trợ tất cả các kiểu tạo và chỉnh sửa ảnh",
      "GPT Image 1 hỗ trợ 3 loại kích thước ảnh là 1024x1024 và 1024x1536 và 1536x1024.",
      "Hỗ trợ tiếng Anh cực tốt cả tạo ảnh với chữ tiếng Anh trên ảnh còn tiếng Việt chỉ hỗ trợ prompt chưa tối ưu hiển thị trên ảnh",
      "Có thể tạo nhân vật đồng nhất dựa trên mô tả prompt."
    ],
    useCases: [
        'Tạo hình ảnh minh họa cho bài viết, blog',
        'Thiết kế ý tưởng cho sản phẩm, quảng cáo',
        'Tạo nhân vật và cảnh quan cho game, truyện',
        'Chỉnh sửa và cải thiện ảnh hiện có'
    ],
    whoIsItFor: [
        'Nhà văn, blogger',
        'Nhà thiết kế đồ họa',
        'Nhà phát triển game',
        'Người làm marketing'
    ],
    pricingPlans: `
        <p>GPT Image 1 được tích hợp trong các gói ChatGPT Plus, Team và Enterprise. Người dùng các gói này có thể sử dụng tính năng tạo ảnh theo giới hạn của gói đăng ký mà không phải trả thêm phí cho mỗi hình ảnh.</p>
    `,
    userRating: 4.8,
    totalStars: 720,
    ratingCount: 150,
    isFavorite: false,
  },
  {
    id: 'imagen-4',
    name: 'Imagen 4',
    context: 'Tạo hình ảnh',
    developer: 'Google',
    description: 'Imagen 4 là mô hình tạo ảnh từ văn bản thế hệ mới nhất của Google, nổi tiếng với khả năng tạo ra các hình ảnh quang học chân thực với độ chi tiết và chiều sâu đáng kinh ngạc, có tùy chọn độ phân giải lên đến 2K. Mô hình này còn vượt trội trong việc hiển thị chữ viết trên ảnh một cách chính xác.',
    logoUrl: '/image/Logo Gemini cho bảng xếp hạng.png',
    link: 'https://deepmind.google/technologies/imagen/',
    imageUrl: '/image/Ảnh công cụ AI Imagen 4.png',
    longDescription: '<p>Imagen 4 là mô hình tạo ảnh từ văn bản thế hệ mới nhất của Google, nổi tiếng với khả năng tạo ra các hình ảnh quang học giống y như thật. Với tùy chọn độ phân giải lên đến 2K, mọi chi tiết từ kết cấu vải, giọt nước, đến lông thú đều được tái hiện một cách sống động. Imagen 4 còn có tùy chọn tốc độ nhanh hơn 10 lần so với Imagen 3, là một bước tiến vượt bậc về hiệu suất.</p><p>Điểm mạnh đặc biệt của Imagen 4 là khả năng hiển thị chữ viết trên ảnh một cách cực kỳ chính xác và rõ ràng, đặc biệt với tiếng Anh. Nó cũng hỗ trợ đa dạng các kiểu tạo và chỉnh sửa ảnh, cùng nhiều tỷ lệ khung hình khác nhau, giúp người dùng dễ dàng sáng tạo theo ý muốn.</p>',
    features: [
      "Tạo ảnh siêu chân thực và có chiều sâu với tùy chọn ảnh lên tới 2K.",
      "Hỗ trợ nhiều loại kích thước ảnh 16:9, 9:16, 2:3, 1:1.",
      "Hỗ trợ tất cả các kiểu tạo và chỉnh sửa ảnh (text-to-image, image-to-image).",
      "Hiển thị chữ viết trên ảnh chính xác, đặc biệt là tiếng Anh.",
      "Tùy chọn tốc độ nhanh hơn 10 lần so với Imagen 3."
    ],
    useCases: [
        'Tạo hình ảnh quảng cáo sản phẩm chân thực.',
        'Thiết kế bìa sách, poster với văn bản tích hợp.',
        'Sáng tạo nghệ thuật số với độ chi tiết cao.',
        'Tạo hình ảnh minh họa cho các bài viết chuyên sâu.'
    ],
    whoIsItFor: [
        'Nhà thiết kế đồ họa chuyên nghiệp',
        'Nhiếp ảnh gia',
        'Người làm marketing và quảng cáo',
        'Nghệ sĩ kỹ thuật số'
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <ul>
            <li><strong>Imagen 4 (Tiêu chuẩn):</strong> $0.04/ảnh, phù hợp cho hầu hết các tác vụ tạo ảnh thông thường.</li>
            <li><strong>Imagen 4 Ultra:</strong> $0.06/ảnh, phiên bản cao cấp tập trung vào độ chính xác và chất lượng hình ảnh vượt trội.</li>
        </ul>
    `,
    userRating: 4.7,
    totalStars: 634.5,
    ratingCount: 135,
    isFavorite: true,
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    context: 'Tạo hình ảnh',
    developer: 'Stability AI',
    description: 'Stable Diffusion là một mô hình tạo ảnh từ văn bản mã nguồn mở, nổi bật với khả năng tùy chỉnh sâu và cộng đồng người dùng lớn mạnh. Phiên bản mới nhất, Stable Diffusion 3.5, cải thiện đáng kể chất lượng hình ảnh và khả năng hiểu các prompt phức tạp.',
    logoUrl: '/image/Logo Stability AI.png',
    link: 'https://stability.ai/stable-assistant',
    imageUrl: '/image/Ảnh công cụ Stable Diffusion.png',
    longDescription: '<p>Stable Diffusion là một mô hình AI tạo ảnh từ văn bản (text-to-image) mã nguồn mở, cho phép người dùng toàn quyền kiểm soát quá trình sáng tạo. Không giống các công cụ độc quyền, Stable Diffusion có thể được chạy trên máy tính cá nhân, mang lại sự linh hoạt và bảo mật tối đa. Phiên bản mới nhất, Stable Diffusion 3.5, đã có những bước tiến lớn về chất lượng hình ảnh và khả năng diễn giải các prompt phức tạp chứa nhiều đối tượng.</p><p>Với kiến trúc Multimodal Diffusion Transformer (MMDiT), Stable Diffusion 3.5 hiểu sâu hơn về mối quan hệ giữa văn bản và hình ảnh. Điều này, kết hợp với khả năng fine-tuning mạnh mẽ và một cộng đồng người dùng đông đảo, làm cho nó trở thành một công cụ cực kỳ linh hoạt cho các nhà phát triển và nghệ sĩ AI chuyên nghiệp muốn tạo ra các phong cách độc đáo.</p>',
    features: [
      "Là mô hình mã nguồn mở, cho phép chạy offline và tùy chỉnh sâu.",
      "Sử dụng kiến trúc MMDiT để cải thiện khả năng hiểu prompt và tạo ảnh.",
      "Chất lượng hình ảnh quang học và nghệ thuật vượt trội.",
      "Xử lý tốt các prompt phức tạp với nhiều đối tượng.",
      "Cải thiện đáng kể khả năng hiển thị văn bản trong ảnh.",
      "Cộng đồng người dùng lớn và nhiều tài nguyên hỗ trợ."
    ],
    useCases: [
      'Tạo hình ảnh nghệ thuật và thương mại',
      'Phát triển ứng dụng AI tạo sinh',
      'Nghiên cứu và thử nghiệm mô hình AI',
      'Tạo nội dung cho game và phim ảnh',
      'Tinh chỉnh mô hình cho các phong cách độc quyền',
    ],
    whoIsItFor: [
      'Nhà phát triển AI/ML',
      'Nghệ sĩ kỹ thuật số',
      'Nhà nghiên cứu AI',
      'Người dùng chuyên nghiệp muốn kiểm soát tối đa',
      'Doanh nghiệp muốn xây dựng giải pháp AI riêng'
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <ul>
            <li><strong>Sử dụng miễn phí:</strong> Tải về và chạy trên máy tính cá nhân hoặc qua các nền tảng như Hugging Face.</li>
            <li><strong>Sử dụng API:</strong> Tính phí theo credit, với 1 credit = $0.01.</li>
            <li><strong>Stable Assistant (Web):</strong>
                <ul>
                    <li><strong>Gói Standard:</strong> $9/tháng (900 credit/tháng)</li>
                    <li><strong>Gói Pro:</strong> $19/tháng (1900 credit/tháng)</li>
                    <li><strong>Gói Plus:</strong> $49/tháng (5500 credit/tháng)</li>
                    <li><strong>Gói Premium:</strong> $99/tháng (12000 credit/tháng)</li>
                </ul>
            </li>
        </ul>
    `,
    userRating: 4.6,
    totalStars: 644,
    ratingCount: 140,
    isFavorite: false,
  },
  {
    id: 'flowith',
    name: 'Flowith',
    context: 'AI Agent',
    developer: 'Flowith',
    imageUrl: '/image/Ảnh công cụ AI Flowith.png',
    description: 'Flowith là một nền tảng AI Agent thế hệ mới, nổi bật với Agent Neo hoạt động trên giao diện canvas trực quan. Công cụ này cho phép người dùng quản lý và thực thi các tác vụ phức tạp theo từng bước, vượt trội hơn so với các nền tảng AI truyền thống. Với khả năng xử lý hàng nghìn bước liên tục, Flowith là giải pháp mạnh mẽ cho việc tự động hóa nghiên cứu, phân tích dữ liệu và quản lý dự án.',
    longDescription: '<p>Flowith là một nền tảng AI Agent thế hệ mới, hoạt động trên giao diện canvas trực quan, cho phép người dùng xây dựng và quản lý các quy trình làm việc phức tạp bằng cách kết nối các khối chức năng. Khác với các chatbot truyền thống, Flowith tạo ra một không gian làm việc mở, nơi bạn có thể theo dõi trực tiếp quá trình AI thực thi từng bước dựa trên ý tưởng của bạn.</p><p>Với Agent Neo và AI Oracle tích hợp, Flowith có khả năng thực hiện hàng nghìn bước một cách liên tục, tự động lập kế hoạch, và phối hợp nhiều AI Agent chuyên biệt. Đây là một công cụ mạnh mẽ để tự động hóa nghiên cứu, phân tích dữ liệu, và quản lý dự án.</p>',
    logoUrl: '/image/Logo flowith.png',
    link: 'https://www.try.flowith.io',
    features: [
      "Thực hiện và lập kế hoạch lên tới hơn 1000 bước.",
      "Tự động lập kế hoạch và điều phối AI Agent.",
      "Hỗ trợ làm việc nhóm trên cùng một không gian làm việc.",
      "Tìm kiếm và phản hồi theo thời gian thực.",
      "Tạo tri thức tự động từ tài liệu tải lên.",
      "Giao diện Canvas trực quan và linh hoạt.",
      "Can thiệp và điều chỉnh quy trình theo thời gian thực."
    ],
    useCases: [
        'Tự động hóa quy trình nghiên cứu thị trường',
        'Phân tích và tổng hợp dữ liệu phức tạp',
        'Quản lý dự án và phân công nhiệm vụ tự động',
        'Tạo báo cáo và nội dung chi tiết',
        'Xây dựng các hệ thống AI Agent tùy chỉnh'
    ],
    whoIsItFor: [
        'Nhà phân tích dữ liệu',
        'Quản lý dự án',
        'Nhà nghiên cứu',
        'Người làm marketing',
        'Nhà phát triển muốn tự động hóa tác vụ'
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <ul>
            <li><strong>Gói Free:</strong> Được 1.000 credit/tháng, phù hợp để trải nghiệm và sử dụng cho các tác vụ nhỏ.</li>
            <li><strong>Gói Professional:</strong> $16-$19.9/tháng với 20.000 credit, hỗ trợ các tính năng nâng cao và tạo video.</li>
            <li><strong>Gói Ultimate:</strong> $36-$49.9/tháng với 50.000 credit, dành cho người dùng chuyên nghiệp và doanh nghiệp cần khối lượng công việc lớn.</li>
        </ul>
    `,
    userRating: 4.6,
    totalStars: 506,
    ratingCount: 110,
    isFavorite: false,
  },
  {
    id: 'n8n',
    name: 'n8n',
    context: 'Tự động hóa',
    developer: 'n8n',
    imageUrl: '/image/Ảnh công cụ n8n.png',
    description: 'n8n là một nền tảng tự động hóa quy trình làm việc (workflow automation) mã nguồn mở, cho phép người dùng kết nối và tích hợp nhiều ứng dụng, dịch vụ khác nhau để tự động hóa các tác vụ phức tạp.',
    longDescription: '<p>n8n là một nền tảng tự động hóa quy trình làm việc (workflow automation) mã nguồn mở, cho phép người dùng kết nối và tích hợp nhiều ứng dụng, dịch vụ khác nhau (đã tích hợp được hơn 400 ứng dụng , dịch vụ) để tự động hóa các tác vụ phức tạp thông qua giao diện kéo-thả trực quan, mà không cần hoặc ít cần viết code.</p><p>n8n phù hợp cho cả người không chuyên và lập trình viên.</p>',
    logoUrl: '/image/Logo n8n.png',
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
  },
   {
    id: 'firebase-studio',
    name: 'Firebase Studio',
    context: 'Code cho Web app',
    developer: 'Google',
    imageUrl: '/image/Ảnh công cụ Firebase Studio.png',
    description: 'Firebase Studio là một môi trường phát triển tích hợp (IDE) dựa trên web, được thiết kế để đơn giản hóa và tăng tốc quá trình xây dựng, quản lý các ứng dụng web hiện đại. Công cụ này kết hợp sức mạnh của Firebase với các công nghệ web hàng đầu như Next.js, React, và Genkit, đồng thời được hỗ trợ bởi AI, giúp các nhà phát triển từ người mới bắt đầu đến chuyên gia có thể dễ dàng tạo ra các sản phẩm chất lượng cao.',
    longDescription: `<p>Firebase Studio là một môi trường phát triển tích hợp (IDE) dựa trên web, được thiết kế để đơn giản hóa và tăng tốc quá trình xây dựng, quản lý các ứng dụng web hiện đại. Công cụ này kết hợp sức mạnh của Firebase với các công nghệ web hàng đầu như Next.js, React, và Genkit, đồng thời được hỗ trợ bởi AI, giúp các nhà phát triển từ người mới bắt đầu đến chuyên gia có thể dễ dàng tạo ra các sản phẩm chất lượng cao.</p><p>Firebase Studio cung cấp một bộ công cụ toàn diện, cho phép bạn tập trung vào việc xây dựng các tính năng độc đáo thay vì phải lo lắng về cơ sở hạ tầng. Với khả năng chỉnh sửa code theo thời gian thực và sự trợ giúp của AI, bạn có thể nhanh chóng biến ý tưởng thành hiện thực, từ việc thiết kế giao diện người dùng đến triển khai các tính năng AI phức tạp.</p>`,
    logoUrl: '/image/Logo Firebase Studio.png',
    link: 'https://firebase.google.com/studio',
    features: [
      "Chỉnh sửa code trực tiếp trong trình duyệt",
      "Tích hợp sẵn các công nghệ web hiện đại (Next.js, React)",
      "Hỗ trợ bởi AI để tăng tốc độ phát triển",
      "Tích hợp sâu với các dịch vụ Firebase",
      "Triển khai ứng dụng dễ dàng với Firebase Hosting",
      "Môi trường phát triển cộng tác",
    ],
    useCases: [
        'Xây dựng ứng dụng web',
        'Tạo mẫu (prototyping) nhanh',
        'Tích hợp các tính năng AI vào ứng dụng',
        'Phát triển các ứng dụng có backend Firebase'
    ],
    whoIsItFor: [
        'Nhà phát triển Web',
        'Người mới bắt đầu học lập trình',
        'Nhóm phát triển phần mềm',
        'Startup công nghệ'
    ],
    pricingPlans: `
        <p>Firebase Studio hiện đang trong giai đoạn thử nghiệm và có thể được sử dụng miễn phí trong giới hạn của gói Firebase Spark. Chi phí sẽ được tính dựa trên việc sử dụng các dịch vụ Firebase khác (như Firestore, Authentication, Hosting) theo mô hình "pay-as-you-go".</p>
    `,
    userRating: 4.8,
    totalStars: 480,
    ratingCount: 100,
  },
  {
    id: 'tavily-ai',
    name: 'Tavily AI',
    context: 'API truy xuất dữ liệu web',
    developer: 'Tavily',
    description: 'Tavily AI là một API tìm kiếm được tối ưu hóa cho các mô hình ngôn ngữ lớn (LLM), cung cấp kết quả nghiên cứu chính xác, đáng tin cậy và theo thời gian thực để xây dựng các ứng dụng AI mạnh mẽ.',
    logoUrl: '/image/Logo Tavily.png',
    link: 'https://tavily.com/',
    imageUrl: '/image/Ảnh công cụ AI Tavily.png',
    longDescription: '<p>Tavily AI là một công cụ tìm kiếm và nghiên cứu được hỗ trợ bởi trí tuệ nhân tạo, được thiết kế đặc biệt cho các mô hình ngôn ngữ lớn (LLM) và các hệ thống tạo-tái-tìm kiếm (RAG). Thay vì chỉ trả về một danh sách các liên kết, Tavily cung cấp các kết quả tìm kiếm đã được tối ưu hóa, chính xác, và cập nhật theo thời gian thực, kèm theo trích dẫn nguồn đáng tin cậy để giảm thiểu sai sót do ảo giác thông tin hoặc dữ liệu lỗi thời.</p><p>Với các tính năng như tìm kiếm, trích xuất, thu thập dữ liệu web và lập bản đồ thông tin, Tavily giúp các nhà phát triển dễ dàng tích hợp khả năng nghiên cứu mạnh mẽ vào các ứng dụng AI của họ, biến mọi LLM thành một chuyên gia nghiên cứu tự động.</p>',
    features: [
      "Tìm kiếm thời gian thực và tổng hợp thông tin với trích dẫn nguồn.",
      "API được thiết kế thân thiện cho LLM và hệ thống RAG.",
      "Hỗ trợ thu thập dữ liệu web (web crawl) và trích xuất thông tin có cấu trúc (web extract).",
      "Khả năng tạo bản đồ trang web (sitemap) tự động.",
      "Hỗ trợ đa dạng nguồn dữ liệu, bao gồm cả dữ liệu riêng tư.",
      "Cung cấp gói miễn phí với 1000 credit/tháng."
    ],
    useCases: [
      "Xây dựng các hệ thống Hỏi-Đáp (Q&A) dựa trên RAG.",
      "Tạo các AI Agent có khả năng tự nghiên cứu.",
      "Tự động hóa việc thu thập và phân tích dữ liệu thị trường.",
      "Nâng cao khả năng trả lời của chatbot với thông tin cập nhật.",
      "Xây dựng các công cụ phân tích cạnh tranh tự động."
    ],
    whoIsItFor: [
      "Nhà phát triển AI/ML",
      "Kỹ sư dữ liệu",
      "Startup công nghệ",
      "Nhà nghiên cứu",
      "Bất kỳ ai xây dựng ứng dụng dựa trên LLM"
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <p>Tavily tính phí dựa trên số lần sử dụng API (credit). Gói miễn phí phù hợp cho các dự án cá nhân và thử nghiệm.</p>
        <ul>
            <li><strong>Gói Researcher:</strong> Miễn phí 1000 credit/tháng. Khi hết, có thể mua thêm với giá $0.008/credit.</li>
            <li><strong>Gói Project:</strong> $30/tháng cho 4.000 credit (tương đương khoảng 2500 trang/tháng).</li>
            <li><strong>Gói Enterprise:</strong> Liên hệ để có gói tùy chỉnh theo nhu cầu.</li>
        </ul>
    `,
    userRating: 4.4,
    totalStars: 264,
    ratingCount: 60,
  },
  {
    id: 'make',
    name: 'Make',
    context: 'Tự động hóa',
    developer: 'Celonis',
    imageUrl: '/image/Ảnh công cụ AI Make.png',
    description: 'Make (trước đây là Integromat) là một nền tảng tự động hóa mạnh mẽ, cho phép bạn kết nối hàng nghìn ứng dụng và tự động hóa các quy trình công việc phức tạp mà không cần viết code, thông qua một giao diện trực quan và linh hoạt.',
    longDescription: '<p>Make (trước đây là Integromat) là một nền tảng tự động hóa quy trình làm việc mạnh mẽ, cho phép bạn kết nối các ứng dụng yêu thích và tự động hóa các tác vụ lặp đi lặp lại mà không cần viết một dòng code nào. Với giao diện kéo-thả trực quan, bạn có thể xây dựng các "kịch bản" (scenarios) để di chuyển dữ liệu giữa các ứng dụng, xử lý thông tin và thực hiện các hành động phức tạp.</p><p>Nền tảng này hỗ trợ hơn 1500 ứng dụng, từ các công cụ marketing, CRM, đến các dịch vụ lưu trữ và mô hình AI. Make nổi bật với khả năng xử lý logic phức tạp, cho phép tạo ra các luồng công việc đa bước, phân nhánh và xử lý lỗi một cách linh hoạt, khiến nó trở thành một công cụ mạnh mẽ cho cả người dùng cá nhân và doanh nghiệp.</p>',
    logoUrl: '/image/Logo Make.com.png',
    link: 'https://www.make.com/',
    features: [
      "Giao diện kéo-thả trực quan, dễ sử dụng.",
      "Tích hợp hơn 1500 ứng dụng và dịch vụ.",
      "Hỗ trợ logic phức tạp, điều kiện và phân nhánh.",
      "Khả năng xử lý lỗi và gỡ lỗi chi tiết.",
      "Tích hợp các mô hình AI của OpenAI, Google, Claude.",
      "Có AI Assistant hỗ trợ xây dựng và sửa lỗi kịch bản.",
      "Cung cấp gói miễn phí cho người mới bắt đầu.",
    ],
    useCases: [
        'Tự động hóa marketing qua email và mạng xã hội.',
        'Đồng bộ hóa dữ liệu giữa CRM và các công cụ khác.',
        'Xử lý đơn hàng và thông báo cho khách hàng.',
        'Tạo báo cáo tự động từ nhiều nguồn dữ liệu.',
        'Tích hợp AI vào các quy trình kinh doanh.',
    ],
    whoIsItFor: [
        'Người làm marketing',
        'Chủ doanh nghiệp nhỏ và vừa',
        'Nhà phát triển muốn tự động hóa nhanh',
        'Người làm việc tự do (freelancer)',
        'Bất kỳ ai muốn tiết kiệm thời gian cho các tác vụ lặp lại'
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <ul>
            <li><strong>Gói Free:</strong> 1.000 lượt chạy/tháng, 2 kịch bản hoạt động. Phù hợp để bắt đầu và thử nghiệm.</li>
            <li><strong>Gói Core:</strong> Từ $9/tháng, 10.000 lượt chạy/tháng, không giới hạn kịch bản. Lý tưởng cho cá nhân và freelancer.</li>
            <li><strong>Gói Pro:</strong> Từ $16/tháng, 10.000 lượt chạy/tháng, hỗ trợ các tính năng nâng cao như biến tùy chỉnh.</li>
            <li><strong>Gói Teams:</strong> Từ $29/tháng, 10.000 lượt chạy/tháng, thêm các tính năng làm việc nhóm và phân quyền.</li>
        </ul>
    `,
    userRating: 4.3,
    totalStars: 322.5,
    ratingCount: 75,
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    context: 'Hỗ trợ viết',
    developer: 'Notion',
    description: 'Notion AI không phải là ứng dụng độc lập mà nó hoạt động như trợ lý ảo thông minh được tích hợp ngay trên nền tảng Notion. Nó có khả năng hỗ trợ người dùng trong việc soạn thảo văn bản, tóm tắt nội dung, dịch thuật, tạo dàn ý, và đề xuất ý tưởng sáng tạo. \nNotion AI giúp tối ưu hóa quy trình làm việc cá nhân và nhóm bằng cách tự động hóa các tác vụ lặp đi lặp lại, đồng thời nâng cao chất lượng và tốc độ sản xuất nội dung ngay trên Notion. Với khả năng hiểu ngữ cảnh và cá nhân hóa theo thói quen làm việc, từ đó giúp người dùng làm việc thông minh và hiệu quả hơn.\n• Lên kế hoạch nội dung và tạo nội dung tự động: Người dùng có thể soạn thảo nhanh các văn bản như mô tả sản phẩm, email, bài thuyết trình với yêu cầu đơn giản hoặc chỉ đơn giản viết ra một ý chính rồi Notion AI tự động đưa ra ý tưởng và dàn ý.\n• Tóm tắt và giải thích văn bản: Tính năng này cực kì phù hợp với các bạn học sinh, sinh viên hoặc người làm marketing, vì Notion AI giúp rút gọn tài liệu dài thành các điểm chính hoặc đoạn văn ngắn dễ hiểu, giải thích các khái niệm phức tạp.\n• Dịch thuật đa ngôn ngữ: Hỗ trợ dịch nội dung sang hơn 10 ngôn ngữ phổ biến như tiếng Anh, Trung, Tây Ban Nha, Hàn, Việt, và Notion AI hoàn toàn có thể viết lại nội dung đó sang tiếng mà người dùng yêu cầu.\n• Tổ chức tài liệu và ghi chú khoa học: Tự động tạo ghi chú, sắp xếp tài liệu theo chủ đề, giúp quản lý kiến ​​thức mạch lạc và dễ truy xuất.\n• Dashboard AI được cá nhân hóa: Theo dõi tiến độ công việc, ưu tiên nhiệm vụ hoặc đồng bộ dữ liệu với các workflow tự động khác để đưa nhắc nhở thông minh cho từng cá nhân dựa trên thói quen và hiệu suất làm việc thực tế.\n• Hỗ trợ làm việc nhóm thông qua AI: Cho phép tự động chia sẻ, bình luận, chỉnh sửa đồng thời trên tài liệu, nâng cao hiệu quả làm việc nhóm.\n• Tìm kiếm và trả lời với AI dựa ngay trên dữ liệu người dùng trực tiếp: Chỉ cần gõ “/**” hoặc nhấn vào nút “Ask AI”, người dùng có thể bắt đầu trò chuyện hoặc yêu cầu hỗ trợ từ AI ngay trong trang làm việc.\n• GIá cả: Notion AI có thể dùng miễn phí với Limited Trial tức là khoảng 20-40 lần sử dụng sau đó phải mua thêm gói Add on Notion AI, nhưng hãy chú ý với đối với những người dùng gói Plus của Notion (10 - 12 USD/1 tháng) thì vẫn chỉ được dùng Limited Trial, người dùng phải nâng cấp lên gói Business (20 -24 USD/1 tháng) hoặc gói Enterprise thì mới được sử dụng Notion AI không giới hạn.\n',
    logoUrl: '/image/Logo Notion AI.png',
    link: 'https://www.notion.so/product/ai',
    features: [
      "Notion AI có thể lên kế hoạch và tạo nội dung tự động.",
"Tóm tắt và giải thích văn bản tự động .",
"Tổ chức tài liệu ghi chú khoa học.",
      "Dashboard AI được cá nhân hóa tự động",
      "Hỗ trợ làm việc nhóm thông qua AI.",
      "Tìm kiếm và tương tác với người dùng dựa trên dữ liệu của Notion.",
    ],
    userRating: 4.2,
    totalStars: 399,
    ratingCount: 95,
  },
  {
    id: 'sora-ai',
    name: 'Sora',
    context: 'Tạo video',
    developer: 'OpenAI',
    description: 'Sora là mô hình AI tạo video tiên tiến của OpenAI, có khả năng chuyển đổi văn bản hoặc hình ảnh thành các đoạn video ngắn, chất lượng cao, và bám sát nội dung mô tả trong prompt.',
    logoUrl: '/image/Logo Open AI cho bảng xếp hạng.png',
    link: 'https://sora.chatgpt.com',
    imageUrl: '/image/Ảnh công cụ AI Sora.png',
    longDescription: '<p>Sora là mô hình AI tạo video tiên tiến của OpenAI, có khả năng chuyển đổi văn bản hoặc hình ảnh thành các đoạn video ngắn (lên đến 1 phút) với chất lượng hình ảnh cao và bám sát nội dung mô tả trong prompt. Mô hình này được phát triển riêng biệt, không tích hợp vào các nền tảng khác, và tập trung vào việc tạo ra các video chân thực với chuyển động camera động và nhất quán.</p><p>Sora có thể mô phỏng các hành vi logic của các thành phần trong video, đảm bảo tính liên tục ngay cả khi đối tượng di chuyển hoặc bị che khuất. Nó cũng hỗ trợ nhiều tùy chọn sáng tạo như kéo dài video hiện có, tạo nhiều cảnh quay trong một video, và duy trì sự nhất quán về nhân vật và phong cách hình ảnh.</p>',
    features: [
      "Hỗ trợ tạo video từ văn bản (Text-to-video) và từ ảnh (Image-to-video).",
      "Chỉnh sửa video trực tiếp bằng mô tả prompt.",
      "Chuyển động camera động và nhất quán 3D.",
      "Tương tác với thế giới thực và nhất quán về thời gian.",
      "Tạo hình ảnh độ phân giải cao lên đến 2048x2048 pixel.",
      "Khả năng mở rộng video hoặc tạo nhiều cảnh trong một video."
    ],
    useCases: [
        'Tạo video quảng cáo và marketing',
        'Sản xuất phim ngắn và video nghệ thuật',
        'Tạo nội dung cho mạng xã hội',
        'Minh họa các khái niệm phức tạp'
    ],
    whoIsItFor: [
        'Nhà làm phim',
        'Người làm marketing',
        'Nhà sáng tạo nội dung',
        'Nghệ sĩ kỹ thuật số'
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <ul>
            <li><strong>Tài khoản Free:</strong> Tạo 3 hình ảnh/ngày (không tạo được video).</li>
            <li><strong>Gói Plus ($20/tháng):</strong> Tạo ảnh và video lên đến 720p, dài tối đa 10 giây.</li>
            <li><strong>Gói Pro ($200/tháng):</strong> Tạo ảnh và video chất lượng cao hơn (1080p), thời lượng tối đa 20 giây, giới hạn khoảng 500 video/tháng, không có watermark, và tạo đồng thời 5 video.</li>
        </ul>
    `,
    userRating: 4.1,
    totalStars: 385.4,
    ratingCount: 94,
  },
  {
    id: 'veo-3',
    name: 'Veo 3',
    context: 'Tạo video',
    developer: 'Google',
    description: 'Veo 3 là mô hình AI tạo video thế hệ mới nhất của Google. Công cụ này cho phép chuyển đổi văn bản hoặc hình ảnh thành video chất lượng cao, đặc biệt có thể tích hợp âm thanh gốc và hiệu ứng đồng bộ, giúp tạo ra các sản phẩm chân thực, sống động mà không cần xử lý hậu kỳ phức tạp.',
    logoUrl: '/image/Logo Gemini cho bảng xếp hạng.png',
    link: 'https://deepmind.google/models/veo/',
    imageUrl: '/image/Ảnh công cụ AI Google Veo 3.png',
    longDescription: '<p>Google Veo 3 là mô hình AI tạo video mới nhất của Google, được phát triển bởi DeepMind và ra mắt vào năm 2025. Công cụ này cho phép chuyển đổi văn bản hoặc hình ảnh thành video chất lượng cao. Đặc biệt, Veo 3 có thể tích hợp âm thanh gốc và hiệu ứng âm thanh đồng bộ vào video, giúp tạo ra các sản phẩm chân thực, sống động mà không cần xử lý hậu kỳ phức tạp.</p><p>Video của Google Veo 3 phù hợp cho nhiều mục đích như marketing, quảng cáo sản phẩm, nội dung truyền thông xã hội, giảng dạy và sáng tạo nội dung đa dạng.</p>',
    features: [
      "Veo 3 hỗ trợ tạo cả tạo video từ văn bản và tạo video từ ảnh nhưng 1 lần tạo chỉ được tải lên 1 ảnh duy nhất.",
"Tự động tạo âm thanh kèm với video để tăng tính đồng nhất .",
"Đồng bộ chuyển động môi và mô phỏng vật lý có chiều sâu cực kì chân thực.",
      "Hỗ trợ prompt chỉnh sửa chi tiết và tùy chỉnh sáng tạo góc quay, hiệu ứng, đèn nền.",
      "Chất lượng video cao, có thể tạo lên tới 4K.",
      "Có khả năng mở rộng video hoặc tạo nhiều cảnh trong một video.",
"Tính nhất quán của nhân vật có thể duy trì và đảm bảo.",
"Đồng bộ với Google AI Flow tạo video dài hơn 8s hiệu quả.",
    ],
    useCases: [
        'Tạo video quảng cáo, marketing',
        'Sản xuất nội dung cho mạng xã hội',
        'Tạo video giáo dục, hướng dẫn',
        'Sáng tạo phim ngắn và video nghệ thuật'
    ],
    whoIsItFor: [
        'Nhà làm phim, đạo diễn',
        'Người làm marketing, quảng cáo',
        'Nhà sáng tạo nội dung',
        'Giáo viên, nhà giáo dục'
    ],
    pricingPlans: `
        <h3>Các gói dịch vụ</h3>
        <p>Google hiện chưa cho sử dụng Veo 3 tại thị trường Việt Nam mà chỉ có ở một số thị trường nhất định (trong đó có Mỹ). Để trải nghiệm, người dùng cần đổi IP và đăng ký các gói dịch vụ:</p>
        <ul>
            <li><strong>Google AI Pro:</strong> 20 đô/1 tháng và được miễn phí tháng sử dụng đầu tiên và hạn chế dùng Veo 3, Flow với 1000 credit/1 tháng (tức là khoảng 10 video/1 tháng)gói này cũng được mở rộng sử dụng ra cả với Gemini 2.5 pro, Whisk, Notebook LLM, Jule.</li>
            <li><strong>Google AI Ultra:</strong> 250 đô/1 tháng và hạn mức cao nhất dùng Veo 3, Flow với 25.000 credit/1 tháng (tức là khoảng 300 video/1 tháng)gói này cũng được.</li>
        </ul>
    `,
    userRating: 4.0,
    totalStars: 376,
    ratingCount: 94,
  },
  {
    id: 'fire-crawl',
    name: 'Firecrawl',
    context: 'API truy xuất dữ liệu web',
    developer: 'Mendable',
    description: 'Firecrawl là một công cụ AI mạnh mẽ, được thiết kế để tìm kiếm và thu thập dữ liệu từ các trang web một cách hiệu quả.',
    longDescription: '<p>Firecrawl là một công cụ AI mạnh mẽ, được thiết kế để tìm kiếm và thu thập dữ liệu từ các trang web một cách hiệu quả. Nó giúp chuyển đổi nội dung web thành các định dạng thân thiện cho xử lý bằng mô hình ngôn ngữ lớn (LLM), như Markdown, HTML, và dữ liệu có cấu trúc. Hơn nữa, Firecrawl còn có chế độ Change Tracking, cho phép theo dõi và phát hiện sự thay đổi nội dung trên website theo thời gian thực, cung cấp báo cáo chi tiết về những điểm khác biệt.</p><p>Với khả năng xử lý nội dung động và vượt qua các biện pháp chặn, Firecrawl là một giải pháp toàn diện cho việc thu thập và chuẩn bị dữ liệu cho các ứng dụng AI.</p>',
    logoUrl: '/image/Logo Firecrawl.png',
    link: 'https://firecrawl.dev/',
    imageUrl: '/image/Ảnh công cụ AI Firecrawl.png',
    features: [
      "Trích xuất dữ liệu web toàn diện và hỗ trợ nhiều định dạng",
      "Lấy dữ liệu cụ thể từ từng URL với đầu ra đa dạng (bao gồm ảnh chụp màn hình).",
      "Lập bản đồ trang web (sitemap) tự động.",
      "Chuyển đổi dữ liệu không có cấu trúc thành có cấu trúc.",
      "Hỗ trợ nội dung động (JavaScript, SPA) và tương tác web.",
      "Tự động quản lý proxy, tốc độ và vượt qua anti-bot.",
      "API và SDK đa ngôn ngữ (Python, Node.js, Go, Rust...).",
      "Theo dõi sự thay đổi nội dung trên trang web (Change Tracking)."
    ],
    useCases: [
        'Xây dựng hệ thống RAG',
        'Chuẩn bị dữ liệu cho LLM',
        'Theo dõi và phân tích đối thủ cạnh tranh',
        'Tự động hóa thu thập dữ liệu',
        'Nghiên cứu và phân tích thị trường'
    ],
    whoIsItFor: [
        'Nhà phát triển AI/ML',
        'Kỹ sư dữ liệu',
        'Nhà phân tích kinh doanh',
        'Nhà nghiên cứu'
    ],
    pricingPlans: `
      <h3>Gói Crawl và Scrape</h3>
        <ul>
            <li><strong>Gói Free:</strong> miễn phí với 500 credit có thể scrape được 500 trang với 1 lần sử dụng khi hết 500 credit thì phải mua thêm với giá 1000 credit với giá 9$/1 tháng (hạn mức 10 lần scrape/phút và 1 lần crawl/phút.chỉ thực hiện 2 yêu cầu trong cùng 1 lúc)</li>
            <li><strong>Gói Hobby:</strong> với 16-19 $/1 tháng thì có 3000 credit có thể scrape được 3000 trang/1 tháng với hạn mức 5 yêu cầu trong cùng 1 lần thực hiện.</li>
            <li><strong>Gói Standard:</strong> với 83-99 $/1 tháng thì có 100.000 credit có thể crawl được 100.000 trang/1 tháng với hạn mức 50 yêu cầu trong cùng 1 lần thực hiện.</li>
            <li><strong>Gói Growth:</strong> với 333-399 $/1 tháng thì có 500.000 credit có thể crawl được 500.000 trang/1 tháng với hạn mức 100 yêu cầu trong cùng 1 lần thực hiện.</li>
            <li><strong>Gói Enterprise:</strong> thì tùy chỉnh theo yêu cầu của người dùng.</li>
        </ul>
        <h3>Gói Extract</h3>
        <p>Gói này chỉ miễn phi 1 lần nếu hết 1 lần thì phải mua thêm credit</p>
    `,
    userRating: 4.4,
    totalStars: 220,
    ratingCount: 50,
  },
];
    




    




    

    













    
