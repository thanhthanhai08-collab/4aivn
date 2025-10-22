// src/components/news/ai-browser-focus-chart.tsx
"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Tự động hóa', 'ChatGPT Atlas': 9, 'Perplexity Comet': 6 },
  { name: 'Độ chính xác', 'ChatGPT Atlas': 6, 'Perplexity Comet': 9 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p style={{ color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value}`}</p>
        <p style={{ color: payload[1].color }}>{`${payload[1].name}: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};


export function AiBrowserFocusChart() {
  return (
    <Card className="my-8">
      <CardHeader className="text-center">
        <CardTitle>So sánh trọng tâm của Trình duyệt AI</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="ChatGPT Atlas" fill="#5b7ce0" />
            <Bar dataKey="Perplexity Comet" fill="#90cd97" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: Phân tích tổng hợp từ ScaleVise và Digit.in</p>
      </CardContent>
    </Card>
  )
}