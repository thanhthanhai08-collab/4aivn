// src/components/news/Sima2BenchmarkChart.tsx
"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'SIMA 1', 'Tỷ lệ thành công': 31, fill: '#a0c4ff' },
  { name: 'SIMA 2', 'Tỷ lệ thành công': 65, fill: '#4285F4' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p style={{ color: payload[0].payload.fill }}>{`Tỷ lệ thành công: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export function Sima2BenchmarkChart() {
  return (
    <Card className="my-8">
      <CardHeader className="text-center">
        <CardTitle>Tỷ lệ hoàn thành nhiệm vụ</CardTitle>
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
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} label={{ value: 'Model', position: 'insideBottom', offset: -5 }} />
            <YAxis unit="%" domain={[0, 100]} label={{ value: 'Tỷ lệ thành công (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent))'}} />
            <Bar dataKey="Tỷ lệ thành công" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Bar key={`bar-${index}`} dataKey="Tỷ lệ thành công" fill={entry.fill} />
              ))}
              <LabelList dataKey="Tỷ lệ thành công" position="top" formatter={(value: number) => `${value}%`} />
            </Bar>
            <ReferenceLine y={76} label={{ value: 'Con người', position: 'right' }} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: Google DeepMind</p>
      </CardContent>
    </Card>
  )
}

    