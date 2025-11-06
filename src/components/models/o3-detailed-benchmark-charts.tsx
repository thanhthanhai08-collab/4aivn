
// src/components/models/o3-detailed-benchmark-charts.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { mockAIModels } from "@/lib/mock-models"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"


const allBenchmarks: Record<string, { modelId: string, score: number }[]> = {
  aime: [
    { modelId: 'gpt-oss-120b-high', score: 93.0 },
    { modelId: 'gpt-5-high', score: 94.0 },
    { modelId: 'gpt-5-medium', score: 92.0 },
    { modelId: 'openai-o4-mini-high', score: 91.0 },
    { modelId: 'grok-4', score: 93.0 },
    { modelId: 'openai-o3', score: 88.0 },
    { modelId: 'gemini-2.5-pro', score: 88.0 },
    { modelId: 'deepseek-r1-jan25', score: 76.0 },
    { modelId: 'deepseek-v3.1-reasoning', score: 90.0 },
    { modelId: 'qwen3-235b-reasoning', score: 91.0 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 73.0 },
    { modelId: 'gpt-5-mini', score: 85.0 },
    { modelId: 'gpt-5-low', score: 83.0 },
    { modelId: 'gpt-5-nano', score: 78.0 },
    { modelId: 'claude-4-opus-thinking', score: 73.0 },
    { modelId: 'claude-4.1-opus-thinking', score: 84.0 },
    { modelId: 'claude-4-sonnet-thinking', score: 74.0 },
    { modelId: 'grok-3-mini-reasoning-high', score: 85.0 },
    { modelId: 'llama-nemotron-ultra-reasoning', score: 64.0 },
    { modelId: 'llama-4-maverick', score: 19.0 },
    { modelId: 'claude-4.1-opus', score: 50.0 },
    { modelId: 'gpt-oss-20b-high', score: 62.0 },
    { modelId: 'gpt-5-codex-high', score: 99.0 },
  ],
  livecode: [
    { modelId: 'grok-4', score: 82.0 },
    { modelId: 'openai-o3-pro', score: 81.0 },
    { modelId: 'openai-o4-mini-high', score: 80.0 },
    { modelId: 'openai-o3', score: 81.0 },
    { modelId: 'gemini-2.5-pro', score: 80.0 },
    { modelId: 'deepseek-r1-jan25', score: 77.0 },
    { modelId: 'deepseek-v3.1-reasoning', score: 78.0 },
    { modelId: 'qwen3-235b-reasoning', score: 79.0 },
    { modelId: 'gpt-5-high', score: 85.0 },
    { modelId: 'gpt-5-medium', score: 70.0 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 70.0 },
    { modelId: 'gpt-5-mini', score: 69.0 },
    { modelId: 'gpt-5-low', score: 75.0 },
    { modelId: 'gpt-oss-120b-high', score: 64.0 },
    { modelId: 'gpt-5-nano', score: 60.0 },
    { modelId: 'claude-4-opus-thinking', score: 64.0 },
    { modelId: 'claude-4.1-opus-thinking', score: 66.0 },
    { modelId: 'claude-4-sonnet-thinking', score: 66.0 },
    { modelId: 'grok-3-mini-reasoning-high', score: 70.0 },
    { modelId: 'llama-nemotron-ultra-reasoning', score: 64.0 },
    { modelId: 'llama-4-maverick', score: 40.0 },
    { modelId: 'claude-4.1-opus', score: 69.0 },
    { modelId: 'gpt-oss-20b-high', score: 72.0 },
    { modelId: 'gpt-5-codex-high', score: 84.0 },
    { modelId: 'qwenq-32b', score: 63.0 },
  ],
  mmlu: [
    { modelId: 'grok-4', score: 87.0 },
    { modelId: 'claude-4-opus-thinking', score: 87.0 },
    { modelId: 'gemini-2.5-pro', score: 86.0 },
    { modelId: 'openai-o3', score: 85.0 },
    { modelId: 'deepseek-r1-jan25', score: 85.0 },
    { modelId: 'deepseek-v3.1-reasoning', score: 85.0 },
    { modelId: 'claude-4.1-opus-thinking', score: 84.0 },
    { modelId: 'qwen3-235b-reasoning', score: 84.0 },
    { modelId: 'openai-o4-mini-high', score: 83.0 },
    { modelId: 'gpt-5-high', score: 87.0 },
    { modelId: 'gpt-5-medium', score: 87.0 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 83.0 },
    { modelId: 'gpt-5-mini', score: 83.0 },
    { modelId: 'gpt-5-low', score: 86.0 },
    { modelId: 'gpt-oss-120b-high', score: 81.0 },
    { modelId: 'gpt-5-nano', score: 77.0 },
    { modelId: 'claude-4-sonnet-thinking', score: 84.0 },
    { modelId: 'grok-3-mini-reasoning-high', score: 83.0 },
    { modelId: 'llama-nemotron-ultra-reasoning', score: 83.0 },
    { modelId: 'llama-4-maverick', score: 81.0 },
    { modelId: 'claude-4.1-opus', score: 81.0 },
    { modelId: 'gpt-oss-20b-high', score: 74.0 },
    { modelId: 'gpt-5-codex-high', score: 87.0 },
    { modelId: 'qwenq-32b', score: 76.0 },
  ],
  ifbench: [
      { modelId: 'grok-4', score: 54.0 },
      { modelId: 'qwen3-235b-reasoning', score: 51.0 },
      { modelId: 'gpt-oss-120b-high', score: 69.0 },
      { modelId: 'openai-o3', score: 71.0 },
      { modelId: 'gpt-5-high', score: 73.0 },
      { modelId: 'openai-o4-mini-high', score: 69.0},
      { modelId: 'gpt-5-medium', score: 71.0 },
      { modelId: 'gemini-2.5-pro', score: 49.0 },
      { modelId: 'gpt-5-mini', score: 71.0 },
      { modelId: 'deepseek-r1-jan25', score: 40.0 },
      { modelId: 'deepseek-v3.1-reasoning', score: 42.0 },
      { modelId: 'gemini-2.5-flash-reasoning', score: 50.0 },
      { modelId: 'gpt-5-low', score: 67.0 },
      { modelId: 'gpt-5-nano', score: 66.0 },
      { modelId: 'claude-4-opus-thinking', score: 54.0 },
      { modelId: 'claude-4.1-opus-thinking', score: 55.0 },
      { modelId: 'claude-4-sonnet-thinking', score: 55.0 },
      { modelId: 'grok-3-mini-reasoning-high', score: 46.0 },
      { modelId: 'llama-nemotron-ultra-reasoning', score: 38.0 },
      { modelId: 'llama-4-maverick', score: 43.0 },
      { modelId: 'claude-4.1-opus', score: 43.0 },
      { modelId: 'gpt-oss-20b-high', score: 61.0 },
      { modelId: 'gpt-5-codex-high', score: 74.0 },
  ],
  gpqa: [
      { modelId: 'grok-4', score: 88.0 },
      { modelId: 'gemini-2.5-pro', score: 84.0 },
      { modelId: 'openai-o3-pro', score: 84.0 },
      { modelId: 'openai-o3', score: 83.0 },
      { modelId: 'deepseek-r1-jan25', score: 81.0 },
      { modelId: 'deepseek-v3.1-reasoning', score: 78.0 },
      { modelId: 'claude-4-opus-thinking', score: 80.0 },
      { modelId: 'gemini-2.5-flash-reasoning', score: 79.0 },
      { modelId: 'openai-o4-mini-high', score: 78.0 },
      { modelId: 'gpt-5-high', score: 85.0 },
      { modelId: 'qwen3-235b-reasoning', score: 79.0 },
      { modelId: 'gpt-5-medium', score: 84.0 },
      { modelId: 'gpt-5-mini', score: 80.0 },
      { modelId: 'gpt-5-low', score: 81.0 },
      { modelId: 'gpt-oss-120b-high', score: 78.0 },
      { modelId: 'gpt-5-nano', score: 67.0 },
      { modelId: 'claude-4.1-opus-thinking', score: 80.0 },
      { modelId: 'claude-4-sonnet-thinking', score: 78.0 },
      { modelId: 'grok-3-mini-reasoning-high', score: 79.0 },
      { modelId: 'llama-nemotron-ultra-reasoning', score: 73.0 },
      { modelId: 'llama-4-maverick', score: 67.0 },
      { modelId: 'claude-4.1-opus', score: 70.0 },
      { modelId: 'gpt-oss-20b-high', score: 62.0 },
      { modelId: 'gpt-5-codex-high', score: 84.0 },
      { modelId: 'qwenq-32b', score: 59.0 },
  ]
};


