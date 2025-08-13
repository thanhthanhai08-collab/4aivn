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
    data: { modelId: string; score: number; isCurrent?: boolean }[];
}

const BenchmarkChart = ({ title, data }: BenchmarkChartProps) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
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
                            <div className="relative h-2">
                                 <Progress value={score} className="absolute h-full w-full bg-muted" indicatorClassName={cn(isCurrent ? "bg-primary" : "bg-muted-foreground/50")} />
                                 <div className="absolute h-full w-px bg-amber-400" style={{ left: `87.8%` }}></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Add this to Progress component to allow custom indicator class
declare module "@/components/ui/progress" {
    interface ProgressProps {
        indicatorClassName?: string;
    }
}
const OriginalProgress = Progress;
(OriginalProgress as any).render = React.forwardRef<
  React.ElementRef<typeof Progress>,
  React.ComponentPropsWithoutRef<typeof Progress> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <div
    ref={ref as any}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <div
      className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));


export function O3DetailedBenchmarkCharts() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <BenchmarkChart title="Math" data={mathBenchmarks} />
            <BenchmarkChart title="Coding" data={codingBenchmarks} />
            <BenchmarkChart title="Knowledge" data={knowledgeBenchmarks} />
        </div>
    )
}
