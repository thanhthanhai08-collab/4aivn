
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = {
  'openai-o3': [
    { name: "Agentic Coding", score: 35 },
    { name: "Agentic Tool Use", score: 81 },
    { name: "AA-LCR", score: 69 },
    { name: "Humanity's Exam", score: 20 },
    { name: "MMLU-Pro", score: 85 },
    { name: "GPQA Diamond", score: 83 },
    { name: "LiveCodeBench", score: 81 },
    { name: "SciCode", score: 41 },
    { name: "IFBench", score: 71 },
    { name: "AIME 2025", score: 88 },
  ],
  'grok-4': [
    { name: "Agentic Coding", score: 38 },
    { name: "Agentic Tool Use", score: 75 },
    { name: "AA-LCR", score: 68 },
    { name: "Humanity's Exam", score: 23.9 },
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 88 },
    { name: "LiveCodeBench", score: 82 },
    { name: "SciCode", score: 46 },
    { name: "IFBench", score: 54 },
    { name: "AIME 2025", score: 93 },
  ],
  'gemini-2.5-pro': [
    { name: "MMLU-Pro", score: 86 },
    { name: "GPQA Diamond", score: 84 },
    { name: "Humanity's Exam", score: 21.1 },
    { name: "LiveCodeBench", score: 80 },
    { name: "SciCode", score: 43 },
    { name: "IFBench", score: 49 },
    { name: "AIME 2025", score: 88 },
    { name: "AA-LCR", score: 66 },
  ],
   'openai-o4-mini-high': [
    { name: "MMLU-Pro", score: 83 },
    { name: "GPQA Diamond", score: 78 },
    { name: "Humanity's Exam", score: 17.5 },
    { name: "LiveCodeBench", score: 80 },
    { name: "SciCode", score: 47 },
    { name: "IFBench", score: 69 },
    { name: "AIME 2025", score: 91 },
    { name: "AA-LCR", score: 55 },
  ],
  'gpt-5-high': [
    { name: "Agentic Coding", score: 31 },
    { name: "Agentic Tool Use", score: 85 },
    { name: "AA-LCR", score: 76 },
    { name: "Humanity's Exam", score: 26.5 },
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 85 },
    { name: "LiveCodeBench", score: 85 },
    { name: "SciCode", score: 43 },
    { name: "IFBench", score: 73 },
    { name: "AIME 2025", score: 94 },
  ],
  'gpt-5-medium': [
    { name: "Agentic Coding", score: 36 },
    { name: "Agentic Tool Use", score: 87 },
    { name: "AA-LCR", score: 73 },
    { name: "Humanity's Exam", score: 23.5 },
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 84 },
    { name: "LiveCodeBench", score: 70 },
    { name: "SciCode", score: 41 },
    { name: "IFBench", score: 71 },
    { name: "AIME 2025", score: 92 },
  ],
  'qwen3-235b-reasoning': [
    { name: "MMLU-Pro", score: 84 },
    { name: "GPQA Diamond", score: 79 },
    { name: "Humanity's Exam", score: 15 },
    { name: "LiveCodeBench", score: 79 },
    { name: "SciCode", score: 42 },
    { name: "IFBench", score: 51 },
    { name: "AIME 2025", score: 91 },
    { name: "AA-LCR", score: 67 },
  ],
  'deepseek-r1-jan25': [
    { name: "MMLU-Pro", score: 85 },
    { name: "GPQA Diamond", score: 81 },
    { name: "Humanity's Exam", score: 14.9 },
    { name: "LiveCodeBench", score: 77 },
    { name: "SciCode", score: 40 },
    { name: "IFBench", score: 40 },
    { name: "AIME 2025", score: 76 },
    { name: "AA-LCR", score: 56 },
  ],
  'deepseek-v3.1-reasoning': [
    { name: "MMLU-Pro", score: 85 },
    { name: "GPQA Diamond", score: 78 },
    { name: "Humanity's Exam", score: 13 },
    { name: "LiveCodeBench", score: 78 },
    { name: "SciCode", score: 39 },
    { name: "IFBench", score: 42 },
    { name: "AIME 2025", score: 90 },
    { name: "AA-LCR", score: 53 },
  ],
  'gemini-2.5-flash-reasoning': [
    { name: "MMLU-Pro", score: 83 },
    { name: "GPQA Diamond", score: 79 },
    { name: "Humanity's Exam", score: 11.1 },
    { name: "LiveCodeBench", score: 70 },
    { name: "SciCode", score: 39 },
    { name: "IFBench", score: 50 },
    { name: "AIME 2025", score: 73 },
    { name: "AA-LCR", score: 62 },
  ],
  'gpt-5-mini': [
    { name: "MMLU-Pro", score: 83 },
    { name: "GPQA Diamond", score: 80 },
    { name: "Humanity's Exam", score: 14.6 },
    { name: "LiveCodeBench", score: 69 },
    { name: "SciCode", score: 41 },
    { name: "IFBench", score: 71 },
    { name: "AIME 2025", score: 85 },
    { name: "AA-LCR", score: 66 },
  ],
  'gpt-5-low': [
    { name: "Agentic Coding", score: 25 },
    { name: "Agentic Tool Use", score: 84 },
    { name: "AA-LCR", score: 59 },
    { name: "Humanity's Exam", score: 18.4 },
    { name: "MMLU-Pro", score: 86 },
    { name: "GPQA Diamond", score: 81 },
    { name: "LiveCodeBench", score: 76 },
    { name: "SciCode", score: 39 },
    { name: "IFBench", score: 67 },
    { name: "AIME 2025", score: 83 },
  ],
  'gpt-oss-120b-high': [
    { name: "MMLU-Pro", score: 81 },
    { name: "GPQA Diamond", score: 78 },
    { name: "Humanity's Exam", score: 18.5 },
    { name: "LiveCodeBench", score: 64 },
    { name: "SciCode", score: 36 },
    { name: "IFBench", score: 69 },
    { name: "AIME 2025", score: 93 },
    { name: "AA-LCR", score: 51 },
  ],
  'gpt-5-nano': [
    { name: "MMLU-Pro", score: 77 },
    { name: "GPQA Diamond", score: 67 },
    { name: "Humanity's Exam", score: 7.6 },
    { name: "LiveCodeBench", score: 60 },
    { name: "SciCode", score: 34 },
    { name: "IFBench", score: 66 },
    { name: "AIME 2025", score: 78 },
    { name: "AA-LCR", score: 40 },
  ],
  'claude-4-opus-thinking': [
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 80 },
    { name: "Humanity's Exam", score: 11.7 },
    { name: "LiveCodeBench", score: 64 },
    { name: "SciCode", score: 40 },
    { name: "IFBench", score: 54 },
    { name: "AIME 2025", score: 73 },
    { name: "AA-LCR", score: 34 },
  ],
  'claude-4.1-opus-thinking': [
    { name: "MMLU-Pro", score: 84 },
    { name: "GPQA Diamond", score: 80 },
    { name: "Humanity's Exam", score: 11.6 },
    { name: "LiveCodeBench", score: 66 },
    { name: "SciCode", score: 40 },
    { name: "IFBench", score: 55 },
    { name: "AIME 2025", score: 84 },
    { name: "AA-LCR", score: 70 },
  ],
  'claude-4.5-sonnet-thinking': [
    { name: "Agentic Coding", score: 33 },
    { name: "Agentic Tool Use", score: 78 },
    { name: "AA-LCR", score: 66 },
    { name: "Humanity's Exam", score: 17.3 },
    { name: "MMLU-Pro", score: 88 },
    { name: "GPQA Diamond", score: 83 },
    { name: "LiveCodeBench", score: 71 },
    { name: "SciCode", score: 45 },
    { name: "IFBench", score: 57 },
    { name: "AIME 2025", score: 88 },
  ],
  'grok-3-mini-reasoning-high': [
    { name: "MMLU-Pro", score: 83 },
    { name: "GPQA Diamond", score: 79 },
    { name: "Humanity's Exam", score: 11.1 },
    { name: "LiveCodeBench", score: 70 },
    { name: "SciCode", score: 41 },
    { name: "IFBench", score: 46 },
    { name: "AIME 2025", score: 85 },
    { name: "AA-LCR", score: 50 },
  ],
  'llama-nemotron-ultra-reasoning': [
    { name: "MMLU-Pro", score: 83 },
    { name: "GPQA Diamond", score: 73 },
    { name: "Humanity's Exam", score: 8.1 },
    { name: "LiveCodeBench", score: 64 },
    { name: "SciCode", score: 35 },
    { name: "IFBench", score: 38 },
    { name: "AIME 2025", score: 64 },
    { name: "AA-LCR", score: 7 },
  ],
  'llama-4-maverick': [
    { name: "MMLU-Pro", score: 81 },
    { name: "GPQA Diamond", score: 67 },
    { name: "Humanity's Exam", score: 4.8 },
    { name: "LiveCodeBench", score: 40 },
    { name: "SciCode", score: 33 },
    { name: "IFBench", score: 43 },
    { name: "AIME 2025", score: 19 },
    { name: "AA-LCR", score: 46 },
  ],
  'claude-4.1-opus': [
    { name: "MMLU-Pro", score: 81 },
    { name: "GPQA Diamond", score: 70 },
    { name: "Humanity's Exam", score: 4.8 },
    { name: "LiveCodeBench", score: 69 },
    { name: "SciCode", score: 33 },
    { name: "IFBench", score: 43 },
    { name: "AIME 2025", score: 50 },
    { name: "AA-LCR", score: 40 },
  ],
  'gpt-oss-20b-high': [
    { name: "MMLU-Pro", score: 74 },
    { name: "GPQA Diamond", score: 62 },
    { name: "Humanity's Exam", score: 8.5 },
    { name: "LiveCodeBench", score: 72 },
    { name: "SciCode", score: 35 },
    { name: "IFBench", score: 61 },
    { name: "AIME 2025", score: 62 },
    { name: "AA-LCR", score: 19 },
  ],
   'gpt-5-codex-high': [
    { name: "Agentic Coding", score: 36 },
    { name: "Agentic Tool Use", score: 87 },
    { name: "AA-LCR", score: 69 },
    { name: "Humanity's Exam", score: 25.6 },
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 84 },
    { name: "LiveCodeBench", score: 84 },
    { name: "SciCode", score: 41 },
    { name: "IFBench", score: 74 },
    { name: "AIME 2025", score: 99 },
  ],
  'qwenq-32b': [
    { name: "MMLU-Pro", score: 76 },
    { name: "GPQA Diamond", score: 59 },
    { name: "Humanity's Exam", score: 8.2 },
    { name: "LiveCodeBench", score: 63 },
    { name: "SciCode", score: 36 },
  ],
};


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-primary">{`Score: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function O3PerformanceInsightsChart({ modelId }: { modelId: keyof typeof data }) {
  const chartData = data[modelId] || [];
  
  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

    
