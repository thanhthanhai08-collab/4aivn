// src/components/news/ai-viet-usage-chart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { name: "ChatGPT", value: 81, type: "international" },
  { name: "Gemini", value: 51, type: "international" },
  { name: "Meta AI", value: 36, type: "international" },
  { name: "Copilot", value: 12, type: "international" },
  { name: "Deepseek", value: 11, type: "international" },
  { name: "AI Hay", value: 9, type: "local" },
  { name: "Grok", value: 9, type: "international" },
  { name: "Gauth AI", value: 4, type: "international" },
  { name: "Kiki", value: 3, type: "local" },
  { name: "Claude", value: 2, type: "international" },
  { name: "Perplexity", value: 2, type: "international" },
].sort((a, b) => b.value - a.value); // Sort descending for horizontal display

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{payload[0].payload.name}</p>
        <p className="text-primary">{`Tỷ lệ sử dụng: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export function AiVietUsageChart() {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Nền tảng AI hàng đầu được sử dụng trong 3 tháng qua</CardTitle>
        <CardDescription>Dữ liệu dựa trên khảo sát người dùng trực tuyến tại Việt Nam.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              type="category" 
              tickLine={false} 
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis type="number" hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconSize={10}
              wrapperStyle={{ top: -10, right: 0 }}
              payload={[
                  { value: 'Nền tảng quốc tế', type: 'square', color: 'hsl(var(--primary))' },
                  { value: 'Nền tảng nội địa', type: 'square', color: 'hsl(var(--chart-2))' }
              ]}
            />
            <Bar dataKey="value" background={{ fill: 'hsl(var(--muted))' }} radius={[4, 4, 0, 0]}>
               {chartData.map((entry, index) => (
                <Bar
                  key={`cell-${index}`}
                  dataKey="value"
                  fill={entry.type === 'local' ? 'hsl(var(--chart-2))' : 'hsl(var(--primary))'}
                />
              ))}
              <LabelList dataKey="value" position="top" formatter={(value: number) => `${value}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
