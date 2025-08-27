// src/components/news/ProfitabilityChart.tsx
"use client"

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'HGX H200', tco: 700, profit: 550, profitMargin: 42.2 },
  { name: 'GB200 NVL72', tco: 800, profit: 2700, profitMargin: 77.6 },
  { name: 'TPU v5e pod', tco: 450, profit: 400, profitMargin: 44.5 },
  { name: 'TPU v6e pod', tco: 350, profit: 1100, profitMargin: 74.9 },
  { name: 'MI300X Platform', tco: 800, profit: -500, profitMargin: -64.0 },
  { name: 'MI355X Platform', tco: 600, profit: -250, profitMargin: -28.2 },
  { name: 'CloudMatrix 384', tco: 600, profit: 550, profitMargin: 47.9 },
  { name: 'Trn2 UltraServer', tco: 300, profit: 600, profitMargin: 62.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="font-bold text-base mb-2">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>
            {`${pld.name}: ${pld.name === 'Profit Margin' ? `${pld.value}%` : `${pld.value.toLocaleString()}M USD`}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ProfitabilityChart() {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="text-lg text-center">Exhibit 12: Khả năng sinh lời của nhà máy AI 100MW</CardTitle>
        <CardDescription className="text-center">Bao gồm các máy chủ từ những nhà cung cấp khác nhau</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={50} interval={0} fontSize={12} />
            <YAxis yAxisId="left" unit="M" label={{ value: '(Million USD)', position: 'top', dy: -20, dx: 40 }} />
            <YAxis yAxisId="right" orientation="right" unit="%" label={{ value: 'Profit Margin (%)', position: 'top', dy: -20, dx: -40 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="tco" name="TCO" stackId="a" fill="hsl(var(--chart-1))" />
            <Bar yAxisId="left" dataKey="profit" name="Profit" stackId="a" fill="hsl(var(--chart-2))" />
            <Line yAxisId="right" type="monotone" dataKey="profitMargin" name="Profit Margin" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: Dữ liệu công ty, Nghiên cứu của Morgan Stanley</p>
      </CardContent>
    </Card>
  )
}
