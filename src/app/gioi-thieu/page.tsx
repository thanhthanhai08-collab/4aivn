
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Target, Eye } from 'lucide-react';


export const metadata: Metadata = {
  title: 'Giới thiệu về 4AIVN | Trung tâm AI Việt Nam',
  description: 'Tìm hiểu về 4AIVN - Sứ mệnh, tầm nhìn và đội ngũ đằng sau nền tảng khám phá và xếp hạng công cụ AI hàng đầu tại Việt Nam.',
};

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline">
              Về chúng tôi
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground leading-relaxed space-y-6">
            <p className="text-center text-xl text-muted-foreground">
              <strong>4AIVN</strong> là nguồn thông tin hàng đầu của bạn về những đột phá, xu hướng và phân tích chuyên sâu trong lĩnh vực Trí Tuệ Nhân Tạo tại Việt Nam và thế giới.
            </p>

            <div className="grid md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Target className="h-10 w-10 text-primary" />
                        <h2 className="text-2xl font-headline mt-0 mb-0">Sứ mệnh</h2>
                    </div>
                    <p>Sứ mệnh của chúng tôi là dân chủ hóa kiến thức về AI, giúp mọi người từ sinh viên, nhà phát triển đến các nhà quản lý doanh nghiệp có thể dễ dàng tiếp cận, hiểu và ứng dụng công nghệ AI vào công việc và cuộc sống hàng ngày.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Eye className="h-10 w-10 text-primary" />
                        <h2 className="text-2xl font-headline mt-0 mb-0">Tầm nhìn</h2>
                    </div>
                    <p>Chúng tôi hướng tới việc trở thành cộng đồng và nền tảng AI uy tín nhất tại Việt Nam, nơi mọi người có thể khám phá các công cụ AI mới nhất, cập nhật tin tức nóng hổi và tham gia vào các cuộc thảo luận sôi nổi về tương lai của công nghệ.</p>
                </div>
            </div>

            <div>
                <h2 className="text-center">Những gì chúng tôi cung cấp</h2>
                <ul>
                    <li><strong>Bảng xếp hạng AI:</strong> Đánh giá khách quan và chi tiết về các mô hình và công cụ AI hàng đầu thế giới.</li>
                    <li><strong>Tin tức AI:</strong> Cập nhật liên tục các tin tức, phân tích và xu hướng mới nhất trong ngành AI.</li>
                    <li><strong>Kho công cụ AI:</strong> Một danh sách tuyển chọn các công cụ AI hữu ích, được phân loại rõ ràng để bạn dễ dàng tìm kiếm.</li>
                    <li><strong>Chatbot thông minh:</strong> Một trợ lý ảo để bạn có thể hỏi đáp và khám phá thêm về thế giới AI.</li>
                </ul>
            </div>

            <div className="text-center pt-4">
                <p>Cảm ơn bạn đã ghé thăm 4AIVN. Hãy cùng chúng tôi khám phá tương lai của Trí tuệ Nhân tạo!</p>
                <p>Để liên hệ hợp tác hoặc đóng góp ý kiến, vui lòng truy cập trang <Link href="/lien-he">Liên hệ</Link> của chúng tôi.</p>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
