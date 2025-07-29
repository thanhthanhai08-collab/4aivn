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

            <h2>1. Thu thập thông tin</h2>
            <p>
              Chúng tôi thu thập thông tin từ bạn khi bạn đăng ký trên trang web của chúng tôi, đăng nhập vào tài khoản của bạn, và/hoặc khi bạn đăng xuất. Thông tin được thu thập bao gồm tên, địa chỉ email, và trong một số trường hợp, ảnh đại diện của bạn.
            </p>

            <h2>2. Sử dụng thông tin</h2>
            <p>
              Bất kỳ thông tin nào chúng tôi thu thập từ bạn có thể được sử dụng để:
            </p>
            <ul>
              <li>Cá nhân hóa trải nghiệm của bạn và đáp ứng nhu cầu cá nhân của bạn.</li>
              <li>Cải thiện trang web của chúng tôi.</li>
              <li>Cải thiện dịch vụ khách hàng và nhu cầu hỗ trợ của bạn.</li>
              <li>Liên hệ với bạn qua email.</li>
            </ul>

            <h2>3. Bảo mật thông tin</h2>
            <p>
              Chúng tôi thực hiện nhiều biện pháp bảo mật để duy trì sự an toàn cho thông tin cá nhân của bạn. Chúng tôi sử dụng mã hóa tiên tiến để bảo vệ thông tin nhạy cảm được truyền trực tuyến.
            </p>

            <h2>4. Tiết lộ cho bên thứ ba</h2>
            <p>
              Chúng tôi không bán, trao đổi, hoặc chuyển giao thông tin cá nhân của bạn cho các bên bên ngoài. Điều này không bao gồm các bên thứ ba đáng tin cậy giúp chúng tôi vận hành trang web của mình hoặc tiến hành kinh doanh của chúng tôi, miễn là các bên đó đồng ý giữ bí mật thông tin này.
            </p>

             <h2>5. Liên hệ với chúng tôi</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về Chính sách Quyền riêng tư này, vui lòng liên hệ với chúng tôi tại: info@cleanai.vn.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
