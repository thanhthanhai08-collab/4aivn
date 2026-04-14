// src/app/cookie-policy/page.tsx
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from 'react';

export default function CookiePolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('vi-VN'));
  }, []);

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
              Lần cập nhật cuối: {lastUpdated}
            </p>

            <h2>1. Cookie là gì?</h2>
            <p>
              Cookie là các tệp văn bản nhỏ được đặt trên thiết bị của bạn bởi các trang web mà bạn truy cập. Chúng được sử dụng rộng rãi để làm cho các trang web hoạt động, hoặc hoạt động hiệu quả hơn, cũng như để cung cấp thông tin cho chủ sở hữu trang web.
            </p>

            <h2>2. Chúng tôi sử dụng cookie như thế nào?</h2>
            <p>
              Chúng tôi sử dụng cookie để hiểu cách bạn sử dụng trang web của chúng tôi và để cải thiện trải nghiệm của bạn. Điều này bao gồm việc cá nhân hóa nội dung và quảng cáo. Chúng tôi sử dụng các loại cookie sau:
            </p>
            <ul>
              <li><strong>Cookie cần thiết:</strong> Những cookie này là cần thiết để trang web hoạt động và không thể tắt trong hệ thống của chúng tôi.</li>
              <li><strong>Cookie hiệu suất:</strong> Những cookie này cho phép chúng tôi đếm các lượt truy cập và nguồn lưu lượng truy cập để chúng tôi có thể đo lường và cải thiện hiệu suất của trang web của mình.</li>
              <li><strong>Cookie chức năng:</strong> Những cookie này cho phép trang web cung cấp chức năng và cá nhân hóa nâng cao.</li>
                 <li><strong>Cookie của bên thứ ba:</strong> Chúng tôi cũng có thể sử dụng các cookie của bên thứ ba từ các dịch vụ như Google Analytics để giúp chúng tôi phân tích việc sử dụng trang web.</li>
            </ul>

            <h2>3. Quản lý cookie của bạn</h2>
            <p>
              Hầu hết các trình duyệt web cho phép một số kiểm soát hầu hết các cookie thông qua cài đặt trình duyệt. Để tìm hiểu thêm về cookie, bao gồm cách xem cookie nào đã được đặt, hãy truy cập www.aboutcookies.org hoặc www.allaboutcookies.org.
            </p>

            <h2>4. Thay đổi Chính sách Cookie của chúng tôi</h2>
            <p>
              Chúng tôi có thể cập nhật Chính sách Cookie của mình theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính sách Cookie mới trên trang này.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
