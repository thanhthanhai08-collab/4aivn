// src/components/news/charts/DynamicChart.tsx
"use client";

import { adaptChartConfig } from "@/lib/chartAdapter";
import type { ChartConfig } from "@/components/news/charts/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { ChartBar } from "./ChartBar";
import { ChartLine } from "./ChartLine";
import { ChartRadar } from "./ChartRadar";
import { ChartPie } from "./ChartPie"; // Import mới

interface DynamicChartProps {
  config: any; // Nhận cấu hình thô từ Firestore
}

const chartComponents = {
  bar: ChartBar,
  line: ChartLine,
  radar: ChartRadar,
  pie: ChartPie, // Đã thêm pie
};

export function DynamicChart({ config: rawConfig }: DynamicChartProps) {
  if (!rawConfig) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  // Chuẩn hóa dữ liệu cấu hình
  const config = adaptChartConfig(rawConfig);
  const ChartComponent = chartComponents[config.type] || null;
  
  return (
    <Card className="my-8">
      <CardHeader>
        {config.title && <CardTitle>{config.title}</CardTitle>}
        {config.description && <CardDescription>{config.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {ChartComponent ? (
          <ChartComponent config={config} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[350px] text-destructive">
            <AlertCircle className="h-8 w-8 mb-2" />
            <p className="font-semibold">Loại biểu đồ không hợp lệ: '{config.type}'</p>
          </div>
        )}
      </CardContent>
      {config.source && (
        <p className="text-xs text-muted-foreground px-6 pb-4 text-center italic">Nguồn: {config.source}</p>
      )}
    </Card>
  );
}

    