// src/components/news/MermaidChart.tsx
"use client";

import { useEffect, useRef, useId, useState } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';

// Initialize Mermaid on the client side
if (typeof window !== 'undefined') {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral', // Use a theme with better contrast
    securityLevel: 'loose',
  });
}

interface MermaidChartProps {
  chart: string;
}

const MermaidChart = ({ chart }: MermaidChartProps) => {
  const chartId = `mermaid-graph-${useId()}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chart && containerRef.current) {
      setIsLoading(true);
      setError(null);
      
      try {
        // Asynchronously render the chart
        mermaid.render(chartId, chart, (svg) => {
            if (containerRef.current) {
                containerRef.current.innerHTML = svg;
            }
            setIsLoading(false);
        });
      } catch (e: any) {
        console.error('Mermaid render error:', e.message || e);
        setError(e.message || 'Lỗi cú pháp trong mã sơ đồ.');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      if (!chart) {
        setError("Không có mã sơ đồ để hiển thị.");
      }
    }
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
          // The key forces React to re-mount the div when the chart content changes,
          // ensuring a clean state for Mermaid.
          key={chart} 
        >
          {/* Mermaid SVG will be injected here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MermaidChart;