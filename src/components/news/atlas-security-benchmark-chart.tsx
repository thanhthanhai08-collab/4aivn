// src/components/news/atlas-security-benchmark-chart.tsx
"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'ChatGPT Atlas', 'Tỷ lệ chặn': 5.8, fill: '#ef4444' },
  { name: 'Google Chrome', 'Tỷ lệ chặn': 47, fill: '#3b82f6' },
  { name: 'Microsoft Edge', 'Tỷ lệ chặn': 53, fill: '#22c55e' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p style={{ color: payload[0].payload.fill }}>{`Tỷ lệ chặn: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export function AtlasSecurityBenchmarkChart() {
  return (
    <Card className="my-8">
      <CardHeader className="text-center">
        <CardTitle>Hiệu suất ngăn chặn trang web độc hại</CardTitle>
        <CardDescription>Dựa trên thử nghiệm của LayerX Security</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent))'}} />
            <Bar dataKey="Tỷ lệ chặn" radius={[4, 4, 0, 0]}>
               {data.map((entry, index) => (
                <LabelList key={`label-${index}`} dataKey="Tỷ lệ chặn" position="top" formatter={(value: number) => `${value}%`} />
              ))}
               {data.map((entry, index) => (
                <Bar key={`bar-${index}`} dataKey="Tỷ lệ chặn" fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: LayerX Security</p>
      </CardContent>
    </Card>
  )
}
