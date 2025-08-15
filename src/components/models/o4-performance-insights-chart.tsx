"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "MMLU-Pro", o4: 87 },
  { name: "GPQA Diamond", o4: 88 },
  { name: "Humanity's Exam", o4: 23.9 },
  { name: "LiveCodeBench", o4: 82 },
  { name: "SciCode", o4: 46 },
  { name: "IFBench", o4: 54 },
  { name: "AIME 2025", o4: 93 },
  { name: "AA-LCR", o4: 68 },
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

export function O4PerformanceInsightsChart() {
  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="o4" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
