// src/components/news/MermaidChart.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
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
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
      });
    } catch (e) {
      console.error("Failed to initialize Mermaid:", e);
      setError("Không thể khởi tạo thư viện Mermaid.");
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && chart && containerRef.current) {
      const renderChart = async () => {
        try {
          setError(null);
          
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }

          // AN TOÀN HƠN: Chỉ thay thế dấu ; bằng ký tự xuống dòng.
          // Cách này giữ lại tất cả các khoảng trắng và ký tự xuống dòng gốc,
          // đảm bảo cú pháp phức tạp của xychart không bị phá vỡ.
          const formattedChart = chart.replace(/;/g, '\n');

          console.log("Mã đã format để render:\n", formattedChart);

          const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
          
          const { svg } = await mermaid.render(id, formattedChart);
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (e: any) {
          console.error("Mermaid Render Error:", e.message || e);
          setError(e.message || "Lỗi cú pháp trong mã sơ đồ.");
        }
      };

      const timeoutId = setTimeout(renderChart, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [isReady, chart]);

  return (
    <Card className="my-8 shadow-md border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          📊 Sơ đồ minh họa
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto min-h-[200px] flex flex-col justify-center">
        {!isReady && <Skeleton className="h-48 w-full" />}
        
        {isReady && error && (
          <Alert variant="destructive" className="my-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Lỗi định dạng biểu đồ</AlertTitle>
            <AlertDescription>
              Mã sơ đồ không hợp lệ. Vui lòng kiểm tra lại cú pháp (đặc biệt là xychart).
              <pre className="mt-2 text-[10px] bg-black/10 p-2 rounded whitespace-pre-wrap font-mono">
                {error}
              </pre>
            </AlertDescription>
          </Alert>
        )}
        
        <div 
          ref={containerRef} 
          className="mermaid-container flex justify-center w-full transition-all duration-300"
        />
        
        {isReady && !error && (
          <p className="text-[10px] text-muted-foreground text-center mt-4 italic">
            * Kéo sang ngang nếu sơ đồ bị tràn khung
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MermaidChart;
