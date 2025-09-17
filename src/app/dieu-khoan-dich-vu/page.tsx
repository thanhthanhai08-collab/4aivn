// src/app/terms-of-service/page.tsx
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-center">
              Điều khoản dịch vụ
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground leading-relaxed">
            <p className="text-muted-foreground text-center">
              Lần cập nhật cuối: {new Date().toLocaleDateString('vi-VN')}
            </p>

            <h2>1. Giới thiệu</h2>
            <p>
              Các Điều khoản dịch vụ này chi phối việc bạn sử dụng trang web của chúng tôi, 4AIVN. Bằng cách truy cập hoặc sử dụng dịch vụ, bạn đồng ý bị ràng buộc bởi các Điều khoản này.
            </p>

            <h2>2. Sử dụng dịch vụ</h2>
            <p>
              Bạn đồng ý sử dụng dịch vụ của chúng tôi chỉ cho các mục đích hợp pháp và theo cách không vi phạm quyền của, hạn chế hoặc ức chế việc sử dụng và hưởng thụ dịch vụ của bất kỳ ai khác. Hành vi bị cấm bao gồm quấy rối hoặc gây phiền toái hoặc bất tiện cho bất kỳ người dùng nào khác, truyền tải nội dung tục tĩu hoặc xúc phạm hoặc làm gián đoạn luồng đối thoại thông thường trong dịch vụ.
            </p>

            <h2>3. Tài khoản Người dùng</h2>
            <p>
              Để truy cập một số tính năng của trang web, bạn có thể được yêu cầu tạo một tài khoản. Bạn có trách nhiệm bảo mật thông tin tài khoản của mình, bao gồm cả mật khẩu và cho tất cả các hoạt động xảy ra trong tài khoản của bạn. Bạn đồng ý thông báo cho chúng tôi ngay lập tức về bất kỳ hành vi sử dụng trái phép tài khoản của bạn.
            </p>

            <h2>4. Chấm dứt</h2>
            <p>
              Chúng tôi có thể chấm dứt hoặc đình chỉ quyền truy cập của bạn vào dịch vụ của chúng tôi ngay lập tức, không cần thông báo trước hoặc chịu trách nhiệm pháp lý, vì bất kỳ lý do gì, bao gồm nhưng không giới hạn nếu bạn vi phạm các Điều khoản.
            </p>

            <h2>5. Giới hạn Trách nhiệm</h2>
            <p>
              Trong mọi trường hợp, 4AIVN, cũng như giám đốc, nhân viên, đối tác, đại lý, nhà cung cấp hoặc chi nhánh của nó, sẽ không chịu trách nhiệm pháp lý cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, do hậu quả hoặc trừng phạt nào, bao gồm nhưng không giới hạn, mất lợi nhuận, dữ liệu, việc sử dụng, thiện chí hoặc các tổn thất vô hình khác.
            </p>

            <h2>6. Liên hệ với chúng tôi</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ với chúng tôi tại: info@4aivn.vn.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
