"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = {
  'openai-o3': [
    { name: "MMLU-Pro", score: 85 },
    { name: "GPQA Diamond", score: 83 },
    { name: "Humanity's Exam", score: 20 },
    { name: "LiveCodeBench", score: 78 },
    { name: "SciCode", score: 41 },
    { name: "IFBench", score: 71 },
    { name: "AIME 2025", score: 88 },
    { name: "AA-LCR", score: 69 },
  ],
  'grok-4': [
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 88 },
    { name: "Humanity's Exam", score: 23.9 },
    { name: "LiveCodeBench", score: 82 },
    { name: "SciCode", score: 46 },
    { name: "IFBench", score: 54 },
    { name: "AIME 2025", score: 93 },
    { name: "AA-LCR", score: 68 },
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
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 85 },
    { name: "Humanity's Exam", score: 26.5 },
    { name: "LiveCodeBench", score: 67 },
    { name: "SciCode", score: 43 },
    { name: "IFBench", score: 73 },
    { name: "AIME 2025", score: 94 },
    { name: "AA-LCR", score: 76 },
  ],
  'gpt-5-medium': [
    { name: "MMLU-Pro", score: 87 },
    { name: "GPQA Diamond", score: 84 },
    { name: "Humanity's Exam", score: 23.5 },
    { name: "LiveCodeBench", score: 70 },
    { name: "SciCode", score: 41 },
    { name: "IFBench", score: 71 },
    { name: "AIME 2025", score: 92 },
    { name: "AA-LCR", score: 73 },
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
