
import type { NewsArticle } from '@/lib/types';

export const mockNews3: NewsArticle[] = [
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
];

    