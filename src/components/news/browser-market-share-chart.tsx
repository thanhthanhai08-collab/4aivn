// src/components/news/browser-market-share-chart.tsx
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Chrome', value: 68.3, color: '#4285F4' },
  { name: 'Safari', value: 16.2, color: '#93C572' },
  { name: 'Edge', value: 5.8, color: '#FBC02D' },
  { name: 'Firefox', value: 2.1, color: '#FF6347' },
  { name: 'Samsung Internet', value: 1.9, color: '#5DADE2' },
  { name: 'Khác', value: 5.7, color: '#2E8B57' }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export function BrowserMarketShareChart() {
  return (
    <Card className="my-8">
      <CardHeader className="text-center">
        <CardTitle>Thị phần Trình duyệt Toàn cầu</CardTitle>
        <CardDescription>Tháng 9 năm 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: Statcounter Global Stats</p>
      </CardContent>
    </Card>
  )
}
