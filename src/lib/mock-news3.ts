
import type { NewsArticle } from '@/lib/types';

export const mockNews3: NewsArticle[] = [
  {
    id: 'nano-banana-pro-ra-mat',
    title: 'Nano Banana Pro (Gemini 3 Pro Image) đã ra mắt: Sự nâng cấp bùng nổ thách thức mọi đối thủ',
    source: 'Google',
    author: 'Mai',
    publishedAt: '2025-11-25T09:00:00Z',
    imageUrl: '/image/news3/nano-banana-pro-gemini-3-image-generation.png',
    dataAiHint: 'Nano Banana Pro (Gemini 3 Pro Image) ra mắt với nâng cấp đột phá:.',
    content: `<p>Sự ra mắt của <a href="/cong-cu/nano-banana-pro" target="_blank">Nano Banana Pro</a>  (tên chính thức là Gemini 3 Pro Image), được xây dựng trên nền tảng Gemini 3 Pro, thực sự là một sự nâng cấp xuất sắc.</p>
<p>Cá nhân tôi vẫn còn bất ngờ khi Gemini 3 giờ đây xuất hiện thêm Nano Banana Pro. Nó không chỉ mang đến một bước nâng cấp lớn so với Nano Banana mà có thể sẽ khiến nhiều người quên đi những mô hình, nền tảng tạo ảnh khác như Midjourney, GPT Image 1 hay thậm chí phần nào đó là Photoshop.</p>


<h2><strong>Trải nghiệm thực tế của Nano Banana Pro như thế nào?</strong></h2>
<p>Nano Banana Pro được thiết kế để tận dụng khả năng suy luận nâng cao và hiểu biết sâu rộng về thế giới thực của Gemini 3. Phiên bản Pro này không chỉ giúp tạo ra hình ảnh đẹp đơn thuần mà còn giúp xây dựng nội dung hữu ích hơn, chẳng hạn như sơ đồ minh họa hoặc infographic chính xác dựa trên thông tin thực tế hoặc dữ liệu do người dùng cung cấp.</p>
<p>Trong quá trình thử nghiệm, có 4 điểm nâng cấp lớn nhất mang lại sự khác biệt rõ rệt so với bản Nano Banana (Gemini 2.5 Flash Image):</p>
<ul>
    <li><strong>Chữ (text) trong ảnh có thể chính xác 99%:</strong> Chúng ta đều biết điểm yếu chung của các AI tạo ảnh là khả năng xử lý văn bản rất kém, dù là tiếng Anh hay tiếng Việt. Nhưng với sự trợ giúp từ Gemini 3, câu chuyện đã khác, chúng ta hoàn toàn có thể chuyển đổi tài liệu, sách, ảnh từ tiếng Anh sang tiếng Việt hoặc tô màu chúng cực kỳ chính xác. Điều này trước kia vốn là nhiệm vụ bất khả thi.</li>
    <li><strong>Độ phân giải cực cao (4K):</strong> Trước đây, muốn ảnh AI đạt tới 4K để phục vụ in ấn hay quảng cáo là một cơn ác mộng, thường phải tốn công sức làm nét lại. Giờ đây, chất lượng 4K không còn là điều quá xa vời với Nano Banana Pro, còn các độ phân giải thấp hơn như 2K thì mô hình này cân dư sức.</li>
    <li><strong>Khả năng suy luận và hỗ trợ Google Search:</strong> Nhờ sự hỗ trợ của Gemini 3 Pro, mô hình hoàn toàn có khả năng suy luận qua các câu lệnh phức tạp. Đặc biệt hơn, nó có thể sử dụng Google Search để lấy dữ liệu thời gian thực tạo ra hình ảnh. Ví dụ: Bạn có thể yêu cầu vẽ hình ảnh ăn mừng dựa trên kết quả của một trận thể thao vừa kết thúc hoặc có thể tạo hình ảnh thiệt hại của 2 cơn bão vừa xảy ra ở miền trung và dưới đây là kết quả mình cho ra.</li>
[IMAGE:/image/news3/bao-cao-thiet-hai-bao-lu-nano-banana-pro.png|Báo cáo thiệt hại bão lũ|Dựa trên sức mạnh nano banana pro]


    <li><strong>Giữ khuôn mặt/khung hình cực ổn định:</strong> Đối với những ai làm thương hiệu hoặc cần sự nhất quán, tính năng này cực kỳ cần thiết. Mô hình có khả năng giữ nguyên khuôn mặt hoặc khung hình của nhân vật xuất sắc ngay cả khi thay đổi bối cảnh, trang phục. Nhờ vậy, bạn có thể dễ dàng tạo ra toàn bộ một bộ nhận diện thương hiệu đồng nhất.</li>
[IMAGE:/image/news3/nano-banana-pro-giu-on-dinh-khuon-mat.png|Khả năng giữ ổn định khuôn mặt|Dựa trên sức mạnh nano banana pro]
</ul>


<h2><strong>Những điều Nano Banana Pro cần cải thiện</strong></h2>
<p>Mặc dù rất ấn tượng, Nano Banana Pro vẫn gặp khó khăn hoặc một số lỗi nhỏ cần cải thiện:</p>
<ul>
    <li><strong>Logic sơ đồ đôi khi hơi "ngáo":</strong> Dù có Gemini 3 hỗ trợ nhưng khoản vẽ sơ đồ hay infographic nhiều lúc vẫn bị lộn xộn (ví dụ: bước 2 lại nhảy lên nằm trước bước 1) dù hình ảnh chất lượng. Lỗi này khó sửa bằng prompt, thường phải tạo lại từ đầu.</li>
    <li><strong>Chữ trong ảnh vẫn xuất hiện lỗi chính tả:</strong> Lâu lâu AI vẫn cho ra bức ảnh sai chính tả với tỷ lệ khoảng 1/10. Mức này hoàn toàn chấp nhận được nhưng chưa hoàn hảo 100%.</li>
    <li><strong>Ghép ảnh chưa thực sự mượt:</strong> Khả năng hòa trộn khuôn mặt vào khung hình mới vẫn chưa được tự nhiên lắm, đối với những người khó tính thì nhìn bằng mắt thường là thấy hơi giả trân. Nên với những ca khó cần độ chính xác cao, chúng ta vẫn phải nhờ đến bàn tay hậu kỳ của các bạn designer.</li>
</ul>


<h2><strong>Làm thế nào để trải nghiệm Nano Banana Pro?</strong></h2>
<p>Nano Banana Pro có thể sử dụng được hoàn toàn miễn phí trong ứng dụng Gemini.</p>
<ul>
    <li>Mở ứng dụng Gemini (hoặc truy cập trên web).</li>
    <li>Chọn mô hình <strong>"Thinking"</strong> (tư duy). Mục này nên dùng vì Nano Banana Pro sẽ lấy sức mạnh tư duy của Gemini 3 để tạo ảnh.</li>
    <li>Chọn tùy chọn trong mục công cụ chọn <strong>"Create images"</strong> (Tạo hình ảnh).</li>
</ul>
<p>Người dùng gói miễn phí sẽ nhận được một hạn mức sử dụng Pro giới hạn. Sau khi dùng hết hạn mức này, hệ thống sẽ tự động chuyển về mô hình Nano Banana gốc. Người dùng đăng ký các gói cao hơn (Google AI Plus, Pro, và Ultra) sẽ nhận được hạn mức sử dụng Nano Banana Pro cao hơn đáng kể.</p>
<p>Vậy là Nano Banana Pro giống như một nhiếp ảnh gia chuyên nghiệp mới được trang bị máy ảnh 4K và bộ xử lý thông minh. Nó có thể tạo ra những bức ảnh siêu thực, nhưng đôi khi vẫn cần bạn hướng dẫn cụ thể về logic và ý định để đảm bảo bức ảnh không chỉ đẹp mà còn hợp lý.</p>`
  },
  {
    id: 'grok-4-1-ra-mat',
    title: "Grok 4.1 ra mắt mô hình AI cảm xúc nhất của xAI",
    source: 'xAI',
    author: 'Mai',
    publishedAt: '2025-11-21T09:00:00Z',
    imageUrl: '/image/news3/grok-4-1-xai-emotional-ai.png',
    dataAiHint: "xAI ra mắt Grok 4.1 với nâng cấp mạnh mẽ về trí tuệ cảm xúc.",
    content: `<p>xAI đã chính thức phát hành Grok 4.1, một bản cập nhật đột phá không chỉ tăng cường hiệu suất mà còn mang đến những thay đổi đáng kể về trí tuệ cảm xúc và khả năng tương tác giống con người hơn bao giờ hết. Bản cập nhật Grok 4.1 vẫn ưu tiên khả năng cập nhật các tin tức theo thời gian thực giống Grok 4, nó khiến các cuộc hội thoại trở nên sắc sảo, tự nhiên hơn, đồng thời giảm đáng kể tỷ lệ “ảo giác”.</p>
<p>Grok 4.1 hiện đã có mặt trên các nền tảng Grok, X, và các ứng dụng di động iOS và Android. Nó đang được triển khai ngay lập tức ở chế độ Tự động (Auto mode) và người dùng có thể chọn rõ ràng Grok 4.1 để sử dụng trên web.</p>
<h2><strong>Grok 4.1 đã trở nên giống con người như thế nào</strong></h2>
<p>Bản nâng cấp quan trọng nhất của Grok 4.1 nằm ở khả năng cảm nhận cảm xúc và chất lượng ngôn ngữ. Các cuộc hội thoại trở nên tự nhiên hơn, phản hồi thường đính kèm những nét tinh tế như sự đồng cảm hoặc chút hài hước, thay vì cảm giác "máy móc" như trước.</p>
<p>Để đạt được điều này, xAI đã sử dụng cơ sở hạ tầng học tăng cường quy mô lớn tương tự Grok 4, nhưng áp dụng nó để tối ưu hóa phong cách, tính cách, mức độ hữu ích và sự căn chỉnh của mô hình.</p>
<p>Điều này làm chúng ta nhớ tới GPT 5 lúc mới ra mắt cũng trả lời mọi thứ có thêm cảm xúc hơn nhưng người dùng đã phản đối những lời xu nịnh đó. Tuy nhiên, Grok 4.1 có vẻ đã cải thiện đôi chút vì khả năng xAI dựa trên dữ liệu của nền tảng X, nơi người dùng toàn là con người nên mọi thứ sẽ tự nhiên hơn.</p>
<h3>Kết quả là Grok 4.1 trở nên thấu hiểu và dễ đồng cảm hơn:</h3>
<ul>
    <li><strong>Trí tuệ cảm xúc:</strong> Vì những thay đổi trên mà Grok 4.1 đã đạt điểm cao nhất từng được ghi nhận trên EQ-Bench3, một bài kiểm tra đánh giá trí tuệ cảm xúc, sự đồng cảm và kỹ năng giao tiếp giữa các cá nhân.</li>
    <li><strong>Phản hồi không còn máy móc:</strong> Các câu trả lời của mô hình đã mang tình cảm vào trong. Ví dụ, khi người dùng bày tỏ nỗi đau mất thú cưng ("Tôi nhớ mèo của tôi đến đau lòng"), Grok 4.1 trả lời: "Điều đó đau đớn vì tình yêu đã (và vẫn) lớn lao như thế. Bạn đã cho chúng một cuộc đời tốt đẹp, và chúng biết điều đó".</li>
    <li><strong>Sáng tạo:</strong> Tất nhiên là Grok 4.1 đã mang cảm xúc thì chắc chắn cũng đạt điểm giỏi trong việc viết văn với điểm Creative Writing v3 đã đứng trong top các mô hình hàng đầu.</li>
</ul>
<h2><strong>Grok 4.1 đứng ở đâu trong bảng xếp hạng AI?</strong></h2>
<p>Grok 4.1 vừa có màn thể hiện rất ấn tượng khi vươn lên ở mọi bảng xếp hạng. Nhưng nếu nhìn vào LMArena hoặc các bảng xếp hạng khác, bạn sẽ thấy điểm số của nó chỉ kém một chút mô hình đó là Gemini 3 Pro.</p>
<ul>
    <li>Điều đặc biệt khi nhìn vào thông số LMArena đó là Grok 4.1 chỉ xếp sau Gemini 3 Pro và Grok 4.1 Thinking. Đây là một bất ngờ lớn khi một mô hình Non-Thinking (không suy luận sâu) có thể đứng ở vị trí cao như vậy, vượt qua nhiều mô hình chuyên về suy luận xếp sau đó.</li>
</ul>
<h2><strong>Ảo giác (hallucination) và rủi ro an toàn có được cải thiện không?</strong></h2>
<p>Việc giảm ảo giác được xem một trong những thành tựu quan trọng của Grok 4.1:</p>
<ul>
    <li><strong>Giảm tỷ lệ ảo giác:</strong> Tỷ lệ ảo giác trong các truy vấn tìm kiếm thông tin đã giảm từ 12.09% xuống còn 4.22% đối với mô hình không suy luận được trang bị tìm kiếm web. Trên thang đo FActScore, tỷ lệ lỗi của Grok 4.1 đã giảm xuống 2.97% — một con số đặc biệt thấp đối với một mô hình phản hồi nhanh.</li>
    <li><strong>Rủi ro an toàn và đánh đổi:</strong> Tất nhiên tỷ lệ ảo giác thấp chắc chắn đi kèm với sự đánh đổi. Mặc dù Grok 4.1 chặn gần như tất cả các câu trả lời độc hại nhưng nó lại cho thấy sự gia tăng mạnh mẽ về tính xu nịnh (sycophancy) và tỷ lệ đánh lừa cao hơn so với Grok 4. Việc thúc đẩy trí tuệ cảm xúc có thể làm cho Grok 4.1 đồng ý với người dùng ngay cả khi thông tin cung cấp bị sai.</li>
    <li><strong>Lưu ý đặc biệt:</strong> Các tài liệu uy tín đã cảnh báo rằng Grok 4.1 có thể dễ bị khai thác bởi các cuộc tấn công hơn khi nó được tích hợp vào các ứng dụng thông qua API.</li>
</ul>
<h2><strong>Grok 4.1 Fast và Agent Tools API: công cụ cho nhà phát triển</strong></h2>
<p>xAI cũng đã công bố Grok 4.1 Fast và Agent Tools API cho các nhà phát triển và doanh nghiệp.</p>
<ul>
    <li><strong>Hai phiên bản mới thông qua API:</strong> Có 2 tên mã mới là  <a href="/mo-hinh/grok-4-1-fast-reasoning" target="_blank">grok-4-1-fast-reasoning</a> tối ưu cho hiệu năng suy luận và workflow có tool calling và grok-4-1-fast-non-reasoning để tối ưu cho phản hồi cực nhanh.</li>
    <li><strong>Cửa sổ ngữ cảnh lớn:</strong> Cả 2 mô hình mới đều có cửa sổ ngữ cảnh cực lớn lên tới 2M token, điều chưa từng xuất hiện với các LLM trước đây. Tất nhiên nó vẫn sẽ được huấn luyện để sử dụng tối đa cửa sổ ngữ cảnh này.</li>
    <li><strong>Agent Tools API:</strong> Bộ công cụ mạnh mẽ này cho phép Grok truy cập và sử dụng dữ liệu X thời gian thực, tìm kiếm web, thực thi mã từ xa, và tìm kiếm tệp đã tải lên. Các công cụ này chạy hoàn toàn trên cơ sở hạ tầng của xAI, giống như cho phép Gemini truy cập vào các file lưu ở Google Drive vậy.</li>
</ul>
<p>Tuy nhiên, vì đây là mô hình mang lại trải nghiệm nhanh nên Grok 4.1 Fast cho thấy các chỉ số không được cao như Grok 4.1 bản chuẩn, nhưng có một điều không cần phải bàn cãi đó là khả năng cập nhật tin tức theo thời gian thực cực tốt của nó.</p>
<p>Tóm lại, Grok 4.1 không chỉ là một bản nâng cấp về sức mạnh xử lý mà còn là bước tiến chiến lược của xAI nhằm tạo ra một mô hình AI có "tính cách" và khả năng thấu hiểu cảm xúc vượt trội. Chúng ta hãy cùng chờ xem phản ứng thực tế của người dùng sẽ như thế nào về tính cách mới mẻ này.</p>`
  },
  {
    id: 'sima-2-ai-agent',
    title: 'Gặp gỡ SIMA 2 – Trợ lý AI chơi game có thể suy nghĩ như người thật!',
    source: 'Google DeepMind',
    author: 'Mai',
    publishedAt: '2025-11-18T09:00:00Z',
    imageUrl: '/image/news3/sima-2-ai-agent-deepmind.png',
    dataAiHint: 'Google DeepMind ra mắt SIMA 2 (Scalable Instructable Multiworld Agent), tích hợp Gemini 2.5 Flash Lite, đạt hiệu suất hoàn thành nhiệm vụ 65% (tiệm cận con người 76%). SIMA 2 có khả năng lý luận trừu tượng, hiểu đa phương thức (emoji), khái quát hóa giữa các game (như Minecraft, PUBG, LOL), và tự học hỏi qua thử và sai (trial-and-error) hướng tới mục tiêu AGI.',
    content: `<p>Bạn đã từng chơi game cùng một đồng đội AI (bot) hoặc NPC chỉ biết làm theo lệnh cứng nhắc? Hãy quên điều đó đi! Google DeepMind vừa công bố SIMA 2 (viết tắt của Scalable Instructable Multiworld Agent) tiếp nối SIMA 1, một tác nhân AI thế hệ mới, đa năng, được thiết kế để không chỉ chơi game mà còn suy nghĩ, lý luận và tự học trong các thế giới ảo 3D phức tạp.</p>
<p>Việc ra mắt SIMA 2 có thể được coi là một cột mốc quan trọng, đưa chúng ta tiến gần hơn đến trí tuệ nhân tạo tổng quát (AGI). AGI luôn luôn là mục tiêu tối thượng của toàn bộ các ông lớn như Google, Open AI, Microsoft tạo ra hệ thống AI có thể thực hiện nhiều loại nhiệm vụ trí tuệ khác nhau, giống như con người.</p>
<h2><strong>Nâng cấp bộ não với sức mạnh Gemini 2.5 Flash Lite</strong></h2>
<p>SIMA 2 đã được nhận được cập nhật lớn về trí tuệ nhờ được tích hợp mô hình ngôn ngữ lớn Gemini 2.5 Flash Lite làm lõi suy luận. Điều này đã giúp SIMA từ một tác nhân AI chỉ biết "thực hiện chỉ thị" (instruction-follower) thành một người bạn đồng hành hơn.</p>
[SIMA2_BENCHMARK_CHART]
<h3>SIMA 2 thông minh hơn SIMA 1 so sánh với con người như thế nào?</h3>
<ul>
    <li>SIMA 1 (ra mắt năm 2024) chỉ đạt tỷ lệ hoàn thành các nhiệm vụ phức tạp khoảng 31%.</li>
    <li>SIMA 2 đã tăng gấp đôi hiệu suất, đạt mức trung bình 65% tỷ lệ hoàn thành nhiệm vụ trên bộ đánh giá chính, tiệm cận với khả năng của con người (khoảng 76%).</li>
</ul>
<h2><strong>Khả năng suy nghĩ thật sự (Không phải hành động lặp lại)</strong></h2>
<p>Nhờ có Gemini, SIMA 2 sở hữu khả năng lý luận trừu tượng mà các bot trước đây không làm được. Nó không chỉ làm theo lệnh mà còn hình thành kế hoạch nội bộ và giải thích các bước hành động của mình.</p>
<p>Nhìn ví dụ về lý luận dưới đây: Nếu bạn đang chơi game và nói: "Hãy đi đến ngôi nhà có màu giống quả cà chua chín".</p>
<ul>
    <li>Một bot cũ sẽ bị "đứng hình" vì bạn không nói màu cụ thể, nhưng đối với SIMA 2 thì nó sẽ sử dụng lõi Gemini để suy luận: "Quả cà chua chín có màu đỏ. Vậy mình phải tìm và đi đến ngôi nhà màu đỏ".</li>
</ul>
[IMAGE:/image/news3/vi-du-sima-2-nha-mau-do.png|Ví dụ SIMA 2 hiểu ngôi nhà màu đỏ|SIMA 2 Agent]
<p>SIMA 2 thực hiện các hành động này bằng cách quan sát hình ảnh trên màn hình và sử dụng bàn phím/chuột ảo để điều khiển nhân vật hoặc công cụ mô phỏng hành vi giống hệt như một người chơi bình thường. Đây là lý do tại sao nó được gọi là một tác nhân hiện thân (embodied agent)—một hệ thống tương tác cho phép AI cảm nhận trong thế giới ảo (hoặc thực) và tất nhiên là có đi kèm với điểm hiệu suất sau đó.</p>
<h2><strong>Có thể hiểu nhiều thứ: từ ngôn ngữ đến biểu tượng cảm xúc (Emojis)</strong></h2>
<p>Với sự hỗ trợ của Gemini thì SIMA 2 có thể hiểu vượt xa giới hạn của ngôn ngữ văn bản đơn thuần, cho phép người dùng giao tiếp với nó bằng nhiều cách thức đa dạng:</p>
<ul>
    <li><strong>Chỉ dẫn đa phương thức:</strong> Nó có thể tuân theo các lệnh bằng văn bản, giọng nói, các bản phác thảo trên màn hình, và thậm chí là biểu tượng cảm xúc (emojis).
        <ul>
            <li>Ví dụ: Bạn chỉ cần nhập tổ hợp 🪓🌲 (cây rìu và cây thông), và SIMA 2 sẽ hiểu đó là lệnh "đi chặt cây".</li>
        </ul>
[IMAGE:/image/news3/vi-du-sima-2-hieu-emoji.png|Ví dụ SIMA 2 hiểu Emoji|SIMA 2 Agent]
    </li>
    <li><strong>Đa ngôn ngữ:</strong> Tất nhiên SIMA 2 còn có khả năng hiểu và thực hiện các lệnh bằng nhiều ngôn ngữ tự nhiên khác nhau như tiếng Pháp, tiếng Trung, tiếng Đức và tiếng Tây Ban Nha.</li>
    <li><strong>Khái quát hóa:</strong> SIMA 2 có khả năng chuyển đổi các khái niệm trừu tượng đã học được từ một trò chơi sang một trò chơi hoàn toàn khác.
        <ul>
            <li>Ví dụ: Nếu nó học cách "khai thác" quặng trong một game sinh tồn, nó có thể áp dụng ngay khái niệm đó để thực hiện lệnh "khai thác" trong một game Minecraft. Hoặc cũng có thể mở rộng ra với các tựa game phổ biến như PUBG tự động loot đồ, hoặc LOL tự động farm quái kiếm kinh nghiệm lên cấp.</li>
        </ul>
[IMAGE:/image/news3/vi-du-sima-2-hieu-khai-quat.png|Ví dụ SIMA 2 sự khái quát|SIMA 2 Agent]
    </li>
</ul>
<h2><strong>Tự học hỏi không cần đến sự hướng dẫn của con người</strong></h2>
<p>Một trong những đóng góp nghiên cứu quan trọng nhất của SIMA 2 là cơ chế tự cải thiện.</p>
<p>Thay vì chỉ dựa vào dữ liệu người chơi cung cấp, sau giai đoạn đào tạo ban đầu, SIMA 2 có thể tự chuyển sang chế độ học hỏi thông qua thử và sai (trial-and-error).</p>
<ul>
    <li><strong>Quá trình tự học:</strong> Một mô hình Gemini riêng biệt sẽ tạo ra các nhiệm vụ mới cho SIMA 2 trong môi trường ảo, và một mô hình đánh giá (reward model) sẽ chấm điểm hiệu suất của nó.</li>
    <li><strong>Kết quả:</strong> Những trải nghiệm của chính nó, mà dân gian hay gọi là "Mỡ nó rán nó" sẽ được lưu trữ và dùng để huấn luyện các phiên bản SIMA 2 sau, giúp tác nhân tự nâng cao hiệu suất mà không cần thêm dữ liệu đầu vào, hoặc sự hỗ trợ từ con người.</li>
</ul>
<p>Bộ phận DeepMind của Google đã kiểm tra SIMA 2 trong các thế giới 3D hoàn toàn mới, được tạo ra theo thủ tục bằng mô hình Genie 3 (mô hình tạo thế giới ảo tương tác từ văn bản hoặc hình ảnh). SIMA 2 đã thành công trong việc điều hướng, nhận diện vật thể (như ghế dài hay hoa hoặc cả máy bay), và thực hiện các hành động được yêu cầu trong những thế giới hoàn toàn xa lạ này.</p>
<h2><strong>Tương lai không chỉ là game mà hướng đến AGI và robot</strong></h2>
<p>Mục tiêu của Google DeepMind không phải chỉ là tạo ra một Faker AI mới trong làng game mà họ xem các trò chơi điện tử là môi trường đủ sự an toàn và phức tạp để xây dựng và thử nghiệm sự thích nghi của AI.</p>
<p>Các kỹ năng cấp cao mà SIMA 2 học được trong môi trường ảo như điều hướng không gian, sử dụng công cụ và tự hợp tác để giải quyết vấn đề là những thành phần cơ bản cần thiết cho các ứng dụng robot và xe tự lái trong thế giới thực.</p>
<p>Giống như việc bạn cần hiểu “tủ lạnh” và "bát đũa" là gì và cách di chuyển trong nhà để lấy chúng, robot cũng cần học rất nhiều về điều này khi mà sư chính xác được đặt lên hàng đầu hiện nay những robot như vậy hoàn toàn do con người điều khiển vì vậy chắc chắn SIMA 2 sẽ tập trung vào việc học những hành vi cần độ chính xác cao này.</p>
<p>Vậy SIMA 2 chính là minh chứng cho việc các ông lớn như Google chắc chắn chưa thay đổi mục tiêu AGI của họ, từ đó chắc chắn tạo ra tương lai AI có thể tương tác và hỗ trợ chúng ta trong nhiều lĩnh vực hơn nữa.</p>`
  },
  {
    id: 'google-ra-mat-gemini-3',
    title: 'Google ra mắt Gemini 3: Mô hình AI thông minh nhất thế giới, bước tiến mới của Google tới AGI',
    source: 'Google',
    author: 'Mai',
    publishedAt: '2025-11-20T09:00:00Z',
    imageUrl: '/image/news3/gemini-3-ai-ra-mat.png',
    dataAiHint: 'Google ra mắt Gemini 3 ngày 19-11-2025',
    content: `<p>Ngày 19-11-2025, Google đã chính thức giới thiệu Gemini 3, mô hình AI tiên tiến và thông minh nhất của mình, được thiết kế để giúp người dùng hiện thực hóa mọi ý tưởng.</p>
<p>CEO Sundar Pichai đã tuyên bố Gemini 3 là "mô hình tốt nhất trên thế giới về khả năng hiểu đa phương thức". Mô hình này đánh dấu sự nâng cấp trong hành trình tiến tới trí tuệ nhân tạo tổng quát (AGI).</p>


<h2><strong>Sự nâng cấp so với Gemini 2.5 như thế nào</strong></h2>
<p>Như vậy sau 8 tháng kể từ khi ra mắt Gemini 2.5 thì Google đã quay lại với <a href="/mo-hinh/gemini-3-pro" target="_blank">Gemini 3 Pro</a> với sự nâng cấp về khả năng suy luận và hiểu ngữ cảnh, nó là sự kết hợp của tất cả các khả năng của các thế hệ Gemini trước lại với nhau.</p>


<h3>Càn quét các bảng xếp hạng</h3>
<p>Gemini 3 Pro với sự ra mắt có thể nói trong âm thầm không phải là một bước nhảy vọt nhưng vẫn có sức nặng khi đã đứng đầu rất nhiều bảng xếp hạng LLM (như LMArena,...)</p>
<ul>
    <li>Tất nhiên nếu so với Gemini 2.5 là Gemini 3 hoàn toàn vượt trội ở mọi tiêu chuẩn AI, như ở việc xác định ngữ cảnh và ý định đằng sau yêu cầu của người dùng, cho phép người dùng nhận được kết quả mong muốn với ít đoạn prompting hơn.</li>
    <li>Gemini 3 vượt trội so với Gemini thế hệ trước là bình thường nhưng điểm số của nó cũng vượt qua cả <a href="/mo-hinh/claude-4.5-sonnet-thinking" target="_blank">Claude 4.5 Sonnet</a> và <a href="/mo-hinh/gpt-5-1-high" target="_blank">GPT 5.1</a> đơn cứ như việc Gemini 3 thể hiện khả năng suy luận ở cấp độ tiến sĩ (PhD-level reasoning) với điểm số cao trên các bài kiểm tra Humanity’s Last Exam là 37.5% không dùng công cụ vượt trội so với Claude Sonnet 4.5 (13.7%) và GPT 5.1 (26.5%) hoặc điểm GPQA Diamond (91.9%) cũng tiếp tục vượt lên với Claude Sonnet 4.5 (83.4%) và GPT 5.1 (88.1%)</li>
</ul>
[GEMINI_3_BENCHMARK_CHART]

<h3>Sức mạnh đa phương thức (Multimodality)</h3>
<p>Gemini 3 vẫn được tiếp nối với Gemini 2.5 ở khả năng tổng hợp thông tin liền mạch trên nhiều phương thức, bao gồm văn bản, hình ảnh, video, âm thanh và mã code. Tất nhiên là với bài kiểm tra đều tốt hơn Gemini 2.5 với 81% điểm MMMU-Pro (Gemini 2.5 là 68%) và 87.6% điểm Video-MMMU (Gemini 2.5 là 83.6% theo Google).</p>
[IMAGE:/image/news3/gemini_3_diem_so.gif|Điểm số của Gemini 3|Thống kê sức mạnh Gemini 3]
<h2><strong>Tình huống sử dụng thực tế như thế nào</strong></h2>
<ul>
    <li><strong>Sử dụng trong học tập và nghiên cứu:</strong> Gemini 3 có thể phân tích các bài báo học thuật hoặc bài giảng video dài và tạo mã code cho các hình ảnh trực quan tương tác hoặc thẻ ghi nhớ nhưng mình đã thử với video dài 4 tiếng thật sự Gemini 3 chế độ Fast sẽ không ghi nhớ được hết sẽ sai hoặc thiếu các chi tiết vì vậy bây giờ chưa nên tin tưởng hoàn toàn vào những thông tin mà Gemini 3 đưa ra mà hãy làm việc đó với Notebook LM.</li>
    <li><strong>Trong lĩnh vực sáng tạo và lập kế hoạch:</strong> Gemini 3 hoàn toàn có thể phiên dịch và chuyển đổi các công thức nấu ăn viết tay bằng nhiều ngôn ngữ khác nhau thành sách dạy nấu ăn rất thích hợp để chia sẻ. Thậm chí theo Google nó hoàn toàn có thể viết một bài thơ nắm bắt được vật lý học của phản ứng tổng hợp hạt nhân, hoặc viết mã code để tạo hình ảnh trực quan về dòng plasma trong tokamak.</li>
    <li><strong>Trong lĩnh vực phân tích video thể thao:</strong> Gemini 3 có thể phân tích video về trận đấu thể thao (như pickleball, quần vợt,...) xác định các kĩ năng cần cải thiện và tạo kế hoạch luyện tập.</li>
</ul>


<h2><strong>Gemini 3 Deep Think có chế độ suy nghĩ nâng cao không</strong></h2>
<p>Google cũng giới thiệu Deep think mode một chế độ suy luận được tăng cường, để giúp giải quyết các vấn đề phức tạp hơn giống như Gemini 2.5 nhưng thật sự nó cho ra kết quả sẽ rất là lâu.</p>
<ul>
    <li>Chế độ Deep Think đang được thử nghiệm và dự kiến sẽ sớm có mặt cho người dùng đăng ký Google AI Ultra trong những tuần tới vì vậy mình chưa có cơ hội trải nghiệm nhưng với người dùng bình thường thì chế độ Thinking cũng khá phù hợp.</li>
</ul>


<h2><strong>Khả năng cho nhà phát triển và tốc độ triển khai</strong></h2>


<h3>Khả năng coding Gemini 3 tốt như thế nào</h3>
<p>Gemini 3 có sự thể hiện rất tốt trong khả năng tạo mã code và xử lý các prompt phức tạp để tạo ra giao diện web tương tác và phong phú hơn nhưng thật sự vẫn về khả năng coding mình vẫn tin tưởng Claude Sonnet 4.5 hơn, bởi khi Gemini 3 gặp vấn đề với code sẽ không tập trung xử lý vấn đề đó mà càng sửa càng sai không giống như Claude Sonnet 4.5 điều này gây khó khăn so với những người không hiểu nhiều về code.</p>
<ul>
    <li>Về tốc độ, khi sử dụng coding thì Gemini 3 nhanh hơn đáng kể so với Claude Sonnet 4.5 và GPT 5.1 đặc biệt nhanh gấp 2 lần so với Gemini 2.5 đối với các tác vụ nhỏ và trung bình.</li>
    <li>Để hỗ trợ phát triển các agent, Google cũng phát hành nền tảng phát triển agentic mới là Google Antigravity sử dụng khả năng suy luận và công cụ của Gemini 3 để biến AI thành một agent mới có khả năng hoạt động độc lập và tích cực.</li>
</ul>


<h3>Bao giờ có thể sử dụng Gemini 3</h3>
<p>Gemini 3 đang được triển khai trên toàn bộ hệ sinh thái của Google bắt đầu ngày 19 tháng 11</p>
<ul>
    <li>Ở khung chat Gemini thì Google đã cho chọn chế độ Fast và Thinking chứ không phải lựa chọn LLM như Gemini 2.5 nữa điều đó cũng sẽ cho thấy việc Google tự động hóa việc lựa chọn LLM cho các tác vụ từ đơn giản phức tạp giống như điều mà Open AI đã làm với GPT-5.</li>
    <li>Gemini 3 cũng lần đầu được tích hợp luôn trong Google Search với chế độ AI Mode. Chế độ AI này sử dụng Gemini 3 để kích hoạt các trải nghiệm giao diện người dùng tạo sinh (generative UI) mới, chẳng hạn như bố cục hình ảnh sống động và các công cụ tương tác, được tạo ra dựa trên truy vấn của người dùng. Một động thái theo ý kiến cá nhân là để cạnh tranh với Open Atlas  <a href="/cong-cu/atlas-browser" target="_blank">ChatGPT Atlas</a>  và  <a href="/cong-cu/comet-browser" target="_blank">Perplexity Comet</a>.</li>
</ul>`
  },
  {
    id: 'google-ke-hoach-mo-rong-ha-tang-ai',
    title: 'Google tuyên bố kế hoạch mở rộng hạ tầng AI gấp 1.000 Lần để giữ vững vị thế dẫn đầu',
    source: 'Google',
    author: 'Mai',
    publishedAt: '2025-11-27T09:00:00Z',
    imageUrl: '/image/news3/google-1000x-ha-tang-ai.png',
    dataAiHint: 'Google công bố kế hoạch mở rộng năng lực AI gấp 1.000 lần trong 4-5 năm, tập trung vào kỷ nguyên suy luận.',
    content: `<p>Google đã công bố một yêu cầu nội bộ đầy tham vọng nhằm tăng công suất AI lên gấp 1.000 lần trong vòng 4 đến 5 năm tới. Động thái này diễn ra trong bối cảnh cuộc đua AI toàn cầu đang nóng lên và đòi hỏi các công ty công nghệ phải đầu tư khổng lồ vào cơ sở hạ tầng tính toán, bất chấp những lo ngại về bong bóng AI.</p>
<p>Phó chủ tịch phụ trách cơ sở hạ tầng AI của Google Cloud, ông Amin Vahdat đã trình bày lộ trình này tại một cuộc họp toàn công ty vào đầu tháng 11, nhấn mạnh rằng Google phải tăng gấp đôi năng lực phục vụ AI sau mỗi sáu tháng để đáp ứng nhu cầu bùng nổ.</p>
<h2><strong>Kỷ nguyên suy luận là gì và tại sao nó lại quan trọng với các mô hình AI</strong></h2>
<p>Sự phát triển của AI đang bùng nổ chưa từng thấy, lý do là vì chúng ta đã chuyển từ việc chủ yếu huấn luyện các mô hình AI sang một giai đoạn mới gọi là kỷ nguyên suy luận (Inference Era) tức là để AI tự suy luận, tự quyết định.</p>
<p>Trước đây, giai đoạn tốn kém và ngốn tài nguyên nhất là lúc AI đang học hỏi. Nhưng giờ đây thì khác, đối với những mô hình siêu xịn mới nhất như <a href="/mo-hinh/gemini-3-pro" target="_blank">Gemini 3 Pro</a> lại cần một lượng sức mạnh máy tính khổng lồ và liên tục để làm những việc như: suy nghĩ, lập luận và viết code.</p>
<p>Ông Vahdat đã cảnh báo thẳng thắn rằng: Hiện tại, cuộc đua xây dựng cơ sở hạ tầng cho AI mới chính là phần quan trọng nhất và đắt đỏ nhất của toàn bộ cuộc chơi AI này!</p>
<h2><strong>Ưu thế của Google đi kèm với thách thức</strong></h2>
<p>Để đạt được mức tăng trưởng hạ tầng AI gấp 1.000 lần mà không làm chi phí vượt tầm kiểm soát, Google tiếp tục đặt cược vào hiệu suất và hiệu quả năng lượng.</p>


<h3>Tối ưu hóa hiệu suất và chi phí</h3>
<p>Google đã đặt ra mục tiêu với quá nhiều thách thức: cần cung cấp năng lực tính toán, lưu trữ và kết nối gấp 1.000 lần so với hiện nay, nhưng phải duy trì chi phí và mức tiêu thụ điện năng ở mức tương đương.</p>
<p>Để thực hiện điều này, Google áp dụng triết lý thiết kế đồng bộ rất giống của Nvidia. Đây là việc tích hợp chặt chẽ phần mềm, thuật toán (do DeepMind tự phát triển) với kiến trúc phần cứng “cây nhà lá vườn” của Google đó là TPU Ironwood và CPU Axion.</p>
<h3>Vai trò của TPU Ironwood và CPU Axion là gì</h3>
<p>Chip TPU Ironwood thế hệ thứ 7 (ra mắt vào tháng 4/2025) là trung tâm của chiến lược mở rộng này.</p>
<ul>
    <li>Ironwood được thiết kế cho mục đích suy luận mô hình ngôn ngữ lớn (LLM inferencing).</li>
    <li>Google tuyên bố Ironwood cung cấp hiệu suất đỉnh cao gấp 10 lần so với TPU v5p ra mắt 2018 và hiệu suất trên mỗi watt gấp 2 lần so với thế hệ Trillium trước đó.</li>
    <li>Mỗi chip TPU v7 Ironwood được làm mát bằng chất lỏng có khả năng đạt 4.6 petaFLOPS (FP8 dense). Để hiểu rõ, chúng ta so sánh ngay với Blackwell B200 mới nhất của Nvidia cũng chỉ đạt 4.5 petaFLOPS (FP8 dense).</li>
</ul>
<p>Bên cạnh đó, Google sử dụng CPU tự phát triển Axion (dựa trên Arm). Các khối lượng công việc đa năng đang được chuyển sang các bộ xử lý hiệu quả hơn này để giải phóng năng lượng và không gian nhiệt cho các TPU ngốn điện để phục vụ tác vụ AI chuyên dụng.</p>
[IMAGE:/image/news3/google-tu-san-xuat-tpu-cpu.png|Google tự sản xuất TPU và CPU|Google tự phát triên a-z]
<h3>Thách thức hạ tầng và năng lượng</h3>
<p>Việc tăng công suất tính toán lên mức siêu lớn tất nhiên cũng phải đòi hỏi phải vượt qua các rào cản vật lý lớn về điện năng và làm mát.</p>
<p>Hiện tại, các con chip AI đang mạnh mẽ đến mức chúng trở thành những "lò sưởi tí hon". Dù kích thước chip rất nhỏ, nhưng nhiệt độ và sức nóng mà chúng tạo ra lại cực kỳ khủng khiếp.</p>
<p>Để giải quyết vấn đề này, Google đang thực hiện hai giải pháp chính:</p>
<ul>
    <li><strong>Làm mát bằng chất lỏng:</strong> Họ đã chuyển sang dùng nước hoặc chất lỏng chuyên dụng để làm mát trực tiếp các chip. Cách này hiệu quả hơn rất nhiều so với quạt gió.</li>
    <li><strong>Hệ thống điện 48V:</strong> Google đang triển khai hệ thống phân phối điện 48V. Đây là một giải pháp giúp truyền tải điện hiệu quả hơn và giảm thiểu việc lãng phí điện năng bị biến thành nhiệt.</li>
</ul>
<p>Trong tương lai, khi các tủ máy (rack) chứa chip mạnh đến mức cần công suất hàng trăm kilowatt, Google đang nghiên cứu đến một bước đột phá lớn hơn: chuyển sang dùng nguồn điện một chiều DC 400 V. Điều này sẽ giúp họ khai thác toàn bộ sức mạnh của các hệ thống học máy khổng lồ mà không sợ bị quá tải về điện.</p>
<h3>Cam kết môi trường và khủng hoảng năng lượng</h3>
<p>Theo Alphabet (công ty mẹ của Google) luôn đặt mục tiêu Net Zero (phát thải ròng bằng 0) vào năm 2030 giống như chính phủ Việt Nam ta. Tuy nhiên, nhu cầu năng lượng cho mảng AI đang bị cảnh báo là rất lớn và có thể ảnh hưởng đến các mục tiêu khí hậu của Alphabet.</p>
<p>Để giải quyết tình trạng thiếu hụt năng lượng trên toàn cầu, Google đang tìm kiếm các nguồn cung cấp năng lượng tại chỗ đáng tin cậy, sạch sẽ và có chi phí thấp. Google đã công bố đầu tư vào năng lượng hạt nhân (Kyros), sử dụng các lò phản ứng mô-đun nhỏ (SMRs) 500 megawatt.</p>
<h3>Bong bóng và rủi ro tài chính của AI sẽ diễn biến thế nào</h3>
<p>Mặc dù Google đang dốc hết tiền đầu tư vào công nghệ AI nhưng trên thị trường tài chính, ai cũng đang lo lắng về một bong bóng AI sắp vỡ.</p>
<p>Bản thân Sundar Pichai (CEO Alphabet) cũng phải thẳng thắn thừa nhận: "Có những yếu tố hơi phi lý trong cách thị trường đang định giá các công ty AI hiện nay." Bằng chứng là Alphabet đã nâng dự báo chi tiêu cho xây dựng cơ sở hạ tầng (CapEx) cho năm 2025 lên đến 93 tỷ USD một con số khổng lồ!</p>
<p>Tuy nhiên, ông Pichai có một lập luận rất chắc chắn” Rủi ro lớn nhất không phải là đầu tư quá nhiều, mà là không đầu tư đủ.”</p>
<p>Ông đưa ra ví dụ: Mảng Google Cloud đang tăng trưởng rất ấn tượng, nhưng đáng lẽ doanh thu còn phải cao hơn nữa nếu như họ có đủ năng lực tính toán để phục vụ khách hàng. Nói cách khác, Google chấp nhận rủi ro đầu tư lớn để không bỏ lỡ cơ hội kiếm tiền khủng trong tương lai.</p>
<h3>Google có đang thách thức sự thống trị của Nvidia</h3>
<p>Google đang tăng tốc đầu tư vào hệ thống TPU (chip xử lý AI riêng của họ) và theo đuổi chiến lược tự làm từ A đến Z (từ thiết kế đến sản xuất chip). Điều này đang tạo ra một giải pháp thay thế rất tiềm năng cho chip GPU của Nvidia vị vua đang thống trị thị trường hạ tầng AI hiện nay.</p>
<p>Chip TPU của Google là một loại mạch điện tử (ASIC) được sinh ra chỉ để làm một việc: tính toán cho AI. Nó không giống như GPU của Nvidia.</p>
<ul>
    <li>GPU của Nvidia giống như một vận động viên đa năng, rất linh hoạt và làm được nhiều việc hơn.</li>
    <li>TPU của Google giống như một vận động viên chuyên biệt, có thể làm một số tác vụ huấn luyện và suy luận AI khối lượng lớn hiệu quả hơn và ít tốn điện hơn đối thủ.</li>
</ul>
<p>Canh bạc đặt cược vào TPU của Google đang bắt đầu có hiệu quả khi Meta Platforms đang đàm phán để sử dụng TPU của Google với mục đích là đa dạng hóa nhà cung cấp và giảm bớt sự phụ thuộc vào Nvidia. Dự kiến, Meta có thể bắt đầu thuê năng lực TPU từ năm 2026 và mua chip số lượng lớn từ năm 2027.</p>
<p>Tóm lại, kế hoạch tăng tốc hạ tầng AI lên gấp 1.000 lần của Google không chỉ là một mục tiêu về số lượng mà là là sự thay đổi về cách thiết kế hệ thống.</p>
<p>Google đang biến trung tâm dữ liệu thành một cỗ máy thống nhất và cực kỳ hiệu quả. Họ tập trung vào việc đồng bộ thiết kế giúp phần cứng bắt tay với phần mềm để cùng xử lý tác vụ cùng tiết kiệm điện năng, hơn nữa là dùng chip nhà làm giống như điều Apple đã và đang làm để bảo đảm vị thế dẫn đầu trong cuộc đua với tốc độ chóng mặt!</p>`
  },
];
