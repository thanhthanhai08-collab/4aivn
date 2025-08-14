"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "MMLU-Pro", o3: 85 },
  { name: "GPQA Diamond", o3: 83 },
  { name: "Humanity's Last Exam", o3: 20 },
  { name: "LiveCodeBench", o3: 78 },
  { name: "SciCode", o3: 41 },
  { name: "IFBench", o3: 71 },
  { name: "AIME 2025", o3: 88 },
  { name: "AA-LCR", o3: 69 },
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

export function O3PerformanceInsightsChart() {
  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="o3" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
