// src/components/news/gpt-oss-benchmark-chart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const gpqaData = [
  { name: "gpt-oss-120b", accuracy: 80.1 },
  { name: "gpt-oss-20b", accuracy: 71.5 },
  { name: "o3", accuracy: 83.3 },
  { name: "o4-mini", accuracy: 81.4 },
  { name: "o3-mini", accuracy: 77 },
]

const mmluData = [
  { name: "gpt-oss-120b", accuracy: 90 },
  { name: "gpt-oss-20b", accuracy: 85.3 },
  { name: "o3", accuracy: 93.4 },
  { name: "o4-mini", accuracy: 93 },
  { name: "o3-mini", accuracy: 87 },
]

const aimeData = [
  { name: "gpt-oss-120b", accuracy: 97.9 },
  { name: "gpt-oss-20b", accuracy: 98.7 },
  { name: "o3", accuracy: 98.4 },
  { name: "o4-mini", accuracy: 99.5 },
  { name: "o3-mini", accuracy: 86.5 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-primary">{`Accuracy: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const BenchmarkChart = ({ data, title, subtitle }: { data: any[], title: string, subtitle: string }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold">{title}</CardTitle>
      <CardDescription>{subtitle}</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
          <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

export function GptOssBenchmarkChart() {
  return (
    <div className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6">So sánh hiệu suất GPT-OSS</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BenchmarkChart data={gpqaData} title="GPQA diamond" subtitle="Câu hỏi khoa học cấp tiến sĩ (không dùng tools)" />
            <BenchmarkChart data={mmluData} title="MMLU" subtitle="Câu hỏi lĩnh vực học thuật" />
            <BenchmarkChart data={aimeData} title="AIME 2025" subtitle="Câu hỏi toán thi đấu" />
        </div>
    </div>
  )
}
