
import { AppLayout } from "@/components/layout/app-layout";
import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Target, ShieldCheck, Newspaper, Cpu, Wrench, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Giới thiệu về 4AIVN | Trung tâm AI Việt Nam',
  description: 'Tìm hiểu về 4AIVN - Sứ mệnh, tầm nhìn và đội ngũ đằng sau nền tảng khám phá và xếp hạng công cụ AI hàng đầu tại Việt Nam.',
};

export default function AboutPage() {
  const services = [
    {
      title: "Tin tức AI cập nhật",
      description: "Cung cấp những thông tin mới nhất về thị trường trí tuệ nhân tạo, các thương vụ công nghệ và xu hướng tương lai.",
      icon: <Newspaper size={32} className="text-blue-600" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/50"
    },
    {
      title: "Đánh giá Model AI",
      description: "Phân tích chuyên sâu các mô hình ngôn ngữ lớn (LLM), thị giác máy tính và các kiến trúc AI mới nhất.",
      icon: <Cpu size={32} className="text-indigo-600" />,
      bgColor: "bg-indigo-100 dark:bg-indigo-900/50"
    },
    {
      title: "Thư viện Công cụ",
      description: "Tổng hợp và phân loại các công cụ AI hỗ trợ công việc, từ thiết kế, lập trình đến sáng tạo nội dung.",
      icon: <Wrench size={32} className="text-purple-600" />,
      bgColor: "bg-purple-100 dark:bg-purple-900/50"
    },
    {
      title: "Hướng dẫn & Tip",
      description: "Chia sẻ các kỹ thuật Prompt Engineering và cách ứng dụng AI vào quy trình làm việc thực tế.",
      icon: <Lightbulb size={32} className="text-amber-600" />,
      bgColor: "bg-amber-100 dark:bg-amber-900/50"
    }
  ];

  return (
    <AppLayout>
      <div className="bg-background text-foreground animate-in fade-in duration-700">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50 to-background dark:from-slate-900/50 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              Về Chúng Tôi
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cổng thông tin hàng đầu về trí tuệ nhân tạo, giúp bạn cập nhật những xu hướng, 
              công cụ và ứng dụng AI mới nhất trên toàn thế giới.
            </p>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 dark:bg-blue-900/50 dark:text-blue-300">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Sứ mệnh</h3>
              <p className="text-muted-foreground leading-relaxed">
                Phổ cập kiến thức AI đến mọi người, giúp cá nhân và doanh nghiệp tối ưu hóa hiệu suất làm việc thông qua trí tuệ nhân tạo.
              </p>
            </div>
            <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 dark:bg-indigo-900/50 dark:text-indigo-300">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Cộng đồng</h3>
              <p className="text-muted-foreground leading-relaxed">
                Xây dựng mạng lưới những người yêu công nghệ, nơi chia sẻ kinh nghiệm và những phát kiến mới nhất về mô hình AI.
              </p>
            </div>
            <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 dark:bg-purple-900/50 dark:text-purple-300">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Uy tín</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cung cấp những đánh giá khách quan, trung thực về các công cụ AI, giúp người dùng đưa ra lựa chọn đúng đắn nhất.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Những gì chúng tôi cung cấp</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm bg-background">
          <p>Để liên hệ hợp tác hoặc đóng góp ý kiến, vui lòng truy cập trang <Link href="/lien-he" className="text-primary hover:underline font-medium">Liên hệ</Link> của chúng tôi.</p>
        </section>
      </div>
    </AppLayout>
  );
}
