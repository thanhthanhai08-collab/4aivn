// src/components/news/AiSatisfactionChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend, Cell, Layer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'ChatGPT', score: 51, logo: '/image/Logo Open AI cho bảng xếp hạng.png' },
  { name: 'AI Hay', score: 47, logo: '/image/Logo AIHay.png' },
  { name: 'Gemini', score: 36, logo: '/image/Logo Gemini cho bảng xếp hạng.png' },
  { name: 'Meta AI', score: 27, logo: '/image/Logo Meta.png' },
  { name: 'Copilot', score: 26, logo: '/image/Logo Copilot.png' },
  { name: 'Deepseek', score: 26, logo: '/image/Logo Deepseek cho bảng xếp hạng.png' }
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
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={data}
            margin={{
              top: 30, // Increase top margin for the top label
              right: 20,
              left: 20,
              bottom: 20,
            }}
            barGap={20}
            stackOffset="expand" // This helps in creating the 100% stacked bar effect
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
                cursor={{ fill: 'transparent' }}
                contentStyle={{ display: 'none' }}
            />
            {/* Background bar for the "not satisfied" part */}
            <Bar dataKey={(payload) => 100 - payload.score} stackId="a" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
            
            {/* Foreground bar for the "satisfied" part */}
            <Bar dataKey="score" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                 <LabelList 
                    dataKey="score" 
                    position="insideTop" 
                    offset={10}
                    className="fill-primary-foreground font-semibold"
                    formatter={(value: number) => `${value}%`}
                 />
                 <LabelList
                    dataKey={(payload) => 100 - payload.score}
                    position="top"
                    offset={-20} // Adjust offset to be above the bar
                    className="fill-muted-foreground font-semibold"
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
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'hsl(var(--muted))' }} />
                <span>Chưa hài lòng</span>
            </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">*Điểm hài lòng của khách hàng</p>
      </CardContent>
    </Card>
  )
}
