// src/components/news/Gemini3BenchmarkChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Humanity's Last Exam",
    "Gemini 3": 37.5,
    "GPT 5.1": 26.5,
    "Claude Sonnet 4.5": 13.7,
  },
  {
    name: "GPQA Diamond",
    "Gemini 3": 91.9,
    "GPT 5.1": 88.1,
    "Claude Sonnet 4.5": 83.4,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Gemini3BenchmarkChart() {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="text-center text-lg">So sánh hiệu suất suy luận cấp độ tiến sĩ</CardTitle>
        <CardDescription className="text-center">(PhD-Level Reasoning)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Gemini 3" fill="#4285F4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="GPT 5.1" fill="#74AA9C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Claude Sonnet 4.5" fill="#D97706" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: Dữ liệu từ Google</p>
      </CardContent>
    </Card>
  )
}
