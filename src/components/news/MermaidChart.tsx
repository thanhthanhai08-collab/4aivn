// src/components/news/MermaidChart.tsx
"use client";

import { useEffect, useRef, useId, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';

interface MermaidChartProps {
  chart: string;
}

declare global {
  interface Window {
    mermaid?: any;
  }
}

const MermaidChart = ({ chart }: MermaidChartProps) => {
  const chartId = `mermaid-graph-${useId()}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!chart || !containerRef.current) {
        setIsLoading(false);
        setError("Không có mã sơ đồ để hiển thị.");
        return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const renderChart = () => {
      try {
        if (window.mermaid && isMounted) {
          window.mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            securityLevel: 'loose',
          });

          window.mermaid.render(chartId, chart, (svg: string) => {
            if (containerRef.current && isMounted) {
              containerRef.current.innerHTML = svg;
            }
          });
        }
      } catch (e: any) {
        console.error('Mermaid render error:', e.message || e);
        if (isMounted) {
          setError(e.message || 'Lỗi cú pháp trong mã sơ đồ.');
        }
      } finally {
        if (isMounted) {
            setIsLoading(false);
        }
      }
    };

    if (window.mermaid) {
      renderChart();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      script.onload = () => {
        renderChart();
      };
      script.onerror = () => {
        if (isMounted) {
          setError("Không thể tải thư viện sơ đồ Mermaid.");
          setIsLoading(false);
        }
      };
      document.body.appendChild(script);

      return () => {
        // Cleanup script if component unmounts before it loads
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
      }
    }
    
    return () => {
      isMounted = false;
    };
  }, [chart, chartId]);

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Sơ đồ minh họa</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading && <Skeleton className="h-48 w-full" />}
        {error && !isLoading && (
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
          key={chart} 
        >
          {/* Mermaid SVG will be injected here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MermaidChart;
