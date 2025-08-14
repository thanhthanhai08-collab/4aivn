// src/components/models/o3-detailed-benchmark-charts.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { mockAIModels } from "@/lib/mock-models"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const mathBenchmarks = [
  { modelId: 'gpt-5-high', score: 99.0 },
  { modelId: 'openai-o4-mini-high', score: 94.0 },
  { modelId: 'grok-4', score: 93.0 },
  { modelId: 'openai-o3', score: 88.0, isCurrent: true },
  { modelId: 'gemini-2.5-pro', score: 89.0 },
  { modelId: 'deepseek-r1-jan25', score: 89.0 },
  { modelId: 'qwen3-235b-reasoning', score: 91.0 },
]

const codingBenchmarks = [
  { modelId: 'grok-4', score: 82.0 },
  { modelId: 'openai-o3-pro', score: 81.0 },
  { modelId: 'openai-o4-mini-high', score: 80.0 },
  { modelId: 'openai-o3', score: 78.0, isCurrent: true },
  { modelId: 'gemini-2.5-pro', score: 80.0 },
  { modelId: 'deepseek-r1-jan25', score: 77.0 },
  { modelId: 'qwen3-235b-reasoning', score: 79.0 },
]

const knowledgeBenchmarks = [
  { modelId: 'grok-4', score: 87.0 },
  { modelId: 'claude-4-opus-thinking', score: 87.0 },
  { modelId: 'gemini-2.5-pro', score: 86.0 },
  { modelId: 'openai-o3', score: 85.0, isCurrent: true },
  { modelId: 'deepseek-r1-jan25', score: 85.0 },
  { modelId: 'claude-3.7-sonnet-thinking', score: 84.0 },
  { modelId: 'qwen3-235b-reasoning', score: 84.0 },
]

const ifBenchBenchmarks = [
    { modelId: 'grok-4', score: 54.0 },
    { modelId: 'qwen3-235b-reasoning', score: 51.0 },
    { modelId: 'gpt-oss-120b-high', score: 71.0 },
    { modelId: 'openai-o3', score: 71.0, isCurrent: true },
    { modelId: 'gpt-5-high', score: 69.0 },
    { modelId: 'gpt-5-medium', score: 68.0 },
    { modelId: 'gpt-5-mini', score: 65.0 },
]

const gpqaBenchmarks = [
    { modelId: 'grok-4', score: 88.0 },
    { modelId: 'gemini-2.5-pro', score: 84.0 },
    { modelId: 'openai-o3-pro', score: 84.0 },
    { modelId: 'openai-o3', score: 83.0, isCurrent: true },
    { modelId: 'deepseek-r1-jan25', score: 81.0 },
    { modelId: 'claude-4-opus-thinking', score: 80.0 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 79.0 },
]


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

export function O3DetailedBenchmarkCharts() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <BenchmarkChart title="Toán học" subtitle="AIME 2025" data={mathBenchmarks} />
            <BenchmarkChart title="Khả năng code" subtitle="LiveCodeBench" data={codingBenchmarks} />
            <BenchmarkChart title="Kiến thức tổng hợp" subtitle="MMLU-Pro" data={knowledgeBenchmarks} />
            <BenchmarkChart title="Khả năng tuân thủ prompt" subtitle="IFBench" data={ifBenchBenchmarks} />
            <BenchmarkChart title="Lý luận nâng cao" subtitle="GPQA" data={gpqaBenchmarks} />
        </div>
    )
}
