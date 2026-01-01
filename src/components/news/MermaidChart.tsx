// src/components/news/MermaidChart.tsx
"use client";

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false, // We'll render manually
  theme: 'forest', // A theme that might fit well, can be 'default', 'neutral', 'dark' etc.
  securityLevel: 'loose', // Important for rendering in modern frameworks
});

interface MermaidChartProps {
  chart: string;
}

const MermaidChart = ({ chart }: MermaidChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chart && containerRef.current) {
        // Clear previous render
        containerRef.current.innerHTML = '';
        
        mermaid.render('mermaid-graph', chart)
            .then(({ svg }) => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            })
            .catch(e => {
                console.error('Error rendering Mermaid chart:', e);
            });
    }
  }, [chart]);

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Sơ đồ minh họa</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="mermaid-container flex justify-center">
          {/* Mermaid SVG will be injected here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MermaidChart;
