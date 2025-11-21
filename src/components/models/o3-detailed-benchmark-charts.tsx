
// src/components/models/o3-detailed-benchmark-charts.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { mockAIModels } from "@/lib/mock-models"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"


const allBenchmarks: Record<string, { modelId: string; score: number }[]> = {
  aime: [
    { modelId: 'gpt-oss-120b-high', score: 93.0 },
    { modelId: 'gpt-5-high', score: 94.0 },
    { modelId: 'gpt-5-1-high', score: 94.0 },
    { modelId: 'gpt-5-medium', score: 92.0 },
    { modelId: 'gpt-5-mini-high', score: 91.0 },
    { modelId: 'grok-4', score: 93.0 },
    { modelId: 'grok-4.1-fast-reasoning', score: 89.0 },
    { modelId: 'openai-o3', score: 88.0 },
    { modelId: 'gemini-2.5-pro', score: 88.0 },
    { modelId: 'deepseek-r1-jan25', score: 76.0 },
    { modelId: 'deepseek-v3.1-terminus-reasoning', score: 90.0 },
    { modelId: 'qwen3-235b-reasoning', score: 91.0 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 78.0 },
    { modelId: 'gpt-5-mini-medium', score: 85.0 },
    { modelId: 'gpt-5-low', score: 83.0 },
    { modelId: 'gpt-5-nano-high', score: 84.0 },
    { modelId: 'gpt-5-nano-medium', score: 78.0 },
    { modelId: 'claude-4.5-haiku-thinking', score: 84.0 },
    { modelId: 'claude-4.5-sonnet', score: 80.0 },
    { modelId: 'claude-4.5-sonnet-thinking', score: 88.0 },
    { modelId: 'grok-3-mini-reasoning-high', score: 85.0 },
    { modelId: 'grok-4-fast-reasoning', score: 90.0 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 77.0 },
    { modelId: 'seed-oss-36b-instruct', score: 85.0 },
    { modelId: 'gpt-oss-20b-high', score: 89.0 },
    { modelId: 'gpt-5-codex-high', score: 99.0 },
    { modelId: 'deepseek-v3.2-exp', score: 88.0 },
    { modelId: 'qwen3-max', score: 81.0 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 88.0 },
    { modelId: 'claude-4.1-opus-thinking', score: 80.0 },
    { modelId: 'gemini-3-pro', score: 96.0 },
  ],
  livecode: [
    { modelId: 'grok-4', score: 82.0 },
    { modelId: 'grok-4.1-fast-reasoning', score: 82.0 },
    { modelId: 'openai-o3-pro', score: 81.0 },
    { modelId: 'gpt-5-mini-high', score: 84.0 },
    { modelId: 'openai-o3', score: 81.0 },
    { modelId: 'gemini-2.5-pro', score: 80.0 },
    { modelId: 'deepseek-r1-jan25', score: 77.0 },
    { modelId: 'deepseek-v3.1-terminus-reasoning', score: 80.0 },
    { modelId: 'qwen3-235b-reasoning', score: 79.0 },
    { modelId: 'gpt-5-high', score: 85.0 },
    { modelId: 'gpt-5-1-high', score: 87.0 },
    { modelId: 'gpt-5-medium', score: 70.0 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 71.0 },
    { modelId: 'gpt-5-mini-medium', score: 69.0 },
    { modelId: 'gpt-5-low', score: 76.0 },
    { modelId: 'gpt-oss-120b-high', score: 88.0 },
    { modelId: 'gpt-5-nano-high', score: 79.0 },
    { modelId: 'gpt-5-nano-medium', score: 76.0 },
    { modelId: 'claude-4.5-haiku-thinking', score: 62.0 },
    { modelId: 'claude-4.5-sonnet', score: 65.0 },
    { modelId: 'claude-4.5-sonnet-thinking', score: 71.0 },
    { modelId: 'grok-3-mini-reasoning-high', score: 70.0 },
    { modelId: 'grok-4-fast-reasoning', score: 83.0 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 74.0 },
    { modelId: 'seed-oss-36b-instruct', score: 77.0 },
    { modelId: 'gpt-oss-20b-high', score: 78.0 },
    { modelId: 'gpt-5-codex-high', score: 84.0 },
    { modelId: 'qwen3-max', score: 77.0 },
    { modelId: 'deepseek-v3.2-exp', score: 79.0 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 65.0 },
    { modelId: 'claude-4.1-opus-thinking', score: 65.0 },
    { modelId: 'gemini-3-pro', score: 92.0 },
  ],
  mmlu: [
    { modelId: 'grok-4', score: 87.0 },
    { modelId: 'grok-4.1-fast-reasoning', score: 85.0 },
    { modelId: 'claude-4.5-haiku-thinking', score: 76.0 },
    { modelId: 'gemini-2.5-pro', score: 86.0 },
    { modelId: 'openai-o3', score: 85.0 },
    { modelId: 'deepseek-r1-jan25', score: 85.0 },
    { modelId: 'deepseek-v3.1-terminus-reasoning', score: 85.0 },
    { modelId: 'claude-4.5-sonnet', score: 88.0 },
    { modelId: 'qwen3-235b-reasoning', score: 84.0 },
    { modelId: 'gpt-5-mini-high', score: 84.0 },
    { modelId: 'gpt-5-high', score: 87.0 },
    { modelId: 'gpt-5-1-high', score: 87.0 },
    { modelId: 'gpt-5-medium', score: 87.0 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 84.0 },
    { modelId: 'gpt-5-mini-medium', score: 83.0 },
    { modelId: 'gpt-5-low', score: 86.0 },
    { modelId: 'gpt-oss-120b-high', score: 81.0 },
    { modelId: 'gpt-5-nano-high', score: 78.0 },
    { modelId: 'gpt-5-nano-medium', score: 77.0 },
    { modelId: 'claude-4.5-sonnet-thinking', score: 88.0 },
    { modelId: 'grok-3-mini-reasoning-high', score: 83.0 },
    { modelId: 'grok-4-fast-reasoning', score: 85.0 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 81.0 },
    { modelId: 'seed-oss-36b-instruct', score: 82.0 },
    { modelId: 'gpt-oss-20b-high', score: 75.0 },
    { modelId: 'gpt-5-codex-high', score: 87.0 },
    { modelId: 'qwen3-max', score: 84.0 },
    { modelId: 'deepseek-v3.2-exp', score: 85.0 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 84.0 },
    { modelId: 'claude-4.1-opus-thinking', score: 88.0 },
    { modelId: 'gemini-3-pro', score: 90.0 },
  ],
  ifbench: [
      { modelId: 'grok-4', score: 54.0 },
      { modelId: 'grok-4.1-fast-reasoning', score: 53.0 },
      { modelId: 'qwen3-235b-reasoning', score: 51.0 },
      { modelId: 'gpt-oss-120b-high', score: 69.0 },
      { modelId: 'openai-o3', score: 71.0 },
      { modelId: 'gpt-5-high', score: 73.0 },
      { modelId: 'gpt-5-1-high', score: 73.0 },
      { modelId: 'gpt-5-mini-high', score: 75.0},
      { modelId: 'gpt-5-medium', score: 71.0 },
      { modelId: 'gemini-2.5-pro', score: 49.0 },
      { modelId: 'gpt-5-mini-medium', score: 71.0 },
      { modelId: 'deepseek-r1-jan25', score: 40.0 },
      { modelId: 'deepseek-v3.1-terminus-reasoning', score: 57.0 },
      { modelId: 'gemini-2.5-flash-reasoning', score: 52.0 },
      { modelId: 'gpt-5-low', score: 67.0 },
      { modelId: 'gpt-5-nano-high', score: 68.0 },
      { modelId: 'gpt-5-nano-medium', score: 66.0 },
      { modelId: 'claude-4.5-haiku-thinking', score: 54.0 },
      { modelId: 'claude-4.5-sonnet', score: 55.0 },
      { modelId: 'claude-4.5-sonnet-thinking', score: 57.0 },
      { modelId: 'grok-3-mini-reasoning-high', score: 46.0 },
      { modelId: 'grok-4-fast-reasoning', score: 51.0 },
      { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 37.0 },
      { modelId: 'seed-oss-36b-instruct', score: 42.0 },
      { modelId: 'gpt-oss-20b-high', score: 65.0 },
      { modelId: 'gpt-5-codex-high', score: 74.0 },
      { modelId: 'deepseek-v3.2-exp', score: 54.0 },
      { modelId: 'qwen3-max', score: 44.0 },
      { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 56.0 },
      { modelId: 'claude-4.1-opus-thinking', score: 55.0 },
      { modelId: 'gemini-3-pro', score: 70.0 },
  ],
  gpqa: [
      { modelId: 'grok-4', score: 88.0 },
      { modelId: 'grok-4.1-fast-reasoning', score: 85.0 },
      { modelId: 'gemini-2.5-pro', score: 84.0 },
      { modelId: 'openai-o3-pro', score: 84.0 },
      { modelId: 'openai-o3', score: 83.0 },
      { modelId: 'deepseek-r1-jan25', score: 81.0 },
      { modelId: 'deepseek-v3.1-terminus-reasoning', score: 79.0 },
      { modelId: 'claude-4.5-haiku-thinking', score: 67.0 },
      { modelId: 'gemini-2.5-flash-reasoning', score: 79.0 },
      { modelId: 'gpt-5-mini-high', score: 83.0 },
      { modelId: 'gpt-5-high', score: 85.0 },
      { modelId: 'gpt-5-1-high', score: 87.0 },
      { modelId: 'qwen3-235b-reasoning', score: 79.0 },
      { modelId: 'gpt-5-medium', score: 84.0 },
      { modelId: 'gpt-5-mini-medium', score: 80.0 },
      { modelId: 'gpt-5-low', score: 81.0 },
      { modelId: 'gpt-oss-120b-high', score: 78.0 },
      { modelId: 'gpt-5-nano-high', score: 68.0 },
      { modelId: 'gpt-5-nano-medium', score: 67.0 },
      { modelId: 'claude-4.5-sonnet', score: 81.0 },
      { modelId: 'claude-4.5-sonnet-thinking', score: 83.0 },
      { modelId: 'grok-3-mini-reasoning-high', score: 79.0 },
      { modelId: 'grok-4-fast-reasoning', score: 85.0 },
      { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 75.0 },
      { modelId: 'seed-oss-36b-instruct', score: 73.0 },
      { modelId: 'gpt-oss-20b-high', score: 69.0 },
      { modelId: 'gpt-5-codex-high', score: 84.0 },
      { modelId: 'qwen3-max', score: 76.0 },
      { modelId: 'deepseek-v3.2-exp', score: 80.0 },
      { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 77.0 },
      { modelId: 'claude-4.1-opus-thinking', score: 81.0 },
      { modelId: 'gemini-3-pro', score: 91.0 },
  ],
  'aa-lcr': [
    { modelId: 'grok-4.1-fast-reasoning', score: 68.0 },
    { modelId: 'deepseek-r1-jan25', score: 55.0 },
    { modelId: 'qwen3-max', score: 47.0 },
    { modelId: 'gpt-5-nano-high', score: 42.0},
    { modelId: 'gpt-5-nano-medium', score: 40.0 },
    { modelId: 'gpt-5-1-high', score: 75.0 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 59.0 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 34.0 },
    { modelId: 'seed-oss-36b-instruct', score: 58.0 },
    { modelId: 'claude-4.1-opus-thinking', score: 66.0 },
    { modelId: 'gemini-3-pro', score: 71.0 },
  ],
   'agentic-coding': [
    { modelId: 'grok-4.1-fast-reasoning', score: 23.0 },
    { modelId: 'openai-o3', score: 35 },
    { modelId: 'grok-4', score: 38 },
    { modelId: 'gemini-2.5-pro', score: 25 },
    { modelId: 'gpt-5-mini-high', score: 31 },
    { modelId: 'gpt-5-high', score: 31 },
    { modelId: 'gpt-5-1-high', score: 43 },
    { modelId: 'gpt-5-medium', score: 36 },
    { modelId: 'qwen3-235b-reasoning', score: 13 },
    { modelId: 'deepseek-r1-jan25', score: 15 },
    { modelId: 'deepseek-v3.1-terminus-reasoning', score: 28 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 16 },
    { modelId: 'gpt-5-mini-medium', score: 27 },
    { modelId: 'gpt-5-low', score: 25 },
    { modelId: 'gpt-oss-120b-high', score: 22 },
    { modelId: 'gpt-5-nano-high', score: 11 },
    { modelId: 'gpt-5-nano-medium', score: 16 },
    { modelId: 'claude-4.5-haiku-thinking', score: 26 },
    { modelId: 'claude-4.5-sonnet', score: 32 },
    { modelId: 'claude-4.5-sonnet-thinking', score: 33 },
    { modelId: 'grok-3-mini-reasoning-high', score: 16 },
    { modelId: 'grok-4-fast-reasoning', score: 18 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 5 },
    { modelId: 'seed-oss-36b-instruct', score: 6 },
    { modelId: 'gpt-oss-20b-high', score: 10 },
    { modelId: 'gpt-5-codex-high', score: 36 },
    { modelId: 'qwen3-max', score: 19 },
    { modelId: 'deepseek-v3.2-exp', score: 29 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 11 },
    { modelId: 'claude-4.1-opus-thinking', score: 32 },
    { modelId: 'gemini-3-pro', score: 39 },
  ],
  'agentic-tool-use': [
    { modelId: 'grok-4.1-fast-reasoning', score: 93.0 },
    { modelId: 'openai-o3', score: 81 },
    { modelId: 'grok-4', score: 75 },
    { modelId: 'gemini-2.5-pro', score: 54 },
    { modelId: 'gpt-5-mini-high', score: 68 },
    { modelId: 'gpt-5-high', score: 85 },
    { modelId: 'gpt-5-1-high', score: 82 },
    { modelId: 'gpt-5-medium', score: 87 },
    { modelId: 'qwen3-235b-reasoning', score: 53 },
    { modelId: 'deepseek-r1-jan25', score: 37 },
    { modelId: 'deepseek-v3.1-terminus-reasoning', score: 37 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 46 },
    { modelId: 'gpt-5-mini-medium', score: 71 },
    { modelId: 'gpt-5-low', score: 84 },
    { modelId: 'gpt-oss-120b-high', score: 66 },
    { modelId: 'gpt-5-nano-high', score: 37 },
    { modelId: 'gpt-5-nano-medium', score: 30 },
    { modelId: 'claude-4.5-haiku-thinking', score: 55 },
    { modelId: 'claude-4.5-sonnet', score: 71 },
    { modelId: 'claude-4.5-sonnet-thinking', score: 78 },
    { modelId: 'grok-3-mini-reasoning-high', score: 90 },
    { modelId: 'grok-4-fast-reasoning', score: 66 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 28 },
    { modelId: 'seed-oss-36b-instruct', score: 49 },
    { modelId: 'gpt-oss-20b-high', score: 60 },
    { modelId: 'gpt-5-codex-high', score: 87 },
    { modelId: 'qwen3-max', score: 74 },
    { modelId: 'deepseek-v3.2-exp', score: 34 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 54 },
    { modelId: 'claude-4.1-opus-thinking', score: 71 },
    { modelId: 'gemini-3-pro', score: 87 },
  ],
  'humanitys-exam': [
    { modelId: 'grok-4.1-fast-reasoning', score: 17.6 },
    { modelId: 'openai-o3', score: 20 },
    { modelId: 'grok-4', score: 23.9 },
    { modelId: 'gemini-2.5-pro', score: 21.1 },
    { modelId: 'gpt-5-mini-high', score: 19.7 },
    { modelId: 'gpt-5-high', score: 26.5 },
    { modelId: 'gpt-5-1-high', score: 26.5 },
    { modelId: 'gpt-5-medium', score: 23.5 },
    { modelId: 'qwen3-235b-reasoning', score: 15 },
    { modelId: 'deepseek-r1-jan25', score: 14.9 },
    { modelId: 'deepseek-v3.1-terminus-reasoning', score: 15.2 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 12.7 },
    { modelId: 'gpt-5-mini-medium', score: 14.6 },
    { modelId: 'gpt-5-low', score: 18.4 },
    { modelId: 'gpt-oss-120b-high', score: 18.5 },
    { modelId: 'gpt-5-nano-high', score: 8.2 },
    { modelId: 'gpt-5-nano-medium', score: 7.6 },
    { modelId: 'claude-4.5-haiku-thinking', score: 9.7 },
    { modelId: 'claude-4.5-sonnet', score: 11.9 },
    { modelId: 'claude-4.5-sonnet-thinking', score: 17.3 },
    { modelId: 'grok-3-mini-reasoning-high', score: 11.1 },
    { modelId: 'grok-4-fast-reasoning', score: 17 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 6.8 },
    { modelId: 'seed-oss-36b-instruct', score: 9.1 },
    { modelId: 'gpt-oss-20b-high', score: 9.8 },
    { modelId: 'gpt-5-codex-high', score: 25.6 },
    { modelId: 'qwen3-max', score: 11.1 },
    { modelId: 'deepseek-v3.2-exp', score: 13.8 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 10.1 },
    { modelId: 'claude-4.1-opus-thinking', score: 11.9 },
    { modelId: 'gemini-3-pro', score: 37.2 },
  ],
  scicode: [
    { modelId: 'grok-4.1-fast-reasoning', score: 44.0 },
    { modelId: 'openai-o3', score: 41 },
    { modelId: 'grok-4', score: 46 },
    { modelId: 'gemini-2.5-pro', score: 43 },
    { modelId: 'gpt-5-mini-high', score: 39 },
    { modelId: 'gpt-5-high', score: 43 },
    { modelId: 'gpt-5-1-high', score: 41 },
    { modelId: 'gpt-5-medium', score: 41 },
    { modelId: 'qwen3-235b-reasoning', score: 42 },
    { modelId: 'deepseek-r1-jan25', score: 40 },
    { modelId: 'deepseek-v3.1-terminus-reasoning', score: 41 },
    { modelId: 'gemini-2.5-flash-reasoning', score: 41 },
    { modelId: 'gpt-5-mini-medium', score: 41 },
    { modelId: 'gpt-5-low', score: 39 },
    { modelId: 'gpt-oss-120b-high', score: 39 },
    { modelId: 'gpt-5-nano-high', score: 37 },
    { modelId: 'gpt-5-nano-medium', score: 34 },
    { modelId: 'claude-4.5-haiku-thinking', score: 43 },
    { modelId: 'claude-4.5-sonnet', score: 41 },
    { modelId: 'claude-4.5-sonnet-thinking', score: 45 },
    { modelId: 'grok-3-mini-reasoning-high', score: 41 },
    { modelId: 'grok-4-fast-reasoning', score: 44 },
    { modelId: 'llama-nemotron-super-49b-v1-5-reasoning', score: 35 },
    { modelId: 'seed-oss-36b-instruct', score: 37 },
    { modelId: 'gpt-oss-20b-high', score: 34 },
    { modelId: 'gpt-5-codex-high', score: 41 },
    { modelId: 'qwen3-max', score: 38 },
    { modelId: 'deepseek-v3.2-exp', score: 38 },
    { modelId: 'qwen3-vl-235b-a22b-reasoning', score: 40 },
    { modelId: 'claude-4.1-opus-thinking', score: 41 },
    { modelId: 'gemini-3-pro', score: 56 },
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
    const aaLcrData = getComparisonData(allBenchmarks['aa-lcr'], modelId);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mathData.length > 0 && <BenchmarkChart title="Toán học" subtitle="AIME 2025" data={mathData} />}
            {codingData.length > 0 && <BenchmarkChart title="Khả năng code" subtitle="LiveCodeBench" data={codingData} />}
            {knowledgeData.length > 0 && <BenchmarkChart title="Kiến thức tổng hợp" subtitle="MMLU-Pro" data={knowledgeData} />}
            {ifBenchData.length > 0 && <BenchmarkChart title="Khả năng tuân thủ prompt" subtitle="IFBench" data={ifBenchData} />}
            {gpqaData.length > 0 && <BenchmarkChart title="Lý luận nâng cao" subtitle="GPQA" data={gpqaData} />}
            {aaLcrData.length > 0 && <BenchmarkChart title="Lý luận ngữ cảnh dài" subtitle="AA-LCR" data={aaLcrData} />}
        </div>
    )
}
