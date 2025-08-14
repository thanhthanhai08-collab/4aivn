"use client"

import * as React from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { mockAIModels } from "@/lib/mock-models"
import { cn } from "@/lib/utils"

const mathBenchmarks = [
  { modelId: 'openai-o3', score: 92.4, isCurrent: true },
  { modelId: 'claude-3.7-sonnet-thinking', score: 87.8 },
  { modelId: 'grok-3', score: 82.2 },
  { modelId: 'grok-2', score: 78.9 }, // Placeholder, assuming grok-2 exists
  { modelId: 'gemini-2.5-pro', score: 72.4 },
  { modelId: 'gpt-4.1', score: 71.9 },
]

const codingBenchmarks = [
  { modelId: 'openai-o3', score: 88.6, isCurrent: true },
  { modelId: 'claude-3.7-sonnet-thinking', score: 88.2 },
  { modelId: 'grok-3', score: 79.9 },
  { modelId: 'grok-2', score: 71.2 }, // Placeholder
  { modelId: 'gemini-2.5-pro', score: 67.5 },
  { modelId: 'qwen3-32b-reasoning', score: 62.4 },
  { modelId: 'gpt-4.1', score: 62.0 },
]

const knowledgeBenchmarks = [
  { modelId: 'openai-o3', score: 87.9, isCurrent: true },
  { modelId: 'claude-3.7-sonnet-thinking', score: 82.3 },
  { modelId: 'grok-3', score: 81.1 },
  { modelId: 'grok-2', score: 78.4 }, // Placeholder
  { modelId: 'gemini-2.5-pro', score: 74.2 },
  { modelId: 'qwen3-32b-reasoning', score: 71.1 },
  { modelId: 'claude-4-opus-thinking', score: 68.8 },
  { modelId: 'gpt-4.1', score: 67.2 },
]


interface BenchmarkChartProps {
    title: string;
    subtitle: string;
    data: { modelId: string; score: number; isCurrent?: boolean }[];
}

const BenchmarkChart = ({ title, subtitle, data }: BenchmarkChartProps) => {
    return (
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
            <div className="space-y-4">
                {data.map(({ modelId, score, isCurrent }) => {
                    const model = mockAIModels.find(m => m.id === modelId) ?? { name: 'Unknown', logoUrl: '/image/Logo Open AI cho bảng xếp hạng.png' };
                    return (
                        <div key={modelId} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <Image src={model.logoUrl} alt={`${model.name} logo`} width={16} height={16} className="rounded-full" />
                                    <span className={cn(isCurrent && "font-bold text-primary")}>{model.name}</span>
                                </div>
                                <span className={cn("font-medium", isCurrent && "text-primary")}>{score}%</span>
                            </div>
                            <div className="relative h-3">
                                 <Progress value={score} className={cn("absolute h-full w-full bg-muted [&>div]:bg-muted-foreground/50", isCurrent && "[&>div]:bg-primary")} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export function O3DetailedBenchmarkCharts() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <BenchmarkChart title="Toán học" subtitle="(AIME 2025)" data={mathBenchmarks} />
            <BenchmarkChart title="Khả năng code" subtitle="(LiveCodeBench)" data={codingBenchmarks} />
            <BenchmarkChart title="Kiến thức tổng hợp" subtitle="(MMLU-Pro)" data={knowledgeBenchmarks} />
        </div>
    )
}
