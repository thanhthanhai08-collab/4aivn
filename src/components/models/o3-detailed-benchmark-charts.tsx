// src/components/models/o3-detailed-benchmark-charts.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import type { AIModel, BenchmarkData } from "@/lib/types";
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Define benchmark categories to display
const BENCHMARK_CATEGORIES = [
  { key: 'aime', title: 'Toán học', subtitle: 'AIME 2025' },
  { key: 'livecode', title: 'Khả năng code', subtitle: 'LiveCodeBench' },
  { key: 'mmlu', title: 'Kiến thức tổng hợp', subtitle: 'MMLU-Pro' },
  { key: 'ifbench', title: 'Khả năng tuân thủ prompt', subtitle: 'IFBench' },
  { key: 'gpqa', title: 'Lý luận nâng cao', subtitle: 'GPQA' },
  { key: 'aa-lcr', title: 'Lý luận ngữ cảnh dài', subtitle: 'AA-LCR' },
];

interface BenchmarkChartProps {
    title: string;
    subtitle: string;
    data: { model: AIModel; score: number; isCurrent?: boolean }[];
}

const BenchmarkChart = ({ title, subtitle, data }: BenchmarkChartProps) => {
    // Sort data by score in descending order for correct visualization
    const sortedData = [...data].sort((a, b) => b.score - a.score);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4">
                    {sortedData.map(({ model, score, isCurrent }) => {
                        return (
                            <div key={model.id} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Image src={model.logoUrl} alt={`${model.name} logo`} width={16} height={16} className="rounded-full" />
                                        <span className={cn("truncate", isCurrent && "font-bold text-primary")}>{model.name}</span>
                                    </div>
                                    <span className={cn("font-medium", isCurrent && "text-primary")}>{score.toFixed(1)}%</span>
                                </div>
                                <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                                    <Progress value={score} className={cn("absolute h-full w-full", isCurrent ? "[&>div]:bg-primary" : "[&>div]:bg-muted-foreground/50")} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

const getComparisonData = (
    allModels: AIModel[], 
    currentModelId: string,
    benchmarkKey: string
) => {
    // Helper to get benchmark score for a specific model and key
    const getScore = (model: AIModel, key: string): number | null => {
        const benchmark = model.benchmarks?.find(b => b.name === key);
        return benchmark ? benchmark.score : null;
    };
    
    const currentModel = allModels.find(m => m.id === currentModelId);
    const currentModelScore = currentModel ? getScore(currentModel, benchmarkKey) : null;
    
    // If the current model doesn't have this benchmark, don't render the chart
    if (currentModelScore === null || !currentModel) {
        return [];
    }

    const otherModels = allModels.filter(m => m.id !== currentModelId);

    const scoredModels = otherModels
        .map(m => ({ model: m, score: getScore(m, benchmarkKey) }))
        .filter(item => item.score !== null) as { model: AIModel; score: number }[];

    const higher = scoredModels
        .filter(m => m.score > currentModelScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    const lower = scoredModels
        .filter(m => m.score <= currentModelScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    const combined = [
      ...higher, 
      { model: currentModel, score: currentModelScore, isCurrent: true }, 
      ...lower
    ];
    
    const sortedFinal = combined.sort((a,b) => b.score - a.score);
    return sortedFinal;
};

export function O3DetailedBenchmarkCharts({ modelId, allModels }: { modelId: string; allModels: AIModel[] }) {
    if (!allModels || allModels.length === 0) {
      return null;
    }
    
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENCHMARK_CATEGORIES.map(category => {
                const chartData = getComparisonData(allModels, modelId, category.key);
                if (chartData.length === 0) return null;
                return (
                    <BenchmarkChart 
                        key={category.key}
                        title={category.title} 
                        subtitle={category.subtitle} 
                        data={chartData} 
                    />
                );
            })}
        </div>
    )
}
