// src/components/news/AiSatisfactionChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const data = [
  { name: 'ChatGPT', score: 51, logo: '/image/Logo Open AI cho bảng xếp hạng.png' },
  { name: 'AI Hay', score: 47, logo: '/image/Logo AIHay.png' },
  { name: 'Gemini', score: 36, logo: '/image/Logo Gemini cho bảng xếp hạng.png' },
  { name: 'Meta AI', score: 27, logo: '/image/Logo Meta.png' },
  { name: 'Copilot', score: 26, logo: '/image/Logo Copilot.png' },
  { name: 'Deepseek', score: 26, logo: '/image/Logo Deepseek cho bảng xếp hạng.png' }
];

const CustomLegend = () => {
    return (
        <div className="flex justify-center items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span>Điểm CSAT*</span>
            </div>
        </div>
    );
};


const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = data.find(d => d.name === payload.value);

    if (!item) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject x={-40} y={10} width={80} height={50}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <Image src={item.logo} alt={item.name} width={24} height={24} className="object-contain"/>
                    <div className="text-xs font-medium text-center">{item.name}</div>
                </div>
            </foreignObject>
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
              top: 5,
              right: 20,
              left: 20,
              bottom: 60, // Increased bottom margin for custom ticks
            }}
            barGap={20}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              tick={<CustomXAxisTick />}
              interval={0}
            />
            <YAxis hide={true} domain={[0, 100]} />
            <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ display: 'none' }}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                 <LabelList 
                    dataKey="score" 
                    position="insideTop" 
                    offset={10}
                    className="fill-primary-foreground font-semibold"
                    formatter={(value: number) => `${value}%`}
                 />
                 <LabelList 
                    dataKey="score" 
                    position="top"
                    offset={10}
                    className="fill-muted-foreground font-semibold"
                    formatter={(value: number) => `${100 - value}%`}
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
      </CardContent>
    </Card>
  )
}
