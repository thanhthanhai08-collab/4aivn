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

const CustomLegend = () => (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-6">
        {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Image src={entry.logo} alt={`${entry.name} logo`} width={18} height={18} className="rounded-full" />
                <span>{entry.name}</span>
            </div>
        ))}
    </div>
);

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
        <CustomLegend />
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip cursor={false} content={() => null} />
            <Bar dataKey="score" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="score" content={<CustomLabel />} />
            </Bar>
            <Bar dataKey="remaining" stackId="a" fill="hsl(var(--border))" radius={[4, 4, 0, 0]} />
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
