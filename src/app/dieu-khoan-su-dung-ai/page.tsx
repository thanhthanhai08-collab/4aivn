// src/app/ai-terms-of-use/page.tsx
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiTermsOfUsePage() {
  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-center">
              Điều khoản sử dụng AI
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground leading-relaxed">
            <p className="text-muted-foreground text-center">
              Lần cập nhật cuối: {new Date().toLocaleDateString('vi-VN')}
            </p>

            <h2>1. Chấp nhận Điều khoản</h2>
            <p>
              Bằng cách sử dụng các tính năng Trí tuệ Nhân tạo (AI) trên Clean AI Hub ("Dịch vụ"), bạn đồng ý tuân thủ các Điều khoản Sử dụng AI này. Các điều khoản này bổ sung cho Điều khoản Dịch vụ chung của chúng tôi.
            </p>

            <h2>2. Sử dụng Hợp lý</h2>
            <p>
              Các tính năng AI của chúng tôi được cung cấp để hỗ trợ và nâng cao trải nghiệm của bạn. Bạn đồng ý không sử dụng các tính năng này cho bất kỳ mục đích nào sau đây:
            </p>
            <ul>
              <li>Tạo ra nội dung bất hợp pháp, có hại, đe dọa, lạm dụng, quấy rối, hoặc xúc phạm.</li>
              <li>Mạo danh bất kỳ cá nhân hoặc tổ chức nào.</li>
              <li>Tạo ra thông tin sai lệch hoặc gây hiểu lầm một cách cố ý.</li>
              <li>Vi phạm quyền sở hữu trí tuệ của người khác.</li>
              <li>Cố gắng khai thác, phá vỡ hoặc vượt qua các biện pháp an toàn của các mô hình AI.</li>
            </ul>

            <h2>3. Nội dung do AI tạo ra</h2>
            <p>
              Mặc dù chúng tôi cố gắng đảm bảo tính chính xác và hữu ích của nội dung do AI tạo ra, chúng tôi không thể đảm bảo rằng nó sẽ luôn hoàn hảo hoặc không có lỗi. Bạn có trách nhiệm xem xét và xác minh mọi thông tin do AI cung cấp trước khi dựa vào nó cho các quyết định quan trọng. Clean AI Hub không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào phát sinh từ việc bạn sử dụng nội dung do AI tạo ra.
            </p>
            
            <h2>4. Quyền sở hữu và Giấy phép</h2>
            <p>
              Bạn giữ quyền sở hữu đối với các thông tin đầu vào (prompts) mà bạn cung cấp cho các dịch vụ AI. Bằng cách cung cấp đầu vào, bạn cấp cho chúng tôi một giấy phép không độc quyền, trên toàn thế giới, miễn phí bản quyền để sử dụng, sao chép, và xử lý đầu vào đó nhằm mục đích cung cấp và cải thiện Dịch vụ.
            </p>

            <h2>5. Sửa đổi và Chấm dứt</h2>
            <p>
              Chúng tôi có quyền sửa đổi hoặc chấm dứt quyền truy cập của bạn vào các tính năng AI bất kỳ lúc nào, có hoặc không có thông báo trước, nếu chúng tôi tin rằng bạn đã vi phạm các điều khoản này.
            </p>

            <h2>6. Liên hệ với chúng tôi</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản Sử dụng AI này, vui lòng liên hệ với chúng tôi tại: info@cleanai.vn.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
