// src/app/cookie-policy/page.tsx
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiePolicyPage() {
  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-center">
              Chính sách Cookie
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground leading-relaxed">
            <p className="text-muted-foreground text-center">
              Lần cập nhật cuối: {new Date().toLocaleDateString('vi-VN')}
            </p>

            <h2>1. Cookie là gì?</h2>
            <p>
              Cookie là các tệp văn bản nhỏ được đặt trên máy tính của bạn bởi các trang web bạn truy cập. Chúng được sử dụng rộng rãi để làm cho các trang web hoạt động, hoặc hoạt động hiệu quả hơn, cũng như để cung cấp thông tin cho chủ sở hữu trang web.
            </p>

            <h2>2. Chúng tôi sử dụng cookie như thế nào?</h2>
            <p>
              Chúng tôi sử dụng cookie để nâng cao trải nghiệm duyệt web của bạn bằng cách:
            </p>
            <ul>
              <li>Ghi nhớ các cài đặt của bạn, vì vậy bạn không cần phải nhập lại chúng mỗi khi truy cập.</li>
              <li>Ghi nhớ thông tin bạn đã cung cấp (ví dụ: tên người dùng của bạn) để bạn không cần nhập lại.</li>
              <li>Đo lường cách bạn sử dụng trang web để chúng tôi có thể cải thiện nó nhằm đáp ứng nhu cầu của bạn.</li>
              <li>Phân tích lưu lượng truy cập để đảm bảo trang web có thể xử lý lượng khách truy cập.</li>
            </ul>

            <h2>3. Các loại cookie chúng tôi sử dụng</h2>
            <ul>
                <li><strong>Cookie cần thiết:</strong> Những cookie này là cần thiết để bạn có thể di chuyển xung quanh trang web và sử dụng các tính năng của nó, chẳng hạn như truy cập vào các khu vực an toàn của trang web.</li>
                <li><strong>Cookie hiệu suất:</strong> Những cookie này thu thập thông tin về cách khách truy cập sử dụng một trang web, ví dụ như trang nào khách truy cập thường xuyên nhất. Chúng tôi sử dụng những cookie này để cải thiện cách trang web của chúng tôi hoạt động.</li>
                <li><strong>Cookie chức năng:</strong> Những cookie này cho phép trang web ghi nhớ các lựa chọn bạn thực hiện (chẳng hạn như tên người dùng, ngôn ngữ hoặc khu vực bạn đang ở) và cung cấp các tính năng nâng cao, cá nhân hơn.</li>
            </ul>

            <h2>4. Lựa chọn của bạn</h2>
            <p>
              Bạn có thể quản lý và/hoặc xóa cookie theo ý muốn – để biết chi tiết, hãy xem aboutcookies.org. Bạn có thể xóa tất cả các cookie đã có trên máy tính của mình và bạn có thể đặt hầu hết các trình duyệt để ngăn chúng được đặt. Tuy nhiên, nếu bạn làm điều này, bạn có thể phải tự điều chỉnh một số tùy chọn mỗi khi bạn truy cập một trang web và một số dịch vụ và chức năng có thể không hoạt động.
            </p>

            <h2>5. Liên hệ với chúng tôi</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về việc chúng tôi sử dụng cookie, vui lòng liên hệ với chúng tôi tại: info@cleanai.vn.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
