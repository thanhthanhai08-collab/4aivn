// src/components/news/AiSatisfactionChart.tsx
"use client"

import Image from "next/image"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList, Cell, Rectangle } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'ChatGPT', score: 51, remaining: 49, logo: '/image/Logo Open AI cho bảng xếp hạng.png' },
  { name: 'AI Hay', score: 47, remaining: 53, logo: 'https://placehold.co/24x24/1E90FF/FFFFFF/PNG?text=H' },
  { name: 'Gemini', score: 36, remaining: 64, logo: '/image/Logo Gemini cho bảng xếp hạng.png' },
  { name: 'Meta AI', score: 27, remaining: 73, logo: 'https://placehold.co/24x24/8A2BE2/FFFFFF/PNG?text=O' },
  { name: 'Copilot', score: 26, remaining: 74, logo: 'https://placehold.co/24x24/FF4500/FFFFFF/PNG?text=C' },
  { name: 'Deepseek', score: 26, remaining: 74, logo: '/image/Logo Deepseek cho bảng xếp hạng.png' }
];

const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = data.find(d => d.name === payload.value);

    if (!item) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="hsl(var(--foreground))" className="text-sm font-medium">
                {item.name}
            </text>
        </g>
    );
};

const CustomLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    if (value > 0) {
        return (
            <text x={x + width / 2} y={y + height / 2} fill="#fff" textAnchor="middle" dy=".3em" className="font-semibold text-sm">
                {`${value}%`}
            </text>
        );
    }
    return null;
};

export function AiSatisfactionChart() {
  return (
    <Card className="my-8">
      <CardHeader className="items-center">
        <CardTitle>Điểm hài lòng của khách hàng</CardTitle>
        <CardDescription>(Cơ sở: Khách hàng hiện tại của từng nền tảng)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomizedAxisTick />} height={30}/>
            <YAxis hide domain={[0, 100]} />
            <Tooltip cursor={false} content={() => null} />
            <Bar dataKey="score" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="score" content={<CustomLabel />} />
            </Bar>
            <Bar dataKey="remaining" stackId="a" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground mt-4">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span>Điểm CSAT*</span>
        </div>
      </CardContent>
    </Card>
  )
}