interface BenchmarkChartProps {
    title: string;
    subtitle: string;
    data: { modelId: string; score: number; isCurrent?: boolean }[];
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
                    {sortedData.map(({ modelId, score, isCurrent }) => {
                        const model = mockAIModels.find(m => m.id === modelId) ?? { name: 'Unknown', logoUrl: '/image/Logo Open AI cho bảng xếp hạng.png' };
                        return (
                            <div key={modelId} className="space-y-1">
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

const getComparisonData = (benchmarkData: { modelId: string; score: number }[], currentModelId: string) => {
    const currentModel = benchmarkData.find(m => m.modelId === currentModelId);
    if (!currentModel) return [];

    const higher = benchmarkData
        .filter(m => m.score > currentModel.score && m.modelId !== currentModelId)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    const lower = benchmarkData
        .filter(m => m.score <= currentModel.score && m.modelId !== currentModelId)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    const combined = [...higher, { ...currentModel, isCurrent: true }, ...lower];
    
    // Ensure we have the current model in the middle, even if we don't have 3 above/below
    const sortedFinal = combined.sort((a,b) => b.score - a.score);
    return sortedFinal.map(item => ({...item, isCurrent: item.modelId === currentModelId}));
};

export function O3DetailedBenchmarkCharts({ modelId }: { modelId: string }) {
    const mathData = getComparisonData(allBenchmarks.aime, modelId);
    const codingData = getComparisonData(allBenchmarks.livecode, modelId);
    const knowledgeData = getComparisonData(allBenchmarks.mmlu, modelId);
    const ifBenchData = getComparisonData(allBenchmarks.ifbench, modelId);
    const gpqaData = getComparisonData(allBenchmarks.gpqa, modelId);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mathData.length > 0 && <BenchmarkChart title="Toán học" subtitle="AIME 2025" data={mathData} />}
            {codingData.length > 0 && <BenchmarkChart title="Khả năng code" subtitle="LiveCodeBench" data={codingData} />}
            {knowledgeData.length > 0 && <BenchmarkChart title="Kiến thức tổng hợp" subtitle="MMLU-Pro" data={knowledgeData} />}
            {ifBenchData.length > 0 && <BenchmarkChart title="Khả năng tuân thủ prompt" subtitle="IFBench" data={ifBenchData} />}
            {gpqaData.length > 0 && <BenchmarkChart title="Lý luận nâng cao" subtitle="GPQA" data={gpqaData} />}
        </div>
    )
}

    

    


    






    