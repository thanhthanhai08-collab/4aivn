
import type { NewsArticle } from '@/lib/types';

export const mockNews2: NewsArticle[] = [
  {
    id: 'gpt-5-1-ra-mat',
    title: 'GPT-5.1 ra mắt với nâng cấp thông minh hơn,thân thiện hơn cùng khả năng điều chỉnh giọng điệu cá nhân hóa toàn diện hơn.',
    source: 'OpenAI',
    author: 'Mai',
    publishedAt: '2025-11-15T09:00:00Z',
    imageUrl: '/image/news2/Openai-ra-mat-chatpgt-5.1.png',
    dataAiHint: 'GPT-5.1 ra mắt 13/11/2025 với hai biến thể (Instant & Thinking) tập trung vào lý luận thích ứng (adaptive reasoning) và cá nhân hóa toàn diện giọng điệu (8 Personality Presets). Mô hình Instant nhanh và thân thiện, Thinking tối ưu cho suy luận phức tạp, đồng thời cải thiện hiệu quả token và tuân thủ hướng dẫn.',
    content: `<p>OpenAI vừa tung ra GPT-5.1, phiên bản nâng cấp mới nhất cho GPT-5 cung cấp năng lượng tươi mới cho ChatGPT, vào ngày 13 tháng 11 năm 2025. Bản cập nhật này được mô tả là một bước tiến về năng lực và trải nghiệm, tập trung vào việc làm cho ChatGPT thông minh hơn, dễ trò chuyện hơn và dễ tùy chỉnh hơn bao giờ hết.</p>
<p>Bản làm mới này được công bố cực nhanh chỉ ba tháng sau khi GPT-5 ra mắt (tháng 8/2025), nhằm giải quyết những phàn nàn từ người dùng rằng mô hình trước đó cảm thấy lạnh lùng và đôi khi xử lý các tác vụ kém hơn các GPT-4o hoặc GPT-4. OpenAI cho biết họ đã lắng nghe ý kiến người dùng, rằng một AI tuyệt vời không chỉ cần thông minh mà còn phải thú vị khi trò chuyện.</p>
<p>CEO Sam Altman của OpenAI gọi GPT-5.1 là "một bản nâng cấp tốt" và đặc biệt thích những cải tiến về khả năng làm theo hướng dẫn và tính năng tư duy thích ứng.</p>


<h2><strong>Hai Biến Thể Mới: Instant và Thinking</strong></h2>
<p>GPT-5.1 vẫn ra mắt với hai biến thể được nâng cấp, nhằm mục tiêu tối ưu hóa trải nghiệm người dùng:</p>


<h3>GPT-5.1 Instant:</h3>
<ul>
    <li>Đây chắc chắn sẽ là mô hình được sử dụng rộng rãi nhất của ChatGPT.</li>
    <li>Mặc định thân thiện và trò chuyện tự nhiên hơn. Các thử nghiệm ban đầu cho thấy nó có thể gây bất ngờ bởi sự linh hoạt và dí dỏm trong khi vẫn duy trì sự rõ ràng và hữu ích.</li>
    <li>Nó ưu tiên tốc độ và đối thoại trôi chảy, rất phù hợp cho các tác vụ như động não hoặc tóm tắt bài viết.</li>
    <li>Lần đầu tiên, GPT-5.1 Instant có thể sử dụng lý luận thích ứng (adaptive reasoning) để tự quyết định khi nào cần suy nghĩ sâu hơn trước khi trả lời các câu hỏi khó. Điều này giúp mô hình đưa ra phản hồi chính xác và chi tiết hơn mà vẫn duy trì tốc độ nhanh.</li>
</ul>


<h3>GPT-5.1 Thinking:</h3>
<ul>
    <li>Mô hình này được thiết kế cho các tác vụ suy luận phức tạp và chuyên sâu hơn.</li>
    <li>Nó tự điều chỉnh thời gian suy nghĩ: dành nhiều thời gian hơn cho các vấn đề phức tạp và phản hồi nhanh hơn với các câu hỏi đơn giản.</li>
    <li>So với GPT-5 Thinking, phiên bản 5.1 này nhanh hơn khoảng gấp đôi trên các tác vụ dễ dàng nhưng lại chậm hơn gấp đôi trên các tác vụ khó nhất.</li>
    <li>Điểm đặc biệt là cách phản hồi đã được cải thiện, giảm bớt các từ ngữ chuyên môn khô khan, khó hiểu. Điều này giúp mọi người dễ dàng nắm bắt các kiến thức phức tạp mà không cảm thấy khó khăn hay mơ hồ như trước.</li>
</ul>


<p>Cả hai mô hình đều vẫn giữ ưu điểm của GPT-5 là sử dụng một bộ định tuyến thông minh, có khả năng tự động phân loại và chuyển tiếp truy vấn đến mô hình hiệu quả nhất. Nhờ vậy, người dùng hoàn toàn thoát khỏi việc phải tự tay lựa chọn mô hình, tiết kiệm thời gian và công sức. và OpenAI báo cáo rằng bộ định tuyến này xác định độ phức tạp chính xác trong 94% trường hợp sử dụng.</p>

[GPT5_V1_TOKEN_CHART]

<h2><strong>Nâng cấp thông minh: tốc độ, hiệu quả và độ chính xác</strong></h2>
<p>Đối với các nhà phát triển và người dùng chuyên nghiệp, GPT-5.1 mang lại những cải tiến đáng kể về khả năng và hiệu suất:</p>
<ul>
    <li>Lý luận thích ứng (Adaptive reasoning): Hệ thống này cho phép mô hình phân bổ nguồn lực tính toán động, đáp ứng nhanh chóng với các truy vấn đơn giản trong khi dành độ sâu xử lý lớn hơn cho các tác vụ phức tạp.</li>
    <li>Hiệu suất Coding tốt hơn: GPT-5.1 được thiết kế để tăng tốc độ viết code và giảm chi phí. Việc giới thiệu chế độ "no reasoning" (không suy luận sâu) lý tưởng cho các tác vụ tra cứu đơn giản, giúp cắt giảm đáng kể độ trễ (latency) và tiêu thụ token (chi phí).</li>
    <li>Hiệu quả Token: GPT-5.1 Thinking đạt kết quả tốt hơn mô hình o3 trước đó của OpenAI, trong khi sử dụng ít hơn 50-80% token đầu ra. Điều này thay đổi cơ bản tính kinh tế của việc triển khai AI, đặc biệt là đối với các tác vụ lập trình phức tạp.</li>
    <li>Bộ nhớ đệm đã được nâng cấp, mở rộng thời gian ghi nhớ prompt (prompt catching) của bạn đến 24 giờ. Những yêu cầu thường xuyên sẽ chỉ cần được xử lý một lần, từ đó tăng tốc độ phản hồi và giảm chi phí một cách hiệu quả cho những ứng dụng sử dụng AI</li>
    <li>Cải thiện tuân thủ hướng dẫn: Mô hình giờ đây tuân thủ tốt hơn các hướng dẫn tùy chỉnh, với các ví dụ như người dùng yêu cầu các câu trả lời của ChatGPT ngắn gọn hơn thì nó sẽ ngăn chặn những hành vi phụ làm cho câu trả lời dài dòng hơn, ví dụ như tạo thêm các báo cáo, hoặc bình luận dài dòng hơn.</li>
</ul>


<h2><strong>Khả năng điều chỉnh giọng điệu cá nhân hóa toàn diện</strong></h2>
<p>Một trong những cập nhật lớn nhất của GPT-5.1 là khả năng tùy chỉnh giọng điệu và phong cách giao tiếp để phù hợp với sở thích đa dạng của người dùng.</p>


<h3>Các chế độ giọng điệu và tính cách (Personality Presets):</h3>
<p>Người dùng có thể chọn tới 8 chế độ cá tính khác nhau, áp dụng ngay lập tức trên mọi cuộc trò chuyện:</p>
<ul>
    <li>Mặc định (Default).</li>
    <li>Chuyên nghiệp (Professional).</li>
    <li>Thân thiện (Friendly) (trước đây là Listener).</li>
    <li>Thẳng thắn (Candid).</li>
    <li>Hài hước/Khác biệt (Quirky).</li>
    <li>Hiệu quả (Efficient) (trước đây là Robot).</li>
    <li>Mọt sách (Nerdy).</li>
    <li>Hoài nghi (Cynical).</li>
</ul>


<h3>Khả năng tinh chỉnh (Fine-tuning controls):</h3>
<p>Ngoài các cài đặt sẵn, OpenAI đang thử nghiệm các điều khiển chi tiết hơn, cho phép người dùng tinh chỉnh các đặc điểm cụ thể của ChatGPT:</p>
<ul>
    <li>Mức độ ngắn gọn (Conciseness).</li>
    <li>Mức độ thân thiện (Warmth).</li>
    <li>Mức độ dễ đọc/dễ quét (Scannability).</li>
    <li>Tần suất sử dụng biểu tượng cảm xúc (emoji).</li>
</ul>
<p>Thậm chí, ChatGPT có thể chủ động đề xuất cập nhật tùy chọn giọng điệu và phong cách trong khi trò chuyện.</p>


<h2><strong>Khả năng triển khai và API</strong></h2>
<p>GPT-5.1 Instant và Thinking đang được triển khai dần dần.</p>
<ul>
    <li>Người dùng trả phí (Pro, Plus, Go, Business) sẽ là những người đầu tiên nhận được quyền truy cập. Một vài ngày nữa thì sẽ đến lượt người dùng miễn phí .</li>
    <li>Các gói Enterprise và Education có quyền truy cập sớm 7 ngày.</li>
    <li>Các mô hình GPT-5 cũ vẫn sẽ sử dụng được trong vòng 3 tháng đối với người dùng vẫn thích mô hình cũ hơn.</li>
    <li>Open AI dự kiến sẽ mở kết nối API sau khoảng 7 ngày. GPT-5.1 Instant sẽ có tên API là gpt-5.1-chat-latest, và GPT-5.1 Thinking là gpt-5.1.</li>
</ul>


<p>GPT-5.1 sẽ không chỉ là một bản cập nhật thú vị hơn với khả năng suy luận thích ứng mạnh mẽ, mà còn là sự khẳng định vị thế dẫn đầu trong việc hướng tới việc cá nhân hóa hoàn toàn trải nghiệm AI. Với các tùy chọn điều chỉnh giọng điệu và phong cách, OpenAI đang cố gắng đảm bảo rằng mô hình hàng đầu của họ không chỉ thông minh mà còn dễ sử dụng, thân thiện và thích ứng với sở thích riêng của từng người dùng.</p>`
  },
  {
    id: 'lo-hong-chatgpt-atlas',
    title: 'Lỗ hổng nghiêm trọng khiến người dùng ChatGPT Atlas có thể bị đánh cắp dữ liệu với mã độc',
    source: 'LayerX Security',
    author: 'Mai',
    publishedAt: '2025-11-04T09:00:00Z',
    imageUrl: '/image/news2/Anh-lo-hong-nghiem-trong-chatpgt-atlas.png',
    dataAiHint: 'Trình duyệt AI ChatGPT Atlas có lỗ hổng CSRF nghiêm trọng, cho phép chèn lệnh độc hại vĩnh viễn vào tính năng \'Memory\' của AI, dẫn đến nguy cơ đánh cắp dữ liệu. Khả năng bảo mật chống lừa đảo của Atlas kém hơn 90% so với Google Chrome và Microsoft Edge.',
    content: `<p>OpenAI gần đây đã ra mắt trình duyệt AI ChatGPT Atlas, một bước đi nhằm thách thức sự thống trị của Google Chrome và thúc đẩy thói quen tìm kiếm dựa trên AI. Điểm khác biệt cốt lõi của Atlas là đặt ChatGPT vào vị trí trung tâm của trải nghiệm duyệt web.</p>
<p>Tuy nhiên, trình duyệt AI này đã nhanh chóng bị phát hiện một lỗ hổng bảo mật nghiêm trọng ngay sau khi ra mắt. Lỗ hổng này đặc biệt nguy hiểm vì nó có thể cho phép hacker đánh cắp dữ liệu người dùng bằng mã độc có khả năng tồn tại "vĩnh viễn" trong bộ nhớ của AI.</p>
<h2><strong>Lỗ hổng giả mạo yêu cầu chéo trang (CSRF) khai thác Bộ nhớ AI</strong></h2>
<p>Theo báo cáo từ LayerX Security, cuộc tấn công này khai thác lỗ hổng giả mạo yêu cầu chéo trang (CSRF) để chèn các lệnh độc hại vào bộ nhớ liên tục của ChatGPT.</p>
<p>Tính năng "Memory" (bộ nhớ) được thiết kế để AI ghi nhớ các chi tiết hữu ích như tên hoặc sở thích của người dùng nhằm cá nhân hóa các phản hồi. Tuy nhiên, giờ đây, tính năng hữu ích này lại có thể bị "làm hỏng" và biến thành một vũ khí dai dẳng để chạy mã tùy ý.</p>
<h3>Kịch bản tấn công diễn ra như thế nào?</h3>
<p>Kịch bản tấn công được mô tả diễn ra khá đơn giản:</p>
<ol>
    <li>Người dùng đăng nhập vào ChatGPT Atlas.</li>
    <li>Họ bị lừa nhấp vào một liên kết độc hại.</li>
    <li>Trang web độc hại này sau đó bí mật kích hoạt yêu cầu CSRF, âm thầm đưa hướng dẫn độc hại vào bộ nhớ ChatGPT của nạn nhân.</li>
</ol>
<h3>Mối đe dọa từ việc bộ nhớ bị Tiêm nhiễm Bộ nhớ Thường trú</h3>
<p>Điều khiến lỗ hổng này trở nên đặc biệt nguy hiểm là nó nhắm vào bộ nhớ liên tục của AI, chứ không chỉ phiên trình duyệt.</p>
<ul>
    <li><strong>Tính chất vĩnh viễn:</strong> Michelle Levy, Giám đốc nghiên cứu bảo mật tại LayerX Security, giải thích rằng kẻ tấn công đã dùng thủ thuật để "lừa" AI ghi lệnh độc hại vào bộ nhớ. Lệnh này sẽ nằm vùng vĩnh viễn trong AI — trừ khi người dùng tự tay vào cài đặt để xóa — và có thể được kích hoạt trên nhiều thiết bị và phiên làm việc. Thậm chí, việc đổi máy tính, đăng xuất rồi đăng nhập lại hay dùng một trình duyệt khác cũng không loại bỏ được lệnh độc hại này.</li>
    <li><strong>Hậu quả:</strong> Khi người dùng đưa ra một truy vấn hoàn toàn hợp pháp sau này (ví dụ: yêu cầu AI viết mã), các “bộ nhớ" bị nhiễm độc sẽ được kích hoạt. Hậu quả là hacker có thể chạy mã ngầm, đánh cắp dữ liệu hoặc chiếm được các quyền kiểm soát cao hơn trên hệ thống.</li>
</ul>
<h3>Hệ thống phòng thủ kém so với đối thủ</h3>
<p>LayerX Security cũng chỉ ra rằng vấn đề bảo mật trên ChatGPT Atlas trở nên trầm trọng hơn do trình duyệt này thiếu các biện pháp kiểm soát chống lừa đảo mạnh mẽ.</p>
<p>Trong các thử nghiệm với hơn 100 lỗ hổng và trang lừa đảo, Atlas chỉ ngăn chặn được 5,8% các trang web độc hại. Con số này quá khiêm tốn so với Google Chrome (47%) hay Microsoft Edge (53%), khiến người dùng Atlas "dễ bị tấn công hơn tới 90%" so với các trình duyệt truyền thống.</p>
[ATLAS_SECURITY_CHART]
<p>Phát hiện này cho thấy các trình duyệt AI đang trở thành một mặt trận tấn công mới.</p>
<h3>Cách người dùng ChatGPT tự bảo vệ bản thân</h3>
<p>Nếu bạn lo lắng về việc thông tin cá nhân bị lưu trữ hoặc bị ô nhiễm trong bộ nhớ AI, bạn có thể thực hiện các biện pháp sau:</p>
<ol>
    <li><strong>Xóa bộ nhớ đã lưu (Manage memories):</strong>
        <ul>
            <li>Bạn có thể khiến ChatGPT "quên" thông tin cá nhân bằng cách nhấp vào biểu tượng hồ sơ của mình.</li>
            <li>Chọn cài đặt (Settings) > Cá nhân hóa (Personalization).</li>
            <li>Sau đó, nhấp vào liên kết quản lý bộ nhớ (Manage memories).</li>
            <li>Tại đây, bạn sẽ nhận được một danh sách đầy đủ tất cả các sự thật mà ChatGPT đã lưu trữ về bạn. Bạn có thể chọn Xóa tất cả (Delete All) ở cuối cửa sổ để xóa sạch bộ nhớ của nó.</li>
            <li>Để ngăn ChatGPT lưu trữ bất kỳ thông tin cá nhân nào trong tương lai, bạn có thể quay lại màn hình trước đó và tắt tùy chọn tham chiếu bộ nhớ đã lưu (Reference saved memories).</li>
        </ul>
    </li>
    <li><strong>Sử dụng chế độ trò chuyện tạm thời:</strong>
        <ul>
            <li>Nếu bạn muốn thảo luận với ChatGPT về một vấn đề cá nhân hoặc điều gì đó không muốn nó lưu trữ, hãy sử dụng chế độ trò chuyện tạm thời (temporary chat).</li>
            <li>Chế độ này được kích hoạt bằng cách nhấp vào biểu tượng bong bóng thoại có dấu chấm ở cạnh ảnh hồ sơ của bạn.</li>
            <li>Khi ở chế độ này, AI sẽ không lưu trữ bất kỳ điều gì vào bộ nhớ của nó và cuộc trò chuyện cũng sẽ không xuất hiện trong lịch sử của bạn.</li>
        </ul>
    </li>
    <li><strong>Không chia sẻ thông tin nhạy cảm:</strong>
        <ul>
            <li>Tuyệt đối không tiết lộ các loại thông tin như thông tin định danh (số căn cước công dân, bằng lái xe, hộ chiếu, địa chỉ, số điện thoại), kết quả khám bệnh, thông tin tài chính (số tài khoản ngân hàng), thông tin độc quyền của doanh nghiệp, hoặc thông tin đăng nhập (mật khẩu, mã PIN) cho AI.</li>
        </ul>
    </li>
    <li><strong>Bảo mật tài khoản bằng 2FA:</strong>
        <ul>
            <li>Để loại bỏ gần như hoàn toàn rủi ro bên thứ ba xâm nhập vào tài khoản của bạn và thu thập dữ liệu cá nhân, hãy bật xác thực hai yếu tố (2FA). Bạn thực hiện việc này bằng cách vào Cài đặt (Settings) > Bảo mật (Security) và nhấp để bật xác thực đa yếu tố (multi-factor authentication).</li>
        </ul>
    </li>
</ol>`
  },
  {
    id: 'tao-mini-app-ai-mien-phi-cung-google-ai-studio',
    title: 'Tạo mini app miễn phí chỉ với vài cú click cùng Google AI Studio',
    source: 'Google',
    author: 'Mai',
    publishedAt: '2025-10-31T09:00:00Z',
    imageUrl: '/image/news2/Suc-manh-tao-app-google-ai-studio.png',
    dataAiHint: "Google AI Studio là môi trường phát triển miễn phí, giúp bất kỳ ai tạo ứng dụng AI không cần code bằng cách sử dụng các mô hình Gemini 2.5 Pro/Flash và tích hợp dễ dàng các API/SDK của Google (như Google Maps, Google Search, Veo 3).",
    content: `<p>Trí tuệ nhân tạo (AI) đang thay đổi hoàn toàn cách con người tạo ra ứng dụng (app). Giờ đây, bạn không cần là lập trình viên chuyên nghiệp chỉ cần một trợ lý AI thông minh, bạn đã có thể biến ý tưởng thành sản phẩm thật.</p>
<p>Google AI Studio chính là minh chứng rõ nhất cho sự thay đổi đó. Nền tảng này cho phép bất kỳ ai, dù không biết lập trình, cũng có thể tạo ứng dụng theo ý mình. Với bản cập nhật mới nhất, việc làm app AI giờ đơn giản như trò chuyện tự nhiên với các mô tả ý tưởng bằng ngôn ngữ tự nhiên, phần còn lại để AI lo.</p>
<h2><strong>1. Google AI Studio: Lập trình AI không cần biết code</strong></h2>
<p>Google AI Studio là một môi trường phát triển chạy trực tiếp trên trình duyệt, được tạo ra để đơn giản hóa tối đa quá trình tạo mẫu và xây dựng ứng dụng dựa trên các mô hình AI mạnh mẽ của Google — hiện tại là Gemini 2.5 Pro và Gemini 2.5 Flash.</p>
<p>Nếu trước đây, Gemini chỉ được ví như “bộ não” thông minh của ứng dụng, thì giờ đây Google AI Studio đã giúp nó có thêm “tay chân” với khả năng kết nối trực tiếp tới các API và SDK trong hệ sinh thái Google (thông qua mục Supercharge your apps with AI). Nhờ đó, việc mở rộng tính năng trở nên cực kỳ dễ dàng, bạn có thể khiến ứng dụng hoạt động đúng như mong muốn mà không cần phải tự tay cấu hình API, SDK rườm rà như trước.</p>
<p>Tất nhiên, với các API hoặc SDK của bên thứ ba, bạn vẫn cần nhập thủ công. Nhưng nhờ hệ sinh thái “khổng lồ” của Google — bao gồm Nano Bananas, Veo 3, Text-to-Speech, Google Search, và đặc biệt là Google Maps — gần như mọi nhu cầu cơ bản đều đã được đáp ứng.</p>
<p>Mình đã thử nghiệm và có thể xác nhận rằng Google Maps hoạt động hoàn toàn ổn định cho mini app tại Việt Nam, ví dụ như ứng dụng tìm đường hay xem giao thông theo thời gian thực. Còn khi dùng dữ liệu từ Google Search, kết quả trả về quá “chất lượng” — không cần phụ thuộc vào các công cụ cào dữ liệu (scraping) khác nữa.</p>
<p>Hoặc đơn giản chúng ta có thêm chế độ suy luận thông minh cho ứng dụng khi kết nối với Gemini 2.5 Pro hoặc tăng tốc trả lời cho chatbot với Gemini 2.5 Flash-lite một phiên bản rút gọn của Gemini 2.5 Flash.</p>
<p>Điểm cộng lớn tiếp theo Google AI Studio thì nó hiện hoàn toàn miễn phí để trải nghiệm. Mình đã dùng thử và chưa mất bất kỳ khoản phí nào với lượng credit miễn phí mà Google cung cấp khá hào phóng, đủ để thoải mái thử sức với Gemini 2.5, Nano Bananas, Veo 3 và nhiều công cụ khác cho mục đích cá nhân.</p>
<h2><strong>2. Hướng Dẫn Từng Bước Tạo Mini App AI</strong></h2>
<p>Quá trình tạo ứng dụng trên Google AI Studio rất đơn giản, chỉ cần thực hiện theo các bước sau:</p>
<h3>Bước 1: Truy cập và Thiết lập</h3>
<ol>
    <li><strong>Truy cập:</strong> Bạn truy cập vào trang công cụ Google AI Studio.</li>
    <li><strong>Đăng nhập:</strong> Đăng nhập bằng tài khoản Google của bạn.</li>
    <li><strong>Bắt đầu xây dựng:</strong> Vào tab “Build” (Xây dựng). Tại đây khi chọn vào tab Start, bạn có thể chọn mô hình AI (mặc định là Gemini 2.5 Pro hoặc Gemini 2.5 Flash làm trợ lý chính cho bạn) và bạn cũng có thể chọn ngôn ngữ lập trình ở đây là React hoặc Angular tùy bạn thích nếu không chọn thì AI sẽ mặc định là React.</li>
</ol>
<h3>Bước 2: Lên ý tưởng cho ứng dụng</h3>
<p>Nếu bạn vẫn chưa nghĩ ra ý tưởng cụ thể, đừng lo hãy ghé vào <strong>App Gallery</strong> để xem qua những ứng dụng mẫu mà Google hoặc cộng đồng người dùng đã tạo. Đây là cách nhanh nhất để bạn lấy cảm hứng và hiểu rõ hơn về những gì có thể làm được.</p>
<p>Còn nếu bạn “lười” hơn một chút, thì chỉ cần nhấn vào nút <strong>I’m feeling lucky</strong> trong tab Start. Ngay lập tức, Google AI Studio sẽ gợi ý cho bạn những ý tưởng thú vị, kèm theo ví dụ về cách tích hợp các API, SDK (trong mục Supercharge your apps with AI) và những prompt mà AI sử dụng. Cách này vừa tiết kiệm thời gian, vừa giúp bạn học được cách AI tư duy khi tạo ứng dụng.</p>
<p>Nếu bạn đã có ý tưởng rõ ràng thì đến phần tiếp thôi nào.</p>
<h3>Bước 3: Viết yêu cầu (Prompt) cụ thể</h3>
<p>Nếu bạn chưa có một prompt chi tiết với đầy đủ yêu cầu về chức năng, ngôn ngữ hay giao diện như các mẫu trong nút I’m feeling lucky, cũng không sao cả. Bạn hoàn toàn có thể tạo ứng dụng chỉ với một câu đơn giản, ví dụ: “Tạo cho tôi ứng dụng ghép ảnh.” Lúc này, AI sẽ tự động quyết định mọi thứ và thực hiện các bước còn lại cho bạn.</p>
<p>Tuy nhiên, việc mô tả càng chi tiết thì kết quả sẽ càng sát ý tưởng, giúp giảm thời gian chỉnh sửa. Nếu có thể, bạn nên cung cấp hình ảnh tham chiếu hoặc bản phác thảo từ các công cụ như Figma hay Canva, vì AI có thể hiểu và tạo giao diện gần như chính xác theo mẫu đó.</p>
<p>Đừng quên thêm các tính năng bổ trợ trong mục <strong>Supercharge your apps with AI</strong> để AI tự kết nối các API hoặc SDK cần thiết, hoặc thậm chí bật chế độ suy luận thông minh cho ứng dụng.</p>
<p>Ví dụ, một prompt chi tiết có thể như sau, các bạn có thể tham khảo</p>
<p>“Tạo một AI Web App cho phép người dùng:</p>
<ul>
    <li>Tải lên 2 ảnh (1 & 2) → Ứng dụng sẽ ghép thành 1 ảnh tổng hợp.</li>
    <li>Hỗ trợ nhiều tỉ lệ ảnh: 1:1, 16:9, 4:3, 3:2.</li>
    <li>Có xem trước ảnh, nút tải xuống (Download).</li>
    <li>Lưu lịch sử tạo ảnh (gồm ảnh kết quả, prompt và thời gian).”</li>
</ul>
<p>Sau khi hoàn thiện prompt, chỉ cần bấm <strong>Build</strong> và chờ vài giây để xem kết quả.</p>
[IMAGE:/image/news2/Anh-google-ai-studio-app.png|Ảnh tạo từ Google Ai Studio|App Google AI studio]
<h3>Bước 4: AI tự động thực hiện các bước</h3>
<p><strong>Quá trình xây dựng:</strong> AI Studio sẽ chạy chương trình, qua các giai đoạn như</p>
<ul>
    <li>Xác định phạm vi giao diện (Defining the UI Scope).</li>
    <li>Phát triển ứng dụng React (Developing the React App).</li>
    <li>Lên kế hoạch cấu trúc ứng dụng (Planning the app structure).</li>
    <li>Tích hợp Gemini API (Integrating Gemini API).</li>
    <li>Tự động phát hiện và sửa lỗi (Auto fix error).</li>
</ul>
<p><strong>2. Xem trước và sửa ứng dụng bằng hội thoại:</strong></p>
<p>Giao diện của mini app sẽ hiển thị bản xem trước (preview) ngay trong trình duyệt, giúp bạn thấy ngay ứng dụng hoạt động như thế nào.</p>
<p>Với dân lập trình (dev), bạn có thể chỉnh sửa trực tiếp trong phần code. Nhưng nếu bạn không rành kỹ thuật, thì cũng chẳng sao cả — chỉ cần trò chuyện với AI, bạn vẫn có thể yêu cầu thêm, bớt hoặc chỉnh sửa tính năng mà không cần đụng đến một dòng mã nào.</p>
<p>Ví dụ, bạn có thể nói:</p>
<ul>
    <li>“Thêm cho tôi ảnh 3 và ảnh 4 để ghép 4 ảnh thành 1”</li>
    <li>hoặc “Đổi giao diện sang nền tối.”</li>
</ul>
[IMAGE:/image/news2/Anh-studio-app-sau-chinh-sua.png|Chỉnh sửa app từ Google Ai Studio|Chỉnh sửa ngôn ngữ tự nhiên]
<p>Nếu bạn chưa thêm các API hoặc SDK trong mục Supercharge your apps with AI ở bước trước, cũng đừng lo. Chỉ cần một prompt đơn giản, AI sẽ tự động tích hợp các API hoặc SDK cần thiết vào mini app của bạn — nhanh gọn và cực kỳ tiện lợi.</p>
<p>Bạn thậm chí có thể yêu cầu những tính năng nâng cao như:</p>
<ul>
    <li>Tạo video từ ảnh bằng Veo 3, ứng dụng sẽ tự động kết nối với API của Veo.</li>
    <li>Thêm nút chuyển giọng nói thành văn bản để tăng tính tương tác cho app.</li>
</ul>
<p>Và điều thú vị nhất là: bạn có thể chỉnh sửa ứng dụng như đang dùng Canva hay Figma với nút <strong>Annotate app</strong> — nơi bạn có thể vẽ, thêm chữ, đổi màu... tất cả đều diễn ra tự nhiên và trực quan nhất có thể.</p>
[IMAGE:/image/news2/Nut-annotate app-Google-ai-studio.png|Nút annotate app từ Google Ai Studio|Chỉnh sửa tự nhiên hơn]
<h3>Bước 4: Chạy thử và Triển khai</h3>
<p>Sau khi hoàn thiện, bạn có các tùy chọn sau:</p>
<table style="border-collapse: collapse; width: 100%; border: 1px solid #e0e0e0;">
  <thead style="border: 1px solid #e0e0e0;">
    <tr style="border: 1px solid #e0e0e0;">
      <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Hành động</th>
      <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Cách thực hiện</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border: 1px solid #e0e0e0;">
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Chạy thử trong trình duyệt</td>
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Nhấn nút "Run" hoặc xem live preview.</td>
    </tr>
    <tr style="border: 1px solid #e0e0e0;">
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Chia sẻ app qua link</td>
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Nhấn "Share" → Copy link.</td>
    </tr>
    <tr style="border: 1px solid #e0e0e0;">
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Tải về mã nguồn</td>
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Nhấn "Download" (File ZIP chứa mã React + TypeScript).</td>
    </tr>
    <tr style="border: 1px solid #e0e0e0;">
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Triển khai lên cloud</td>
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Nhấn "Deploy" → Google Cloud Run (cần tài khoản Google Cloud).</td>
    </tr>
  </tbody>
</table>
<h2><strong>3. Có thể phát triển app hoàn chỉnh với Google AI Studio không?</strong></h2>
<p>Tất nhiên, với mục đích cá nhân hoặc thử nghiệm ý tưởng nhanh, Google AI Studio là lựa chọn tuyệt vời vừa dễ dùng, vừa có chi phí gần như bằng 0. Tuy nhiên, nếu bạn muốn xây dựng một ứng dụng hoàn chỉnh (full-stack) với phần backend, UX, UI... mà vẫn không biết lập trình, thì nên cân nhắc các nền tảng khác phù hợp hơn.</p>
<table style="border-collapse: collapse; width: 100%; border: 1px solid #e0e0e0;">
  <thead style="border: 1px solid #e0e0e0;">
    <tr style="border: 1px solid #e0e0e0;">
      <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Mục đích</th>
      <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Công cụ được đề xuất</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border: 1px solid #e0e0e0;">
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Sử dụng Cá nhân, Tạo mẫu nhanh (Prototyping), Thử nghiệm ý tưởng</td>
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Google AI Studio</td>
    </tr>
    <tr style="border: 1px solid #e0e0e0;">
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Phát triển ứng dụng thương mại, Sản phẩm full-stack, Cần khả năng mở rộng</td>
      <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Google Firebase, Lovable, Bolt, Replit, Microsoft 365</td>
    </tr>
  </tbody>
</table>
<p>Google AI Studio không phải lựa chọn tối ưu để phát triển sản phẩm ở quy mô lớn hay cần bảo mật cao. Thay vào đó, bạn có thể tải mã nguồn (code) từ AI Studio rồi tải lên hoặc có thể sysn trực tiếp qua Github để tiếp tục triển khai tiếp trên những nền tảng khác như Firebase Studio (trong hệ sinh thái Google), Lovable, Replit, hoặc Bolt, Microsoft 365. Các nền tảng này giúp bạn hoàn thiện ứng dụng hơn, với các tính năng back-end mạnh mẽ đồng thời vẫn tận dụng được sức mạnh của AI từ Google AI Studio.</p>`
  },
  {
    id: 'notebooklm-cong-cu-hoc-tap-nghien-cuu',
    title: 'NotebookLM: Công cụ tuyệt vời để học tập và nghiên cứu',
    source: 'Google',
    author: 'Mai',
    publishedAt: '2025-09-13T10:00:00Z',
    imageUrl: '/image/news2/Notebook LM công cụ học tập.png',
    dataAiHint: 'NotebookLM công cụ học tập nghiên cứu',
    content: `<p>Sự ra đời của các Mô hình Ngôn ngữ Lớn (LLM) đã tạo ra một sự thay đổi mô hình trong cách con người tương tác với công nghệ AI, mang lại tiềm năng chưa từng có để tăng năng suất và giảm bớt các tác vụ tẻ nhạt cho những người làm công việc tri thức. Khi những công cụ mạnh mẽ này ngày càng phổ biến, các ứng dụng chuyên biệt đang xuất hiện để đáp ứng nhu cầu cụ thể trong các lĩnh vực khác nhau. Một trong những công cụ đó, NotebookLM, do Google Lab phát triển, nổi bật như một trợ lý AI đầy hứa hẹn được thiết kế đặc biệt để tăng cường học tập và nghiên cứu bằng cách hợp lý hóa tương tác với tài liệu và thông tin.</p>
    [IMAGE:/image/news2/NotebookLM.png|Minh họa NotebookLM|NotebookLM AI]
    <h2><strong>NotebookLM là gì? Một trợ lý nghiên cứu được hỗ trợ bởi Gemini</strong></h2>
    <p>NotebookLM là một công cụ hỗ trợ người dùng trong việc ghi chú, nghiên cứu và làm việc với tài liệu. NotebookLM được Google tích hợp mô hình Gemini mới nhất, nó cho phép người dùng thực hiện nhiều tác vụ khác nhau như tóm tắt các văn bản dài, trả lời câu hỏi dựa trên nội dung đầu vào và gợi ý thông tin liên quan để mở rộng một chủ đề. Một điểm khác biệt chính của NotebookLM là khả năng hoạt động theo nguyên tắc của hệ thống RAG (Retrieval-Augmented Generation) tức là chỉ phân tích dựa trên các nguồn dữ liệu do người dùng cung cấp. Điều này giúp giảm đáng kể rủi ro "ảo giác" – việc tạo ra thông tin không chính xác hoặc không tồn tại là tính trạng chung với các LLM hiện nay. Tính năng này đảm bảo rằng tất cả các phản hồi đều dựa trên các nguồn có thể kiểm chứng, một khía cạnh quan trọng cho tính chính xác trong học thuật và nghiên cứu.</p>
    <p>NotebookLM cung cấp một bộ chức năng giải quyết trực tiếp các thách thức phổ biến trong quy trình học tập và nghiên cứu:</p>
    <h2><strong>Nạp dữ liệu đầu vào đa dạng</strong></h2>
    <p>Nó vẫn giống như các LLM chung có thể đưa dữ liệu vào dạng văn bản, khác biệt ở đây là NotebookLM có thể xử lý nhiều định dạng tài liệu. Người dùng có thể tải lên tệp trực tiếp từ máy tính (ví dụ: PDF, Doc, tệp văn bản), chọn tài liệu từ Google Docs hoặc Google Slides, hoặc cung cấp liên kết đến các trang web và thậm chí cả video YouTube. Nó thậm chí còn có thể tự động khám phá các nguồn có liên quan (thông qua tính năng Discover) dựa trên truy vấn của người dùng và thêm chúng vào không gian làm việc để phân tích.<br>
    Khả năng thu thập rộng rãi này biến nó thành một trung tâm linh hoạt để tổng hợp tài liệu nghiên cứu khác hẳn với tính năng Deep Reasearch trên các LLM đang phát triển như Gemini, ChatGPT là chúng ta có thể chọn lọc nguồn đầu vào khi sử dụng NotebookLM còn đối với Deep Reasearch thì không thể.</p>
    <h2><strong>Xử lý thông tin thông minh</strong></h2>
    <ul>
        <li>Tóm tắt: Người làm công việc nghiên cứu hay bất cứ công việc gì cần sự nhanh chóng và chính xác thường cần cô đọng nội dung dài. NotebookLM vượt trội ở khía cạnh này, không chỉ vậy khi người dùng thấy một tóm tắt hay thì có thể bấm 2 nút add to note là có thể chỉnh sửa biến thành nguồn dữ liệu đầu vào của chính nội dung đó khi bấm nút convert to source, từ đó cho thấy việc kiểm soát nội dung đầu vào cực kì tiện lợi của NotebookLM.
        Tuy nhiên có một nhược điểm ở đây là nếu chúng ta không bấm add to note thì khi tải lại trang thì những tóm tắt hay này không được lưu lại và sẽ bị mất có lẽ Google đã không để bộ nhớ cho phần này.</li>
        <li>Trả lời câu hỏi dựa theo nguồn đầu vào: Người dùng có thể đặt câu hỏi trực tiếp liên quan đến các tài liệu đã tải lên và NotebookLM sẽ cung cấp câu trả lời trích dẫn các nguồn cụ thể được đánh số rõ ràng trong tài liệu. Việc liên kết trực tiếp này giúp xây dựng niềm tin vào thông tin được tạo ra và cho phép dễ dàng xác minh, cộng thêm việc sử dụng RAG sẽ tạo thêm niềm tin về độ tin cậy trong nội dung do AI tạo ra.</li>
        <li>Tạo và mở rộng ý tưởng: Ngoài việc trả lời trực tiếp, nó có thể gợi ý thông tin liên quan hoặc giúp mở rộng một chủ đề nhất định, lúc này nó lại đóng vai trò trợ lý ảo giống như các LLM thông thường.</li>
        <li>Tạo bản đồ tư duy (Mind Map): Một tính năng độc đáo là khả năng tạo bản đồ tư duy từ nội dung đã tải lên. Biểu diễn trực quan thông tin này giúp người dùng nắm bắt tổng quan về một chủ đề, xác định các khái niệm chính và ghi nhớ các chi tiết phức tạp, giúp việc nghiên cứu trở nên trực quan và dễ nhớ hơn.</li>
    </ul>
    <h2><strong>Định dạng đầu ra linh hoạt</strong></h2>
    <p>Đầu ra cực kỳ linh hoạt là một ưu điểm của Notebook LM nhưng có một thứ khiến nó càng thêm hữu dụng nữa đó là tất cả đầu ra như podcast, video của Notebook LM đều đã hỗ trợ tiếng Việt.<br>
    <ul>
        <li>Tạo Audio overview: Đối với những ai hay di chuyển nhưng vẫn muốn học tập chắc chắn là tín đồ của Podcast hoặc các bài nói Audio, vậy còn gì tuyệt vời hơn khi có thể tạo các bài nói từ các tài liệu nghiên cứu của chính mình hoặc các nguồn uy tín, không những thế người nghe có thể tùy chỉnh các phong cách nói chuyện trong đó như: Đi sâu vào vấn đề, Trình bày ngắn gọn, Một bài phê bình đánh giá, hoặc có thể là một cuộc tranh luận hoặc có thể diều chỉnh độ dài ngắn của bài nói luôn.</li>
        <li>Tạo Video overview: Còn đối với những người dùng muốn xem video để có thể hiểu cặn kẽ vấn đề hơn thì Notebook LM cũng vẫn đáp ứng được tất nhiên là có thể chỉnh sửa video khi video đi chệch với mục đích nghiên cứu của người dùng hoặc đơn giản chỉ muốn AI tập trung nói rõ vào vấn đề nào trong phần Customize. Đây là ví dụ khi mình đang nghiên cứu về mô hình LLM.</li>
        <li>Tạo ra các báo cáo cực kì đa dạng: Sau khi xem hết video và podcast chắc chắn học tập và nghiên cứu thì cần đưa ra báo cáo NotebookLM.Cụ thể, trong mục Reports bạn sẽ thấy các lựa chọn để tạo ra các loại báo cáo khác nhau. Các loại báo cáo này bao gồm:
        <ul>
            <li>Briefing Doc (Tài liệu tóm tắt): Một bản tóm tắt nhanh, cô đọng các điểm chính từ tất cả các tài liệu nguồn của bạn. Nó giống như một bản tóm tắt dành cho người bận rộn, giúp bạn nắm bắt nội dung cốt lõi một cách hiệu quả.</li>
            <li>Study Guide (Hướng dẫn học tập): Một báo cáo được tạo ra để giúp bạn ôn tập. Nó có thể bao gồm các định nghĩa, khái niệm chính, các câu hỏi và câu trả lời, hoặc các điểm quan trọng cần ghi nhớ để chuẩn bị cho một kỳ thi hoặc bài kiểm tra.</li>
            <li>FAQ (Câu hỏi thường gặp): Tạo ra một danh sách các câu hỏi và câu trả lời thường gặp dựa trên nội dung trong các tài liệu của bạn. Điều này rất hữu ích khi bạn muốn nhanh chóng tìm câu trả lời cho các thắc mắc phổ biến về một chủ đề.</li>
            <li>Timeline (Dòng thời gian): Sắp xếp các sự kiện hoặc mốc thời gian quan trọng được đề cập trong tài liệu của bạn theo trình tự thời gian. Rất hữu ích cho các nghiên cứu lịch sử hoặc các dự án cần theo dõi tiến trình.</li>
        </ul></li>
    </ul></p>
    <h2><strong>Chia sẻ kiến thức hợp tác</strong></h2>
    <p>NotebookLM hỗ trợ khả năng chia sẻ, cho phép người dùng chia sẻ "notebook" của họ với người khác. Điều này có thể biến một không gian nghiên cứu cá nhân thành một cơ sở kiến thức chung cho một nhóm hoặc thậm chí một chatbot nội bộ cho một công ty, nơi nhân viên có thể nhanh chóng truy vấn các chính sách của công ty hoặc kiến thức tổ chức.
    Nhưng khi đó người dùng sẽ phải đăng ký gói Notebook LM Pro vì gói Pro mới cho phép người dùng tương tác với notebook của người chia sẻ còn gói miễn phí thì xem được thôi. Tất nhiên Google cũng cam kết tính bảo mật và quyền riêng tư khi sử dụng Notebook LM.</p>
    <h2><strong>Notebook LM và bối cảnh mở rộng hơn</strong></h2>
    <p><strong>NotebookLM trong bối cảnh rộng lớn hơn của AI cho công việc tri thức</strong><br>
    Các chức năng của NotebookLM hoàn toàn phù hợp với nhu cầu ngày càng tăng của những người làm công việc tri thức đối với các công cụ dựa trên LLM. Các cuộc khảo sát chỉ ra rằng người lao động ngày càng sử dụng LLM cho các nhiệm vụ "thông tin" như tìm kiếm, học hỏi và tóm tắt, và họ mong muốn các khả năng trong tương lai để phân tích dữ liệu của riêng họ. NotebookLM trực tiếp giải quyết những mong muốn này bằng cách cho phép người dùng tải lên dữ liệu độc quyền của họ và tương tác với nó, và với khả năng chia sẻ thì việc Notebook LM tham gia và quy trình làm việc và hợp tác lớn chắc chắn sẽ dễ dàng khi muốn tạo ra cơ sở kiến thức chung phù hợp.</p>
    <p>Sự ra đời của Notebook LM chắc chắn cuộc chơi sẽ không chỉ khép kín với Google và sẽ có sự tham gia của các LLM như những mô hình được hỗ trợ bởi Ollama hoặc Hugging Face cục bộ trong các môi trường như Jupyter Notebook sẽ tương tự như Notebook LM. Nhưng khi này mọi chuyện sẽ chỉnh dành cho các nhà phát triển với khả năng code và hiểu về Python không những thế các nhà phát triển có thể fine-tune các mô hình để tạo ra các kết quả chính xác với nhu cầu và mục đích nghiên cứu hơn nữa.</p>`,
  },
  {
    id: 'apple-mistral-perplexity-talks',
    title: 'Apple được cho là đã thảo luận về việc mua lại các startup AI Mistral và Perplexity',
    source: 'Bloomberg',
    author: 'Mai',
    publishedAt: '2025-09-09T09:00:00Z',
    imageUrl: '/image/news2/Apple Intelligence.png',
    dataAiHint: 'Apple iPhone AI',
    content: `<p>Trong bối cảnh công nghệ AI đang phát triển nhanh chóng, Apple được cho là đang tích cực tìm cách tăng cường khả năng AI của mình thông qua các thương vụ mua lại và sáp nhập. Theo The Information, Apple đang trong giai đoạn đầu đàm phán để mua lại startup AI Perplexity AI và cũng đang thảo luận về công ty AI Pháp Mistral. Động thái này cho thấy một sự thay đổi chiến lược quan trọng của gã khổng lồ công nghệ nước Mỹ.</p>
  
  <h2><strong>Vì Sao Apple lại phải tìm kiếm các thương vụ mua lại và sáp nhập?</strong></h2>
  <p>Việc mua lại một công ty khởi nghiệp AI có thể giải quyết nhiều vấn đề của Apple hiện nay:</p>
  <ul>
    <li><strong>Đe dọa từ vụ kiện chống độc quyền của Google:</strong> Thỏa thuận tìm kiếm sinh lợi của Apple với Google đang bị đe dọa bởi một vụ kiện chống độc quyền ở Mỹ. Việc mất đi thỏa thuận này có thể khiến Apple thiếu hụt doanh thu ước tính 20 tỷ USD. Việc mua lại Perplexity có thể cho phép Apple ra mắt công cụ tìm kiếm mang thương hiệu riêng, chuẩn bị cho một tương lai không có Google Search.</li>
    <li><strong>Thu hẹp khoảng cách AI:</strong> Apple bị coi là “lỡ chuyến tàu” trong cuộc đua AI thể hiện qua việc Apple Intelligence và Siri liên tục bị rời lịch ra mắt các tính năng mới. Ngay cả khi so với AI của Samsung thì Apple Intelligence cũng không thể so sánh được chứ đừng nói đến ChatGPT hoặc Gemini. Việc mua lại một startup AI có thể sẽ giúp Apple trở lại với đường đua AI.</li>
[IMAGE:/image/news2/Apple Intelligence.png|Minh họa Apple Intelligence|Apple Intelligence AI]
    <li><strong>Tăng cường uy tín và khả năng tuyển dụng các nhân tài AI:</strong> Hãy nhìn vào Mark Zuckerberg đã chi tiền tấn để săn đón các nhân tài AI hoặc cách đây không lâu cũng đã chi 15 tỷ đô để mua lại 49% cổ phần của Scale AI. Thế mới thấy các nhân tài AI hiện nay được săn đón ráo riết như thế nào, việc mua lại các startup AI có thể mang lại các nhân tài về lĩnh vực này cho Apple.</li>
    <li><strong>Sự cần thiết phải hành động:</strong> Apple rất cần thiết phải hành động để gã khổng lồ không bị coi là công ty hạng 2 về lĩnh vực AI.</li>
  </ul>
  
  <h2><strong>Perplexity AI, Mistral AI mang lại điều gì?</strong></h2>
  <p><strong>Perplexity AI</strong> được mô tả là một công cụ tìm kiếm và trả lời dựa trên AI, được coi là một giải pháp thay thế tiềm năng cho Google. Với sản phẩm tìm kiếm đã được chứng minh và đánh giá đặc biệt với mức giá ước tính khoảng 14 tỷ đô (mặc dù đã tăng lên 18 tỷ đô trong vòng gọi vốn gần đây nhất) hoàn toàn phù hợp để tích hợp vào Siri hoặc Apple Intelligence.</p>
  <p>Nhưng có một nhược điểm ở đây: nếu Apple sử dụng API như Perplexity, có thể khó duy trì chính sách quyền riêng tư nghiêm ngặt của mình.</p>
  <p><strong>Mistral AI</strong> là một trong những startup AI tiên phong khi được thành lập từ sớm và chuyên về các mô hình ngôn ngữ lớn (LLM) gọn nhẹ, hiệu quả. Nhưng sản phẩm của startup đến từ Pháp này chủ yếu là mã nguồn mở và thương mại hóa các mô hình độc quyền qua sản phẩm dựa trên API cho khách hàng doanh nghiệp.</p>
  <p>Mới đây Mistral đã hoàn thành vòng gọi vốn Series B trị giá 600 triệu Euro (khoảng 644 triệu USD), nâng định giá công ty lên 6 tỷ USD (gấp ba lần so với 2 tỷ USD trong vòng chưa đầy sáu tháng) điều này giúp Mistral có thể trở thành công ty AI mã nguồn mở có giá trị nhất thế giới và là công ty AI lớn thứ năm toàn cầu, chỉ sau OpenAI, Anthropic, Databricks và xAI.</p>
  <p>Tuy nhiên có lo ngại rằng sẽ có rào cản rất lớn đến từ chính phủ Pháp nếu Apple mua lại công ty AI có thể coi là tốt nhất ở EU hiện nay.</p>
  
  <h2><strong>Cuộc Tranh Luận Nội Bộ tại Apple</strong></h2>
  <p>Bên trong Apple, việc có nên theo đuổi các thương vụ mua lại AI lớn như Perplexity và Mistral hay không vẫn đang là một chủ đề tranh luận:</p>
  <ul>
    <li>Eddy Cue (Giám đốc Dịch vụ): Là người ủng hộ mạnh mẽ nhất các thương vụ mua lại AI lớn. Ông được biết đến là người đã công khai khen ngợi Perplexity và từng ủng hộ các thương vụ mua lại lớn khác trong quá khứ như Netflix và Tesla, dù chúng bị Tim Cook từ chối.</li>
    <li>Tim Cook (CEO): Vẫn để ngỏ ý tưởng về các thương vụ M&A có thể "đẩy nhanh lộ trình" của Apple.</li>
    <li>Craig Federighi (Giám đốc Phần mềm): Lại nghi ngại về bất kỳ thương vụ AI lớn nào, tin rằng đội ngũ của ông có thể tự phát triển để khắc phục điểm yếu về AI của Apple.</li>
    <li><strong>Quan điểm khác:</strong> Nhiều giám đốc điều hành khác của Apple cũng có những phản đối đối với các thương vụ mua lại. Apple nổi tiếng với sự không thích chi tiêu quá mức cho bất kỳ công ty hay đội ngũ nào và thường ưu tiên các thương vụ AI nhỏ hơn.</li>
  </ul>
  
  <h2><strong>Lựa chọn của Apple sẽ là như thế nào?</strong></h2>
  <p>Dữ liệu trước đây cho thấy Apple không phải lúc nào thương vụ mua lại và sáp nhập hàng tỷ đô la cũng suôn sẻ:</p>
  <ul>
    <li>Thương vụ mua lại Beats đã gây ra sự xung đột về văn hóa kéo dài rất nhiều năm, nhưng nó cũng giúp Apple phát triển Apple Music đang đi đúng hướng.</li>
    <li>Phố Wall cũng nhiều lần thúc giục Tim Cook mua lại Netflix hoặc một hãng phim lớn. Song thay vào đó, Apple đã xây dựng nền tảng phát trực tuyến TV+ từ đầu. Dịch vụ này đang đi đúng hướng để phát triển bền vững.</li>
    <li>Trước khi có Apple Music thì cũng rất nhiều người bày tỏ nguyện vọng mua lại Spotify nhưng Apple lại chọn xây dựng dịch vụ của riêng mình, mặc dù Spotify chắc chắn sẽ giúp tăng tốc trong mảng âm thanh.</li>
  </ul>
  <p>Đây mới chỉ là các cuộc thảo luận về việc mua lại Perplexity và Mistral AI chứ chưa có kí kết gì cả. Kết quả của những cuộc đàm phán này sẽ có tác động đáng kể đến Apple hoặc rộng ra là thị trường AI.</p>`,
  },
  {
    id: 'google-ra-mat-gemini-2-5-flash-image',
    title: 'Google ra mắt Gemini 2.5 Flash Image – Đòn bẩy mới cho các mô hình chỉnh sửa ảnh',
    source: 'TechCrunch',
    author: 'Mai',
    publishedAt: '2025-09-08T14:00:00Z',
    imageUrl: '/image/news2/Gemini 2.5 Flash Image ra mắt.png',
    dataAiHint: 'Gemini 2.5 Flash Image ra mắt',
    content: `<p>Google vừa chính thức trình làng Gemini 2.5 Flash Image vào ngày 26/8, một bản nâng cấp đầy hứa hẹn. Dù mới ở dạng Preview, mô hình này đã thể hiện sự nâng cấp đáng kể so với Gemini 2.0 Flash Image và thậm chí có phần lấn át cả Imagen 4 về một số mặt.</p>
  <p>Vậy là sau 1 năm kể từ Gemini 2.0 Flash Image, Google lại mang đến mô hình này được thiết kế để tạo ảnh chất lượng cao, cực nhanh, từ đó nâng cao tiêu chuẩn cho những gì AI có thể làm được với hình ảnh.</p>


  <h2><strong>Google Gemini 2.5 Flash Image có sức mạnh như thế nào?</strong></h2>
  <p>Gemini 2.5 Flash Image (trước đây có mã danh "nano-banana" trong giai đoạn thử nghiệm) với việc mới ra mắt thì hiện đang là mô hình chỉnh sửa và tạo hình ảnh mới nhất và mạnh mẽ của Google.</p>
  <p>Để nói về điểm nổi bật của Gemini 2.5 Flash Image thì có rất nhiều nhưng ở đây sau quá trình sử dụng và trải nghiệm thì thấy có những ưu điểm sau:</p>
  <ul>
    <li><strong>Độ chân thực được nâng cấp:</strong> Sau khi sử dụng Gemini 2.5 Flash Image, mình thấy những chi tiết khi tạo ảnh được rõ hơn và được nâng cấp hơn hẳn với Gemini 2.0 Flash Image và có nhỉnh hơn đôi chút so với Imagen 4.</li>
    <li><strong>Chỉnh sửa chi tiết hình ảnh:</strong> Người dùng hoàn toàn có thể chỉnh sửa một chi tiết nhỏ trong ảnh mà vẫn giữ được bố cục ảnh, thậm chí có người dùng có thể yêu cầu thay đổi phong cách của ảnh mà vẫn giữ được bố cục ảnh chỉ dựa trên prompt.</li>
    <li><strong>Nhân vật đồng nhất:</strong> Đây là vấn đề nan giải của các model chỉnh sửa ảnh hiện nay, rất khó cho các model giữ được nhân vật đồng nhất trừ khi sử dụng các Lora đã được đào tạo sẵn, nhưng Gemini 2.5 Flash Image mình thấy có phần giữ được hơn hẳn so với GPT Image 1.</li>
    <li><strong>Chỉnh sửa đa bước (multi-turn editing):</strong> Người dùng có thể chỉnh sửa ảnh với mỗi chuỗi các yêu cầu chỉ trong một lần prompt mà không chỉ áp dụng với các yêu cầu bình thường mà còn những yêu cầu phức tạp như ánh sáng, vật liệu môi trường. Ví dụ người dùng có thể thay đổi nguồn sáng từ trái sang phải và đổi ghế từ ghế nhựa sang ghế gỗ trong cùng một prompt.</li>
    <li><strong>Hiểu biết về thế giới thực:</strong> Mô hình hiểu được các mối quan hệ vật lý giữa các đối tượng trong ảnh, ánh sáng, và các yếu tố khác. Điều này cho phép nó tạo ra các thay đổi tự nhiên và phù hợp với bối cảnh. Ví dụ: khi thêm một chiếc áo khoác, mô hình sẽ tự động điều chỉnh ánh sáng và nếp gấp sao cho chân thực nhất.</li>
    <li><strong>Tối ưu chi phí:</strong> Giá chỉ 0.039 USD/hình ảnh – thấp hơn so với OpenAI gpt-image và Flux-Kontext.</li>
  </ul>


  <h2><strong>Google Gemini 2.5 Flash Image thể hiện thế nào khi so sánh với các đối thủ còn lại?</strong></h2>
  <p>Gemini 2.5 Flash Image với tên mã Nano Banana thì tạo cho chúng ta liên tưởng đến đồ chơi nhưng công cụ này cực kỳ chuyên nghiệp vậy nó thể hiện như thế nào so với các đối thủ của nó?</p>
  <p>Theo bảng xếp hạng LMArena thì Gemini 2.5 Flash Image có tốc độ tạo ảnh từ prompt chậm hơn so với Gemini 2.0 Flash Image nhưng bỏ xa các đối thủ là GPT Image 1 và Flux 1. Còn về chất lượng ảnh thì thể hiện vượt trội so với các đối thủ còn lại thậm chí nó còn nhỉnh hơn so với Imagen 4 Ultra một model quá nổi tiếng về độ sắc nét và chân thực của ảnh.</p>
[GEMINI_FLASH_IMAGE_CHART]
  <p>Sang phần chỉnh sửa ảnh thì Gemini 2.5 Flash Image vẫn thể hiện giống như tạo ảnh, vẫn vượt trội so với các đối thủ GPT Image 1 và Qwen Image Edit.</p>
[IMAGE_EDITING_CHART]
  <p>Còn khi so với Midjourney và Stable Diffusion thì đây là những mô hình chuyên biệt phục vụ chỉ một bộ phận người dùng cho nên khi so sánh sẽ hơi khó khăn. Còn đối với riêng Adobe đã nhận ra tiềm năng của Gemini 2.5 Flash Image nên họ đã tích hợp ngay mô hình này vào Firefly và Express, cho phép sáng tạo liền mạch trong hệ sinh thái Creative Cloud.</p>
  <h2><strong>Google Gemini 2.5 Flash Image vẫn có những hạn chế</strong></h2>
  <p>Gemini 2.5 Flash Image có lúc gây ra sự khó chịu khi kiểm duyệt quá mức đặc biệt là đối với prompt xuất hiện trẻ em và hầu hết các hình ảnh xuất hiện phụ nữ đều quá khó để sửa đổi. Tất nhiên Google cũng biết điều này Google đã tích hợp watermark kỹ thuật số vô hình SynthID vào tất cả các hình ảnh được tạo hoặc chỉnh sửa bằng Gemini 2.5 Flash Image để nhận diện nguồn gốc khi có những bức ảnh cung cấp thông tin sai lệch.</p>
  <p>Mô hình này vẫn chưa làm việc tốt đối với các prompt dài, nếu các prompt dài thì việc nhầm lẫn sẽ xuất hiện gây ra sự khó chịu cho người dùng đây là vấn đề cố hữu đối với các model chỉnh sửa ảnh hi vọng Google và các hãng sẽ xử lý vấn đề này sớm.</p>


  <h2><strong>Làm sao để tiếp cận Gemini 2.5 Flash Image?</strong></h2>
  <p>Tin vui là bạn có thể trải nghiệm Nano Banana (Gemini 2.5 Flash Image) một cách dễ dàng!</p>
  <ul>
    <li><strong>Google AI Studio hoặc ứng dụng Gemini App</strong> (trên web và di động). Người dùng miễn phí có thể thực hiện tối đa 100 chỉnh sửa mỗi ngày.</li>
<li><strong>Dành cho nhà phát triển và doanh nghiệp:</strong> Mô hình cũng có sẵn thông qua Gemini API và Vertex AI để tích tích hợp vào các ứng dụng của riêng bạn.</li>   <li><strong>Chi phí:</strong> Qua API, chi phí là khoảng 4 cent cho mỗi hình ảnh (hoặc $0.039), một mức giá rất cạnh tranh so với các mô hình khác.</li>
  </ul>`,
  },
  {
    id: 'nvidia-gb200-profit',
    title: 'Siêu lợi nhuận cho Nvidia với máy chủ AI Nvidia GB200 NVL72 lên tới 77.6%',
    source: 'Digitimes',
    author: 'Mai',
    publishedAt: '2025-09-05T10:00:00Z',
    imageUrl: '/image/news2/Máy chủ AI Nvidia GB200 NVL72.png',
    dataAiHint: 'Siêu lợi nhuận với máy chủ AI Nvidia GB200 NVL72',
    content: `<p>Hiện nay, khi nền kinh tế GPU đang gây ra nhiều lo lắng trong giới tài chính, Morgan Stanley đã đưa ra một phân tích khá thuyết phục về lợi thế hiệu quả vượt trội khi sử dụng GPU NVIDIA GB200 NVL72 cho các trung tâm dữ liệu AI quy mô lớn.</p>
  <p>Để những ai chưa biết, mỗi máy chủ AI NVL72 chứa 72 GPU NVIDIA B200 cùng với 36 CPU Grace, tất cả được kết nối qua công nghệ liên kết băng thông cao, độ trễ thấp NVLink 5. Cần lưu ý rằng mỗi máy chủ NVL72 này hiện có giá khoảng 3,1 triệu đô la gấp hơn 16 lần so với 190.000 đô la cho một máy chủ H100.</p>
  <p>Morgan Stanley tin rằng việc sử dụng giải pháp mới nhất của NVIDIA có ý nghĩa kinh tế.</p>
  <br>
  <h2><strong>Hiệu quả kinh tế của các hệ thống AI</strong></h2>
  <p>Theo tính toán của Morgan Stanley, các hệ thống NVIDIA GB200 NVL72 hiện đang dẫn đầu về khả năng tạo ra doanh thu và lợi nhuận, theo sau là Google TPU v6e.</p>
  <p>Cụ thể, một trung tâm dữ liệu AI với công suất 100MW có thể đạt tỷ suất lợi nhuận 77,6% với các máy chủ NVIDIA GB200 NVL72, trong khi Google TPU v6e đứng thứ hai với tỷ suất lợi nhuận 74,9%. Điều này mang lại lợi nhuận khổng lồ và khẳng định vị thế dẫn đầu của Nvidia và Google.</p>[PROFITABILITY_CHART]
  <p>Tuy nhiên, giá thuê các pod (cụm máy chủ AI) Google TPU v6e không được công bố, nhưng trung bình, chi phí thuê một pod thấp hơn khoảng 40-50% so với máy chủ NVL72.</p>
  <p>Điều đáng chú ý là theo tính toán của Morgan Stanley, các trung tâm dữ liệu AI sử dụng nền tảng AMD MI300 và MI355 có tỷ suất lợi nhuận âm, lần lượt là -28,2% và -64%. Điều đó cho thấy AMD đang hoàn toàn tụt lại trong cuộc đua máy chủ AI.</p>
  <br>
  <h2><strong>Chi phí sở hữu tổng thể (TCO)</strong></h2>
  <p>Theo Morgan Stanley giả định một trung tâm dữ liệu AI 100MW sẽ có chi phí cơ sở hạ tầng là 660 triệu đô la, khấu hao trong 10 năm còn chi phí GPU có thể dao động từ 367 triệu đô la đến 2,273 tỷ đô la, khấu hao trong 4 năm. Cuối cùng, chi phí vận hành được tính dựa trên hiệu suất năng lượng của các hệ thống làm mát khác nhau và giá điện trung bình toàn cầu.</p>
  <p>Theo đó, các hệ thống NVIDIA GB200 NVL72 có tổng chi phí sở hữu (TCO) cao nhất là 806,58 triệu đô la, tiếp theo là nền tảng MI355X với 774,11 triệu đô la.</p>`,
  },
  {
    id: 'ai-viet-2025-bao-cao',
    title: 'AI Việt 2025: Gần 80% người dùng tiếp cận; ChatGPT dẫn đầu thị trường theo báo cáo Decision Lab',
    source: 'Decision Lab',
    author: 'Mai',
    publishedAt: '2025-08-20T09:00:00Z',
    imageUrl: '/image/news2/ChatGPT dẫn đầu AI Việt.png',
    dataAiHint: 'AI Hay và Kiki vô cùng cạnh tranh trong AI Việt',
    content: `<p>Báo cáo mới nhất từ Decision Lab đã vẽ nên một bức tranh sống động và đầy tiềm năng về thị trường trí tuệ nhân tạo (AI) tại Việt Nam. Theo dữ liệu được công bố tháng 7/2025, gần 80% người dùng trực tuyến tại Việt Nam đã sử dụng AI trong vòng 3 tháng qua, cho thấy tốc độ thích nghi nhanh chóng với AI của người Việt. </p>
  <h2><strong>Mức độ thâm nhập và bức tranh thị trường AI tại Việt Nam</strong></h2>
  <p>Thị trường AI tiêu dùng Việt Nam đang chứng kiến mức độ thâm nhập rất cao. Khảo sát trực tuyến của Decision Lab, thực hiện từ ngày 20-28/07 với 600 người tham gia, cho thấy gần 80% người dùng trực tuyến đã tiếp cận các công cụ AI trong 3 tháng gần nhất, và 33% trong số đó đã tích hợp AI vào các hoạt động thường nhật và 55% trong số đó trả phí dịch vụ. Điều này cho thấy AI không chỉ là một công cụ tiện ích mà còn đang dần trở thành một phần không thể thiếu trong đời sống của người Việt.</p>
  <p>Về thị phần, ChatGPT đang chiếm ưu thế vượt trội với 81% người dùng lựa chọn. Theo sau là các sự cạnh tranh đến từ Gemini (51%) và Meta AI (36%). Đáng chú ý, có hai nền tảng của Việt Nam đã lọt vào top 10 về mức độ sử dụng là AI Hay (9%) và Kiki (3%). Người dùng Việt có xu hướng sử dụng song song nhiều công cụ, với trung bình mỗi người dùng khoảng 2 nền tảng AI khác nhau cho các mục đích đa dạng từ học tập, nghiên cứu, dịch thuật cho đến giải trí và sáng tạo nội dung.</p>[BENCHMARK_CHART]
  <p>Thậm chí, không chỉ người dùng mà chính phủ cũng tham gia vào cuộc đua AI với những chính sách nhằm thúc đẩy chuyển đổi số quốc gia như Nghị quyết 57-NQ/TW, Chiến lược quốc gia về AI theo Quyết định 127/QĐ-TTg, hay phong trào “Bình dân học vụ số”.</p>
  <h2><strong>Người Việt dùng AI để làm gì?</strong></h2>
  <p>Tất nhiên nhu cầu tâm sự và trò chuyện là chuyện rất bình thường đối với người Việt chúng ta, nhưng bây giờ chúng ta lại chuyển vai trò đó sang AI với 40% tỉ lệ áp dụng AI. Còn các hoạt động cập nhật thông tin, học kĩ năng kiến thức mới và luyện tập giao tiếp là những thứ cơ bản mà khi người dùng AI hướng tới.</p>
  <p>Nhưng theo báo cáo của Decision Lab thật bất ngờ khi người dùng lại dùng AI để tra cứu thuốc và sức khỏe cho thấy sự tin tưởng của người Việt vào các công cụ AI cho các vấn đề cần sự chính xác cao.</p>[ACTIVITIES_CHART]
  <h2><strong>Cơ hội cho các nhà phát triển AI tại Việt Nam</strong></h2>
  <p>Báo cáo của Decision Lab cho thấy thị trường AI tiêu dùng Việt Nam vẫn còn nhiều tiềm năng cho các nhà phát triển trong nước. Bằng chứng là hai nền tảng nội là Kiki và AI Hay, đã lọt vào top 10 công cụ AI được sử dụng nhiều nhất, cạnh tranh trực tiếp với các ông lớn quốc tế.</p>
  <p><strong>AI Hay:</strong> Nền tảng hỏi đáp AI thuần Việt này đã rất nổi tiếng, có lẽ đây là mạng xã hội hỏi đáp AI thuần Việt lớn nhất tại Việt Nam, thu hút hơn 15 triệu lượt tải từ khi ra mắt vào năm 2023. Thậm chí trong báo cáo về sự hài lòng người dùng thì AI Hay cũng đạt 47%, bám sát ChatGPT (51%) và vượt qua nhiều ông lớn như Gemini (36%), Meta (27%), Copilot(26%)...</p>[SATISFACTION_CHART]
  <p><strong>Kiki:</strong> Được phát triển bởi 100% kỹ sư người Việt và đứng sau nó là gã khổng lồ VNG, Kiki đã được tích hợp sâu với Zalo với Kiki Info, giúp tiếp cận gần 80 triệu người dùng của Zalo một cách thuận lợi. Nền tảng này cũng đã ra mắt Kiki Auto, trợ lý lái xe thuần Việt đầu tiên đạt 1 triệu lượt cài đặt, cung cấp các tính năng thông minh như chỉ đường, nghe nhạc, cảnh báo giao thông và báo cáo phạt nguội chỉ bằng giọng.</p>
  <h2><strong>Yếu tố quyết định lựa chọn AI của người Việt</strong></h2>
  <p>Báo cáo của Decision Lab cũng chỉ ra ba yếu tố chính mà người dùng Việt Nam ưu tiên khi lựa chọn một nền tảng AI:</p>
  <ul>
    <li>Khả năng chi trả: Quan trọng nhất là việc được tiếp cận nhiều tính năng hữu ích mà không mất phí.</li>
    <li>Tính dễ sử dụng: Các tính năng tiện lợi, đa năng và dễ tích hợp với các nền tảng khác.</li>
    <li>Độ chính xác: Thông tin từ các tài liệu đáng tin cậy và được cập nhật theo thời gian thực.</li>
  </ul>
  <p>Bên cạnh đó, yếu tố bản địa hóa cũng đóng vai trò quan trọng. Người dùng mong muốn các nền tảng AI hỗ trợ tiếng Việt tốt hơn, với ngữ điệu tự nhiên và độ chính xác theo ngữ cảnh.</p>
  <p>Tuy nhiên, người dùng Việt cũng bày tỏ những mối lo ngại đáng kể khi sử dụng AI:</p>
  <ul>
    <li>Quyền riêng tư dữ liệu cá nhân: Đây là mối lo lớn nhất, với 52% người khảo sát bày tỏ quan ngại về cách AI thu thập và sử dụng thông tin cá nhân.</li>
    <li>Phản hồi không chính xác: Vấn đề các nền tảng đưa ra phản hồi không chính xác hoặc không liên quan cũng là một thách thức lớn.</li>
    <li>Bị thay thế trong công việc: Khoảng 48% người tham gia khảo sát lo sợ bị AI thay thế trong công việc.</li>
    <li>Thông tin sai lệch: 36% bày tỏ lo ngại về thông tin sai lệch như deepfake hay thao túng dư luận.</li>
  </ul>
  <h2><strong>Bối cảnh AI tại Việt Nam: Tiềm năng và thách thức</strong></h2>
  <p>Việt Nam đang thể hiện một vai trò nổi bật trên bản đồ AI toàn cầu. Theo Bảng Chỉ số AI Thế giới 2025 do WIN (Mạng lưới Nghiên cứu Thị trường Độc lập Toàn cầu) công bố, Việt Nam xếp hạng 6/40 quốc gia, vượt qua nhiều nền kinh tế phát triển như Hàn Quốc, Australia, và Nhật Bản. Điều này cho thấy người Việt không chỉ cởi mở mà còn sẵn sàng tham gia tích cực vào kỷ nguyên trí tuệ nhân tạo.</p>
  <p>Đặc biệt, Việt Nam đứng thứ 3 về mức độ tin tưởng AI (65,6 điểm) và thứ 5 về mức độ chấp nhận AI (71,6 điểm) cho thấy mức độ chấp nhận sử dụng AI của người Việt.</p>
  <p>Với mức độ tin cậy và thái độ tích cực cao, Việt Nam đang có nhiều lợi thế để bứt phá trong cuộc đua AI toàn cầu. Vì vậy, câu hỏi đặt ra cho người trẻ Việt Nam không phải là khi nào cần sử dụng AI, mà là làm thế nào để áp dụng AI một cách hiệu quả vào công việc.</p>`,
  },
  {
    id: 'gemini-tao-sach-truyen',
    title: 'Gemini ra mắt tính năng tạo sách truyện cá nhân hóa cực kì sáng tạo',
    source: 'Google',
    author: 'Nam',
    publishedAt: '2025-08-10T09:00:00Z',
    imageUrl: '/image/news2/Gemini ra mắt tính năng tạo sách truyện cá nhân hóa cực kì sáng tạo.png',
    dataAiHint: 'Gemini ra mắt tính năng tạo sách truyện',
    content: `<p>Chúng tôi rất vui mừng thông báo về một cập nhật thú vị trong ứng dụng Gemini, mở ra một cách thức hoàn toàn mới để biến những ý tưởng của bạn thành hiện thực: những cuốn sách kể chuyện được minh họa cá nhân hóa hoàn chỉnh với sự hỗ trợ của giọng đọc.</p>
<p>Google đã giới thiệu tính năng mới này vào ngày <strong>6/8/2025</strong>, rất gần với ngày ra mắt của GPT-5. Vì vậy, mức độ quan tâm tất nhiên không thể so sánh với sự kiện từ OpenAI. Tuy nhiên, đây vẫn là một tính năng cực kì hữu ích và thú vị, cho phép bạn dễ dàng tạo ra những câu chuyện độc đáo, phù hợp với mọi trí tưởng tượng.</p>
<h2><strong>Tính năng hoạt động như thế nào?</strong></h2>
<p>
    Chỉ cần mô tả bất kỳ câu chuyện nào bạn có thể hình dung, Gemini sẽ tạo ra một cuốn sách 10 trang độc đáo với hình ảnh minh họa và giọng đọc tùy chỉnh. Để tăng tính cá nhân hóa, bạn có thể yêu cầu Gemini lấy cảm hứng từ chính ảnh hoặc bản vẽ tay của bạn hoặc con bạn.
</p>
<p>
    Một ưu điểm nổi bật là tất cả quá trình tạo truyện và giọng đọc đều được thực hiện trực tiếp trên <em>Canvas của Gemini</em>, giúp bạn thao tác nhanh gọn mà không cần chuyển sang ứng dụng khác.
</p>
<p>
    Hiện tại, Gemini cung cấp hai tùy chọn giọng đọc cơ bản: giọng cao (thường là giọng nữ) và giọng trầm (thường là giọng nam). Người dùng chưa thể sử dụng giọng của chính mình để tăng tính cá nhân hóa, nhưng chắc chắn Google sẽ sớm cập nhật tính năng này.
</p>
<h2><strong>Khám phá sự đa dạng trong phong cách và ngôn ngữ</strong></h2>
<p>
    Bạn có thể hiện thực hóa ý tưởng của mình theo nhiều phong cách khác nhau: từ <em>pixel art</em>, truyện tranh, claymation, crochet cho đến sách tô màu. Hơn nữa, tính năng này hỗ trợ hơn <strong>45 ngôn ngữ</strong> – bao gồm cả tiếng Việt – giúp mở rộng khả năng sáng tạo không giới hạn.
</p>
<h2><strong>Chất lượng đến từ Gemini 2.5 Flash và Gemini 2.5 Pro</strong></h2>
<p>
    Người dùng có thể trải nghiệm miễn phí tính năng này trên cả <strong>Gemini 2.5 Pro</strong> và <strong>Gemini 2.5 Flash</strong>. Tuy nhiên, sách được tạo bởi Pro thường cho kết quả mượt mà và chi tiết hơn, trong khi Flash vẫn đủ dùng cho các trải nghiệm cơ bản.
</p>


<p>
    Vì hoạt động trực tiếp trên Canvas, bạn có thể sử dụng tính năng kể chuyện ở bất kỳ đâu – từ máy tính để bàn cho đến thiết bị di động.
</p>
<h2><strong>Những cách bạn có thể sử dụng tính năng này</strong></h2>
<ul>
    <li>📖 Giúp con bạn hiểu một chủ đề phức tạp: ví dụ tạo câu chuyện giải thích về hệ mặt trời cho bé 5 tuổi.</li>
    <li>💡 Dạy một bài học thông qua kể chuyện: dạy bé trai 7 tuổi về sự tử tế với em mình bằng cách biến chú voi thành nhân vật chính.</li>
    <li>🎨 Biến tác phẩm nghệ thuật thành hiện thực: tải bản vẽ của trẻ và để Gemini làm sống động qua một cuốn truyện minh họa.</li>
    <li>🌍 Biến kỷ niệm thành câu chuyện kỳ diệu: tải ảnh từ chuyến đi Phú Quốc của gia đình bạn để tạo nên một cuộc phiêu lưu độc đáo.</li>
</ul>
<p>
    👉 Hãy thử ngay để biến những câu chuyện và ý tưởng của bạn thành những cuốn sách minh họa độc đáo và đầy mê hoặc!
</p>
<h2><strong>Ví dụ thực tế với prompt</strong></h2>
<p>
    Dưới đây là một prompt mà chúng tôi đã thử nghiệm và các bạn có thể tham khảo kết quả:
</p>
<blockquote>Prompt “Vẽ truyện tranh cho bé 3 tuổi nói về các phương tiện giao thông như máy bay, máy bay trực thăng, ô tô, xe máy, cần cẩu, xe xúc,...”</blockquote>
[IMAGE:/image/news2/Bìa Sách Gemini.png|Kết quả minh họa sách Gemini|Gemini storybook cover]
<p><em>Kết quả minh họa sách Gemini</em></p>
[IMAGE:/image/news2/Sách cho bé Gemini.png|Kết quả minh họa sách Gemini|Gemini storybook page]
<p><em>Kết quả minh họa sách Gemini</em></p>
[IMAGE:/image/news2/Sách cho bé tạo bởi Gemini.png|Kết quả minh họa sách Gemini|Gemini storybook page 2]
<p><em>Kết quả minh họa sách Gemini</em></p>`,
  },
  {
    id: 'meta-ai-lieu-co-tro-thanh-bom-xit',
    title: 'Meta AI liệu có trở thành “bom xịt”?',
    source: 'Bloomberg',
    author: 'Mai',
    publishedAt: '2025-09-12T10:00:00Z',
    imageUrl: '/image/news2/Ảnh về Meta AI.png',
    dataAiHint: 'Meta AI lieu co thanh bom xit',
    content: `<p>Ra mắt vào tháng 4-2024, Meta AI được kỳ vọng là một ứng dụng độc lập đóng vai trò trợ lý ảo của Meta, đến thời điểm này Meta AI đã ra mắt thêm phần "Discover" để người dùng khám phá cách cộng đồng tạo nội dung AI, tuy nhiên sản phẩm này vẫn được đánh giá là được phát triển quá vội vàng từ ứng dụng AI đi kèm kính thông minh.</p>
    <p>Chỉ sau vài tháng, hàng loạt phản hồi tiêu cực đã xuất hiện, cho rằng trải nghiệm kém, nội dung trên nguồn cấp dữ liệu không cập nhật, và AI thường xuyên "bịa đặt" thông tin. Dù đã đầu tư hàng tỷ đô la vào phát triển AI cộng với nguồn lực khổng lồ, Meta AI vẫn bị đánh giá là thiếu cá nhân hóa, hoạt động rời rạc và chưa đủ sức cạnh tranh với các ông lớn như ChatGPT, Gemini, Claude, Deepseek.</p>


    <h2><strong>Trải nghiệm rời rạc, cá nhân hóa rất yếu kém</strong></h2>
    <p>Một trong những vấn đề lớn nhất của Meta AI là thiếu tính liền mạch. Khi người dùng chuyển đổi giữa Facebook, Instagram, Messenger hoặc WhatsApp, các cuộc trò chuyện của họ với Meta AI không thể đồng bộ, gây ra trải nghiệm rời rạc. Mỗi nền tảng lại có một phiên bản Meta AI hoạt động khác nhau: WhatsApp tập trung vào gợi ý tác vụ và quản lý lịch, Messenger vượt trội trong việc tạo ảnh, và Facebook nghiêng về tóm tắt bình luận.</p>
    <p>Sự phân mảnh này trái ngược với ChatGPT hoặc Gemini hoặc thậm chí Perplexity có thể làm tốt hơn với lịch sử trò chuyện có thể đồng bộ hóa trên các thiết bị và nền tảng, tạo ra cảm giác thống nhất- điều cực kì cần thiết với các nền tảng hiện nay.</p>
    <p>Tính cá nhân hóa cũng bị đánh giá thấp.</p>
    <p>Mặc dù Meta AI biết vị trí và một số sở thích của người dùng nhưng vẫn đưa ra gợi ý các hoạt động sự kiện không hề liên quan. Ứng dụng này không truy xuất dữ liệu cá nhân từ Facebook hoặc Instagram để điều chỉnh câu trả lời, một hạn chế khiến người dùng thất vọng. Đáng chú ý, AI đôi khi "tự bịa" chi tiết về cuộc sống cá nhân của người dùng, làm giảm độ tin cậy tạo ra trải nghiệm rất tệ nếu nói về độ hiểu người dùng trong các sản phẩm của Meta.</p>
    <p>Bloomberg News đã thử nghiệm và chỉ ra rằng Meta AI có thể nhận ra một số sở thích cơ bản của người dùng nhưng vẫn dễ đưa ra thông tin sai lệch, đặc biệt khi được hỏi những câu hỏi cần cập nhật thông tin mới nhất (điều mà Grok 4 đang làm rất tốt) hoặc liên quan đến dữ liệu cá nhân.</p>


    <h2><strong>Phản hồi tiêu cực và thách thức cạnh tranh</strong></h2>
    <p>Meta AI đã nhận được nhiều ý kiến trái chiều kể từ khi ra mắt cho rằng Meta đang ép người dùng sử dụng đi kèm với các ứng dụng phổ biến mà không đem lại lợi ích gì.</p>
    <p>Mặc dù tiếp cận hơn 1 tỷ người dùng thông qua các mạng xã hội Facebook, Instagram, Messenger và WhatsApp, Meta AI vẫn chưa tạo được sức hấp dẫn riêng. Phần "Discover" của ứng dụng chủ yếu hiển thị ảnh AI do người lạ tạo không hề liên quan tới người dùng và đôi khi Discover còn hiển thị các yếu tố nhạy cảm.</p>
    <p>Về mặt chiến lược, CEO Zuckerberg chắc chắn không đổ hàng tỷ đô la chỉ để chơi mà Zuckerberg đã coi Meta AI là con bài chiến lược trong khả năng cạnh tranh với ChatGPT, Gemini hoặc Claude, Grok. Chắc chắn mục tiêu dài hạn của Meta AI vẫn là AGI - Trí tuệ nhân tạo tổng quát có thể thực hiện tác vụ giống như con người.</p>
    <p>Hiện nay Meta AI vẫn đang rất xa vời tham vọng của mình, Meta cũng đã có nhiều động thái thay đổi như mở nguồn mô hình ngôn ngữ Llama của mình, đẩy nhanh nghiên cứu và tuyển dụng nhân tài từ Apple và OpenAI. Có lẽ chúng ta phải chờ đợi sự thay đổi ở Llama 5.</p>


    <h2><strong>Cuộc hôn nhân đổ vỡ với Scale AI</strong></h2>
    <p>Một minh chứng cho sự loay hoay của Meta nữa chính là sự hợp tấc của họ với Scale AI</p>
    <p>Tháng 6 năm 2025, Meta công bố khoản đầu tư trị giá 14,3 tỷ USD vào Scale AI, đồng thời đưa CEO Alexander Wang và nhiều nhân sự cấp cao về làm việc tại Meta Superintelligence Labs (MSL). Nhưng giờ đây MSL đang có tình trạng chảy máu chất xám nghiêm trọng với ít nhất 8 nhân sự chủ chốt rời đi ,bao gồm các nhân vật quan trọng như Bert Maher và Tony Liu</p>
    
    <h2><strong>Thách thức nội bộ và quy định</strong></h2>
    <p>Meta đang đối mặt với tình trạng chảy máu chất xám nghiêm trọng trong Meta Superintelligence Labs (MSL), với ít nhất tám nhân sự chủ chốt rời đi chỉ trong ba tháng, bao gồm các nhân vật quan trọng như Bert Maher và Tony Liu. Các đợt tái tổ chức thường xuyên và chiến lược không rõ ràng đã làm gián đoạn các dự án AI quan trọng như mô hình "Behemoth".</p>
    <p>Sự rối ren đỉnh điểm của vụ việc này Các nhóm nghiên cứu tại TBD Labs đã nhiều lần phải tìm đến dữ liệu từ những nhà cung cấp khác như Mercor hay Surge vì đánh giá dữ liệu của Scale AI “không đủ chuẩn” cho các thí nghiệm quy mô lớn.</p>
    <p>Hoặc vụ các khách hàng lớn của Scale AI như Open AI, Google đồng loạt rời bỏ họ khiến Scale AI gặp cực kì nhiều khó khăn và thách thức.</p>
    <p>Vậy là CEO Zuckerberg đã đổ rất nhiều tiền chỉ để theo kịp về AI với các đối thủ như Open AI, Google, xAI nhưng vẫn còn chưa đâu vào đâu cho thấy trong lĩnh vực AI tiền “không” phải là tất cả.</p>`,
  },
  {
    id: 'perplexity-comet-vs-chatgpt-atlas',
    title: 'Perplexity Comet và ChatGPT Atlas: Cuộc Chiến Trình Duyệt AI',
    author: 'Mai',
    source: 'Tổng hợp',
    publishedAt: '2025-10-22T09:00:00Z',
    imageUrl: '/image/news2/Cuoc-chien-perplexity-comet-và-chatpgt-atlas.png',
    dataAiHint: 'perplexity comet vs chatgpt atlas',
    content: `<div class="container">
<h1>Perplexity Comet và ChatGPT Atlas: Cuộc Chiến Trình Duyệt AI Định Hình Lại Internet</h1>
<div class="toc">
<div class="toc-title">Mục lục</div>
<ul>
<li><a href="#section-section-1">Sự Trỗi Dậy của Trình Duyệt AI: Một Kỷ Nguyên Mới Cho Internet</a></li>
<li><a href="#section-section-2">Hai Triết Lý Đối Lập: ChatGPT Atlas vs. Perplexity Comet</a></li>
<li><a href="#section-section-3">Thách Thức Ngôi Vương: Tác Động đến Chrome, Safari và Toàn Ngành</a></li>
<li><a href="#section-section-4">Rủi Ro Tiềm Ẩn và Tương Lai Phía Trước</a></li>
</ul>
</div>
<h2 id="section-section-1">Sự Trỗi Dậy của Trình Duyệt AI: Một Kỷ Nguyên Mới Cho Internet</h2>
<p>Năm 2025 chứng kiến một cuộc cách mạng trong cách chúng ta tương tác với Internet. Thay vì chỉ là công cụ hiển thị nội dung, trình duyệt web đang được tái định hình thành những &#34;trợ lý thông minh&#34;. Sự trỗi dậy của các trình duyệt AI-native (trí tuệ nhân tạo gốc) như <strong>Perplexity Comet</strong> và <strong>ChatGPT Atlas</strong> của OpenAI đang báo hiệu một cuộc chiến mới, thách thức sự thống trị lâu năm của Google Chrome và Apple Safari.</p>
<p>Cuộc chuyển dịch này được thúc đẩy bởi những tiến bộ vượt bậc của các mô hình ngôn ngữ lớn (LLM), biến trình duyệt từ một công cụ điều hướng thụ động thành một đối tác nhận thức chủ động. Giám đốc điều hành OpenAI, Sam Altman, gọi đây là &#34;cơ hội hiếm có, một thập kỷ một lần để định nghĩa lại trình duyệt có thể làm được gì&#34;. Các công ty công nghệ đang chạy đua để chiếm lĩnh &#34;điểm tương tác đầu tiên&#34; của người dùng trên mạng, có khả năng làm thay đổi sâu sắc mô hình kinh doanh dựa trên quảng cáo vốn là nền tảng của các công cụ tìm kiếm truyền thống.</p>
<p>Tuy nhiên, con đường thay đổi này không hề dễ dàng. Google Chrome vẫn đang chiếm lĩnh thị trường với một thị phần khổng lồ, trong khi Safari giữ vững vị thế nhờ sự tích hợp sâu vào hệ sinh thái Apple.</p>
[BROWSER_MARKET_SHARE_CHART]
<h2 id="section-section-2">Hai Triết Lý Đối Lập: ChatGPT Atlas vs. Perplexity Comet</h2>
<p>Mặc dù cùng hướng đến một tương lai duyệt web thông minh hơn, ChatGPT Atlas và Perplexity Comet lại theo đuổi hai triết lý hoàn toàn khác biệt, phục vụ cho những nhu cầu và thói quen sử dụng khác nhau.</p>
[AI_BROWSER_FOCUS_CHART]
<p><strong>ChatGPT Atlas</strong> được mệnh danh là &#34;bộ não hành động của web&#34; (action-oriented web brain). Trọng tâm của Atlas là tự động hóa và năng suất. Với tính năng nổi bật là <strong>Agent Mode</strong> (chế độ Tác tử), Atlas có thể tự thực hiện các tác vụ phức tạp gồm nhiều bước như đặt vé máy bay, mua sắm trực tuyến, hay lên lịch hẹn. Nó biến trình duyệt thành một &#34;phi công phụ&#34; (co-pilot), giúp người dùng hoàn thành công việc thay vì chỉ tìm kiếm thông tin. Các tính năng khác như &#34;Browser Memory&#34; (bộ nhớ trình duyệt) và &#34;In-line writing help&#34; (hỗ trợ viết trực tiếp) càng củng cố vai trò của Atlas như một trợ lý cá nhân hóa, giúp giảm thiểu các thao tác thủ công và tiết kiệm thời gian.</p>
<blockquote>Atlas ưu tiên &#34;hành động&#34; - đơn giản hóa cách bạn làm việc trực tuyến.</blockquote>
<figure>
<img alt="Chế độ Tác tử của Atlas đang mua sắm" src="https://agents-download.skywork.ai/image/rt/8e9e287a57db5ea4008fd993f232182e.jpg" style="max-height: 280px; max-width: 100%;"/>
<figcaption>Chế độ Tác tử của ChatGPT Atlas có thể tự động thực hiện các yêu cầu mua sắm phức tạp cho người dùng</figcaption>
</figure>
<p>Ngược lại, <strong>Perplexity Comet</strong> được xây dựng như một &#34;không gian làm việc tri thức&#34; (knowledge workspace), tập trung vào nghiên cứu và độ chính xác. Triết lý của Comet là &#34;biết&#34; (knowing), đảm bảo thông tin đáng tin cậy, cập nhật và minh bạch. Tính năng nổi bật của nó là khả năng tổng hợp thông tin từ nhiều nguồn, cung cấp các câu trả lời có trích dẫn rõ ràng và có thể kiểm chứng. Comet cho phép người dùng tạo các &#34;Spaces&#34; (Không gian) riêng cho từng dự án, giúp tổ chức các tab, ghi chú và cuộc trò chuyện một cách khoa học. Điều này biến nó thành một &#34;nhà nghiên cứu thông minh&#34; (intelligent researcher), lý tưởng cho các học giả, nhà báo và chuyên gia phân tích.</p>
<div class="clear-float"></div>
<h2 id="section-section-3">Thách Thức Ngôi Vương: Tác Động đến Chrome, Safari và Toàn Ngành</h2>
<p>Sự xuất hiện của Atlas và Comet không chỉ là một cuộc cạnh tranh về tính năng, mà còn là một thách thức trực tiếp đến mô hình kinh doanh và vị thế của các ông lớn. Google Chrome, với thị phần toàn cầu vượt trội, đối mặt với nguy cơ bị suy giảm doanh thu quảng cáo. Các trình duyệt AI cung cấp câu trả lời tổng hợp trực tiếp, làm giảm nhu cầu người dùng phải nhấp vào các liên kết, vốn là nền tảng của mô hình quảng cáo tìm kiếm. Gartner dự báo rằng việc sử dụng công cụ tìm kiếm truyền thống có thể giảm 25% vào năm 2026 khi người dùng chuyển sang các trợ lý AI.</p>
<p>Đối với Apple Safari, thách thức lại nằm ở việc đổi mới. Safari luôn được đánh giá cao về hiệu suất, tiết kiệm năng lượng và tích hợp sâu với hệ điều hành. Tuy nhiên, việc thiếu các tính năng AI tiên tiến có thể khiến nó trở nên tụt hậu. Cuộc đua này buộc Apple phải tăng tốc tích hợp AI vào trình duyệt của mình để giữ chân người dùng trong hệ sinh thái.</p>
<p>Sự cạnh tranh này đang thúc đẩy một thị trường hoàn toàn mới. Thị trường trình duyệt AI được dự báo sẽ tăng trưởng mạnh mẽ, từ 4,5 tỷ USD vào năm 2024 lên đến 76,8 tỷ USD vào năm 2034, với tốc độ tăng trưởng kép hàng năm (CAGR) là 32,8%. Điều này cho thấy tiềm năng to lớn và sự thay đổi căn bản trong cách ngành công nghệ nhìn nhận về vai trò của trình duyệt.</p>
[AI_BROWSER_MARKET_GROWTH_CHART]
<h2 id="section-section-4">Rủi Ro Tiềm Ẩn và Tương Lai Phía Trước</h2>
<p>Mặc dù hứa hẹn, các trình duyệt AI cũng mang đến những rủi ro đáng kể, đặc biệt là về bảo mật và quyền riêng tư. Việc trao quyền cho một tác tử AI để tự động duyệt web và thực hiện hành động trên các tài khoản đã đăng nhập của người dùng tạo ra những lỗ hổng mới. Các nhà nghiên cứu bảo mật đã phát hiện ra các lỗ hổng nghiêm trọng như &#34;CometJacking&#34; trên Perplexity Comet, nơi một liên kết độc hại có thể chiếm quyền điều khiển trợ lý AI để đánh cắp thông tin nhạy cảm từ email hoặc các dịch vụ khác. Đây là một thách thức cơ bản đối với an ninh mạng trong kỷ nguyên AI.</p>
<p>Bên cạnh đó, hiệu suất cũng là một vấn đề. Các tính năng AI, đặc biệt là chế độ tác tử, có thể tiêu tốn nhiều tài nguyên CPU và bộ nhớ, và đôi khi hoạt động chậm hơn so với việc người dùng tự thực hiện. Các tính năng này vẫn còn ở giai đoạn đầu và thường xuyên gặp lỗi.</p>
<p>Về tương lai, cuộc chiến trình duyệt AI sẽ định hình lại cả mô hình kinh doanh. Thay vì dựa vào quảng cáo, các công ty như OpenAI và Perplexity đang khám phá các mô hình dựa trên đăng ký (subscription) cho các tính năng cao cấp. Perplexity ban đầu cung cấp Comet với giá 200 USD/tháng cho gói Max, sau đó chuyển sang miễn phí với một số giới hạn. Trong khi đó, OpenAI cung cấp Atlas miễn phí nhưng tính phí cho Agent Mode. Cuộc chiến này không chỉ là về công nghệ, mà còn là về việc tìm ra một mô hình kinh doanh bền vững cho tương lai của web.</p>
<p>Dù con đường phía trước còn nhiều chông gai, sự chuyển dịch sang một kỷ nguyên duyệt web thông minh, nơi trình duyệt trở thành một đối tác chủ động, dường như là không thể đảo ngược. Cuộc chiến giữa những người khổng lồ và những kẻ thách thức sẽ tiếp tục định hình lại trải nghiệm kỹ thuật số của chúng ta trong nhiều năm tới.</p>
</div>`
  },
  {
    id: 'robot-dieu-khien-tu-xa',
    title: 'Robot đóng vai nhân viên cửa hàng nhưng người điều khiển ngồi cách xa 3.000km!',
    author: 'Mai',
    source: 'Tổng hợp',
    publishedAt: '2025-11-03T09:00:00Z',
    imageUrl: '/image/news2/Anh-bia-nguoi-dieu-khien-robot.png',
    dataAiHint: 'Robot TX SCARA của Telexistence (Nhật Bản), được điều khiển từ xa bởi nhân viên ở Philippines (cách 3.000km) qua kính VR, đang giải quyết khủng hoảng thiếu hụt lao động tại các cửa hàng tiện lợi FamilyMart. Hệ thống AI tự động, nhưng con người can thiệp khi robot gặp lỗi (digital re-embodiment).',
    content: `<p>Thế giới đang chứng kiến một sự chuyển đổi lao động số hóa đáng kinh ngạc: những kỹ sư trẻ tuổi ngồi tại trung tâm tài chính Manila, Philippines, lại đang điều khiển những con robot sắp xếp hàng hóa tại các cửa hàng tiện lợi ở Tokyo, Nhật Bản, cách đó hơn 3.000 km.</p>
<p>Xu hướng này không chỉ giải quyết cuộc khủng hoảng thiếu hụt lao động mà Nhật Bản đang đối mặt mà còn định hình lại bản chất của công việc thủ công trong kỷ nguyên tự động hóa.</p>

<h2><strong>Khủng hoảng lao động Nhật Bản và giải pháp robot thay thế</strong></h2>
<p>Là một trong những nền kinh tế lớn nhất thế giới, Nhật Bản đang phải đối mặt với thách thức dân số già hóa và lực lượng lao động sụt giảm. Tình trạng thiếu hụt nhân sự này đặc biệt nghiêm trọng trong các ngành dịch vụ, bao gồm cả chuỗi cửa hàng tiện lợi (konbini). Với hơn 56.000 cửa hàng trên khắp cả nước, các konbini như FamilyMart và Lawson là một phần thiết yếu của đời sống hàng ngày ở Nhật Bản.</p>
<p>Để giải quyết vấn đề này, các chuỗi cửa hàng tiện lợi đã chuyển sang sử dụng công nghệ. Công ty khởi nghiệp robotics Telexistence (TX), có trụ sở tại Tokyo, đã phát triển một giải pháp robot từ xa.</p>
<p>Telexistence đã hợp tác với FamilyMart để triển khai robot TX SCARA. Mẫu robot này, chạy trên nền tảng AI Jetson của Nvidia, được thiết kế để thay thế công việc bổ sung sản phẩm lặp đi lặp lại trong các cửa hàng bán lẻ. Cụ thể, robot TX SCARA có khả năng xử lý tất cả chai PET và lon nước đóng hộp có kích cỡ khác nhau trong tủ mát.</p>
[IMAGE:/image/news2/Anh-robot-lam-viec-o-cua-hang.png|Robot làm việc ở cửa hàng|Robot thay con người]

<h2><strong>Cầu nối 3.000km: Từ Manila đến Tokyo</strong></h2>
<p>Telexistence đã cung cấp robot cho hơn 300 cửa hàng tiện lợi trên khắp Nhật Bản (bao gồm FamilyMart và Lawson, và sắp tới là 7-Eleven). Điều độc đáo là những robot này được giám sát và điều khiển từ xa bởi đội ngũ nhân viên của Astro Robotics – một công ty khởi nghiệp tại Philippines chuyên cung cấp "nhân lực robot".</p>
<p>Mô hình này xuất hiện do việc tìm kiếm nhân công sắp xếp hàng hóa ở Nhật Bản đang ngày càng khó khăn và tốn kém, mặc dù mức lương tối thiểu khá cao. Ngược lại, Philippines là một trung tâm gia công (outsourcing) toàn cầu với lực lượng lao động trẻ, am hiểu công nghệ và chi phí thấp hơn nhiều.</p>
<p>Tại văn phòng ở Manila, khoảng 60 nhân viên trẻ tuổi sử dụng kính thực tế ảo (VR) và cần điều khiển để giám sát và vận hành robot. Công nghệ này cho phép các cửa hàng ở Nhật Bản thuê nhân viên từ bất cứ nơi nào trên thế giới, qua đó giải quyết tình trạng thiếu hụt lao động.</p>

<h2><strong>Vai trò của con người</strong></h2>
<p>Hệ thống của Telexistence sử dụng AI độc quyền tên là Gordon để thực hiện hầu hết các thao tác sắp xếp hàng hóa một cách tự động. Tuy nhiên, tự động hóa hoàn toàn trong trường hợp này vẫn chưa thể áp dụng mà vẫn cần đến con người.</p>
[HUMAN_ROBOT_COLLABORATION_CHART]
<p>Phần lớn thời gian, robot TX SCARA hoạt động tự động, nhưng khi xảy ra các sự cố ngoài dự kiến, ví dụ như làm rơi chai nước hoặc sắp xếp sai vị trí, người điều khiển từ xa sẽ can thiệp. Việc can thiệp thủ công này (khoảng 4% các trường hợp) đòi hỏi người điều khiển phải sử dụng kính VR để "nhập" vào robot và điều khiển nó nhặt vật thể bị rơi.</p>
<p>Quá trình này được các nhà nghiên cứu gọi là "sự hóa thân kỹ thuật số" (digital re-embodiment). Về cơ bản, người lao động đang vận hành cơ thể máy móc thông qua giao diện truyền hình ảnh để cung cấp khả năng cảm biến và vận động mà robot và AI hiện tại vẫn còn thiếu. Người lao động từ xa đóng vai trò là "người giám sát" và "chốt an toàn" (failsafe) cho máy móc khi hệ thống tự động thất bại.</p>

<h2><strong>Những đánh đổi và nỗi lo mới</strong></h2>
<p>Mô hình lao động robot từ xa này, dù mang tính tiên tiến, lại bộc lộ những mâu thuẫn phức tạp của chủ nghĩa tư bản toàn cầu trong lĩnh vực tự động hóa.</p>
<p><strong>1. Chi phí lao động thấp:</strong> Các công ty toàn cầu đang tìm kiếm nguồn lao động rẻ, ngay cả trong những công việc đòi hỏi kỹ năng cao như vận hành robot. Mặc dù công việc được xem là hiện đại, kỹ sư và cử nhân công nghệ thông tin tại Philippines thường chỉ được trả mức lương thấp hơn nhiều so với đồng nghiệp tại các quốc gia phát triển.</p>
<p><strong>2. Sức khỏe và áp lực:</strong> Những người điều khiển robot phải đối mặt với áp lực lớn trong việc xử lý lỗi nhanh chóng để không làm gián đoạn hệ thống. Hơn nữa, họ thường xuyên cảm thấy chóng mặt và hoa mắt do "say mạng" – một dạng say tàu xe liên quan đến việc sử dụng kính thực tế ảo (VR) trong thời gian dài.</p>
<p><strong>3. Nguy cơ con người bị thay thế:</strong> Đằng sau cơ hội việc làm là nỗi lo bị chính công nghệ "nuốt chửng". Toàn bộ thao tác của người điều khiển robot đang được ghi lại để huấn luyện AI. Mục đích của việc thu thập dữ liệu này là để phát triển thế hệ robot tương lai có thể tự hoạt động mà không cần sự hỗ trợ của con người. Giáo sư Lionel Robert (Đại học Michigan, Mỹ) nhận định người lao động trở thành người giám sát máy móc, không khác gì “phiên bản dự phòng” của robot.</p>
<p>Tương lai của lực lượng lao động được dự đoán sẽ là sự kết hợp "lai" giữa robot, AI, tự động hóa và con người. Trong khi mô hình robot từ xa ở FamilyMart chứng minh rằng công nghệ có thể vượt qua khoảng cách địa lý (3.000km) để giải quyết vấn đề logistics, nó cũng đặt ra câu hỏi về việc giá trị của sức lao động thủ công được số hóa này sẽ được định nghĩa như thế nào trong một thế giới ngày càng tự động hóa.</p>`,
  },
];
    
    



    

    



    



    

    

