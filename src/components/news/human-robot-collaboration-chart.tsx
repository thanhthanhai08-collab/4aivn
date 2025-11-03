// src/components/news/human-robot-collaboration-chart.tsx
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Hoạt động Tự động (AI Gordon)', value: 96, color: 'hsl(var(--primary))' },
  { name: 'Can thiệp Thủ công (Người điều khiển)', value: 4, color: 'hsl(var(--chart-2))' },
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

export function HumanRobotCollaborationChart() {
  return (
    <Card className="my-8">
      <CardHeader className="text-center">
        <CardTitle>Phân chia Tác vụ giữa AI và Con người trong Hệ thống Robot TX SCARA</CardTitle>
        <CardDescription>Minh họa mô hình cộng tác Người – Robot (Hybridity)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: Dữ liệu từ Telexistence cho thấy AI Gordon xử lý 96% tác vụ, 4% cần can thiệp từ con người.</p>
      </CardContent>
    </Card>
  )
}
