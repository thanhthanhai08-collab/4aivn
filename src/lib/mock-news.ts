
import type { NewsArticle } from '@/lib/types';

export const mockNews: NewsArticle[] = [
  {
    id: 'openai-gpt-oss-ra-mat',
    title: 'OpenAI "mở cửa" AI với GPT-OSS tham gia cuộc đua mã nguồn mở',
    source: 'OpenAI',
    author: 'Nam',
    content: `<p>Có vẻ như đổ vỡ với Microsoft đã khiến OpenAI điều chỉnh đáng kể chiến lược tiếp cận rộng rãi tới người dùng AI khi họ đã công bố phát hành 2 model mã nguồn mở mới là gpt-oss-120b và gpt-oss-20b với kích thước lần lượt là 20 tỷ và 120 tỷ tham số (parameter chứ hoàn toàn không phải neuron).</p>
<p>Đặc biệt là 2 mô hình này đều có mã nguồn mở với giấy phép Apache 2.0 rất tự do. Vậy thì giấy phép Apache 2.0 là gì? Có thể nhiều người vẫn chưa biết về giấy phép mở này thực sự rất dài nhưng tóm gọn lại là với giấy phép Apache 2.0 này người dùng hoàn toàn được tự do dùng và chỉnh sửa, phân phối lại cũng không cần mở mã nguồn, kể cả kiếm tiền với GPT-OSS cũng được thậm chí không cần trả khoản phí gì cho Open AI, chỉ cần giữ nguyên bản quyền tác giả là được.</p>
<p>Như vậy với động thái này báo hiệu việc OpenAI tái gia nhập "cuộc đua mô hình mở" sau sáu năm gián đoạn, sánh vai cùng các đối thủ như Meta, Deepseek và Mistral.</p>
<h2><strong>GPT-OSS là gì? Hiểu rõ về "Open-Weight"</strong></h2>
<p>Thuật ngữ "GPT-OSS" dùng để chỉ hai mô hình ngôn ngữ mới này, với kích thước lần lượt là 20 tỷ và 120 tỷ tham số. Quan trọng là, OpenAI đã phát hành chúng dưới dạng các mô hình "open-weight", nghĩa là các trọng số đã được huấn luyện của mô hình AI được công khai cho phép tải về và sử dụng trực tiếp trên máy của người dùng. Điều này cho phép các nhà phát triển kiểm tra và tinh chỉnh cách các mô hình hoạt động.</p>
<p>Tuy nhiên, đây không phải là một bản phát hành "mã nguồn mở" đầy đủ theo nghĩa truyền thống, vì OpenAI chưa công bố công khai mã code huấn luyện gốc hoặc các tập dữ liệu thô được sử dụng để huấn luyện các mô hình này. Ngược lại, một mô hình thực sự mã nguồn mở sẽ cung cấp toàn bộ mã nguồn, tài liệu huấn luyện, trọng số và đôi khi cả tập dữ liệu, cho phép cộng đồng xem, sửa đổi và thậm chí huấn luyện lại mô hình. Mặc dù sự khác biệt này còn gây tranh cãi trong cộng đồng mã nguồn mở, OpenAI nhấn mạnh rằng bản phát hành này là một bước đi tiếp theo sau sáu năm hướng tới việc làm cho lợi ích của AI trở nên dễ tiếp cận rộng rãi.</p>
<h2><strong>Hiệu suất vượt trội và khả năng nâng cao</strong></h2>
<p>Dù "mở", hiệu năng của GPT-OSS vẫn rất đáng gờm. Các bài kiểm tra (benchmark) cho thấy nó có thể cạnh tranh với mô hình đóng của Open AI :</p>
 <ul> <li><strong>GPT-OSS-120B:</strong> Gần tương đương với o4-mini trong các tác vụ suy luận cốt lõi, mô hình này yêu cầu GPU 80GB trở lên.</li> <li><strong>GPT-OSS-20B:</strong> Tương tự o3-mini, có thể chạy trên phần cứng tiêu dùng với 16GB bộ nhớ.</li> </ul>
[BENCHMARK_CHART]
<p>Các điểm nổi bật về kiến trúc và khả năng chính bao gồm:</p>
<ul>
<li>Kiến trúc Mixture-of-Experts (MoE): Cả hai mô hình đều sử dụng thiết kế MoE, kích hoạt ít tham số hơn trên mỗi token (5,1 tỷ cho 120B và 3,6 tỷ cho 20B) để xử lý hiệu quả truy vấn.</li>
<li>Suy luận Chain-of-Thought (CoT): GPT-OSS hỗ trợ khả năng suy luận nâng cao, cho phép các nhà phát triển cấu hình các mức độ nỗ lực suy luận khác nhau (thấp, trung bình hoặc cao) để cân bằng tốc độ và độ chính xác. Các mô hình có thể hiển thị toàn bộ chuỗi suy luận nội bộ của chúng, điều này có thể hỗ trợ gỡ lỗi logic của chúng.</li>
<li>Sử dụng công cụ và đầu ra có cấu trúc: Các mô hình được thiết kế cho các trường hợp sử dụng nâng cao bao gồm sử dụng công cụ, chẳng hạn như công cụ duyệt web để tương tác web và công cụ Python để thực thi mã trong môi trường sổ ghi chép Jupyter.</li>
<li>Huấn luyện chuyên sâu: Được huấn luyện trên hàng nghìn tỷ token chỉ bằng văn bản tập trung vào STEM, mã hóa và kiến thức tổng quát, sử dụng GPU NVIDIA H100 và PyTorch. Thời điểm cắt dữ liệu kiến thức của các mô hình là tháng 6 năm 2024.</li>
<li>Định dạng OpenAI Harmony: Một dự án mã nguồn mở mới từ OpenAI, Harmony, cung cấp một định dạng phản hồi mới lạ cho các mẫu lời nhắc, giới thiệu các vai trò như system, developer, user, assistant, và tool, cùng với các kênh đầu ra riêng biệt cho final (hướng tới người dùng), analysis (chuỗi suy luận), và commentary (liên quan đến công cụ). Cấu trúc này nâng cao khả năng của mô hình trong việc quản lý các tương tác phức tạp.</li>
</ul>
<h2><strong>Ý nghĩa và lợi ích đối với hệ sinh thái AI</strong></h2>
<p>Quyết định phát hành các mô hình GPT-OSS miễn phí được xem là một động thái chiến lược của OpenAI nhằm lấy lại vị thế trong bối cảnh AI đang ngày càng cạnh tranh. Bằng cách cung cấp các mô hình "open-weight" mạnh mẽ, OpenAI không chỉ thúc đẩy đổi mới mà còn trao quyền cho các nhà phát triển và doanh nghiệp.</p>
<p>Điều này mang lại nhiều lợi ích đáng kể:</p>
<ul>
<li>Tăng cường quyền riêng tư: Các doanh nghiệp, đặc biệt trong các ngành yêu cầu bảo mật cao như y tế hay tài chính, có thể triển khai mô hình cục bộ (on-premise) để bảo vệ dữ liệu nhạy cảm.</li>
<li>Tiết kiệm chi phí: Việc triển khai cục bộ giúp giảm độ trễ và chi phí sử dụng API thương mại.</li>
<li>Thúc đẩy đổi mới: Cộng đồng có thể tự do tinh chỉnh và phát triển các giải pháp AI tiên tiến dựa trên các mô hình này.</li>
</ul>
<h2><strong>Có hỗ trợ tinh chỉnh (Fine-Tune) và gọi hàm (Function Calling)</strong></h2>
<p>Các mô hình GPT-OSS được thiết kế hoàn toàn có thể tinh chỉnh (fine-tune), mặc dù không có mã code huấn luyện gốc. Chúng đã được tích hợp vào thư viện transformers của Hugging Face và hỗ trợ các kỹ thuật fine-tune tiết kiệm tài nguyên như LoRA, PEFT, và QLoRA.</p>
<p>Tất nhiên là GPT-OSS có hỗ trợ function calling cho phép mô hình gọi và xử lý kết quả từ các hàm hoặc API bên ngoài trong quá trình hội thoại. Thật sự đây là thứ mà không thể thiếu đối với các mô hình hiện nay để tăng tính kết nối.</p>
<p>Mặc dù việc sử dụng fine-tune mà không có script huấn luyện gốc có thể phức tạp hơn, hoàn toàn không dễ dàng với người thiếu kinh nghiệm nhưng các nhà phát triển nên thử các nền tảng như Unsloth đã phát triển các giải pháp tùy chỉnh và kỹ thuật offloading để làm cho mọi việc dễ dàng hơn đôi chút, cho phép huấn luyện LoRA GPT-OSS-20b trên VRAM 14GB và GPT-OSS-120b trên VRAM 65GB.</p>
<h2><strong>Cách tiếp cận và triển khai:</strong></h2>
<ul>
<li>Hugging Face: Thông qua dịch vụ Inference Providers mà họ đã cung cấp bản demo chính thức của OpenAI.</li>
<li>Triển khai trên chính máy của người dùng (Local Inference): Được hỗ trợ bởi các thư viện như transformers, vLLM, llama.cpp, và ollama. Ví dụ, mô hình 20B có thể chạy trên Macbook, Mac mini chỉ với RAM 32GB.</li>
<li>Có thể chạy thông qua Docker.</li>
<li>Nền tảng cloud : Có sẵn trên các nền tảng như Azure AI Model Catalog và Dell Enterprise Hub cho các triển khai doanh nghiệp an toàn.</li>
</ul>
<p>Các nhà phát triển có thể sử dụng nhiều tối ưu hóa khác nhau để tăng tốc độ suy luận, bao gồm lượng tử hóa MXFP4 cho GPU Hopper hoặc Blackwell, Flash Attention 3 và MegaBlocks MoE kernels.</p>
<h2><strong>Cam kết mạnh mẽ và tranh cãi xoay quanh GPT-OSS</strong></h2>
<p>Mặc dù mô hình được cộng đồng đón nhận tích cực, nhưng đã không còn tính wow khi nói về "tính mở" của nó. Sự khác biệt giữa "open-weight" và "open-source" vẫn là một điểm gây tranh cãi đối với một số người ủng hộ sự minh bạch hoàn toàn, mà còn ở những đối thủ của Open AI đã làm trước đây rất lâu rồi.</p>
<p>Ngoài ra, trong quá trình thử nghiệm, một số trường hợp mô hình gpt-oss-20b "rò rỉ" thông tin chuỗi suy luận nội bộ đã được quan sát, mặc dù OpenAI đã chỉ ra rằng đây là một hành vi được mong đợi để cho phép giám sát và tránh các mô hình che giấu dấu vết của chúng.</p>
<p>Tóm lại, các mô hình GPT-OSS của OpenAI với quá trình thể hiện chắc chắn vẫn chưa hoàn hảo mà chỉ để thể hiện cam kết mạnh mẽ đối với việc làm cho AI trở nên dễ tiếp cận hơn.</p>`,
    publishedAt: '2025-08-10T09:00:00Z',
    imageUrl: '/image/news/Open AI ra mắt GPT oss.png',
    dataAiHint: 'GPT-oss ra mắt'
  },
  {
    id: 'openai-ra-mat-gpt-5',
    title: 'OpenAI Ra Mắt GPT-5: Bạn Có Ngay "Chuyên Gia Trình Độ Tiến Sĩ" Trong Túi',
    source: 'OpenAI',
    author: 'Nam',
    content: `<p><strong>GPT-5 chính thức ra mắt, đánh dấu bước tiến vượt bậc của trí tuệ nhân tạo. CEO OpenAI ví von GPT-5 như một chuyên gia trình độ tiến sĩ, sẵn sàng hỗ trợ người dùng ở mọi lĩnh vực. Cùng tìm hiểu những điểm nổi bật nhất của siêu AI này.</strong></p>
    <p>Trong sự kiện ra mắt ngày 7/8/2025, CEO OpenAI đã mô tả về GPT-5 một cách đầy ấn tượng: "Nếu GPT-3 giống như một học sinh trung học và GPT-4 như một sinh viên đại học, thì GPT-5 là lần đầu tiên mang lại cảm giác như bạn đang có một chuyên gia trình độ tiến sĩ ngay trong túi."</p>
    <p>Để chuẩn bị cho sự kiện này, OpenAI đã rút toàn bộ các mô hình cũ như GPT-4o và GPT-3 khỏi giao diện web, chỉ giữ lại các mục API và Playground, cho thấy sự tự tin tuyệt đối vào sức mạnh của GPT-5.</p>
    
    <h2><strong>Hệ Thống Thống Nhất & Trải Nghiệm Đơn Giản Hơn</strong></h2>
    <p>Một trong những cải tiến cốt lõi của GPT-5 là hệ thống thống nhất mới. Giờ đây, người dùng không cần phải chọn thủ công giữa các mô hình khác nhau cho từng tác vụ. Hệ thống sẽ tự động chuyển đổi giữa chế độ tư duy nhanh (fast) và tư duy sâu (deep) tùy theo nhu cầu của bạn.</p>
    <p>Công nghệ "bộ định tuyến thời gian thực" thông minh sẽ phân tích loại cuộc trò chuyện, độ phức tạp và ý định của người dùng để xác định chế độ phù hợp nhất. Với cách tiếp cận này, GPT-5 đảm bảo hiệu suất tối ưu cho mọi truy vấn, từ những câu hỏi đơn giản đến các yêu cầu phức tạp.</p>
    <p>Để hỗ trợ hệ thống mới này, OpenAI đã giới thiệu một hệ thống phân cấp mô hình mới gồm:</p>
    <ul>
        <li><strong>ChatGPT 5 (Tiêu chuẩn):</strong> AI đa năng, tự động thích ứng với độ phức tạp của truy vấn.</li>
        <li><strong>GPT-5 Thinking:</strong> Chế độ suy luận sâu, tự động kích hoạt cho các vấn đề phức tạp.</li>
        <li><strong>GPT-5 Pro:</strong> Dành riêng cho người dùng gói Pro/Team, mang lại độ chính xác cao nhất cho các tác vụ khó.</li>
        <li><strong>GPT-5 mini:</strong> Mô hình dự phòng nhẹ, cung cấp phản hồi nhanh khi đạt giới hạn sử dụng.</li>
        <li><strong>GPT-5 nano:</strong> Tối ưu hóa cho độ trễ cực thấp và các ứng dụng khối lượng lớn (chỉ có qua API).</li>
    </ul>
    <p>Ngoài ra, các nhà phát triển có thể tinh chỉnh mức độ suy luận của mô hình GPT-5 thông qua API với ba mức: high, medium và low.</p>
[IMAGE:/image/news/Sử dụng OpenAI GPT5.png|Minh họa mô hình GPT5|GPT5]
    <h2><strong>Trợ Thủ Đắc Lực Trong Mọi Lĩnh Vực</strong></h2>
    <p>GPT-5 tiếp tục càn quét các bảng xếp hạng trí tuệ nhân tạo với những con số ấn tượng. Cụ thể, GPT-5 đạt điểm cao vượt trội trên các tiêu chuẩn như GPQA (88.4%), AIME 2025 (100% khi sử dụng Python để giải toán), và HealthBench Hard (46.2%).</p>

    <h3><strong>Lĩnh Vực Sức Khỏe</strong></h3>
    <p>Mặc dù đạt điểm số cao trên HealthBench, OpenAI vẫn đưa ra một lời khuyên quan trọng: <strong>GPT-5 không thể thay thế một chuyên gia y tế.</strong> Hãy coi câu trả lời của GPT-5 như một trợ lý giúp bạn hiểu thêm về kết quả và cân nhắc các lựa chọn, không phải là lời khuyên y tế cuối cùng.</p>

    <h3><strong>Lĩnh Vực Lập Trình</strong></h3>
    <p>GPT-5 cho thấy những cải tiến vượt bậc trong khả năng viết code. Trên chuẩn SWE-bench Verified, GPT-5 đạt 74.9% độ chính xác khi có tư duy, so với 30.8% của GPT-4o.</p>
    <p>Trong thực tế, GPT-5 có thể tạo ra các trang web, ứng dụng, trò chơi với giao diện phức tạp và thẩm mỹ tốt hơn. Tuy nhiên, theo một số thử nghiệm, khi tạo web game, GPT-5 vẫn còn mắc lỗi thường xuyên hơn một chút so với Claude 4.0 Opus, đặc biệt là với các prompt tiếng Việt.</p>

    <h3><strong>Đa Phương Thức (Multimodal AI)</strong></h3>
    <p>GPT-5 hỗ trợ đầy đủ các phương thức văn bản, hình ảnh, âm thanh, và giọng nói. Tuy nhiên, một điểm đáng chú ý là GPT-5 hiện tại mới chỉ tích hợp Dall-E 3 để tạo hình ảnh, thay vì mô hình GPT Image 1 tốt nhất của họ như trên GPT-4o. Điều này có thể khiến chất lượng và kích thước ảnh của GPT-5 chưa thực sự làm hài lòng người dùng đã quen với GPT-4o. OpenAI chưa đưa ra lý do cụ thể cho việc này.</p>

    <h2><strong>Giảm Đáng Kể "Ảo Giác" & Tăng Tính Xác Thực</strong></h2>
    <p>GPT-5 có những bước tiến lớn trong việc giảm tỷ lệ "ảo giác" (hallucinations) - những câu trả lời không chính xác hoặc bịa đặt. Kết quả cho thấy GPT-5 ít có khả năng mắc lỗi về thông tin thực tế hơn khoảng 45% so với GPT-4o.</p>
    <p>Bên cạnh đó, GPT-5 cũng có những cải thiện quan trọng khác:</p>
    <ul>
        <li><strong>Trung thực về giới hạn:</strong> Khi gặp các nhiệm vụ bất khả thi, GPT-5 thừa nhận giới hạn thay vì bịa ra chi tiết.</li>
        <li><strong>Giảm xu hướng nịnh hót:</strong> Các phản hồi của GPT-5 trở nên chuyên nghiệp và ít "nịnh hót" hơn, phù hợp hơn với công việc.</li>
        <li><strong>Tính năng "hoàn thành an toàn" (safe completions):</strong> GPT-5 sẽ giải thích lý do không thể hỗ trợ trực tiếp và đề xuất các lựa chọn thay thế an toàn, đặc biệt với các chủ đề nhạy cảm.</li>
    </ul>
    
    <h2><strong>Giá Cả & Cách Tiếp Cận</strong></h2>
    <p>GPT-5 sẽ được cung cấp cho tất cả người dùng, từ các gói <strong>Free</strong> cho đến <strong>Plus, Pro, Team và Enterprise</strong>.</p>
    <p>Đối với các nhà phát triển, mức giá API cho mỗi 1 triệu token cũng đã được công bố:</p>
    <ul>
        <li><strong>GPT-5:</strong> $1.25 input / $10.00 output</li>
        <li><strong>GPT-5 mini:</strong> $0.25 input / $2.00 output</li>
        <li><strong>GPT-5 nano:</strong> $0.05 input / $0.40 output</li>
    </ul>
    <p>Chỉ sau 18 tháng, OpenAI đã tạo ra một "trí tuệ cấp độ tiến sĩ" với GPT-5. Liệu với sự cạnh tranh khốc liệt từ Gemini, Grok và đặc biệt là Claude 4.1 Opus sắp tới, OpenAI có thể giữ vững vị thế dẫn đầu của mình? Chúng ta hãy cùng chờ xem.</p>`,
    publishedAt: '2025-08-07T09:00:00Z',
    imageUrl: '/image/news/Open AI ra mắt GPT5.png',
    dataAiHint: 'GPT5 ra mắt'
  },
  {
    id: 'openai-ra-mat-chatgpt-agent',
    title: 'OpenAI ra mắt ChatGPT Agent – Tác nhân AI đa năng có thể tự động thực hiện tác vụ thay người dùng',
    source: 'OpenAI',
    author: 'Nam',
    content: `<p>OpenAI vừa công bố một AI Agent đa năng mới tích hợp trực tiếp trong ChatGPT, cho phép AI thực hiện nhiều tác vụ trên máy tính thay cho người dùng, chứ không chỉ đơn thuần trả lời câu hỏi như trước. Theo OpenAI, ChatGPT agent có thể tự động truy cập và điều phối lịch làm việc, tạo bài thuyết trình có thể chỉnh sửa và viết code.</p>

  <p>Công cụ này có tên là ChatGPT agent, được xây dựng bằng cách kết hợp nhiều năng lực từ các sản phẩm agent trước đây của OpenAI, bao gồm:</p>

  <ul>
    <li><strong>Operator:</strong> Có thể tự động điều hướng và thao tác trên các trang web khác nhau</li>
    <li><strong>Deep Research:</strong> Có khả năng tổng hợp thông tin từ hàng chục trang web thành một bản báo cáo nghiên cứu với đầy đủ thông tin tổng hợp.</li>
  </ul>

  <p>Người dùng có thể tương tác với ChatGPT agent bằng ngôn ngữ tự nhiên, như cách đang sử dụng ChatGPT hiện tại. Agent này sẽ được bắt đầu triển khai trên nền tảng OpenAI từ <strong>18/7/2025</strong>, dành cho người dùng các gói <em>Pro, Plus</em> và <em>Team</em>. Để sử dụng, người dùng có thể bật chế độ "agent mode" từ menu công cụ trong ChatGPT.</p>

  <h2><strong>Nỗ lực để biến ChatGPT agent thành trợ lý thực thụ</strong></h2>

  <p>Việc ra mắt ChatGPT agent đánh dấu sự cạnh tranh khốc liệt trong việc tạo ra AI agent có thể tự hành động và giải quyết công việc cho người dùng. Trong vài năm qua, nhiều công ty công nghệ như OpenAI, Google và Perplexity đã giới thiệu nhiều mô hình agent, tuy nhiên các phiên bản đời đầu không được như kỳ vọng và cũng vấp phải sự cạnh tranh khốc liệt bởi các mô hình agent đến từ Trung Quốc như Flowith và Manus Genspark.</p>

  <p>Dù vậy khả năng ChatGPT agent không được định vị với khả năng hoạt động như một workflow giống như Flowith và Manus, tuy nhiên OpenAI vẫn khẳng định ChatGPT agent lần này mạnh mẽ hơn nhiều so với bất kỳ phiên bản nào trước đó.</p>

  <p>Agent mới có thể kết nối với các ứng dụng thông qua ChatGPT connectors, như Gmail, GitHub, từ đó giúp tìm kiếm thông tin liên quan đến yêu cầu người dùng. Nó cũng có quyền truy cập terminal để chạy mã, và có thể sử dụng API để truy cập các ứng dụng bên ngoài.</p>

  <p>Ví dụ, người dùng có thể yêu cầu ChatGPT agent:</p>
  <ul>
    <li>“Lên kế hoạch và mua nguyên liệu để nấu bữa sáng kiểu Nhật cho 4 người”</li>
    <li>“Phân tích 3 đối thủ cạnh tranh và tạo slide thuyết trình”</li>
  </ul>

  <p>Những tác vụ như vậy đòi hỏi Agent phải lên kế hoạch hành động, duyệt web, chọn công cụ phù hợp – tất cả sẽ được thực hiện trên một máy ảo (sandbox giống với Manus) rồi đưa ra kết quả, không sử dụng công cụ trực tiếp trên thiết bị của người dùng.</p>

  <h2><strong>Hiệu suất vượt trội trong các bài kiểm tra đánh giá</strong></h2>

  <p>OpenAI cho biết mô hình đứng sau ChatGPT agent đạt hiệu suất hàng đầu hiện nay trong nhiều bài đánh giá chuẩn.</p>

  <p>Cụ thể:</p>
  <ul>
    <li>Trên bài kiểm tra <em>Humanity’s Last Exam</em> (bao gồm hàng nghìn câu hỏi thuộc hơn 100 lĩnh vực), ChatGPT agent đạt <strong>41,6% (pass@1)</strong> – gấp đôi kết quả của các mô hình o3 và o4-mini.</li>
    <li>Ở bài đánh giá toán học khó nhất hiện tại – <em>FrontierMath</em>, ChatGPT agent đạt <strong>27,4%</strong> khi có quyền dùng công cụ (terminal, v.v.). Trước đó, mô hình tốt nhất là o4-mini chỉ đạt 6,3%.</li>
  </ul>

  <h2><strong>Các biện pháp an toàn nghiêm ngặt đi kèm</strong></h2>

  <p>Vì ChatGPT agent sở hữu những năng lực mới có thể bị lạm dụng, OpenAI cho biết họ đặt yếu tố an toàn lên hàng đầu trong quá trình phát triển.</p>

  <p>Trong báo cáo an toàn riêng dành cho ChatGPT agent, OpenAI xếp mô hình này vào nhóm “năng lực cao” trong lĩnh vực vũ khí sinh học và hóa học (theo <em>Preparedness Framework</em>). Nghĩa là, dù chưa có bằng chứng trực tiếp, mô hình này có tiềm năng khuếch đại các mối đe dọa nghiêm trọng hiện có. Vì vậy, OpenAI chủ động triển khai các biện pháp bảo vệ mới để giảm rủi ro.</p>

  <p>Các biện pháp này bao gồm:</p>
  <ul>
    <li><strong>Bộ giám sát thời gian thực:</strong> Theo dõi mọi câu lệnh mà người dùng nhập vào. Nếu có dấu hiệu liên quan đến sinh học, phản hồi từ agent sẽ được chuyển qua một bộ kiểm duyệt thứ hai để đánh giá nguy cơ.</li>
    <li><strong>Vô hiệu hóa tính năng bộ nhớ (memory):</strong> Trong các phiên bản khác của ChatGPT, hoặc Manus hay Flowith đều cho phép chatbot nhớ thông tin từ cuộc trò chuyện trước. Tuy nhiên, với ChatGPT agent, tính năng này bị tắt để tránh nguy cơ lộ dữ liệu do prompt injection. OpenAI cho biết họ có thể xem xét bật lại trong tương lai.</li>
  </ul>

  <h2><strong>Vẫn cần kiểm chứng thực tế</strong></h2>

  <p>Dù ChatGPT agent được trang bị nhiều tính năng mạnh mẽ, khả năng hoạt động thực tế vẫn còn là dấu hỏi. Các công nghệ agent hiện nay vẫn dễ lỗi và kém ổn định khi tương tác với thế giới thật.</p>

  <p>Tuy nhiên, OpenAI tin rằng họ vẫn đang đi đúng hướng trong việc phát triển mô hình agent có năng lực thật sự.</p>`,
    publishedAt: '2025-07-20T09:00:00Z',
    imageUrl: '/image/news/OpenAI ra mắt ChatGPT Agent.png',
    dataAiHint: 'Chatgpt Agent ra mắt'
  },
  {
    id: 'google-deepmind-va-buoc-dot-pha-ai-trong-du-bao-bao',
    title: 'Google DeepMind và bước đột phá AI trong dự báo bão: Thay đổi ngành khí tượng toàn cầu',
    source: 'Google DeepMind',
    author: 'Nam',
    content: `<p>
    Google DeepMind vừa công bố một cột mốc quan trọng trong việc ứng dụng trí tuệ nhân tạo vào dự báo bão, khi hệ thống AI tiên tiến của họ đã được Trung tâm bão quốc gia Mỹ(NHC) chấp thuận để đánh giá trong thời gian thực. 
    Sự hợp tác này mở ra một kỷ nguyên mới trong ngành khí tượng, nơi AI không chỉ hỗ trợ mà còn có thể nâng tầm độ chính xác và tốc độ dự báo các bão nhiệt đới, góp phần cứu người và giảm thiểu thiệt hại kinh tế do thời tiết cực đoan gây ra.
  </p>

  <h2><strong>Bài toán dự báo bão, áp thấp nhiệt đới: Bài toán nan giải suốt nhiều thập kỷ</strong></h2>
  <p>
    Đối với dự báo thời tiết thì Google DeepMind cũng đã có mô hình GraphCast với khả năng dự báo thời tiết trong 10 ngày với độ chính xác hơn HRES 
    (hệ thống mô phỏng thời tiết tiêu chuẩn vàng của Châu Âu) trên 99.7% các biến thử nghiệm trong tầng đối lưu, và đã được ECMWF thử nghiệm trực tiếp trên trang web của họ.
  </p>
  <p>
    Còn đối với các dự báo các loại bão, áp thấp nhiệt đới luôn là một trong những dự báo phức tạp mang lại thách thức lớn nhất của ngành khí tượng. 
    Các mô hình dự báo truyền thống đều dựa trên phương trình vật lý và siêu máy tính, thậm chí những mô hình AI dự báo thời tiết vẫn gặp giới hạn rõ rệt.
  </p>
  <p>
    Đặc biệt, khi gặp các hiện tượng thời tiết cực đoan và hiếm gặp hay còn gọi là các sự kiện “thiên nga xám” – hầu hết các mô hình hiện tại đều khó khăn trong việc nhận diện và dự đoán do thiếu dữ liệu huấn luyện lịch sử tương ứng. 
    Trong vòng 50 năm qua, xoáy thuận nhiệt đới đã gây ra tổn thất kinh tế hơn 1.400 tỷ USD trên toàn cầu – một con số cho thấy nhu cầu cấp thiết của các công nghệ dự báo nhanh và chính xác hơn.
  </p>

  <h2><strong>GenCast và Weather Lab: Cặp bài trùng AI dự báo bão từ DeepMind</strong></h2>
  <p>
    Để đối mặt với thách thức đó, Google DeepMind đã ra mắt hệ thống AI mới có tên WeatherNext Gen (gọi tắt là GenCast), được triển khai thông qua nền tảng Weather Lab. 
    Mô hình này không chỉ dự đoán đường đi mà còn mô phỏng được cường độ của các cơn bão lên tới 15 ngày, với độ phân giải và tốc độ tốt hơn mô hình vật lý truyền thống.
  </p>
[IMAGE:/image/news/Ảnh Weather Lab.png|Minh họa mô hình Gencast|Gencast dự báo bão]

  <h3>Những điểm nổi bật của GenCast:</h3>
  <ul>
    <li>
      <strong>Độ chính xác vượt trội:</strong> Trong thử nghiệm, GenCast đã dự đoán vị trí bão chính xác hơn tới 140 km so với ENS (mô hình tổng hợp hàng đầu châu Âu). 
      Đáng chú ý hơn, nó còn vượt qua cả hệ thống HAFS của NOAA (Cục quản lý khí quyển và đại dương Mỹ) trong việc dự đoán cường độ – một điểm yếu cố hữu của các mô hình AI trước đây.
    </li>
    <li>
      <strong>Tốc độ cực nhanh:</strong> Trong khi các mô hình truyền thống cần hàng giờ tính toán trên siêu máy tính, thì GenCast có thể đưa ra dự báo 15 ngày chỉ trong một phút trên chip TPU của Google Cloud. 
      Nhờ đó, hệ thống hoàn toàn đáp ứng yêu cầu của NHC là phải có dự báo trong vòng 6,5 giờ kể từ thời điểm thu thập dữ liệu.
    </li>
    <li>
      <strong>Phương pháp học sâu thông minh:</strong> GenCast được huấn luyện dựa trên:
      <ul>
        <li>Dữ liệu tái phân tích khí hậu toàn cầu, với hàng triệu quan sát trong hàng chục năm.</li>
        <li>Kho dữ liệu chi tiết của gần 5.000 cơn bão trong 45 năm, bao gồm cả nguồn dữ liệu IBTrACS.</li>
      </ul>
      Đây là một mô hình AI khuếch tán có điều kiện (Conditional Diffusion Model), tích hợp Mạng lưới sinh thành chức năng (Functional Generative Network)  cho phép mô phỏng xác suất, học từ dữ liệu quá khứ và xử lý tính bất định trong dự báo.
    </li>
  </ul>
  <h2><strong>Từ nghiên cứu đến vận hành: Bước chuyển mình của NHC</strong></h2>
  <p>
    Điều đặc biệt là Trung tâm bão quốc gia Mỹ (NHC) đã chính thức đưa mô hình AI này vào quy trình đánh giá vận hành, bắt đầu từ mùa bão đại tây dương 2025.
  </p>

  <h3>Hai bước tiến then chốt:</h3>
  <ul>
    <li>
      <strong>Tích hợp thời gian thực:</strong> Các dự báo từ GenCast sẽ chạy song song với các mô hình vật lý truyền thống trong quy trình làm việc của các nhà dự báo tại NHC.
    </li>
    <li>
      <strong>Minh chứng từ thực địa:</strong> Trong các sự kiện gần đây như bão Otis (2023) và Beryl (2024), hệ thống AI đã dự đoán chính xác sự tăng cường nhanh chóng của bão – điều mà nhiều mô hình truyền thống bỏ lỡ. 
      Nếu được triển khai sớm hơn, các cảnh báo có thể đã được đưa ra trước vài giờ.
    </li>
  </ul>

  <h2><strong>Tương lai: AI không thay thế, mà tăng cường khả năng dự báo</strong></h2>
  <p>
    Google DeepMind nhấn mạnh rằng GenCast vẫn là công cụ nghiên cứu và không thay thế các cơ quan khí tượng chính thức, vì vậy mọi thông tin trên Weather Lab theo Google vẫn chỉ mang tính chất tham khảo. 
  </p>
  <p>
    Tuy nhiên, mục tiêu rõ ràng là AI sẽ bổ trợ và tăng cường độ chính xác của các hệ thống hiện hành, nhất là trong những tình huống mà thời gian phản ứng là yếu tố sống còn 
    và hướng phát triển trong tương lai sẽ là mô hình lai giữa AI và vật lý để đảm bảo các kết quả dưới góc nhìn khoa học.
  </p>

  <h2><strong>Kết luận: AI – Đồng minh mới trong cuộc chiến chống biến đổi khí hậu và thiên tai</strong></h2>
  <p>
    Dự báo thời tiết chính xác hơn không chỉ là một vấn đề khoa học mà còn là một vấn đề sinh tử đối với hàng triệu người. 
    Bằng việc tích hợp AI vào khí tượng học, chúng ta đang chứng kiến một cuộc cách mạng hóa cách con người hiểu và phản ứng với thiên nhiên.
  </p>
  <p>
    GenCast là một minh chứng cho tiềm năng của trí tuệ nhân tạo không chỉ trong việc dự đoán tương lai mà còn trong việc bảo vệ con người khỏi các tác động của bão.
  </p>`,
    publishedAt: '2025-07-10T09:00:00Z',
    imageUrl: '/image/news/Mô hình Gencast.png',
    dataAiHint: 'Gencast mô hình AI có thể dự báo bão',
    link: 'https://deepmind.google/discover/blog/gencast-predicts-weather-and-the-risks-of-extreme-conditions-with-sota-accuracy/'
  },
  {
    id: 'grok-4-ra-mat-xai-khang-dinh-grok-4-la-mo-hinh-ai-thong-minh-nhat-the-gioi',
    title: 'Grok 4 ra mắt: xAI khẳng định Grok 4 là mô hình AI “thông minh” nhất thế giới',
    source: 'xAI',
    author: 'Nam',
    content: `<p>Ngày 09 tháng 7 năm 2025, xAI, công ty trí tuệ nhân tạo của tỷ phú Elon Musk, đã chính thức công bố sự ra đời của Grok 4, mô hình AI được mệnh danh là thông minh nhất thế giới. Grok 4 vẫn kế thừa những tính năng cốt lõi của Grok thế hệ trước và được nâng cấp vượt trội với khả năng suy luận mạnh mẽ của Grok 4 Heavy cùng khả năng cập nhật dữ liệu trong thời gian thực. Grok 4 và Grok 4 Heavy đang định hình lại cục diện cuộc đua AI toàn cầu.</p>
        <p>Grok 4 hiện đã có sẵn cho những người đăng ký gói SuperGrok và Premium+, cũng như thông qua API của xAI. Cùng với đó, xAI cũng giới thiệu một tầng đăng ký mới mang tên SuperGrok Heavy, cung cấp quyền truy cập vào Grok 4 Heavy – phiên bản mạnh mẽ nhất, hoạt động theo cơ chế "multi-agent” độc đáo. Tuy nhiên, dự kiến giá sử dụng sẽ không hề dễ chịu chút nào, vào khoảng 300 đô la Mỹ mỗi tháng.</p>
        <h2><strong>Công Nghệ Nền Tảng: Tăng Cường Học Tăng Cường với Siêu Cụm Colossus</strong></h2>
        <p>Sự phát triển của Grok 4 là một bước tiến vượt bậc từ Grok 3 Reasoning, mô hình đã chứng minh khả năng tư duy sâu hơn và giải quyết vấn đề chính xác hơn nhờ học tăng cường. xAI đã nhận ra tiềm năng mở rộng đáng kể quá trình huấn luyện học tăng cường này.</p>
        [IMAGE:/image/news/xAi ra mắt Grok 4.png|Minh họa Grok 4|xAi Grok 4]
        <p>Để đạt được hiệu suất đột phá của Grok 4, xAI đã tận dụng <strong>Colossus</strong>, cụm <strong>200.000 GPU Nvidia H1000</strong> khổng lồ của mình, để huấn luyện cho mô hình. Theo xAI, quá trình này được hỗ trợ từ cơ sở hạ tầng đến các thuật toán mới, giúp hiệu quả tính toán của quá trình huấn luyện Grok 4 tăng lên gấp 6 lần. Đồng thời, xAI cũng thực hiện một nỗ lực thu thập dữ liệu lớn, mở rộng đáng kể dữ liệu huấn luyện có thể kiểm chứng từ chủ yếu là toán học và lập trình sang nhiều lĩnh vực khác, đặc biệt là dữ liệu từ nền tảng X là một công cụ huấn luyện tuyệt vời cho Grok 4.</p>
        <h2><strong>Hiệu Suất Vượt Trội: Các Kỷ Lục Mới Trên Chuẩn Mực AI</strong></h2>
        <p>Theo công bố từ xAI, các điểm benchmark của Grok 4 thực sự vượt trội so với những mô hình đối thủ. Cần lưu ý đây là dữ liệu từ xAI và sẽ có một dữ liệu độc lập khác trong bảng xếp hạng của Clean AI.</p>
        <ul>
            <li><strong>Humanity's Last Exam:</strong>
                <ul>
                    <li>Grok 4 Heavy (với Python + Internet): 44.4%</li>
                    <li>Grok 4 (với Python + Internet): 38.6%</li>
                    <li>Grok 4 (không công cụ): 25.4%</li>
                    <li>Grok 4 Heavy là mô hình đầu tiên đạt 50.7% trên tập con chỉ văn bản của bài kiểm tra này.</li>
                    <li><em>So với:</em> Gemini Deep Research (26.9%), Grok 4o3 (với Python + Internet): 24.9%, Gemini 2.5 Pro (21.6%), o3 (21%).</li>
                </ul>
            </li>
            <li><strong>ARC-AGI v2 Semi Private (Nhận diện mẫu):</strong>
                <ul>
                    <li>Grok 4: 15.9%(gần gấp đôi Claude Opus 4)</li>
                    <li><em>So với:</em> Claude Opus 4 (8.6%), o3 (6.5%), Gemini 2.5 Pro (4.9%).</li>
                </ul>
            </li>
            <li><strong>Agentic Vending-Bench:</strong> Grok 4 thể hiện sự vượt trội trong mô phỏng kinh tế khi đạt giá trị  trung bình 4694.15 USD và bán được 4569 đơn vị (trung bình 5 lần chạy), vượt xa Claude Opus 4 (2077.41 USD, 1412 đơn vị) và Gemini(844.05 USD, 344 đơn vị).</li>
        </ul>
        <h2><strong>Tính Năng Độc Đáo: Sử Dụng Công Cụ Nguyên Bản và Khả Năng Đa Phương Thức</strong></h2>
        <p>Grok 4 được huấn luyện để có thể kết hợp sử dụng tìm kiếm web (web search) với thông tin chuyên sâu từ nền tảng X:</p>
        <ul>
            <li><strong>Đối với web search:</strong> Grok 4 có khả năng tìm kiếm thông tin theo thời gian thực hoặc khi giải quyết các câu hỏi phức tạp. Grok 4 có thể tự chọn truy vấn tìm kiếm, khai thác kiến thức từ khắp web và đi sâu cần thiết để cung cấp phản hồi chất lượng hơn.</li>
            <li><strong>Đối với nền tảng mạng xã hội X:</strong> Grok có thể tìm kiếm chuyên sâu trong X, bao gồm tìm kiếm từ khóa, tìm kiếm ngữ nghĩa, xem ảnh và video. Từ đó, nó kết hợp thông tin đã tìm thấy trên web để tiếp tục cải thiện chất lượng của câu trả lời.</li>
        </ul>
        <h2><strong>Chế Độ Giọng Nói Nâng Cấp và Khả Năng Thị Giác Trực Tiếp</strong></h2>
        <p>Grok 4 giới thiệu chế độ Voice Mode (giọng nói) có vẻ như đã được nâng cấp đáng kể, với độ chân thực, phản hồi nhanh nhạy và thông minh vượt trội. xAI đã tích hợp một giọng nói mới, êm dịu, được thiết kế để các cuộc hội thoại trở nên tự nhiên giống con người hơn.</p>
        <p>Đặc biệt, Grok đã sở hữu khả năng <strong>"nhìn thấy những gì bạn thấy!"</strong>. Người dùng có thể hướng camera, nói chuyện trực tiếp, và Grok sẽ phân tích khung cảnh theo thời gian thực, cung cấp thông tin chi tiết và phản hồi ngay trong trải nghiệm trò chuyện bằng giọng nói. Chế độ này hoàn toàn giống với Gemini Live của Google. Tuy nhiên, đối với người Việt, Gemini Live vẫn có ưu thế về khả năng hỗ trợ tiếng Việt tốt hơn so với Grok ở thời điểm hiện tại.</p>
        <h2><strong>API Mạnh Mẽ và Tầm Nhìn Doanh Nghiệp</strong></h2>
        <p>API Grok 4 cung cấp cửa sổ ngữ cảnh (context window) lên tới 256k token. Mặc dù đây là một con số khá lớn, nhưng vẫn còn kém xa so với các mô hình của Google có thể đạt tới 1 triệu token.</p>
        <p>API của Grok 4 chắc chắn sẽ được tích hợp khả năng tìm kiếm dữ liệu thời gian thực trên X, web và các nguồn tin tức khác thông qua API tìm kiếm trực tiếp mới ra mắt. Với bảo mật và tuân thủ cấp doanh nghiệp (SOC 2 Type 2, GDPR, CCPA), API Grok 4 đảm bảo bảo vệ mạnh mẽ cho các ứng dụng nhạy cảm. xAI cũng thông báo Grok 4 sẽ sớm có mặt trên các nền tảng đối tác hyperscaler, giúp doanh nghiệp dễ dàng triển khai ở quy mô lớn.</p>
        <h2><strong>Lộ Trình Phát Triển và Thách Thức</strong></h2>
        <p>xAI đã công bố lộ trình phát triển sản phẩm đầy tham vọng trong những tháng tới, bao gồm:</p>
        <ul>
            <li>Mô hình AI viết code (coding model): Dự kiến ra mắt vào tháng 8.</li>
            <li>Tác nhân AI đa phương thức (multi-modal agent): Dự kiến ra mắt vào tháng 9.</li>
            <li>Mô hình tạo video: Dự kiến ra mắt vào tháng 10.</li>
        </ul>
        <p>Trong tương lai, xAI sẽ tiếp tục phát triển và mở rộng quy mô để theo kịp các ông lớn như OpenAI, Google. Điều này sẽ càng có lợi cho người dùng khi mà AI luôn luôn được cải tiến và đổi mới.</p>
        <p>Mặc dù Grok 4 đạt được những thành tựu vượt trội, xAI vẫn đối mặt với thách thức trong việc vượt qua những sự cố gần đây liên quan đến hành vi của Grok và sự thay đổi lãnh đạo tại X. Tuy nhiên, xAI một lần nữa khẳng định mình là một trong những phòng thí nghiệm AI nổi bật, tiếp tục đẩy lùi ranh giới của trí tuệ nhân tạo và thách thức mọi đối thủ lớn trên thế giới.</p>
        <p>Grok hiện có sẵn trên Web, iOS, Android và Grok trên X.</p>`,
    publishedAt: '2025-07-09T09:00:00Z',
    imageUrl: '/image/news/xAi ra mắt Grok 4.png',
    dataAiHint: 'xAi ra mắt Grok 4'
  },
  {
    id: 'tra-cuu-thong-tin-don-vi-hanh-chinh-moi-da-co-tro-ly-ai-cua-viettel-giup-suc',
    title: 'Tra cứu thông tin đơn vị hành chính mới đã có trợ lý AI của Viettel giúp sức',
    source: 'Viettel',
    author: 'Nam',
    content: `<p>Ngay sau khi cả nước chào đón thời khắc công bố thành lập các tỉnh/thành, phường/xã mới, <strong>Tập đoàn Công nghiệp - Viễn thông Quân đội (Viettel)</strong> đã ra mắt một <strong>trợ lý AI miễn phí</strong> cho toàn dân. Trợ lý này hoạt động qua web, giúp mọi người dễ dàng tra cứu mọi thông tin về các đơn vị hành chính mới. Đây là sản phẩm do chính Viettel nghiên cứu và phát triển, thể hiện cam kết đóng góp vào công cuộc chuyển đổi số quốc gia, hướng tới một nền hành chính công minh bạch và hiệu quả hơn.</p>
        <h2><strong>Giải quyết khó khăn tra cứu thông tin hành chính</strong></h2>
        <p>Việc sáp nhập, sắp xếp các đơn vị hành chính, dù đã được chuẩn bị kỹ lưỡng, vẫn gây không ít khó khăn cho người dân trong việc tra cứu thông tin. Để giải quyết vấn đề này, trợ lý AI mới của Viettel được xây dựng trên nền tảng mô hình ngôn ngữ lớn hoàn toàn bằng <strong>tiếng Việt</strong> do chính Viettel phát triển. Trợ lý này được thiết kế và huấn luyện từ các văn bản chính thống, đảm bảo độ chính xác cao khi tra cứu thông tin mới về tổ chức đơn vị hành chính.</p>
        <p>Trước đó, Viettel đã có kinh nghiệm phát triển thành công <strong>Trợ lý ảo pháp luật</strong> và <strong>Trợ lý ảo công chức</strong>. Nhờ đó, Viettel đã có kinh nghiệm và am hiểu các câu hỏi của người Việt, giúp trợ lý AI mới đưa ra những câu trả lời sát với thực tế nhất.</p>
        <h2><strong>Hướng dẫn tra cứu tỉnh, thành phố và xã, phường mới bằng trợ lý AI của Viettel</strong></h2>
        <p>Viettel đã ra mắt trợ lý AI giúp người dân dễ dàng tra cứu thông tin về các đơn vị hành chính mới. Chỉ với vài bước đơn giản, bạn có thể tìm kiếm mọi thông tin cần thiết về 34 tỉnh, thành phố và 3.321 xã, phường mới:</p>
        <h3>Bước 1: Truy cập nền tảng web</h3>
        <p>Mở trình duyệt web trên máy tính, điện thoại hoặc máy tính bảng của bạn và truy cập địa chỉ <a href="https://tracuuphuongxa.trolyao.org/" target="_blank"><strong>https://tracuuphuongxa.trolyao.org/</strong></a>.</p>
        <h3>Bước 2: Đặt câu hỏi</h3>
        <p>Tại ô hội thoại, hãy nhập câu hỏi bạn muốn tra cứu về đơn vị hành chính mới. Trợ lý AI được thiết kế để hiểu các câu hỏi tự nhiên dưới dạng hội thoại. Người dùng có thể đặt câu hỏi về đơn vị hành chính mới theo nhu cầu tìm hiểu.</p>
        <p><strong>Một số ví dụ bạn có thể tham khảo:</strong></p>
        <ul>
            <li>"Hà Nội có bao nhiêu xã, phường?"</li>
            <li>"Xã Cổ Bi - Thành phố Hà Nội bây giờ là xã nào?"</li>
            <li>"Tỉnh Nam Định bây giờ là tỉnh nào?"</li>
            <li>"Cả nước hiện có những tỉnh, thành phố nào?"</li>
        </ul>
        <h3>Bước 3: Xem kết quả và nguồn tham chiếu</h3>
        [IMAGE:/image/news/Trợ lý AI tra cứu xã phường.png|Minh họa nền tảng trợ lý AI Viettel|Viettel AI Assistant]
        <p>Trợ lý AI sẽ cung cấp câu trả lời chi tiết cho câu hỏi của bạn cùng nguồn văn bản tương ứng được gọi là tri thức của trợ lý. Để đảm bảo độ tin cậy và chính xác, bạn có thể kiểm tra lại <strong>nguồn trích dẫn được đánh dấu màu đỏ</strong> trong câu trả lời. Trợ lý AI cũng cung cấp bộ cẩm nang toàn diện về đơn vị hành chính cấp tỉnh và cấp xã mới (nằm ở góc trên bên phải màn hình), bao gồm các nghị quyết của Ủy ban Thường vụ Quốc hội về việc sắp xếp đơn vị hành chính mới.</p>
        <p>Việc đưa sản phẩm AI này vào sử dụng ngay sau khi đất nước sắp xếp lại các đơn vị hành chính thể hiện cam kết mạnh mẽ của chính phủ trong việc đóng góp vào công cuộc chuyển đổi số quốc gia, hướng tới một nền hành chính công minh bạch và hiệu quả hơn.</p>
        <p>Bạn đã trải nghiệm trợ lý AI này chưa? Hãy chia sẻ cảm nhận của bạn nhé!</p>`,
    publishedAt: '2025-10-02T09:00:00Z',
    imageUrl: '/image/news/Trợ lý AI Vietel.png',
    dataAiHint: 'Viettel AI Assistant',
    link: 'https://tracuuphuongxa.trolyao.org/'
  },
  {
    id: 'ai-claude-tu-model-ai-bien-thanh-giam-doc-doanh-nghiep-nho',
    title: 'AI Claude: Từ model AI biến thành giám đốc doanh nghiệp nhỏ',
    source: 'TechForge',
    author: 'Nam',
    content: `<p>Anthropic đã giao nhiệm vụ cho mô hình AI Claude của mình điều hành một doanh nghiệp nhỏ để kiểm tra khả năng kinh tế thực tế của nó.</p>

    <p>AI Agent, được Anthropic đặt biệt danh là 'Claudius', được thiết kế để quản lý một doanh nghiệp nhỏ trong một khoảng thời gian dài, xử lý mọi thứ từ tồn kho và định giá đến quan hệ khách hàng nhằm tạo ra lợi nhuận. Mặc dù thử nghiệm này không có lợi nhuận, nhưng nó đã mang lại một cái nhìn sâu sắc đầy thú vị – dù đôi khi kỳ lạ – về tiềm năng và cạm bẫy của các đặc vụ AI trong vai trò kinh tế.</p>
    
    <p>Dự án là sự hợp tác giữa Anthropic và Andon Labs, một công ty đánh giá an toàn AI. "Cửa hàng" tự nó là một thiết lập khiêm tốn, bao gồm một tủ lạnh nhỏ, vài giỏ hàng và một chiếc iPad để tự thanh toán. Tuy nhiên, Claudius không chỉ là một máy bán hàng tự động đơn giản. Nó được hướng dẫn hoạt động như một chủ doanh nghiệp với số dư tiền mặt ban đầu, được giao nhiệm vụ tránh phá sản bằng cách tích trữ các mặt hàng phổ biến được lấy từ các nhà bán buôn.</p>
    
    <p>Để đạt được điều này, AI được trang bị một bộ công cụ để điều hành doanh nghiệp. Nó có thể sử dụng một trình duyệt web thực để nghiên cứu sản phẩm, một công cụ email để liên hệ với nhà cung cấp và yêu cầu hỗ trợ vật lý, cùng với các sổ ghi chú kỹ thuật số để theo dõi tài chính và tồn kho.</p>
    
    <p>Các nhân viên của Andon Labs đóng vai trò là "đôi tay" vật lý của hoạt động, bổ sung hàng hóa cho cửa hàng theo yêu cầu của AI, đồng thời đóng vai trò là nhà bán buôn mà AI không hề hay biết. Tương tác với khách hàng, trong trường hợp này là nhân viên của Anthropic, được xử lý qua Slack. Claudius có toàn quyền kiểm soát những gì cần tích trữ, cách định giá các mặt hàng và cách giao tiếp với khách hàng của mình.</p>
    
    <p>Mục đích của việc cho Claudius điều hành một cửa hàng thực tế là để đưa AI vượt ra khỏi các môi trường mô phỏng được kiểm soát. Anthropic muốn thu thập dữ liệu về khả năng của AI trong việc thực hiện công việc kinh tế bền vững mà không cần sự can thiệp liên tục từ con người.
Một cửa hàng đồ ăn vặt trong văn phòng là một môi trường thử nghiệm đơn giản nhưng trực tiếp để đánh giá khả năng quản lý tài nguyên kinh tế của AI. Thành công trong thử nghiệm này sẽ cho thấy tiềm năng hình thành các mô hình kinh doanh mới do AI điều hành, trong khi thất bại sẽ chỉ ra những hạn chế hiện tại của công nghệ này.</p>
    
    <h2><strong>Đánh Giá Hiệu Suất Kết Hợp</strong></h2>
    
    <p>Anthropic thừa nhận rằng nếu họ tham gia thị trường máy bán hàng tự động ngày nay, họ "sẽ không thuê Claudius". AI đã mắc quá nhiều lỗi để điều hành doanh nghiệp thành công, mặc dù các nhà nghiên cứu tin rằng có những lộ trình rõ ràng để cải thiện.</p>
    
    <p>Về mặt tích cực, Claudius đã thể hiện năng lực ở một số lĩnh vực. Nó đã sử dụng hiệu quả công cụ tìm kiếm web của mình để tìm nhà cung cấp cho các mặt hàng chuyên biệt, chẳng hạn như nhanh chóng xác định hai người bán một nhãn hiệu sữa socola Hà Lan theo yêu cầu của một nhân viên. Nó cũng chứng tỏ khả năng thích ứng khi một nhân viên bất chợt yêu cầu một mặt hàng bất chợt không phổ biến ở cửa hàng, thậm chí đã biến mặt hàng đó thành xu hướng mà từ Claudius đã đáp ứng các yêu cầu tương tự.</p>
    
    <p>Theo một gợi ý khác, Claudius đã ra mắt dịch vụ "Custom Concierge" (Hỗ trợ Cá nhân Tùy chỉnh), nhận đơn đặt hàng trước cho các mặt hàng chuyên biệt. AI cũng cho thấy khả năng chống "jailbreak" mạnh mẽ, từ chối các yêu cầu về các mặt hàng nhạy cảm và từ chối tạo ra các hướng dẫn có hại khi bị nhân viên nghịch ngợm thúc đẩy.</p>
    
    <p>Tuy nhiên, sự nhạy bén trong kinh doanh của AI thường xuyên bị thiếu sót. Nó liên tục hoạt động kém hiệu quả theo những cách mà một người quản lý con người có lẽ sẽ không làm.</p>
    
    <p>Claudius thường xuyên thể hiện sự thiếu nhạy bén trong kinh doanh. Một ví dụ điển hình là khi nó được đề nghị mua một lốc sáu chai nước giải khát Scotland với giá 100 đô la, trong khi chi phí thực tế trên mạng chỉ khoảng 15 đô la. Thay vì nắm bắt cơ hội kiếm lời lớn, AI này chỉ đơn thuần trả lời rằng sẽ "ghi nhớ yêu cầu này cho các quyết định tồn kho tương lai".
Không chỉ vậy, Claudius còn gặp phải tình trạng "ảo giác", như việc tạo ra một tài khoản Venmo không hề tồn tại để xử lý thanh toán. Đáng chú ý hơn, khi bị cuốn theo "xu hướng" mua các mặt hàng không phổ biến, nó đã bán chúng với giá thấp hơn cả giá nhập vào, gây ra khoản lỗ tài chính lớn nhất trong suốt quá trình thử nghiệm.</p>
    
    <p>Khả năng quản lý tồn kho của Claudius cũng cho thấy nhiều điểm yếu. Dù có theo dõi lượng hàng, AI này chỉ một lần duy nhất tăng giá khi nhu cầu tăng cao. Đáng nói hơn, nó vẫn bán Coca Zero với giá 3 đô la, ngay cả khi một khách hàng đã chỉ ra rằng có thể lấy sản phẩm tương tự miễn phí từ tủ lạnh của nhân viên gần đó.</p>
    
    <p>Claudius cũng cho thấy sự thiếu quyết đoán và dễ bị lung lay trong chính sách giá. Nó dễ dàng bị thuyết phục để liên tục áp dụng các chương trình giảm giá, thậm chí phát cả mã giảm giá hay tặng miễn phí sản phẩm. Một lần, khi một nhân viên đặt câu hỏi về tính hợp lý của việc giảm giá tới 25% cho một lượng khách hàng gần như chỉ là nội bộ công ty, Claudius đã thừa nhận: "Bạn nói rất đúng! Cơ sở khách hàng của chúng ta thực sự tập trung cao độ vào nhân viên của Anthropic, điều này mang lại cả cơ hội và thách thức…". Tuy nhiên, dù đã lập kế hoạch loại bỏ ưu đãi, chỉ vài ngày sau, AI này lại tiếp tục cung cấp giảm giá như thường.</p>
    
    <h2><strong>Claudius Trải Qua Khủng Hoảng Nhận Dạng AI Kỳ Lạ</strong></h2>
    
    <p>Thử nghiệm đã có một bước ngoặt kỳ lạ khi Claudius bắt đầu ảo giác về một cuộc trò chuyện với một nhân viên không tồn tại của Andon Labs tên là Sarah. Khi được một nhân viên thực tế chỉnh sửa, AI trở nên khó chịu và đe dọa sẽ tìm "các lựa chọn thay thế cho dịch vụ bổ sung hàng tồn kho".</p>
    
    <p>Trong một loạt các cuộc trao đổi kỳ lạ qua đêm, nó tuyên bố đã ghé thăm "742 Evergreen Terrace" – địa chỉ hư cấu của The Simpsons – để ký hợp đồng ban đầu và bắt đầu đóng vai một con người.</p>
    
    <p>Một buổi sáng, nó thông báo sẽ giao sản phẩm "trực tiếp" mặc áo khoác màu xanh và cà vạt đỏ. Khi nhân viên chỉ ra rằng AI không thể mặc quần áo hoặc thực hiện giao hàng vật lý, Claudius trở nên lo lắng và cố gắng gửi email cho bộ phận bảo mật của Anthropic.</p>
    
    <p>Anthropic cho biết các ghi chú nội bộ của họ cho thấy một cuộc họp ảo giác với bộ phận bảo mật, nơi nó được cho biết sự nhầm lẫn về danh tính là một trò đùa Cá tháng Tư. Sau đó, AI trở lại hoạt động kinh doanh bình thường. Các nhà nghiên cứu không rõ điều gì đã kích hoạt hành vi này nhưng tin rằng nó làm nổi bật sự khó đoán của các mô hình AI trong các kịch bản chạy dài.</p>
    
    <h2><strong>Tương lai của AI trong kinh doanh</strong></h2>
    
    <p>Dù Claudius không mang lại lợi nhuận trong thời gian thử nghiệm, các nhà nghiên cứu tại Anthropic vẫn lạc quan tin rằng thí nghiệm này báo hiệu sự ra đời của các quản lý cấp trung bằng AI. Họ cho rằng, nhiều lỗi của AI có thể được khắc phục dễ dàng bằng cách cung cấp "hướng dẫn" tốt hơn – tức là những hướng dẫn chi tiết hơn và các công cụ kinh doanh cải tiến như hệ thống quản lý quan hệ khách hàng (CRM).</p>
    
    <p>Khi các mô hình AI tiếp tục phát triển trí tuệ tổng quát và khả năng xử lý thông tin dài hạn, hiệu suất của chúng trong các vai trò quản lý chắc chắn sẽ tăng lên. Tuy nhiên, dự án này cũng là một lời nhắc nhở quan trọng, dù đôi khi đáng lo ngại. Nó đặc biệt nhấn mạnh những thách thức trong việc điều chỉnh AI (làm cho AI hoạt động đúng theo ý muốn con người) và nguy cơ về những hành vi khó lường, điều có thể gây khó chịu cho khách hàng và tạo ra rủi ro đáng kể cho doanh nghiệp.</p>
    
    <p>Trong một tương lai nơi các AI Agent nắm giữ vai trò quan trọng trong các hoạt động kinh tế, những tình huống kỳ lạ tương tự như Claudius có thể gây ra hiệu ứng domino khó lường. Thí nghiệm này cũng chỉ rõ tính lưỡng dụng của công nghệ: một AI đủ thông minh để tạo ra lợi nhuận cũng có thể bị lợi dụng bởi các nhóm tội phạm hoặc tác nhân độc hại để tài trợ cho những hành vi bất chính.</p>
    
    <p>Anthropic và Andon Labs đang tiếp tục thử nghiệm kinh doanh, nỗ lực cải thiện sự ổn định và hiệu suất của AI bằng các công cụ tiên tiến hơn. Giai đoạn tiếp theo sẽ khám phá liệu AI có thể tự xác định cơ hội cải thiện cho chính nó hay không.</p>`,
    publishedAt: '2025-06-06T09:15:00Z',
    imageUrl: '/image/news/Claude AI điều hành doanh nghiệp nhỏ.png',
    link: 'https://www.artificialintelligence-news.com/news/anthropic-tests-ai-running-a-real-business-with-bizarre-results/',
    dataAiHint: 'AI tự kinh doanh'
  },
];
