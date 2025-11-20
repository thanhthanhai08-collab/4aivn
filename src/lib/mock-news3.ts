
import type { NewsArticle } from '@/lib/types';

export const mockNews3: NewsArticle[] = [
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
<p>Như vậy sau 8 tháng kể từ khi ra mắt Gemini 2.5 thì Google đã quay lại với Gemini 3 với sự nâng cấp về khả năng suy luận và hiểu ngữ cảnh, nó là sự kết hợp của tất cả các khả năng của các thế hệ Gemini trước lại với nhau.</p>


<h3>Càn quét các bảng xếp hạng</h3>
<p>Với sự ra mắt có thể nói trong âm thầm không phải là một bước nhảy vọt nhưng vẫn có sức nặng khi đã đứng đầu rất nhiều bảng xếp hạng LLM (như LMArena,...)</p>
<ul>
    <li>Tất nhiên nếu so với Gemini 2.5 là Gemini 3 hoàn toàn vượt trội ở mọi tiêu chuẩn AI, như ở việc xác định ngữ cảnh và ý định đằng sau yêu cầu của người dùng, cho phép người dùng nhận được kết quả mong muốn với ít đoạn prompting hơn.</li>
    <li>Gemini 3 vượt trội so với Gemini thế hệ trước là bình thường nhưng điểm số của nó cũng vượt qua cả <a href="/mo-hinh/claude-4.5-sonnet-thinking" target="_blank">Claude 4.5 Sonnet</a> và  <a href="/mo-hinh/gpt-5-1-high" target="_blank">GPT 5.1</a> đơn cứ như việc Gemini 3 thể hiện khả năng suy luận ở cấp độ tiến sĩ (PhD-level reasoning) với điểm số cao trên các bài kiểm tra Humanity’s Last Exam là 37.5% không dùng công cụ vượt trội so với Claude Sonnet 4.5 (13.7%) và GPT 5.1 (26.5%) hoặc điểm GPQA Diamond (91.9%) cũng tiếp tục vượt lên với Claude Sonnet 4.5 (83.4%) và GPT 5.1 (88.1%)</li>
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
    <li>Gemini 3 cũng lần đầu được tích hợp luôn trong Google Search với chế độ AI Mode. Chế độ AI này sử dụng Gemini 3 để kích hoạt các trải nghiệm giao diện người dùng tạo sinh (generative UI) mới, chẳng hạn như bố cục hình ảnh sống động và các công cụ tương tác, được tạo ra dựa trên truy vấn của người dùng. Một động thái theo ý kiến cá nhân là để cạnh tranh với Open Atlas và Comet.</li>
</ul>`
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
  }
];
