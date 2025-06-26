
// src/app/privacy-policy/page.tsx
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-center">
              Chính sách Quyền riêng tư
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground leading-relaxed">
            <p className="text-muted-foreground text-center">
              Lần cập nhật cuối: {new Date().toLocaleDateString('vi-VN')}
            </p>

            <h2>1. Giới thiệu</h2>
            <p>
              Chào mừng bạn đến với Clean AI Hub. Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách Quyền riêng tư này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập trang web của chúng tôi.
            </p>

            <h2>2. Thu thập thông tin</h2>
            <p>
              Chúng tôi có thể thu thập thông tin về bạn theo nhiều cách khác nhau. Thông tin chúng tôi có thể thu thập trên Trang web bao gồm:
            </p>
            <ul>
              <li>
                <strong>Dữ liệu cá nhân:</strong> Thông tin nhận dạng cá nhân, chẳng hạn như tên, địa chỉ email của bạn, mà bạn tự nguyện cung cấp cho chúng tôi khi đăng ký với Trang web hoặc khi bạn chọn tham gia vào các hoạt động khác nhau liên quan đến Trang web, chẳng hạn như trò chuyện trực tuyến và bảng tin.
              </li>
              <li>
                <strong>Dữ liệu phái sinh:</strong> Thông tin mà máy chủ của chúng tôi tự động thu thập khi bạn truy cập Trang web, chẳng hạn như địa chỉ IP, loại trình duyệt, hệ điều hành, thời gian truy cập và các trang bạn đã xem trực tiếp trước và sau khi truy cập Trang web.
              </li>
            </ul>

            <h2>3. Sử dụng thông tin của bạn</h2>
            <p>
              Có thông tin chính xác về bạn cho phép chúng tôi cung cấp cho bạn trải nghiệm mượt mà, hiệu quả và tùy chỉnh. Cụ thể, chúng tôi có thể sử dụng thông tin thu thập được về bạn qua Trang web để:
            </p>
            <ul>
              <li>Tạo và quản lý tài khoản của bạn.</li>
              <li>Gửi email cho bạn về tài khoản hoặc đơn đặt hàng của bạn.</li>
              <li>Cho phép giao tiếp giữa người dùng với người dùng.</li>
              <li>Tăng hiệu quả và hoạt động của Trang web.</li>
              <li>Theo dõi và phân tích việc sử dụng và xu hướng để cải thiện trải nghiệm của bạn với Trang web.</li>
            </ul>

            <h2>4. Tiết lộ thông tin của bạn</h2>
            <p>
              Chúng tôi có thể chia sẻ thông tin chúng tôi đã thu thập về bạn trong một số tình huống nhất định. Thông tin của bạn có thể được tiết lộ như sau:
            </p>
            <ul>
                <li>
                    <strong>Theo Luật pháp hoặc để Bảo vệ Quyền lợi:</strong> Nếu chúng tôi tin rằng việc tiết lộ thông tin về bạn là cần thiết để đáp ứng quy trình pháp lý, để điều tra hoặc khắc phục các vi phạm tiềm ẩn đối với chính sách của chúng tôi, hoặc để bảo vệ quyền, tài sản và sự an toàn của người khác, chúng tôi có thể chia sẻ thông tin của bạn theo yêu cầu hoặc được cho phép bởi bất kỳ luật hoặc quy định hiện hành nào.
                </li>
            </ul>

            <h2>5. Bảo mật thông tin của bạn</h2>
            <p>
              Chúng tôi sử dụng các biện pháp bảo mật hành chính, kỹ thuật và vật lý để giúp bảo vệ thông tin cá nhân của bạn. Mặc dù chúng tôi đã thực hiện các bước hợp lý để bảo mật thông tin cá nhân bạn cung cấp cho chúng tôi, xin lưu ý rằng bất chấp những nỗ lực của chúng tôi, không có biện pháp bảo mật nào là hoàn hảo hoặc không thể xuyên thủng, và không có phương pháp truyền dữ liệu nào có thể được đảm bảo chống lại bất kỳ sự chặn hoặc loại lạm dụng nào khác.
            </p>

            <h2>6. Liên hệ với chúng tôi</h2>
            <p>
              Nếu bạn có câu hỏi hoặc nhận xét về Chính sách Quyền riêng tư này, vui lòng liên hệ với chúng tôi tại: info@cleanai.vn.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
