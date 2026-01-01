// src/components/news/MermaidChart.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
// Import trực tiếp thay vì dùng CDN để tránh bị Tracking Prevention chặn
import mermaid from 'mermaid';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';

interface MermaidChartProps {
  chart: string;
}

const MermaidChart = ({ chart }: MermaidChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // State để kiểm tra xem component đã "mount" vào trình duyệt chưa
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Chỉ khởi tạo Mermaid ở phía Client
    try {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral', // Sử dụng theme neutral dễ đọc hơn
            securityLevel: 'loose',
        });
    } catch (e) {
        console.error("Failed to initialize Mermaid:", e);
        setError("Không thể khởi tạo thư viện Mermaid.");
    }
    // Đánh dấu là component đã sẵn sàng ở client
    setIsReady(true);
  }, []);

  useEffect(() => {
    // 2. Chỉ render khi đã sẵn sàng, có dữ liệu và có container
    if (isReady && chart && containerRef.current) {
      const renderChart = async () => {
        try {
          setError(null);
          // Xóa sạch nội dung cũ để tránh lỗi render đè
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
          
          // Tạo ID ngẫu nhiên mỗi lần render để tránh lỗi 'createElementNS'
          const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
          
          const { svg } = await mermaid.render(id, chart);
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (e: any) {
          console.error("Mermaid Render Error:", e.message || e);
          setError(e.message || "Lỗi cú pháp trong mã sơ đồ.");
        }
      };

      // Đưa vào hàng đợi xử lý để đảm bảo DOM đã ổn định
      const timeoutId = setTimeout(renderChart, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [isReady, chart]);


  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Sơ đồ minh họa</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {!isReady && <Skeleton className="h-48 w-full" />}
        {isReady && error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Không thể hiển thị sơ đồ</AlertTitle>
            <AlertDescription>
              Đã xảy ra lỗi khi vẽ sơ đồ. Vui lòng kiểm tra lại mã Mermaid.
              <pre className="mt-2 text-xs bg-muted p-2 rounded whitespace-pre-wrap">
                {error}
              </pre>
            </AlertDescription>
          </Alert>
        )}
        <div 
          ref={containerRef} 
          className="mermaid-container flex justify-center min-h-[100px]"
          key={chart} // Key thay đổi sẽ giúp React re-mount component khi chart thay đổi
        >
          {/* Mermaid SVG sẽ được chèn vào đây */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MermaidChart;
