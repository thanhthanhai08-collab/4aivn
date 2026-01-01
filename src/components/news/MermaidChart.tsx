// src/components/news/MermaidChart.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent } from '../ui/card';
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
      // Keep console.error for development debugging, but won't show in UI
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

          const formattedChart = chart
            .replace(/;/g, '\n');

          const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
          
          const { svg } = await mermaid.render(id, formattedChart);
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (e: any) {
          // Keep console.error for development debugging
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
      <CardContent className="overflow-x-auto min-h-[200px] flex flex-col justify-center pt-6">
        {!isReady && <Skeleton className="h-48 w-full" />}
        
        {isReady && error && (
          <div className="text-destructive text-sm text-center">
            Không thể hiển thị sơ đồ. Vui lòng kiểm tra lại mã Mermaid.
          </div>
        )}
        
        <div 
          ref={containerRef} 
          className="mermaid-container flex justify-center w-full transition-all duration-300"
        />
        
      </CardContent>
    </Card>
  );
};

export default MermaidChart;