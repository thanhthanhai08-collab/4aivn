// src/components/news/ai-browser-market-growth-chart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { name: '2024', revenue: 4.5 },
  { name: '2029', revenue: 25.4 },
  { name: '2034', revenue: 76.8 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-primary">{`Doanh thu: $${payload[0].value} tỷ USD`}</p>
      </div>
    );
  }
  return null;
};

export function AiBrowserMarketGrowthChart() {
  return (
    <Card className="my-8">
      <CardHeader className="text-center">
        <CardTitle>Dự báo Tăng trưởng Thị trường Trình duyệt AI</CardTitle>
        <CardDescription>Doanh thu (tỷ USD)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" Tỷ" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" name="Doanh thu (tỷ USD)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="revenue" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: Market.us, 2024</p>
      </CardContent>
    </Card>
  )
}
