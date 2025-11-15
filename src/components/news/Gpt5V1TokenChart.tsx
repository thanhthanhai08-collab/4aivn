// src/components/news/Gpt5V1TokenChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { name: '10th percentile', 'GPT-5 (Standard)': 100, 'GPT-5.1 (Standard)': 43, change: "-57%" },
  { name: '30th percentile', 'GPT-5 (Standard)': 150, 'GPT-5.1 (Standard)': 103.5, change: "-31%" },
  { name: '50th percentile', 'GPT-5 (Standard)': 200, 'GPT-5.1 (Standard)': 200, change: "0%" },
  { name: '70th percentile', 'GPT-5 (Standard)': 250, 'GPT-5.1 (Standard)': 302.5, change: "+21%" },
  { name: '90th percentile', 'GPT-5 (Standard)': 300, 'GPT-5.1 (Standard)': 513, change: "+71%" },
];

const ChangeLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const data = chartData[index];
    
    if (data['GPT-5.1 (Standard)'] === value) {
        return (
            <text x={x + width / 2} y={y - 5} fill="hsl(var(--foreground))" textAnchor="middle" dy={0} className="text-xs font-semibold">
                {data.change}
            </text>
        );
    }
    return null;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p style={{ color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value.toFixed(0)}`}</p>
        <p style={{ color: payload[1].color }}>{`${payload[1].name}: ${payload[1].value.toFixed(0)}`}</p>
      </div>
    );
  }
  return null;
};

export function Gpt5V1TokenChart() {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="text-center text-lg">GPT-5.1 dành ít thời gian hơn cho các tác vụ dễ và nhiều thời gian hơn cho các tác vụ khó</CardTitle>
        <CardDescription className="text-center">Số lượng token do mô hình tạo ra mỗi phản hồi</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }}/>
            <Legend wrapperStyle={{fontSize: "14px"}} />
            <Bar dataKey="GPT-5 (Standard)" fill="#a855f7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="GPT-5.1 (Standard)" fill="#f472b6" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="GPT-5.1 (Standard)" content={<ChangeLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">Nguồn: OpenAI</p>
      </CardContent>
    </Card>
  )
}
