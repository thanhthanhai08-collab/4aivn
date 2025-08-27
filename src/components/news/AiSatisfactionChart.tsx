// src/components/news/AiSatisfactionChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'ChatGPT', score: 49 },
  { name: 'AI Hay', score: 53 },
  { name: 'Gemini', score: 64 },
  { name: 'Meta AI', score: 73 },
  { name: 'Copilot', score: 74 },
  { name: 'Deepseek', score: 74 }
];


const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = data.find(d => d.name === payload.value);

    if (!item) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="hsl(var(--foreground))" fontSize={12} fontWeight={500}>
                {item.name}
            </text>
        </g>
    );
};

export function AiSatisfactionChart() {
  return (
    <Card className="my-8">
      <CardHeader className="items-center">
        <CardTitle>Điểm hài lòng của khách hàng</CardTitle>
        <CardDescription>(Cơ sở: Khách hàng hiện tại của từng nền tảng)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart 
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
            barCategoryGap="40%"
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              tick={<CustomXAxisTick />}
              interval={0}
              tickMargin={10}
            />
            <YAxis hide={true} domain={[0, 100]} />
            <Tooltip
                cursor={{ fill: 'hsl(var(--accent))' }}
                contentStyle={{ display: 'none' }}
            />
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]}>
                 <LabelList 
                    dataKey="score" 
                    position="top" 
                    offset={8}
                    className="fill-foreground font-semibold"
                    formatter={(value: number) => `${value}%`}
                 />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
         <div className="flex justify-center items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                <span>Điểm CSAT*</span>
            </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">*Điểm hài lòng của khách hàng</p>
      </CardContent>
    </Card>
  )
}
