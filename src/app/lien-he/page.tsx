
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ | 4AIVN',
  description: 'Liên hệ với đội ngũ 4AIVN để được hỗ trợ, hợp tác hoặc đóng góp ý kiến. Chúng tôi luôn sẵn sàng lắng nghe bạn.',
};

export default function ContactPage() {
  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline">
              Liên hệ với chúng tôi
            </CardTitle>
            <p className="text-muted-foreground pt-2">
              Chúng tôi luôn sẵn lòng lắng nghe từ bạn. Vui lòng sử dụng thông tin dưới đây để kết nối.
            </p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground leading-relaxed space-y-8 pt-6">
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl mt-0">Email</h3>
                <p className="mt-1">Đối với các yêu cầu chung, hợp tác hoặc hỗ trợ, vui lòng gửi email cho chúng tôi.</p>
                <a href="mailto:4aivn@gmail.com" className="font-semibold text-primary break-all">4aivn@gmail.com</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl mt-0">Điện thoại</h3>
                <p className="mt-1">Để được hỗ trợ nhanh chóng trong giờ hành chính (9:00 - 17:00, T2-T6).</p>
                <a href="tel:0973490497" className="font-semibold text-primary">0973.490.497</a>
              </div>
            </div>
            <div className="text-center border-t pt-8">
               <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl mt-0">Địa chỉ</h3>
                <p className="mt-1">Văn phòng của chúng tôi (Vui lòng liên hệ trước khi đến).</p>
                <p className="font-semibold">TP. Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
