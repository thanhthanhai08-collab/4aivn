// src/components/news/AiSatisfactionChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Rectangle } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'ChatGPT', score: 51, remaining: 49 },
  { name: 'AI Hay', score: 47, remaining: 53 },
  { name: 'Gemini', score: 36, remaining: 64 },
  { name: 'Meta AI', score: 27, remaining: 73 },
  { name: 'Copilot', score: 26, remaining: 74 },
  { name: 'Deepseek', score: 26, remaining: 74 }
];

const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="hsl(var(--foreground))" className="text-sm font-medium">
                {payload.value}
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
            margin={{ top: 5, right: 0, left: 0, bottom: 20 }}
            barGap={20} // Add gap between bars
            barSize={60} // Reduce bar size
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
         <div className="flex justify-center mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                <span>Điểm CSAT*</span>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
