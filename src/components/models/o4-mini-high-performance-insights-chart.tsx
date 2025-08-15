"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "MMLU-Pro", score: 83 },
  { name: "GPQA Diamond", score: 78 },
  { name: "Humanity's Exam", score: 17.5 },
  { name: "LiveCodeBench", score: 80 },
  { name: "SciCode", score: 47 },
  { name: "IFBench", score: 69 },
  { name: "AIME 2025", score: 91 },
  { name: "AA-LCR", score: 55 },
];

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

export function O4MiniHighPerformanceInsightsChart() {
  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
