
import type { Tool } from '@/lib/types';

export const mockTools: Tool[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    context: 'Tạo hình ảnh',
    developer: 'Midjourney',
    description: 'Midjourney là công cụ chuyên tạo hình ảnh nghệ thuật từ văn bản ra mắt năm 2022 chủ yếu hoạt động trên Discord. Nếu ai là dân chuyên sáng tạo, concept art, quảng cáo không lạ gì nền tảng này nữa vì công cụ này khá được ưa chuộng đối với người làm trong lĩnh vực này với những tác phẩm đa phong cách, chi tiết, sắc nét.\n+ Midjourney sử dụng mô hình ngôn ngữ lớn (LLM) phát triển riêng để phân tích tổng hợp tạo ra những bức ảnh giống như tác phẩm sống động với bố cục nghệ thuật.\n+ Midjourney có các lợi thế mà rất nhiều ông lớn trong ngành AI muốn có\n• Tạo ảnh từ mô tả văn bản: Có thể tạo ảnh từ prompt tiếng Việt lẫn tiếng Anh đều có độ chính xác, sáng tạo cao. Tất nhiên là vẫn ưu tiên tiếng Anh hơn.\n• Đa phong cách nghệ thuật: Có thể coi mỗi bức hình tạo ra là một tác phẩm nghệ thuật luôn vì Midjourney hỗ trợ vô vàn phong cách nghệ thuật từ siêu thực đến trừu tượng từ màu sắc đến bố cục.\n• Giao diện dễ sử dụng tương tác tùy chỉnh: Discord là nền tảng lớn thế nào chắc ai cũng biết rồi, chỉ cần hiểu giao diện chat đơn giản là sử dụng được. Cũng giống như nền tảng khác là hoàn toàn có thể nâng cấp, tùy chỉnh bức ảnh thông qua prompt văn bản. \n• Nguồn cảm hứng sáng tạo: Hoạt động từ năm 2022 đến nay thì Midjourney chắc chắn có kho dữ liệu sáng tạo khổng lồ hoàn toàn đủ sức cung cấp ý tưởng độc đáo cho người dùng.\n• Chi phí: Với các gói \nGói Basic là 10 USD / 1 tháng phù hợp với người thử nghiệm nhu cầu cơ bản giới hạn GPU nhanh 3.3 giờ/ tháng còn bình thường thì chúng ta phải đợi tính từ 10 đến 20 phút.\nGói Standard (30 USD /1 tháng) lựa chọn phổ biến với 15 giờ GPU nhanh mỗi tháng và chế độ Relax cho phép tạo ảnh không giới hạn.\nGói Pro (60 USD/1 tháng) và Mega (120 USD/1 tháng) dùng cho người dùng chuyên nghiệp doanh nghiệp cần nhiều tài nguyên với 30 giờ và 60 giờ GPU nhanh tất nhiên là tạo ảnh không giới hạn.\n',
    logoUrl: '/image/Logo Midjourney.png',
    link: 'https://www.midjourney.com',
    features: [
      "Là công cụ chuyên tạo hình ảnh nghệ thuật với rất nhiều phong cách nghệ thuật.",
      "Mỗi lần có thể tạo ra được 4 bức ảnh khác nhau dựa trên prompt văn bản tiếng Việt hoặc tiếng Anh.",
      "Độ phân giải mỗi bức ảnh rất cao và còn có thể prompt tăng độ phân giải nữa",
      "Giao diện rất dễ tương tác tùy chỉnh",
      "Nguồn cảm hứng sáng tạo cho mọi người.",
      "Chi phí nhỏ nhất là 10 USD / 1 tháng.",
    ],
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
        <p>Imagen 4 có hai phiên bản chính với mức giá khác nhau:</p>
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
    description: 'Stable Diffusion là công cụ tạo ảnh mã nguồn mở hàng đầu, và phiên bản mới nhất Stable Diffusion 3.5 tiếp tục nâng cao vị thế này. Nó mang đến chất lượng hình ảnh vượt trội, khả năng hiểu ngôn ngữ tự nhiên tốt hơn, và hiển thị văn bản trong ảnh chính xác hơn. Các tính năng mới giúp người dùng dễ dàng tạo ra những tác phẩm ấn tượng, từ ảnh quang học đến các phong cách nghệ thuật đa dạng.',
    logoUrl: '/image/Logo Stability AI.png',
    link: 'https://stability.ai/stable-assistant',
    imageUrl: '/image/Ảnh công cụ Stable Diffusion.png',
    longDescription: '<p>Stable Diffusion 3.5 là phiên bản mới nhất và tiên tiến nhất của mô hình tạo ảnh từ văn bản do Stability AI phát triển, mang đến nhiều cải tiến vượt trội về chất lượng hình ảnh, khả năng xử lý nhiều đối tượng trong cùng một prompt, và khả năng hiển thị văn bản chính xác hơn trong ảnh. Là một mô hình mã nguồn mở, nó cho phép người dùng toàn quyền kiểm soát, từ việc chạy offline trên máy chủ riêng đến việc tùy chỉnh sâu theo nhu cầu cụ thể.</p><p>Điểm khác biệt lớn của Stable Diffusion 3.5 nằm ở kiến trúc Multimodal Diffusion Transformer (MMDiT), giúp mô hình hiểu sâu hơn về mối quan hệ giữa văn bản và hình ảnh. Điều này, kết hợp với khả năng fine-tuning mạnh mẽ, làm cho nó trở thành một công cụ cực kỳ linh hoạt cho các nhà phát triển và nghệ sĩ AI chuyên nghiệp.</p>',
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
      <p>Stable Diffusion có thể được sử dụng miễn phí thông qua việc tải về và chạy trên máy tính cá nhân của người dùng hoặc qua các nền tảng như Hugging Face.</p>
      <p>Đối với việc sử dụng API, Stability AI đang cung cấp theo dạng credit với 1 credit = $0.01.</p>
      <p>Còn trong trường hợp mọi người muốn sử dụng qua web thì Stability AI có tích hợp sẵn Stable Diffusion trong Stable Assistant với các gói sử dụng</p>
        <ul>
            <li><strong>Gói Standard:</strong> $9/tháng thì được sử dụng Stable Assistant với 900 credit/1 tháng với 3 ngày free trial.</li>
            <li><strong>Gói Pro:</strong> $19/tháng thì được sử dụng Stable Assistant với 1900 credit/1 tháng với 3 ngày free trial.</li>
            <li><strong>Gói Plus:</strong> $49/tháng thì được sử dụng Stable Assistant với 5500 credit/1 tháng với 3 ngày free trial.</li>
            <li><strong>Gói Premium:</strong> $99/tháng thì được sử dụng Stable Assistant với 12000 credit/1 tháng với 3 ngày free trial.</li>
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
    description: 'Flowith là một nền tảng AI Agent thế hệ mới, nổi bật với Agent Neo hoạt động trên giao diện canvas trực quan. Công cụ này cho phép người dùng quản lý và thực thi các tác vụ phức tạp theo từng bước, vượt trội hơn so với các nền tảng AI truyền thống. Với khả năng xử lý hàng nghìn bước liên tục, Flowith là giải pháp mạnh mẽ cho việc tự động hóa nghiên cứu, phân tích dữ liệu và quản lý dự án.',
    logoUrl: '/image/Logo flowith.png',
    link: 'https://www.try.flowith.io',
    imageUrl: '/image/Ảnh công cụ AI Flowith.png',
    longDescription: '<p>Flowith là một nền tảng AI Agent thế hệ mới, hoạt động trên giao diện canvas trực quan, cho phép người dùng xây dựng và quản lý các quy trình làm việc phức tạp bằng cách kết nối các khối chức năng. Khác với các chatbot truyền thống, Flowith tạo ra một không gian làm việc mở, nơi bạn có thể theo dõi trực tiếp quá trình AI thực thi từng bước dựa trên ý tưởng của bạn.</p><p>Với Agent Neo và AI Oracle tích hợp, Flowith có khả năng thực hiện hàng nghìn bước một cách liên tục, tự động lập kế hoạch, và phối hợp nhiều AI Agent chuyên biệt. Đây là một công cụ mạnh mẽ để tự động hóa nghiên cứu, phân tích dữ liệu, và quản lý dự án.</p>',
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
    description: 'Tavily AI là công cụ tìm kiếm và nghiên cứu hỗ trợ trí tuệ nhân tạo, được thiết kế tối ưu cho các mô hình ngôn ngữ lớn (LLM) và các hệ thống tạo-tái-tìm kiếm (RAG). Tavily cung cấp kết quả tìm kiếm chính xác, cập nhật theo thời gian thực, kèm theo trích dẫn nguồn đáng tin cậy, giúp giảm thiểu sai sót do ảo giác thông tin hoặc dữ liệu lỗi thời.\n+ Tavily có 4 tính năng chính qua API là tìm kiếm (Tavily search) trích xuất (Tavily extract) cào dữ liệu web (Tavily crawl) sơ đồ thông tin (Tavily map) được tổng hợp lại các ưu điểm sau:\n• Tìm kiếm thời gian thực: Kết hợp tìm kiếm web trực tiếp từ nhiều nguồn (Google, Bing, DuckDuckGo, v.v.) để cung cấp dữ liệu mới nhất và nhanh nhất cho các LLM hoặc AI Agen hoặc hệ thống RAG và từ đó tổng hợp lại thông tin tất nhiên là có trích dẫn nguồn để đảm bảo tính minh bạch và chính xác.\n• API của Tavily cực kì thân thiện với LLM và RAG: API của Tavily cực kì thân thiện với LLM giúp Tavily có thể tham gia dễ dàng vào các workflow tự động hóa công việc không giống Perplexity tập trung vào trả lời hỏi đáp với AI dựa trên các dữ liệu tổng hợp và web search.\n• Hỗ trợ cả web crawl và web extract: Người dùng hoàn toàn có thể dựa trên AI để trích xuất nội dung văn bản đơn thuần của web thông qua Tavily crawl hoặc có thể chọn trích xuất nội dung đã được AI xử lý giúp phân biệt và chuẩn hóa tiêu đề, đoạn văn, metadata, bảng biểu, và các phần nội dung có ý nghĩa khác trên trang web thông qua Tavily extract với AI giúp giảm thiểu các công đoạn xử lý dữ liệu trong RAG.\n• Hỗ trợ tạo map cho web: Tavily sẽ trả về danh sách cả url được phát hiện trong website đó giúp người dùng có cái nhìn tổng quan về web đó, nếu ai đã dùng Webflow hoặc Relume hoặc làm SEO thì sẽ hiểu rõ về site map.\n• Hỗ trợ đa dạng nguồn dữ liệu: Ngoài dữ liệu web công khai, Tavily còn tích hợp các nguồn dữ liệu nội bộ riêng tư về tài chính, mã hóa, tin tức, v.v., giúp mở rộng phạm vi thông tin.\n• Chi phí: Tavly tính phí dựa trên số lần gửi và nhận thông tin qua API thông qua credit với gói miễn phí là 1000 credit / 1 tháng khi hết thì mua thêm là 0.008 USD/1 credit \nGói Project là 30 USD / 1 tháng với  4000 credit / 1 tháng khá là dư dùng.\n',
    logoUrl: '/image/Logo Tavily.png',
    link: 'https://tavily.com/',
    features: [
      "Tìm kiếm theo thời gian thực từ đó tổng hợp lại thông tin dựa trên AI có trích dẫn nguồn.",
"API cực kì thân thiện với LLM và RAG giúp Tavily dễ dàng tham gia vào các workflow .",
"Hỗ trợ cả web crawl và web extract và đều dựa trên AI.",
      "Hỗ trợ tạo map cho web",
      "Hỗ trợ đa dạng nguồn dữ liệu.",
      "Gói miễn phí hoàn toàn có thể dùng cho nghiên cứu sinh, sinh viên.",
    ],
    userRating: 4.4,
    totalStars: 264,
    ratingCount: 60,
  },
  {
    id: 'make',
    name: 'Make',
    context: 'Tự động hóa',
    developer: 'Celonis',
    description: 'Make.com là nền tảng tự động hóa quy trình làm việc (workflow automation) không cần mã (no-code/low-code), giúp người dùng kết nối và tự động hóa các ứng dụng quen thuộc như CRM, nền tảng lưu trữ đám mây, công cụ marketing, bán hàng… thông qua giao diện kéo-thả trực quan mà không cần kỹ năng lập trình.\n+ Make.com cho phép người dùng xây dựng các kịch bản tự động hóa (scenario) bằng cách kết nối các module đại diện cho từng hành động cụ thể trong quy trình làm việc. Make có những đặc điểm như sau:\n• Giao diện kéo thả trực quan : Giao diện kéo thả kết nối khá trực quan nhưng khó tùy chỉnh sâu như n8n, và đặc biệt có thể nhìn tổng quát không bị như zapier rất khó nhìn tổng quát.\n• Tích hợp hơn 1500 ứng dụng: Tuy vẫn chưa nhiều và phổ biến bằng Zapier nhưng đây vẫn đủ với hầu hết các công cụ hiện nay email, cloud, crm, thương mại điện tử, đầy đủ các dịch vụ AI của OpenAI, Claude AI, Google AI, Microsoft Azure AI. Còn các ứng dụng chưa kết nối trực tiếp thì đã có API và Http Request nên đây không phải vấn đề lớn.\n• Chỉ hỗ trợ JavaScript: Make hiện nay chỉ hỗ trợ code JavaScript để xử lý các logic phức tạp.\n• Có thể thêm AI để xử lý các quy trình làm việc: Hiện nay Make đã hỗ trợ các node AI để gửi và nhận dữ liệu thông qua API đến các nền tảng LLM của Google, Open AI, Claude,... còn về Make AI Agent thì nền tảng này mới triển khai tháng 4-2025 những AI Agent này được xây dựng dựa trên các mô hình ngôn ngữ lớn (LLM) hàng đầu như OpenAI, Claude AI, Google AI và Microsoft Azure AI, cho phép xử lý ngôn ngữ tự nhiên chính xác và linh hoạt. AI Agent trong Make có khả năng phối hợp với các module khác trong workflow để tự động hóa, thực thi các yêu cầu của người dùng.\n• Xử lý lỗi và gỡ lỗi hoặc có thể tạo scenario nhanh chóng với AI Assistant: Make cung cấp lịch sử chạy chi tiết, dữ liệu vào/ra từng module từ đó có thể cung cấp nhanh chóng cách sửa lỗi hoặc tạo mới scenario để xử lý vấn đề từ AI Assistant của Make nằm ở góc phải màn hình. Tuy người dùng vẫn phải sửa lỗi hoặc tạo scenario thủ công nhưng nên sử dụng AI Assistant của Make vì thực sự rất tốt nhưng mới triển khai ở dạng Beta thôi trong khi n8n và Zapier chưa triển khai.\n• Cộng đồng người dùng, tài nguyên cực lớn: Cộng đồng người dùng cũng rất lớn nhưng ý kiến cá nhân so với Zapier, n8n có thể chưa lớn bằng.\n• Chi phí: \nGói Free được dùng miễn phí với giới hạn 1000 lượt chạy / 1 tháng sau 1 tháng reset lại và 2 kịch bản chạy liên tục (active) 5 Mb file size (tức là gửi khoảng 4 bức ảnh lúc trở lên cùng lúc đến server thì make không thể xử lý được)\nGói Core với giá 9 - 11 USD/1 tháng với giới hạn 10.000 lượt chạy / 1 tháng sau 1 tháng reset lại , 100 Mb file size và không giới hạn kịch bản chạy active đó cũng là lý do người sử dụng n8n cloud có rất ít vì đối với người không biết nhiều về kĩ thuật thì hay dùng make vì có giá rẻ hơn.\nGói Pro với giá 16 - 19 USD/1 tháng với giới hạn 10.000 lượt chạy / 1 tháng sau 1 tháng reset lại , 250 Mb file size (hoàn toàn có thể xử lý nhiều video ở gói này ) và không giới hạn kịch bản chạy active đặc biệt hỗ trợ biến tùy chỉnh, đầu vào kịch bản, tìm kiếm nhật ký thực thi toàn văn bản.\nGói Teams với giá 29 - 34.12 USD/1 tháng với giới hạn 10.000 lượt chạy / 1 tháng sau 1 tháng reset lại , 500 Mb file size (hoàn toàn có thể xử lý nhiều video hơn ở gói này ) và không giới hạn kịch bản chạy active gói này có hỗ trợ thêm nhiều nhóm và phân quyền người dùng.\n.\n ',
    logoUrl: '/image/Logo Make.com.png',
    link: 'https://www.make.com/',
    features: [
      "Giao diện kéo thả trực quan.",
"Tích hợp hơn 1500 ứng dụng khác nhau và có đầy đủ các mô hình LLM .",
"AI Agent đã có thể phối hợp với module trong scenario để tự động hóa yêu cầu của người dùng rất tốt nhưng vẫn chưa so sánh được với Agent của n8n.",
      "Có thể gỡ lỗi sửa lỗi hoặc hướng dẫn tạo scenario với AI Assistant.",
      "Có gói miễn phí hoàn toàn có thể sử dụng được.",
      "Cộng đồng người dùng, tài nguyên rất lớn.",
    ],
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
    description: 'Sora là mô hình trí tuệ nhân tạo tiên tiến của OpenAI, với khả năng tạo ra các đoạn video ngắn lên đến 1 phút, giữ chất lượng hình ảnh cao và bám sát nội dung mô tả trong prompt.\n+ Sora được phát triển riêng biệt không tích hợp vào mô hình đa năng nào cả giống như Dall E có đường dẫn riêng.\n+ Sora hoàn toàn có chế độ tạo ảnh từ mô tả văn bản (prompt) nhưng tính năng này không phải là chính mặc dù ảnh chất lượng rất tốt nhưng chúng ta không thể chỉnh sửa trực tiếp ảnh tạo ra từ Sora mà chỉ còn cách prompt lại từ đầu.\n+ Các tính năng chính của Sora :\n• Hỗ trợ cả tạo video từ văn bản (Text-to-video) và tạo video từ ảnh (Image-to-video): Người dùng có thể chuyển đổi mô tả bằng chữ thành video chất lượng cao, phù hợp cho quảng cáo, mạng xã hội, giáo dục, kể chuyện hoặc có thể tải lên những hình ảnh nhất quán đã có sẵn để tạo thành những video theo phong cách riêng, phù hợp với thương hiệu và nhân vật.\n• Chỉnh sửa video trực tiếp bằng mô tả prompt: Tình năng tạo video là tính năng chính mà Sora tập trung nên hoàn toàn có thể chỉnh sửa trực tiếp video dựa trên hướng dẫn bằng văn bản hoặc thay đổi phong cách, môi trường và kết hợp các đoạn video một cách mượt mà.\n• Chuyển động camera động và nhất quán 3D: Mô phỏng chuyển động camera thực tế và duy trì sự ổn định, nhất quán trong không gian ba chiều. Vấn đề này bản phải đọc kĩ document của Sora để xem cách di chuyển camera nếu không video sẽ cực kì lộn xộn.\n• Tương tác với thế giới thực và nhất quán thời gian: Mô hình hóa các hành vi logic của các thành phần trong video, đảm bảo tính liên tục ngay cả khi đối tượng di chuyển hoặc bị che khuất tạm thời. \n• Tạo hình ảnh độ phân giải cao: Hỗ trợ tạo hình ảnh chi tiết lên đến 2048×2048 pixel, với các tỉ lệ khung hình 2:3, 3:2, 1:1 và tất nhiên phù hợp cho cả nội dung tĩnh và động..\n• Khả năng mở rộng video: Sora cho phép kéo dài video hiện có hoặc bổ sung khung hình bị thiếu để tạo ra đoạn phim liền mạch.\n• Tạo nhiều cảnh quay trong một video: Hỗ trợ tạo các cảnh quay khác nhau trong cùng một video với sự nhất quán về nhân vật và phong cách hình ảnh. Người dùng hoàn toàn có thể tải ảnh nhân vật lên để Sora lấy tham khảo tạo ra nhân vật\n• GIá cả: Tài khoản Free cho phép tạo 3 hình ảnh/1 ngày. Ngoài ra không tạo được video chỉ khi nâng cấp lên Plus (20 USD/1 tháng) cho phép tạo cả hình ảnh và video với video độ phân giải tối đa 720p, dài tối đa 10 giây hoặc nâng cấp lên gói ChatGPT Pro (200 USD/tháng) được tạo ảnh và video chất lượng cao hơn 1080p, thời lượng tối đa 20 giây, với giới hạn khoảng 500 video mỗi tháng, có thể tải xuống video không có watermark và tạo đồng thời 5 video cùng lúc.\n',
    logoUrl: '/image/Logo Open AI cho bảng xếp hạng.png',
    link: 'https://sora.chatgpt.com',
    features: [
      "Sora hỗ trợ tạo cả tạo video từ văn bản và tạo video từ ảnh.",
"Chỉnh sửa video trực tiếp từ mô tả prompt .",
"Chuyển động camera động và nhất quán.",
      "Tương tác với thế giới thực và nhất quán về thời gian",
      "Tạo hình ảnh độ phân giải cao có thể lên tới 2048x2048 pixel.",
      "Có khả năng mở rộng video hoặc tạo nhiều cảnh trong một video.",
    ],
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
    




    




    

    








